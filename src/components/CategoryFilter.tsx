import React from 'react';
import { useAppStore } from '../store';
import { cn } from '../lib/utils';

export function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useAppStore();

  const categories = [
    { id: 'all', label: '전체' },
    { id: 'workout', label: '💪 운동' },
    { id: 'study', label: '📚 스터디' },
    { id: 'mindset', label: '🧘 마인드셋' },
    { id: 'work', label: '💼 업무' },
    { id: 'etc', label: '🌿 기타' },
  ];

  return (
    <section className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
      {categories.map(cat => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              "whitespace-nowrap px-6 py-3 rounded-2xl font-label text-[13px] font-bold transition-all duration-300",
              isActive 
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25 scale-105" 
                : "bg-white border border-slate-100 text-slate-500 hover:bg-slate-50 hover:border-slate-200"
            )}
          >
            {cat.label}
          </button>
        )
      })}
    </section>
  );
}
