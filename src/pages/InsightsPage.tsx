import React from 'react';
import { ArrowUpRight, Flame, CheckCircle2, Calendar, Target, LogIn } from 'lucide-react';
import { useAppStore } from '../store';
import { calculateStreak } from '../lib/logic';
import { cn, formatDateToYYYYMMDD } from '../lib/utils';
import { motion } from 'motion/react';

export function InsightsPage() {
  const { user, loading, login, routines, completions, currentDate } = useAppStore();
  
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-6 max-w-[430px] mx-auto pb-20">
        <div className="flex flex-col gap-3">
          <h2 className="font-headline text-2xl font-black text-slate-800 tracking-tight">통계를 보려면 로그인이 필요해요</h2>
          <p className="font-body text-slate-500 font-medium">로그인하고 나만의 성장 기록을 확인해보세요!</p>
        </div>
        <button 
          onClick={login}
          className="px-8 py-4 bg-violet-600 text-white rounded-2xl font-bold text-[15px] shadow-premium hover:bg-violet-700 transition-all active:scale-95 flex items-center gap-2"
        >
          <LogIn size={18} /> Google 로그인
        </button>
      </main>
    );
  }

  const currentStreak = calculateStreak(routines, completions, currentDate);
  const totalCompletions = completions.length;
  const currentMonthStr = formatDateToYYYYMMDD(currentDate).substring(0, 7);
  const thisMonthUniqueDays = new Set(completions.filter(c => c.date.startsWith(currentMonthStr)).map(c => c.date)).size;

  return (
    <main className="flex-1 px-6 flex flex-col gap-10 w-full max-w-[430px] mx-auto pb-32">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-headline text-3xl font-extrabold text-slate-800 tracking-tight">나의 기록</h2>
        <p className="font-body text-slate-400 text-[15px] font-medium">꾸준함이 변화를 만듭니다.</p>
      </div>

      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-[32px] p-7 flex flex-col gap-5 border border-violet-100/50 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-6">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md shadow-violet-100 transition-transform hover:rotate-12">
            <ArrowUpRight className="text-violet-600" size={24} />
          </div>
        </div>
        <div className="flex flex-col gap-3 relative z-10 w-[75%]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
            <span className="font-label text-[12px] font-bold text-violet-600 uppercase tracking-widest">AI Insight</span>
          </div>
          <p className="font-headline text-[19px] font-bold text-slate-800 break-keep leading-[1.4]">오늘도 자기 자신과의 약속을 잘 지키고 있어요! 🚀</p>
        </div>
      </motion.section>

      <section className="grid grid-cols-2 gap-5">
        <StatCard 
          icon={<Flame size={20} className="text-orange-500" />} 
          label="Current Streak" 
          value={currentStreak} 
          unit="Days" 
          delay={0.1}
        />
        <StatCard 
          icon={<CheckCircle2 size={20} className="text-violet-600" />} 
          label="Total Done" 
          value={totalCompletions} 
          unit="Tasks" 
          delay={0.2}
        />
        <StatCard 
          icon={<Calendar size={20} className="text-blue-500" />} 
          label="This Month" 
          value={thisMonthUniqueDays} 
          unit="Active" 
          delay={0.3}
        />
        <StatCard 
          icon={<Target size={20} className="text-emerald-500" />} 
          label="Avg Rate" 
          value="85%" 
          unit="" 
          delay={0.4}
          isSuccess
        />
      </section>
    </main>
  );
}

function StatCard({ icon, label, value, unit, delay, isSuccess }: { icon: React.ReactNode, label: string, value: string | number, unit: string, delay: number, isSuccess?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-[28px] p-6 flex flex-col gap-4 shadow-soft hover:shadow-premium transition-all duration-300 border border-slate-50"
    >
      <div className="flex items-center justify-between">
        <div className="p-2.5 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors">
          {icon}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-label text-[11px] text-slate-400 uppercase tracking-widest font-bold">{label}</span>
        <div className="flex items-baseline gap-1.5">
          <span className={cn("font-headline text-3xl font-extrabold tracking-tight", isSuccess ? "text-emerald-600" : "text-slate-800")}>{value}</span>
          <span className="font-body text-[13px] text-slate-400 font-semibold">{unit}</span>
        </div>
      </div>
    </motion.div>
  );
}
