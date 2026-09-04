import React from 'react';
import { motion } from 'motion/react';
import { 
  Laptop, 
  ShoppingCart, 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Zap
} from 'lucide-react';
import { PILLARS_DATA } from '../../data/siteData';

interface PillarsSectionProps {
  onSelectPillar: (pillarId: string) => void;
  onOpenProposal: (solutionType: string) => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({ 
  onSelectPillar, 
  onOpenProposal 
}) => {
  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'locacao':
        return <Laptop className="w-6 h-6 text-red-500" />;
      case 'vendas':
        return <ShoppingCart className="w-6 h-6 text-red-500" />;
      case 'servicos':
        return <Wrench className="w-6 h-6 text-red-500" />;
      default:
        return <Zap className="w-6 h-6 text-red-500" />;
    }
  };

  const scrollToTarget = (targetSection: string) => {
    const el = document.getElementById(targetSection);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="pilares" 
      className="py-24 bg-zinc-900/40 relative border-b border-white/10 overflow-hidden"
    >
      {/* Background Subtle Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-red-600/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            Soluções Integradas
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Uma empresa. <br className="hidden sm:block" />
            <span className="text-red-600">
              Todas as soluções
            </span> em tecnologia.
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Locação, venda e serviços integrados para simplificar a gestão de TI da sua empresa.
          </p>
        </div>

        {/* 3 Pillars Grid with Micro-Interactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PILLARS_DATA.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-zinc-900 p-6 sm:p-8 border border-white/10 hover:border-red-600/50 transition-all duration-300 rounded-lg flex flex-col justify-between shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(220,38,38,0.15)] hover:-translate-y-1.5"
            >
              {/* Subtle Red Accent Top Border Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg neon-line-subtle" />

              {/* Card Top Pill & Icon */}
              <div>
                {/* Step / Number Tag */}
                <div className="text-red-500 mb-3 font-bold text-xs uppercase tracking-widest flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full neon-dot"></div> 
                    <span>0{idx + 1}. {pillar.tag}</span>
                  </div>
                  <div className="w-8 h-8 rounded-sm bg-black border border-white/10 flex items-center justify-center group-hover:border-red-600/50 group-hover:shadow-[0_0_12px_rgba(220,38,38,0.25)] transition-all">
                    {getPillarIcon(pillar.id)}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-red-500 transition-colors uppercase tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Items List */}
                <div className="pt-4 pb-6 border-t border-white/10 space-y-2.5">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-2 font-bold">
                    Escopo & Equipamentos:
                  </span>
                  {pillar.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <button
                  id={`pillar-btn-${pillar.id}`}
                  onClick={() => onSelectPillar(pillar.id)}
                  className="w-full py-3.5 px-4 rounded-sm bg-zinc-800 hover:bg-red-600 text-white font-bold uppercase tracking-wider text-xs transition-all duration-200 flex items-center justify-center gap-2 border border-white/10 hover:border-red-600 cursor-pointer shadow-sm hover:shadow-[0_0_18px_rgba(220,38,38,0.4)] active:scale-98 group/btn"
                >
                  <span>{pillar.ctaText}</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>

                <button
                  id={`pillar-quote-${pillar.id}`}
                  onClick={() => onOpenProposal(pillar.id === 'locacao' ? 'Locação' : pillar.id === 'vendas' ? 'Compra' : 'Serviços')}
                  className="w-full text-center text-xs font-semibold text-zinc-400 hover:text-white uppercase tracking-wider py-1 block cursor-pointer transition-colors"
                >
                  Pedir cotação direta para {pillar.name}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
