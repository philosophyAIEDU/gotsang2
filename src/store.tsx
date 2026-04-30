import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Routine, Completion } from './types';
import { formatDateToYYYYMMDD } from './lib/utils';

interface AppContextType {
  routines: Routine[];
  completions: Completion[];
  currentDate: Date;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  addRoutine: (title: string, category: string, emoji: string, targetDays: number[]) => void;
  deleteRoutine: (id: string) => void;
  toggleComplete: (routineId: string, dateStr: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ROUTINES_KEY = 'godlife_v1_routines';
const COMPLETIONS_KEY = 'godlife_v1_completions';

export function AppProvider({ children }: { children: ReactNode }) {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [currentDate] = useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedRoutines = localStorage.getItem(ROUTINES_KEY);
      const storedCompletions = localStorage.getItem(COMPLETIONS_KEY);
      
      let initialRoutines: Routine[] = [];
      if (storedRoutines) {
        initialRoutines = JSON.parse(storedRoutines);
      } else {
        // Initial dummy data for review
        initialRoutines = [
          { id: crypto.randomUUID(), title: '물 2L 마시기', category: 'workout', emoji: '💧', targetDays: [0,1,2,3,4,5,6], createdAt: new Date().toISOString() },
          { id: crypto.randomUUID(), title: '아침 명상 10분', category: 'mindset', emoji: '🧘', targetDays: [0,1,2,3,4,5,6], createdAt: new Date().toISOString() },
          { id: crypto.randomUUID(), title: '영어 단어 30개 외우기', category: 'study', emoji: '📚', targetDays: [1,2,3,4,5], createdAt: new Date().toISOString() }
        ];
      }
      setRoutines(initialRoutines);
      
      if (storedCompletions) {
        setCompletions(JSON.parse(storedCompletions));
      }
    } catch (e) {
      console.error('Failed to load data', e);
      setRoutines([]);
      setCompletions([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
         localStorage.setItem(ROUTINES_KEY, JSON.stringify(routines));
         localStorage.setItem(COMPLETIONS_KEY, JSON.stringify(completions));
      } catch (e) {
         console.error('Failed to save data', e);
      }
    }
  }, [routines, completions, isLoaded]);

  const addRoutine = (title: string, category: string, emoji: string, targetDays: number[]) => {
    const newRoutine: Routine = {
      id: crypto.randomUUID(),
      title,
      category,
      emoji,
      targetDays,
      createdAt: new Date().toISOString()
    };
    setRoutines(prev => [...prev, newRoutine]);
  };

  const deleteRoutine = (id: string) => {
    setRoutines(prev => prev.filter(r => r.id !== id));
    setCompletions(prev => prev.filter(c => c.routineId !== id));
  };

  const toggleComplete = (routineId: string, dateStr: string) => {
    setCompletions(prev => {
      const existing = prev.find(c => c.routineId === routineId && c.date === dateStr);
      if (existing) {
        return prev.filter(c => c !== existing);
      } else {
        return [...prev, { routineId, date: dateStr }];
      }
    });
  };

  return (
    <AppContext.Provider value={{ routines, completions, currentDate, selectedCategory, setSelectedCategory, addRoutine, deleteRoutine, toggleComplete }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
}
