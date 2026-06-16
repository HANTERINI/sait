import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, Package, LayoutGrid, List, AlertCircle, RefreshCw } from 'lucide-react';
import { getAllTools, getCategoryCounts, CATEGORIES } from '../data/tools';
import ToolCard from '../components/ToolCard';
import { cn } from '../lib/utils';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoaded(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(inputValue), 150);
    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const allTools = useMemo(() => getAllTools(), []);
  const categoryCounts = useMemo(() => getCategoryCounts(), []);

  const filtered = useMemo(() => {
    let result = allTools;
    if (activeCategory !== 'all') {
      result = result.filter(t => t.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        (t.data.content && t.data.content.toLowerCase().includes(q))
      );
    }
    return result;
  }, [allTools, activeCategory, searchQuery]);

  const activeCategoryLabel = CATEGORIES.find(c => c.key === activeCategory)?.label || 'Все';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        <div className="bg-ambient" />
        <div className="bg-grid absolute inset-0 opacity-10 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mb-12">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block"
            >
              Toolbox
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-6"
            >
              The <span className="text-gradient">Collection</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Browse through our curated list of exclusive tools and resources. 
              Everything you need to enhance your workflow, all in one place.
            </motion.p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search tools..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-primary placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
              />
            </div>

            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={cn(
                  "h-full px-6 py-4 rounded-2xl border flex items-center gap-3 transition-all",
                  filterOpen || activeCategory !== 'all'
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-white/5 border-white/10 text-primary hover:bg-white/[0.08]"
                )}
              >
                <Filter className="w-5 h-5" />
                <span className="font-bold text-sm whitespace-nowrap">{activeCategoryLabel}</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", filterOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {filterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl z-50 overflow-hidden"
                  >
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.key}
                        onClick={() => {
                          setActiveCategory(cat.key);
                          setFilterOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left group",
                          activeCategory === cat.key
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-white/5 text-muted-foreground hover:text-primary"
                        )}
                      >
                        <span className="font-medium">{cat.label}</span>
                        <span className={cn(
                          "text-xs font-mono px-2 py-0.5 rounded-full border",
                          activeCategory === cat.key
                            ? "bg-black/20 border-white/20"
                            : "bg-white/5 border-white/10"
                        )}>
                          {categoryCounts[cat.key] || 0}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!loaded ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-32 text-muted-foreground"
              >
                <RefreshCw className="w-10 h-10 animate-spin mb-4" />
                <span className="font-mono text-sm tracking-widest uppercase">Initializing modules...</span>
              </motion.div>
            ) : filtered.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <AlertCircle className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No matching tools found</h3>
                <p className="text-muted-foreground mb-8">Try adjusting your search query or filter to find what you're looking for.</p>
                <button
                  onClick={() => {
                    setInputValue('');
                    setActiveCategory('all');
                  }}
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-sm"
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((tool, i) => (
                  <ToolCard key={`${tool.category}-${tool.name}`} tool={tool} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}