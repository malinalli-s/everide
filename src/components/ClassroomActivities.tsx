import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Search, Terminal, Lightbulb, MessageSquare, 
  ShieldAlert, Edit3, CheckSquare, Clock, ArrowLeft, 
  Bookmark, CheckCircle, ChevronRight, Star
} from 'lucide-react';
import { CLASSROOM_ACTIVITIES } from '../constants';
import { ClassroomActivity } from '../types';
import { cn } from '../lib/utils';

const ICON_MAP: Record<string, any> = {
  Users, Search, Terminal, Lightbulb, MessageSquare, 
  ShieldAlert, Edit3, CheckSquare
};

export const ClassroomActivities: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedActivity, setSelectedActivity] = useState<ClassroomActivity | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [usedActivities, setUsedActivities] = useState<string[]>([]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const toggleUsed = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUsedActivities(prev => prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]);
  };

  if (selectedActivity) {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="px-6 py-8"
      >
        <button 
          onClick={() => setSelectedActivity(null)}
          className="flex items-center gap-2 text-primary font-bold mb-6 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft size={20} /> Volver a actividades
        </button>

        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-primary/5 border border-slate-100 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="size-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
              {React.createElement(ICON_MAP[selectedActivity.icon] || Users, { size: 32 })}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={(e) => toggleFavorite(selectedActivity.id, e)}
                className={cn(
                  "p-3 rounded-xl transition-colors",
                  favorites.includes(selectedActivity.id) ? "bg-amber-100 text-amber-500" : "bg-slate-100 text-slate-400"
                )}
              >
                <Star size={20} fill={favorites.includes(selectedActivity.id) ? "currentColor" : "none"} />
              </button>
              <button 
                onClick={(e) => toggleUsed(selectedActivity.id, e)}
                className={cn(
                  "p-3 rounded-xl transition-colors",
                  usedActivities.includes(selectedActivity.id) ? "bg-mint/10 text-mint" : "bg-slate-100 text-slate-400"
                )}
              >
                <CheckCircle size={20} />
              </button>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedActivity.title}</h2>
          <div className="flex items-center gap-4 text-slate-500 text-sm mb-6">
            <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md font-medium">
              <Clock size={14} /> {selectedActivity.duration}
            </span>
            <span className="font-bold text-primary uppercase tracking-wider text-[10px]">
              {selectedActivity.category}
            </span>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="font-bold text-slate-900 mb-2">Objetivo</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{selectedActivity.objective}</p>
            </section>

            <section>
              <h3 className="font-bold text-slate-900 mb-3">Pasos de la dinámica</h3>
              <div className="space-y-3">
                {selectedActivity.dynamics.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="size-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-bold text-slate-900 mb-3">Preguntas de reflexión</h3>
              <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
                {selectedActivity.questions.map((q, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <MessageSquare size={16} className="text-primary mt-1 shrink-0" />
                    <p className="text-sm text-slate-700 font-medium italic">"{q}"</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-mint/5 border border-mint/10 rounded-2xl p-5">
              <h3 className="font-bold text-mint mb-2 flex items-center gap-2">
                <CheckCircle size={18} /> Aprendizaje esperado
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">{selectedActivity.learning}</p>
            </section>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={(e) => toggleUsed(selectedActivity.id, e as any)}
            className={cn(
              "flex-1 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2",
              usedActivities.includes(selectedActivity.id) 
                ? "bg-mint text-white shadow-lg shadow-mint/20" 
                : "bg-white border-2 border-slate-100 text-slate-600"
            )}
          >
            <CheckCircle size={20} />
            {usedActivities.includes(selectedActivity.id) ? 'Usada en clase' : 'Marcar como usada'}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-slate-900">Actividades de aula</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {CLASSROOM_ACTIVITIES.map((activity, index) => {
          const Icon = ICON_MAP[activity.icon] || Users;
          const isFav = favorites.includes(activity.id);
          const isUsed = usedActivities.includes(activity.id);

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedActivity(activity)}
              className="group bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden"
            >
              {isUsed && (
                <div className="absolute top-0 right-0 bg-mint text-white px-3 py-1 text-[10px] font-bold rounded-bl-lg flex items-center gap-1">
                  <CheckCircle size={10} /> USADA
                </div>
              )}
              
              <div className="flex gap-4">
                <div className="size-14 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900 truncate pr-2">{activity.title}</h3>
                    <button 
                      onClick={(e) => toggleFavorite(activity.id, e)}
                      className={cn(
                        "text-slate-300 hover:text-amber-500 transition-colors shrink-0",
                        isFav && "text-amber-500"
                      )}
                    >
                      <Star size={18} fill={isFav ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-1">{activity.objective}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{activity.category}</span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                      <Clock size={10} /> {activity.duration}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
