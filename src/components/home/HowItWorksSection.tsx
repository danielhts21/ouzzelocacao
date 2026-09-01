import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Cpu, 
  CheckCircle, 
  Truck, 
  Headphones, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../../data/siteData';

export const HowItWorksSection: React.FC = () => {
  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Search className="w-5 h-5 text-red-500" />;
      case 1:
        return <Cpu className="w-5 h-5 text-red-500" />;
      case 2:
        return <CheckCircle className="w-5 h-5 text-red-500" />;
      case 3:
        return <Truck className="w-5 h-5 text-red-500" />;
      case 4:
        return <Headphones className="w-5 h-5 text-red-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <section 
      id="como-funciona" 
      className="py-20 bg-black text-white relative border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            Metodologia & SLA
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Como funciona a <br className="hidden sm:block" />
            <span className="text-red-600">
              experiência Ouzze
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Um processo estruturado em 5 etapas para garantir implantação rápida, zero atrito para seus colaboradores e total controle de custos.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-7 left-10 right-10 h-[1px] bg-white/10 z-0" />

          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left group"
            >
              {/* Step Circle & Number */}
              <div className="w-14 h-14 rounded-sm bg-zinc-900 border border-white/10 group-hover:border-red-600/60 group-hover:shadow-[0_0_16px_rgba(220,38,38,0.3)] flex items-center justify-center mb-5 shadow-lg transition-all duration-300">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono font-bold text-red-500 group-hover:scale-110 transition-transform">
                    {step.number}
                  </span>
                  <div className="mt-0.5">
                    {getStepIcon(idx)}
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-red-500 transition-colors uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-zinc-500 block border-t border-white/10 pt-2 uppercase">
                    {step.details}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
