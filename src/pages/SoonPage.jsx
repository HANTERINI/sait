import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Timer, ArrowLeft, ExternalLink, Rocket } from 'lucide-react';
import { cn } from '../lib/utils';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SoonPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 relative flex items-center justify-center overflow-hidden pt-20">
        <div className="bg-ambient" />
        <div className="bg-grid absolute inset-0 opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-10 group"
          >
            <Timer className="w-12 h-12 text-primary group-hover:rotate-12 transition-transform" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-6">
              Coming <span className="text-gradient">Soon</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
              We're currently crafting something extraordinary. 
              Our team is working hard to bring you the next generation of digital tools.
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
              <ArrowLeft className="w-5 h-5" />
              Return Home
            </Link>
            <a 
              href="https://vindex.sbs/hanter" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-primary font-bold flex items-center gap-2 hover:bg-white/10 transition-all group"
            >
              Contact Support
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20 max-w-md mx-auto"
          >
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-3 uppercase tracking-widest">
              <span>Development Progress</span>
              <span className="text-primary">85%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
                className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              />
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Rocket className="w-3 h-3 animate-bounce" />
              Deploying soon to production cluster
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}