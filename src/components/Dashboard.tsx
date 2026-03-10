import React from 'react';
import { motion } from 'motion/react';
import { Radar, ClipboardCheck, Users, ShieldCheck, Sparkles, Terminal, Info, Star } from 'lucide-react';
import { UserProfile } from '../types';
import { cn } from '../lib/utils';

interface DashboardProps {
  profile: UserProfile;
  onNavigate: (view: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ profile, onNavigate }) => {
  const isTeacher = profile === 'teacher';

  const teacherItems = [
    { id: 'radar', title: 'Radar de IA', desc: 'Catálogo de herramientas pedagógicas.', icon: Radar, color: 'bg-primary' },
    { id: 'eval', title: 'Evaluación', desc: 'Test de nivel de competencias IA.', icon: ClipboardCheck, color: 'bg-indigo-500' },
    { id: 'activities', title: 'Actividades', desc: 'Dinámicas interactivas para el aula.', icon: Users, color: 'bg-violet-500' },
    { id: 'ethics', title: 'Guía Ética', desc: 'Uso responsable en educación.', icon: ShieldCheck, color: 'bg-mint' },
  ];

  const studentItems = [
    { id: 'study', title: 'IA para estudiar', desc: 'Recomendaciones personalizadas.', icon: Sparkles, color: 'bg-primary' },
    { id: 'prompts', title: 'Lab de Prompts', desc: 'Aprende a escribir mejores prompts.', icon: Terminal, color: 'bg-indigo-500' },
    { id: 'responsible', title: 'Uso Responsable', desc: 'Consejos y buenas prácticas.', icon: Info, color: 'bg-violet-500' },
    { id: 'recommended', title: 'Herramientas', desc: 'Recursos destacados para tareas.', icon: Star, color: 'bg-mint' },
  ];

  const items = isTeacher ? teacherItems : studentItems;

  return (
    <div className="px-6 py-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-slate-900">¡Hola, {isTeacher ? 'Docente' : 'Estudiante'}! 👋</h2>
        <p className="text-slate-500 mt-1">
          {isTeacher 
            ? 'Potencia tus clases y optimiza tu tiempo con IA.' 
            : 'Impulsa tu aprendizaje con inteligencia artificial.'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onNavigate(item.id)}
            className="group bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className={cn("size-14 rounded-xl flex items-center justify-center text-white shrink-0", item.color)}>
              <item.icon size={28} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
            <div className="text-slate-300 group-hover:text-primary transition-colors">
              <ArrowRight size={20} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
