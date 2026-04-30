import React from 'react';
import { CalendarCheck, Navigation, BarChart3, User } from 'lucide-react';
import { cn } from '../lib/utils';

export function BottomNav({ activeTab, onTabChange }: { activeTab: string, onTabChange: (t: string) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-20 md:hidden bg-white/90 backdrop-blur-xl rounded-t-[24px] border-t border-stone-100 shadow-[0_-8px_24px_rgba(16,185,129,0.06)] max-w-[430px] mx-auto right-0">
      <NavItem icon={<CalendarCheck size={24} />} label="Routine" active={activeTab === 'routine'} onClick={() => onTabChange('routine')} />
      <NavItem icon={<Navigation size={24} />} label="Journey" active={activeTab === 'journey'} onClick={() => onTabChange('journey')} />
      <NavItem icon={<BarChart3 size={24} />} label="Insights" active={activeTab === 'insights'} onClick={() => onTabChange('insights')} />
      <NavItem icon={<User size={24} />} label="Profile" active={activeTab === 'profile'} onClick={() => onTabChange('profile')} />
    </nav>
  )
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn("flex flex-col items-center justify-center gap-1 transition-all duration-300", active ? "text-emerald-600 scale-110" : "text-stone-400 hover:text-emerald-500")}>
      {icon}
      <span className="font-label text-[10px] font-semibold tracking-wide uppercase">{label}</span>
    </button>
  );
}
