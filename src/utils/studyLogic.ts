import { EnergyMode } from '../types';

export interface RankInfo {
  name: string;
  level: number;
  minUrja: number;
  nextUrja: number;
  progressPct: number;
  color: string;
  glowClass: string;
}

export function calculateRankTier(urja: number): RankInfo {
  const tiers = [
    { name: 'Bronze I', level: 1, min: 0, max: 300, color: '#CD7F32', glowClass: 'from-amber-700 to-amber-900' },
    { name: 'Silver III', level: 3, min: 300, max: 700, color: '#C0C0C0', glowClass: 'from-gray-300 to-slate-500' },
    { name: 'Gold II', level: 6, min: 700, max: 1200, color: '#FFD700', glowClass: 'from-yellow-400 to-amber-600' },
    { name: 'Platinum I', level: 9, min: 1200, max: 1800, color: '#00E5FF', glowClass: 'from-cyan-400 to-blue-600' },
    { name: 'Diamond IV', level: 11, min: 1800, max: 2500, color: '#B388FF', glowClass: 'from-purple-400 to-indigo-600' },
    { name: 'Crown II', level: 14, min: 2500, max: 3500, color: '#FF4081', glowClass: 'from-pink-500 to-rose-700' },
    { name: 'Ace Dominator', level: 17, min: 3500, max: 5000, color: '#FF3D00', glowClass: 'from-orange-500 to-red-700' },
    { name: 'Conqueror Prime', level: 20, min: 5000, max: 10000, color: '#FFD700', glowClass: 'from-amber-300 via-rose-500 to-purple-600' }
  ];

  for (let i = 0; i < tiers.length; i++) {
    const t = tiers[i];
    if (urja < t.max || i === tiers.length - 1) {
      const range = t.max - t.min;
      const progress = Math.min(100, Math.max(0, Math.round(((urja - t.min) / range) * 100)));
      return {
        name: t.name,
        level: t.level,
        minUrja: t.min,
        nextUrja: t.max,
        progressPct: progress,
        color: t.color,
        glowClass: t.glowClass
      };
    }
  }

  return {
    name: 'Conqueror Prime',
    level: 20,
    minUrja: 5000,
    nextUrja: 10000,
    progressPct: 100,
    color: '#FFD700',
    glowClass: 'from-amber-300 to-rose-600'
  };
}

export function generateRandomCodename(): string {
  const adjectives = ['lemon', 'neon', 'cyber', 'quantum', 'astro', 'stellar', 'turbo', 'shadow', 'blaze', 'solar', 'sonic', 'hyper'];
  const nouns = ['ball', 'falcon', 'tiger', 'fox', 'puma', 'hawk', 'viper', 'crane', 'wolf', 'phoenix', 'lynx', 'cobra'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj}-${noun}`;
}

export function calculateGhostPaperSplit(totalQuestions: number = 20): {
  currentChapter: number;
  pastChapters: number;
  pastMistakes: number;
} {
  const current = Math.round(totalQuestions * 0.60);
  const past = Math.round(totalQuestions * 0.25);
  const mistakes = totalQuestions - current - past;
  return {
    currentChapter: current,
    pastChapters: past,
    pastMistakes: Math.max(1, mistakes)
  };
}

export function calculateFlameIntensity(streak: number): {
  scale: number;
  animationSpeed: string;
  glowBox: string;
  flameLevelText: string;
} {
  if (streak <= 1) {
    return { scale: 1.0, animationSpeed: '2s', glowBox: 'drop-shadow(0 0 4px #ff9800)', flameLevelText: 'Spark' };
  } else if (streak < 7) {
    return { scale: 1.15, animationSpeed: '1.5s', glowBox: 'drop-shadow(0 0 8px #ff5722)', flameLevelText: 'Ember' };
  } else if (streak < 21) {
    return { scale: 1.3, animationSpeed: '1.1s', glowBox: 'drop-shadow(0 0 14px #e91e63)', flameLevelText: 'Blaze' };
  } else {
    return { scale: 1.5, animationSpeed: '0.8s', glowBox: 'drop-shadow(0 0 20px #9c27b0)', flameLevelText: 'Supernova' };
  }
}

export function calculateAchievableRoutine(params: {
  baselineAvg: number; // e.g. 35 out of 80
  daysLeft: number;
  energyMode: EnergyMode;
  dreamGoal: string;
}): {
  dailyHours: number;
  sprintsCount: number;
  focusMessage: string;
  roiStrategy: string;
  dailyCheckpointTarget: number;
} {
  const { baselineAvg, daysLeft, energyMode, dreamGoal } = params;
  let baseHours = 3;
  if (baselineAvg < 30) baseHours = 4.5;
  else if (baselineAvg < 50) baseHours = 3.5;
  else baseHours = 2.5;

  if (energyMode === 'low') baseHours = Math.max(1.5, baseHours * 0.6);
  if (energyMode === 'survival') baseHours = 0.5;

  const sprints = Math.round(baseHours * 2); // 30-min sprints
  const dailyCheckpointTarget = Math.max(2, Math.round(baseHours * 3));

  return {
    dailyHours: Number(baseHours.toFixed(1)),
    sprintsCount: sprints,
    focusMessage: `${daysLeft} days to ${dreamGoal}: Target ${baseHours.toFixed(1)}h distributed in ${sprints} laser sprints`,
    roiStrategy: baselineAvg < 40 
      ? 'Focus 70% time on Class 10 High-Weightage Physics Ray Diagrams & Algebra to quickly push past 60/80 mark'
      : 'Maintain 60/25/15 ratio: 60% active chapter, 25% revision, 15% mistake autopsy to reach 75+/80',
    dailyCheckpointTarget
  };
}

export function calculateCheckpointRewards(energyMode: EnergyMode): {
  urjaEarned: number;
  sikkaEarned: number;
} {
  switch (energyMode) {
    case 'full':
      return { urjaEarned: 45, sikkaEarned: 15 };
    case 'low':
      return { urjaEarned: 30, sikkaEarned: 10 };
    case 'survival':
      return { urjaEarned: 20, sikkaEarned: 5 };
  }
}
