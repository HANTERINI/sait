import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Github, Twitter, MessageSquare, Mail } from 'lucide-react';
import { cn } from '../lib/utils';

const LINKS = [
  { label: 'О проекте', to: '/#about-section', internal: true },
  { label: 'Тулки', to: '/tools', internal: true },
  { label: 'Обратная связь', href: 'https://vindex.sbs/hanter' },
  { label: 'Discord', href: 'https://discord.gg/SnZJ8Ua5' },
];

export default function Footer() {
  return (
    <footer className="bg-[#050000] border-t border-red-500/10 pt-20 pb-10 relative overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-10 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
                <img src="/favicon.ico" alt="" className="w-5 h-5 object-contain" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-gradient drop-shadow-[0_0_10px_rgba(220,38,38,0.2)]">H-squad</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              Providing the most exclusive and secure tools for the modern digital era. 
              Join our elite underground community and stay ahead of the curve.
            </p>
            <div className="flex gap-4">
              {[
                { icon: MessageSquare, href: 'https://discord.gg/SnZJ8Ua5' },
                { icon: Mail, href: 'https://vindex.sbs/hanter' },
                { icon: Github, href: '#' },
                { icon: Twitter, href: '#' },
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-red-500">Navigation</h4>
            <ul className="space-y-4">
              {LINKS.map((link, i) => (
                <li key={i}>
                  {link.internal ? (
                    <Link to={link.to} className="text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 rounded-full bg-red-500 scale-0 group-hover:scale-100 transition-transform" />
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 rounded-full bg-red-500 scale-0 group-hover:scale-100 transition-transform" />
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-red-500">System Status</h4>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Cluster Status</span>
                <span className="flex items-center gap-1.5 text-red-500 font-bold animate-pulse">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Secured
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Version</span>
                <span className="text-red-400 font-mono">v2.4.0-red</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
          <p>© 2026 H-squad. All rights reserved.</p>
          <div className="flex items-center gap-2">
            Forged with <Heart className="w-3 h-3 text-red-600 fill-red-600 animate-pulse" /> in the shadows
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-red-500 transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-red-500 transition-colors">Terms of Access</a>
          </div>
        </div>
      </div>
    </footer>
  );
}