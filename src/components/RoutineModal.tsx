import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { useAppStore } from '../store';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function RoutineModal({ onClose }: { onClose: () => void }) {
  const { addRoutine } = useAppStore();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('workout');
  const [emoji, setEmoji] = useState('💪');
  const [targetDays, setTargetDays] = useState<number[]>([0,1,2,3,4,5,6]); // All days
  
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const toggleDay = (dayIndex: number) => {
    setTargetDays(prev => 
      prev.includes(dayIndex) 
        ? prev.filter(d => d !== dayIndex)
        : [...prev, dayIndex].sort()
    );
  };

  const handleSave = () => {
    if (!title.trim() || targetDays.length === 0) return;
    addRoutine(title, category, emoji, targetDays);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center bg-slate-900/60 backdrop-blur-md transition-all" onClick={onClose}>
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-[430px] bg-white sm:rounded-[32px] rounded-t-[32px] p-8 flex flex-col gap-8 shadow-2xl relative" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-headline text-2xl font-bold text-slate-800 tracking-tight">새로운 루틴</h3>
            <p className="text-slate-400 text-sm font-medium">나만의 완벽한 하루를 설계하세요.</p>
          </div>
          <button onClick={onClose} className="p-2.5 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-2xl transition-colors"><X size={20} /></button>
        </div>
        
        <div className="flex gap-4">
          <div className="flex flex-col gap-2.5 shrink-0">
             <label className="font-label text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">이모지</label>
             <input type="text" value={emoji} onChange={e => setEmoji(e.target.value)} className="w-16 h-16 text-center text-3xl bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 focus:bg-white outline-none transition-all" maxLength={2} />
          </div>
          <div className="flex flex-col gap-2.5 flex-1">
            <label className="font-label text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">루틴 이름</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="예: 아침 명상 10분" className="w-full h-16 px-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 focus:bg-white outline-none font-body text-slate-800 font-medium transition-all" />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
           <label className="font-label text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">카테고리</label>
           <select value={category} onChange={e => setCategory(e.target.value)} className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-body text-slate-800 font-medium appearance-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 focus:bg-white transition-all">
             <option value="workout">💪 운동</option>
             <option value="study">📚 스터디</option>
             <option value="mindset">🧘 마인드셋</option>
             <option value="work">💼 업무</option>
             <option value="etc">🌿 기타</option>
           </select>
        </div>

        <div className="flex flex-col gap-3">
           <label className="font-label text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">실천 요일</label>
           <div className="flex justify-between gap-1.5">
             {days.map((day, idx) => (
               <button 
                 key={idx} 
                 onClick={() => toggleDay(idx)}
                 className={cn(
                   "w-11 h-11 rounded-2xl font-label text-sm font-bold transition-all duration-300", 
                   targetDays.includes(idx) 
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30 scale-105" 
                    : "bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100"
                 )}
               >
                 {day}
               </button>
             ))}
           </div>
        </div>

        <button 
          onClick={handleSave} 
          disabled={!title.trim() || targetDays.length === 0}
          className="w-full h-16 bg-violet-600 text-white font-label text-lg font-bold rounded-[20px] hover:bg-violet-700 active:scale-[0.98] transition-all disabled:opacity-40 disabled:grayscale mt-2 shadow-xl shadow-violet-600/20 flex items-center justify-center gap-2"
        >
          <Calendar size={20} />
          <span>루틴 추가하기</span>
        </button>
      </motion.div>
    </div>
  )
}
