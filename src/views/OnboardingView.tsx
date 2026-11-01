import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScallopedCookieIcon, OrganicBlob } from '../components/OrganicBlob';
import { SurfaceTheme, ClassLevel, BoardType } from '../types';
import { calculateAchievableRoutine, generateRandomCodename } from '../utils/studyLogic';
import { Sparkles, ArrowRight, ArrowLeft, Check, Compass, BookOpen, Clock, Target } from 'lucide-react';

export const OnboardingView: React.FC = () => {
  const { user, completeOnboarding, navigate } = useApp();
  const [step, setStep] = useState<number>(1);

  // Step 1: UI & Look
  const [surface, setSurface] = useState<SurfaceTheme>(user.equippedItems.theme || 'pastel');
  const [fontDensity, setFontDensity] = useState<'Standard' | 'Compact' | 'Comfortable'>('Standard');
  const [primaryAccent, setPrimaryAccent] = useState<string>('#6366f1');

  // Step 2: Class, Board & Identity
  const [selectedClass, setSelectedClass] = useState<ClassLevel>(user.classLevel || 'Class 10');
  const [selectedBoard, setSelectedBoard] = useState<BoardType>(user.board || 'CBSE');
  const [gender, setGender] = useState<'Boy' | 'Girl'>(user.gender || 'Boy');
  const [schoolName, setSchoolName] = useState<string>(user.schoolName || 'Delhi Public School (Bopal, Ahmedabad)');

  // Step 3: Current Marks & Weak Zones
  const [mathsMarks, setMathsMarks] = useState<number>(45);
  const [scienceMarks, setScienceMarks] = useState<number>(42);
  const [sstMarks, setSstMarks] = useState<number>(55);
  const [daysLeft, setDaysLeft] = useState<number>(109);
  const [flaggedWeak, setFlaggedWeak] = useState<string[]>(['sci-light', 'math-triangles']);

  // Step 4: Ambition & Interests
  const [stream, setStream] = useState<string>('Robotics Engineering & PCM');
  const [dreamCollege, setDreamCollege] = useState<string>('LDCE Ahmedabad');
  const [targetBranch, setTargetBranch] = useState<string>('Robotics & Automation');
  const [language, setLanguage] = useState<'Gujarati' | 'Hinglish' | 'English'>('Hinglish');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Robotics', 'Cricket']);
  const [assignedCodename, setAssignedCodename] = useState<string>(user.codename || generateRandomCodename());

  // Floating formulas for background animation
  const formulas = [
    { text: 'E = mc²', x: '10%', y: '15%', delay: '0s' },
    { text: 'sin²θ + cos²θ = 1', x: '75%', y: '12%', delay: '1s' },
    { text: 'F = ma', x: '18%', y: '65%', delay: '2s' },
    { text: 'V = IR', x: '82%', y: '70%', delay: '3s' },
    { text: '∫ x dx = x²/2 + C', x: '45%', y: '85%', delay: '1.5s' },
    { text: '1/f = 1/v + 1/u', x: '5%', y: '40%', delay: '2.5s' }
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const toggleWeak = (id: string) => {
    if (flaggedWeak.includes(id)) {
      setFlaggedWeak(flaggedWeak.filter(w => w !== id));
    } else {
      setFlaggedWeak([...flaggedWeak, id]);
    }
  };

  const handleFinishOnboarding = () => {
    completeOnboarding({
      classLevel: selectedClass,
      board: selectedBoard,
      gender,
      schoolName,
      targetDaysLeft: daysLeft,
      stream,
      dreamCollege,
      targetBranch,
      language,
      interests: selectedInterests,
      codename: assignedCodename,
      weakChapters: flaggedWeak,
      baselineScores: {
        'Mathematics': mathsMarks,
        'Science': scienceMarks,
        'Social Science': sstMarks
      },
      equippedItems: {
        ...user.equippedItems,
        theme: surface
      }
    });
  };

  const routine = calculateAchievableRoutine({
    baselineAvg: (mathsMarks + scienceMarks + sstMarks) / 3,
    daysLeft,
    energyMode: 'full',
    dreamGoal: `${dreamCollege} (${targetBranch})`
  });

  return (
    <div className="min-h-screen w-full relative bg-[#FAF8F5] dark:bg-[#141416] p-4 sm:p-6 flex flex-col items-center justify-center overflow-x-hidden transition-colors">
      {/* Soft Floating Mathematical & Physics Formulas in Canvas Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
        {formulas.map((f, i) => (
          <div
            key={i}
            className="absolute text-slate-400/20 dark:text-white/10 font-mono text-sm sm:text-base animate-pulse"
            style={{
              left: f.x,
              top: f.y,
              animationDuration: '6s',
              animationDelay: f.delay
            }}
          >
            {f.text}
          </div>
        ))}
      </div>

      <div className="w-full max-w-xl relative z-10">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-2">
            <ScallopedCookieIcon bg="bg-indigo-600 text-white" size="w-8 h-8">
              <span className="text-xs font-bold">{step}</span>
            </ScallopedCookieIcon>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
                PILOT ONBOARDING
              </div>
              <div className="font-heading font-extrabold text-xs text-slate-800 dark:text-slate-200">
                Step {step} of 4: {
                  step === 1 ? 'Look & Feel' :
                  step === 2 ? 'Class & Identity' :
                  step === 3 ? 'Marks & Weak Zones' : 'Achievable Routine'
                }
              </div>
            </div>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step ? 'w-6 bg-indigo-600' : s < step ? 'w-2 bg-indigo-300 dark:bg-indigo-900' : 'w-2 bg-slate-200 dark:bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: UI & LOOK SETUP (First Priority) */}
        {step === 1 && (
          <div className="relative rounded-[28px] p-6 sm:p-8 bg-white/95 dark:bg-[#1e1b26]/95 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-2xl">
            <OrganicBlob color="currentColor" className="text-purple-400/10 w-44 h-44" />
            
            <h2 className="font-heading font-black text-xl text-slate-900 dark:text-white mb-1">
              Choose Your Visual Frequency
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Pick your primary canvas surface and typography cadence before entering the syllabus.
            </p>

            {/* Base Surface Choice Bento Tiles */}
            <div className="space-y-3 mb-6">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">
                Base Surface Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'pastel', label: 'Orion Pastel Light', desc: 'Warm Cream & Mint Bento', bg: 'bg-[#FAF8F5] text-slate-800 border-amber-200' },
                  { id: 'charcoal', label: 'Orion Charcoal Dark', desc: 'Tonal Deep Containers', bg: 'bg-[#1e1b26] text-white border-purple-900' },
                  { id: 'oled', label: 'True OLED Black', desc: '0-Pixel Power Gemini Void', bg: 'bg-[#000000] text-cyan-300 border-cyan-800' }
                ].map(tile => (
                  <button
                    key={tile.id}
                    type="button"
                    onClick={() => setSurface(tile.id as SurfaceTheme)}
                    className={`p-3.5 rounded-2xl text-left border-2 transition-all active:scale-95 ${tile.bg} ${
                      surface === tile.id ? 'ring-2 ring-indigo-500 shadow-md' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="font-heading font-extrabold text-xs">{tile.label}</div>
                    <div className="text-[10px] opacity-70 mt-0.5">{tile.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Circular Color Palette Swatches */}
            <div className="mb-6">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-2">
                Primary Accent Aura
              </label>
              <div className="flex items-center gap-3">
                {[
                  { hex: '#6366f1', name: 'Indigo Aura' },
                  { hex: '#00e5ff', name: 'Gemini Cyan' },
                  { hex: '#ec4899', name: 'Blush Neon' },
                  { hex: '#10b981', name: 'Mint Emerald' },
                  { hex: '#f59e0b', name: 'Amber Gold' }
                ].map(swatch => (
                  <button
                    key={swatch.hex}
                    type="button"
                    onClick={() => setPrimaryAccent(swatch.hex)}
                    style={{ backgroundColor: swatch.hex }}
                    title={swatch.name}
                    className={`w-9 h-9 rounded-full transition-transform active:scale-90 flex items-center justify-center ${
                      primaryAccent === swatch.hex ? 'scale-110 ring-4 ring-black/10 dark:ring-white/20' : ''
                    }`}
                  >
                    {primaryAccent === swatch.hex && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Density Pill Selection (Zero native dropdown) */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-2">
                Font Density
              </label>
              <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10">
                {(['Standard', 'Compact', 'Comfortable'] as const).map(density => (
                  <button
                    key={density}
                    type="button"
                    onClick={() => setFontDensity(density)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                      fontDensity === density
                        ? 'bg-white dark:bg-white/15 text-indigo-600 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {density}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CLASS, BOARD & IDENTITY */}
        {step === 2 && (
          <div className="relative rounded-[28px] p-6 sm:p-8 bg-white/95 dark:bg-[#1e1b26]/95 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-2xl">
            <OrganicBlob color="currentColor" className="text-blue-400/10 w-44 h-44" />

            <h2 className="font-heading font-black text-xl text-slate-900 dark:text-white mb-1">
              Class, Board & Student Pilot
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Align blueprints for CBSE 2026-27 or Gujarat Secondary GSEB.
            </p>

            {/* Class Bento Tiles */}
            <div className="mb-5">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-2">
                Select Your Class
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Class 9', 'Class 10', 'Class 11', 'Class 12'] as ClassLevel[]).map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedClass(lvl)}
                    className={`p-3 rounded-2xl text-center border-2 transition-all font-heading font-black text-xs active:scale-95 ${
                      selectedClass === lvl
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-black/5 dark:border-white/10'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Board Selection Bento Chips */}
            <div className="mb-5">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-2">
                Target Examination Board
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'CBSE', title: 'CBSE Board', subtitle: 'NCERT Competency & Case-Based' },
                  { id: 'GSEB', title: 'GSEB Board', subtitle: 'Gujarat State Board Blueprint' }
                ].map(b => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBoard(b.id as BoardType)}
                    className={`p-3.5 rounded-2xl text-left border-2 transition-all active:scale-95 ${
                      selectedBoard === b.id
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-700 dark:text-indigo-300'
                        : 'bg-slate-50 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="font-heading font-bold text-xs">{b.title}</div>
                    <div className="text-[10px] opacity-75 mt-0.5">{b.subtitle}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Boy or Girl Selection */}
            <div className="mb-5">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-2">
                Identity Profile
              </label>
              <div className="flex items-center gap-3">
                {[
                  { id: 'Boy', label: 'Boy', icon: '👦', desc: 'Mindset Shield & Focus Resets' },
                  { id: 'Girl', label: 'Girl', icon: '👧', desc: 'Project Athena & STEM Insights' }
                ].map(g => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGender(g.id as 'Boy' | 'Girl')}
                    className={`flex-1 p-3 rounded-2xl border-2 text-left flex items-center gap-3 transition-all ${
                      gender === g.id
                        ? 'bg-white dark:bg-white/10 border-indigo-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="text-xl">{g.icon}</span>
                    <div>
                      <div className="font-heading font-bold text-xs text-slate-900 dark:text-white">{g.label}</div>
                      <div className="text-[9px] text-slate-500">{g.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* School Name Input */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                School Name
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={e => setSchoolName(e.target.value)}
                placeholder="e.g. DPS Bopal, Ahmedabad"
                className="w-full py-3 px-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          </div>
        )}

        {/* STEP 3: CURRENT MARKS, DAYS LEFT & WEAK ZONES */}
        {step === 3 && (
          <div className="relative rounded-[28px] p-6 sm:p-8 bg-white/95 dark:bg-[#1e1b26]/95 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-2xl">
            <OrganicBlob color="currentColor" className="text-amber-400/10 w-44 h-44" />

            <h2 className="font-heading font-black text-xl text-slate-900 dark:text-white mb-1">
              Current Marks & Weak Zones
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Drag interactive pill sliders to set your baseline scores out of 80.
            </p>

            {/* Days Left Display Counter */}
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-amber-800 dark:text-amber-400">
                  Target Exam Countdown
                </div>
                <div className="font-heading font-black text-2xl text-amber-950 dark:text-amber-200">
                  {daysLeft} DAYS LEFT
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDaysLeft(Math.max(10, daysLeft - 10))}
                  className="px-2.5 py-1 rounded-xl bg-amber-200 dark:bg-amber-800 font-bold text-xs"
                >
                  -10
                </button>
                <button
                  type="button"
                  onClick={() => setDaysLeft(daysLeft + 10)}
                  className="px-2.5 py-1 rounded-xl bg-amber-200 dark:bg-amber-800 font-bold text-xs"
                >
                  +10
                </button>
              </div>
            </div>

            {/* Interactive Subject Pill Sliders */}
            <div className="space-y-4 mb-6">
              {[
                { name: 'Mathematics', val: mathsMarks, setter: setMathsMarks, color: 'accent-indigo-600' },
                { name: 'Science', val: scienceMarks, setter: setScienceMarks, color: 'accent-pink-600' },
                { name: 'Social Science', val: sstMarks, setter: setSstMarks, color: 'accent-emerald-600' }
              ].map(sub => (
                <div key={sub.name} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10">
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{sub.name}</span>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{sub.val} / 80 Marks</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={sub.val}
                    onChange={e => sub.setter(Number(e.target.value))}
                    className={`w-full h-2 rounded-lg bg-slate-200 dark:bg-white/10 cursor-pointer ${sub.color}`}
                  />
                </div>
              ))}
            </div>

            {/* Tap-to-flag Weak Chapters */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-2">
                Tap to Flag Weak Chapters (Instant Focus)
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'sci-light', label: '⚠️ Light: Ray Diagrams' },
                  { id: 'math-triangles', label: '⚠️ Triangles: BPT & Similarity' },
                  { id: 'sci-electricity', label: '⚠️ Ohm\'s Law & Circuits' },
                  { id: 'math-quadratics', label: '⚠️ Quadratic Word Problems' }
                ].map(chip => {
                  const isFlagged = flaggedWeak.includes(chip.id);
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => toggleWeak(chip.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        isFlagged
                          ? 'bg-rose-500 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: AMBITION, STREAM & ROUTINE GENERATOR */}
        {step === 4 && (
          <div className="relative rounded-[28px] p-6 sm:p-8 bg-white/95 dark:bg-[#1e1b26]/95 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-2xl">
            <OrganicBlob color="currentColor" className="text-emerald-400/10 w-44 h-44" />

            <h2 className="font-heading font-black text-xl text-slate-900 dark:text-white mb-1">
              Ambition & Smart Routine
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              Personalized study routine calculated to guarantee your dream seat.
            </p>

            {/* Stream & Dream College Bento Chips */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Stream / Goal
                </label>
                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50">
                  <span className="font-heading font-bold text-xs text-indigo-900 dark:text-indigo-200">{stream}</span>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Dream Target
                </label>
                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50">
                  <span className="font-heading font-bold text-xs text-purple-900 dark:text-purple-200">{dreamCollege}</span>
                </div>
              </div>
            </div>

            {/* Smart Routine Generator Output Card */}
            <div className="mb-5 p-4 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 text-left space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="font-heading font-black text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Daily Achievable Routine
                </span>
              </div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                {routine.focusMessage}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {routine.roiStrategy}
              </p>
              <div className="flex items-center gap-3 pt-1 text-[11px] font-semibold text-slate-500">
                <span>⏱️ {routine.sprintsCount} x 30m Sprints</span>
                <span>•</span>
                <span>🎯 {routine.dailyCheckpointTarget} Checkpoints/Day</span>
              </div>
            </div>

            {/* Auto-Assigned Codename */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Assigned P2P Codename (Editable Once)
                </div>
                <div className="font-mono font-extrabold text-sm text-indigo-600 dark:text-indigo-400">
                  {assignedCodename}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAssignedCodename(generateRandomCodename())}
                className="text-xs px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 font-bold hover:bg-slate-300 transition-colors"
              >
                🎲 Reroll
              </button>
            </div>
          </div>
        )}

        {/* Step Navigation Actions */}
        <div className="flex items-center justify-between mt-6 px-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="py-3 px-5 rounded-2xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 text-slate-800 dark:text-white font-bold text-xs flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all active:scale-95 ml-auto"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishOnboarding}
              className="py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all active:scale-95 ml-auto"
            >
              <span>Enter StudyMitra Hub</span>
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
