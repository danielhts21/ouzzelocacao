import React, { useState } from 'react';
import { PageSection } from '../../types/cms';
import { Hero } from '../home/Hero';
import { PillarsSection } from '../home/PillarsSection';
import { AboutSection } from '../home/AboutSection';
import { SegmentsSection } from '../home/SegmentsSection';
import { RentalSection } from '../home/RentalSection';
import { ServicesSection } from '../home/ServicesSection';
import { BenefitsSection } from '../home/BenefitsSection';
import { HowItWorksSection } from '../home/HowItWorksSection';
import { CommercialCTA } from '../home/CommercialCTA';
import { ContactFormSection } from '../home/ContactFormSection';
import { useCMS } from '../../context/CMSContext';
import { 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ShieldCheck,
  Cpu,
  Laptop,
  Monitor,
  Server,
  FileText
} from 'lucide-react';

interface SectionRendererProps {
  section: PageSection;
  onOpenProposal: (type?: string) => void;
  onNavigate?: (path: string) => void;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  onOpenProposal,
  onNavigate = (_path: string) => {}
}) => {
  const { state } = useCMS();

  // If section is explicitly marked inactive or invisible, do not render
  if (section.active === false || section.visible === false) {
    return null;
  }

  // Device visibility class computation
  const visibilityClasses: string[] = [];
  if (section.styles?.visibility) {
    if (section.styles.visibility.desktop === false) visibilityClasses.push('lg:hidden');
    if (section.styles.visibility.tablet === false) visibilityClasses.push('md:max-lg:hidden');
    if (section.styles.visibility.mobile === false) visibilityClasses.push('max-md:hidden');
  }

  const wrapperClass = visibilityClasses.join(' ');

  // Render Section by Type
  const renderContent = () => {
    switch (section.type) {
      case 'hero':
        return <Hero section={section} onOpenProposal={onOpenProposal} />;

      case 'pillars':
        return (
          <PillarsSection 
            section={section} 
            onSelectPillar={(id) => {
              if (id === 'locacao') onNavigate('/locacao');
              else if (id === 'vendas') onNavigate('/vendas');
              else if (id === 'servicos') onNavigate('/servicos');
              else onNavigate(`/#${id}`);
            }} 
            onOpenProposal={onOpenProposal} 
          />
        );

      case 'about':
        return <AboutSection section={section} onOpenProposal={onOpenProposal} />;

      case 'segments':
        return (
          <SegmentsSection 
            onSelectSegment={(seg) => {
              if (seg.dedicatedPageUrl) {
                onNavigate(seg.dedicatedPageUrl);
              } else if (seg.slug === 'educacao') {
                onNavigate('/educacao');
              } else {
                onNavigate('/#contato');
              }
            }} 
            onOpenProposal={onOpenProposal} 
          />
        );

      case 'rental':
      case 'equipment_grid':
        return <RentalSection section={section} onOpenProposal={onOpenProposal} />;

      case 'services':
      case 'services_grid':
        return <ServicesSection section={section} onOpenProposal={onOpenProposal} />;

      case 'benefits':
        return <BenefitsSection section={section} />;

      case 'howItWorks':
        return <HowItWorksSection section={section} onOpenProposal={onOpenProposal} />;

      case 'cta':
        return <CommercialCTA section={section} onOpenProposal={onOpenProposal} />;

      case 'contact':
        return (
          <ContactFormSection 
            initialSolution={section.content?.defaultSolution || 'Locação'} 
          />
        );

      // Dedicated Sales / Hardware Catalog Section
      case 'sales':
        return (
          <section className="py-20 bg-[#0A0A0A] text-white border-b border-white/10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                  {section.badge || 'Venda Corporativa Direta'}
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                  {section.title || 'Aquisição Estratégica de Hardware'}
                </h2>
                <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                  {section.description || section.subtitle || 'Parcerias diretas com os maiores fabricantes mundiais para fornecimento de frotas com faturamento PJ, garantia estendida e suporte.'}
                </p>
              </div>

              {/* Hardware Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 rounded-lg bg-zinc-900 border border-white/10 hover:border-red-600/40 transition-colors">
                  <div className="w-10 h-10 rounded bg-red-600/20 text-red-500 flex items-center justify-center mb-4">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Notebooks Corporativos</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    Linhas ThinkPad, Latitude e ProBook homologadas para alta durabilidade e segurança de dados.
                  </p>
                  <button 
                    onClick={() => onOpenProposal('Compra de Notebooks')}
                    className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Cotar Lote Corporativo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-6 rounded-lg bg-zinc-900 border border-white/10 hover:border-red-600/40 transition-colors">
                  <div className="w-10 h-10 rounded bg-red-600/20 text-red-500 flex items-center justify-center mb-4">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Workstations & Desktops</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    Máquinas para engenharia, modelagem 3D, desenvolvimento de software e finanças de alto desempenho.
                  </p>
                  <button 
                    onClick={() => onOpenProposal('Compra de Desktops')}
                    className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Cotar Lote Corporativo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-6 rounded-lg bg-zinc-900 border border-white/10 hover:border-red-600/40 transition-colors">
                  <div className="w-10 h-10 rounded bg-red-600/20 text-red-500 flex items-center justify-center mb-4">
                    <Server className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Servidores & Redes</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    Switches gerenciáveis, roteadores empresariais, firewalls e servidores de rack e torre.
                  </p>
                  <button 
                    onClick={() => onOpenProposal('Compra de Servidores')}
                    className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Cotar Lote Corporativo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bottom CTA Box */}
              <div className="p-6 sm:p-8 rounded-lg bg-zinc-900/80 border border-red-600/30 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white">Precisa de faturamento direto para PJ com carência?</h4>
                  <p className="text-xs text-zinc-400 mt-1">Trabalhamos com condições especiais para compras volumosas e contratos corporativos.</p>
                </div>
                <button
                  onClick={() => onOpenProposal('Compra Geral')}
                  className="px-6 py-3 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors shadow-lg"
                >
                  Falar com Consultor de Vendas
                </button>
              </div>
            </div>
          </section>
        );

      // Custom Cards Grid Block
      case 'custom_cards':
      case 'features':
        const cards: any[] = section.content?.cards || [
          { title: 'Alta Performance', desc: 'Hardware de última geração homologado para o ritmo intenso da sua operação.', badge: 'Garantia' },
          { title: 'Substituição Expressa', desc: 'Troca imediata de equipamentos com SLA rigoroso de atendimento.', badge: 'SLA' },
          { title: 'Atendimento Consultivo', desc: 'Especialistas dedicados para dimensionar a solução exata para sua empresa.', badge: 'Consultoria' }
        ];

        return (
          <section className="py-20 bg-[#0E1015] text-white border-b border-white/10 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
                {section.badge && (
                  <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                    {section.badge}
                  </div>
                )}
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  {section.title}
                </h2>
                {section.subtitle && (
                  <p className="text-red-500 font-semibold text-sm">{section.subtitle}</p>
                )}
                {section.description && (
                  <p className="text-zinc-400 text-base max-w-2xl mx-auto leading-relaxed">
                    {section.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, idx) => (
                  <div 
                    key={idx}
                    className="p-6 rounded-lg bg-zinc-900 border border-white/10 hover:border-red-600/40 transition-colors space-y-3"
                  >
                    {card.badge && (
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-sm bg-red-950/60 border border-red-800/60 text-red-400">
                        {card.badge}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-white tracking-tight">{card.title}</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{card.desc || card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      // Custom Text / Editorial Section
      case 'custom_text':
        return (
          <section className="py-20 bg-black text-white border-b border-white/10 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-6">
                {section.badge && (
                  <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                    {section.badge}
                  </div>
                )}
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  {section.title}
                </h2>
                {section.subtitle && (
                  <p className="text-lg text-red-500 font-medium">{section.subtitle}</p>
                )}
                <div className="text-zinc-300 text-base sm:text-lg leading-relaxed space-y-4 whitespace-pre-line">
                  {section.description || section.content?.bodyText || 'Conteúdo editorial configurável no CMS.'}
                </div>
              </div>
            </div>
          </section>
        );

      // FAQ Section
      case 'faq':
        return <FAQComponent section={section} />;

      // Downloads Section
      case 'downloads':
        return <DownloadsComponent section={section} />;

      // Highlight Banner
      case 'banner':
        return (
          <section className="py-8 bg-gradient-to-r from-red-950/80 via-zinc-900 to-black border-y border-red-600/40 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white">{section.title}</h4>
                  {section.subtitle && <p className="text-xs text-zinc-300 mt-0.5">{section.subtitle}</p>}
                </div>
              </div>
              <button
                onClick={() => onOpenProposal('Atendimento Express')}
                className="px-5 py-2 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors shadow-lg"
              >
                {section.content?.buttonText || 'Aproveitar Agora'}
              </button>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className={wrapperClass}>
      {renderContent()}
    </div>
  );
};

// FAQ Sub-Component
const FAQComponent: React.FC<{ section: PageSection }> = ({ section }) => {
  const { state } = useCMS();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = (state.faqs && state.faqs.length > 0)
    ? state.faqs.filter(f => f.active !== false)
    : [
        { id: '1', question: 'Qual o prazo mínimo para contratos de locação?', answer: 'Trabalhamos com planos a partir de 12 meses para frotas corporativas, além de opções flexíveis para projetos específicos e eventos.', active: true },
        { id: '2', question: 'Como funciona a manutenção e troca de equipamentos?', answer: 'Nosso contrato inclui suporte técnico total. Em caso de defeito que não possa ser solucionado remotamente, realizamos a substituição expressa do equipamento conforme SLA acordado.', active: true },
        { id: '3', question: 'A Ouzze atende empresas de quais regiões?', answer: 'Atendemos clientes em âmbito nacional, com forte presença nos principais polos industriais e corporativos do Brasil.', active: true },
        { id: '4', question: 'Quais as vantagens fiscais da locação (OPEX)?', answer: 'A locação é contabilizada como despesa operacional (OPEX), permitindo dedução integral na base de cálculo de IRPJ e CSLL para empresas no Lucro Real, além de preservar o fluxo de caixa.', active: true }
      ];

  return (
    <section className="py-20 bg-zinc-900/30 text-white border-b border-white/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            {section.badge || 'Dúvidas Frequentes'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {section.title || 'Perguntas Frequentes'}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            {section.description || 'Tire suas dúvidas sobre nosso modelo de atendimento, contratos e suporte técnico.'}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={faq.id || idx}
                className="rounded-lg bg-zinc-900 border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-800/50 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-white">{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-red-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Downloads Sub-Component
const DownloadsComponent: React.FC<{ section: PageSection }> = ({ section }) => {
  const { state } = useCMS();
  const downloads = state.downloads || [];

  return (
    <section className="py-20 bg-black text-white border-b border-white/10 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            {section.badge || 'Materiais Exclusivos'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {section.title || 'Catálogos & Apresentações Técnicas'}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            {section.description || 'Faça download das nossas apresentações institucionais e catálogos em PDF.'}
          </p>
        </div>

        {downloads.length === 0 ? (
          <div className="p-8 text-center bg-zinc-900/50 rounded-lg border border-zinc-800 text-zinc-400 text-xs">
            Nenhum material disponível para download no momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {downloads.map((item) => (
              <a
                key={item.id}
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-zinc-900 border border-white/10 hover:border-red-600/50 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">{item.title}</h4>
                    <p className="text-[11px] text-zinc-400">{item.description}</p>
                    {item.fileSize && <span className="text-[10px] font-mono text-zinc-500">{item.fileSize}</span>}
                  </div>
                </div>
                <Download className="w-4 h-4 text-zinc-400 group-hover:text-red-500 transition-colors shrink-0 ml-3" />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
