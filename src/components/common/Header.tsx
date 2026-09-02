import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, PhoneCall, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { useCMS } from '../../context/CMSContext';

interface HeaderProps {
  onOpenProposal: (type?: string) => void;
  activePath?: string;
  onNavigate?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenProposal, 
  activePath = '/', 
  onNavigate 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    
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
    { id: '1', label: 'Início', href: '#hero', active: true, order: 1 },
    { id: '2', label: 'Locação', href: '#locacao', active: true, order: 2 },
    { id: '3', label: 'Vendas', href: '#locacao', active: true, order: 3 },
    { id: '4', label: 'Serviços', href: '#servicos', active: true, order: 4 },
    { id: '5', label: 'Soluções', href: '#segmentos', active: true, order: 5 },
    { id: '6', label: 'Sobre', href: '#sobre', active: true, order: 6 },
    { id: '7', label: 'Contato', href: '#contato', active: true, order: 7 }
  ];

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
          
          {/* LOGO (ORIGINAL COM FIDELIDADE RIGOROSA) */}
          <button 
            id="header-logo-btn"
            onClick={() => handleLinkClick('#hero')}
            className="flex items-center text-left group focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none rounded-sm transition-transform active:scale-98"
            aria-label="Ir para o início"
          >
            <Logo size="md" className="group-hover:opacity-95 transition-opacity" />
          </button>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium tracking-wide text-zinc-300" aria-label="Navegação Principal">
            {activeNavItems.map((item) => (
              <button
                key={item.id || item.label}
                id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleLinkClick(item.href)}
                className="hover:text-red-500 transition-colors py-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none rounded-sm"
              >
                {item.label}
              </button>
            ))}

            {/* Subpage Link: Educação */}
            <button
              id="nav-link-educacao"
              onClick={() => handleLinkClick('/educacao')}
              className={`py-1 flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none rounded-sm ${
                activePath === '/educacao'
                  ? 'text-red-500 font-bold'
                  : 'hover:text-red-500 text-zinc-300'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 neon-dot" />
              Educação
            </button>
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
        <div className="lg:hidden bg-black/95 border-b border-white/10 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {activeNavItems.map((item) => (
              <button
                key={item.id || item.label}
                id={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleLinkClick(item.href)}
                className="w-full text-left px-4 py-3 text-sm font-medium tracking-wide text-zinc-300 hover:text-red-500 hover:bg-zinc-900/50 rounded-sm transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-zinc-600" />
              </button>
            ))}

            {/* Mobile Educação Page */}
            <button
              id="mobile-nav-educacao"
              onClick={() => handleLinkClick('/educacao')}
              className="w-full text-left px-4 py-3 text-sm font-medium tracking-wide text-red-500 bg-red-950/20 border border-red-600/20 rounded-sm transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-500" />
                <span>Soluções para Educação</span>
              </div>
              <ChevronRight className="w-4 h-4 text-red-500" />
            </button>

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
