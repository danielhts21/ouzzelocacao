import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { STATS_DATA } from '../../data/siteData';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  prefix = '', 
  suffix = '', 
  duration = 1800 
}) => {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Smooth ease-out cubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const calculatedValue = Math.floor(easeProgress * value);
      setCurrent(calculatedValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setCurrent(value);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-mono">
      {prefix}
      {current.toLocaleString('pt-BR')}
      {suffix}
    </span>
  );
};

export const StatsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section 
      ref={ref}
      id="numeros" 
      className="py-20 bg-zinc-900/30 relative border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Mini Intro */}
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            Indicadores de Impacto
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
            Solidez comprovada em números
          </h3>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS_DATA.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-lg bg-zinc-900 border border-white/10 p-6 sm:p-7 text-center relative group hover:border-red-600/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(220,38,38,0.14)] transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              {/* Animated Stat Value */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-mono tracking-tight group-hover:text-red-500 transition-colors">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={1600 + idx * 200}
                />
              </div>

              <div className="mt-3">
                <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight mb-1">
                  {stat.label}
                </h4>
                <p className="text-xs text-zinc-400 leading-snug">
                  {stat.description}
                </p>
              </div>

              {/* Red Indicator Dot with Subtle Neon */}
              <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-red-600 opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_8px_#DC2626] transition-all" />
            </motion.div>
          ))}
        </div>

        {/* Notice badge regarding metrics configuration */}
        <div className="mt-8 text-center">
          <p className="text-[11px] font-mono text-zinc-500">
            * Dados operacionais auditados e atualizados periodicamente para novos contratos corporativos.
          </p>
        </div>

      </div>
    </section>
  );
};
