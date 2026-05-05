import React from 'react';
import { useAppStore } from '../store';
import { calculateProgress } from '../lib/logic';
import { Trophy } from 'lucide-react';

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
    <section className="bg-gradient-to-br from-violet-600 via-violet-500 to-purple-500 rounded-[32px] p-8 shadow-premium flex items-center justify-between text-white relative overflow-hidden" id="progress-card">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)] pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex flex-col gap-3 relative z-10 w-[65%]">
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-white/20 p-1 rounded-lg backdrop-blur-md">
            <Trophy size={14} className="text-white" />
          </div>
          <span className="font-label text-[12px] font-bold tracking-widest uppercase opacity-90">Daily Goal</span>
        </div>
        <h2 className="font-headline text-[22px] font-bold tracking-tight break-keep leading-[1.3] drop-shadow-sm">{message}</h2>
        <p className="font-body text-[14px] text-white/80 font-medium">
          {total > 0 ? `${total}개 중 ${completed}개의 루틴 완료` : "오늘 계획된 루틴이 없어요."}
        </p>
      </div>
      
      <div className="relative w-24 h-24 flex items-center justify-center z-10 shrink-0">
        <svg className="w-full h-full -rotate-90 transform drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-1000 ease-out" viewBox="0 0 100 100">
          <circle className="text-white/20" cx="50" cy="50" fill="none" r="42" stroke="currentColor" strokeWidth="6"></circle>
          <circle className="text-white transition-all duration-1000 ease-out" cx="50" cy="50" fill="none" r="42" stroke="currentColor" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} strokeLinecap="round" strokeWidth="6"></circle>
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-headline text-[22px] font-extrabold tracking-tight">{rate}%</span>
        </div>
      </div>
    </section>
  );
}
