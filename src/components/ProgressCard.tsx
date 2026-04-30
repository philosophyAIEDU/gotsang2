import React from 'react';
import { useAppStore } from '../store';
import { calculateProgress } from '../lib/logic';

export function ProgressCard() {
  const { routines, completions, currentDate } = useAppStore();
  const { completed, total, rate } = calculateProgress(routines, completions, currentDate);
  
  let message = "오늘도 화이팅! 시작이 반이에요 🌱";
  if (total === 0) message = "루틴을 추가해 볼까요? 📝";
  else if (rate >= 100) message = "오늘 완벽한 갓생! 최고예요 👑";
  else if (rate >= 80) message = "거의 다 했어요! 마지막 스퍼트 🔥";
  else if (rate >= 50) message = "절반 넘었어요! 거의 다 왔어요 💪";
  else if (rate >= 1) message = "갓생 스타트! 계속 달려요 🏃";

  const strokeDasharray = 263.89; // 2 * pi * 42
  const strokeDashoffset = strokeDasharray - (strokeDasharray * rate) / 100;

  return (
    <section className="bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-[24px] p-7 shadow-lg shadow-emerald-900/20 flex items-center justify-between text-white relative overflow-hidden" id="progress-card">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)] pointer-events-none"></div>
      <div className="flex flex-col gap-2 relative z-10 w-[60%]">
        <h2 className="font-headline text-[20px] font-semibold tracking-tight break-keep leading-tight">{message}</h2>
        <p className="font-body text-[14px] text-emerald-50 font-medium">
          {total > 0 ? `${total}개 중 ${completed}개의 루틴 완료` : "오늘 계획된 루틴이 없어요."}
        </p>
      </div>
      
      <div className="relative w-24 h-24 flex items-center justify-center z-10 shrink-0">
        <svg className="w-full h-full -rotate-90 transform drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-1000 ease-out" viewBox="0 0 100 100">
          <circle className="text-white/20" cx="50" cy="50" fill="none" r="42" stroke="currentColor" strokeWidth="4"></circle>
          <circle className="text-white transition-all duration-1000 ease-out" cx="50" cy="50" fill="none" r="42" stroke="currentColor" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} strokeLinecap="round" strokeWidth="4"></circle>
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-headline text-[20px] font-bold tracking-tight">{completed}/{total}</span>
        </div>
      </div>
    </section>
  );
}
