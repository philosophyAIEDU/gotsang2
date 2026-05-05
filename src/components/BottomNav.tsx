import React from 'react';
import { CalendarCheck, Navigation, BarChart3, User } from 'lucide-react';
import { cn } from '../lib/utils';

export function BottomNav({ activeTab, onTabChange }: { activeTab: string, onTabChange: (t: string) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-24 bg-white/80 backdrop-blur-xl border-t border-slate-100 shadow-[0_-12px_40px_rgba(139,92,246,0.08)] max-w-[430px] mx-auto right-0 sm:rounded-b-[40px]">
      <NavItem icon={<CalendarCheck size={24} />} label="Routine" active={activeTab === 'routine'} onClick={() => onTabChange('routine')} />
      <NavItem icon={<Navigation size={24} />} label="Journey" active={activeTab === 'journey'} onClick={() => onTabChange('journey')} />
      <NavItem icon={<BarChart3 size={24} />} label="Insights" active={activeTab === 'insights'} onClick={() => onTabChange('insights')} />
      <NavItem icon={<User size={24} />} label="Profile" active={activeTab === 'profile'} onClick={() => onTabChange('profile')} />
    </nav>
  )
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn("flex flex-col items-center justify-center gap-1.5 transition-all duration-400 relative group", active ? "text-violet-600" : "text-slate-400 hover:text-slate-600")}>
      <div className={cn("p-1.5 rounded-xl transition-all duration-300", active ? "bg-violet-50" : "group-hover:bg-slate-50")}>
        {icon}
      </div>
      <span className="font-label text-[10px] font-bold tracking-wider uppercase">{label}</span>
      {active && <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-violet-600" />}
    </button>
  );
}
