import React from 'react';
import { motion } from 'motion/react';
import { 
  Headphones, 
  UserCheck, 
  ShieldCheck, 
  Wrench, 
  Network, 
  Cpu, 
  Check, 
  Clock, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { SERVICES_LIST } from '../../data/siteData';

interface ServicesSectionProps {
  onOpenProposal: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenProposal }) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Headphones':
        return <Headphones className="w-5 h-5 text-red-500" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-red-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-red-500" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-red-500" />;
      case 'Network':
        return <Network className="w-5 h-5 text-red-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-red-500" />;
      default:
        return <Wrench className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <section 
      id="servicos" 
      className="py-20 bg-zinc-900/30 text-white relative border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            Ouzze Serviços & Suporte
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Sua operação funcionando. <br className="hidden sm:block" />
            <span className="text-red-600">
              Sempre.
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Gestão, suporte técnico especializado e manutenção para garantir continuidade operacional.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group rounded-lg bg-zinc-900 border border-white/10 hover:border-red-600/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(220,38,38,0.12)] hover:-translate-y-1"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-sm bg-black border border-white/10 group-hover:border-red-600/50 group-hover:shadow-[0_0_12px_rgba(220,38,38,0.25)] flex items-center justify-center transition-all">
                    {getServiceIcon(service.iconName)}
                  </div>
                  
                  {/* SLA Badge */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-black border border-white/10 group-hover:border-red-600/30 text-[10px] font-mono text-zinc-400 transition-colors">
                    <Clock className="w-3 h-3 text-red-500" />
                    <span>{service.sla}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors mb-2 uppercase tracking-tight">
                  {service.title}
                </h3>
                
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 pt-3 border-t border-white/10 mb-6">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                id={`btn-service-${service.id}`}
                onClick={() => onOpenProposal(`Serviço - ${service.title}`)}
                className="w-full py-3 px-4 rounded-sm bg-zinc-800 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 border border-white/10 hover:border-red-600 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(220,38,38,0.35)] active:scale-98"
              >
                <span>Contratar este serviço</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Support SLA Guarantee Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-lg bg-zinc-900 border border-white/10 hover:border-red-600/30 transition-all grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10 shadow-xl">
          <div className="space-y-1 pt-4 md:pt-0">
            <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest font-bold">Atendimento Remoto</span>
            <p className="text-xl font-bold text-white uppercase tracking-tight">Suporte Multicanal</p>
            <p className="text-xs text-zinc-400">Canal direto via WhatsApp e portal de chamados</p>
          </div>

          <div className="space-y-1 pt-4 md:pt-0">
            <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest font-bold">Field Service Presencial</span>
            <p className="text-xl font-bold text-white uppercase tracking-tight">Equipe Especializada</p>
            <p className="text-xs text-zinc-400">Técnicos com ferramental e instrumental completo</p>
          </div>

          <div className="space-y-1 pt-4 md:pt-0">
            <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest font-bold">Substituição de Máquinas</span>
            <p className="text-xl font-bold text-white uppercase tracking-tight">Troca Ágil</p>
            <p className="text-xs text-zinc-400">Garantia de continuidade sem paradas na equipe</p>
          </div>
        </div>

      </div>
    </section>
  );
};
