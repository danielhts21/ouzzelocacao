import React, { useState, useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  Cpu, 
  HardDrive, 
  Activity, 
  ShieldCheck, 
  Zap, 
  CheckCircle2,
  Lock,
  Wifi,
  Server,
  ArrowUpRight
} from 'lucide-react';

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
  const [pulseTick, setPulseTick] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseTick((prev) => (prev + 1) % 100);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Multi-tier Parallax Calculations (-1 to 1 based on mouse)
  // Layer 1: Background & Tech Grid (Deepest) - 2px to 4px
  const bgGridX = shouldReduceMotion ? 0 : mouseX * 4;
  const bgGridY = shouldReduceMotion ? 0 : mouseY * 3;

  // Layer 2: Red Ambient Glow & Light Cone - 6px to 8px
  const glowX = shouldReduceMotion ? 0 : mouseX * 8;
  const glowY = shouldReduceMotion ? 0 : mouseY * 6;

  // Layer 3: Main Computer Components (Monitor & Tower) - 10px to 14px
  const monitorX = shouldReduceMotion ? 0 : mouseX * -10;
  const monitorY = shouldReduceMotion ? 0 : mouseY * -8 + scrollYOffset * 0.2;

  const towerX = shouldReduceMotion ? 0 : mouseX * -14;
  const towerY = shouldReduceMotion ? 0 : mouseY * -11 + scrollYOffset * 0.25;

  // Layer 4: Foreground Peripherals (Keyboard, Mouse) - 16px to 20px
  const peripheralsX = shouldReduceMotion ? 0 : mouseX * -18;
  const peripheralsY = shouldReduceMotion ? 0 : mouseY * -14 + scrollYOffset * 0.3;

  // Layer 5: Floating HUD Badges (Outermost depth) - 22px to 26px
  const hudBadgeTopX = shouldReduceMotion ? 0 : mouseX * 22;
  const hudBadgeTopY = shouldReduceMotion ? 0 : mouseY * 18 + scrollYOffset * 0.15;

  const hudBadgeBottomX = shouldReduceMotion ? 0 : mouseX * -24;
  const hudBadgeBottomY = shouldReduceMotion ? 0 : mouseY * -20 + scrollYOffset * 0.35;

  // Floating oscillation animation config (active after entrance)
  const floatingAnimation = shouldReduceMotion ? {} : {
    y: [-3, 3, -3],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: [0.45, 0, 0.55, 1]
    }
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[640px] aspect-[4/3.3] mx-auto flex items-center justify-center select-none"
    >
      {/* ========================================================================= */}
      {/* LAYER 1: CINEMATIC STUDIO LIGHTING & TECHNICAL GRID                      */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Cinematic Ouzze Red Radial Spotlight behind the computer */}
        <div 
          className="absolute w-[420px] sm:w-[500px] h-[380px] sm:h-[440px] rounded-full bg-gradient-to-b from-red-600/20 via-red-600/5 to-transparent blur-[110px] pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${glowX}px, ${glowY}px)`
          }}
        />

        {/* Diffuse secondary white backlight for photorealistic edge separation */}
        <div 
          className="absolute w-[320px] h-[280px] rounded-full bg-white/[0.03] blur-[90px] pointer-events-none"
          style={{
            transform: `translate(${glowX * 0.5}px, ${glowY * 0.5}px)`
          }}
        />

        {/* High-Precision Technical Matrix Grid */}
        <div 
          className="absolute inset-0 opacity-20 transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${bgGridX}px, ${bgGridY}px)`,
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
          }}
        />

        {/* Enterprise Technical Circuit Crosshairs & Markers */}
        <svg 
          className="absolute w-full h-full opacity-30 stroke-red-600" 
          viewBox="0 0 640 480" 
          fill="none"
          style={{
            transform: `translate(${bgGridX * 1.5}px, ${bgGridY * 1.5}px)`
          }}
        >
          {/* Subtle Technical Guidelines */}
          <line x1="60" y1="240" x2="160" y2="240" strokeWidth="0.75" strokeDasharray="3 3" />
          <line x1="160" y1="240" x2="200" y2="200" strokeWidth="0.75" />
          <line x1="200" y1="200" x2="270" y2="200" strokeWidth="0.75" strokeDasharray="3 3" />
          
          <line x1="580" y1="260" x2="490" y2="260" strokeWidth="0.75" strokeDasharray="3 3" />
          <line x1="490" y1="260" x2="450" y2="300" strokeWidth="0.75" />
          <line x1="450" y1="300" x2="380" y2="300" strokeWidth="0.75" strokeDasharray="3 3" />

          {/* Technical Target Points */}
          <circle cx="60" cy="240" r="2.5" fill="#DC2626" />
          <circle cx="270" cy="200" r="2.5" fill="#DC2626" />
          <circle cx="580" cy="260" r="2.5" fill="#DC2626" />
          <circle cx="380" cy="300" r="2.5" fill="#DC2626" />

          {/* Coordinate text tags */}
          <text x="70" y="235" fill="#71717A" fontSize="8" fontFamily="monospace" letterSpacing="1">OUZZE.HW.SYS_01</text>
          <text x="470" y="255" fill="#71717A" fontSize="8" fontFamily="monospace" letterSpacing="1">B2B.WORKSTATION.PRO</text>
        </svg>

        {/* Ambient Ground Shadow / Floor Reflection */}
        <div 
          className="absolute bottom-6 w-[480px] h-[36px] bg-black/90 rounded-full blur-[24px] pointer-events-none transition-transform duration-700"
          style={{
            transform: `scale(${isHovered ? 1.04 : 1}) translate(${monitorX * 0.2}px, 0px)`
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* LAYER 5: FLOATING HUD TELEMETRY BADGES (Outer depth)                      */}
      {/* ========================================================================= */}
      {/* Top-Left Floating Badge: Operational Uptime */}
      <motion.div
        initial={{ opacity: 0, y: -24, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transform: `translate(${hudBadgeTopX}px, ${hudBadgeTopY}px)`
        }}
        className="absolute -top-2 -left-1 sm:left-2 z-40 flex items-center gap-3 px-3.5 py-2.5 rounded-sm bg-zinc-950/90 backdrop-blur-xl border border-white/15 shadow-[0_12px_30px_rgba(0,0,0,0.8)]"
      >
        <div className="relative flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <div className="absolute w-4 h-4 rounded-full bg-emerald-500/40 animate-ping" />
        </div>
        <div>
          <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">Disponibilidade Operacional</p>
          <p className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
            99.98% UPTIME <span className="text-[10px] text-red-500 font-bold bg-red-950/60 px-1.5 py-0.2 border border-red-600/30 rounded-xs">SLA 4H</span>
          </p>
        </div>
      </motion.div>

      {/* Bottom-Right Floating Badge: B2B Hardware Homologation */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transform: `translate(${hudBadgeBottomX}px, ${hudBadgeBottomY}px)`
        }}
        className="absolute -bottom-4 right-1 sm:right-4 z-40 flex items-center gap-3 px-3.5 py-2.5 rounded-sm bg-zinc-950/90 backdrop-blur-xl border border-white/15 shadow-[0_12px_30px_rgba(0,0,0,0.8)]"
      >
        <div className="w-8 h-8 rounded-sm bg-red-600/10 border border-red-600/40 flex items-center justify-center text-red-500 shadow-[0_0_12px_rgba(220,38,38,0.25)]">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Garantia Corporativa</p>
          <p className="text-xs font-bold text-white uppercase tracking-tight">Hardware Homologado</p>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* MAIN WORKSTATION ENSEMBLE CONTAINER (Floating in space)                   */}
      {/* ========================================================================= */}
      <motion.div 
        animate={floatingAnimation}
        className="relative w-full h-full flex items-center justify-center"
      >

        {/* ------------------------------------------------------------------------- */}
        {/* 1. EXECUTIVE WORKSTATION TOWER (Right Side)                               */}
        {/* Entrance: Lateral entrance from right                                      */}
        {/* ------------------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transform: `translate(${towerX}px, ${towerY}px)`
          }}
          className="absolute right-2 sm:right-6 top-8 sm:top-6 z-10 w-32 sm:w-40 h-64 sm:h-80 rounded-lg bg-gradient-to-b from-zinc-800 via-zinc-900 to-black p-3 border border-zinc-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_20px_rgba(220,38,38,0.1)] flex flex-col justify-between"
        >
          {/* Top Panel & Status Light */}
          <div>
            {/* Header / Brand Line */}
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_#DC2626] animate-pulse" />
                <span className="text-[9px] font-mono font-bold text-zinc-300 tracking-widest">OUZZE PRO // WS-01</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            </div>

            {/* Front Panel Mesh Ventilation Grille */}
            <div className="mt-3 space-y-1.5">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-1 rounded-full bg-zinc-950 flex items-center overflow-hidden border border-zinc-800/60">
                  <div 
                    className="h-full bg-red-600/30 rounded-full transition-all duration-1000"
                    style={{ width: `${25 + ((pulseTick * 9 + i * 14) % 70)}%` }}
                  />
                </div>
              ))}
            </div>

            {/* Front I/O Ports */}
            <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between px-1">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-2.5 rounded-xs bg-zinc-700 border border-zinc-600" title="USB-C Thunderbolt" />
                <div className="w-1.5 h-2.5 rounded-xs bg-zinc-700 border border-zinc-600" title="USB 3.2" />
                <div className="w-1.5 h-2.5 rounded-xs bg-zinc-700 border border-zinc-600" title="USB 3.2" />
              </div>
              <span className="text-[7px] font-mono text-zinc-500 uppercase">HIGH-SPEED BUS</span>
            </div>
          </div>

          {/* Tempered Glass Side Window with Hardware Inspection Area */}
          <div className="my-2.5 flex-1 rounded-sm bg-black/90 border border-zinc-800 p-2.5 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle crimson interior lighting accent */}
            <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-red-600/25 rounded-full blur-xl pointer-events-none" />
            
            {/* CPU Module with cooling loop */}
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full border border-red-600/60 flex items-center justify-center bg-red-950/40">
                <Cpu className="w-4 h-4 text-red-500" />
                <div 
                  className="absolute inset-0 rounded-full border-t-2 border-red-500 animate-spin" 
                  style={{ animationDuration: '3.5s' }} 
                />
              </div>
              <div>
                <span className="text-[8px] font-mono text-zinc-400 block">CPU THERMAL</span>
                <span className="text-[10px] font-mono font-bold text-red-500">36.4°C STABLE</span>
              </div>
            </div>

            {/* RAM & Storage Telemetry */}
            <div className="space-y-1 pt-2 border-t border-zinc-800/80">
              <div className="flex items-center justify-between text-[8px] font-mono text-zinc-400">
                <span className="flex items-center gap-1 text-zinc-300">
                  <HardDrive className="w-3 h-3 text-red-500" />
                  NVMe PCIe Gen4
                </span>
                <span className="text-emerald-400 font-bold">100% HEALTH</span>
              </div>
              <div className="flex items-center justify-between text-[8px] font-mono text-zinc-400">
                <span className="text-zinc-400">ECC RAM 64GB</span>
                <span className="text-zinc-200">QUAD-CHANNEL</span>
              </div>
            </div>
          </div>

          {/* Bottom Chassis Stand & Enterprise Badge */}
          <div className="flex items-center justify-between pt-1 border-t border-zinc-800 text-[8px] text-zinc-400 font-mono">
            <span className="text-zinc-300 font-bold">ENTERPRISE GRADE</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_4px_#DC2626]" />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            </div>
          </div>
        </motion.div>


        {/* ------------------------------------------------------------------------- */}
        {/* 2. ULTRATHIN BEZEL WORKSTATION MONITOR (Center Left)                       */}
        {/* Entrance: Smooth entrance from bottom to top                              */}
        {/* ------------------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transform: `translate(${monitorX}px, ${monitorY}px)`
          }}
          className="relative z-20 w-[300px] sm:w-[400px] h-[205px] sm:h-[260px] rounded-lg bg-gradient-to-b from-zinc-800 via-zinc-900 to-black p-2 sm:p-2.5 border border-zinc-700 shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_30px_rgba(220,38,38,0.12)] flex flex-col justify-between group"
        >
          {/* Display Panel Frame (Ultra-thin bezel) */}
          <div className="w-full h-full rounded-sm bg-black border border-zinc-800 p-2.5 sm:p-3.5 flex flex-col justify-between relative overflow-hidden">
            
            {/* Screen Top System Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_4px_#DC2626]" />
                  <span className="w-2 h-2 rounded-full bg-zinc-600" />
                  <span className="w-2 h-2 rounded-full bg-zinc-700" />
                </div>
                <span className="text-[9px] font-mono text-zinc-300 font-bold uppercase tracking-wider">
                  OUZZE OS // B2B TELEMETRY CONSOLE
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-red-950/60 border border-red-600/40 px-2 py-0.5 rounded-xs text-[9px] font-mono text-red-400">
                <Activity className="w-3 h-3 text-red-500 animate-pulse" />
                <span className="font-bold">SYSTEM ACTIVE</span>
              </div>
            </div>

            {/* Screen Central Diagnostic Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 my-2">
              {/* Telemetry 1: Performance */}
              <div className="bg-zinc-950 border border-zinc-800/90 rounded-sm p-2 flex flex-col justify-between">
                <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider">PROCESSAMENTO</span>
                <div className="my-1">
                  <span className="text-sm sm:text-base font-bold text-white font-mono">98.6%</span>
                  <div className="w-full bg-zinc-800 h-1 rounded-full mt-1 overflow-hidden">
                    <div className="bg-red-600 h-full rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
                <span className="text-[8px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Estável
                </span>
              </div>

              {/* Telemetry 2: Fleet Parque */}
              <div className="bg-zinc-950 border border-zinc-800/90 rounded-sm p-2 flex flex-col justify-between">
                <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider">PARQUE ATIVO</span>
                <div className="my-1">
                  <span className="text-sm sm:text-base font-bold text-white font-mono">100%</span>
                  <div className="w-full bg-zinc-800 h-1 rounded-full mt-1 overflow-hidden">
                    <div className="bg-red-600 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <span className="text-[8px] text-zinc-400 font-mono">Zero Paradas</span>
              </div>

              {/* Telemetry 3: Security Status */}
              <div className="bg-zinc-950 border border-zinc-800/90 rounded-sm p-2 flex flex-col justify-between">
                <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider">SEGURANÇA</span>
                <div className="my-1">
                  <span className="text-sm sm:text-base font-bold text-red-500 font-mono">ATIVO</span>
                  <div className="w-full bg-zinc-800 h-1 rounded-full mt-1 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '99%' }} />
                  </div>
                </div>
                <span className="text-[8px] text-zinc-400 font-mono flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-zinc-400" /> AES-256
                </span>
              </div>
            </div>

            {/* Screen Bottom Real-time Dynamic Waveform Strip */}
            <div className="bg-zinc-950 rounded-sm border border-zinc-800/90 p-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-xs bg-red-600/20 border border-red-600/30 text-red-500 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-white uppercase tracking-tight">Alta Disponibilidade Corporativa</p>
                  <p className="text-[8px] text-zinc-400 font-mono">Taxa de resposta &lt; 15 min</p>
                </div>
              </div>

              {/* Animated Waveform Graph Bars */}
              <div className="flex items-end gap-1 h-5">
                {[10, 16, 12, 20, 14, 22, 18, 24, 15, 19, 23, 17].map((height, i) => (
                  <div
                    key={i}
                    className="w-1 bg-red-600 rounded-t transition-all duration-300"
                    style={{
                      height: `${(height + (pulseTick % (i + 3)) * 1.8)}px`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Realistic Screen Surface Glare & Anti-Reflective Coating */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-red-600/[0.04] pointer-events-none" />
          </div>

          {/* Heavy Metallic Monitor Stand */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
            {/* Stand Stem */}
            <div className="w-7 h-8 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 border-x border-zinc-600 shadow-md" />
            {/* Stand Base */}
            <div className="w-28 h-2 rounded-xs bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 shadow-xl border-t border-zinc-500" />
          </div>
        </motion.div>


        {/* ------------------------------------------------------------------------- */}
        {/* 3. EXECUTIVE KEYBOARD & PRECISION MOUSE (Bottom Foreground)               */}
        {/* Entrance: Fade + Scale for keyboard, Mouse appears last                    */}
        {/* ------------------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transform: `translate(${peripheralsX}px, ${peripheralsY}px)`
          }}
          className="absolute -bottom-6 sm:-bottom-5 left-4 sm:left-12 z-30 flex items-center gap-4"
        >
          {/* Low-Profile Enterprise Mechanical Keyboard */}
          <div className="w-52 sm:w-64 h-12 sm:h-14 rounded-sm bg-gradient-to-b from-zinc-800 via-zinc-900 to-black p-1.5 border border-zinc-700 shadow-[0_15px_30px_rgba(0,0,0,0.9),0_0_15px_rgba(220,38,38,0.1)] flex flex-col justify-between">
            {/* Top Function Key Row */}
            <div className="grid grid-cols-12 gap-0.5">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-xs bg-zinc-950 border border-zinc-800 ${
                    i === 0 ? 'bg-red-600 border-red-500 shadow-[0_0_4px_#DC2626]' : ''
                  }`} 
                />
              ))}
            </div>

            {/* QWERTY Row */}
            <div className="grid grid-cols-11 gap-0.5">
              {[...Array(11)].map((_, i) => (
                <div key={i} className="h-1.5 rounded-xs bg-zinc-950 border border-zinc-800" />
              ))}
            </div>

            {/* Spacebar & Modifiers Row */}
            <div className="flex items-center gap-1 justify-center">
              <div className="w-3.5 h-1.5 rounded-xs bg-zinc-950 border border-zinc-800" />
              <div className="w-3 h-1.5 rounded-xs bg-zinc-950 border border-zinc-800" />
              <div className="w-24 sm:w-28 h-1.5 rounded-xs bg-zinc-950 border border-zinc-800" />
              <div className="w-3 h-1.5 rounded-xs bg-zinc-950 border border-zinc-800" />
              <div className="w-3.5 h-1.5 rounded-xs bg-zinc-950 border border-zinc-800" />
            </div>
          </div>

          {/* Precision Ergonomic Enterprise Mouse (Enters Last) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-9 sm:w-11 h-13 sm:h-15 rounded-md bg-gradient-to-b from-zinc-800 via-zinc-900 to-black p-1 border border-zinc-700 shadow-[0_15px_30px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between"
          >
            {/* Clicker & Aluminum Scroll Wheel */}
            <div className="w-full flex items-center justify-center pt-1">
              <div className="w-1.5 h-3.5 rounded-xs bg-red-600 shadow-[0_0_6px_#DC2626]" />
            </div>
            {/* Ouzze Logo Dot */}
            <div className="w-3 h-0.5 rounded-full bg-zinc-600 mb-1" />
          </motion.div>
        </motion.div>

      </motion.div>
    </div>
  );
};
