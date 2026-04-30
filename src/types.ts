export type Category = 'all' | 'workout' | 'study' | 'mindset' | 'work' | 'etc';

export interface Routine {
  id: string;
  title: string;
  category: string;
  emoji: string;
  targetDays: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  createdAt: string;
}

export interface Completion {
  routineId: string;
  date: string; // YYYY-MM-DD
}
