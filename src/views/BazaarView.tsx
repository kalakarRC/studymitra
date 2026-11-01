import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScallopedCookieIcon, OrganicBlob } from '../components/OrganicBlob';
import { BAZAAR_CATALOG } from '../data/mockData';
import { BazaarItem } from '../types';
import { ShoppingBag, Sparkles, Check, Flame, Award, Shield, Gift, X } from 'lucide-react';

export const BazaarView: React.FC = () => {
  const { user, buyAndEquipItem, equipItem, awardSikka, sikkaSpin } = useApp();
  const [activeCategory, setActiveCategory] = useState<'drip' | 'rings' | 'skins' | 'flames' | 'themes'>('drip');
  const [showTasksDrawer, setShowTasksDrawer] = useState(false);
  const [purchaseFeedback, setPurchaseFeedback] = useState<string | null>(null);

  const categories = [
    { id: 'drip', label: '🧥 Upper-Body Drip' },
    { id: 'rings', label: '⭕ Avatar Rings' },
    { id: 'skins', label: '🪪 Card Skins' },
    { id: 'flames', label: '🔥 Streak Flames' },
    { id: 'themes', label: '🎨 UI Themes' }
  ];

  const items = BAZAAR_CATALOG.filter(it => it.category === activeCategory);

  const handleAction = (item: BazaarItem) => {
    const isOwned = user.purchasedItems.includes(item.id);
    if (isOwned) {
      equipItem(item);
      setPurchaseFeedback(`Equipped ${item.name}!`);
      setTimeout(() => setPurchaseFeedback(null), 2500);
    } else {
      const success = buyAndEquipItem(item);
      if (success) {
        setPurchaseFeedback(`Purchased & Equipped ${item.name}!`);
        setTimeout(() => setPurchaseFeedback(null), 2500);
      } else {
        alert(`Need ${item.price} Sikka! You currently have ${user.sikka} Sikka. Complete checkpoints or daily quests to earn more.`);
      }
    }
  };

  // Check if item is currently equipped
  const isItemEquipped = (item: BazaarItem) => {
    if (item.category === 'drip') return user.equippedItems.upperBodyDrip === item.id;
    if (item.category === 'rings') return user.equippedItems.avatarRing === item.id;
    if (item.category === 'skins') return user.equippedItems.cardSkin === item.id;
    if (item.category === 'flames') return user.equippedItems.streakFlame === item.id;
    if (item.category === 'themes') return user.equippedItems.theme === item.id.replace('theme-', '');
    return false;
  };

  return (
    <div className="pb-28 pt-2 px-4 max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            M3 EXPRESSIVE REWARD STORE
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Bazaar
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Live Spinning Sikka Balance */}
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 font-bold text-xs shadow-sm">
            <span className={`text-base transition-transform duration-700 ${sikkaSpin ? '[transform:rotateY(720deg)]' : ''}`}>
              🪙
            </span>
            <span className="font-mono text-sm">{user.sikka}</span>
            <span className="text-[10px] uppercase opacity-75">Sikka</span>
          </div>

          {/* Daily Simple Tasks Drawer Button */}
          <button
            onClick={() => setShowTasksDrawer(true)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center gap-1.5 border border-indigo-200 dark:border-indigo-800 transition-all active:scale-95"
          >
            <Gift className="w-4 h-4" />
            <span className="hidden sm:inline">Daily Quests</span>
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {purchaseFeedback && (
        <div className="p-3 rounded-2xl bg-emerald-500 text-white font-bold text-xs text-center shadow-lg shadow-emerald-500/20 animate-in fade-in duration-200">
          ✨ {purchaseFeedback}
        </div>
      )}

      {/* Live Upper-Body Avatar & Card Preview Stage */}
      <div className="p-6 rounded-[32px] bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-amber-500/10 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
        <OrganicBlob color="currentColor" className="text-indigo-500/10 w-44 h-44" />

        <div className="flex items-center gap-5">
          {/* Live Preview Avatar Stage with Equipped Ring & Drip */}
          <div className="relative flex items-center justify-center">
            {/* Equipped Ring */}
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center p-1.5 ${
                user.equippedItems.avatarRing === 'ring-neon-pulse'
                  ? 'ring-4 ring-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.7)] animate-pulse'
                  : user.equippedItems.avatarRing === 'ring-scalloped-gold'
                  ? 'scalloped-badge bg-amber-400'
                  : user.equippedItems.avatarRing === 'ring-plasma-orbit'
                  ? 'ring-4 ring-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.8)]'
                  : 'ring-4 ring-orange-500 shadow-[0_0_25px_rgba(255,61,0,0.8)]'
              }`}
            >
              {/* Avatar Head/Upper-body */}
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black text-2xl flex items-center justify-center relative overflow-hidden shadow-inner">
                {user.realName.charAt(0)}

                {/* Equipped Upper-Body Drip badge overlay */}
                <div className="absolute bottom-1 right-1 text-sm bg-black/40 rounded-full px-1">
                  {user.equippedItems.upperBodyDrip === 'drip-gold-chain' ? '⛓️' :
                   user.equippedItems.upperBodyDrip === 'drip-oversized-hoodie' ? '🧥' :
                   user.equippedItems.upperBodyDrip === 'drip-cyber-visor' ? '🥽' : '👔'}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
              Live Equipped Upper-Body Drip
            </div>
            <div className="font-heading font-black text-lg text-slate-900 dark:text-white">
              {user.username} • {user.codename}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Active Flame: <strong className="text-amber-500">{user.equippedItems.streakFlame.replace('flame-', '')}</strong>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500 max-w-xs text-center sm:text-right">
          Every cosmetic purchased in the Bazaar syncs instantly onto your 3D Mitra Pass ID card.
        </div>
      </div>

      {/* Horizontal Category Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
              activeCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white dark:bg-[#1e1b26] text-slate-600 dark:text-slate-300 border border-black/5 dark:border-white/10 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(item => {
          const isOwned = user.purchasedItems.includes(item.id);
          const isEquipped = isItemEquipped(item);

          return (
            <div
              key={item.id}
              className="relative rounded-[26px] p-5 bg-white dark:bg-[#1e1b26] border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              <OrganicBlob color="currentColor" className="text-black/5 dark:text-white/5 w-32 h-32" />

              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <ScallopedCookieIcon bg="bg-amber-100 dark:bg-amber-950/60 text-slate-900 dark:text-white" size="w-12 h-12">
                      <span className="text-2xl">{item.icon}</span>
                    </ScallopedCookieIcon>
                    <div>
                      <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                        {item.name}
                      </h3>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        {item.category}
                      </div>
                    </div>
                  </div>

                  {/* Price Tag */}
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-bold text-xs">
                    <span>🪙</span>
                    <span>{item.price === 0 ? 'Free' : item.price}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action Button: Buy or Equip */}
              <div>
                <button
                  onClick={() => handleAction(item)}
                  className={`w-full py-2.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                    isEquipped
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isOwned
                      ? 'bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                  }`}
                >
                  {isEquipped ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Equipped</span>
                    </>
                  ) : isOwned ? (
                    <span>Equip Item</span>
                  ) : (
                    <>
                      <span>Unlock for {item.price} Sikka</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* DAILY SIMPLE TASKS DRAWER MODAL */}
      {showTasksDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-[32px] p-6 bg-white dark:bg-[#1e1b26] border border-black/10 dark:border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-500" />
                <h3 className="font-heading font-black text-base text-slate-900 dark:text-white">
                  Daily Sikka Earners
                </h3>
              </div>
              <button
                onClick={() => setShowTasksDrawer(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Complete these routine tasks to fuel your Bazaar balance:
            </p>

            <div className="space-y-2.5">
              {[
                { title: 'Complete a 3–4 Min Checkpoint', reward: '+15 Sikka', actionText: 'Claim 15', amt: 15 },
                { title: 'Maintain 7-Day Study Streak', reward: '+30 Sikka', actionText: 'Claim 30', amt: 30 },
                { title: 'Review 1 Formula Cheat-Sheet', reward: '+10 Sikka', actionText: 'Claim 10', amt: 10 }
              ].map((t, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-between"
                >
                  <div>
                    <div className="font-heading font-bold text-xs text-slate-900 dark:text-white">{t.title}</div>
                    <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">{t.reward}</div>
                  </div>
                  <button
                    onClick={() => {
                      awardSikka(t.amt);
                      alert(`Claimed ${t.reward}!`);
                      setShowTasksDrawer(false);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all active:scale-95"
                  >
                    {t.actionText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
