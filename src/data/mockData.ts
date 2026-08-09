import { Badge, LevelNode, LeaderboardUser, Mission, UserProfile } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'EduExplorer',
  title: 'Estudiante Estrella ⭐',
  avatar: {
    outfit: 'explorer',
    hat: 'sombrero',
    accessory: 'pet_axolotl',
    skinTone: '#fcd34d'
  },
  level: 12,
  xp: 2500,
  nextLevelXp: 2650,
  streak: 15,
  gems: 320,
  rankingLocal: 5,
  subjectLevels: {
    matematicas: { level: 5, progressXp: 400, maxXp: 500 },
    ciencias: { level: 3, progressXp: 225, maxXp: 500 },
    lectura: { level: 6, progressXp: 450, maxXp: 500 },
    historia: { level: 4, progressXp: 310, maxXp: 500 }
  },
  completedLevelIds: ['mat-1', 'mat-2', 'cie-1', 'lec-1', 'his-1'],
  unlockedBadgeIds: ['badge-1', 'badge-2', 'badge-3'],
  soundEnabled: true,
  isOffline: false,
  totalQuestionsAnswered: 84,
  correctAnswersCount: 76
};

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-1',
    title: 'Primeros Pasos',
    description: 'Completa tu primera lección interactiva en EduQuest.',
    icon: 'footprint',
    unlocked: true,
    category: 'general',
    colorGradient: 'from-amber-400 to-amber-600',
    unlockedAt: '2026-07-28'
  },
  {
    id: 'badge-2',
    title: 'Genio Matemático',
    description: 'Resuelve 20 ejercicios de Matemáticas sin cometer ningún error.',
    icon: 'calculate',
    unlocked: true,
    category: 'matematicas',
    colorGradient: 'from-sky-400 to-sky-600',
    unlockedAt: '2026-08-01'
  },
  {
    id: 'badge-3',
    title: 'Racha de 7 días',
    description: 'Aprende durante 7 días consecutivos en la plataforma.',
    icon: 'local_fire_department',
    unlocked: true,
    category: 'general',
    colorGradient: 'from-rose-500 to-red-600',
    unlockedAt: '2026-08-05'
  },
  {
    id: 'badge-4',
    title: 'Científico Loco',
    description: 'Descubre los misterios de los estados de la materia e inventos.',
    icon: 'science',
    unlocked: false,
    category: 'ciencias',
    colorGradient: 'from-lime-400 to-emerald-600'
  },
  {
    id: 'badge-5',
    title: 'Devoralibros',
    description: 'Lee y responde correctamente 5 lecturas de comprensión.',
    icon: 'menu_book',
    unlocked: false,
    category: 'lectura',
    colorGradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'badge-6',
    title: 'Explorador de la Historia',
    description: 'Aprende sobre las grandes culturas prehispánicas de México.',
    icon: 'account_balance',
    unlocked: false,
    category: 'historia',
    colorGradient: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'badge-7',
    title: 'Maestro de la IA',
    description: 'Realiza 10 consultas educativas al Tutor IA en español.',
    icon: 'smart_toy',
    unlocked: false,
    category: 'general',
    colorGradient: 'from-teal-400 to-cyan-600'
  },
  {
    id: 'badge-8',
    title: 'Campeón Contrareloj',
    description: 'Gana un desafío en el Modo Competencia con puntuación máxima.',
    icon: 'timer',
    unlocked: false,
    category: 'general',
    colorGradient: 'from-yellow-400 to-amber-500'
  }
];

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'm-1',
    title: 'Desafío del Día',
    description: 'Resuelve 3 preguntas del módulo de Matemáticas.',
    rewardXp: 100,
    rewardGems: 15,
    progress: 2,
    maxProgress: 3,
    completed: false,
    claimed: false,
    icon: 'task_alt',
    type: 'daily'
  },
  {
    id: 'm-2',
    title: 'Consulta al Sabio',
    description: 'Pídele al Tutor IA que te explique un concepto difícil.',
    rewardXp: 80,
    rewardGems: 10,
    progress: 1,
    maxProgress: 1,
    completed: true,
    claimed: false,
    icon: 'smart_toy',
    type: 'daily'
  },
  {
    id: 'm-3',
    title: 'Especialista en Ciencias',
    description: 'Gana 2 estrellas en el laboratorio virtual de Ciencias.',
    rewardXp: 150,
    rewardGems: 25,
    progress: 0,
    maxProgress: 2,
    completed: false,
    claimed: false,
    icon: 'science',
    type: 'daily'
  },
  {
    id: 'm-4',
    title: 'Guardián del Conocimiento',
    description: 'Mantén tu racha de aprendizaje activa por 7 días seguidos.',
    rewardXp: 300,
    rewardGems: 50,
    progress: 5,
    maxProgress: 7,
    completed: false,
    claimed: false,
    icon: 'local_fire_department',
    type: 'weekly'
  },
  {
    id: 'm-5',
    title: 'Supera el Récord',
    description: 'Consigue más de 800 puntos en un reto de Competencia.',
    rewardXp: 250,
    rewardGems: 40,
    progress: 0,
    maxProgress: 1,
    completed: false,
    claimed: false,
    icon: 'trophy',
    type: 'weekly'
  }
];

export const GAME_LEVELS: LevelNode[] = [
  {
    id: 'mat-1',
    subject: 'matematicas',
    levelNumber: 1,
    title: 'Fracciones y Porcentajes en el Mercado',
    description: 'Aprende a calcular descuentos, equivalencias y proporciones en la vida cotidiana.',
    icon: 'calculate',
    stars: 3,
    status: 'completed',
    xpReward: 120,
    questions: [
      {
        id: 'q-mat-1-1',
        question: 'En un tianguis, un kilo de jitomate cuesta $40 pesos. Si compras 3/4 de kilo, ¿cuánto pagas?',
        options: ['$25 pesos', '$30 pesos', '$35 pesos', '$20 pesos'],
        correctIndex: 1,
        explanation: '3/4 de 40 se calcula dividiendo 40 ÷ 4 = 10, y luego multiplicando por 3 = $30 pesos.',
        hint: 'Calcula primero cuánto cuesta 1/4 de kilo dividiendo $40 entre 4.',
        topic: 'Fracciones simples y dinero'
      },
      {
        id: 'q-mat-1-2',
        question: 'Un puesto de ropa tiene un pantalón de $500 pesos con el 20% de descuento. ¿Cuál es el precio final?',
        options: ['$350 pesos', '$450 pesos', '$400 pesos', '$420 pesos'],
        correctIndex: 2,
        explanation: 'El 20% de 500 es 500 x 0.20 = 100. Restamos $500 - $100 = $400 pesos.',
        hint: 'El 10% de 500 es 50 pesos. Multiplica por 2 para hallar el 20%.',
        topic: 'Porcentajes'
      },
      {
        id: 'q-mat-1-3',
        question: '¿Cuál fracción es equivalente a 0.75?',
        options: ['1/2', '2/3', '3/4', '4/5'],
        correctIndex: 2,
        explanation: '3 dividido entre 4 da exactamente 0.75.',
        hint: 'Piensa en 75 centavos de un peso (cuatro monedas de 25 centavos hacen un peso).',
        topic: 'Conversión decimal a fracción'
      }
    ]
  },
  {
    id: 'mat-2',
    subject: 'matematicas',
    levelNumber: 2,
    title: 'Ecuaciones de Primer Grado',
    description: 'Despeja la incógnita en problemas del mundo real y rompecabezas numéricos.',
    icon: 'functions',
    stars: 3,
    status: 'completed',
    xpReward: 150,
    questions: [
      {
        id: 'q-mat-2-1',
        question: 'Resuelve la ecuación: 2x + 8 = 24. ¿Cuánto vale x?',
        options: ['x = 6', 'x = 8', 'x = 10', 'x = 12'],
        correctIndex: 1,
        explanation: 'Resta 8 de ambos lados: 2x = 16. Luego divide entre 2: x = 8.',
        hint: 'Pasa el +8 al otro lado como resta (-8).',
        topic: 'Álgebra básica'
      },
      {
        id: 'q-mat-2-2',
        question: 'Si el triple de un número más 5 es igual a 26, ¿cuál es ese número?',
        options: ['5', '6', '7', '8'],
        correctIndex: 2,
        explanation: '3x + 5 = 26 => 3x = 21 => x = 7.',
        hint: 'Resta 5 a 26 y divide el resultado entre 3.',
        topic: 'Traducción del lenguaje común al algebraico'
      }
    ]
  },
  {
    id: 'mat-3',
    subject: 'matematicas',
    levelNumber: 3,
    title: 'Geometría: Perímetros y Áreas',
    description: 'Calcula superficies de polígonos regulares y pirámides históricas.',
    icon: 'square_foot',
    stars: 0,
    status: 'unlocked',
    xpReward: 180,
    bossNode: true,
    questions: [
      {
        id: 'q-mat-3-1',
        question: '¿Cuál es el área de un terreno triangular con base de 12 metros y altura de 8 metros?',
        options: ['96 m²', '48 m²', '24 m²', '60 m²'],
        correctIndex: 1,
        explanation: 'El área de un triángulo es (Base × Altura) / 2 = (12 × 8) / 2 = 96 / 2 = 48 m².',
        hint: 'Recuerda que la fórmula incluye dividir entre 2.',
        topic: 'Área de triángulos'
      },
      {
        id: 'q-mat-3-2',
        question: 'Un parque circular tiene un radio de 7 metros. Usando π ≈ 3.14, ¿cuál es aproximadamente su perímetro (circunferencia)?',
        options: ['43.96 m', '21.98 m', '153.86 m', '28 m'],
        correctIndex: 0,
        explanation: 'Perímetro del círculo = 2 × π × r = 2 × 3.14 × 7 = 43.96 metros.',
        hint: 'Fórmula del perímetro del círculo: 2 * pi * r.',
        topic: 'Circunferencia'
      }
    ]
  },

  // CIENCIAS
  {
    id: 'cie-1',
    subject: 'ciencias',
    levelNumber: 1,
    title: 'Estados de la Materia y Energía',
    description: 'Explora el comportamiento molecular en sólidos, líquidos, gases y plasma.',
    icon: 'science',
    stars: 2,
    status: 'completed',
    xpReward: 130,
    questions: [
      {
        id: 'q-cie-1-1',
        question: '¿Cómo se llama el cambio de estado directo de sólido a gas sin pasar por líquido?',
        options: ['Evaporación', 'Condensación', 'Sublimación', 'Fusión'],
        correctIndex: 2,
        explanation: 'La sublimación ocurre cuando un sólido se convierte directamente en gas (por ejemplo, el hielo seco).',
        hint: 'El hielo seco utiliza este fenómeno.',
        topic: 'Cambios de estado de la materia'
      },
      {
        id: 'q-cie-1-2',
        question: '¿Qué tipo de energía posee un objeto debido a su movimiento?',
        options: ['Energía Potencial', 'Energía Cinética', 'Energía Térmica', 'Energía Quimica'],
        correctIndex: 1,
        explanation: 'La energía cinética es la energía que posee un cuerpo debido a su movimiento.',
        hint: 'Viene de la palabra griega "kinesis" que significa movimiento.',
        topic: 'Tipos de energía'
      }
    ]
  },
  {
    id: 'cie-2',
    subject: 'ciencias',
    levelNumber: 2,
    title: 'Biodiversidad de México y Ecosistemas',
    description: 'Descubre los cenotes, selvas y especies endémicas como el ajolote.',
    icon: 'eco',
    stars: 0,
    status: 'unlocked',
    xpReward: 160,
    questions: [
      {
        id: 'q-cie-2-1',
        question: 'El ajolote es un anfibio endémico de México famoso por su capacidad de:',
        options: ['Volar grandes distancias', 'Regenerar extremidades y órganos', 'Cambiar de color como camaleón', 'Vivir sin agua indefinidamente'],
        correctIndex: 1,
        explanation: 'El ajolote (Ambystoma mexicanum) puede regenerar patas, cola, corazón y tejido cerebral.',
        hint: 'Es un superpoder científico genial que asombra a los biólogos.',
        topic: 'Fauna mexicana endémica'
      },
      {
        id: 'q-cie-2-2',
        question: '¿Qué ecosistema acuático natural subterráneo es característico de la Península de Yucatán?',
        options: ['Oasis', 'Cenote', 'Estuario', 'Manglar'],
        correctIndex: 1,
        explanation: 'Los cenotes son pozos de agua dulce conectados por ríos subterráneos, sagrados para los mayas.',
        hint: 'Fueron una fuente de agua vital para la civilización maya.',
        topic: 'Ecosistemas de México'
      }
    ]
  },

  // LECTURA
  {
    id: 'lec-1',
    subject: 'lectura',
    levelNumber: 1,
    title: 'Comprensión de Lectura y Mitos Mayas',
    description: 'Analiza pasajes literarios, metáforas e ideas principales.',
    icon: 'menu_book',
    stars: 3,
    status: 'completed',
    xpReward: 140,
    questions: [
      {
        id: 'q-lec-1-1',
        question: 'Lee la frase: "Las gotas de lluvia eran perlas brillantes sobre las hojas de maíz". ¿Qué figura literaria se utiliza?',
        options: ['Hipérbole', 'Metáfora', 'Personificación', 'Onomatopeya'],
        correctIndex: 1,
        explanation: 'Es una metáfora porque identifica las gotas de lluvia directamente con perlas brillantes por su apariencia.',
        hint: 'Compara dos elementos directamente sin usar la palabra "como".',
        topic: 'Figuras retóricas'
      },
      {
        id: 'q-lec-1-2',
        question: 'En un texto argumentativo, ¿cuál es la función de la tesis?',
        options: ['Contar un chiste al final', 'Presentar la idea u opinión principal que se defiende', 'Listar palabras difíciles', 'Resumir el índice'],
        correctIndex: 1,
        explanation: 'La tesis es la postura u opinión central que el autor busca demostrar a lo largo del escrito.',
        hint: 'Es la espina dorsal o punto central de una opinión.',
        topic: 'Estructura textual'
      }
    ]
  },

  // HISTORIA
  {
    id: 'his-1',
    subject: 'historia',
    levelNumber: 1,
    title: 'Grandes Civilizaciones Prehispánicas',
    description: 'Viaja en el tiempo para conocer a los Olmecas, Mayas y Mexicas.',
    icon: 'account_balance',
    stars: 2,
    status: 'completed',
    xpReward: 150,
    questions: [
      {
        id: 'q-his-1-1',
        question: '¿Cuál civilización es conocida como la "cultura madre" de Mesoamérica por sus enormes cabezas colosales?',
        options: ['Maya', 'Mexica', 'Olmeca', 'Zapoteca'],
        correctIndex: 2,
        explanation: 'La cultura Olmeca (1200 a.C. - 400 a.C.) es considerada la cultura madre en la zona de Veracruz y Tabasco.',
        hint: 'Esculpieron cabezas de piedra de más de 10 toneladas.',
        topic: 'Mesoamérica'
      },
      {
        id: 'q-his-1-2',
        question: 'Tenochtitlan fue fundada en un islote del lago de Texcoco tras ver la señal de:',
        options: ['Un jaguar sobre una pirámide', 'Un águila devorando a una serpiente sobre un nopal', 'Un quetzal volando hacia el sol', 'Un ajolote dorado en el agua'],
        correctIndex: 1,
        explanation: 'La leyenda Mexica marca que Huitzilopochtli les ordenó fundar su imperio donde hallaran un águila sobre un nopal devorando una serpiente.',
        hint: 'Esta imagen aparece justo en el centro de la Bandera de México.',
        topic: 'Fundación de Tenochtitlan'
      }
    ]
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: 'Valentina_CDMX', xp: 4850, level: 18, avatarIcon: 'face_6', streak: 28 },
  { rank: 2, name: 'Mateo_Zapopan', xp: 3920, level: 15, avatarIcon: 'face_3', streak: 21 },
  { rank: 3, name: 'Sofia_Monterrey', xp: 3410, level: 14, avatarIcon: 'face_4', streak: 19 },
  { rank: 4, name: 'Xavier_Puebla', xp: 2890, level: 13, avatarIcon: 'face_5', streak: 12 },
  { rank: 5, name: 'EduExplorer (Tú)', xp: 2500, level: 12, avatarIcon: 'face_2', isCurrentUser: true, streak: 15 },
  { rank: 6, name: 'Camila_Merida', xp: 2310, level: 11, avatarIcon: 'face_1', streak: 9 },
  { rank: 7, name: 'Gael_Oaxaca', xp: 2100, level: 10, avatarIcon: 'face_6', streak: 7 },
  { rank: 8, name: 'Regina_Tijuana', xp: 1950, level: 9, avatarIcon: 'face_3', streak: 6 }
];
