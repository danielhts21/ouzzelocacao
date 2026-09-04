import React from 'react';
import { motion } from 'motion/react';
import { FileText, PhoneCall, ArrowRight, Sparkles } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { PageSection } from '../../types/cms';

interface CommercialCTAProps {
  section?: PageSection;
  onOpenProposal: (type?: string) => void;
}

export const CommercialCTA: React.FC<CommercialCTAProps> = ({ section, onOpenProposal }) => {
  const { state } = useCMS();
  const phone = state.settings.whatsapp?.phone || '5511999999999';
  const salesMessage = state.settings.whatsapp?.salesMessage || 'Olá! Gostaria de falar com um especialista sobre soluções corporativas da Ouzze.';

  const badge = section?.badge || 'Atendimento Consultivo Corporativo';
  const title = section?.title || 'Sua empresa precisa de tecnologia. Nós cuidamos do resto.';
  const description = section?.description || section?.subtitle || 'Fale com nossa equipe e encontre a melhor solução em locação, venda ou serviços de tecnologia com retorno financeiro imediato e zero dor de cabeça.';
  const buttonText = section?.content?.buttonText || 'Solicitar proposta';

  return (
    <section className="py-20 bg-zinc-900/40 relative overflow-hidden border-b border-white/10">
      {/* Subtle Ambient Red Neon Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/[0.08] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative p-8 sm:p-12 md:p-16 rounded-lg bg-zinc-900 border border-white/10 hover:border-red-600/40 transition-colors shadow-2xl space-y-6"
        >
          {/* Subtle Red Top Line Accent */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-red-600/60 to-transparent neon-line-subtle" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-red-600/30 bg-red-950/30 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-[0_0_12px_rgba(220,38,38,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 neon-dot" />
            <span>{badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="cta-open-proposal-btn"
              onClick={() => onOpenProposal('geral')}
              className="w-full sm:w-auto px-8 py-4 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider neon-glow-btn transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <FileText className="w-4 h-4 text-red-200" />
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              id="cta-whatsapp-specialist-btn"
              href={`https://wa.me/${phone}?text=${encodeURIComponent(salesMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-sm bg-zinc-800 hover:bg-zinc-700 hover:border-red-600/30 text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Falar com especialista</span>
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-[11px] text-zinc-400 font-mono">
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-red-600 neon-dot" /> PROPOSTA PERSONALIZADA</span>
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-red-600 neon-dot" /> CONTRATOS FLEXÍVEIS</span>
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-red-600 neon-dot" /> FATURAMENTO B2B</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
