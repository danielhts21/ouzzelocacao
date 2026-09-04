import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Headphones, 
  UserCheck, 
  ShieldCheck, 
  Wrench, 
  Network, 
  Cpu, 
  CheckCircle2, 
  ArrowLeft, 
  Send, 
  ExternalLink,
  MessageSquare,
  Clock,
  Activity,
  Layers,
  Sparkles,
  Check,
  ChevronRight,
  PhoneCall,
  Server
} from 'lucide-react';
import { SERVICES_PAGE_DATA } from '../data/siteData';
import { siteConfig } from '../config/siteConfig';

interface ServicesLandingPageProps {
  onBackToHome: () => void;
  onOpenProposal: (type?: string) => void;
}

export const ServicesLandingPage: React.FC<ServicesLandingPageProps> = ({ 
  onBackToHome, 
  onOpenProposal 
}) => {
  const [companyName, setCompanyName] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [workstationCount, setWorkstationCount] = useState('10 a 25 computadores');
  const [serviceModality, setServiceModality] = useState('Contrato Mensal de TI (Helpdesk + Visitas)');
  const [currentChallenge, setCurrentChallenge] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-red-500" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-red-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-red-500" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-red-500" />;
      case 'Network':
        return <Network className="w-6 h-6 text-red-500" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-red-500" />;
      default:
        return <Wrench className="w-6 h-6 text-red-500" />;
    }
  };

  const buildServicesWhatsAppMessage = () => {
    return `*Solicitação de Serviços & Suporte de TI - Ouzze Tecnologia*\n\n` +
      `*Empresa:* ${companyName}\n` +
      `*Responsável:* ${responsibleName}\n` +
      `*WhatsApp:* ${phone}\n` +
      `*E-mail:* ${email}\n` +
      `*Parque Estimado:* ${workstationCount}\n` +
      `*Modalidade:* ${serviceModality}\n` +
      `*Cenário / Desafio Atual:* ${currentChallenge || 'Gostaria de agendar diagnóstico técnico para estruturação de suporte de TI na empresa.'}`;
  };

  const getWhatsAppServicesUrl = () => {
    const text = buildServicesWhatsAppMessage();
    return `https://wa.me/${siteConfig.whatsapp.phone}?text=${encodeURIComponent(text)}`;
  };

  const handleServicesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getWhatsAppServicesUrl();
    window.open(url, '_blank');
    setHasSubmitted(true);
  };

  const handleOpenServicesWhatsAppAgain = () => {
    const url = getWhatsAppServicesUrl();
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
          <span className="text-red-500 font-bold">Serviços & Suporte de TI</span>
        </nav>
      </div>

      {/* Hero Section - Serviços */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            {SERVICES_PAGE_DATA.hero.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12]">
            {SERVICES_PAGE_DATA.hero.title}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 font-medium">
            {SERVICES_PAGE_DATA.hero.subtitle}
          </p>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {SERVICES_PAGE_DATA.hero.description}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              id="cta-servicos-form"
              href="#formulario-servicos"
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider neon-glow-btn transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              <span>Solicitar diagnóstico de TI</span>
              <Send className="w-4 h-4" />
            </a>

            <button
              id="cta-servicos-modal"
              onClick={() => onOpenProposal('Serviços')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 hover:border-white/20 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-red-500" />
              <span>Plantão Técnico de Suporte</span>
            </button>
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="p-4 rounded-lg bg-zinc-900/80 border border-white/10 text-center">
            <Clock className="w-5 h-5 text-red-500 mx-auto mb-2" />
            <div className="text-xs font-bold text-white uppercase tracking-wider">Atendimento em 15 min</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">SLA ágil para chamados críticos</div>
          </div>
          <div className="p-4 rounded-lg bg-zinc-900/80 border border-white/10 text-center">
            <ShieldCheck className="w-5 h-5 text-red-500 mx-auto mb-2" />
            <div className="text-xs font-bold text-white uppercase tracking-wider">+85% Primeira Chamada</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Alta taxa de resolução remota</div>
          </div>
          <div className="p-4 rounded-lg bg-zinc-900/80 border border-white/10 text-center">
            <Activity className="w-5 h-5 text-red-500 mx-auto mb-2" />
            <div className="text-xs font-bold text-white uppercase tracking-wider">Ação Preventiva</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Menos quedas e lentidões</div>
          </div>
          <div className="p-4 rounded-lg bg-zinc-900/80 border border-white/10 text-center">
            <Layers className="w-5 h-5 text-red-500 mx-auto mb-2" />
            <div className="text-xs font-bold text-white uppercase tracking-wider">Até 40% de Economia</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Comparado a TI interna própria</div>
          </div>
        </div>
      </section>

      {/* Services Modalities Grid */}
      <section className="py-16 bg-zinc-900/30 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
              Escopo Técnico de Atuação
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight uppercase">
              Soluções completas para a infraestrutura da sua empresa
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl mx-auto">
              Do suporte diário aos usuários à engenharia de servidores e cabeamento de rede estruturado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_PAGE_DATA.services.map((srv, i) => (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="p-6 sm:p-7 rounded-lg bg-zinc-900 border border-white/5 hover:border-red-600/40 transition-all group shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-sm bg-black border border-white/10 flex items-center justify-center group-hover:border-red-600/40 transition-colors">
                      {getServiceIcon(srv.icon)}
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-white/5">
                      {srv.sla}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-500 transition-colors uppercase tracking-tight">
                    {srv.title}
                  </h3>
                  
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {srv.desc}
                  </p>

                  <div className="pt-3 border-t border-white/10 space-y-2 mb-6">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                      Principais Atividades:
                    </span>
                    {srv.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setServiceModality(srv.title);
                    const el = document.getElementById('formulario-servicos');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 px-3 rounded-sm bg-zinc-800 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-white/5 hover:border-red-600"
                >
                  <span>Contratar {srv.title.split('(')[0]}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Contract Models */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            Modelos de Atendimento
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
            Escolha o formato ideal para o momento da sua empresa
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_PAGE_DATA.contractModels.map((model, idx) => (
            <div key={idx} className="p-7 rounded-lg bg-zinc-900 border border-white/10 relative flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-600/30 font-bold uppercase tracking-wider inline-block mb-3">
                  {model.badge}
                </span>
                <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">
                  {model.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {model.desc}
                </p>
              </div>

              <button
                onClick={() => {
                  setServiceModality(model.title);
                  const el = document.getElementById('formulario-servicos');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-3 rounded-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs uppercase tracking-wider border border-white/10 transition-colors cursor-pointer text-center"
              >
                Selecionar este modelo
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits & Diagnostic Form */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-lg bg-zinc-900 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left: Differentials */}
            <div>
              <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm mb-3">
                Continuidade Operacional
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 uppercase tracking-tight">
                Por que terceirizar a TI com a Ouzze?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
                Empresas não podem parar por lentidão de sistema, falhas em servidores ou problemas de rede. Nós assumimos a gestão técnica proativa para que você economize e foque no faturamento.
              </p>

              <div className="space-y-3.5">
                {SERVICES_PAGE_DATA.differentials.map((diff, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{diff}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Diagnostic Form */}
            <div id="formulario-servicos" className="rounded-lg bg-black border border-white/10 p-6 sm:p-8">
              {hasSubmitted ? (
                <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-sm bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white uppercase tracking-tight">
                      Diagnóstico enviado para o WhatsApp
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Seu pedido de suporte e diagnóstico foi direcionado para a central técnica especializada da Ouzze.
                    </p>
                  </div>

                  <div className="p-3.5 rounded bg-zinc-900 border border-white/10 text-left text-xs font-mono text-zinc-300 space-y-1">
                    <p><span className="text-zinc-500">Empresa:</span> {companyName}</p>
                    <p><span className="text-zinc-500">Responsável:</span> {responsibleName} ({phone})</p>
                    <p><span className="text-zinc-500">Parque:</span> {workstationCount}</p>
                    <p><span className="text-zinc-500">Modalidade:</span> {serviceModality}</p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      id="btn-services-open-again"
                      onClick={handleOpenServicesWhatsAppAgain}
                      className="w-full py-3.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Abrir WhatsApp de Suporte</span>
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
                <form onSubmit={handleServicesSubmit} className="space-y-3">
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight border-b border-white/10 pb-2">
                    Solicitar Diagnóstico Técnico de TI
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
                      placeholder="ti@suaempresa.com.br"
                      className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Qtd. Computadores</label>
                      <select
                        value={workstationCount}
                        onChange={(e) => setWorkstationCount(e.target.value)}
                        className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Até 5 computadores">Até 5 computadores</option>
                        <option value="6 a 15 computadores">6 a 15 computadores</option>
                        <option value="16 a 35 computadores">16 a 35 computadores</option>
                        <option value="Mais de 35 computadores">Mais de 35 computadores</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Modalidade Desejada</label>
                      <select
                        value={serviceModality}
                        onChange={(e) => setServiceModality(e.target.value)}
                        className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Contrato Mensal de TI (Helpdesk + Visitas)">Contrato Mensal de TI</option>
                        <option value="Banco de Horas Pré-Pago">Banco de Horas Pré-Pago</option>
                        <option value="Manutenção de Parque / Preventiva">Manutenção de Parque</option>
                        <option value="Projeto de Redes e Cabeamento">Projeto de Redes e Cabeamento</option>
                        <option value="Suporte Emergencial Avulso">Suporte Emergencial Avulso</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Principal desafio de TI atual</label>
                    <textarea
                      rows={2}
                      value={currentChallenge}
                      onChange={(e) => setCurrentChallenge(e.target.value)}
                      placeholder="Ex: Lentidão frequente, computadores sem manutenção, rede Wi-Fi caindo..."
                      className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      id="btn-services-submit"
                      type="submit"
                      className="w-full py-3 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider neon-glow-btn transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                    >
                      <span>Receber Diagnóstico no WhatsApp</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[10px] text-zinc-500 text-center font-normal pt-1">
                    Atendimento com sigilo, conformidade e equipe técnica especializada.
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
