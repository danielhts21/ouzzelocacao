import React from 'react';
import { motion } from 'motion/react';
import { 
  Layers, 
  Users, 
  Sliders, 
  ShieldAlert, 
  TrendingUp, 
  Check,
  Sparkles
} from 'lucide-react';
import { BENEFITS_DATA } from '../../data/siteData';
import { PageSection } from '../../types/cms';

interface BenefitsSectionProps {
  section?: PageSection;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ section }) => {
  const badge = section?.badge || 'Vantagens Competitivas';
  const title = section?.title || 'Por que escolher a Ouzze Tecnologia?';
  const description = section?.description || section?.subtitle || 'Combinamos inteligência de gestão, agilidade operacional e excelência em engenharia para transformar o modo como sua empresa consome tecnologia.';

  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-6 h-6 text-red-500" />;
      case 'Users':
        return <Users className="w-6 h-6 text-red-500" />;
      case 'Sliders':
        return <Sliders className="w-6 h-6 text-red-500" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-red-500" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-red-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-red-500" />;
    }
  };

  return (
    <section 
      id="beneficios" 
      className="py-20 bg-black text-white relative border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            {badge}
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {title}
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* 5 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS_DATA.map((benefit, idx) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`group rounded-lg bg-zinc-900 border border-white/10 p-7 flex flex-col justify-between transition-all duration-300 hover:border-red-600/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(220,38,38,0.12)] hover:-translate-y-1 shadow-lg ${
                idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-sm bg-black border border-white/10 group-hover:border-red-600/50 group-hover:shadow-[0_0_12px_rgba(220,38,38,0.25)] flex items-center justify-center mb-5 transition-all">
                  {getBenefitIcon(benefit.iconName)}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors mb-2.5 uppercase tracking-tight">
                  {benefit.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[10px] font-mono text-red-500 uppercase tracking-wider font-bold">
                <Check className="w-4 h-4 text-red-600" />
                <span>Padrão Ouzze de Excelência</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
