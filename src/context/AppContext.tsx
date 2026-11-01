import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, SubjectChapter, Friend, SurfaceTheme, EnergyMode, BazaarItem } from '../types';
import { INITIAL_CHAPTERS, INITIAL_FRIENDS, BAZAAR_CATALOG, SCALLOPED_BADGES } from '../data/mockData';
import { generateRandomCodename, calculateCheckpointRewards } from '../utils/studyLogic';

interface AppContextType {
  user: UserProfile;
  chapters: SubjectChapter[];
  friends: Friend[];
  currentRoute: string;
  isUpdateRequired: boolean;
  activeChapterId: string;
  unbankedUrja: number;
  segmentProgressSec: number;
  sikkaSpin: boolean;
  theme: SurfaceTheme;
  isP2PDrawerOpen: boolean;
  selectedFriendId: string | null;
  activeBattle: {
    isOpen: boolean;
    friendId: string;
    myScore: number;
    friendScore: number;
    questionIndex: number;
    question: string;
    options: string[];
    correctIndex: number;
  } | null;
  settingsCardsOrder: string[];
  
  // Navigation & Actions
  navigate: (route: string) => void;
  setIsUpdateRequired: (val: boolean) => void;
  loginUser: (email: string, pass: string) => boolean;
  registerUser: (name: string, username: string, email: string) => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;
  setEnergyMode: (mode: EnergyMode) => void;
  setClassLevel: (lvl: UserProfile['classLevel']) => void;
  openChapterDetails: (id: string) => void;
  startLearningChapter: (id: string) => void;
  startVivaRoom: (id: string) => void;
  leaveLearningPrematurely: () => void;
  confirmEarlyExitPenalty: () => void;
  resumeCurrentSegment: () => void;
  bankUrjaAndContinue: () => void;
  bankUrjaAndLeave: () => void;
  fastForwardCheckpoint: () => void;
  buyAndEquipItem: (item: BazaarItem) => boolean;
  equipItem: (item: BazaarItem) => void;
  addFriendByCodename: (codename: string) => { success: boolean; message: string };
  openFriendChat: (friendId: string) => void;
  closeFriendChat: () => void;
  sendP2PMessage: (friendId: string, text?: string, imageUrl?: string) => void;
  startBattleWithFriend: (friendId: string) => void;
  answerBattleQuestion: (index: number) => void;
  closeBattleModal: () => void;
  awardSikka: (amount: number) => void;
  awardUrja: (amount: number) => void;
  reorderSettingsCards: (newOrder: string[]) => void;
  togglePinChapter: (chapterId: string) => void;
  resetChapterProgress: (chapterId: string) => void;
}

const DEFAULT_USER: UserProfile = {
  realName: 'Arnav Sharma',
  username: 'Arnav_Pilot',
  gmail: 'arnav.sharma@gmail.com',
  isVerified: true,
  schoolName: 'Delhi Public School (Bopal, Ahmedabad)',
  classLevel: 'Class 10',
  board: 'CBSE',
  gender: 'Boy',
  stream: 'PCM & Robotics',
  dreamCollege: 'LDCE Ahmedabad',
  targetBranch: 'Robotics & Automation',
  language: 'Hinglish',
  interests: ['Robotics', 'Cricket', 'AI Tech'],
  codename: 'lemon-ball',
  streak: 12,
  urja: 1450,
  sikka: 185,
  baselineScores: {
    'Mathematics': 48,
    'Science': 42.5,
    'Social Science': 54,
    'English': 66
  },
  targetDaysLeft: 109,
  weakChapters: ['sci-light', 'math-triangles'],
  energyMode: 'full',
  equippedItems: {
    upperBodyDrip: 'drip-gold-chain',
    avatarRing: 'ring-neon-pulse',
    cardSkin: 'skin-holo-foil',
    streakFlame: 'flame-classic-orange',
    theme: 'pastel'
  },
  purchasedItems: ['drip-gold-chain', 'ring-neon-pulse', 'skin-holo-foil', 'flame-classic-orange', 'theme-pastel', 'theme-charcoal', 'theme-oled'],
  unlockedBadges: ['b1', 'b2', 'b3'],
  checkpointsCleared: 14,
  weakZonesFixed: 3,
  battlesWon: 6,
  totalBattles: 9
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('studymitra_user_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_USER;
  });

  const [chapters, setChapters] = useState<SubjectChapter[]>(() => {
    try {
      const saved = localStorage.getItem('studymitra_chapters_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_CHAPTERS;
  });

  const [friends, setFriends] = useState<Friend[]>(() => {
    try {
      const saved = localStorage.getItem('studymitra_friends_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_FRIENDS;
  });

  const [currentRoute, setCurrentRoute] = useState<string>('/home');
  const [isUpdateRequired, setIsUpdateRequired] = useState<boolean>(false);
  const [activeChapterId, setActiveChapterId] = useState<string>('sci-light');
  const [unbankedUrja, setUnbankedUrja] = useState<number>(45);
  const [segmentProgressSec, setSegmentProgressSec] = useState<number>(85); // 0 to 210s (3.5 mins)
  const [sikkaSpin, setSikkaSpin] = useState<boolean>(false);
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);
  const [isP2PDrawerOpen, setIsP2PDrawerOpen] = useState<boolean>(false);
  
  const [settingsCardsOrder, setSettingsCardsOrder] = useState<string[]>([
    'ai-packs', 'look-feel', 'multi-ai', 'storage', 'mitra-xtra', 'backup', 'interface'
  ]);

  const [activeBattle, setActiveBattle] = useState<{
    isOpen: boolean;
    friendId: string;
    myScore: number;
    friendScore: number;
    questionIndex: number;
    question: string;
    options: string[];
    correctIndex: number;
  } | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('studymitra_user_v1', JSON.stringify(user));
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('studymitra_chapters_v1', JSON.stringify(chapters));
    } catch {}
  }, [chapters]);

  useEffect(() => {
    try {
      localStorage.setItem('studymitra_friends_v1', JSON.stringify(friends));
    } catch {}
  }, [friends]);

  // Handle coin spin effect
  const triggerSikkaSpin = () => {
    setSikkaSpin(true);
    setTimeout(() => setSikkaSpin(false), 900);
  };

  const awardSikka = (amt: number) => {
    setUser(prev => ({ ...prev, sikka: prev.sikka + amt }));
    triggerSikkaSpin();
  };

  const awardUrja = (amt: number) => {
    setUser(prev => ({ ...prev, urja: prev.urja + amt }));
  };

  const navigate = (route: string) => {
    setCurrentRoute(route);
  };

  const loginUser = (email: string, _pass: string) => {
    setUser(prev => ({ ...prev, gmail: email, isVerified: true }));
    navigate('/home');
    return true;
  };

  const registerUser = (name: string, username: string, email: string) => {
    setUser(prev => ({
      ...prev,
      realName: name,
      username,
      gmail: email,
      codename: generateRandomCodename(),
      isVerified: false
    }));
  };

  const completeOnboarding = (data: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...data }));
    navigate('/home');
  };

  const setEnergyMode = (mode: EnergyMode) => {
    setUser(prev => ({ ...prev, energyMode: mode }));
  };

  const setClassLevel = (lvl: UserProfile['classLevel']) => {
    setUser(prev => ({ ...prev, classLevel: lvl }));
  };

  const openChapterDetails = (id: string) => {
    setActiveChapterId(id);
  };

  const startLearningChapter = (id: string) => {
    setActiveChapterId(id);
    setSegmentProgressSec(45);
    setUnbankedUrja(30);
    navigate('/learn');
  };

  const startVivaRoom = (id: string) => {
    setActiveChapterId(id);
    navigate('/viva');
  };

  const leaveLearningPrematurely = () => {
    // triggers warning modal inside /learn
  };

  const confirmEarlyExitPenalty = () => {
    // Lose unbanked urja and return home
    setUnbankedUrja(0);
    navigate('/home');
  };

  const resumeCurrentSegment = () => {
    // continues segment
  };

  const bankUrjaAndContinue = () => {
    const rewards = calculateCheckpointRewards(user.energyMode);
    setUser(prev => ({
      ...prev,
      urja: prev.urja + rewards.urjaEarned,
      sikka: prev.sikka + rewards.sikkaEarned,
      checkpointsCleared: prev.checkpointsCleared + 1
    }));
    triggerSikkaSpin();
    setUnbankedUrja(0);
    setSegmentProgressSec(0);
  };

  const bankUrjaAndLeave = () => {
    bankUrjaAndContinue();
    navigate('/home');
  };

  const fastForwardCheckpoint = () => {
    setSegmentProgressSec(210); // reach 3.5 min mark instantly
  };

  const buyAndEquipItem = (item: BazaarItem) => {
    if (user.sikka < item.price) return false;
    setUser(prev => {
      const newSikka = prev.sikka - item.price;
      const newPurchased = [...prev.purchasedItems, item.id];
      const newEquipped = { ...prev.equippedItems };
      if (item.category === 'drip') newEquipped.upperBodyDrip = item.id;
      if (item.category === 'rings') newEquipped.avatarRing = item.id;
      if (item.category === 'skins') newEquipped.cardSkin = item.id;
      if (item.category === 'flames') newEquipped.streakFlame = item.id;
      if (item.category === 'themes') newEquipped.theme = item.id.replace('theme-', '') as SurfaceTheme;
      return {
        ...prev,
        sikka: newSikka,
        purchasedItems: newPurchased,
        equippedItems: newEquipped
      };
    });
    triggerSikkaSpin();
    return true;
  };

  const equipItem = (item: BazaarItem) => {
    setUser(prev => {
      const newEquipped = { ...prev.equippedItems };
      if (item.category === 'drip') newEquipped.upperBodyDrip = item.id;
      if (item.category === 'rings') newEquipped.avatarRing = item.id;
      if (item.category === 'skins') newEquipped.cardSkin = item.id;
      if (item.category === 'flames') newEquipped.streakFlame = item.id;
      if (item.category === 'themes') newEquipped.theme = item.id.replace('theme-', '') as SurfaceTheme;
      return { ...prev, equippedItems: newEquipped };
    });
  };

  const addFriendByCodename = (codename: string) => {
    const clean = codename.trim().toLowerCase();
    if (!clean) return { success: false, message: 'Please enter a valid codename' };
    if (clean === user.codename) return { success: false, message: 'You cannot add your own codename!' };
    const existing = friends.find(f => f.codename.toLowerCase() === clean);
    if (existing) return { success: false, message: `Friend @${existing.username} already added!` };

    const newFriend: Friend = {
      id: `f-${Date.now()}`,
      codename: clean,
      username: `${clean.split('-')[0]}_star`,
      realName: `${clean.charAt(0).toUpperCase() + clean.slice(1)} Student`,
      rankBadge: 'Gold II',
      streak: 5,
      avatarSeed: clean,
      battlesCount: 0,
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'them',
          text: `Added via Codename ${clean}! Let's study together.`,
          timestamp: 'Just now'
        }
      ]
    };
    setFriends(prev => [newFriend, ...prev]);
    return { success: true, message: `Connected with ${newFriend.realName} (@${newFriend.username})!` };
  };

  const openFriendChat = (friendId: string) => {
    setSelectedFriendId(friendId);
    setIsP2PDrawerOpen(true);
  };

  const closeFriendChat = () => {
    setIsP2PDrawerOpen(false);
  };

  const sendP2PMessage = (friendId: string, text?: string, imageUrl?: string) => {
    setFriends(prev => prev.map(f => {
      if (f.id !== friendId) return f;
      return {
        ...f,
        messages: [
          ...f.messages,
          {
            id: `msg-${Date.now()}`,
            sender: 'me',
            text,
            imageUrl,
            timestamp: 'Just now'
          }
        ]
      };
    }));
  };

  const startBattleWithFriend = (friendId: string) => {
    setActiveBattle({
      isOpen: true,
      friendId,
      myScore: 50,
      friendScore: 50,
      questionIndex: 0,
      question: 'Which ray passes through the focus of a concave mirror after reflection?',
      options: [
        'A ray incident parallel to the principal axis',
        'A ray incident passing through the center of curvature',
        'A ray incident obliquely at the pole',
        'A ray passing through the focus before reflection'
      ],
      correctIndex: 0
    });
  };

  const answerBattleQuestion = (index: number) => {
    if (!activeBattle) return;
    const isCorrect = index === activeBattle.correctIndex;
    const shift = isCorrect ? 15 : -10;
    const newMyScore = Math.min(100, Math.max(0, activeBattle.myScore + shift));
    const newFriendScore = 100 - newMyScore;

    if (newMyScore >= 95 || newMyScore <= 5) {
      // Battle over
      if (newMyScore >= 95) {
        awardUrja(60);
        awardSikka(25);
        setUser(p => ({ ...p, battlesWon: p.battlesWon + 1, totalBattles: p.totalBattles + 1 }));
      } else {
        setUser(p => ({ ...p, totalBattles: p.totalBattles + 1 }));
      }
    }

    setActiveBattle(prev => prev ? ({
      ...prev,
      myScore: newMyScore,
      friendScore: newFriendScore,
      questionIndex: prev.questionIndex + 1,
      question: prev.questionIndex === 0 
        ? 'What is the commercial unit of electrical energy?' 
        : 'Which theorem states that a parallel line divides triangle sides in equal ratio?',
      options: prev.questionIndex === 0
        ? ['Kilowatt-Hour (1 kWh)', 'Joule-second', 'Volt-Ampere', 'Coulomb']
        : ['Basic Proportionality Theorem (BPT)', 'Pythagoras Theorem', 'Euler Theorem', 'Converse of BPT'],
      correctIndex: 0
    }) : null);
  };

  const closeBattleModal = () => {
    setActiveBattle(null);
  };

  const reorderSettingsCards = (newOrder: string[]) => {
    setSettingsCardsOrder(newOrder);
  };

  const togglePinChapter = (chapterId: string) => {
    setChapters(prev => prev.map(ch => ch.id === chapterId ? { ...ch, isPinned: !ch.isPinned } : ch));
  };

  const resetChapterProgress = (chapterId: string) => {
    setChapters(prev => prev.map(ch => ch.id === chapterId ? { ...ch, accuracy: 0, competencyPct: 0 } : ch));
  };

  return (
    <AppContext.Provider value={{
      user,
      chapters,
      friends,
      currentRoute,
      isUpdateRequired,
      activeChapterId,
      unbankedUrja,
      segmentProgressSec,
      sikkaSpin,
      theme: user.equippedItems.theme,
      isP2PDrawerOpen,
      selectedFriendId,
      activeBattle,
      settingsCardsOrder,
      navigate,
      setIsUpdateRequired,
      loginUser,
      registerUser,
      completeOnboarding,
      setEnergyMode,
      setClassLevel,
      openChapterDetails,
      startLearningChapter,
      startVivaRoom,
      leaveLearningPrematurely,
      confirmEarlyExitPenalty,
      resumeCurrentSegment,
      bankUrjaAndContinue,
      bankUrjaAndLeave,
      fastForwardCheckpoint,
      buyAndEquipItem,
      equipItem,
      addFriendByCodename,
      openFriendChat,
      closeFriendChat,
      sendP2PMessage,
      startBattleWithFriend,
      answerBattleQuestion,
      closeBattleModal,
      awardSikka,
      awardUrja,
      reorderSettingsCards,
      togglePinChapter,
      resetChapterProgress
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
