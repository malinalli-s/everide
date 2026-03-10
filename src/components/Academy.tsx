import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Clock, 
  Star, 
  CheckCircle2, 
  Search, 
  Filter, 
  Bookmark, 
  BookmarkCheck,
  PlayCircle,
  Sparkles,
  Trophy
} from 'lucide-react';
import { Course, TeacherProfileResult } from '../types';
import { ACADEMY_COURSES } from '../constants';
import { cn } from '../lib/utils';

interface AcademyProps {
  teacherProfile: TeacherProfileResult | null;
}

export const Academy: React.FC<AcademyProps> = ({ teacherProfile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'recommended' | 'saved' | 'completed'>('all');
  const [savedCourseIds, setSavedCourseIds] = useState<Set<string>>(new Set());
  const [completedCourseIds, setCompletedCourseIds] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    const newSaved = new Set(savedCourseIds);
    if (newSaved.has(id)) newSaved.delete(id);
    else newSaved.add(id);
    setSavedCourseIds(newSaved);
  };

  const toggleComplete = (id: string) => {
    const newCompleted = new Set(completedCourseIds);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedCourseIds(newCompleted);
  };

  const recommendedCourses = useMemo(() => {
    if (!teacherProfile) return [];
    // Map profile name to level
    const profileToLevel: Record<string, string> = {
      "Explorador de IA": "Explorador",
      "Usuario práctico": "Usuario práctico",
      "Diseñador pedagógico con IA": "Diseñador pedagógico",
      "Mentor de IA": "Mentor"
    };
    const userLevel = profileToLevel[teacherProfile.name];
    return ACADEMY_COURSES.filter(c => c.level === userLevel);
  }, [teacherProfile]);

  const filteredCourses = useMemo(() => {
    let courses = ACADEMY_COURSES;

    if (activeFilter === 'recommended') {
      courses = recommendedCourses;
    } else if (activeFilter === 'saved') {
      courses = courses.filter(c => savedCourseIds.has(c.id));
    } else if (activeFilter === 'completed') {
      courses = courses.filter(c => completedCourseIds.has(c.id));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      courses = courses.filter(c => 
        c.title.toLowerCase().includes(query) || 
        c.description.toLowerCase().includes(query)
      );
    }

    return courses;
  }, [activeFilter, searchQuery, recommendedCourses, savedCourseIds, completedCourseIds]);

  return (
    <div className="px-6 py-8 pb-32">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-slate-900">Academia EVERIDE</h2>
        <div className="size-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
          <Trophy size={24} />
        </div>
      </div>
      <p className="text-slate-500 text-sm mb-8">Formación especializada en IA para docentes del futuro.</p>

      {/* Recommended Section (if profile exists) */}
      {teacherProfile && activeFilter === 'all' && recommendedCourses.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={20} className="text-mint" />
            <h3 className="font-bold text-slate-900">Recomendados para ti</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6">
            {recommendedCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                isSaved={savedCourseIds.has(course.id)}
                isCompleted={completedCourseIds.has(course.id)}
                onToggleSave={() => toggleSave(course.id)}
                onToggleComplete={() => toggleComplete(course.id)}
                compact
              />
            ))}
          </div>
        </section>
      )}

      {/* Search and Filters */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Buscar cursos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6">
          <FilterButton 
            active={activeFilter === 'all'} 
            onClick={() => setActiveFilter('all')} 
            label="Todos" 
          />
          {teacherProfile && (
            <FilterButton 
              active={activeFilter === 'recommended'} 
              onClick={() => setActiveFilter('recommended')} 
              label="Recomendados" 
            />
          )}
          <FilterButton 
            active={activeFilter === 'saved'} 
            onClick={() => setActiveFilter('saved')} 
            label="Guardados" 
          />
          <FilterButton 
            active={activeFilter === 'completed'} 
            onClick={() => setActiveFilter('completed')} 
            label="Completados" 
          />
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <CourseCard 
                  course={course} 
                  isSaved={savedCourseIds.has(course.id)}
                  isCompleted={completedCourseIds.has(course.id)}
                  onToggleSave={() => toggleSave(course.id)}
                  onToggleComplete={() => toggleComplete(course.id)}
                />
              </motion.div>
            ))
          ) : (
            <div className="py-12 text-center">
              <div className="size-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={32} />
              </div>
              <p className="text-slate-500 font-medium">No se encontraron cursos.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const FilterButton = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
      active 
        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
        : "bg-white text-slate-500 border-slate-100 hover:border-primary/30"
    )}
  >
    {label}
  </button>
);

interface CourseCardProps {
  course: Course;
  isSaved: boolean;
  isCompleted: boolean;
  onToggleSave: () => void;
  onToggleComplete: () => void;
  compact?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  isSaved, 
  isCompleted, 
  onToggleSave, 
  onToggleComplete,
  compact 
}) => {
  const levelColors: Record<string, string> = {
    'Explorador': 'bg-blue-50 text-blue-600',
    'Usuario práctico': 'bg-mint/10 text-mint',
    'Diseñador pedagógico': 'bg-purple-50 text-purple-600',
    'Mentor': 'bg-amber-50 text-amber-600'
  };

  if (compact) {
    return (
      <div className="w-[280px] shrink-0 bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className={cn("px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider", levelColors[course.level])}>
            {course.level}
          </span>
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
            className={cn("p-2 rounded-xl transition-colors", isSaved ? "text-amber-500 bg-amber-50" : "text-slate-300 hover:bg-slate-50")}
          >
            {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
        </div>
        <h4 className="font-bold text-slate-900 mb-2 line-clamp-2 min-h-[40px]">{course.title}</h4>
        <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
          <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
          <span className="flex items-center gap-1"><BookOpen size={14} /> 8 lecciones</span>
        </div>
        <button className="mt-auto w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
          <PlayCircle size={16} /> Iniciar curso
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
      {isCompleted && (
        <div className="absolute top-0 right-0 bg-mint text-white px-3 py-1 rounded-bl-2xl flex items-center gap-1 z-10">
          <CheckCircle2 size={12} />
          <span className="text-[10px] font-bold uppercase">Completado</span>
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <span className={cn("px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider", levelColors[course.level])}>
            {course.level}
          </span>
          <h4 className="text-lg font-bold text-slate-900 leading-tight">{course.title}</h4>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={onToggleSave}
            className={cn("p-2 rounded-xl transition-colors", isSaved ? "text-amber-500 bg-amber-50" : "text-slate-300 hover:bg-slate-50")}
          >
            {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-6 line-clamp-2">{course.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5"><Clock size={16} className="text-slate-300" /> {course.duration}</span>
          <span className="flex items-center gap-1.5"><BookOpen size={16} className="text-slate-300" /> 8 lecciones</span>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={onToggleComplete}
            className={cn(
              "p-3 rounded-xl transition-all",
              isCompleted ? "bg-mint/10 text-mint" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
            )}
            title={isCompleted ? "Marcar como no completado" : "Marcar como completado"}
          >
            <CheckCircle2 size={20} />
          </button>
          <button className="bg-primary text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95">
            <PlayCircle size={18} /> Iniciar
          </button>
        </div>
      </div>
    </div>
  );
};
