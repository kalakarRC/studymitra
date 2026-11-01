export type ClassLevel = 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12';
export type BoardType = 'CBSE' | 'GSEB';
export type SurfaceTheme = 'pastel' | 'charcoal' | 'oled' | 'jjk' | 'bleach' | 'hinokami' | 'kronos';
export type EnergyMode = 'full' | 'low' | 'survival';

export interface UserProfile {
  realName: string;
  username: string;
  gmail: string;
  isVerified: boolean;
  schoolName: string;
  classLevel: ClassLevel;
  board: BoardType;
  gender: 'Boy' | 'Girl';
  stream: string;
  dreamCollege: string;
  targetBranch: string;
  language: 'Gujarati' | 'Hinglish' | 'English';
  interests: string[];
  codename: string;
  streak: number;
  urja: number;
  sikka: number;
  baselineScores: Record<string, number>; // e.g. Maths: 18, Science: 41.5
  targetDaysLeft: number;
  weakChapters: string[];
  energyMode: EnergyMode;
  equippedItems: {
    upperBodyDrip: string;
    avatarRing: string;
    cardSkin: string;
    streakFlame: string;
    theme: SurfaceTheme;
  };
  purchasedItems: string[];
  unlockedBadges: string[];
  checkpointsCleared: number;
  weakZonesFixed: number;
  battlesWon: number;
  totalBattles: number;
}

export interface SubjectChapter {
  id: string;
  subject: string;
  title: string;
  weightage: number; // marks
  competencyPct: number;
  accuracy: number;
  isWeak: boolean;
  isPinned: boolean;
  concepts: {
    title: string;
    summary: string;
    diagramSvg?: string;
    teachingOptions: {
      text: string;
      explanation: string;
      isCoreRule?: boolean;
    }[];
    newsOrShieldSnippet: {
      tag: string;
      title: string;
      body: string;
    };
  }[];
  formulas: string[];
  mistakeAutopsy: {
    pastError: string;
    correctPattern: string;
    weakSubtopic: string;
  }[];
}

export interface Friend {
  id: string;
  codename: string;
  username: string;
  realName: string;
  rankBadge: string;
  streak: number;
  avatarSeed: string;
  battlesCount: number;
  messages: {
    id: string;
    sender: 'me' | 'them';
    text?: string;
    imageUrl?: string;
    timestamp: string;
  }[];
}

export interface BazaarItem {
  id: string;
  category: 'drip' | 'rings' | 'skins' | 'flames' | 'themes';
  name: string;
  price: number;
  icon: string;
  previewColor?: string;
  description: string;
}
