import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useAppStore } from '../store';
import { calculateStreak } from '../lib/logic';
import { formatDateToYYYYMMDD } from '../lib/utils';

export function InsightsPage() {
  const { routines, completions, currentDate } = useAppStore();
  
  const currentStreak = calculateStreak(routines, completions, currentDate);
  const totalCompletions = completions.length;
  
  const currentMonthStr = formatDateToYYYYMMDD(currentDate).substring(0, 7);
  const thisMonthUniqueDays = new Set(completions.filter(c => c.date.startsWith(currentMonthStr)).map(c => c.date)).size;
  
  return (
    <main className="flex-1 mt-24 px-4 flex flex-col gap-8 w-full max-w-[430px] mx-auto pb-32">
      <div className="flex flex-col gap-1">
        <h2 className="font-headline text-2xl font-bold text-stone-800 tracking-tight">나의 기록</h2>
        <p className="font-body text-stone-500 text-sm">꾸준함이 변화를 만듭니다.</p>
      </div>

      <section className="bg-purple-50 rounded-xl p-6 flex flex-col gap-4 shadow-sm border border-purple-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center shadow-inner">
            <ArrowUpRight className="text-purple-700" size={24} />
          </div>
        </div>
        <div className="flex flex-col gap-2 relative z-10 w-[70%]">
          <span className="font-label text-sm font-semibold text-purple-600 uppercase tracking-wide">Insight</span>
          <p className="font-headline text-lg font-medium text-stone-800 break-keep">오늘도 자기 자신과의 약속을 잘 지키고 있어요! 🚀</p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        {/* Stat 1 */}
        <div className="bg-white rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow border border-stone-100">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span className="font-label text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Current Streak</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-headline text-3xl font-bold text-stone-800">{currentStreak}</span>
            <span className="font-body text-sm text-stone-500">Days</span>
          </div>
        </div>
        
        {/* Stat 2 */}
        <div className="bg-white rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow border border-stone-100">
          <div className="flex items-center gap-2">
            <span className="text-xl">✅</span>
            <span className="font-label text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Total</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-headline text-3xl font-bold text-stone-800">{totalCompletions}</span>
            <span className="font-body text-sm text-stone-500">Done</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow border border-stone-100">
          <div className="flex items-center gap-2">
            <span className="text-xl">📅</span>
            <span className="font-label text-[11px] text-stone-500 uppercase tracking-wider font-semibold">This Month</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-headline text-3xl font-bold text-stone-800">{thisMonthUniqueDays}</span>
            <span className="font-body text-sm text-stone-500">Active</span>
          </div>
        </div>
        
        {/* Stat 4 */}
        <div className="bg-white rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow border border-stone-100">
          <div className="flex items-center gap-2">
            <span className="text-xl">💯</span>
            <span className="font-label text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Avg Rate</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-headline text-3xl font-bold text-emerald-600">85%</span>
          </div>
        </div>
      </section>
    </main>
  );
}
