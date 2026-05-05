import React from 'react';
import { getKoreanDateString } from '../lib/utils';
import { User as UserIcon, LogOut, LogIn } from 'lucide-react';
import { useAppStore } from '../store';

export function Header() {
  const { user, login, logout } = useAppStore();

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white/70 backdrop-blur-xl z-50 border-b border-slate-100/50 px-6 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Routine Tracker</span>
        <h1 className="font-headline text-2xl font-black text-violet-600 tracking-tighter">갓생 루틴</h1>
      </div>
      
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[13px] font-bold text-slate-800">{user.displayName}</span>
              <button 
                onClick={logout}
                className="text-[11px] font-bold text-slate-400 hover:text-violet-600 transition-colors flex items-center gap-1"
              >
                <LogOut size={10} /> Sign Out
              </button>
            </div>
            <img 
              src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} 
              alt="profile" 
              className="w-11 h-11 rounded-2xl object-cover shadow-premium border-2 border-white ring-1 ring-violet-100"
            />
          </div>
        ) : (
          <button 
            onClick={login}
            className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-2xl font-bold text-[14px] shadow-premium hover:bg-violet-700 transition-all active:scale-95"
          >
            <LogIn size={18} /> Sign In
          </button>
        )}
      </div>
    </header>
  );
}
