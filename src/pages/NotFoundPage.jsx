import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, LayoutGrid, AlertTriangle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 relative flex items-center justify-center overflow-hidden pt-20">
        <div className="bg-ambient" />
        <div className="bg-grid absolute inset-0 opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block"
          >
            <span className="text-[10rem] md:text-[15rem] font-display font-black text-white opacity-5 select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-2xl shadow-red-500/20"
              >
                <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-red-500" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-6">
              Lost in <span className="text-gradient">Space</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
              The page you are looking for has been moved, deleted, or never existed in the first place. 
              Let's get you back on track.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/" 
              className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-primary/20"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <Link 
              to="/tools" 
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-primary font-bold flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              <LayoutGrid className="w-5 h-5" />
              View Tools
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}