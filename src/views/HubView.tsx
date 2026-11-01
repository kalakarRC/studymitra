import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScallopedCookieIcon, OrganicBlob } from '../components/OrganicBlob';
import { calculateGhostPaperSplit } from '../utils/studyLogic';
import { SubjectChapter } from '../types';
import { 
  BookOpen, 
  Trophy, 
  Zap, 
  RotateCcw, 
  Pin, 
  MoreVertical, 
  Sparkles, 
  Clock, 
  Tag, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  Flame,
  Download
} from 'lucide-react';

export const HubView: React.FC = () => {
  const { 
    chapters, 
    user, 
    togglePinChapter, 
    resetChapterProgress, 
    awardUrja,
    startLearningChapter
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'syllabus' | 'mocks'>('syllabus');
  const [activeOverflowChapterId, setActiveOverflowChapterId] = useState<string | null>(null);
  const [generatedPackMessage, setGeneratedPackMessage] = useState<string | null>(null);

  // Mock Exam Hall States
  const [examStarted, setExamStarted] = useState(false);
  const [readingTimeRemaining, setReadingTimeRemaining] = useState(900); // 15 mins = 900s
  const [isReadingMode, setIsReadingMode] = useState(true);
  const [questionTags, setQuestionTags] = useState<Record<number, 'Easy' | 'Medium' | 'Tough'>>({});
  const [selectedMockAnswers, setSelectedMockAnswers] = useState<Record<number, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);

  const weakChaptersCount = chapters.filter(c => c.isWeak).length;
  const paperSplit = calculateGhostPaperSplit(20);

  // Mock Exam questions generated using 60/25/15 mix
  const mockQuestions = [
    // 60% Current Chapter (Science Light)
    { id: 1, text: 'A concave mirror produces three times magnified real image of an object at 10 cm in front. Image distance is:', options: ['-30 cm', '+30 cm', '-15 cm', '+15 cm'], correct: 0, tag: '60% Current Chapter' },
    { id: 2, text: 'Under which condition does a concave mirror form a virtual, erect and magnified image?', options: ['Object between C and F', 'Object between F and Pole', 'Object at Infinity', 'Object beyond C'], correct: 1, tag: '60% Current Chapter' },
    { id: 3, text: 'Refractive index of diamond with respect to glass is 1.6 and absolute index of glass is 1.5. Absolute index of diamond is:', options: ['2.4', '1.1', '3.1', '2.0'], correct: 0, tag: '60% Current Chapter' },

    // 25% Past Chapters (Electricity)
    { id: 4, text: 'If radius of a wire is halved, its new resistance becomes:', options: ['2 times', '4 times', '8 times', '16 times'], correct: 3, tag: '25% Past Chapter' },
    { id: 5, text: 'An electric kettle is rated 2 kW at 220 V. The current drawn is approximately:', options: ['9.09 A', '4.5 A', '18.18 A', '2.2 A'], correct: 0, tag: '25% Past Chapter' },

    // 15% Past Mistake Autopsy
    { id: 6, text: '[Past Mistake Autopsy] Focal length of convex mirror with radius of curvature 30 cm is:', options: ['+15 cm (behind surface)', '-15 cm', '+30 cm', '-30 cm'], correct: 0, tag: '15% Ghost Mistake' }
  ];

  const handleGenerateJitPack = (chapter: SubjectChapter) => {
    setActiveOverflowChapterId(null);
    setGeneratedPackMessage(`⚡ Generated JIT Pack for "${chapter.title}": 12 Competency MCQs, 4 Assertion-Reasons, 2 Case Studies cached in Dexie offline storage.`);
    setTimeout(() => setGeneratedPackMessage(null), 5000);
  };

  const handleSkipReadingTime = () => {
    setIsReadingMode(false);
    setReadingTimeRemaining(0);
  };

  const tagQuestion = (qId: number, tag: 'Easy' | 'Medium' | 'Tough') => {
    setQuestionTags(prev => ({ ...prev, [qId]: tag }));
  };

  const selectAnswer = (qId: number, optionIdx: number) => {
    if (isReadingMode) {
      alert('15-Minute CBSE Reading Time is active! Option selection is locked. Tag questions as Easy, Medium, or Tough instead.');
      return;
    }
    setSelectedMockAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  return (
    <div className="pb-28 pt-2 px-4 max-w-4xl mx-auto space-y-5">
      {/* Fixed Top Sub-Tabs (Orion "My Apps" Layout) */}
      <div className="flex items-center p-1 rounded-full bg-white dark:bg-[#1e1b26] border border-black/5 dark:border-white/10 shadow-sm max-w-md mx-auto">
        <button
          onClick={() => setActiveSubTab('syllabus')}
          className={`flex-1 py-2 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'syllabus'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>📚 Syllabus Tracker</span>
        </button>

        <button
          onClick={() => setActiveSubTab('mocks')}
          className={`flex-1 py-2 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'mocks'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>🏆 Mock Exam Hall</span>
        </button>
      </div>

      {/* JIT Question Pack Notification Banner */}
      {generatedPackMessage && (
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 flex items-center gap-2 animate-in fade-in duration-200">
          <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
          <span>{generatedPackMessage}</span>
        </div>
      )}

      {/* SUB-TAB 1: SYLLABUS TRACKER */}
      {activeSubTab === 'syllabus' && (
        <div className="space-y-4">
          {/* Dynamic Bulk Action Banner when weak topics are detected */}
          {weakChaptersCount > 0 && (
            <div className="p-4 rounded-[26px] bg-gradient-to-r from-rose-500/15 via-amber-500/15 to-indigo-500/15 border border-rose-500/20 shadow-md flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <ScallopedCookieIcon bg="bg-rose-500 text-white" size="w-10 h-10">
                  <Zap className="w-5 h-5 fill-current" />
                </ScallopedCookieIcon>
                <div>
                  <div className="font-heading font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                    ⚡ Revise All {weakChaptersCount} Pending Weak Zones
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    Fix speed traps to unlock +80 Urja bonus
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  awardUrja(80);
                  alert('Bulk revision initiated! +80 Urja added to your pilot balance.');
                }}
                className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs shadow-md transition-all shrink-0"
              >
                Start Revision
              </button>
            </div>
          )}

          {/* Gesture-Driven Chapter Stack */}
          <div className="space-y-3">
            {chapters.map(chapter => (
              <div
                key={chapter.id}
                className="relative rounded-[26px] p-4 sm:p-5 bg-white dark:bg-[#1e1b26] border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden"
              >
                <OrganicBlob color="currentColor" className="text-black/5 dark:text-white/5 w-28 h-28" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {chapter.subject} • {chapter.weightage} Marks
                    </span>
                    {chapter.isPinned && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold text-[9px] flex items-center gap-1">
                        <Pin className="w-2.5 h-2.5 fill-current" />
                        Pinned to High-ROI Routine
                      </span>
                    )}
                    {chapter.isWeak && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 font-bold text-[9px]">
                        Weak Zone
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-black text-base text-slate-900 dark:text-white truncate">
                    {chapter.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                    <span>Competency: {chapter.competencyPct}%</span>
                    <span>Past Accuracy: {chapter.accuracy}%</span>
                  </div>
                </div>

                {/* Gesture Deck Quick Action Icons */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {/* Swipe Right Quick Action: Pin to Daily Routine */}
                  <button
                    onClick={() => togglePinChapter(chapter.id)}
                    title={chapter.isPinned ? "Unpin from Daily Routine" : "Pin to Daily High-ROI Routine"}
                    className={`p-2.5 rounded-2xl border transition-all active:scale-95 ${
                      chapter.isPinned
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-600'
                        : 'bg-slate-50 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Pin className="w-4 h-4" />
                  </button>

                  {/* Swipe Left Quick Action: Reset Topic Checkpoint & Clear Mistake */}
                  <button
                    onClick={() => {
                      if (confirm(`Reset Checkpoint & clear mistakes for "${chapter.title}"?`)) {
                        resetChapterProgress(chapter.id);
                      }
                    }}
                    title="Reset Topic Checkpoint & Clear Mistake Memory"
                    className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 hover:text-rose-700 active:scale-95 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {/* Learn Launcher */}
                  <button
                    onClick={() => startLearningChapter(chapter.id)}
                    className="py-2 px-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm active:scale-95 transition-all"
                  >
                    Learn
                  </button>

                  {/* 3-Dot Overflow Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setActiveOverflowChapterId(activeOverflowChapterId === chapter.id ? null : chapter.id)}
                      className="p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeOverflowChapterId === chapter.id && (
                      <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#1e1b26] shadow-2xl border border-black/10 dark:border-white/10 p-2 z-30 space-y-1">
                        <button
                          onClick={() => handleGenerateJitPack(chapter)}
                          className="w-full text-left p-2 rounded-xl text-xs font-semibold hover:bg-indigo-50 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 flex items-center gap-2"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Generate JIT Question Pack</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveOverflowChapterId(null);
                            alert(`CBSE 2026-27 Blueprint: 10 Marks total (${chapter.title}). 2x 1-mark MCQs, 1x 3-mark derivation, 1x 5-mark ray diagram.`);
                          }}
                          className="w-full text-left p-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 flex items-center gap-2"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                          <span>View 2026-27 Blueprint</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveOverflowChapterId(null);
                            alert(`Exporting offline .notes for "${chapter.title}" to device storage.`);
                          }}
                          className="w-full text-left p-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 flex items-center gap-2"
                        >
                          <Download className="w-3.5 h-3.5 text-slate-400" />
                          <span>Export Offline Notes</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: MOCK EXAM HALL */}
      {activeSubTab === 'mocks' && (
        <div className="space-y-4">
          {!examStarted ? (
            /* Mock Exam Setup Card */
            <div className="rounded-[28px] p-6 bg-white dark:bg-[#1e1b26] border border-black/5 dark:border-white/10 shadow-lg space-y-6">
              <div className="flex items-center gap-3">
                <ScallopedCookieIcon bg="bg-indigo-600 text-white" size="w-12 h-12">
                  <Trophy className="w-6 h-6" />
                </ScallopedCookieIcon>
                <div>
                  <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white">
                    60/25/15 Ghost Mistake Paper Mixer
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Precision exam simulation calibrated to erase weak points before board exams.
                  </p>
                </div>
              </div>

              {/* 60 / 25 / 15 Formula Visual */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40">
                  <div className="font-heading font-black text-xl text-indigo-600 dark:text-indigo-400">60%</div>
                  <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase mt-0.5">
                    Current Chapter ({paperSplit.currentChapter} Qs)
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/40">
                  <div className="font-heading font-black text-xl text-purple-600 dark:text-purple-400">25%</div>
                  <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase mt-0.5">
                    Past Chapters ({paperSplit.pastChapters} Qs)
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/40">
                  <div className="font-heading font-black text-xl text-rose-600 dark:text-rose-400">15%</div>
                  <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase mt-0.5">
                    Past Mistakes ({paperSplit.pastMistakes} Qs)
                  </div>
                </div>
              </div>

              {/* 15-Minute CBSE Reading Time Simulator Notice */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 dark:text-amber-200">
                  <div className="font-bold">Includes 15-Minute CBSE Reading Time Simulator</div>
                  <p className="mt-0.5 text-amber-700 dark:text-amber-300">
                    Option answering remains locked during reading time. Practice identifying question difficulty tags ([Easy], [Medium], [Tough]) before committing answers!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setExamStarted(true)}
                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold text-xs tracking-wider shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all"
              >
                <span>Launch Ghost Mistake Mock Exam</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* ACTIVE EXAM INTERFACE */
            <div className="space-y-4">
              {/* Exam Header */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#1e1b26] border border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    Active CBSE Mock Exam Hall
                  </div>
                  <div className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                    60/25/15 Ghost Mistake Test
                  </div>
                </div>

                {/* 15-min reading time simulator indicator */}
                {isReadingMode ? (
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span>15m Reading Time Active (Options Locked)</span>
                    </div>
                    <button
                      onClick={handleSkipReadingTime}
                      className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white font-bold text-[10px]"
                    >
                      Skip Reading ➔
                    </button>
                  </div>
                ) : (
                  <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    Writing Window Active (Answer Selection Open)
                  </div>
                )}
              </div>

              {/* Questions Stream */}
              <div className="space-y-4">
                {mockQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-5 rounded-[26px] bg-white dark:bg-[#1e1b26] border border-black/5 dark:border-white/10 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500">
                        {q.tag}
                      </span>

                      {/* Difficulty Tagging during Reading Time */}
                      <div className="flex items-center gap-1">
                        {(['Easy', 'Medium', 'Tough'] as const).map(diff => (
                          <button
                            key={diff}
                            onClick={() => tagQuestion(q.id, diff)}
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                              questionTags[q.id] === diff
                                ? diff === 'Easy' ? 'bg-emerald-500 text-white' : diff === 'Medium' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
                                : 'bg-slate-100 dark:bg-white/5 text-slate-500'
                            }`}
                          >
                            {diff}
                          </button>
                        ))}
                      </div>
                    </div>

                    <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white leading-relaxed">
                      Q{idx + 1}. {q.text}
                    </h4>

                    {/* Options */}
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedMockAnswers[q.id] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => selectAnswer(q.id, optIdx)}
                            className={`w-full text-left p-3 rounded-2xl border text-xs font-medium transition-all ${
                              isSelected
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                : 'bg-slate-50 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setExamSubmitted(true);
                    awardUrja(100);
                    alert('Mock Exam submitted! 100 Urja awarded for completing 60/25/15 Ghost Mistake test.');
                    setExamStarted(false);
                  }}
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all text-center"
                >
                  Submit Mock Exam & Update Mistake Autopsy
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
