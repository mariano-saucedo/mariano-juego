export type NavigationTab = 'misiones' | 'mapa' | 'tutor' | 'logros' | 'perfil' | 'competencia';

export type SubjectType = 'matematicas' | 'ciencias' | 'lectura' | 'historia';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  topic: string;
  funFact?: string;
}

export interface LevelNode {
  id: string;
  subject: SubjectType;
  levelNumber: number;
  title: string;
  description: string;
  icon: string;
  stars: number; // 0 to 3
  status: 'completed' | 'unlocked' | 'locked';
  xpReward: number;
  questions: QuizQuestion[];
  bossNode?: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  category: SubjectType | 'general';
  colorGradient: string;
  unlockedAt?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  rewardXp: number;
  rewardGems: number;
  progress: number;
  maxProgress: number;
  completed: boolean;
  claimed: boolean;
  icon: string;
  type: 'daily' | 'weekly';
}

export interface AvatarCustomization {
  outfit: 'explorer' | 'scientist' | 'astronaut' | 'aztec' | 'hero';
  hat: 'none' | 'sombrero' | 'helmet' | 'crown' | 'cap';
  accessory: 'none' | 'glasses' | 'backpack' | 'medal' | 'pet_axolotl';
  skinTone: string;
}

export interface UserProfile {
  name: string;
  title: string;
  avatar: AvatarCustomization;
  level: number;
  xp: number;
  nextLevelXp: number;
  streak: number;
  gems: number;
  rankingLocal: number;
  subjectLevels: {
    matematicas: { level: number; progressXp: number; maxXp: number };
    ciencias: { level: number; progressXp: number; maxXp: number };
    lectura: { level: number; progressXp: number; maxXp: number };
    historia: { level: number; progressXp: number; maxXp: number };
  };
  completedLevelIds: string[];
  unlockedBadgeIds: string[];
  soundEnabled: boolean;
  isOffline: boolean;
  totalQuestionsAnswered: number;
  correctAnswersCount: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  xp: number;
  level: number;
  avatarIcon: string;
  isCurrentUser?: boolean;
  streak: number;
}
