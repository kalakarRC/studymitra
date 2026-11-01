/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { HeaderTelemetry } from './components/HeaderTelemetry';
import { NavigationDock } from './components/NavigationDock';
import { HardLockUpdateScreen } from './components/HardLockUpdateScreen';
import { AuthView } from './views/AuthView';
import { OnboardingView } from './views/OnboardingView';
import { HomeView } from './views/HomeView';
import { LearnView } from './views/LearnView';
import { VivaView } from './views/VivaView';
import { HubView } from './views/HubView';
import { FriendsView } from './views/FriendsView';
import { BazaarView } from './views/BazaarView';
import { ProfileView } from './views/ProfileView';

const MainAppContent: React.FC = () => {
  const { currentRoute, isUpdateRequired, theme } = useApp();

  // HARD-LOCK "BLANK SCREEN" APP UPDATE KILL-SWITCH (WhatsApp-Style Gate)
  if (isUpdateRequired) {
    return <HardLockUpdateScreen />;
  }

  // Theme wrapper classes
  const getThemeClass = () => {
    switch (theme) {
      case 'charcoal':
        return 'dark bg-[#141416] text-white';
      case 'oled':
        return 'dark bg-[#000000] text-cyan-200';
      case 'jjk':
        return 'dark bg-[#120824] text-purple-200';
      case 'hinokami':
        return 'dark bg-[#1c0808] text-amber-200';
      case 'pastel':
      default:
        return 'bg-[#FAF8F5] text-slate-900';
    }
  };

  const showHeader = currentRoute !== '/learn' && currentRoute !== '/viva' && currentRoute !== '/auth' && currentRoute !== '/onboarding';

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 md:pl-20 ${getThemeClass()}`}>
      {/* Top Global Telemetry Header */}
      {showHeader && <HeaderTelemetry />}

      {/* Main View Router */}
      <main className="w-full">
        {currentRoute === '/auth' && <AuthView />}
        {currentRoute === '/onboarding' && <OnboardingView />}
        {currentRoute === '/home' && <HomeView />}
        {currentRoute === '/learn' && <LearnView />}
        {currentRoute === '/viva' && <VivaView />}
        {currentRoute === '/hub' && <HubView />}
        {currentRoute === '/friends' && <FriendsView />}
        {currentRoute === '/bazaar' && <BazaarView />}
        {currentRoute === '/profile' && <ProfileView />}
      </main>

      {/* Adaptive Floating Pill Navigation Dock */}
      <NavigationDock />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
