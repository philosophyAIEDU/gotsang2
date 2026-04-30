import React from 'react';
import { Plus } from 'lucide-react';

export function FabAdd({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="fixed bottom-28 right-6 md:right-auto md:ml-[340px] w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-500 text-white rounded-[20px] shadow-xl shadow-emerald-900/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 z-40" id="fab-add">
      <Plus size={28} />
    </button>
  );
}
