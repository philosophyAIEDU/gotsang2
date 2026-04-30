import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { useAppStore } from '../store';
import { getRoutinesForDate } from '../lib/logic';
import { cn, formatDateToYYYYMMDD } from '../lib/utils';

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
    <section className="flex flex-col gap-4">
      {todayRoutines.length === 0 ? (
        <div className="text-center py-12 text-stone-500 font-body">해당하는 루틴이 없습니다.</div>
      ) : (
        todayRoutines.map(routine => {
          const isCompleted = completions.some(c => c.routineId === routine.id && c.date === dateStr);
          return (
            <div 
              key={routine.id}
              className={cn(
                "routine-card rounded-[20px] p-5 flex items-center justify-between border-l-[6px] transition-all duration-300 overflow-hidden relative group",
                isCompleted 
                  ? "bg-stone-50/80 border-stone-300 opacity-60 grayscale-[30%] shadow-sm" 
                  : "bg-white border-emerald-500 shadow-md shadow-emerald-900/5 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
              )}
            >
              <div className="flex items-center gap-4 z-10 w-full pr-12 cursor-pointer" onClick={() => toggleComplete(routine.id, dateStr)}>
                <span className="text-[28px] drop-shadow-sm">{routine.emoji}</span>
                <span className={cn("font-headline text-[16px] font-medium tracking-tight truncate", isCompleted ? "line-through text-stone-500 decoration-stone-300 decoration-2" : "text-stone-800")}>
                  {routine.title}
                </span>
              </div>
              
              <div className="absolute right-5 flex items-center gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteRoutine(routine.id); }}
                  className="opacity-0 group-hover:opacity-100 p-2 text-stone-300 hover:text-red-500 transition-all z-20"
                >
                  <Trash2 size={16} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleComplete(routine.id, dateStr); }}
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-all z-20",
                     isCompleted ? "bg-emerald-400 text-white" : "border-[2.5px] border-stone-200 text-transparent hover:border-emerald-500 hover:bg-emerald-50 active:scale-95"
                  )}
                >
                  <Check size={18} />
                </button>
              </div>
            </div>
          )
        })
      )}
    </section>
  )
}
