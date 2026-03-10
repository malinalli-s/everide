import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Lightbulb, ShieldCheck, ClipboardCheck, ArrowRight, CheckCircle2, AlertCircle, Rocket } from 'lucide-react';
import { PROMPT_EXAMPLES } from '../constants';
import { UserProfile } from '../types';
import { cn } from '../lib/utils';
import { ImageGenerator } from './ImageGenerator';
import { Assessment } from './Assessment';

interface LearnProps {
  profile: UserProfile;
}

export const Learn: React.FC<LearnProps> = ({ profile }) => {
  const isTeacher = profile === 'teacher';
  const [activeSection, setActiveSection] = useState<'prompts' | 'ethics' | 'eval' | 'images'>(isTeacher ? 'eval' : 'prompts');
  const [showAssessment, setShowAssessment] = useState(false);

  if (showAssessment) {
    return <Assessment onClose={() => setShowAssessment(false)} />;
  }

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Aprender</h2>

      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8">
        {isTeacher ? (
          <>
            <TabButton active={activeSection === 'eval'} onClick={() => setActiveSection('eval')} icon={ClipboardCheck} label="Evaluación" />
            <TabButton active={activeSection === 'ethics'} onClick={() => setActiveSection('ethics')} icon={ShieldCheck} label="Guía Ética" />
            <TabButton active={activeSection === 'images'} onClick={() => setActiveSection('images')} icon={Rocket} label="Generador" />
          </>
        ) : (
          <>
            <TabButton active={activeSection === 'prompts'} onClick={() => setActiveSection('prompts')} icon={Terminal} label="Lab Prompts" />
            <TabButton active={activeSection === 'ethics'} onClick={() => setActiveSection('ethics')} icon={ShieldCheck} label="Uso Ético" />
            <TabButton active={activeSection === 'images'} onClick={() => setActiveSection('images')} icon={Rocket} label="Generador" />
          </>
        )}
      </div>

      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {activeSection === 'prompts' && (
          <div className="space-y-6">
            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
              <h3 className="font-bold text-primary flex items-center gap-2 mb-2">
                <Lightbulb size={20} /> Optimiza tus Resultados
              </h3>
              <p className="text-sm text-slate-600">Compara cómo un pequeño cambio en el prompt puede dar resultados mucho mejores.</p>
            </div>

            {PROMPT_EXAMPLES.map(ex => (
              <div key={ex.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                <div className="p-5 border-b border-slate-50">
                  <h4 className="font-bold text-slate-900">{ex.title}</h4>
                </div>
                <div className="p-5 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wider">
                      <AlertCircle size={14} /> Prompt Débil
                    </div>
                    <div className="bg-red-50 p-3 rounded-xl text-sm italic text-slate-700">"{ex.weak}"</div>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight size={20} className="text-slate-300 rotate-90" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-mint text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 size={14} /> Prompt Mejorado
                    </div>
                    <div className="bg-mint/5 p-3 rounded-xl text-sm font-medium text-slate-800">"{ex.improved}"</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-500">
                    <span className="font-bold text-slate-700">¿Por qué es mejor?</span> {ex.explanation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'ethics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Guía de Uso Ético</h3>
              <div className="space-y-4">
                <EthicsItem 
                  title="Transparencia" 
                  desc="Siempre indica cuándo has usado IA para generar contenido o realizar una tarea."
                />
                <EthicsItem 
                  title="Verificación" 
                  desc="La IA puede cometer errores (alucinaciones). Siempre verifica los datos importantes."
                />
                <EthicsItem 
                  title="Privacidad" 
                  desc="No compartas datos personales, sensibles o privados con modelos de IA públicos."
                />
                <EthicsItem 
                  title="Originalidad" 
                  desc="Usa la IA como un tutor o asistente, no para reemplazar tu pensamiento crítico."
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'eval' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
              <div className="size-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardCheck size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2">Evaluación de Competencias IA</h3>
              <p className="text-sm text-slate-500 mb-6">Descubre tu nivel de adopción de la IA y recibe recomendaciones personalizadas.</p>
              
              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                  <span>PROGRESO</span>
                  <span>4/10 PREGUNTAS</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-mint w-[40%] rounded-full" />
                </div>
              </div>

              <button 
                onClick={() => setShowAssessment(true)}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
              >
                Continuar Evaluación
              </button>
            </div>
          </div>
        )}

        {activeSection === 'images' && (
          <ImageGenerator />
        )}
      </motion.div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all",
      active ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" : "bg-white text-slate-500 border border-slate-100"
    )}
  >
    <Icon size={18} />
    {label}
  </button>
);

const EthicsItem = ({ title, desc }: { title: string, desc: string }) => (
  <div className="flex gap-4">
    <div className="mt-1">
      <div className="size-2 bg-mint rounded-full" />
    </div>
    <div>
      <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);
