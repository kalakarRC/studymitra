import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScallopedCookieIcon, OrganicBlob } from '../components/OrganicBlob';
import { ShieldCheck, Mail, Lock, User, AtSign, CheckCircle2, ArrowRight } from 'lucide-react';

export const AuthView: React.FC = () => {
  const { loginUser, registerUser, navigate } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [realName, setRealName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('arnav.sharma@gmail.com');
  const [password, setPassword] = useState('cbse2026');
  
  // 3-second Supabase verification state
  const [isDispatchingLink, setIsDispatchingLink] = useState(false);
  const [verificationWaiting, setVerificationWaiting] = useState(false);
  const [isVerifiedBanner, setIsVerifiedBanner] = useState(false);
  const [showForgotSheet, setShowForgotSheet] = useState(false);
  const [morphStep, setMorphStep] = useState(0);

  const handleModeSwitch = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setMorphStep(prev => prev + 1);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !realName || !username) return;

    setIsDispatchingLink(true);
    setMorphStep(prev => prev + 1);

    setTimeout(() => {
      setIsDispatchingLink(false);
      setVerificationWaiting(true);
      registerUser(realName, username, email);
    }, 3000);
  };

  const handleSimulateVerificationClick = () => {
    setVerificationWaiting(false);
    setIsVerifiedBanner(true);
    setMorphStep(prev => prev + 1);
    setTimeout(() => {
      setMode('login');
      setIsVerifiedBanner(false);
    }, 2500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email, password);
  };

  const handleGoogleSignIn = () => {
    loginUser('google.student@gmail.com', 'google_auth_token');
  };

  // 3D Morphing Geometric Polyhedron / Robotics Core shape paths
  const morphShapes = [
    // Shape 1: Octahedron / Diamond Core
    'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    // Shape 2: Dodecahedron / Scalloped shield
    'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
    // Shape 3: Robotics Core Hexagon
    'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#FAF8F5] dark:bg-[#141416] transition-colors relative overflow-hidden">
      {/* Dynamic 3D Geometric Morphing Object in top right */}
      <div className="absolute -top-12 -right-12 sm:top-6 sm:right-6 w-44 h-44 pointer-events-none flex items-center justify-center">
        <div
          className="w-32 h-32 bg-gradient-to-tr from-indigo-500/30 via-purple-500/25 to-pink-500/30 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-700 animate-spin"
          style={{
            clipPath: morphShapes[morphStep % morphShapes.length],
            animationDuration: '14s',
            transform: `perspective(600px) rotateX(${morphStep * 45}deg) rotateY(${morphStep * 60}deg)`
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card Header & Brand */}
        <div className="text-center mb-6">
          <div className="inline-flex mb-3">
            <ScallopedCookieIcon bg="bg-indigo-600 text-white" size="w-14 h-14">
              <span className="text-lg font-black tracking-tight">SM</span>
            </ScallopedCookieIcon>
          </div>
          <h1 className="font-heading font-black text-3xl tracking-tight text-slate-900 dark:text-white">
            StudyMitra
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Classes 9, 10, 11, 12 — CBSE & GSEB AI Companion
          </p>
        </div>

        {/* Verification Success Banner */}
        {isVerifiedBanner && (
          <div className="mb-4 p-4 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-center gap-3 animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-500" />
            <div className="text-xs">
              <div className="font-bold">✅ Gmail Verified Successfully!</div>
              <div>Switching to Login mode...</div>
            </div>
          </div>
        )}

        {/* Main Bento Auth Card */}
        <div className="relative rounded-[28px] p-6 sm:p-8 bg-white/90 dark:bg-[#1e1b26]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden">
          <OrganicBlob color="currentColor" className="text-indigo-400/10 w-40 h-40" />

          {/* Top Mode Switcher Capsule */}
          <div className="flex items-center p-1 rounded-full bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 mb-6">
            <button
              onClick={() => handleModeSwitch('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${
                mode === 'login'
                  ? 'bg-white dark:bg-[#281a20] text-slate-900 dark:text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => handleModeSwitch('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${
                mode === 'register'
                  ? 'bg-white dark:bg-[#281a20] text-slate-900 dark:text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Create New Account
            </button>
          </div>

          {/* Waiting for Supabase Verification State */}
          {verificationWaiting ? (
            <div className="py-6 text-center space-y-4 animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center mx-auto text-2xl animate-bounce">
                ✉️
              </div>
              <h2 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                Check your Gmail!
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                We sent a secure Supabase link to <strong className="text-slate-800 dark:text-slate-200">{email}</strong>. Click it to verify your pilot identity.
              </p>

              <button
                onClick={handleSimulateVerificationClick}
                className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>✉️ Simulate Clicking Gmail Verification Link</span>
              </button>
            </div>
          ) : isDispatchingLink ? (
            /* 3-Second Loading Animation */
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin mx-auto" />
              <div className="font-heading font-bold text-sm text-slate-800 dark:text-slate-200">
                Dispatching verification link via Supabase Auth...
              </div>
              <div className="text-[11px] text-slate-400">
                Securing pilot token & generating cryptographic link
              </div>
            </div>
          ) : (
            /* Input Form */
            <form onSubmit={mode === 'login' ? handleLoginSubmit : handleRegisterSubmit} className="space-y-4">
              {mode === 'register' && (
                <>
                  {/* Real Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1 ml-1">
                      Real Name <span className="text-[10px] text-indigo-500 font-normal">(Visible ONLY to accepted Friends)</span>
                    </label>
                    <div className="relative flex items-center">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5" />
                      <input
                        type="text"
                        required
                        value={realName}
                        onChange={e => setRealName(e.target.value)}
                        placeholder="e.g. Arnav Sharma"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      />
                    </div>
                  </div>

                  {/* Public Username */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1 ml-1">
                      Public Username <span className="text-[10px] text-slate-400 font-normal">(Visible to non-friends & leaderboards)</span>
                    </label>
                    <div className="relative flex items-center">
                      <AtSign className="w-4 h-4 text-slate-400 absolute left-3.5" />
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="e.g. Arnav_Pilot"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Gmail Address */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1 ml-1">
                  Gmail Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="student@gmail.com"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1 ml-1">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setShowForgotSheet(true)}
                      className="text-[11px] text-indigo-500 hover:text-indigo-600 font-semibold"
                    >
                      🔑 Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold text-xs tracking-wide shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
              >
                {mode === 'register' ? (
                  <>
                    <span>✉️ Verify Gmail & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>🚀 Login to StudyMitra</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="relative my-4 flex items-center justify-center">
                <div className="border-t border-black/5 dark:border-white/10 w-full" />
                <span className="bg-white dark:bg-[#1e1b26] px-3 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  or
                </span>
              </div>

              {/* Sign in with Google Account Pill */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-3 px-4 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 active:scale-[0.98] border border-black/10 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all flex items-center justify-center gap-2.5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>G Sign in with Google Account</span>
              </button>
            </form>
          )}
        </div>

        {/* Quick onboarding link test */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/onboarding')}
            className="text-xs text-indigo-500 hover:text-indigo-600 font-semibold underline underline-offset-4"
          >
            Skip to Post-Login Onboarding Wizard →
          </button>
        </div>
      </div>

      {/* Slide-Up Forgot Password Sheet */}
      {showForgotSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md p-6 bg-white dark:bg-[#1e1b26] rounded-t-[32px] border-t border-black/10 dark:border-white/10 space-y-4">
            <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 mx-auto" />
            <h2 className="font-heading font-black text-lg text-slate-900 dark:text-white">
              Reset Your Password
            </h2>
            <p className="text-xs text-slate-500">
              Enter your registered Gmail address to receive a secure one-time password reset link.
            </p>
            <input
              type="email"
              defaultValue={email}
              className="w-full py-3 px-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs"
              placeholder="student@gmail.com"
            />
            <button
              onClick={() => {
                setShowForgotSheet(false);
                alert('Password reset link sent to your Gmail inbox.');
              }}
              className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-bold text-xs"
            >
              Send Reset Link
            </button>
            <button
              onClick={() => setShowForgotSheet(false)}
              className="w-full py-2 text-xs text-slate-400 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
