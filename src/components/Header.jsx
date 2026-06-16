import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink, Heart } from 'lucide-react';
import { cn } from '../lib/utils';

const NAV_ITEMS = [
  { to: '/', label: 'Главная' },
  { to: '/tools', label: 'Тулки' },
  { to: '/#about-section', label: 'О проекте', hash: '#about-section' },
  { to: '/#links-section', label: 'Ссылки', hash: '#links-section' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleNavClick = (item) => {
    if (item.hash && location.pathname === '/') {
      const el = document.querySelector(item.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMenuOpen(false);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-background/90 backdrop-blur-xl border-white/10 py-3" 
          : "bg-transparent border-transparent py-4 md:py-6"
      )}
    >
      {/* Multi-color top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-red-600 via-purple-600 via-blue-600 via-emerald-600 to-orange-600 opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 md:gap-3 group transition-transform hover:scale-105"
          onClick={() => setMenuOpen(false)}
        >
          <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
            {/* Blending Background Glow */}
            <div className="absolute inset-0 bg-red-600/20 blur-lg rounded-full group-hover:bg-red-600/40 transition-colors" />
            
            {/* Icon Container with Blending Effect */}
            <div className="relative w-full h-full rounded-lg md:rounded-xl bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden">
              <img 
                src="/favicon.ico" 
                alt="Logo" 
                className="w-5 h-5 md:w-7 md:h-7 object-contain group-hover:scale-110 transition-transform duration-500" 
                style={{
                  maskImage: 'radial-gradient(circle, black 70%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(circle, black 70%, transparent 100%)'
                }}
              />
            </div>
          </div>
          <span className="font-display text-lg md:text-xl font-black tracking-tighter text-gradient drop-shadow-[0_0_10px_rgba(220,38,38,0.3)] uppercase">H-squad</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-red-500/10",
                (location.pathname === item.to || (item.hash && location.hash === item.hash))
                  ? "text-primary bg-red-500/20 border border-red-500/10"
                  : "text-muted-foreground hover:text-primary"
              )}
              onClick={() => handleNavClick(item)}
            >
              {item.label}
            </Link>
          ))}
          <div className="w-px h-4 bg-white/10 mx-2" />
          <a
            href="https://vindex.sbs/hanter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-primary hover:bg-red-500/10 transition-all"
          >
            Обратная связь
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://vindex.sbs/hanter"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2 rounded-full text-sm font-bold bg-primary text-primary-foreground hover:bg-red-600 transition-all shadow-lg shadow-red-500/40"
          >
            H-squad
          </a>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
            RAT <Heart className="w-2.5 h-2.5 text-red-500 fill-red-500" />
          </div>
          <button
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-primary active:scale-95 transition-transform"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Desktop Right Label */}
        <div className="hidden md:flex items-center gap-1 text-xs font-bold text-muted-foreground tracking-widest uppercase">
          RAT <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 z-40 bg-background/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden md:hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {NAV_ITEMS.map((item, i) => (
                <Link
                  key={i}
                  to={item.to}
                  className={cn(
                    "text-xl font-display font-bold p-4 rounded-2xl transition-all",
                    location.pathname === item.to || (item.hash && location.hash === item.hash)
                      ? "bg-red-500/10 text-primary border border-red-500/20"
                      : "text-muted-foreground hover:text-primary hover:bg-white/5"
                  )}
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-px bg-white/5 my-2" />
              <a
                href="https://vindex.sbs/hanter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors flex items-center justify-between p-4"
                onClick={() => setMenuOpen(false)}
              >
                Обратная связь
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href="https://vindex.sbs/hanter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 rounded-2xl text-center text-lg font-bold bg-primary text-primary-foreground shadow-xl shadow-primary/20"
                onClick={() => setMenuOpen(false)}
              >
                H-squad
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}