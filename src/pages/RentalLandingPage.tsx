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
  ArrowLeft, 
  Send, 
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Building2,
  Sparkles,
  TrendingDown,
  RotateCcw,
  Zap,
  ChevronRight,
  Headphones
} from 'lucide-react';
import { RENTAL_EQUIPMENT, RENTAL_PAGE_DATA } from '../data/siteData';
import { useCMS } from '../context/CMSContext';
import { siteConfig } from '../config/siteConfig';

interface RentalLandingPageProps {
  onBackToHome: () => void;
  onOpenProposal: (type?: string) => void;
}

export const RentalLandingPage: React.FC<RentalLandingPageProps> = ({ 
  onBackToHome, 
  onOpenProposal 
}) => {
  const { state } = useCMS();
  const equipmentList = state.equipment && state.equipment.length > 0 ? state.equipment : RENTAL_EQUIPMENT;
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  
  const [companyName, setCompanyName] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [equipmentType, setEquipmentType] = useState('Notebooks Corporativos');
  const [quantity, setQuantity] = useState('5 a 15 máquinas');
  const [contractPeriod, setContractPeriod] = useState('12 meses');
  const [notes, setNotes] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const categories = [
    { id: 'todos', label: 'Todos os Equipamentos' },
    { id: 'computadores', label: 'Desktops' },
    { id: 'notebooks', label: 'Notebooks' },
    { id: 'impressoras', label: 'Impressoras' },
    { id: 'celulares', label: 'Móveis' },
    { id: 'monitores', label: 'Monitores' },
    { id: 'corporativo', label: 'Infra & Redes' }
  ];

  const filteredEquipment = activeFilter === 'todos' 
    ? equipmentList 
    : equipmentList.filter(item => item.category === activeFilter);

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

  const buildRentalWhatsAppMessage = () => {
    return `*Cotação de Locação Corporativa - Ouzze Tecnologia*\n\n` +
      `*Empresa:* ${companyName}\n` +
      `*Responsável:* ${responsibleName}\n` +
      `*WhatsApp:* ${phone}\n` +
      `*E-mail:* ${email}\n` +
      `*Equipamento:* ${equipmentType}\n` +
      `*Quantidade:* ${quantity}\n` +
      `*Prazo Contratual:* ${contractPeriod}\n` +
      `*Observações:* ${notes || 'Gostaria de proposta comercial formal para locação de equipamentos de TI com manutenção inclusa.'}`;
  };

  const getWhatsAppRentalUrl = () => {
    const text = buildRentalWhatsAppMessage();
    return `https://wa.me/${siteConfig.whatsapp.phone}?text=${encodeURIComponent(text)}`;
  };

  const handleRentalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getWhatsAppRentalUrl();
    window.open(url, '_blank');
    setHasSubmitted(true);
  };

  const handleOpenRentalWhatsAppAgain = () => {
    const url = getWhatsAppRentalUrl();
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Top Breadcrumb / Return */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-wrap items-center justify-between gap-4">
        <button
          id="btn-back-home"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a página inicial</span>
        </button>

        <nav aria-label="Navegação Estrutural" className="text-xs font-mono text-zinc-400 flex items-center gap-2">
          <button onClick={onBackToHome} className="hover:text-zinc-200 transition-colors cursor-pointer">
            Início
          </button>
          <span>/</span>
          <span className="text-zinc-400">Soluções</span>
          <span>/</span>
          <span className="text-red-500 font-bold">Locação Corporativa</span>
        </nav>
      </div>

      {/* Hero Section - Locação */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            {RENTAL_PAGE_DATA.hero.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12]">
            {RENTAL_PAGE_DATA.hero.title}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 font-medium">
            {RENTAL_PAGE_DATA.hero.subtitle}
          </p>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {RENTAL_PAGE_DATA.hero.description}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              id="cta-locacao-form"
              href="#formulario-locacao"
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider neon-glow-btn transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              <span>Montar plano de locação</span>
              <Send className="w-4 h-4" />
            </a>

            <button
              id="cta-locacao-modal"
              onClick={() => onOpenProposal('Locação')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 hover:border-white/20 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none flex items-center justify-center gap-2"
            >
              <Headphones className="w-4 h-4 text-red-500" />
              <span>Falar com Especialista em Outsourcing</span>
            </button>
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="p-4 rounded-lg bg-zinc-900/80 border border-white/10 text-center">
            <TrendingDown className="w-5 h-5 text-red-500 mx-auto mb-2" />
            <div className="text-xs font-bold text-white uppercase tracking-wider">100% Dedutível (OPEX)</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Benefício fiscal no IRPJ/CSLL</div>
          </div>
          <div className="p-4 rounded-lg bg-zinc-900/80 border border-white/10 text-center">
            <ShieldCheck className="w-5 h-5 text-red-500 mx-auto mb-2" />
            <div className="text-xs font-bold text-white uppercase tracking-wider">Manutenção Inclusa</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Zero custo imprevisto</div>
          </div>
          <div className="p-4 rounded-lg bg-zinc-900/80 border border-white/10 text-center">
            <RotateCcw className="w-5 h-5 text-red-500 mx-auto mb-2" />
            <div className="text-xs font-bold text-white uppercase tracking-wider">Troca Expressa</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Substituição ágil sem parar</div>
          </div>
          <div className="p-4 rounded-lg bg-zinc-900/80 border border-white/10 text-center">
            <Zap className="w-5 h-5 text-red-500 mx-auto mb-2" />
            <div className="text-xs font-bold text-white uppercase tracking-wider">Parque Atualizado</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Renovação periódica</div>
          </div>
        </div>
      </section>

      {/* Interactive Catalog Section */}
      <section className="py-16 bg-zinc-900/30 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
              Equipamentos Disponíveis para Contrato
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight uppercase">
              Catálogo de Hardware para Locação
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === cat.id
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Equipment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="p-6 sm:p-7 rounded-lg bg-zinc-900 border border-white/5 hover:border-red-600/40 transition-all group shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-sm bg-black border border-white/10 flex items-center justify-center text-red-500">
                      {getEquipIcon(item.iconName)}
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-600/30 font-bold uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-red-500 transition-colors uppercase tracking-tight">
                    {item.name}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {item.shortDesc}
                  </p>

                  <div className="pt-3 border-t border-white/10 space-y-1.5 mb-6">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                      Configuração Corporativa:
                    </span>
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setEquipmentType(item.name);
                    const el = document.getElementById('formulario-locacao');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 px-3 rounded-sm bg-zinc-800 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-white/5 hover:border-red-600"
                >
                  <span>Incluir na cotação de locação</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Benefits & Form */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-lg bg-zinc-900 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left: Differentials */}
            <div>
              <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm mb-3">
                Eficiência Financeira & Operacional
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 uppercase tracking-tight">
                Vantagens contratuais da locação Ouzze
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
                A locação de computadores e equipamentos de TI é a forma mais inteligente de manter sua equipe sempre produtiva sem descapitalizar o caixa da empresa.
              </p>

              <div className="space-y-3.5">
                {RENTAL_PAGE_DATA.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Rental Quotation Form */}
            <div id="formulario-locacao" className="rounded-lg bg-black border border-white/10 p-6 sm:p-8">
              {hasSubmitted ? (
                <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-sm bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white uppercase tracking-tight">
                      Cotação enviada para o WhatsApp
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Sua solicitação de locação de hardware corporativo foi direcionada para nossa equipe comercial.
                    </p>
                  </div>

                  <div className="p-3.5 rounded bg-zinc-900 border border-white/10 text-left text-xs font-mono text-zinc-300 space-y-1">
                    <p><span className="text-zinc-500">Empresa:</span> {companyName}</p>
                    <p><span className="text-zinc-500">Responsável:</span> {responsibleName} ({phone})</p>
                    <p><span className="text-zinc-500">Equipamento:</span> {equipmentType}</p>
                    <p><span className="text-zinc-500">Qtd / Prazo:</span> {quantity} - {contractPeriod}</p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      id="btn-rental-open-again"
                      onClick={handleOpenRentalWhatsAppAgain}
                      className="w-full py-3.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Abrir WhatsApp de Locação</span>
                    </button>

                    <button
                      onClick={() => setHasSubmitted(false)}
                      className="w-full py-2.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider border border-white/10 cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
                    >
                      Editar dados da solicitação
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRentalSubmit} className="space-y-3">
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight border-b border-white/10 pb-2">
                    Simulação de Locação Corporativa
                  </h4>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Empresa / Razão Social *</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Nome da sua empresa"
                      className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Responsável *</label>
                      <input
                        type="text"
                        required
                        value={responsibleName}
                        onChange={(e) => setResponsibleName(e.target.value)}
                        placeholder="Seu nome"
                        className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(00) 00000-0000"
                        className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">E-mail Corporativo *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="financeiro@suaempresa.com.br"
                      className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Equipamento Desejado</label>
                      <select
                        value={equipmentType}
                        onChange={(e) => setEquipmentType(e.target.value)}
                        className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Notebooks Corporativos">Notebooks Corporativos</option>
                        <option value="Computadores & Workstations">Computadores & Workstations</option>
                        <option value="Impressoras & Multifuncionais">Impressoras & Multifuncionais</option>
                        <option value="Celulares & Tablets">Celulares & Tablets</option>
                        <option value="Monitores Profissionais">Monitores Profissionais</option>
                        <option value="Parque Completo Misto">Parque Completo Misto</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Quantidade</label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors cursor-pointer"
                      >
                        <option value="1 a 4 máquinas">1 a 4 máquinas</option>
                        <option value="5 a 15 máquinas">5 a 15 máquinas</option>
                        <option value="16 a 30 máquinas">16 a 30 máquinas</option>
                        <option value="Mais de 30 máquinas">Mais de 30 máquinas</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Prazo Estimado de Contrato</label>
                    <select
                      value={contractPeriod}
                      onChange={(e) => setContractPeriod(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors cursor-pointer"
                    >
                      <option value="12 meses">12 meses (Anual)</option>
                      <option value="24 meses">24 meses (Mais Econômico)</option>
                      <option value="36 meses">36 meses (Renovação Total)</option>
                      <option value="Locação Pontual (Eventos / Projetos Curtos)">Locação Pontual (Eventos / Curtos)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Observações ou softwares necessários</label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ex: Necessário pacote Office, entrega rápida em São Paulo..."
                      className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      id="btn-rental-submit"
                      type="submit"
                      className="w-full py-3 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider neon-glow-btn transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                    >
                      <span>Receber Simulação no WhatsApp</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[10px] text-zinc-500 text-center font-normal pt-1">
                    Contratos de locação com manutenção, troca expressa e nota fiscal inclusas.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
