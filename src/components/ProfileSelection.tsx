import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, BookOpen, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileSelectionProps {
  onSelect: (profile: UserProfile) => void;
}

export const ProfileSelection: React.FC<ProfileSelectionProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">EVERIDE</h1>
        <div className="w-16 h-1.5 bg-mint rounded-full mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">¿Cómo quieres usar EVERIDE?</h2>
        <p className="text-slate-500">Selecciona tu perfil para personalizar tu experiencia</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('teacher')}
          className="group relative bg-white rounded-3xl p-8 shadow-xl shadow-primary/5 border border-slate-100 text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <GraduationCap size={120} />
          </div>
          <div className="size-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
            <GraduationCap size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Soy docente</h3>
          <p className="text-sm text-slate-500 mb-6">Crea contenidos, gestiona tus clases y evalúa el progreso con IA.</p>
          <div className="flex items-center text-primary font-bold text-sm">
            Seleccionar <ArrowRight size={16} className="ml-2" />
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('student')}
          className="group relative bg-white rounded-3xl p-8 shadow-xl shadow-mint/5 border border-slate-100 text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <BookOpen size={120} />
          </div>
          <div className="size-14 bg-mint/10 text-mint rounded-2xl flex items-center justify-center mb-6">
            <BookOpen size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Soy estudiante</h3>
          <p className="text-sm text-slate-500 mb-6">Accede a recursos, mejora tus prompts y aprende mejor con IA.</p>
          <div className="flex items-center text-mint font-bold text-sm">
            Seleccionar <ArrowRight size={16} className="ml-2" />
          </div>
        </motion.button>
      </div>
    </div>
  );
};
