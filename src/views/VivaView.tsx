import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ScallopedCookieIcon } from '../components/OrganicBlob';
import { Mic, MicOff, Volume2, ArrowLeft, CheckCircle2, Sparkles, Award } from 'lucide-react';

export const VivaView: React.FC = () => {
  const { chapters, activeChapterId, awardUrja, navigate } = useApp();
  const chapter = chapters.find(c => c.id === activeChapterId) || chapters[0];

  const [isListening, setIsListening] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);
  const [bonusAwarded, setBonusAwarded] = useState(false);

  const questions = [
    {
      q: "State Snell's Law and explain why a ray entering normal to a glass surface suffers no deviation.",
      keywords: ["sin i / sin r", "refractive index", "speed of light", "angle of incidence is zero"]
    },
    {
      q: "Why do dentists prefer a concave mirror rather than a convex or plane mirror?",
      keywords: ["between pole and focus", "virtual and erect", "magnified image", "converging mirror"]
    },
    {
      q: "Explain Joule's Law of heating and mention one practical alloy used in appliances.",
      keywords: ["H = I squared R t", "Nichrome", "high resistivity", "does not oxidize easily"]
    }
  ];

  const currentQ = questions[questionIndex % questions.length];

  // Speak AI Examiner question
  const speakQuestion = (text: string) => {
    setIsAiSpeaking(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsAiSpeaking(false);
      utterance.onerror = () => setIsAiSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsAiSpeaking(false), 3000);
    }
  };

  useEffect(() => {
    speakQuestion(currentQ.q);
    setMatchedKeywords([]);
    setBonusAwarded(false);
    setTranscript('');
  }, [questionIndex]);

  // Voice toggle simulation
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      // Simulate student answering with NCERT keywords over 3 seconds
      const sampleAnswers = [
        "According to Snell's law, the ratio of sin i / sin r is equal to the constant refractive index. When the angle of incidence is zero, the ray doesn't bend because light speed changes uniformly without angle offset.",
        "Dentists use a concave mirror because when the tooth is between pole and focus, it forms an enlarged, virtual and erect magnified image.",
        "Joule's law states that heat generated is H = I squared R t. We use Nichrome alloy because it has high resistivity and does not oxidize easily."
      ];
      
      const answer = sampleAnswers[questionIndex % sampleAnswers.length];
      let charIdx = 0;
      const interval = setInterval(() => {
        charIdx += 8;
        if (charIdx >= answer.length) {
          setTranscript(answer);
          clearInterval(interval);
          setIsListening(false);

          // Check keywords
          const matched = currentQ.keywords.filter(kw => 
            answer.toLowerCase().includes(kw.toLowerCase())
          );
          setMatchedKeywords(matched);
          if (matched.length >= 2 && !bonusAwarded) {
            awardUrja(50);
            setBonusAwarded(true);
          }
        } else {
          setTranscript(answer.slice(0, charIdx));
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-between p-4 sm:p-6 select-none relative overflow-hidden">
      {/* Top Header */}
      <header className="flex items-center justify-between z-10">
        <button
          onClick={() => navigate('/home')}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white flex items-center gap-2 text-xs font-bold active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Viva</span>
        </button>

        <div className="text-center">
          <div className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">
            GEMINI ORAL EXAMINER
          </div>
          <div className="font-heading font-extrabold text-xs text-slate-300">
            {chapter.title}
          </div>
        </div>

        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
          <span>Q {questionIndex + 1}/{questions.length}</span>
        </div>
      </header>

      {/* Centerpiece: Gemini Dynamic Concentric Blue Soundwave Rings */}
      <div className="flex-1 flex flex-col items-center justify-center my-6 relative z-10">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          {/* Concentric Soundwave Rings */}
          <div
            className={`absolute inset-0 rounded-full border border-cyan-500/20 transition-all duration-700 ${
              isAiSpeaking || isListening ? 'scale-125 opacity-80 animate-ping' : 'scale-100 opacity-20'
            }`}
            style={{ animationDuration: '3s' }}
          />
          <div
            className={`absolute inset-4 rounded-full border-2 border-blue-500/30 transition-all duration-500 ${
              isAiSpeaking || isListening ? 'scale-110 opacity-70 animate-pulse' : 'scale-95 opacity-30'
            }`}
          />
          <div
            className={`absolute inset-10 rounded-full border-2 border-indigo-400/40 shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 ${
              isAiSpeaking ? 'scale-105 border-cyan-400' : isListening ? 'scale-105 border-emerald-400' : 'scale-100'
            }`}
          />

          {/* Central Glowing Orb & Microphone Button */}
          <button
            onClick={toggleListening}
            className={`relative z-20 w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 active:scale-95 ${
              isListening
                ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-[0_0_40px_rgba(16,185,129,0.7)]'
                : isAiSpeaking
                ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_40px_rgba(0,229,255,0.6)]'
                : 'bg-gradient-to-tr from-indigo-600 to-cyan-500 hover:scale-105 shadow-[0_0_30px_rgba(99,102,241,0.5)]'
            }`}
          >
            {isListening ? (
              <>
                <Mic className="w-8 h-8 text-white animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-wider text-emerald-950 mt-1">Listening</span>
              </>
            ) : isAiSpeaking ? (
              <>
                <Volume2 className="w-8 h-8 text-white animate-bounce" />
                <span className="text-[9px] font-black uppercase tracking-wider text-blue-950 mt-1">Examiner</span>
              </>
            ) : (
              <>
                <Mic className="w-8 h-8 text-white" />
                <span className="text-[9px] font-black uppercase tracking-wider text-indigo-950 mt-1">Tap to Speak</span>
              </>
            )}
          </button>
        </div>

        {/* AI Question Box */}
        <div className="max-w-md w-full text-center mt-4 px-4">
          <p className="font-heading font-bold text-sm sm:text-base text-cyan-200 leading-snug">
            "{currentQ.q}"
          </p>
          <button
            onClick={() => speakQuestion(currentQ.q)}
            className="mt-2 text-[11px] text-cyan-400/80 hover:text-cyan-300 underline underline-offset-4 font-semibold"
          >
            🔊 Replay Question Audio
          </button>
        </div>
      </div>

      {/* Bottom Area: Live Transcript & NCERT Keyword Checklist Pills */}
      <footer className="max-w-md w-full mx-auto space-y-4 z-10">
        {/* Live Speech-to-Text Transcript Box */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center justify-between">
            <span>Live Speech Transcript</span>
            {isListening && <span className="text-emerald-400 animate-pulse">● Recording Voice</span>}
          </div>
          <p className="font-mono text-slate-200 italic min-h-[36px]">
            {transcript || 'Tap the glowing orb above and explain your answer clearly...'}
          </p>
        </div>

        {/* NCERT Keyword Checklist Pills */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              NCERT Required Technical Keywords
            </span>
            {bonusAwarded && (
              <span className="text-[10px] font-extrabold text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                +50 Urja Bonus!
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {currentQ.keywords.map((kw, i) => {
              const isMatched = matchedKeywords.some(m => m.toLowerCase() === kw.toLowerCase());
              return (
                <div
                  key={i}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                    isMatched
                      ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.8)] scale-105'
                      : 'bg-white/10 text-slate-400 border border-white/5'
                  }`}
                >
                  {isMatched && <CheckCircle2 className="w-3.5 h-3.5 fill-current" />}
                  <span>{kw}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Question Pill */}
        <div className="pt-2 flex gap-3">
          <button
            onClick={() => setQuestionIndex(prev => prev + 1)}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition-all text-center"
          >
            Next Viva Question ➔
          </button>
        </div>
      </footer>
    </div>
  );
};
