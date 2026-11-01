import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ScallopedCookieIcon, OrganicBlob } from '../components/OrganicBlob';
import { calculateRankTier, calculateFlameIntensity } from '../utils/studyLogic';
import { SCALLOPED_BADGES } from '../data/mockData';
import { 
  Award, 
  Flame, 
  RotateCw, 
  ShieldCheck, 
  Edit3, 
  ChevronRight, 
  Sparkles, 
  ArrowUp, 
  ArrowDown, 
  Sliders, 
  Wifi, 
  Database, 
  HardDrive, 
  RefreshCw, 
  Download, 
  Upload, 
  Eye, 
  EyeOff,
  Check
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { 
    user, 
    completeOnboarding, 
    setIsUpdateRequired, 
    setClassLevel, 
    settingsCardsOrder, 
    reorderSettingsCards,
    navigate
  } = useApp();

  // 3D Card Interactive Tilt & Flip States
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [showRealNamePreview, setShowRealNamePreview] = useState(false);

  // Quick Codename update state
  const [tempCodename, setTempCodename] = useState(user.codename);
  const [isSavingIdentity, setIsSavingIdentity] = useState(false);

  // Rank info
  const rank = calculateRankTier(user.urja);
  const flame = calculateFlameIntensity(user.streak);

  // 3D Tilt handlers
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 12;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent flip if clicking internal action buttons
    if ((e.target as HTMLElement).closest('button')) return;
    setIsFlipped(!isFlipped);
  };

  const handleSaveIdentity = () => {
    setIsSavingIdentity(true);
    completeOnboarding({ codename: tempCodename.trim().toLowerCase() });
    setTimeout(() => {
      setIsSavingIdentity(false);
      alert('Pilot Identity secured and synced with P2P directory!');
    }, 400);
  };

  // Reorder Masonry Cards
  const moveCard = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...settingsCardsOrder];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newOrder.length) return;
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIdx, 0, moved);
    reorderSettingsCards(newOrder);
  };

  return (
    <div className="pb-28 pt-2 px-4 max-w-4xl mx-auto space-y-6">
      {/* SECTION 1: INTERACTIVE 3D STUDENT CARD (MITRA PASS) */}
      <div className="flex flex-col items-center">
        <div className="text-center mb-3">
          <div className="text-[10px] uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400">
            STUDENT PILOT CREDENTIAL
          </div>
          <div className="text-xs text-slate-500">
            Drag to tilt • Tap card to flip 3D Holo-Deck (180°)
          </div>
        </div>

        {/* 3D Perspective Card Container */}
        <div
          className="w-full max-w-sm sm:max-w-md h-64 sm:h-72 perspective-1000 cursor-pointer select-none"
          onClick={handleCardClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={cardRef}
            className="w-full h-full relative transition-transform duration-500 transform-style-3d rounded-[28px] shadow-2xl"
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`
            }}
          >
            {/* FRONT SIDE EXACT POSITIONAL LAYOUT */}
            <div className="absolute inset-0 w-full h-full rounded-[28px] p-5 sm:p-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white border-2 border-white/20 backface-hidden overflow-hidden flex flex-col justify-between shadow-2xl">
              {/* Dynamic Specular Glare Overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-25 rounded-[28px]"
                style={{
                  background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.8) 0%, transparent 60%)`
                }}
              />
              <OrganicBlob color="currentColor" className="text-white/10 w-44 h-44" />

              {/* TOP ROW: BRAND TITLE (Left) + LEVEL & RANK NAME with CREST (Right) */}
              <div className="flex items-start justify-between z-10">
                {/* Top-Left: Card Brand Title */}
                <div>
                  <div className="font-heading font-black text-lg sm:text-xl tracking-wider text-white">
                    MITRA PASS
                  </div>
                  <div className="text-[9px] uppercase font-bold tracking-widest text-indigo-300">
                    STUDENT PILOT ID
                  </div>
                </div>

                {/* Top-Right: Level & Rank Name + Custom Rank Crest */}
                <div className="text-right flex flex-col items-end">
                  <div className="font-heading font-extrabold text-xs text-amber-300 uppercase tracking-wide">
                    LV {rank.level} • {rank.name}
                  </div>
                  <div className="mt-1">
                    <ScallopedCookieIcon bg="bg-amber-400 text-slate-950" size="w-7 h-7">
                      <span className="text-xs">🎖️</span>
                    </ScallopedCookieIcon>
                  </div>
                </div>
              </div>

              {/* CENTER ROW: UPPER-BODY AVATAR (Center-Left) + 3 STACKED ROWS (Center-Right) */}
              <div className="flex items-center gap-4 z-10 my-auto">
                {/* Center-Left: Large Circular Upper-Body Avatar with Equipped Ring */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/bazaar');
                  }}
                  title="Tap to change Upper-Body Drip in Bazaar"
                  className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center p-1 cursor-pointer transition-transform hover:scale-105 ${
                    user.equippedItems.avatarRing === 'ring-neon-pulse'
                      ? 'ring-4 ring-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.8)]'
                      : user.equippedItems.avatarRing === 'ring-scalloped-gold'
                      ? 'scalloped-badge bg-amber-400'
                      : 'ring-4 ring-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.8)]'
                  }`}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-black text-2xl flex items-center justify-center relative shadow-inner">
                    {user.realName.charAt(0)}
                    <span className="absolute bottom-0 right-0 text-xs">
                      {user.equippedItems.upperBodyDrip === 'drip-gold-chain' ? '⛓️' : '🧥'}
                    </span>
                  </div>
                </div>

                {/* Center-Right: 3 Stacked Rows */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  {/* Row 1: Username with Real Name toggle */}
                  <div className="flex items-center justify-between">
                    <div className="font-heading font-black text-base sm:text-lg text-white truncate">
                      {showRealNamePreview ? user.realName : user.username}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowRealNamePreview(!showRealNamePreview);
                      }}
                      className="p-1 text-slate-300 hover:text-white"
                      title="Preview how friends see your real name"
                    >
                      {showRealNamePreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Row 2: Codename Pill (Left) & Urja Earned Badge (Right) */}
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono font-bold text-indigo-200 border border-white/10">
                      {user.codename}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-[10px] font-bold text-indigo-300 border border-indigo-400/30 flex items-center gap-1">
                      <span>⚛️</span>
                      <span>{user.urja.toLocaleString()} Urja</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW: SCHOOL NAME • CLASS (Bottom-Left) + STREAK WITH ANIMATED FIRE (Bottom-Right) */}
              <div className="flex items-end justify-between z-10 pt-2 border-t border-white/15">
                {/* Bottom-Left */}
                <div className="max-w-[65%]">
                  <div className="text-[11px] font-bold text-slate-200 truncate">
                    {user.schoolName}
                  </div>
                  <div className="text-[10px] font-extrabold text-indigo-300 uppercase tracking-wider">
                    {user.classLevel} • {user.board}
                  </div>
                </div>

                {/* Bottom-Right: Days Streak Counter + Animated Fire Symbol */}
                <div className="text-right flex items-center gap-1.5">
                  <div>
                    <div className="font-heading font-black text-base sm:text-lg text-amber-300 leading-none">
                      {user.streak}d
                    </div>
                    <div className="text-[9px] uppercase font-bold text-slate-300">
                      Streak
                    </div>
                  </div>
                  <div
                    className="text-2xl animate-bounce"
                    style={{
                      transform: `scale(${flame.scale})`,
                      filter: flame.glowBox,
                      animationDuration: flame.animationSpeed
                    }}
                  >
                    🔥
                  </div>
                </div>
              </div>
            </div>

            {/* BACK SIDE LAYOUT (Customizable Ambition & Holo Deck) */}
            <div className="absolute inset-0 w-full h-full rounded-[28px] p-5 sm:p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white border-2 border-indigo-400/30 rotate-y-180 backface-hidden overflow-hidden flex flex-col justify-between shadow-2xl">
              <OrganicBlob color="currentColor" className="text-indigo-400/10 w-44 h-44" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">
                    HOLO-DECK AMBITION MATRIX
                  </span>
                  <span className="text-[10px] text-slate-400">Tap to flip ↩</span>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[9px] uppercase font-bold text-slate-400">Dream Target & Branch</div>
                    <div className="font-heading font-extrabold text-sm text-indigo-300">
                      🎯 {user.dreamCollege} ({user.targetBranch})
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[9px] uppercase font-bold text-slate-400">Stream Alignment</div>
                    <div className="font-heading font-extrabold text-sm text-amber-300">
                      ⚡ {user.stream}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {user.interests.map(i => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-[10px] font-semibold text-indigo-200">
                        #{i}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                <span>Skin: {user.equippedItems.cardSkin}</span>
                <span className="font-mono">ID: {user.codename}-2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: IDENTITY UPDATE BAR & 2x2 M3E ANALYTICS QUAD-GRID */}
      <div className="space-y-4">
        {/* Quick Codename Update Input */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1e1b26] border border-black/5 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-auto flex-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Update Student Alias / Codename
            </label>
            <input
              type="text"
              value={tempCodename}
              onChange={e => setTempCodename(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 focus:outline-none"
            />
          </div>
          <button
            onClick={handleSaveIdentity}
            disabled={isSavingIdentity}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Identity</span>
          </button>
        </div>

        {/* 2x2 Asymmetrical Pastel/Tonal Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Block 1 (Pink) */}
          <div className="p-4 rounded-[26px] bg-[#FFD8E4] dark:bg-[#281A20] border border-pink-300/40 dark:border-pink-900/40 shadow-sm relative overflow-hidden">
            <OrganicBlob color="currentColor" className="text-pink-600/10 w-24 h-24" />
            <div className="text-[10px] font-bold uppercase tracking-wider text-pink-800 dark:text-pink-300">
              Weak Zones Fixed
            </div>
            <div className="font-heading font-black text-2xl text-pink-950 dark:text-pink-100 mt-1">
              {user.weakZonesFixed} Chapters
            </div>
          </div>

          {/* Block 2 (Green) */}
          <div className="p-4 rounded-[26px] bg-[#D3F9D8] dark:bg-[#16241C] border border-emerald-300/40 dark:border-emerald-900/40 shadow-sm relative overflow-hidden">
            <OrganicBlob color="currentColor" className="text-emerald-600/10 w-24 h-24" />
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Checkpoints Cleared
            </div>
            <div className="font-heading font-black text-2xl text-emerald-950 dark:text-emerald-100 mt-1">
              {user.checkpointsCleared} Sprints
            </div>
          </div>

          {/* Block 3 (Amber) */}
          <div className="p-4 rounded-[26px] bg-[#FFF0C2] dark:bg-[#251f15] border border-amber-300/40 dark:border-amber-900/40 shadow-sm relative overflow-hidden">
            <OrganicBlob color="currentColor" className="text-amber-600/10 w-24 h-24" />
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Total Urja Earned
            </div>
            <div className="font-heading font-black text-2xl text-amber-950 dark:text-amber-100 mt-1">
              {user.urja.toLocaleString()} ⚛️
            </div>
          </div>

          {/* Block 4 (Purple) */}
          <div className="p-4 rounded-[26px] bg-[#E8DEF8] dark:bg-[#1E1B26] border border-purple-300/40 dark:border-purple-900/40 shadow-sm relative overflow-hidden">
            <OrganicBlob color="currentColor" className="text-purple-600/10 w-24 h-24" />
            <div className="text-[10px] font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300">
              Rank Tier
            </div>
            <div className="font-heading font-black text-lg sm:text-xl text-purple-950 dark:text-purple-100 mt-1 truncate">
              {rank.name}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: BATTLE ROYALE RANK TIERS & 17 SCALLOPED BADGES CAROUSEL */}
      <div className="space-y-4">
        <div className="p-5 rounded-[28px] bg-white dark:bg-[#1e1b26] border border-black/5 dark:border-white/10 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-500" />
              <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                Battle Royale Rank Progression (Free Fire / BGMI Style)
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {rank.progressPct}% to Next Tier
            </span>
          </div>

          {/* Rank Progression Bar */}
          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${rank.glowClass} transition-all duration-500`}
              style={{ width: `${rank.progressPct}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span>Bronze</span>
            <span>Silver</span>
            <span>Gold</span>
            <span>Platinum</span>
            <span>Diamond</span>
            <span>Crown</span>
            <span className="text-amber-500">Ace</span>
            <span className="text-rose-500">Conqueror</span>
          </div>
        </div>

        {/* 17 Scalloped Badge Carousel */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="font-heading font-bold text-xs text-slate-900 dark:text-white">
              Badge Collection ({user.unlockedBadges.length} of 17 unlocked ➔)
            </span>
            <span className="text-[10px] text-indigo-600 font-semibold">12-Point Scalloped Shields</span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
            {SCALLOPED_BADGES.map(badge => {
              const isUnlocked = user.unlockedBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`shrink-0 w-28 p-3 rounded-2xl border text-center transition-all ${
                    isUnlocked
                      ? 'bg-white dark:bg-[#1e1b26] border-indigo-300 dark:border-indigo-800 shadow-md'
                      : 'bg-slate-100 dark:bg-white/5 border-transparent opacity-50'
                  }`}
                >
                  <div className="flex justify-center mb-1.5">
                    <ScallopedCookieIcon
                      bg={isUnlocked ? 'bg-indigo-600 text-white' : 'bg-slate-300 text-slate-600'}
                      size="w-10 h-10"
                    >
                      <span className="text-base">{badge.icon}</span>
                    </ScallopedCookieIcon>
                  </div>
                  <div className="font-heading font-extrabold text-[11px] text-slate-900 dark:text-white truncate">
                    {badge.name}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5 line-clamp-2">
                    {badge.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 4: DRAGGABLE / REORDERABLE "EVERYTHING ELSE" MASONRY SETTINGS HUB */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h3 className="font-heading font-black text-base text-slate-900 dark:text-white">
              Orion Store Settings Masonry Hub
            </h3>
            <p className="text-[11px] text-slate-400">
              Use arrow buttons to reorder cards according to your study focus.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {settingsCardsOrder.map((cardId, index) => {
            return (
              <div
                key={cardId}
                className="relative rounded-[26px] p-5 bg-white dark:bg-[#1e1b26] border border-black/5 dark:border-white/10 shadow-sm overflow-hidden"
              >
                <OrganicBlob color="currentColor" className="text-black/5 dark:text-white/5 w-28 h-28" />

                {/* Reorder Buttons */}
                <div className="absolute top-4 right-4 flex items-center gap-1 z-10">
                  <button
                    onClick={() => moveCard(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-800 disabled:opacity-30"
                    title="Move card up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveCard(index, 'down')}
                    disabled={index === settingsCardsOrder.length - 1}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-800 disabled:opacity-30"
                    title="Move card down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card 1: AI Question Packs (Full-Width Slate Blue) */}
                {cardId === 'ai-packs' && (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 mb-1">
                      Full-Width Slate-Blue Card
                    </div>
                    <h4 className="font-heading font-black text-base text-slate-900 dark:text-white">
                      AI Question Packs (Offline Dexie Engine)
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      0 active • 4 CBSE/GSEB chapter packs cached locally in device memory for 100% offline study.
                    </p>
                  </div>
                )}

                {/* Card 2: Look & Feel (Double-Height Lavender) */}
                {cardId === 'look-feel' && (
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-purple-500">
                      Double-Height Lavender Card
                    </div>
                    <h4 className="font-heading font-black text-base text-slate-900 dark:text-white">
                      Look & Feel Typography & Surfaces
                    </h4>
                    <p className="text-xs text-slate-500">
                      Google Sans Flex paired with Space Grotesk. Select light cream, charcoal, or zero-pixel True OLED black.
                    </p>
                    <div className="flex gap-2 pt-1">
                      {['pastel', 'charcoal', 'oled'].map(s => (
                        <button
                          key={s}
                          onClick={() => completeOnboarding({ equippedItems: { ...user.equippedItems, theme: s as any } })}
                          className={`px-3 py-1 rounded-xl text-xs font-bold capitalize ${
                            user.equippedItems.theme === s ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-600'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card 3: Multi-AI Router & Network */}
                {cardId === 'multi-ai' && (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-500 mb-1">
                      Square Sky-Blue Card
                    </div>
                    <h4 className="font-heading font-black text-base text-slate-900 dark:text-white">
                      Multi-AI Router & Offline Rules
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Zero-cost JIT questions routed via Gemini 2.5 Flash. Local Dexie cache takes over when offline.
                    </p>
                  </div>
                )}

                {/* Card 4: Storage & Dexie Cache */}
                {cardId === 'storage' && (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-1">
                      Square Beige Card
                    </div>
                    <h4 className="font-heading font-black text-base text-slate-900 dark:text-white">
                      Storage & Dexie Cache
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Current footprint: <strong>1.4 MB</strong>. Stores offline SVG diagrams, Mistake Autopsy changelog, and P2P notes.
                    </p>
                  </div>
                )}

                {/* Card 5: Mitra Xtra (Full-Width Green with WhatsApp Update Kill-Switch Test) */}
                {cardId === 'mitra-xtra' && (
                  <div className="space-y-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">
                      Full-Width Green Card
                    </div>
                    <h4 className="font-heading font-black text-base text-slate-900 dark:text-white">
                      Mitra Xtra (Developer & Power Controls)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Test hardware lock-outs and simulate expired APK version updates.
                    </p>

                    {/* WhatsApp-Style Blank Update Gate Trigger */}
                    <div className="pt-2">
                      <button
                        onClick={() => setIsUpdateRequired(true)}
                        className="py-2.5 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center gap-2"
                      >
                        <span>⚡ Test WhatsApp-Style Blank Update Gate</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Card 6: Backup & Sync */}
                {cardId === 'backup' && (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-pink-500 mb-1">
                      Pink Backup Card
                    </div>
                    <h4 className="font-heading font-black text-base text-slate-900 dark:text-white">
                      Backup & Export
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      1-Tap <code>.studymitra</code> JSON export/import and Google Drive sync ready.
                    </p>
                  </div>
                )}

                {/* Card 7: Interface & Motion */}
                {cardId === 'interface' && (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-teal-500 mb-1">
                      Mint Interface Card
                    </div>
                    <h4 className="font-heading font-black text-base text-slate-900 dark:text-white">
                      Interface & Motion
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Glassmorphic floating dock animation, 3D card tilt physics, and haptic feedback enabled.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
