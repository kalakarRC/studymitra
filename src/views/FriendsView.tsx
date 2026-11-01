import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScallopedCookieIcon, OrganicBlob } from '../components/OrganicBlob';
import { 
  Users, 
  UserPlus, 
  Copy, 
  Check, 
  MessageSquare, 
  Swords, 
  Shield, 
  Flame, 
  Lock, 
  Send, 
  Image as ImageIcon, 
  X,
  Sparkles,
  PhoneCall,
  Video
} from 'lucide-react';

export const FriendsView: React.FC = () => {
  const { 
    user, 
    friends, 
    addFriendByCodename, 
    selectedFriendId, 
    isP2PDrawerOpen, 
    openFriendChat, 
    closeFriendChat, 
    sendP2PMessage,
    activeBattle,
    startBattleWithFriend,
    answerBattleQuestion,
    closeBattleModal
  } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [friendCodenameInput, setFriendCodenameInput] = useState('');
  const [copiedCodename, setCopiedCodename] = useState(false);
  const [addFeedback, setAddFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Chat message input
  const [messageInput, setMessageInput] = useState('');

  const activeFriend = friends.find(f => f.id === selectedFriendId) || friends[0];

  const handleCopyCodename = () => {
    navigator.clipboard.writeText(user.codename);
    setCopiedCodename(true);
    setTimeout(() => setCopiedCodename(false), 2000);
  };

  const handleAddFriendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = addFriendByCodename(friendCodenameInput);
    if (res.success) {
      setAddFeedback({ type: 'success', text: res.message });
      setFriendCodenameInput('');
      setTimeout(() => {
        setAddFeedback(null);
        setShowAddModal(false);
      }, 1500);
    } else {
      setAddFeedback({ type: 'error', text: res.message });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedFriendId) return;
    sendP2PMessage(selectedFriendId, messageInput.trim());
    setMessageInput('');
  };

  const handleSendSampleImageDoubt = () => {
    if (!selectedFriendId) return;
    sendP2PMessage(
      selectedFriendId, 
      'Here is my handwritten ray diagram doubt for concave mirror! Is my focal length sign correct?',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=80'
    );
  };

  return (
    <div className="pb-28 pt-2 px-4 max-w-4xl mx-auto space-y-6">
      {/* Top Header Bar: Codename Pill with 1-Tap Copy + Add Friend Button */}
      <div className="p-4 sm:p-5 rounded-[28px] bg-white dark:bg-[#1e1b26] border border-black/5 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Student P2P Directory
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-heading font-black text-sm text-slate-800 dark:text-slate-200">
              Your Codename:
            </span>
            <button
              onClick={handleCopyCodename}
              className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-xs flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <span>{user.codename}</span>
              {copiedCodename ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3 h-3 opacity-60" />}
            </button>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>➕ Add Friend</span>
        </button>
      </div>

      {/* Friends List */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <span>Verified Study Buddies</span>
            <span className="text-xs font-normal text-slate-400">({friends.length})</span>
          </h2>
          <span className="text-xs text-slate-400">Tap friend to open P2P Chat</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {friends.map(friend => (
            <div
              key={friend.id}
              onClick={() => openFriendChat(friend.id)}
              className="group relative rounded-[26px] p-5 bg-white dark:bg-[#1e1b26] border border-black/5 dark:border-white/10 shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              <OrganicBlob color="currentColor" className="text-black/5 dark:text-white/5 w-28 h-28" />

              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    {/* Friend Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-black text-sm flex items-center justify-center shadow-md">
                      {friend.realName.charAt(0)}
                    </div>
                    <div>
                      {/* Both Real Name and Public Username */}
                      <div className="font-heading font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {friend.realName}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        @{friend.username} • {friend.codename}
                      </div>
                    </div>
                  </div>

                  {/* Streak Flame */}
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 text-xs font-bold">
                    <Flame className="w-3.5 h-3.5 fill-current animate-pulse text-amber-500" />
                    <span>{friend.streak}d</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">
                    🎖️ {friend.rankBadge}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {friend.battlesCount} Battles played
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-black/5 dark:border-white/10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openFriendChat(friend.id);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>P2P Chat</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startBattleWithFriend(friend.id);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 active:scale-95 transition-all"
                >
                  <Swords className="w-3.5 h-3.5" />
                  <span>1v1 Battle</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ➕ ADD FRIEND POPUP MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-[32px] p-6 bg-white dark:bg-[#1e1b26] border border-black/10 dark:border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ScallopedCookieIcon bg="bg-indigo-600 text-white" size="w-9 h-9">
                  <UserPlus className="w-4 h-4" />
                </ScallopedCookieIcon>
                <h3 className="font-heading font-black text-base text-slate-900 dark:text-white">
                  Add Study Friend
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Enter your friend's unique <strong>Codename</strong> to establish a direct cryptographic connection.
            </p>

            {/* Privacy Explanation Banner */}
            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-[11px] text-indigo-900 dark:text-indigo-200 leading-relaxed">
              🔒 <strong>Privacy Protocol:</strong> Non-friends only see your Public Username. Once accepted via Codename, friends can see your Real Name!
            </div>

            <form onSubmit={handleAddFriendSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Friend's Codename
                </label>
                <input
                  type="text"
                  required
                  value={friendCodenameInput}
                  onChange={e => setFriendCodenameInput(e.target.value)}
                  placeholder="e.g. cyber-tiger, neon-falcon"
                  className="w-full py-3 px-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>

              {addFeedback && (
                <div
                  className={`p-3 rounded-2xl text-xs font-semibold ${
                    addFeedback.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
                  }`}
                >
                  {addFeedback.text}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all"
              >
                Send Friend Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DIRECT P2P CHAT & MEDIA DRAWER (Zero Server Storage) */}
      {isP2PDrawerOpen && activeFriend && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
          <div className="relative w-full max-w-xl h-[85vh] bg-white dark:bg-[#1e1b26] rounded-t-[32px] sm:rounded-[32px] border border-black/10 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Chat Header */}
            <div className="p-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                  {activeFriend.realName.charAt(0)}
                </div>
                <div>
                  <div className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                    {activeFriend.realName}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    @{activeFriend.username} • {activeFriend.codename}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => startBattleWithFriend(activeFriend.id)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center gap-1 active:scale-95"
                >
                  <Swords className="w-3.5 h-3.5" />
                  <span>1v1</span>
                </button>
                <button
                  onClick={closeFriendChat}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Zero Server Storage Security Badge */}
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-200 dark:border-emerald-800/40 py-1.5 px-4 text-center">
              <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                🔒 P2P Direct: Messages & Pictures never touch any server
              </span>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {activeFriend.messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-xs space-y-2 ${
                      msg.sender === 'me'
                        ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                        : 'bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 rounded-bl-none'
                    }`}
                  >
                    {msg.text && <p className="leading-relaxed">{msg.text}</p>}
                    {msg.imageUrl && (
                      <div className="rounded-xl overflow-hidden border border-white/20">
                        <img
                          src={msg.imageUrl}
                          alt="Handwritten Note Doubt"
                          className="w-full h-auto max-h-48 object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 border-t border-black/5 dark:border-white/10 bg-white/50 dark:bg-black/20">
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={handleSendSampleImageDoubt}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-[10px] font-bold flex items-center gap-1 transition-all"
                >
                  <ImageIcon className="w-3 h-3 text-indigo-500" />
                  <span>Attach Handwritten Note Picture</span>
                </button>
              </div>

              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={e => setMessageInput(e.target.value)}
                  placeholder="Type study doubt or ask for formula notes..."
                  className="flex-1 py-2.5 px-4 rounded-full bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-md active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 1v1 LIVE QUIZ BATTLE ARENA MODAL */}
      {activeBattle && activeBattle.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-[32px] p-6 bg-[#141416] border-2 border-indigo-500/40 text-white shadow-2xl space-y-6">
            {/* Arena Top Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Swords className="w-5 h-5 text-indigo-400" />
                <span className="font-heading font-black text-sm uppercase tracking-wider text-indigo-300">
                  1v1 Live Quiz Battle Arena
                </span>
              </div>
              <button
                onClick={closeBattleModal}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* TUG-OF-WAR LIVE BAR */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-cyan-400">You ({activeBattle.myScore}%)</span>
                <span className="text-rose-400">{activeFriend.realName} ({activeBattle.friendScore}%)</span>
              </div>
              <div className="w-full h-4 rounded-full bg-slate-800 overflow-hidden flex border border-white/10 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
                  style={{ width: `${activeBattle.myScore}%` }}
                />
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-red-600 transition-all duration-500"
                  style={{ width: `${activeBattle.friendScore}%` }}
                />
              </div>
              <div className="text-[10px] text-center text-slate-400">
                Answer correctly to pull the Tug-of-War bar towards your side!
              </div>
            </div>

            {/* 10-Battle Padlocked Voice & Video Bubbles */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                <div className="text-xs">
                  <div className="font-bold text-slate-200">P2P Voice & Video Call</div>
                  <div className="text-[10px] text-slate-400">
                    Complete 10 Battles together to unlock (Played: {activeFriend.battlesCount}/10)
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 opacity-40">
                <div className="p-2 rounded-xl bg-white/10"><PhoneCall className="w-3.5 h-3.5" /></div>
                <div className="p-2 rounded-xl bg-white/10"><Video className="w-3.5 h-3.5" /></div>
              </div>
            </div>

            {/* Battle Question Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="font-heading font-extrabold text-sm text-slate-100 leading-snug">
                {activeBattle.question}
              </div>

              <div className="grid grid-cols-1 gap-2">
                {activeBattle.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => answerBattleQuestion(i)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-indigo-600 active:scale-[0.98] text-xs font-semibold text-left transition-all border border-white/5 hover:border-indigo-400"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
