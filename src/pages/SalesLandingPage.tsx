import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Monitor, 
  Laptop, 
  Server, 
  Tv, 
  Network, 
  Printer, 
  CheckCircle2, 
  ArrowLeft, 
  Send, 
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Building2,
  FileCheck2,
  Layers,
  Sparkles,
  CreditCard,
  ChevronRight,
  Headphones
} from 'lucide-react';
import { SALES_PAGE_DATA } from '../data/siteData';
import { siteConfig } from '../config/siteConfig';

interface SalesLandingPageProps {
  onBackToHome: () => void;
  onOpenProposal: (type?: string) => void;
}

export const SalesLandingPage: React.FC<SalesLandingPageProps> = ({ 
  onBackToHome, 
  onOpenProposal 
}) => {
  const [companyName, setCompanyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [equipmentType, setEquipmentType] = useState('Desktops & Workstations');
  const [quantity, setQuantity] = useState('1 a 5 unidades');
  const [paymentPreference, setPaymentPreference] = useState('Boleto Faturado PJ');
  const [notes, setNotes] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor':
        return <Monitor className="w-6 h-6 text-red-500" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6 text-red-500" />;
      case 'Server':
        return <Server className="w-6 h-6 text-red-500" />;
      case 'Tv':
        return <Tv className="w-6 h-6 text-red-500" />;
      case 'Network':
        return <Network className="w-6 h-6 text-red-500" />;
      case 'Printer':
        return <Printer className="w-6 h-6 text-red-500" />;
      default:
        return <Monitor className="w-6 h-6 text-red-500" />;
    }
  };

  const buildSalesWhatsAppMessage = () => {
    return `*Cotação de Venda Corporativa - Ouzze Tecnologia*\n\n` +
      `*Empresa:* ${companyName}\n` +
      (cnpj ? `*CNPJ:* ${cnpj}\n` : '') +
      `*Responsável:* ${responsibleName}\n` +
      `*WhatsApp:* ${phone}\n` +
      `*E-mail:* ${email}\n` +
      `*Equipamento de Interesse:* ${equipmentType}\n` +
      `*Quantidade Estimada:* ${quantity}\n` +
      `*Condição Pretendida:* ${paymentPreference}\n` +
      `*Detalhes:* ${notes || 'Gostaria de receber proposta comercial formal com prazos e condições de faturamento PJ.'}`;
  };

  const getWhatsAppSalesUrl = () => {
    const text = buildSalesWhatsAppMessage();
    return `https://wa.me/${siteConfig.whatsapp.phone}?text=${encodeURIComponent(text)}`;
  };

  const handleSalesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getWhatsAppSalesUrl();
    window.open(url, '_blank');
    setHasSubmitted(true);
  };

  const handleOpenSalesWhatsAppAgain = () => {
    const url = getWhatsAppSalesUrl();
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
          <span className="text-red-500 font-bold">Venda Corporativa</span>
        </nav>
      </div>

      {/* Hero Section - Vendas */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            {SALES_PAGE_DATA.hero.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12]">
            {SALES_PAGE_DATA.hero.title}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 font-medium">
            {SALES_PAGE_DATA.hero.subtitle}
          </p>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {SALES_PAGE_DATA.hero.description}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              id="cta-vendas-form"
              href="#formulario-vendas"
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider neon-glow-btn transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              <span>Solicitar cotação de compra</span>
              <Send className="w-4 h-4" />
            </a>

            <button
              id="cta-vendas-modal"
              onClick={() => onOpenProposal('Compra')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 hover:border-white/20 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none flex items-center justify-center gap-2"
            >
              <Headphones className="w-4 h-4 text-red-500" />
              <span>Atendimento Consultivo PJ</span>
            </button>
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="p-4 rounded-lg bg-zinc-900/80 border border-white/10 text-center">
            <CreditCard className="w-5 h-5 text-red-500 mx-auto mb-2" />
            <div className="text-xs font-bold text-white uppercase tracking-wider">Boleto Faturado PJ</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">28, 35 ou 42 dias</div>
          </div>
          <div className="p-4 rounded-lg bg-zinc-900/80 border border-white/10 text-center">
            <ShieldCheck className="w-5 h-5 text-red-500 mx-auto mb-2" />
            <div className="text-xs font-bold text-white uppercase tracking-wider">Garantia Formal</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">12 a 36 meses com SLA</div>
          </div>
          <div className="p-4 rounded-lg bg-zinc-900/80 border border-white/10 text-center">
            <FileCheck2 className="w-5 h-5 text-red-500 mx-auto mb-2" />
            <div className="text-xs font-bold text-white uppercase tracking-wider">Nota Fiscal Integral</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">100% legalizado e rastreável</div>
          </div>
          <div className="p-4 rounded-lg bg-zinc-900/80 border border-white/10 text-center">
            <Layers className="w-5 h-5 text-red-500 mx-auto mb-2" />
            <div className="text-xs font-bold text-white uppercase tracking-wider">Lotes Homogêneos</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Padronização de parque</div>
          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="py-16 bg-zinc-900/30 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
              Catálogo de Hardware
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight uppercase">
              Equipamentos de alta performance para sua empresa
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl mx-auto">
              Hardware corporativo de grandes marcas (Dell, Lenovo, HP) homologado e revisado para suportar operações contínuas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SALES_PAGE_DATA.categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="p-6 sm:p-7 rounded-lg bg-zinc-900 border border-white/5 hover:border-red-600/40 transition-all group shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-sm bg-black border border-white/10 flex items-center justify-center group-hover:border-red-600/40 transition-colors">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    {cat.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-600/30 font-bold uppercase tracking-wider">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-500 transition-colors uppercase tracking-tight">
                    {cat.title}
                  </h3>
                  
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {cat.desc}
                  </p>

                  <div className="pt-3 border-t border-white/10 space-y-2 mb-6">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                      Especificações Típicas:
                    </span>
                    {cat.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setEquipmentType(cat.title);
                    const el = document.getElementById('formulario-vendas');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 px-3 rounded-sm bg-zinc-800 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-white/5 hover:border-red-600"
                >
                  <span>Cotar {cat.title.split('&')[0]}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Purchasing Steps */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            Fluxo B2B Descomplicado
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
            Como funciona a compra corporativa com a Ouzze
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SALES_PAGE_DATA.steps.map((step, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-zinc-900 border border-white/10 relative">
              <div className="text-3xl font-mono font-bold text-red-600 mb-3">
                {step.number}
              </div>
              <h4 className="text-base font-bold text-white mb-2 uppercase tracking-tight">
                {step.title}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits & Quotation Form */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-lg bg-zinc-900 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left: Differentials */}
            <div>
              <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm mb-3">
                Segurança & Garantia PJ
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 uppercase tracking-tight">
                Diferenciais da aquisição corporativa com a Ouzze
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
                Entendemos as exigências de compras corporativas. Garantimos que sua empresa receba equipamentos revisados em bancada, com sistema limpo homologado e suporte para que a implantação seja rápida e sem surpresas.
              </p>

              <div className="space-y-3.5">
                {SALES_PAGE_DATA.differentials.map((diff, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{diff}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quotation Form */}
            <div id="formulario-vendas" className="rounded-lg bg-black border border-white/10 p-6 sm:p-8">
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
                      Os dados da sua solicitação de compra foram formatados e abertos no canal de vendas corporativas da Ouzze.
                    </p>
                  </div>

                  <div className="p-3.5 rounded bg-zinc-900 border border-white/10 text-left text-xs font-mono text-zinc-300 space-y-1">
                    <p><span className="text-zinc-500">Empresa:</span> {companyName} {cnpj && `(${cnpj})`}</p>
                    <p><span className="text-zinc-500">Responsável:</span> {responsibleName} ({phone})</p>
                    <p><span className="text-zinc-500">Equipamento:</span> {equipmentType}</p>
                    <p><span className="text-zinc-500">Qtd:</span> {quantity} | <span className="text-zinc-500">Condição:</span> {paymentPreference}</p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      id="btn-sales-open-again"
                      onClick={handleOpenSalesWhatsAppAgain}
                      className="w-full py-3.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Abrir WhatsApp de Vendas</span>
                    </button>

                    <button
                      onClick={() => setHasSubmitted(false)}
                      className="w-full py-2.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider border border-white/10 cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
                    >
                      Editar dados da cotação
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSalesSubmit} className="space-y-3">
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight border-b border-white/10 pb-2">
                    Cotação Rápida de Hardware PJ
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">CNPJ (Opcional)</label>
                      <input
                        type="text"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        placeholder="00.000.000/0001-00"
                        className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors"
                      />
                    </div>
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
                      placeholder="compras@suaempresa.com.br"
                      className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Equipamento</label>
                      <select
                        value={equipmentType}
                        onChange={(e) => setEquipmentType(e.target.value)}
                        className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Desktops & Workstations">Desktops & Workstations</option>
                        <option value="Notebooks Corporativos">Notebooks Corporativos</option>
                        <option value="Servidores & Storage">Servidores & Storage</option>
                        <option value="Monitores & Ergonomia">Monitores & Ergonomia</option>
                        <option value="Switches & Redes">Switches & Redes</option>
                        <option value="Impressoras Laser">Impressoras Laser</option>
                        <option value="Lote Diversificado">Lote Diversificado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Quantidade</label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors cursor-pointer"
                      >
                        <option value="1 a 5 unidades">1 a 5 unidades</option>
                        <option value="6 a 15 unidades">6 a 15 unidades</option>
                        <option value="16 a 30 unidades">16 a 30 unidades</option>
                        <option value="Mais de 30 unidades (Lote)">Mais de 30 unidades (Lote)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Condição de Pagamento Pretendida</label>
                    <select
                      value={paymentPreference}
                      onChange={(e) => setPaymentPreference(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Boleto Faturado PJ (28/35 dias)">Boleto Faturado PJ (28/35 dias)</option>
                      <option value="À Vista com Desconto (PIX/TED)">À Vista com Desconto (PIX/TED)</option>
                      <option value="Cartão Corporativo / BNDES">Cartão Corporativo / BNDES</option>
                      <option value="Estudo de Leasing / Locação com Opção de Compra">Estudo de Leasing / Locação com Opção de Compra</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Observações ou Configuração Desejada</label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ex: Preferência por processadores Core i7, 16GB RAM, entrega em São Paulo..."
                      className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      id="btn-sales-submit"
                      type="submit"
                      className="w-full py-3 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider neon-glow-btn transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                    >
                      <span>Receber Cotação Formal no WhatsApp</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[10px] text-zinc-500 text-center font-normal pt-1">
                    Atendimento exclusivo B2B com nota fiscal e garantia para empresas.
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
