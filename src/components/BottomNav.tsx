import React from 'react';
import { Home, Compass, GraduationCap, User, Lightbulb } from 'lucide-react';
import { AppTab } from '../types';
import { cn } from '../lib/utils';

interface BottomNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'explore', label: 'Explorar', icon: Compass },
    { id: 'academy', label: 'Academia', icon: GraduationCap },
    { id: 'learn', label: 'Aprender', icon: Lightbulb },
    { id: 'profile', label: 'Perfil', icon: User },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={cn(
            "flex flex-col items-center gap-1 transition-all duration-200",
            activeTab === id 
              ? "text-primary scale-110" 
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          <div className={cn(
            "p-1 rounded-xl transition-colors",
            activeTab === id ? "bg-primary/10" : "bg-transparent"
          )}>
            <Icon size={22} strokeWidth={activeTab === id ? 2.5 : 2} />
          </div>
          <span className={cn(
            "text-[9px] font-bold uppercase tracking-wider",
            activeTab === id ? "text-primary" : "text-slate-500"
          )}>{label}</span>
        </button>
      ))}
    </nav>
  );
};
