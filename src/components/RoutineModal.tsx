import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppStore } from '../store';
import { cn } from '../lib/utils';

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
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center bg-stone-900/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-[430px] bg-white sm:rounded-2xl rounded-t-2xl p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-bottom" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-xl font-bold text-stone-800">새로운 루틴 만들기</h3>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600 bg-stone-100 rounded-full transition-colors"><X size={20} /></button>
        </div>
        
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 shrink-0">
             <label className="font-label text-xs font-semibold text-stone-500 uppercase">이모지</label>
             <input type="text" value={emoji} onChange={e => setEmoji(e.target.value)} className="w-16 h-16 text-center text-3xl bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" maxLength={2} />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="font-label text-xs font-semibold text-stone-500 uppercase">루틴 이름</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="예: 매일 아침 러닝 3km" className="w-full h-16 px-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-body text-stone-800" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
           <label className="font-label text-xs font-semibold text-stone-500 uppercase">카테고리</label>
           <select value={category} onChange={e => setCategory(e.target.value)} className="w-full h-12 px-4 bg-stone-50 border border-stone-200 rounded-xl outline-none font-body text-stone-800 appearance-none">
             <option value="workout">💪 운동</option>
             <option value="study">📚 스터디</option>
             <option value="mindset">🧘 마인드셋</option>
             <option value="work">💼 업무</option>
             <option value="etc">🌿 기타</option>
           </select>
        </div>

        <div className="flex flex-col gap-2">
           <label className="font-label text-xs font-semibold text-stone-500 uppercase">실천할 요일</label>
           <div className="flex justify-between gap-1">
             {days.map((day, idx) => (
               <button 
                 key={idx} 
                 onClick={() => toggleDay(idx)}
                 className={cn("w-10 h-10 rounded-full font-label text-sm font-medium transition-colors", targetDays.includes(idx) ? "bg-emerald-500 text-white font-bold shadow-md shadow-emerald-500/30" : "bg-stone-100 text-stone-400 border border-stone-200")}
               >
                 {day}
               </button>
             ))}
           </div>
        </div>

        <button 
          onClick={handleSave} 
          disabled={!title.trim() || targetDays.length === 0}
          className="w-full h-14 bg-stone-800 text-white font-label text-lg font-semibold rounded-xl hover:bg-black transition-colors disabled:opacity-50 disabled:bg-stone-800/20 mt-2"
        >
          루틴 추가하기
        </button>
      </div>
    </div>
  )
}
