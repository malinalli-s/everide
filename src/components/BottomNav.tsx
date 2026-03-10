import React from 'react';
import { Home, Compass, GraduationCap, User } from 'lucide-react';
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
    { id: 'learn', label: 'Aprender', icon: GraduationCap },
    { id: 'profile', label: 'Perfil', icon: User },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            activeTab === id ? "text-primary" : "text-slate-400 dark:text-slate-500 hover:text-primary"
          )}
        >
          <Icon size={24} strokeWidth={activeTab === id ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
        </button>
      ))}
    </nav>
  );
};
