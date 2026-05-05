import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { useAppStore } from '../store';
import { getRoutinesForDate } from '../lib/logic';
import { cn, formatDateToYYYYMMDD } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function RoutineList() {
  const { routines, completions, currentDate, selectedCategory, toggleComplete, deleteRoutine } = useAppStore();
  
  let todayRoutines = getRoutinesForDate(routines, currentDate);
  if (selectedCategory !== 'all') {
    todayRoutines = todayRoutines.filter(r => r.category === selectedCategory);
  }

  const dateStr = formatDateToYYYYMMDD(currentDate);

  // sort: completed ones at the bottom
  todayRoutines.sort((a, b) => {
    const aComp = completions.some(c => c.routineId === a.id && c.date === dateStr);
    const bComp = completions.some(c => c.routineId === b.id && c.date === dateStr);
    return (aComp === bComp) ? 0 : aComp ? 1 : -1;
  });

  return (
    <section className="flex flex-col gap-4 pb-8">
      <AnimatePresence mode="popLayout">
        {todayRoutines.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-slate-400 font-body flex flex-col items-center gap-3"
          >
             <span className="text-3xl opacity-50">🍃</span>
             <p className="font-medium">해당하는 루틴이 없습니다.</p>
          </motion.div>
        ) : (
          todayRoutines.map((routine, index) => {
            const isCompleted = completions.some(c => c.routineId === routine.id && c.date === dateStr);
            return (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={routine.id}
                className={cn(
                  "routine-card rounded-[24px] p-5 flex items-center justify-between transition-all duration-400 overflow-hidden relative group border",
                  isCompleted 
                    ? "bg-slate-50/50 border-slate-100 opacity-60 shadow-none scale-[0.98]" 
                    : "bg-white border-slate-100 shadow-soft hover:shadow-premium hover:border-violet-100 cursor-pointer"
                )}
              >
                <div className="flex items-center gap-5 z-10 w-full pr-14 cursor-pointer" onClick={() => toggleComplete(routine.id, dateStr)}>
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 shadow-sm",
                    isCompleted ? "bg-slate-100" : "bg-violet-50 group-hover:scale-110"
                  )}>
                    {routine.emoji}
                  </div>
                  <span className={cn(
                    "font-headline text-[17px] font-semibold tracking-tight truncate transition-all duration-300", 
                    isCompleted ? "text-slate-400 line-through decoration-slate-300" : "text-slate-800"
                  )}>
                    {routine.title}
                  </span>
                </div>
                
                <div className="absolute right-5 flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteRoutine(routine.id); }}
                    className="opacity-0 group-hover:opacity-100 p-2.5 text-slate-300 hover:text-rose-500 transition-all z-20"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleComplete(routine.id, dateStr); }}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 z-20 shadow-sm",
                       isCompleted 
                        ? "bg-violet-600 text-white" 
                        : "bg-white border-2 border-slate-200 text-transparent hover:border-violet-500 hover:bg-violet-50 active:scale-90"
                    )}
                  >
                    <Check size={20} strokeWidth={3} className={isCompleted ? "scale-110" : "scale-75"} />
                  </button>
                </div>
                
                {!isCompleted && (
                  <div className="absolute left-0 top-0 w-1.5 h-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </motion.div>
            )
          })
        )}
      </AnimatePresence>
    </section>
  )
}
