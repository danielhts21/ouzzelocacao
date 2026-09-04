import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown, 
  PhoneCall, 
  GraduationCap, 
  Building2, 
  Activity, 
  CalendarRange, 
  Landmark, 
  ArrowRight
} from 'lucide-react';
import { Logo } from './Logo';
import { useCMS } from '../../context/CMSContext';

interface HeaderProps {
  onOpenProposal: (type?: string) => void;
  activePath?: string;
  onNavigate?: (path: string) => void;
}

interface SegmentSubItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isDedicatedPage?: boolean;
}

const SEGMENTS_NAV_LIST: SegmentSubItem[] = [
  {
    id: 'educacao',
    title: 'Educação',
    subtitle: 'Escolas, faculdades e polos educacionais',
    badge: 'Página Dedicada',
    href: '/educacao',
    icon: GraduationCap,
    isDedicatedPage: true,
  },
  {
    id: 'empresas',
    title: 'Empresas & Escritórios',
    subtitle: 'Parque computacional e estações corporativas',
    href: '#segmentos',
    icon: Building2,
  },
  {
    id: 'saude',
    title: 'Saúde & Clínicas',
    subtitle: 'Prontuários ágeis, recepções e laudos',
    href: '#segmentos',
    icon: Activity,
  },
  {
    id: 'eventos',
    title: 'Eventos & Feiras',
    subtitle: 'Locação pontual e credenciamento ágil',
    href: '#segmentos',
    icon: CalendarRange,
  },
  {
    id: 'governo',
    title: 'Setor Público & Licitações',
    subtitle: 'Conformidade técnica e atendimento a editais',
    href: '#segmentos',
    icon: Landmark,
  },
];

export const Header: React.FC<HeaderProps> = ({ 
  onOpenProposal, 
  activePath = '/', 
  onNavigate 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSegmentsDropdownOpen, setIsSegmentsDropdownOpen] = useState(false);
  const [mobileSegmentsExpanded, setMobileSegmentsExpanded] = useState(true);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { state } = useCMS();
  const { navigation, settings } = state;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (isSegmentsDropdownOpen) setIsSegmentsDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, [mobileMenuOpen, isSegmentsDropdownOpen]);

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsSegmentsDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsSegmentsDropdownOpen(false);
    }, 180);
  };

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    setIsSegmentsDropdownOpen(false);
    
    if (href.startsWith('/')) {
      if (onNavigate) {
        onNavigate(href);
      } else {
        window.location.pathname = href;
      }
      return;
    }

    if (activePath !== '/' && onNavigate) {
      onNavigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeNavItems = navigation?.headerItems?.filter(i => i.active) || [
    { id: '1', label: 'Início', href: '/', active: true, order: 1 },
    { id: '2', label: 'Locação', href: '/locacao', active: true, order: 2 },
    { id: '3', label: 'Vendas', href: '/vendas', active: true, order: 3 },
    { id: '4', label: 'Serviços', href: '/servicos', active: true, order: 4 },
    { id: '5', label: 'Segmentos', href: '#segmentos', active: true, order: 5 },
    { id: '6', label: 'Sobre', href: '#sobre', active: true, order: 6 },
    { id: '7', label: 'Contato', href: '#contato', active: true, order: 7 }
  ];

  const isSegmentItem = (item: { href: string; label: string }) => {
    const normHref = (item.href || '').toLowerCase();
    const normLabel = (item.label || '').toLowerCase();
    return normHref === '#segmentos' || normHref === '#solucoes' || normLabel.includes('segment') || normLabel.includes('seguiment');
  };

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
          : 'bg-black/30 backdrop-blur-sm border-b border-white/5 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <button 
            id="header-logo-btn"
            onClick={() => handleLinkClick('#hero')}
            className="flex items-center text-left group focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none rounded-sm transition-transform active:scale-98 cursor-pointer"
            aria-label="Ir para o início"
          >
            <Logo size="md" className="group-hover:opacity-95 transition-opacity" />
          </button>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium tracking-wide text-zinc-300" aria-label="Navegação Principal">
            {activeNavItems.map((item) => {
              const isSegment = isSegmentItem(item);

              if (isSegment) {
                const isEducationActive = activePath === '/educacao';

                return (
                  <div 
                    key={item.id || item.label}
                    className="relative"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <button
                      id="nav-link-segmentos"
                      onClick={() => handleLinkClick('#segmentos')}
                      className={`py-1 flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none rounded-sm ${
                        isEducationActive 
                          ? 'text-red-500 font-bold' 
                          : 'hover:text-red-500 text-zinc-300'
                      }`}
                      aria-expanded={isSegmentsDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>Segmentos</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isSegmentsDropdownOpen ? 'rotate-180 text-red-500' : 'text-zinc-500'}`} />
                      {isEducationActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 neon-dot" />
                      )}
                    </button>

                    {/* SEGMENTOS DROPDOWN COM EDUCAÇÃO DENTRO */}
                    {isSegmentsDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-80 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="bg-[#0B0C10]/98 backdrop-blur-xl border border-white/10 rounded-lg p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_24px_rgba(220,38,38,0.18)] ring-1 ring-white/5">
                          
                          {/* Header do Menu */}
                          <div className="px-3 py-1.5 flex items-center justify-between border-b border-white/5 mb-1.5">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                              Segmentos de Atuação
                            </span>
                            <span className="text-[10px] text-zinc-500 font-mono">5 setores</span>
                          </div>

                          {/* Destaque: Educação dentro de Segmentos */}
                          <button
                            id="dropdown-segment-educacao"
                            onClick={() => handleLinkClick('/educacao')}
                            className="w-full text-left p-2.5 rounded-md bg-gradient-to-r from-red-950/40 via-red-900/20 to-black border border-red-600/40 hover:border-red-600 hover:from-red-950/70 transition-all cursor-pointer group flex items-start gap-3 mb-1.5 shadow-[0_0_15px_rgba(220,38,38,0.12)]"
                          >
                            <div className="w-8 h-8 rounded-sm bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500 shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors mt-0.5">
                              <GraduationCap className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                                  Educação
                                </span>
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-red-600 text-white font-bold uppercase tracking-wider">
                                  Página Dedicada
                                </span>
                              </div>
                              <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5 group-hover:text-zinc-300">
                                Laboratórios, notebooks e TI escolar
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-red-500 group-hover:translate-x-0.5 transition-transform shrink-0 self-center" />
                          </button>

                          {/* Demais Segmentos */}
                          <div className="space-y-0.5">
                            {SEGMENTS_NAV_LIST.slice(1).map((seg) => {
                              const IconComponent = seg.icon;
                              return (
                                <button
                                  key={seg.id}
                                  id={`dropdown-segment-${seg.id}`}
                                  onClick={() => handleLinkClick('#segmentos')}
                                  className="w-full text-left px-2.5 py-2 rounded-md hover:bg-white/5 transition-colors cursor-pointer group flex items-center gap-2.5"
                                >
                                  <div className="w-7 h-7 rounded-sm bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-red-400 group-hover:border-red-600/30 transition-colors shrink-0">
                                    <IconComponent className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors block">
                                      {seg.title}
                                    </span>
                                  </div>
                                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                                </button>
                              );
                            })}
                          </div>

                          {/* Rodapé: Ver todos os segmentos */}
                          <div className="pt-2 mt-1.5 border-t border-white/5">
                            <button
                              id="dropdown-segment-view-all"
                              onClick={() => handleLinkClick('#segmentos')}
                              className="w-full py-1.5 px-2.5 rounded text-[11px] font-semibold text-zinc-400 hover:text-red-400 flex items-center justify-between transition-colors cursor-pointer hover:bg-white/5"
                            >
                              <span>Ver todos os segmentos no site</span>
                              <ArrowRight className="w-3.5 h-3.5 text-red-500" />
                            </button>
                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = (item.href === '/' && activePath === '/') || 
                (item.href !== '/' && item.href !== '#hero' && activePath === item.href);

              return (
                <button
                  key={item.id || item.label}
                  id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleLinkClick(item.href)}
                  className={`py-1 cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none rounded-sm ${
                    isActive 
                      ? 'text-red-500 font-bold border-b-2 border-red-600' 
                      : 'hover:text-red-500 text-zinc-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* DESKTOP CTA BUTTONS */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="header-proposal-btn"
              onClick={() => onOpenProposal('geral')}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all cursor-pointer neon-glow-btn active:scale-95 flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              <span>{navigation?.ctaButtonText || 'Solicitar Proposta'}</span>
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-menu-proposal-quick-btn"
              onClick={() => onOpenProposal('geral')}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white rounded-sm focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              Proposta
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm bg-zinc-900 text-zinc-300 hover:text-white border border-white/10 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
              aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 border-b border-white/10 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1.5">
            {activeNavItems.map((item) => {
              const isSegment = isSegmentItem(item);

              if (isSegment) {
                return (
                  <div key={item.id || item.label} className="rounded-sm bg-zinc-900/60 border border-white/10 overflow-hidden">
                    <div className="flex items-center justify-between px-3.5 py-3">
                      <button
                        onClick={() => handleLinkClick('#segmentos')}
                        className={`text-sm font-semibold tracking-wide transition-colors ${
                          activePath === '/educacao' ? 'text-red-500 font-bold' : 'text-zinc-200 hover:text-red-500'
                        }`}
                      >
                        Segmentos
                      </button>
                      <button
                        type="button"
                        onClick={() => setMobileSegmentsExpanded(!mobileSegmentsExpanded)}
                        className="p-1 rounded text-zinc-400 hover:text-white cursor-pointer"
                        aria-label="Alternar submenu de segmentos"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSegmentsExpanded ? 'rotate-180 text-red-500' : 'text-zinc-500'}`} />
                      </button>
                    </div>

                    {mobileSegmentsExpanded && (
                      <div className="px-2.5 pb-2.5 pt-1 space-y-1.5 bg-black/40 border-t border-white/5">
                        {/* EDUCAÇÃO DENTRO DE SEGMENTOS */}
                        <button
                          id="mobile-segment-educacao"
                          onClick={() => handleLinkClick('/educacao')}
                          className="w-full text-left p-2.5 rounded-sm bg-red-950/40 border border-red-600/30 text-red-400 hover:bg-red-950/60 transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded bg-red-600/20 flex items-center justify-center text-red-500 shrink-0">
                              <GraduationCap className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                                <span>Educação</span>
                                <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.2 rounded font-mono uppercase">Dedicada</span>
                              </div>
                              <span className="text-[10px] text-zinc-400 block">Laboratórios e TI para escolas</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-red-500 shrink-0" />
                        </button>

                        {/* DEMAIS SEGMENTOS */}
                        {SEGMENTS_NAV_LIST.slice(1).map((seg) => {
                          const IconComp = seg.icon;
                          return (
                            <button
                              key={seg.id}
                              onClick={() => handleLinkClick('#segmentos')}
                              className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded-sm transition-colors flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2.5">
                                <IconComp className="w-3.5 h-3.5 text-zinc-500" />
                                <span>{seg.title}</span>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = (item.href === '/' && activePath === '/') || 
                (item.href !== '/' && item.href !== '#hero' && activePath === item.href);

              return (
                <button
                  key={item.id || item.label}
                  id={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleLinkClick(item.href)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium tracking-wide rounded-sm transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-red-500 font-bold bg-zinc-900/80 border-l-2 border-red-600'
                      : 'text-zinc-300 hover:text-red-500 hover:bg-zinc-900/50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-red-500' : 'text-zinc-600'}`} />
                </button>
              );
            })}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <button
                id="mobile-drawer-proposal-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProposal('geral');
                }}
                className="w-full py-3 px-4 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-center text-xs shadow-sm cursor-pointer"
              >
                {navigation?.ctaButtonText || 'Solicitar Proposta'}
              </button>
              
              {settings?.whatsapp?.phone && (
                <a
                  href={`https://wa.me/${settings.whatsapp.phone}?text=${encodeURIComponent(settings.whatsapp.defaultMessage || 'Olá')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold text-center flex items-center justify-center gap-2 border border-white/10"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: {settings.whatsapp.formattedPhone || settings.whatsapp.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
