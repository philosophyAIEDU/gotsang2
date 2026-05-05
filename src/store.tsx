import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Routine, Completion } from './types';
import { formatDateToYYYYMMDD } from './lib/utils';
import { auth, db } from './firebase';
import { 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  User 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  deleteDoc, 
  addDoc, 
  query, 
  where,
  getDocs,
  writeBatch
} from 'firebase/firestore';

interface AppContextType {
  user: User | null;
  routines: Routine[];
  completions: Completion[];
  currentDate: Date;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  addRoutine: (title: string, category: string, emoji: string, targetDays: number[]) => Promise<void>;
  deleteRoutine: (id: string) => Promise<void>;
  toggleComplete: (routineId: string, dateStr: string) => Promise<void>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [currentDate] = useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) {
        // Clear data if logged out (or load from local storage if desired)
        setRoutines([]);
        setCompletions([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Firestore Sync
  useEffect(() => {
    if (!user) return;

    setLoading(true);
    
    // Sync Routines
    const routinesRef = collection(db, 'users', user.uid, 'routines');
    const unsubRoutines = onSnapshot(routinesRef, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Routine));
      setRoutines(docs);
    });

    // Sync Completions
    const completionsRef = collection(db, 'users', user.uid, 'completions');
    const unsubCompletions = onSnapshot(completionsRef, (snapshot) => {
      const docs = snapshot.docs.map(d => d.data() as Completion);
      setCompletions(docs);
      setLoading(false);
    });

    return () => {
      unsubRoutines();
      unsubCompletions();
    };
  }, [user]);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const addRoutine = async (title: string, category: string, emoji: string, targetDays: number[]) => {
    if (!user) return;
    
    const routinesRef = collection(db, 'users', user.uid, 'routines');
    await addDoc(routinesRef, {
      title,
      category,
      emoji,
      targetDays,
      createdAt: new Date().toISOString()
    });
  };

  const deleteRoutine = async (id: string) => {
    if (!user) return;
    
    // Delete the routine
    const routineDoc = doc(db, 'users', user.uid, 'routines', id);
    await deleteDoc(routineDoc);
    
    // Also delete associated completions (optional, but cleaner)
    const completionsRef = collection(db, 'users', user.uid, 'completions');
    const q = query(completionsRef, where('routineId', '==', id));
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    snapshot.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();
  };

  const toggleComplete = async (routineId: string, dateStr: string) => {
    if (!user) return;
    
    const completionId = `${routineId}_${dateStr}`;
    const completionDoc = doc(db, 'users', user.uid, 'completions', completionId);
    
    const existing = completions.find(c => c.routineId === routineId && c.date === dateStr);
    
    if (existing) {
      await deleteDoc(completionDoc);
    } else {
      await setDoc(completionDoc, { routineId, date: dateStr });
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      routines, 
      completions, 
      currentDate, 
      selectedCategory, 
      setSelectedCategory, 
      addRoutine, 
      deleteRoutine, 
      toggleComplete,
      login,
      logout,
      loading
    }}>
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
