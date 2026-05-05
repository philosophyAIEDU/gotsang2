import React from 'react';
import { Plus } from 'lucide-react';

export function FabAdd({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="fixed bottom-32 right-8 md:right-auto md:ml-[340px] w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-2xl shadow-premium hover:shadow-indigo-500/30 hover:scale-110 active:scale-90 transition-all duration-300 z-40 flex items-center justify-center" 
      id="fab-add"
    >
      <Plus size={32} strokeWidth={2.5} />
    </button>
  );
}
