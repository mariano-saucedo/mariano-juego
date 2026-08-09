import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API Health Check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      app: 'EduQuest México',
      timestamp: new Date().toISOString()
    });
  });

  // AI Tutor Endpoint
  app.post('/api/gemini/tutor', async (req, res) => {
    try {
      const { userMessage, topic, contextHistory, userLevel } = req.body;

      if (!ai) {
        // Fallback response if API key is not configured locally yet
        return res.json({
          reply: `¡Hola, explorador! Soy tu Tutor EduBot. Para activar todas mis respuestas con Inteligencia Artificial avanzada, asegúrate de configurar tu llave de API de Gemini. Mientras tanto: respecto a tu pregunta sobre "${userMessage}", ¡sigue practicando en el mapa de niveles para ganar más experiencia (XP)!`,
          suggestedActions: [
            "¿Qué es una ecuación de primer grado?",
            "Explícame qué son las fracciones",
            "Cuéntame un dato curioso de México"
          ]
        });
      }

      const systemInstruction = `
Eres "EduBot", un super tutor de Inteligencia Artificial para el videojuego educativo "EduQuest México".
Tu objetivo es ayudar a estudiantes de primaria y secundaria en México a comprender conceptos de Matemáticas, Ciencias, Lectura e Historia de México.

REGLAS DE INTERACCIÓN:
1. Idioma: Habla en ESPAÑOL (MÉXICO) natural, entusiasta, cálido y motivador. Usa expresiones mexicanas educativas y amigables (e.g. "¡Órale!", "¡Excelente trabajo!", "¡Qué gran pregunta!", "¡Vamos con todo!").
2. Tono de videojuego: Trata al usuario como a un héroe o explorador en un videojuego (nivel ${userLevel || 12}).
3. Claridad y brevedad: Da respuestas concisas (máximo 2 a 3 párrafos cortos). Explica los conceptos paso a paso de forma súper sencilla. Usa analogías divertidas.
4. NUNCA inventes información. Si no sabes algo, dilo con amabilidad.
5. Si el usuario comete un error, explícale de forma constructiva por qué está mal y dale una pista sin darle la respuesta de inmediato.
`;

      const prompt = `
Tema actual del juego: ${topic || 'General'}
Historial reciente: ${JSON.stringify(contextHistory || [])}
Pregunta o mensaje del estudiante: "${userMessage}"

Responde como EduBot motivando al estudiante y explicando de forma amigable.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || '¡Buen intento! Sigue explorando para resolver más retos.';

      // Generate 3 quick suggested follow-up questions
      const suggestionsResponse = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Basado en esta respuesta de tutoría educativa: "${replyText.slice(0, 300)}", genera 3 preguntas breves de seguimiento que el alumno mexicano podría hacerme a continuación. Responde ÚNICAMENTE en formato JSON con un arreglo de cadenas. Ejemplo: ["¿Me das un ejemplo?", "¿Por qué ocurre esto?", "Dame un reto corto"].`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });

      let suggestedActions = [
        "¿Me das un ejemplo práctico?",
        "¿Por qué es importante esto?",
        "¡Ponme un reto de prueba!"
      ];

      try {
        if (suggestionsResponse.text) {
          const parsed = JSON.parse(suggestionsResponse.text.trim());
          if (Array.isArray(parsed) && parsed.length > 0) {
            suggestedActions = parsed.slice(0, 3);
          }
        }
      } catch {
        // use fallback suggestions
      }

      return res.json({
        reply: replyText,
        suggestedActions
      });

    } catch (error: unknown) {
      console.error('Error in AI Tutor endpoint:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error interno de la IA';
      return res.status(500).json({
        error: 'Error al comunicarse con el Tutor IA',
        details: errorMessage,
        reply: '¡Ups! Ocurrió una pequeña interferencia en la señal espacial del Tutor. ¡Intenta preguntar de nuevo o revisa tu conexión!'
      });
    }
  });

  // AI Quiz Generator Endpoint
  app.post('/api/gemini/quiz-generator', async (req, res) => {
    try {
      const { subject, topic, difficulty } = req.body;

      if (!ai) {
        return res.json({
          questions: [
            {
              id: 'ai-gen-1',
              question: '¿Cuál es la capital de México y el centro histórico del imperio mexica?',
              options: ['Guadalajara', 'Monterrey', 'Ciudad de México', 'Puebla'],
              correctIndex: 2,
              explanation: 'La Ciudad de México fue construida sobre la antigua Tenochtitlan.',
              hint: 'Anteriormente era llamada la Gran Tenochtitlan.',
              topic: 'Historia de México'
            }
          ]
        });
      }

      const prompt = `Genera un cuestionario de 3 preguntas educativas de opción múltiple para estudiantes mexicanos.
Materia: ${subject || 'Matemáticas'}
Tema específico: ${topic || 'General'}
Nivel de dificultad: ${difficulty || 'Medio'}

Instrucciones:
- Idioma: Español de México.
- Incluye 4 opciones por pregunta.
- Señala el índice correcto (0 a 3).
- Agrega una breve explicación motivadora de por qué es la opción correcta.
- Agrega una pista breve.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    question: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    correctIndex: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                    hint: { type: Type.STRING },
                    topic: { type: Type.STRING }
                  },
                  required: ['question', 'options', 'correctIndex', 'explanation', 'hint', 'topic']
                }
              }
            },
            required: ['questions']
          }
        }
      });

      if (response.text) {
        const data = JSON.parse(response.text.trim());
        return res.json(data);
      } else {
        throw new Error('No text returned from Gemini');
      }

    } catch (error: unknown) {
      console.error('Error in Quiz Generator endpoint:', error);
      return res.status(500).json({
        error: 'No se pudo generar el cuestionario con IA',
        questions: []
      });
    }
  });

  // Vite Middleware in Dev vs Static distribution in Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎮 Servidor de EduQuest México corriendo en http://localhost:${PORT}`);
  });
}

startServer();
