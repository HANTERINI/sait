import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Lock, ChevronDown, ChevronUp, Maximize2, X, FileType, AlertCircle } from 'lucide-react';
import { getFileFormat, CAT_NAMES } from '../data/tools';
import { cn } from '../lib/utils';

const IMG_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp', 'gif'];

function useToolImage(toolName, fallbackImage) {
  const [imageSrc, setImageSrc] = useState(fallbackImage || null);
  const [tried, setTried] = useState(!!fallbackImage);

  useEffect(() => {
    if (fallbackImage) return;

    const basePath = '/static/img/tools/';
    const name = toolName.replace(/[-_]/g, ' ');
    const url = `${basePath}${name}.png`;
    
    // Minimal check or just set it and let onError handle it
    setImageSrc(url);
    setTried(true);
  }, [toolName, fallbackImage]);

  return { imageSrc, tried };
}

export default React.memo(function ToolCard({ tool, index }) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { name, data, category } = tool;
  const hasPass = data.password != null;
  const hasDL = data.download_url != null;
  const fileFormat = getFileFormat(data.download_url);
  const needExpand = data.content && data.content.length > 100;

  const { imageSrc } = useToolImage(name, data.image);
  const showImage = imageSrc && !imgError;

  // Dynamic color based on category
  const getCategoryColor = (cat) => {
    const colors = {
      'RATS': 'text-red-500 border-red-500/20 bg-red-500/10',
      'MOBILE_RATS': 'text-orange-500 border-orange-500/20 bg-orange-500/10',
      'STEALERS': 'text-purple-500 border-purple-500/20 bg-purple-500/10',
      'EXPLOITS': 'text-cyan-500 border-cyan-500/20 bg-cyan-500/10',
      'BINDERS': 'text-blue-500 border-blue-500/20 bg-blue-500/10',
      'SOURCES': 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10',
      'CRYPTERS': 'text-magenta-500 border-magenta-500/20 bg-magenta-500/10',
      'OTHER_TOOLS': 'text-lime-500 border-lime-500/20 bg-lime-500/10',
    };
    return colors[cat] || 'text-primary border-primary/20 bg-primary/10';
  };

  const catStyles = getCategoryColor(category);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
        className={cn(
          "group relative flex flex-col bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/[0.08] transition-all duration-300 shadow-xl",
          category === 'RATS' ? "hover:border-red-500/50 hover:shadow-red-500/5" :
          category === 'STEALERS' ? "hover:border-purple-500/50 hover:shadow-purple-500/5" :
          category === 'EXPLOITS' ? "hover:border-cyan-500/50 hover:shadow-cyan-500/5" :
          "hover:border-primary/50 hover:shadow-primary/5"
        )}
      >
        {/* Card Header/Image */}
        <div 
          className="relative h-48 overflow-hidden cursor-pointer group/img"
          onClick={() => showImage && setLightbox(true)}
        >
          {showImage ? (
            <img 
              src={imageSrc} 
              alt={name} 
              loading="lazy" 
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className={cn(
              "w-full h-full flex items-center justify-center bg-gradient-to-br from-transparent to-transparent",
              catStyles.split(' ').find(s => s.startsWith('bg-')).replace('10', '5')
            )}>
              <FileType className={cn("w-16 h-16 opacity-20", catStyles.split(' ')[0])} />
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={cn("px-3 py-1 rounded-full backdrop-blur-md border text-[10px] font-bold tracking-widest uppercase", catStyles)}>
              {CAT_NAMES[category] || category}
            </span>
            {fileFormat && (
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white tracking-widest uppercase">
                {fileFormat}
              </span>
            )}
          </div>

          {/* Zoom Overlay */}
          {showImage && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Maximize2 className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-1">
            {name.replace(/-/g, ' ')}
          </h3>

          <div className="relative flex-1">
            <p className={cn(
              "text-sm text-muted-foreground leading-relaxed transition-all duration-300",
              !expanded && needExpand && "line-clamp-3"
            )}>
              {data.content}
            </p>
            {needExpand && (
              <button 
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-xs font-bold text-primary flex items-center gap-1 hover:opacity-80 transition-opacity"
              >
                {expanded ? (
                  <>Show Less <ChevronUp className="w-3 h-3" /></>
                ) : (
                  <>Read More <ChevronDown className="w-3 h-3" /></>
                )}
              </button>
            )}
          </div>

          {/* Password Section */}
          {hasPass && (
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group/pass">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Password</span>
              </div>
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs font-mono font-bold text-primary hover:underline"
              >
                {showPassword ? data.password : "Show Password"}
              </button>
            </div>
          )}

          {/* Action Footer */}
          <div className="mt-6">
            {hasDL ? (
              <a 
                href={data.download_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                <Download className="w-4 h-4" />
                Download Tool
              </a>
            ) : (
              <div className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                <AlertCircle className="w-4 h-4" />
                Unavailable
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && showImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-zoom-out"
          >
            <button className="absolute top-10 right-10 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <img src={imageSrc} alt={name} className="w-full h-auto rounded-3xl shadow-2xl border border-white/10" />
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
                <h3 className="text-2xl font-bold text-white">{name}</h3>
                <p className="text-white/60 text-sm mt-1">{CAT_NAMES[category] || category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});