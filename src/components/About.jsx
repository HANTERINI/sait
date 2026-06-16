import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Database, Users, Lock, Globe } from 'lucide-react';

const FEATURES = [
  {
    title: 'Red Protocol Security',
    desc: 'Advanced protection for all your digital assets and privacy.',
    icon: Shield,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
  {
    title: 'Overclocked Speed',
    desc: 'Optimized performance for the fastest possible experience.',
    icon: Zap,
    color: 'text-gold-500',
    bg: 'bg-gold-500/10',
  },
  {
    title: 'Encrypted Vault',
    desc: 'Access all your tools and resources from one unified location.',
    icon: Database,
    color: 'text-magenta-500',
    bg: 'bg-magenta-500/10',
  },
  {
    title: 'Elite Underground',
    desc: 'Join a growing network of like-minded developers and enthusiasts.',
    icon: Users,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'Absolute Privacy',
    desc: 'We prioritize your anonymity and data security above all else.',
    icon: Lock,
    color: 'text-lime-500',
    bg: 'bg-lime-500/10',
  },
  {
    title: 'Dark Net Access',
    desc: 'Our tools are accessible from anywhere in the world, 24/7.',
    icon: Globe,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
  },
];

export default function About() {
  return (
    <section id="about-section" className="py-24 relative overflow-hidden bg-black/40">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block"
          >
            Core Capabilities
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6 text-white"
          >
            Built for the <span className="text-gradient drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">Red Era</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg font-medium"
          >
            H-squad provides the foundation you need to excel in the digital landscape. 
            Our ecosystem is designed for power, speed, and absolute security in the shadows.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-red-600/40 hover:bg-red-600/[0.03] transition-all duration-500"
            >
              <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-black/40 border border-white/5`}>
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-500 transition-colors duration-500">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}