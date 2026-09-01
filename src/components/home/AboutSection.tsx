import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Cpu, 
  Headphones, 
  TrendingUp, 
  CheckCircle, 
  ArrowUpRight,
  Zap,
  Server
} from 'lucide-react';

interface AboutSectionProps {
  onOpenProposal: (type?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenProposal }) => {
  return (
    <section 
      id="sobre" 
      className="py-20 bg-black text-white relative border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: EDITORIAL COPY & BRAND PURPOSE */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
              Institucional Ouzze
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15]">
              Tecnologia é ferramenta. <br />
              <span className="text-red-600">
                Resultado é o objetivo.
              </span>
            </h2>

            <div className="space-y-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
              <p>
                Na <strong className="text-white">Ouzze Tecnologia</strong>, unimos equipamentos de alta performance, serviços especializados e suporte consultivo para criar soluções completas que simplificam a operação das empresas.
              </p>
              <p className="text-zinc-400 text-sm sm:text-base">
                Seja através da <strong className="text-zinc-200">locação flexível</strong>, da <strong className="text-zinc-200">aquisição estratégica de equipamentos</strong> ou do <strong className="text-zinc-200">suporte técnico proativo</strong>, nosso compromisso é permitir que sua liderança e equipe foquem no crescimento do negócio enquanto nós cuidamos de toda a infraestrutura de TI.
              </p>
            </div>

            {/* Core Values / Operational Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-zinc-900 border border-white/5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase tracking-tight">Disponibilidade Total</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">SLA de atendimento ágil com substituição sem burocracia.</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-zinc-900 border border-white/5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase tracking-tight">Eficiência Financeira</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Transformação de custos fixos pesados em investimento inteligente.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="about-cta-btn"
                onClick={() => onOpenProposal('geral')}
                className="px-6 py-3.5 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Falar com a nossa diretoria técnica</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* RIGHT: HIGH TECH INFRASTRUCTURE VISUALIZATION CARD */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-lg bg-zinc-900 border border-white/10 p-6 sm:p-8 shadow-xl">
              {/* Card Header with Tech Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    OUZZE ARCHITECTURE
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-black border border-white/10 text-zinc-400">
                  TI Corporativa 360°
                </span>
              </div>

              {/* Stack Architecture Visual Steps */}
              <div className="mt-6 space-y-3">
                
                {/* Layer 1: Hardware */}
                <div className="p-3.5 rounded-sm bg-black border border-white/10 flex items-center justify-between group hover:border-red-600/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-zinc-900 border border-white/10 flex items-center justify-center text-red-500">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase">CAMADA 01</p>
                      <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">Hardware & Dispositivos de Ponta</h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-sm">
                    Homologado
                  </span>
                </div>

                {/* Layer 2: Conectividade & Redes */}
                <div className="p-3.5 rounded-sm bg-black border border-white/10 flex items-center justify-between group hover:border-red-600/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-zinc-900 border border-white/10 flex items-center justify-center text-red-500">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase">CAMADA 02</p>
                      <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">Infraestrutura & Redes Seguras</h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-red-400 bg-red-950/40 border border-red-800/40 px-2 py-0.5 rounded-sm">
                    Protegido
                  </span>
                </div>

                {/* Layer 3: Suporte & Gestão */}
                <div className="p-3.5 rounded-sm bg-black border border-white/10 flex items-center justify-between group hover:border-red-600/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-zinc-900 border border-white/10 flex items-center justify-center text-red-500">
                      <Headphones className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase">CAMADA 03</p>
                      <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">Suporte Técnico & Field Service</h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded-sm">
                    SLA Ativo
                  </span>
                </div>

              </div>

              {/* Bottom Commitments Snapshot */}
              <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-sm bg-black border border-white/5">
                  <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Modelo de Atendimento</p>
                  <p className="text-sm font-bold text-white font-mono mt-0.5 uppercase">Consultivo & Direto</p>
                </div>
                <div className="p-3 rounded-sm bg-black border border-white/5">
                  <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Parque Tecnológico</p>
                  <p className="text-sm font-bold text-red-500 font-mono mt-0.5 uppercase">100% Homologado</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
