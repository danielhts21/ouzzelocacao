import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck, Laptop } from 'lucide-react';
import workstationImage from '../../assets/images/corporate_workstation_1788289866477.jpg';

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

  // Parallax offsets (Layered depths)
  // Background & Grid: 2px - 4px
  const bgGridX = shouldReduceMotion ? 0 : mouseX * 3;
  const bgGridY = shouldReduceMotion ? 0 : mouseY * 2.5;

  // Red Spotlight & Studio Lighting: 6px - 8px
  const glowX = shouldReduceMotion ? 0 : mouseX * 7;
  const glowY = shouldReduceMotion ? 0 : mouseY * 5;

  // Workstation Hardware (Protagonist): 8px - 12px
  const computerX = shouldReduceMotion ? 0 : mouseX * -10;
  const computerY = shouldReduceMotion ? 0 : mouseY * -8 + scrollYOffset * 0.2;

  // Foreground Discrete Commercial Badge: 12px - 16px
  const foregroundBadgeX = shouldReduceMotion ? 0 : mouseX * -14;
  const foregroundBadgeY = shouldReduceMotion ? 0 : mouseY * -12 + scrollYOffset * 0.25;

  // Extremely subtle, elegant studio floating animation
  const subtleFloating = shouldReduceMotion ? {} : {
    y: [-2.5, 2.5, -2.5],
    transition: {
      duration: 7,
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
        
        {/* Ouzze Crimson Red Studio Spotlight (Diffused behind the workstation) */}
        <div 
          className="absolute w-[380px] sm:w-[460px] h-[320px] sm:h-[380px] rounded-full bg-gradient-to-b from-red-600/20 via-red-600/5 to-transparent blur-[100px] pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${glowX}px, ${glowY}px)`
          }}
        />

        {/* Soft Lateral White Studio Rim Light (For crisp hardware edge definition) */}
        <div 
          className="absolute w-[300px] h-[260px] rounded-full bg-white/[0.035] blur-[80px] pointer-events-none"
          style={{
            transform: `translate(${glowX * 0.4}px, ${glowY * 0.4}px)`
          }}
        />

        {/* Subtle Fine Studio Grid */}
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
          className="absolute bottom-4 sm:bottom-6 w-[85%] h-12 bg-black/95 rounded-full blur-[20px] pointer-events-none transition-transform duration-700"
          style={{
            transform: `scale(${isHovered ? 1.03 : 1}) translate(${computerX * 0.3}px, 0px)`
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
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
              className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out"
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
        className="absolute -bottom-2 sm:-bottom-3 right-3 sm:right-6 z-30 flex items-center gap-2.5 px-3.5 py-2 rounded-sm bg-zinc-950/90 backdrop-blur-md border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
      >
        <div className="w-6 h-6 rounded-sm bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500">
          <ShieldCheck className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest leading-tight">
            Padronização B2B
          </span>
          <span className="text-xs font-bold text-white uppercase tracking-tight">
            Hardware Corporativo Homologado
          </span>
        </div>
      </motion.div>

      {/* Top Left Minimal Service Scope Tag */}
      <motion.div
        initial={{ opacity: 0, y: -15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transform: `translate(${foregroundBadgeX * -0.7}px, ${foregroundBadgeY * -0.7}px)`
        }}
        className="hidden sm:flex absolute -top-2 left-2 z-30 items-center gap-2 px-3 py-1.5 rounded-sm bg-zinc-950/80 backdrop-blur-md border border-white/10 shadow-lg text-[10px] font-mono text-zinc-300 uppercase tracking-wider"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_6px_#DC2626]" />
        <span>Locação • Venda • Serviços</span>
      </motion.div>

    </div>
  );
};
