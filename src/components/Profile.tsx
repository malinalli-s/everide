import React from 'react';
import { motion } from 'motion/react';
import { Settings, Bookmark, History, LogOut, ChevronRight, Award, Clock } from 'lucide-react';
import { UserProfile } from '../types';
import { cn } from '../lib/utils';

interface ProfileProps {
  profile: UserProfile;
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ profile, onLogout }) => {
  const isTeacher = profile === 'teacher';

  return (
    <div className="px-6 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="size-20 rounded-3xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white shadow-lg">
          <span className="text-3xl font-bold">JD</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Juan Docente</h2>
          <p className="text-sm text-slate-500">{isTeacher ? 'Profesor de Ciencias' : 'Estudiante de Grado'}</p>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-mint/10 text-mint rounded-md text-[10px] font-bold mt-1">
            <Award size={10} /> NIVEL INTERMEDIO
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-primary mb-1"><Bookmark size={20} /></div>
          <div className="text-xl font-bold">12</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Favoritos</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-mint mb-1"><Clock size={20} /></div>
          <div className="text-xl font-bold">8h</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aprendizaje</div>
        </div>
      </div>

      <div className="space-y-2">
        <ProfileLink icon={Bookmark} label={isTeacher ? 'Herramientas Guardadas' : 'Recursos Guardados'} />
        <ProfileLink icon={History} label={isTeacher ? 'Actividades Creadas' : 'Historial de Consultas'} />
        <ProfileLink icon={Settings} label="Configuración" />
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-colors mt-4"
        >
          <LogOut size={20} />
          <span className="font-bold text-sm">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

const ProfileLink = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-primary/30 transition-colors group">
    <div className="text-slate-400 group-hover:text-primary transition-colors">
      <Icon size={20} />
    </div>
    <span className="flex-1 text-left font-bold text-sm text-slate-700">{label}</span>
    <ChevronRight size={16} className="text-slate-300" />
  </button>
);
