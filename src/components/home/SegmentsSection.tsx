import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Building2, 
  Activity, 
  CalendarRange, 
  Landmark, 
  ArrowRight, 
  Check, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { SEGMENTS_DATA } from '../../data/siteData';
import { SegmentItem } from '../../types';
import { useCMS } from '../../context/CMSContext';

interface SegmentsSectionProps {
  onNavigateToEducation: () => void;
  onOpenProposal: (segmentTitle: string) => void;
}

export const SegmentsSection: React.FC<SegmentsSectionProps> = ({ 
  onNavigateToEducation, 
  onOpenProposal 
}) => {
  const { state } = useCMS();
  const segmentsList = state.segments && state.segments.length > 0 ? state.segments : SEGMENTS_DATA;
  const [selectedSegment, setSelectedSegment] = useState<SegmentItem | null>(null);

  const getSegmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-red-500" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-red-500" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-red-500" />;
      case 'CalendarRange':
        return <CalendarRange className="w-6 h-6 text-red-500" />;
      case 'Landmark':
        return <Landmark className="w-6 h-6 text-red-500" />;
      default:
        return <Building2 className="w-6 h-6 text-red-500" />;
    }
  };

  const handleCardClick = (segment: SegmentItem) => {
    if (segment.id === 'educacao') {
      onNavigateToEducation();
    } else {
      setSelectedSegment(segment);
    }
  };

  return (
    <section 
      id="solucoes" 
      className="py-20 bg-zinc-900/40 relative border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
              Soluções Especializadas
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Tecnologia pensada para <br />
              <span className="text-red-600">
                cada setor do mercado.
              </span>
            </h2>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              Entendemos as particularidades regulatórias e operacionais de diferentes segmentos empresariais, educacionais e corporativos.
            </p>
          </div>

          <div className="shrink-0">
            <button
              id="segments-custom-proposal-btn"
              onClick={() => onOpenProposal('Segmentos Especiais')}
              className="px-5 py-3 rounded-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/10 hover:border-red-600/50 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
            >
              <span>Consultar projeto personalizado</span>
              <ChevronRight className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {segmentsList.map((segment, idx) => {
            const isFeaturedEducation = segment.id === 'educacao';

            return (
              <motion.div
                key={segment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`group relative rounded-lg bg-zinc-900 border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg ${
                  isFeaturedEducation
                    ? 'lg:col-span-2 border-red-600/40 hover:border-red-600 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black ring-1 ring-red-600/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(220,38,38,0.18)]'
                    : 'lg:col-span-1 border-white/10 hover:border-red-600/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.85),0_0_18px_rgba(220,38,38,0.1)]'
                }`}
              >
                {/* Segment Badge if Featured */}
                {isFeaturedEducation && (
                  <div className="absolute -top-3 right-6 px-3 py-1 rounded-sm bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(220,38,38,0.4)] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>Área Educacional Dedicada</span>
                  </div>
                )}

                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-sm bg-black border border-white/10 group-hover:border-red-600/50 group-hover:shadow-[0_0_12px_rgba(220,38,38,0.25)] flex items-center justify-center transition-all shrink-0">
                      {getSegmentIcon(segment.iconName)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors uppercase tracking-tight">
                        {segment.title}
                      </h3>
                      <p className="text-xs text-zinc-400">
                        {segment.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 mb-5 leading-relaxed">
                    {segment.description}
                  </p>

                  {/* Key Benefits Grid for Bento Featured vs Standard */}
                  <div className={`pt-3 border-t border-white/10 mb-6 ${
                    isFeaturedEducation 
                      ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' 
                      : 'space-y-2'
                  }`}>
                    {segment.keyBenefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                        <Check className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-2">
                  <button
                    id={`segment-btn-${segment.id}`}
                    onClick={() => handleCardClick(segment)}
                    className={`w-full py-3 px-4 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none ${
                      isFeaturedEducation
                        ? 'bg-red-600 hover:bg-red-700 text-white neon-glow-btn'
                        : 'bg-zinc-800 hover:bg-red-600 text-zinc-200 hover:text-white border border-white/10 hover:border-red-600 shadow-sm hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                    }`}
                  >
                    <span>{isFeaturedEducation ? 'Acessar Soluções para Educação' : 'Conhecer detalhes'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Segment Quick Detail Modal for non-education segments */}
      {selectedSegment && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg rounded-lg bg-zinc-900 border border-white/10 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-sm bg-black border border-red-600/40 flex items-center justify-center">
                {getSegmentIcon(selectedSegment.iconName)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">{selectedSegment.title}</h3>
                <p className="text-xs text-zinc-400">{selectedSegment.subtitle}</p>
              </div>
            </div>

            <p className="text-sm text-zinc-300 mb-4 leading-relaxed">
              {selectedSegment.description}
            </p>

            <div className="p-3.5 rounded-sm bg-black border border-white/10 space-y-2 mb-6">
              <h4 className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-wider">Diferenciais do Atendimento:</h4>
              {selectedSegment.keyBenefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                  <Check className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedSegment(null)}
                className="w-1/2 py-3 rounded-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-wider border border-white/10 cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  const segTitle = selectedSegment.title;
                  setSelectedSegment(null);
                  onOpenProposal(segTitle);
                }}
                className="w-1/2 py-3 rounded-sm bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Solicitar Proposta
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

