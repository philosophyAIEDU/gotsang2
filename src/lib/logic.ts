import { Routine, Completion, Category } from '../types';
import { formatDateToYYYYMMDD } from './utils';

export function getRoutinesForDate(routines: Routine[], date: Date) {
  const dayOfWeek = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  return routines.filter(r => r.targetDays.includes(dayOfWeek));
}

export function calculateProgress(routines: Routine[], completions: Completion[], date: Date) {
  const todayRoutines = getRoutinesForDate(routines, date);
  if (todayRoutines.length === 0) return { completed: 0, total: 0, rate: 0 };
  
  const dateStr = formatDateToYYYYMMDD(date);
  const completedCount = todayRoutines.filter(r => 
    completions.some(c => c.routineId === r.id && c.date === dateStr)
  ).length;
  
  return {
    completed: completedCount,
    total: todayRoutines.length,
    rate: Math.round((completedCount / todayRoutines.length) * 100)
  };
}

export function calculateStreak(routines: Routine[], completions: Completion[], fromDate: Date) {
  let streak = 0;
  let currentDate = new Date(fromDate);
  
  // Check the last 30 days just to be safe and avoid infinite loops
  for (let i = 0; i < 30; i++) {
    const todayRoutines = getRoutinesForDate(routines, currentDate);
    if (todayRoutines.length > 0) {
      const { completed, total } = calculateProgress(routines, completions, currentDate);
      if (completed === total && total > 0) {
        streak++;
      } else if (i === 0 && completed < total) {
        // If it's today and not yet complete, we don't break the streak immediately, we check yesterday.
      } else {
        break; // Streak broken
      }
    }
    // move back one day
    currentDate.setDate(currentDate.getDate() - 1);
  }
  return streak;
}
