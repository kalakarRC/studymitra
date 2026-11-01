import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ScallopedCookieIcon, OrganicBlob } from '../components/OrganicBlob';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Bookmark, 
  FastForward, 
  BookOpen, 
  HelpCircle,
  Lightbulb,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const LearnView: React.FC = () => {
  const { 
    chapters, 
    activeChapterId, 
    user, 
    unbankedUrja, 
    segmentProgressSec,
    bankUrjaAndContinue, 
    bankUrjaAndLeave, 
    confirmEarlyExitPenalty, 
    fastForwardCheckpoint,
    navigate
  } = useApp();

  const [activeConceptIndex, setActiveConceptIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showExitPenaltyModal, setShowExitPenaltyModal] = useState(false);
  const [notePromptDismissed, setNotePromptDismissed] = useState(false);

  // 3.5 minutes target in seconds = 210s
  const CHECKPOINT_TARGET_SEC = 210;
  const isAtCheckpoint = segmentProgressSec >= CHECKPOINT_TARGET_SEC;

  // Active chapter
  const chapter = chapters.find(c => c.id === activeChapterId) || chapters[0];
  const concept = chapter.concepts[activeConceptIndex % chapter.concepts.length];

  const handleSelectOption = (index: number) => {
    setSelectedOptionIndex(index);
    setShowExplanation(true);
  };

  const handleNextConcept = () => {
    setSelectedOptionIndex(null);
    setShowExplanation(false);
    setActiveConceptIndex(prev => (prev + 1) % chapter.concepts.length);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#141416] text-slate-900 dark:text-white pb-20 select-none transition-colors">
      {/* Top Telemetry Header (Bottom Dock is Auto-Hidden on /learn) */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#1e1b26]/90 backdrop-blur-md border-b border-black/5 dark:border-white/10 px-4 py-3">
        <div className="max-w-2xl mx-auto flex flex-col gap-2">
          <div className="flex items-center justify-between">
            {/* Left: Red/Tonal Leave Topic Button */}
            <button
              onClick={() => {
                if (!isAtCheckpoint && unbankedUrja > 0) {
                  setShowExitPenaltyModal(true);
                } else {
                  navigate('/home');
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-bold active:scale-95 transition-all"
            >
              <span>🛑</span>
              <span>Leave Topic</span>
            </button>

            {/* Center: Chapter and Concept Pill */}
            <div className="text-center hidden sm:block">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {chapter.subject} • Sprint {activeConceptIndex + 1}
              </span>
              <div className="font-heading font-extrabold text-xs max-w-xs truncate">
                {chapter.title}
              </div>
            </div>

            {/* Right: Live Unbanked Urja Counter + Fast Forward Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={fastForwardCheckpoint}
                title="Fast-Forward to 3-4m Checkpoint for testing"
                className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 font-bold text-[10px] flex items-center gap-1 border border-indigo-200 dark:border-white/10 active:scale-95"
              >
                <FastForward className="w-3 h-3" />
                <span className="hidden sm:inline">Fast-Forward</span>
              </button>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 font-bold text-xs shadow-sm">
                <span className="animate-spin text-sm" style={{ animationDuration: '4s' }}>⚛️</span>
                <span>+{unbankedUrja}</span>
                <span className="text-[9px] uppercase tracking-wider opacity-75">Unbanked</span>
              </div>
            </div>
          </div>

          {/* M3E Topic Time & Segment Progress Bar */}
          <div className="w-full">
            <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold mb-1">
              <span>Segment Time: {Math.floor(segmentProgressSec / 60)}m {segmentProgressSec % 60}s</span>
              <span>Checkpoint Target: 3m 30s</span>
            </div>
            <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isAtCheckpoint
                    ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                }`}
                style={{ width: `${Math.min(100, (segmentProgressSec / CHECKPOINT_TARGET_SEC) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
        {/* CHECKPOINT REACHED VIEW (Leave or Continue Gate) */}
        {isAtCheckpoint ? (
          <div className="rounded-[32px] p-6 sm:p-8 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-indigo-500/10 dark:from-emerald-950/40 dark:via-[#1e1b26] dark:to-indigo-950/40 border-2 border-emerald-500/30 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            <OrganicBlob color="currentColor" className="text-emerald-500/15 w-48 h-48" />

            <div className="text-center mb-6">
              <div className="inline-flex mb-3">
                <ScallopedCookieIcon bg="bg-emerald-500 text-white" size="w-16 h-16">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </ScallopedCookieIcon>
              </div>
              <div className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400">
                3–4 Minute Checkpoint Cleared!
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
                Bank Your Sikka & Urja
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto mt-1">
                You successfully mastered this concept sprint. Your progress is anchored and safe.
              </p>
            </div>

            {/* Reward Summary Pill Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/10 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Urja Gained</div>
                <div className="font-heading font-black text-2xl text-indigo-600 dark:text-indigo-400">
                  +45 ⚛️
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/10 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Sikka Earned</div>
                <div className="font-heading font-black text-2xl text-amber-500">
                  +15 🪙
                </div>
              </div>
            </div>

            {/* AI Note Prompt Bubble */}
            {!notePromptDismissed && (
              <div className="mb-6 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50 flex items-start gap-3">
                <span className="text-xl">🤖</span>
                <div className="text-xs flex-1">
                  <div className="font-bold text-indigo-900 dark:text-indigo-200">StudyMitra AI Note Reminder</div>
                  <p className="text-indigo-700 dark:text-indigo-300 mt-0.5 leading-relaxed">
                    "Take quick notes of this concept in your notebook now, or tap 'Remind Me Next Time' so I'll show a summary right when you press Start Learning again!"
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={() => setNotePromptDismissed(true)}
                      className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Remind Me Next Time ⏰
                    </button>
                    <button
                      onClick={() => setNotePromptDismissed(true)}
                      className="text-[11px] font-bold text-slate-500 hover:underline"
                    >
                      Got it, written in notebook! ✍️
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2 Primary Choices */}
            <div className="space-y-3">
              <button
                onClick={bankUrjaAndContinue}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-xs shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all"
              >
                <span>✅ Bank Urja & Continue to Next Segment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={bankUrjaAndLeave}
                className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 active:scale-[0.98] text-slate-800 dark:text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <span>🏠 Bank Urja & Leave Safely</span>
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE LEARNING STREAM */
          <div className="space-y-6">
            {/* Concept Title & Summary Card */}
            <div className="relative rounded-[28px] p-6 bg-white dark:bg-[#1e1b26] border border-black/5 dark:border-white/10 shadow-lg overflow-hidden">
              <OrganicBlob color="currentColor" className="text-indigo-400/10 w-36 h-36" />
              
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
                <Lightbulb className="w-4 h-4" />
                <span>Interactive Concept Teaching • No Wrong Answers</span>
              </div>

              <h2 className="font-heading font-black text-xl text-slate-900 dark:text-white">
                {concept.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {concept.summary}
              </p>

              {/* Inline SVG Diagram with Pinch-to-Zoom */}
              {concept.diagramSvg && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Visual Ray Trace / Circuit Flow
                  </div>
                  <div
                    className="w-full overflow-x-auto flex justify-center py-2"
                    dangerouslySetInnerHTML={{ __html: concept.diagramSvg }}
                  />
                </div>
              )}
            </div>

            {/* Multi-Angle Interactive Teaching MCQs (No Wrong Answers) */}
            <div className="rounded-[28px] p-6 bg-white dark:bg-[#1e1b26] border border-black/5 dark:border-white/10 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-heading font-extrabold text-slate-800 dark:text-slate-200">
                  Tap ANY option to inspect what happens:
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40">
                  Exploratory Angle
                </span>
              </div>

              <div className="space-y-2.5">
                {concept.teachingOptions.map((opt, idx) => {
                  const isSelected = selectedOptionIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all active:scale-[0.99] text-xs font-semibold ${
                        isSelected
                          ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 text-indigo-900 dark:text-indigo-200 shadow-sm'
                          : 'bg-slate-50 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{opt.text}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-500" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Rich Explanation Card */}
              {showExplanation && selectedOptionIndex !== null && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-xs text-slate-700 dark:text-slate-200 space-y-2 animate-in fade-in duration-200">
                  <div className="font-heading font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Why This Angle Works:</span>
                  </div>
                  <p className="leading-relaxed">
                    {concept.teachingOptions[selectedOptionIndex].explanation}
                  </p>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleNextConcept}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                    >
                      <span>Next Concept Angle</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Softly Woven Life, News & Shield Card */}
            {concept.newsOrShieldSnippet && (
              <div className="rounded-[26px] p-5 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-amber-500/10 border border-purple-500/20 shadow-sm space-y-1.5">
                <div className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-300">
                  {concept.newsOrShieldSnippet.tag}
                </div>
                <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                  {concept.newsOrShieldSnippet.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {concept.newsOrShieldSnippet.body}
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* EARLY EXIT PENALTY SCREEN (High-Impact Warning Animation) */}
      {showExitPenaltyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-[32px] p-6 bg-[#141416] border-2 border-rose-500/50 text-white text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto text-3xl animate-bounce">
              ⚠️
            </div>

            <h2 className="font-heading font-black text-xl text-rose-400">
              Checkpoint Incomplete!
            </h2>
            <div className="text-xs text-slate-300 leading-relaxed space-y-2">
              <p>
                Leaving before reaching the 3–4 minute checkpoint drains your <strong className="text-amber-400">+{unbankedUrja} Unbanked Urja</strong> to zero!
              </p>
              <p className="text-slate-400 text-[11px]">
                🛡️ You will respawn from your <strong className="text-white">LAST saved 3–4 min Checkpoint</strong> (not from zero).
              </p>
            </div>

            {/* Draining Urja Animation Box */}
            <div className="p-3 rounded-2xl bg-white/5 border border-rose-500/30 flex items-center justify-center gap-2 text-rose-400 font-mono text-sm font-bold">
              <span className="line-through">{unbankedUrja} Urja</span>
              <span>➔</span>
              <span className="text-rose-500">0 Urja (Shattered)</span>
            </div>

            {/* 2 Primary Action Choices */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setShowExitPenaltyModal(false)}
                className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>↩️ Resume Segment Now</span>
              </button>

              <button
                onClick={() => {
                  setShowExitPenaltyModal(false);
                  confirmEarlyExitPenalty();
                }}
                className="w-full py-2.5 px-4 rounded-2xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 font-bold text-xs border border-rose-800/50 transition-all"
              >
                <span>💔 Lose Unbanked Urja & Exit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
