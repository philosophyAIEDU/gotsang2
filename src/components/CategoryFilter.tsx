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
    <section className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
      {categories.map(cat => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              "whitespace-nowrap px-5 py-2.5 rounded-full font-label text-[13px] font-medium shadow-sm transition-all",
              isActive 
                ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                : "bg-white/60 backdrop-blur-md border border-white/80 text-stone-600 hover:bg-white/80"
            )}
          >
            {cat.label}
          </button>
        )
      })}
    </section>
  );
}
