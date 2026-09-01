import React, { useState, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Layers, 
  Headphones, 
  RotateCw,
  ChevronRight
} from 'lucide-react';
import { ComputerAssemblyAnimation } from './ComputerAssemblyAnimation';

interface HeroProps {
  onOpenProposal: (type?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProposal }) => {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll Parallax setup for Hero Section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Calculate subtle vertical parallax offsets during scroll
  const textTranslateY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const computerTranslateY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const bgTranslateY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    setMousePosition({ x, y });
  }, [shouldReduceMotion]);

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: 0, y: 0 });
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-black flex flex-col justify-center border-b border-white/10"
    >
      {/* ========================================================================= */}
      {/* BACKGROUND: TECHNOLOGICAL GRID, CROSSHAIRS & DIFFUSE SPOTLIGHT            */}
      {/* ========================================================================= */}
      <motion.div 
        style={{ y: shouldReduceMotion ? 0 : bgTranslateY }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Subtle 32px Technical Blueprint Grid */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at 60% 40%, black 50%, transparent 90%)'
          }}
        />

        {/* Primary Ouzze Red Diffuse Spotlight (Behind Computer Area) */}
        <div className="absolute top-[10%] right-[-5%] lg:top-[15%] lg:right-[5%] w-[550px] lg:w-[680px] h-[550px] lg:h-[680px] bg-red-600/[0.12] rounded-full blur-[140px] pointer-events-none" />

        {/* Secondary Deep Crimson Ambient Glow (Left Side) */}
        <div className="absolute bottom-[-100px] left-[-80px] w-[500px] h-[500px] bg-red-600/[0.05] rounded-full blur-[160px] pointer-events-none" />
      </motion.div>

      {/* ========================================================================= */}
      {/* FOREGROUND HERO CONTENT CONTAINER                                         */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: BRAND HEADLINE, SUBTITLE & CTAs */}
          <motion.div 
            style={{ 
              y: shouldReduceMotion ? 0 : textTranslateY,
              opacity: shouldReduceMotion ? 1 : heroOpacity
            }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
          >
            {/* 1. Top Enterprise Badge (Enters First) */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-red-600/40 bg-red-950/30 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-[0_0_15px_rgba(220,38,38,0.2)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 neon-dot" />
              <span>Soluções Corporativas em Tecnologia</span>
            </motion.div>

            {/* 2. Main Premium Headline (Enters with Blur & TranslateY) */}
            <motion.h1 
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]"
            >
              Tecnologia que <span className="text-red-600 relative inline-block">
                impulsiona
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-full neon-line-subtle" />
              </span> o seu negócio.
            </motion.h1>

            {/* 3. Executive Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed font-normal"
            >
              Locação, venda e serviços de tecnologia para empresas e instituições. Soluções completas para manter sua infraestrutura atualizada, segura e disponível.
            </motion.p>

            {/* 4. Action Buttons (Premium Micro-interactions) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              {/* Primary CTA: Solicitar Proposta */}
              <button
                id="hero-cta-proposal"
                onClick={() => onOpenProposal('geral')}
                className="relative group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-sm text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 neon-glow-btn active:scale-98 hover:scale-[1.02]"
              >
                <FileText className="w-4 h-4 text-white/90" />
                <span>Solicitar Proposta</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA: Conhecer Soluções */}
              <button
                id="hero-cta-solutions"
                onClick={() => scrollToSection('pilares')}
                className="border border-white/20 hover:border-red-600/50 hover:shadow-[0_0_15px_rgba(220,38,38,0.2)] bg-zinc-900/60 hover:bg-zinc-900 text-white px-8 py-4 rounded-sm text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>Conhecer Soluções</span>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-red-500 transition-all duration-200 group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* 5. Trust Indicators Grid */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-red-600 neon-dot" />
                <span className="text-xs sm:text-sm font-medium text-zinc-300">
                  Sem imobilizar capital
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-red-600 neon-dot" />
                <span className="text-xs sm:text-sm font-medium text-zinc-300">
                  Suporte especializado
                </span>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-2 h-2 rounded-full bg-red-600 neon-dot" />
                <span className="text-xs sm:text-sm font-medium text-zinc-300">
                  Equipamentos corporativos
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: HIGH-TECH REALISTIC WORKSTATION ASSEMBLY & PARALLAX */}
          <motion.div 
            style={{ 
              y: shouldReduceMotion ? 0 : computerTranslateY,
              opacity: shouldReduceMotion ? 1 : heroOpacity
            }}
            className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0"
          >
            <ComputerAssemblyAnimation
              mouseX={mousePosition.x}
              mouseY={mousePosition.y}
            />
          </motion.div>

        </div>
      </div>

      {/* Subtle Luminous Red Section Transition Horizon */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/35 to-transparent pointer-events-none neon-line-subtle" />
    </section>
  );
};
