import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScallopedCookieIcon } from './OrganicBlob';
import { AlertTriangle, Download, Github, Package, CheckCircle2 } from 'lucide-react';

export const HardLockUpdateScreen: React.FC = () => {
  const { setIsUpdateRequired } = useApp();
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleSimulatedDirectDownload = () => {
    setDownloadProgress(5);
    setStatusMessage('Fetching APK payload from StudyMitra Release CDN...');
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev === null) return 10;
        if (prev >= 95) {
          clearInterval(interval);
          setStatusMessage('Installing v2.5.0 patch & restoring Urja sync engine...');
          setTimeout(() => {
            setDownloadProgress(100);
            setTimeout(() => {
              setIsUpdateRequired(false);
            }, 900);
          }, 600);
          return 95;
        }
        return prev + 18;
      });
    }, 250);
  };

  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center bg-[#141416] text-white p-6 select-none overflow-y-auto">
      <div className="max-w-md w-full flex flex-col items-center text-center animate-in fade-in duration-300">
        {/* Pulsing Scalloped Warning Badge */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping" />
          <ScallopedCookieIcon bg="bg-amber-500 text-slate-950" size="w-20 h-20">
            <AlertTriangle className="w-10 h-10 animate-pulse" />
          </ScallopedCookieIcon>
        </div>

        {/* Headings */}
        <h1 className="font-heading font-black text-2xl sm:text-3xl tracking-tight text-white mb-2">
          This version of StudyMitra has expired
        </h1>
        <p className="text-sm text-slate-400 max-w-sm mb-8 leading-relaxed">
          Please update to the latest build to continue your streak and sync your Urja. Older protocol versions cannot connect to CBSE 2026-27 blueprints.
        </p>

        {/* Progress Bar (if downloading) */}
        {downloadProgress !== null && (
          <div className="w-full mb-6 p-4 rounded-3xl bg-white/5 border border-white/10 text-left">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-amber-400">{statusMessage}</span>
              <span className="font-mono text-white">{downloadProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-amber-400 transition-all duration-300 rounded-full"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* 3 Full-Width 2-Line M3E Action Pill Buttons */}
        <div className="flex flex-col gap-3 w-full">
          {/* Button 1: Direct Engine */}
          <button
            onClick={handleSimulatedDirectDownload}
            disabled={downloadProgress !== null}
            className="w-full text-left p-3.5 rounded-3xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all border border-indigo-400/30 shadow-xl shadow-indigo-950 flex items-center gap-3.5 group disabled:opacity-50"
          >
            <ScallopedCookieIcon bg="bg-white/20 text-white" size="w-12 h-12">
              <Download className="w-6 h-6 group-hover:translate-y-0.5 transition-transform" />
            </ScallopedCookieIcon>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase font-bold tracking-wider text-indigo-200">
                DIRECT ENGINE
              </div>
              <div className="font-heading font-extrabold text-sm sm:text-base text-white">
                ⚡ Auto-Download & Install APK
              </div>
            </div>
          </button>

          {/* Button 2: GitHub Releases */}
          <button
            onClick={() => {
              setStatusMessage('Redirecting to verified GitHub release mirrors...');
              handleSimulatedDirectDownload();
            }}
            className="w-full text-left p-3.5 rounded-3xl bg-white/5 hover:bg-white/10 active:scale-[0.98] transition-all border border-white/10 flex items-center gap-3.5 group"
          >
            <ScallopedCookieIcon bg="bg-white/10 text-white" size="w-12 h-12">
              <Github className="w-6 h-6" />
            </ScallopedCookieIcon>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                OPEN SOURCE REPO
              </div>
              <div className="font-heading font-bold text-sm sm:text-base text-white">
                🌐 Download from GitHub Releases
              </div>
            </div>
          </button>

          {/* Button 3: F-Droid */}
          <button
            onClick={() => {
              setStatusMessage('Resolving F-Droid package mirror...');
              handleSimulatedDirectDownload();
            }}
            className="w-full text-left p-3.5 rounded-3xl bg-white/5 hover:bg-white/10 active:scale-[0.98] transition-all border border-white/10 flex items-center gap-3.5 group"
          >
            <ScallopedCookieIcon bg="bg-white/10 text-white" size="w-12 h-12">
              <Package className="w-6 h-6" />
            </ScallopedCookieIcon>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                FOSS REPOSITORY
              </div>
              <div className="font-heading font-bold text-sm sm:text-base text-white">
                📦 Get Latest on F-Droid
              </div>
            </div>
          </button>
        </div>

        {/* Revert / Developer override note */}
        <button
          onClick={() => setIsUpdateRequired(false)}
          className="mt-6 text-xs text-slate-400 hover:text-slate-300 underline underline-offset-4"
        >
          Dismiss Kill-Switch (Test Developer Toggle)
        </button>
      </div>
    </main>
  );
};
