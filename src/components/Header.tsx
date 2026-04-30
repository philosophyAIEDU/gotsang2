import React from 'react';
import { getKoreanDateString } from '../lib/utils';
import { useAppStore } from '../store';
import { calculateStreak } from '../lib/logic';

export function Header() {
  const { routines, completions, currentDate } = useAppStore();
  const streak = calculateStreak(routines, completions, currentDate);
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-20 bg-[#FAFAF7]/90 backdrop-blur-md max-w-[430px] mx-auto right-0">
      <div className="flex flex-col gap-1">
        <span className="font-label text-[11px] text-stone-500 tracking-wide font-medium">
          {getKoreanDateString(currentDate)}
        </span>
        <span className="font-headline text-[26px] text-emerald-700 tracking-tight font-bold">갓생 루틴</span>
      </div>
      <div className="flex items-center gap-3">
        {streak > 0 && (
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-3 py-1.5 rounded-full font-label text-[11px] font-semibold flex items-center gap-1 shadow-md shadow-emerald-500/20">
            <span>🔥</span> {streak}일 연속
          </div>
        )}
        <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden ring-2 ring-white shadow-sm">
          <img alt="User profile" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop" />
        </div>
      </div>
    </header>
  );
}
