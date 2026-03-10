import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, CheckCircle2, Trophy, Lightbulb, GraduationCap, ArrowRight, RotateCcw } from 'lucide-react';
import { ASSESSMENT_QUESTIONS, TEACHER_PROFILES } from '../constants';
import { TeacherProfileResult } from '../types';
import { cn } from '../lib/utils';

interface AssessmentProps {
  onComplete?: (result: TeacherProfileResult) => void;
  onClose: () => void;
}

export const Assessment: React.FC<AssessmentProps> = ({ onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<TeacherProfileResult | null>(null);

  const handleSelect = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = score;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentStep < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onClose();
    }
  };

  const calculateResult = () => {
    const totalScore = answers.reduce((acc, curr) => acc + curr, 0);
    const averageScore = totalScore / ASSESSMENT_QUESTIONS.length;

    let profileKey = 'explorer';
    if (averageScore > 3.5) profileKey = 'mentor';
    else if (averageScore > 2.8) profileKey = 'designer';
    else if (averageScore > 1.8) profileKey = 'practical';

    const finalResult = TEACHER_PROFILES[profileKey];
    setResult(finalResult);
    if (onComplete) onComplete(finalResult);
  };

  const progress = ((currentStep + 1) / ASSESSMENT_QUESTIONS.length) * 100;

  if (result) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="px-6 py-8"
      >
        <div className="text-center mb-8">
          <div className="size-20 bg-mint/10 text-mint rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy size={40} />
          </div>
          <h2 className="text-sm font-bold text-mint uppercase tracking-widest mb-1">Tu Perfil Docente</h2>
          <h3 className="text-3xl font-bold text-slate-900">{result.name}</h3>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-primary/5 border border-slate-100 mb-6">
          <p className="text-slate-600 leading-relaxed mb-6">{result.description}</p>
          
          <div className="space-y-6">
            <div>
              <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-3">
                <Lightbulb size={18} className="text-primary" /> Herramientas Recomendadas
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.recommendations.map(tool => (
                  <span key={tool} className="px-3 py-1 bg-primary/5 text-primary rounded-full text-xs font-bold">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-3">
                <GraduationCap size={18} className="text-mint" /> Actividades Sugeridas
              </h4>
              <ul className="space-y-2">
                {result.activities.map((activity, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <div className="mt-1.5 size-1.5 bg-mint rounded-full shrink-0" />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={onClose}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            Volver al Inicio <ArrowRight size={18} />
          </button>
          <button 
            onClick={() => {
              setResult(null);
              setCurrentStep(0);
              setAnswers([]);
            }}
            className="w-full bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
          >
            Repetir Evaluación <RotateCcw size={18} />
          </button>
        </div>
      </motion.div>
    );
  }

  const question = ASSESSMENT_QUESTIONS[currentStep];

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1 px-4">
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-mint rounded-full"
              />
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400 w-10 text-right">
            {currentStep + 1}/{ASSESSMENT_QUESTIONS.length}
          </span>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <div>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
              Pregunta {currentStep + 1}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">
              {question.question}
            </h2>
          </div>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleSelect(option.score)}
                className={cn(
                  "w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group",
                  answers[currentStep] === option.score
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-slate-100 hover:border-primary/30 bg-white"
                )}
              >
                <span className={cn(
                  "text-sm font-medium leading-relaxed",
                  answers[currentStep] === option.score ? "text-primary font-bold" : "text-slate-600"
                )}>
                  {option.text}
                </span>
                {answers[currentStep] === option.score && (
                  <CheckCircle2 size={20} className="text-primary shrink-0 ml-4" />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-auto p-6 bg-white/80 backdrop-blur-md border-t border-slate-100">
        <button
          disabled={answers[currentStep] === undefined}
          onClick={handleNext}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2"
        >
          {currentStep === ASSESSMENT_QUESTIONS.length - 1 ? 'Finalizar' : 'Continuar'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
