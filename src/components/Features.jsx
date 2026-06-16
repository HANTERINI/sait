import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Star, Rocket, Code, Terminal } from 'lucide-react';

const FEATURES = [
  {
    title: 'Extreme Velocity',
    desc: 'Instant access to all tools with zero latency.',
    icon: Zap,
    className: 'md:col-span-2 md:row-span-2 bg-red-600/10 border-red-500/20',
    iconColor: 'text-red-500',
  },
  {
    title: 'Verified Security',
    desc: 'Every file is scanned and verified.',
    icon: Shield,
    className: 'bg-orange-500/5 border-orange-500/10',
    iconColor: 'text-orange-500',
  },
  {
    title: 'Premium Quality',
    desc: 'Only the best working software.',
    icon: Star,
    className: 'bg-purple-900/10 border-purple-500/10',
    iconColor: 'text-purple-400',
  },
  {
    title: 'Regular Updates',
    desc: 'Constant improvements and new tools.',
    icon: Rocket,
    className: 'bg-blue-500/5 border-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Open Source',
    desc: 'Transparency is our core principle.',
    icon: Code,
    className: 'bg-emerald-900/10 border-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
];

export default function Features() {
  return (
    <section id="features-section" className="py-24 bg-black/40">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-red-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block"
          >
            Capabilities
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-white"
          >
            Why Choose <span className="text-gradient">H-squad</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-3xl border border-white/5 flex flex-col justify-between group hover:scale-[1.02] hover:border-red-600/30 transition-all duration-500 ${feature.className}`}
            >
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl bg-black/40 border border-white/5 ${feature.iconColor} group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/20`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Terminal className="w-4 h-4 text-red-600/60" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-500 transition-colors duration-500">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}