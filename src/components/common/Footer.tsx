import React from 'react';
import { 
  ArrowUp, 
  Linkedin, 
  Instagram, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface FooterProps {
  onNavigateToEducation?: () => void;
  onOpenProposal?: (type?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigateToEducation,
  onOpenProposal 
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-zinc-400 border-t border-white/10 relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-sm bg-red-600 flex items-center justify-center text-white font-mono font-bold text-base shadow-sm">
                O
              </div>
              <div className="flex items-baseline">
                <span className="text-xl font-bold tracking-tight text-red-600">
                  OUZZE
                </span>
                <span className="ml-1.5 text-xs font-bold tracking-widest uppercase text-white">
                  TECNOLOGIA
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Soluções completas em locação de computadores e notebooks, vendas consultivas de hardware corporativo e suporte de TI de alta disponibilidade para empresas e instituições de ensino.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                id="footer-social-linkedin"
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn da Ouzze Tecnologia"
                className="w-9 h-9 rounded-sm bg-zinc-900 border border-white/10 hover:border-red-600/50 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                id="footer-social-instagram"
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Ouzze Tecnologia"
                className="w-9 h-9 rounded-sm bg-zinc-900 border border-white/10 hover:border-red-600/50 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                id="footer-social-whatsapp"
                href={siteConfig.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Corporativo"
                className="w-9 h-9 rounded-sm bg-zinc-900 border border-white/10 hover:border-red-600/50 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Col 2: Soluções (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Soluções Corporativas
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('locacao')}
                  className="hover:text-red-500 transition-colors text-left cursor-pointer"
                >
                  Ouzze Locação de Equipamentos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('vendas')}
                  className="hover:text-red-500 transition-colors text-left cursor-pointer"
                >
                  Ouzze Venda de Hardware
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('servicos')}
                  className="hover:text-red-500 transition-colors text-left cursor-pointer"
                >
                  Ouzze Serviços & Field Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('locacao')}
                  className="hover:text-red-500 transition-colors text-left cursor-pointer"
                >
                  Outsourcing de Impressoras
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('servicos')}
                  className="hover:text-red-500 transition-colors text-left cursor-pointer"
                >
                  Infraestrutura de Redes & Wi-Fi
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Segmentos (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Segmentos Atendidos
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={onNavigateToEducation}
                  className="text-red-500 hover:text-red-400 font-bold flex items-center gap-1 text-left cursor-pointer"
                >
                  <span>Educação & Escolas</span>
                  <span className="text-[9px] bg-red-600/10 border border-red-600/30 text-red-500 px-1.5 py-0.2 rounded-sm uppercase tracking-wider">Destaque</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('solucoes')}
                  className="hover:text-red-500 transition-colors text-left cursor-pointer"
                >
                  Empresas & Escritórios
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('solucoes')}
                  className="hover:text-red-500 transition-colors text-left cursor-pointer"
                >
                  Saúde, Clínicas & Hospitais
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('solucoes')}
                  className="hover:text-red-500 transition-colors text-left cursor-pointer"
                >
                  Eventos & Feiras Temporárias
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('solucoes')}
                  className="hover:text-red-500 transition-colors text-left cursor-pointer"
                >
                  Setor Público & Licitações
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Empresa & Contato (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Institucional
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('sobre')}
                  className="hover:text-red-500 transition-colors text-left cursor-pointer"
                >
                  Sobre a Ouzze
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('como-funciona')}
                  className="hover:text-red-500 transition-colors text-left cursor-pointer"
                >
                  Como Funciona
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contato')}
                  className="hover:text-red-500 transition-colors text-left cursor-pointer"
                >
                  Fale Conosco
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenProposal && onOpenProposal('geral')}
                  className="hover:text-red-500 transition-colors text-left font-bold text-zinc-200 cursor-pointer"
                >
                  Solicitar Proposta
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} {siteConfig.legal.companyLegalName}. Todos os direitos reservados.</span>
            <span className="hidden sm:inline">•</span>
            <span>CNPJ: {siteConfig.legal.cnpj}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Conforme LGPD</span>
            </span>

            <button
              id="footer-scroll-top-btn"
              onClick={scrollToTop}
              className="p-2 px-3 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer text-xs uppercase font-mono"
              aria-label="Voltar ao topo"
            >
              <span>Topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
