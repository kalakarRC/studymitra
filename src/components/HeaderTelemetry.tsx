import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScallopedCookieIcon } from './OrganicBlob';
import { ClassLevel } from '../types';

export const HeaderTelemetry: React.FC = () => {
  const { user, sikkaSpin, setClassLevel } = useApp();
  const [showClassPicker, setShowClassPicker] = useState(false);

  const classes: ClassLevel[] = ['Class 9', 'Class 10', 'Class 11', 'Class 12'];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 dark:bg-[#141416]/75 border-b border-black/5 dark:border-white/10 px-4 py-2.5 transition-colors">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Scalloped Logo + Class Pill */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <ScallopedCookieIcon bg="bg-indigo-600 text-white" size="w-8 h-8">
              <span className="text-xs font-black tracking-tighter">SM</span>
            </ScallopedCookieIcon>
            <span className="font-heading font-extrabold text-sm tracking-tight hidden sm:inline text-slate-800 dark:text-slate-100">
              StudyMitra
            </span>
          </div>

          {/* Interactive Class Selector Pill (Zero Native Dropdown) */}
          <div className="relative">
            <button
              onClick={() => setShowClassPicker(!showClassPicker)}
              aria-label="Select Class Level"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 transition-all border border-black/5 dark:border-white/5 active:scale-95"
            >
              <span>{user.classLevel}</span>
              <span className="text-[10px] opacity-60">▼</span>
            </button>

            {showClassPicker && (
              <div className="absolute left-0 mt-2 p-1.5 rounded-2xl bg-white dark:bg-[#1e1b26] shadow-xl border border-black/10 dark:border-white/10 flex flex-col gap-1 z-50 min-w-32 animate-in fade-in zoom-in-95 duration-150">
                {classes.map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setClassLevel(lvl);
                      setShowClassPicker(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold text-left transition-all ${
                      user.classLevel === lvl
                        ? 'bg-indigo-500 text-white shadow-sm'
                        : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Live XP Pill (Urja) + Live Currency Pill (Sikka) */}
        <div className="flex items-center gap-2">
          {/* Urja Capsule */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 shadow-sm">
            {/* 3-Ring Pulsing Atomic Orbit SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-4 h-4 animate-spin"
              style={{ animationDuration: '6s' }}
              aria-label="Urja orbit"
            >
              <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="currentColor" strokeWidth="6" transform="rotate(0 50 50)"/>
              <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="currentColor" strokeWidth="6" transform="rotate(60 50 50)"/>
              <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="currentColor" strokeWidth="6" transform="rotate(120 50 50)"/>
              <circle cx="50" cy="50" r="10" fill="currentColor"/>
            </svg>
            <span className="font-heading font-bold text-xs tracking-tight">
              {user.urja.toLocaleString()}
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider opacity-75">
              Urja
            </span>
          </div>

          {/* Sikka Capsule with 3D Y-Axis Spin */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-800 dark:text-amber-300 shadow-sm">
            <div
              className={`inline-flex transition-transform duration-700 ${
                sikkaSpin ? '[transform:rotateY(720deg)]' : ''
              }`}
            >
              <ScallopedCookieIcon bg="bg-amber-400 text-slate-950" size="w-5 h-5">
                <span className="text-[11px] font-black">🪙</span>
              </ScallopedCookieIcon>
            </div>
            <span className="font-heading font-bold text-xs tracking-tight">
              {user.sikka}
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider opacity-75">
              Sikka
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
