import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import workstationImage from '../../assets/images/workstation_render_1788289881978.jpg';

interface ComputerAssemblyAnimationProps {
  mouseX: number;
  mouseY: number;
  scrollYOffset?: number;
}

export const ComputerAssemblyAnimation: React.FC<ComputerAssemblyAnimationProps> = ({ 
  mouseX, 
  mouseY,
  scrollYOffset = 0
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Parallax offsets (Strict layered depths with ultra-smooth scaling)
  // Background: 2px - 3px
  const bgGridX = shouldReduceMotion ? 0 : mouseX * 2.5;
  const bgGridY = shouldReduceMotion ? 0 : mouseY * 2;

  // Red Spotlight Studio Glow: 4px - 6px
  const glowX = shouldReduceMotion ? 0 : mouseX * 5;
  const glowY = shouldReduceMotion ? 0 : mouseY * 4;

  // Workstation Hardware (Protagonist): 8px - 10px
  const computerX = shouldReduceMotion ? 0 : mouseX * -9;
  const computerY = shouldReduceMotion ? 0 : mouseY * -7 + scrollYOffset * 0.15;

  // Foreground Discrete Badge: 10px - 14px
  const foregroundBadgeX = shouldReduceMotion ? 0 : mouseX * -12;
  const foregroundBadgeY = shouldReduceMotion ? 0 : mouseY * -10 + scrollYOffset * 0.2;

  // Extremely subtle, elegant studio floating animation (2px - 4px amplitude, slow cadence)
  const subtleFloating = shouldReduceMotion ? {} : {
    y: [-2, 2, -2],
    transition: {
      duration: 6.5,
      repeat: Infinity,
      ease: [0.45, 0, 0.55, 1]
    }
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[620px] aspect-[4/3] mx-auto flex items-center justify-center select-none"
    >
      {/* ========================================================================= */}
      {/* LAYER 1: STUDIO LIGHTING & AMBIENT DIFFUSE GLOW                           */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        
        {/* Ouzze Crimson Red Studio Spotlight (Diffused & Atmospheric behind workstation) */}
        <div 
          className="absolute w-[380px] sm:w-[460px] h-[320px] sm:h-[380px] rounded-full bg-gradient-to-b from-red-600/20 via-red-600/5 to-transparent blur-[120px] pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${glowX}px, ${glowY}px)`
          }}
        />

        {/* Soft Lateral White Studio Rim Light (For crisp hardware edge definition) */}
        <div 
          className="absolute w-[300px] h-[260px] rounded-full bg-white/[0.03] blur-[80px] pointer-events-none"
          style={{
            transform: `translate(${glowX * 0.4}px, ${glowY * 0.4}px)`
          }}
        />

        {/* Subtle Fine Studio Grid with soft crimson radial vignette */}
        <div 
          className="absolute inset-0 opacity-10 transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${bgGridX}px, ${bgGridY}px)`,
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 75%)'
          }}
        />

        {/* Floor Shadow & Studio Ambient Occlusion */}
        <div 
          className="absolute bottom-4 sm:bottom-6 w-[85%] h-12 bg-black/95 rounded-full blur-[22px] pointer-events-none transition-transform duration-700"
          style={{
            transform: `scale(${isHovered ? 1.02 : 1}) translate(${computerX * 0.3}px, 0px)`
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* LAYER 2: WORKSTATION COMPOSITION (PHOTOREALISTIC STUDIO PRODUCT SHOT)      */}
      {/* ========================================================================= */}
      <motion.div 
        animate={subtleFloating}
        className="relative z-20 w-full h-full flex items-center justify-center p-2 sm:p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transform: `translate(${computerX}px, ${computerY}px)`
          }}
          className="relative w-full h-full flex items-center justify-center group"
        >
          {/* Main Photorealistic Hardware Render */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
            <img
              src={workstationImage}
              alt="Estação de Trabalho Corporativa Ouzze Tecnologia"
              className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] transition-transform duration-700 ease-out"
              loading="eager"
              decoding="async"
            />

            {/* Seamless Vignette Overlay to blend natural photography edges into pure pitch black */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 65%, rgba(0,0,0,0.4) 85%, #000000 100%)'
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* ========================================================================= */}
      {/* LAYER 3: DISCRETE FOREGROUND ENTERPRISE BADGE (Clean & Commercial)        */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transform: `translate(${foregroundBadgeX}px, ${foregroundBadgeY}px)`
        }}
        className="absolute -bottom-2 sm:-bottom-3 right-3 sm:right-6 z-30 flex items-center gap-2.5 px-3.5 py-2 rounded-sm bg-zinc-950/90 backdrop-blur-md border border-white/15 hover:border-red-600/40 transition-colors shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_0_20px_rgba(220,38,38,0.15)]"
      >
        <div className="w-6 h-6 rounded-sm bg-red-600/10 border border-red-600/40 flex items-center justify-center text-red-500 shadow-[0_0_10px_rgba(220,38,38,0.25)]">
          <ShieldCheck className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest leading-tight">
            Soluções para ambientes B2B
          </span>
          <span className="text-xs font-bold text-white uppercase tracking-tight">
            Equipamentos Corporativos
          </span>
        </div>
      </motion.div>

      {/* Top Left Minimal Service Scope Tag */}
      <motion.div
        initial={{ opacity: 0, y: -15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transform: `translate(${foregroundBadgeX * -0.6}px, ${foregroundBadgeY * -0.6}px)`
        }}
        className="hidden sm:flex absolute -top-2 left-2 z-30 items-center gap-2 px-3 py-1.5 rounded-sm bg-zinc-950/85 backdrop-blur-md border border-white/10 hover:border-red-600/30 transition-colors shadow-lg text-[10px] font-mono text-zinc-300 uppercase tracking-wider"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-red-600 neon-dot" />
        <span>Locação • Venda • Serviços</span>
      </motion.div>

    </div>
  );
};
