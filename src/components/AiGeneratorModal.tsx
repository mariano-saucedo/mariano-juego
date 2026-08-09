import React, { useState } from 'react';
import { SubjectType } from '../types';

interface AiGeneratorModalProps {
  initialSubject: SubjectType;
  onClose: () => void;
  onQuestionsGenerated: (questions: any[], subjectTitle: string) => void;
}

export const AiGeneratorModal: React.FC<AiGeneratorModalProps> = ({
  initialSubject,
  onClose,
  onQuestionsGenerated
}) => {
  const [subject, setSubject] = useState<SubjectType>(initialSubject);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medio');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/quiz-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, topic, difficulty })
      });

      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        onQuestionsGenerated(data.questions, topic || `Reto Especial de ${subject}`);
      } else {
        alert('No se pudieron generar las preguntas. Intenta de nuevo.');
      }
    } catch {
      alert('Error de conexión con el generador de IA.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-800 shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in-95">
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400">auto_awesome</span>
            <span>Generador de Retos IA</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
            aria-label="Cerrar modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 block">
              Materia:
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value as SubjectType)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-bold text-white"
            >
              <option value="matematicas" className="bg-slate-900 text-white">Matemáticas</option>
              <option value="ciencias" className="bg-slate-900 text-white">Ciencias</option>
              <option value="lectura" className="bg-slate-900 text-white">Lectura</option>
              <option value="historia" className="bg-slate-900 text-white">Historia de México</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 block">
              Tema Específico (Opcional):
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ej. Porcentajes, El Sistema Solar, Mayas..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-bold text-white placeholder-slate-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 block">
              Dificultad:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Fácil', 'Medio', 'Difícil'].map((diff) => (
                <button
                  type="button"
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    difficulty === diff
                      ? 'bg-indigo-600 text-white border-indigo-900 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-game w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black text-xs py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg border-indigo-900 mt-2"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined text-lg animate-spin">sync</span>
                <span>Generando con EduBot IA...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
                <span>Crear Cuestionario Infinito</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
