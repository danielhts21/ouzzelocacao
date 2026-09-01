import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Monitor, 
  Laptop, 
  Printer, 
  Smartphone, 
  Tv, 
  Server, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { RENTAL_EQUIPMENT } from '../../data/siteData';

interface RentalSectionProps {
  onOpenProposal: (equipmentName: string) => void;
}

export const RentalSection: React.FC<RentalSectionProps> = ({ onOpenProposal }) => {
  const [activeFilter, setActiveFilter] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos os Equipamentos' },
    { id: 'computadores', label: 'Computadores' },
    { id: 'notebooks', label: 'Notebooks' },
    { id: 'impressoras', label: 'Impressoras' },
    { id: 'celulares', label: 'Celulares & Tablets' },
    { id: 'monitores', label: 'Monitores' },
    { id: 'corporativo', label: 'Infraestrutura' }
  ];

  const filteredEquipment = activeFilter === 'todos' 
    ? RENTAL_EQUIPMENT 
    : RENTAL_EQUIPMENT.filter(item => item.category === activeFilter);

  const getEquipIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor':
        return <Monitor className="w-5 h-5 text-red-500" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-red-500" />;
      case 'Printer':
        return <Printer className="w-5 h-5 text-red-500" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-red-500" />;
      case 'Tv':
        return <Tv className="w-5 h-5 text-red-500" />;
      case 'Server':
        return <Server className="w-5 h-5 text-red-500" />;
      default:
        return <Monitor className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <section 
      id="locacao" 
      className="py-20 bg-[#0A0A0A] text-white relative border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            Ouzze Locação Corporativa
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Equipamentos certos. <br className="hidden sm:block" />
            <span className="text-red-600">
              Pelo tempo que sua empresa precisa.
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Hardware corporativo homologado com substituição expressa, suporte em tempo real e deduções fiscais em OPEX.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-rental-${cat.id}`}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((equip, idx) => (
            <motion.div
              key={equip.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group rounded-lg bg-zinc-900 border border-white/5 hover:border-red-600/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-lg"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-sm bg-black border border-white/10 group-hover:border-red-600/40 flex items-center justify-center transition-colors">
                    {getEquipIcon(equip.iconName)}
                  </div>
                  {equip.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-sm bg-black border border-white/10 text-red-500">
                      {equip.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                    {equip.categoryLabel}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors uppercase tracking-tight">
                    {equip.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {equip.shortDesc}
                  </p>
                </div>

                {/* Specs List */}
                <div className="pt-3 pb-4 border-t border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                    Configuração Corporativa:
                  </span>
                  {equip.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Recommended Tag */}
                <div className="p-2.5 rounded-sm bg-black border border-white/10 mb-5">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Indicado para:</span>
                  <span className="text-xs font-medium text-zinc-300">{equip.recommendedFor}</span>
                </div>
              </div>

              {/* Bottom Quote Button */}
              <button
                id={`quote-rental-${equip.id}`}
                onClick={() => onOpenProposal(`Locação - ${equip.name}`)}
                className="w-full py-3 px-4 rounded-sm bg-zinc-800 hover:bg-red-600 text-white font-bold uppercase tracking-wider text-xs transition-all duration-200 flex items-center justify-center gap-2 border border-white/10 hover:border-red-600 cursor-pointer shadow-sm active:scale-98"
              >
                <span>Cotar locação deste item</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Value Prop Banner for Rental */}
        <div className="mt-12 p-6 sm:p-8 rounded-lg bg-zinc-900 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-sm bg-black border border-red-600/30 text-red-500 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white uppercase tracking-tight">Precisa de um lote customizado com prazos específicos?</h4>
              <p className="text-xs sm:text-sm text-zinc-400">Atendemos demandas de 5 a 500+ equipamentos com entrega ágil e instalação completa.</p>
            </div>
          </div>
          <button
            id="rental-custom-batch-btn"
            onClick={() => onOpenProposal('Locação Personalizada')}
            className="shrink-0 px-6 py-3.5 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-xs transition-all cursor-pointer shadow-sm active:scale-95"
          >
            Falar com Especialista
          </button>
        </div>

      </div>
    </section>
  );
};
