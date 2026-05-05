import React, { useState } from 'react';
import { ProgressCard } from '../components/ProgressCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { RoutineList } from '../components/RoutineList';
import { FabAdd } from '../components/FabAdd';
import { RoutineModal } from '../components/RoutineModal';
import { useAppStore } from '../store';
import { LogIn, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function RoutinePage() {
  const { user, loading, login } = useAppStore();
  const [modalOpen, setModalOpen] = useState(false);
  
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-8 max-w-[430px] mx-auto pb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-24 h-24 bg-violet-50 rounded-[32px] flex items-center justify-center text-violet-600 shadow-inner"
        >
          <Sparkles size={48} strokeWidth={1.5} />
        </motion.div>
        <div className="flex flex-col gap-3">
          <h2 className="font-headline text-3xl font-black text-slate-800 tracking-tight">작은 습관의 힘</h2>
          <p className="font-body text-slate-500 font-medium leading-relaxed">
            나만의 루틴을 만들고 성장하는 즐거움을 느껴보세요.<br/>지금 바로 시작해볼까요?
          </p>
        </div>
        <button 
          onClick={login}
          className="w-full flex items-center justify-center gap-3 py-5 bg-violet-600 text-white rounded-3xl font-bold text-[17px] shadow-premium hover:bg-violet-700 transition-all active:scale-95 group"
        >
          <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
          Google로 1초만에 시작하기
        </button>
      </main>
    );
  }

  const today = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = dayNames[today.getDay()];
  const dateString = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <main className="flex-1 px-6 flex flex-col gap-10 scroll-smooth w-full max-w-[430px] mx-auto pb-32 pt-4">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-headline text-3xl font-extrabold text-slate-800 tracking-tight">Today's Goals</h2>
        <p className="font-body text-slate-400 text-[15px] font-medium">{dayName}, {dateString}</p>
      </div>

      <div className="w-full flex flex-col gap-10 relative z-10 overflow-visible">
        <ProgressCard />
        <CategoryFilter />
        <RoutineList />
      </div>
      <FabAdd onClick={() => setModalOpen(true)} />
      {modalOpen && <RoutineModal onClose={() => setModalOpen(false)} />}
    </main>
  );
}
