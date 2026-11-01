import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, ShoppingBag, Users, Award, LayoutDashboard } from 'lucide-react';

export const NavigationDock: React.FC = () => {
  const { currentRoute, navigate } = useApp();

  // Hide dock on dedicated fullscreen learning and viva rooms
  if (currentRoute === '/learn' || currentRoute === '/viva' || currentRoute === '/auth' || currentRoute === '/onboarding') {
    return null;
  }

  const items = [
    { id: '/home', label: 'Storefront', icon: LayoutDashboard },
    { id: '/hub', label: 'Syllabus', icon: BookOpen },
    { id: '/friends', label: 'Friends', icon: Users },
    { id: '/bazaar', label: 'Bazaar', icon: ShoppingBag },
    { id: '/profile', label: 'Mitra Pass', icon: Award }
  ];

  return (
    <>
      {/* Mobile Floating Pill Dock */}
      <nav aria-label="Main Navigation" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden w-[92%] max-w-sm">
        <div className="flex items-center justify-around px-2 py-1.5 rounded-full bg-white/85 dark:bg-[#1a1824]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl shadow-black/15">
          {items.map(item => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/60'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Left-Side Vertical Rail */}
      <aside aria-label="Desktop Navigation Rail" className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 z-40 flex-col items-center justify-between py-6 bg-white/80 dark:bg-[#141416]/90 backdrop-blur-xl border-r border-black/5 dark:border-white/10">
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md">
            SM
          </div>
          <span className="text-[10px] font-bold tracking-tight text-slate-400 mt-1">StudyMitra</span>
        </div>

        <nav className="flex flex-col items-center gap-3 w-full px-2">
          {items.map(item => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                title={item.label}
                className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-105'
                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-medium tracking-tighter mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="text-[10px] text-slate-400 font-mono text-center">
          v2.4.0
        </div>
      </aside>
    </>
  );
};
