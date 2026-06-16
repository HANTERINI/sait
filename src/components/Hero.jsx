import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Cpu, Activity, ArrowRight, Layout, Zap, Skull } from 'lucide-react';
import useTypingEffect from '../hooks/useTypingEffect';
import { cn } from '../lib/utils';

const PHRASES = [
  'vindex.sbs/hanter',
  'RED PROTOCOL LOADED',
  'ELITE TOOLS ACCESS',
  'SYSTEM OVERRIDE',
];

const TERM_LINES = [ 
  { text: '>> INITIALIZING RED PROTOCOL...', color: 'text-red-600', delay: 400 },
  { text: '>> BYPASSING SECURITY NODES...', color: 'text-red-500', delay: 600 },
  { text: '>> ENCRYPTED TUNNEL [4444]: STABLE', color: 'text-red-400', delay: 200 },
  { text: '>> npm run build - сбилдить файл для залива на хосты', color: 'text-orange-500', delay: 300 },
  { text: '>> DATA REPOSITORY ACCESSED', color: 'text-red-600', delay: 250 },
  { text: '>> WELCOME TO H-SQUAD', color: 'text-white', delay: 400 },
];

export default function Hero() {
  const typed = useTypingEffect(PHRASES, 80, 2500);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black" id="hero">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.08)_0%,transparent_70%)] animate-pulse" />
        <div className="bg-grid absolute inset-0 opacity-20" />
        
        {/* Animated Scanline */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-[10px] font-black text-red-500 tracking-[0.3em] uppercase mb-10 shadow-[0_0_20px_rgba(220,38,38,0.1)]"
          >
            <Skull className="w-3 h-3 text-red-600 animate-pulse" />
            Unauthorized Access Only
          </motion.div>

          {/* Title Section */}
          <div className="relative mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-[7.5rem] font-display font-black tracking-tighter leading-none text-white text-center"
            >
              Leaked by <br />
              <span className="relative">
                <span className="relative z-10 text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.6)]">{typed}</span>
                <span className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full scale-150 -z-10" />
              </span>
            </motion.h1>
            
            {/* Decorative Dots */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-red-600/10 rounded-full blur-2xl animate-bounce" />
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-red-600/5 rounded-full blur-3xl" />
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed text-center font-medium"
          >
            Access the most secure, elite, and unauthorized digital repository. 
            Crafted for <span className="text-red-500 font-bold">maximum performance</span> in the red zone.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24"
          >
            <Link 
              to="/tools" 
              className="group relative px-10 py-5 rounded-2xl bg-red-600 overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-3 text-white font-black uppercase tracking-widest text-sm">
                <Zap className="w-5 h-5 fill-white" />
                Access Repository
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            
            <a 
              href="https://discord.gg/SnZJ8Ua5" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-10 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white font-black uppercase tracking-widest text-sm hover:bg-white/[0.08] hover:border-red-600/30 transition-all active:scale-95"
            >
              Community Hub
            </a>
          </motion.div>

          <HeroTerminal loaded={loaded} />
        </div>
      </div>
    </section>
  );
}

function HeroTerminal({ loaded }) {
  const [lines, setLines] = useState([]);
  const idxRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!loaded) return;

    idxRef.current = 0;
    setLines([]);

    const addNext = () => {
      if (idxRef.current >= TERM_LINES.length) return;
      const line = TERM_LINES[idxRef.current];
      setLines(prev => [...prev, line]);
      idxRef.current++;
      if (idxRef.current < TERM_LINES.length) {
        timeoutRef.current = setTimeout(addNext, TERM_LINES[idxRef.current - 1].delay || 300);
      }
    };

    timeoutRef.current = setTimeout(addNext, 1200);
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [loaded]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="max-w-3xl w-full mx-auto"
    >
      <div className="rounded-2xl border border-red-600/20 bg-black/90 backdrop-blur-xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(220,38,38,0.1)]">
        <div className="px-5 py-4 bg-red-600/5 border-b border-red-600/10 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600/50 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-red-900/30" />
            <div className="w-3 h-3 rounded-full bg-red-900/30" />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-red-600/70 uppercase tracking-[0.2em] font-bold">
            <Terminal className="w-3 h-3" />
            Red OS Kernel v4.2
          </div>
          <div className="w-14" />
        </div>
        <div className="p-8 text-left font-mono text-xs md:text-sm min-h-[220px]">
          <AnimatePresence>
            {lines.map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn("mb-2 flex items-center gap-3", line.color)}
              >
                <span className="opacity-30 text-xs">$</span>
                {line.text}
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2.5 h-5 bg-red-600 inline-block ml-1 mt-1 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
          />
        </div>
      </div>
    </motion.div>
  );
}