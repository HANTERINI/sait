import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Hash, Globe, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';

const LINKS = [
  { 
    num: '01', 
    tag: 'COMMUNITY', 
    title: 'Discord', 
    desc: 'Join our exclusive community', 
    href: 'https://discord.gg/SnZJ8Ua5', 
    icon: MessageSquare,
    color: 'text-purple-500'
  },
  { 
    num: '02', 
    tag: 'DEVELOPER', 
    title: 'H-squad', 
    desc: 'The leaker profile', 
    href: 'https://vindex.sbs/hanter', 
    icon: Globe,
    color: 'text-cyan-500'
  },
  { 
    num: '03', 
    tag: 'SYSTEM', 
    title: 'Terminal', 
    desc: 'Direct system access', 
    href: '#', 
    icon: Hash,
    color: 'text-magenta-500'
  },
];

export default function Links() {
  return (
    <section id="links-section" className="py-24 relative overflow-hidden bg-black/60">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block"
            >
              Resources
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-white"
            >
              Connect with <span className="text-gradient">Us</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm max-w-xs md:text-right"
          >
            Stay updated with the latest releases and connect with our elite network.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LINKS.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-red-500/50 hover:bg-red-500/[0.02] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:text-red-500 transition-all duration-700">
                <link.icon className="w-32 h-32 rotate-12" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-mono text-red-500 px-2 py-1 rounded bg-red-500/10 border border-red-500/20 tracking-widest uppercase">
                    {link.tag}
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs font-mono text-muted-foreground">{link.num}</span>
                </div>
                
                <div className="flex items-center justify-between group-hover:translate-x-2 transition-transform duration-500">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-red-500 transition-colors flex items-center gap-3">
                      {link.title}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-muted-foreground">{link.desc}</p>
                  </div>
                  <div className={cn("p-4 rounded-2xl bg-black/40 border border-white/5", link.color, "group-hover:scale-110 transition-transform duration-500")}>
                    <link.icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-3xl border border-red-500/10 bg-gradient-to-r from-red-500/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
              <Hash className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-white">Need assistance?</h4>
              <p className="text-sm text-muted-foreground">Our support team is available on Discord 24/7.</p>
            </div>
          </div>
          <a 
            href="https://discord.gg/SnZJ8Ua5" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all font-bold text-sm shadow-lg shadow-red-600/20"
          >
            Open Support Ticket
          </a>
        </motion.div>
      </div>
    </section>
  );
}