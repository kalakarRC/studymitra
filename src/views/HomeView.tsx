import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScallopedCookieIcon, OrganicBlob } from '../components/OrganicBlob';
import { SubjectChapter, EnergyMode } from '../types';
import { 
  Search, 
  Sparkles, 
  Play, 
  Mic, 
  Activity, 
  ChevronRight, 
  X, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  Zap, 
  ShieldAlert,
  Flame,
  ZoomIn
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { 
    user, 
    chapters, 
    setEnergyMode, 
    startLearningChapter, 
    startVivaRoom, 
    awardUrja, 
    awardSikka,
    setClassLevel
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedChapter, setSelectedChapter] = useState<SubjectChapter | null>(null);
  const [showMistakeAutopsy, setShowMistakeAutopsy] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('formulas');

  // Filter tags
  const tags = ['All', user.classLevel, '🔥 High ROI', '⚠️ Weak Zones', '📐 Picture/SVG', '🧩 Case-Based', '9th', '11th', '12th'];

  // Filtered chapters
  const filteredChapters = chapters.filter(ch => {
    const matchesSearch = ch.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ch.subject.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (selectedTag === 'All' || selectedTag === user.classLevel) return true;
    if (selectedTag === '🔥 High ROI') return ch.weightage >= 10;
    if (selectedTag === '⚠️ Weak Zones') return ch.isWeak;
    if (selectedTag === '📐 Picture/SVG') return ch.concepts.some(c => c.diagramSvg);
    if (selectedTag === '9th') return true;
    if (selectedTag === '11th') return true;
    if (selectedTag === '12th') return true;
    return true;
  });

  const handleTagClick = (tag: string) => {
    if (tag === '9th') { setClassLevel('Class 9'); setSelectedTag('Class 9'); return; }
    if (tag === '11th') { setClassLevel('Class 11'); setSelectedTag('Class 11'); return; }
    if (tag === '12th') { setClassLevel('Class 12'); setSelectedTag('Class 12'); return; }
    setSelectedTag(tag);
  };

  const handleClaimTask = (type: 'checkpoint' | 'weakZone') => {
    if (type === 'checkpoint') {
      awardSikka(25);
      alert('Claimed +25 Sikka for Checkpoint sprint!');
    } else {
      awardUrja(40);
      alert('Claimed +40 Urja for Weak Zone review!');
    }
  };

  return (
    <div className="pb-28 pt-2 px-4 max-w-4xl mx-auto space-y-6">
      {/* Persistent Rounded Search Header Bar with Capsule Ends */}
      <div className="relative flex items-center">
        <div className="relative w-full flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search chapters, formulas, ray diagrams, Ohm's law..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white dark:bg-[#1e1b26] border border-black/5 dark:border-white/10 text-xs text-slate-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>
      </div>

      {/* Horizontal Category Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
              selectedTag === tag
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                : 'bg-white dark:bg-[#1e1b26] text-slate-600 dark:text-slate-300 border border-black/5 dark:border-white/10 hover:bg-slate-50'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Multi-Peek Hero Carousel (Google M3 Expressive Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Adaptive Goal & Countdown Banner */}
        <div className="relative rounded-[26px] p-5 sm:p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-[#1e1b26] dark:via-[#191924] dark:to-[#24172a] border border-indigo-200/50 dark:border-indigo-900/40 shadow-lg overflow-hidden flex flex-col justify-between">
          <OrganicBlob color="currentColor" className="text-indigo-400/10 w-40 h-40" />
          
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-indigo-600 text-white font-extrabold text-[10px] tracking-wide uppercase">
                🎯 {user.dreamCollege}
              </span>
              <span className="text-[11px] font-mono font-bold text-indigo-700 dark:text-indigo-300">
                {user.board} Blueprint
              </span>
            </div>

            <div className="font-heading font-black text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white my-1">
              {user.targetDaysLeft} DAYS LEFT
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Target Branch: <strong className="text-slate-900 dark:text-slate-200">{user.targetBranch}</strong> • 3.5h laser study target today
            </p>
          </div>

          {/* 3-State Energy Selector */}
          <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Daily Energy State
            </div>
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-white/70 dark:bg-white/5 border border-black/5 dark:border-white/10">
              {[
                { id: 'full', label: '⚡ Full Power', desc: '45m Checkpoints' },
                { id: 'low', label: '🔋 Low Energy', desc: '30m Sprints' },
                { id: 'survival', label: '🛡️ 15m Survival', desc: '1 Core Concept' }
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setEnergyMode(mode.id as EnergyMode)}
                  className={`py-1.5 px-2 rounded-xl text-center text-[10px] font-bold transition-all ${
                    user.energyMode === mode.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <div>{mode.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Daily Tasks for Sikka & Urja */}
        <div className="relative rounded-[26px] p-5 sm:p-6 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-[#281a20] dark:via-[#1e1b26] dark:to-[#1b222a] border border-amber-200/50 dark:border-amber-900/40 shadow-lg overflow-hidden flex flex-col justify-between">
          <OrganicBlob color="currentColor" className="text-amber-400/10 w-40 h-40" />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <ScallopedCookieIcon bg="bg-amber-400 text-slate-950" size="w-7 h-7">
                <span className="text-xs">🎁</span>
              </ScallopedCookieIcon>
              <h2 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                Daily Sikka & Urja Quests
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              Clear quick micro-goals to purchase Bazaar Drip & Holographic Skins.
            </p>
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-between">
              <div>
                <div className="font-heading font-bold text-xs text-slate-900 dark:text-white">
                  Complete 2 Checkpoints
                </div>
                <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                  +25 Sikka reward
                </div>
              </div>
              <button
                onClick={() => handleClaimTask('checkpoint')}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold text-xs shadow-sm transition-all"
              >
                Claim
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-between">
              <div>
                <div className="font-heading font-bold text-xs text-slate-900 dark:text-white">
                  Fix 1 Weak Zone Autopsy
                </div>
                <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                  +40 Urja reward
                </div>
              </div>
              <button
                onClick={() => handleClaimTask('weakZone')}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs shadow-sm transition-all"
              >
                Claim
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Subject Bento Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <span>Subject Bento Syllabus</span>
            <span className="text-xs font-normal text-slate-400">({user.classLevel})</span>
          </h2>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            {filteredChapters.length} Chapters Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredChapters.map(chapter => {
            const isSci = chapter.subject === 'Science';
            const isMath = chapter.subject === 'Mathematics';
            const bgGradient = isSci 
              ? 'bg-[#E8DEF8] dark:bg-[#1E1B26]' 
              : isMath 
              ? 'bg-[#D0E4FF] dark:bg-[#17222E]' 
              : 'bg-[#D3F9D8] dark:bg-[#16241C]';

            return (
              <div
                key={chapter.id}
                onClick={() => setSelectedChapter(chapter)}
                className={`group relative rounded-[26px] p-5 ${bgGradient} border border-black/5 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between`}
              >
                <OrganicBlob color="currentColor" className="text-black/5 dark:text-white/5 w-36 h-36" />

                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <ScallopedCookieIcon bg="bg-white dark:bg-white/10 text-slate-900 dark:text-white" size="w-8 h-8">
                      <span className="text-xs">{isSci ? '🔬' : isMath ? '📐' : '📜'}</span>
                    </ScallopedCookieIcon>
                    <div className="flex items-center gap-1.5">
                      {chapter.isWeak && (
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold text-[10px]">
                          ⚠️ Weak Zone
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-slate-800 dark:text-slate-200 font-bold text-[10px]">
                        {chapter.weightage} Marks
                      </span>
                    </div>
                  </div>

                  {/* Title & Subject */}
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {chapter.subject}
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white mt-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {chapter.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10">
                  {/* Glowing Gemini Pill Progress Bar */}
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                    <span>Competency: {chapter.competencyPct}%</span>
                    <span>Past Accuracy: {chapter.accuracy}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden mb-3">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-500"
                      style={{ width: `${chapter.competencyPct}%` }}
                    />
                  </div>

                  {/* Rapid Start Learning Pill Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startLearningChapter(chapter.id);
                    }}
                    className="w-full py-2.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start Interactive Learning</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Orion "App Details" Slide-Up Bottom Sheet */}
      {selectedChapter && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-0 sm:p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#1e1b26] rounded-t-[32px] sm:rounded-[32px] border border-black/10 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Top Drag Handle */}
            <div className="w-full flex items-center justify-center pt-3 pb-1 cursor-pointer">
              <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-white/20" />
            </div>

            {/* Header with Hero Branding */}
            <div className="p-5 pb-3 border-b border-black/5 dark:border-white/10 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <ScallopedCookieIcon bg="bg-indigo-600 text-white" size="w-12 h-12">
                  <span className="text-xl">
                    {selectedChapter.subject === 'Science' ? '🔬' : '📐'}
                  </span>
                </ScallopedCookieIcon>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400">
                      {selectedChapter.subject} • {user.classLevel}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-[9px] font-bold">
                      CBSE 2026-27 Blueprint
                    </span>
                  </div>
                  <h3 className="font-heading font-black text-lg sm:text-xl text-slate-900 dark:text-white">
                    {selectedChapter.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedChapter(null)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-5 overflow-y-auto space-y-5">
              {/* Quick Stats Row with Vertical Dividers */}
              <div className="grid grid-cols-3 divide-x divide-black/10 dark:divide-white/10 p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-center">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Board Weightage</div>
                  <div className="font-heading font-black text-base text-slate-900 dark:text-white">
                    {selectedChapter.weightage} Marks
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Competency</div>
                  <div className="font-heading font-black text-base text-indigo-600 dark:text-indigo-400">
                    {selectedChapter.competencyPct}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Past Accuracy</div>
                  <div className="font-heading font-black text-base text-emerald-600 dark:text-emerald-400">
                    {selectedChapter.accuracy}%
                  </div>
                </div>
              </div>

              {/* Action Matrix: 3 Full-Width 2-Line M3E Capsule Buttons */}
              <div className="space-y-2.5">
                {/* Button 1: Concept Stage */}
                <button
                  onClick={() => {
                    startLearningChapter(selectedChapter.id);
                  }}
                  className="w-full text-left p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white shadow-lg shadow-indigo-600/25 flex items-center gap-3 transition-all"
                >
                  <ScallopedCookieIcon bg="bg-white/20 text-white" size="w-10 h-10">
                    <Play className="w-5 h-5 fill-current" />
                  </ScallopedCookieIcon>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-indigo-200">
                      CONCEPT STAGE
                    </div>
                    <div className="font-heading font-extrabold text-sm text-white">
                      ▶ Start Interactive Learning (3-4m Sprints)
                    </div>
                  </div>
                </button>

                {/* Button 2: Oral Examiner */}
                <button
                  onClick={() => {
                    startVivaRoom(selectedChapter.id);
                  }}
                  className="w-full text-left p-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 active:scale-[0.98] text-white shadow-lg shadow-purple-600/25 flex items-center gap-3 transition-all"
                >
                  <ScallopedCookieIcon bg="bg-white/20 text-white" size="w-10 h-10">
                    <Mic className="w-5 h-5" />
                  </ScallopedCookieIcon>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-purple-200">
                      ORAL EXAMINER
                    </div>
                    <div className="font-heading font-extrabold text-sm text-white">
                      🎙️ Enter Voice Viva Room (Concentric Soundwaves)
                    </div>
                  </div>
                </button>

                {/* Button 3: Diagnostic Scan */}
                <button
                  onClick={() => setShowMistakeAutopsy(!showMistakeAutopsy)}
                  className="w-full text-left p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 active:scale-[0.98] text-slate-800 dark:text-white border border-black/5 dark:border-white/10 flex items-center gap-3 transition-all"
                >
                  <ScallopedCookieIcon bg="bg-rose-500 text-white" size="w-10 h-10">
                    <Activity className="w-5 h-5" />
                  </ScallopedCookieIcon>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-rose-500">
                      DIAGNOSTIC SCAN
                    </div>
                    <div className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                      🔍 Run Mistake Autopsy Report (Past Errors & Traps)
                    </div>
                  </div>
                </button>
              </div>

              {/* Inline SVG Diagram Carousel Preview */}
              {selectedChapter.concepts.some(c => c.diagramSvg) && (
                <div className="p-4 rounded-3xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-heading font-bold text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <ZoomIn className="w-3.5 h-3.5 text-indigo-500" />
                      Inline High-Precision SVG Diagram Preview
                    </span>
                    <span className="text-[10px] text-slate-400">Pinch or drag to inspect</span>
                  </div>
                  <div 
                    className="p-2 rounded-2xl bg-white dark:bg-[#141416] border border-black/5 dark:border-white/5 flex items-center justify-center overflow-x-auto"
                    dangerouslySetInnerHTML={{
                      __html: selectedChapter.concepts.find(c => c.diagramSvg)?.diagramSvg || ''
                    }}
                  />
                </div>
              )}

              {/* Diagnostic Mistake Autopsy Overlays */}
              {showMistakeAutopsy && (
                <div className="p-4 rounded-3xl bg-rose-500/10 border border-rose-500/20 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-heading font-bold text-xs uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Mistake Autopsy Overlays & Speed-Click Errors</span>
                  </div>
                  {selectedChapter.mistakeAutopsy.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-white dark:bg-[#141416] border border-rose-500/15 text-xs space-y-1">
                      <div className="text-rose-500 font-semibold">❌ Trap: {m.pastError}</div>
                      <div className="text-emerald-600 dark:text-emerald-400 font-medium">✅ Rule: {m.correctPattern}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Sub-topic: {m.weakSubtopic}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Expandable Accordions: Formula Cheat-Sheet, CBSE Pattern, Mistake Changelog */}
              <div className="space-y-2">
                {/* Accordion 1: Formula Cheat-Sheet */}
                <div className="rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'formulas' ? null : 'formulas')}
                    className="w-full p-3.5 bg-slate-50 dark:bg-white/5 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200"
                  >
                    <span>📐 Formula Cheat-Sheet & Sign Conventions</span>
                    {openAccordion === 'formulas' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'formulas' && (
                    <div className="p-4 bg-white dark:bg-[#1a1824] space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                      {selectedChapter.formulas.map((f, i) => (
                        <div key={i} className="p-2 rounded-xl bg-slate-50 dark:bg-white/5">
                          {f}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Accordion 2: 2026-27 CBSE Question Pattern */}
                <div className="rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'cbse' ? null : 'cbse')}
                    className="w-full p-3.5 bg-slate-50 dark:bg-white/5 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200"
                  >
                    <span>🎯 2026-27 CBSE Question Pattern Breakdown</span>
                    {openAccordion === 'cbse' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'cbse' && (
                    <div className="p-4 bg-white dark:bg-[#1a1824] space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      <p>• <strong>50% Competency-Based:</strong> Real-life scenario calculations & ray trace interpretation.</p>
                      <p>• <strong>20% Direct Conceptual:</strong> Definitions, Snell's law statement, derivations.</p>
                      <p>• <strong>20% MCQs & Assertion-Reason:</strong> Critical traps around negative mirror signs.</p>
                      <p>• <strong>10% Case-Based Integration:</strong> Multi-part questions on optical fiber / solar furnaces.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
