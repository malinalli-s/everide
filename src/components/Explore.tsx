import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, ExternalLink, MessageSquare, 
  Image as ImageIcon, Search as SearchIcon, Presentation, 
  Code, Palette, Video, Music, BookOpen, Layout, 
  GitBranch, FileText, ArrowLeft, Star, Info, 
  AlertCircle, ChevronRight, Sparkles, Flame, Clock, Bookmark
} from 'lucide-react';
import { AI_TOOLS } from '../constants';
import { AITool } from '../types';
import { cn } from '../lib/utils';

const ICON_MAP: Record<string, any> = {
  MessageSquare,
  'Generación de texto': MessageSquare,
  'Investigación': SearchIcon,
  'Imagen': Palette,
  'Video': Video,
  'Audio': Music,
  'Programación': Code,
  'Presentaciones': Layout,
  'Educación': BookOpen,
  'Diseño': Palette,
  'Mapas mentales': GitBranch,
  'Documentos': FileText
};

const DIFFICULTY_COLORS = {
  'Fácil': 'bg-emerald-100 text-emerald-700',
  'Intermedio': 'bg-amber-100 text-amber-700',
  'Avanzado': 'bg-rose-100 text-rose-700'
};

export const Explore: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeDifficulty, setActiveDifficulty] = useState<string>('Todas');

  const categories = [
    'Todos', 
    'Generación de texto', 
    'Investigación', 
    'Imagen', 
    'Video', 
    'Audio', 
    'Programación', 
    'Presentaciones', 
    'Educación'
  ];

  const difficulties = ['Todas', 'Fácil', 'Intermedio', 'Avanzado'];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const filteredTools = useMemo(() => {
    return AI_TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || 
                           tool.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'Todos' || tool.category === activeCategory;
      const matchesDifficulty = activeDifficulty === 'Todas' || tool.difficulty === activeDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [search, activeCategory, activeDifficulty]);

  const newTools = useMemo(() => AI_TOOLS.filter(t => t.isNew), []);
  const trendingTools = useMemo(() => AI_TOOLS.filter(t => t.isTrending), []);
  const recommendedTools = useMemo(() => AI_TOOLS.filter(t => t.isRecommended), []);

  const renderToolCard = (tool: AITool, index: number) => {
    const Icon = ICON_MAP[tool.category] || ICON_MAP[tool.icon] || MessageSquare;
    const isFav = favorites.includes(tool.id);

    return (
      <motion.div
        key={tool.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={() => setSelectedTool(tool)}
        className="group bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden"
      >
        {tool.isNew && (
          <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1 text-[10px] font-bold rounded-br-lg z-10">
            NUEVA
          </div>
        )}
        
        <div className="flex gap-4">
          <div className="size-14 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
            <Icon size={28} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-slate-900 truncate pr-2">{tool.name}</h3>
              <button 
                onClick={(e) => toggleFavorite(tool.id, e)}
                className={cn(
                  "text-slate-300 hover:text-amber-500 transition-colors shrink-0",
                  isFav && "text-amber-500"
                )}
              >
                <Star size={18} fill={isFav ? "currentColor" : "none"} />
              </button>
            </div>
            <p className="text-xs text-slate-500 line-clamp-2 mt-1">{tool.description}</p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{tool.category}</span>
              <span className={cn("text-[10px] px-2 py-0.5 rounded-md font-bold", DIFFICULTY_COLORS[tool.difficulty])}>
                {tool.difficulty}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (selectedTool) {
    const Icon = ICON_MAP[selectedTool.category] || ICON_MAP[selectedTool.icon] || MessageSquare;
    const isFav = favorites.includes(selectedTool.id);

    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="px-6 py-8"
      >
        <button 
          onClick={() => setSelectedTool(null)}
          className="flex items-center gap-2 text-primary font-bold mb-6 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft size={20} /> Volver al Radar
        </button>

        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-primary/5 border border-slate-100 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="size-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
              <Icon size={32} />
            </div>
            <button 
              onClick={(e) => toggleFavorite(selectedTool.id, e)}
              className={cn(
                "p-3 rounded-xl transition-colors",
                isFav ? "bg-amber-100 text-amber-500" : "bg-slate-100 text-slate-400"
              )}
            >
              <Star size={20} fill={isFav ? "currentColor" : "none"} />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedTool.name}</h2>
          <div className="flex items-center gap-4 text-slate-500 text-sm mb-6">
            <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", DIFFICULTY_COLORS[selectedTool.difficulty])}>
              Dificultad: {selectedTool.difficulty}
            </span>
            <span className="font-bold text-primary uppercase tracking-wider text-[10px]">
              {selectedTool.category}
            </span>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Info size={18} className="text-primary" /> Descripción
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{selectedTool.fullDescription}</p>
            </section>

            <section>
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-primary" /> Usos en educación
              </h3>
              <div className="space-y-3">
                {selectedTool.educationalUses.map((use, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="size-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{use}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
              <h3 className="font-bold text-rose-600 mb-2 flex items-center gap-2">
                <AlertCircle size={18} /> Precauciones
              </h3>
              <ul className="space-y-2">
                {selectedTool.warnings.map((warning, i) => (
                  <li key={i} className="text-sm text-slate-700 flex gap-2 items-start">
                    <span className="text-rose-400 mt-1">•</span>
                    {warning}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-8 flex gap-3">
            <button className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
              <Bookmark size={20} /> Guardar
            </button>
            <a 
              href={selectedTool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-[2] py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              Ver sitio web <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  const isDiscoveryMode = search === '' && activeCategory === 'Todos' && activeDifficulty === 'Todas';

  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Radar de IA</h2>
        <p className="text-slate-500 text-sm mb-6">Descubre las herramientas que están transformando la educación.</p>
        
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar herramientas..."
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-2 -mx-6 px-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors",
                activeCategory === cat 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-white text-slate-500 border border-slate-100"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center px-2 shrink-0">Dificultad:</span>
          {difficulties.map(diff => (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(diff)}
              className={cn(
                "px-3 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-colors",
                activeDifficulty === diff 
                  ? "bg-slate-800 text-white" 
                  : "bg-slate-100 text-slate-500"
              )}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {isDiscoveryMode ? (
        <div className="space-y-10">
          {/* Nuevas herramientas */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Sparkles size={18} className="text-primary" /> Nuevas esta semana
              </h3>
              <button className="text-primary text-xs font-bold">Ver todas</button>
            </div>
            <div className="flex flex-nowrap gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
              {newTools.map((tool, i) => (
                <div key={tool.id} className="min-w-[280px] shrink-0">
                  {renderToolCard(tool, i)}
                </div>
              ))}
            </div>
          </section>

          {/* Recomendadas para el aula */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Star size={18} className="text-amber-500" /> Recomendadas para el aula
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {recommendedTools.slice(0, 4).map((tool, i) => renderToolCard(tool, i))}
            </div>
          </section>

          {/* Tendencias */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Flame size={18} className="text-rose-500" /> En tendencia
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {trendingTools.slice(0, 4).map((tool, i) => renderToolCard(tool, i))}
            </div>
          </section>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => renderToolCard(tool, index))
          ) : (
            <div className="py-20 text-center">
              <div className="size-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <SearchIcon size={32} />
              </div>
              <h3 className="font-bold text-slate-900">No encontramos herramientas</h3>
              <p className="text-slate-500 text-sm">Intenta con otros filtros o términos de búsqueda.</p>
              <button 
                onClick={() => { setSearch(''); setActiveCategory('Todos'); setActiveDifficulty('Todas'); }}
                className="mt-4 text-primary font-bold text-sm"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
