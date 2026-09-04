import React, { useState, useEffect, Suspense, lazy } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ThemeTokensProvider } from './components/common/ThemeTokensProvider';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { ProposalModal } from './components/common/ProposalModal';

import { Hero } from './components/home/Hero';
import { PillarsSection } from './components/home/PillarsSection';
import { AboutSection } from './components/home/AboutSection';
import { SegmentsSection } from './components/home/SegmentsSection';
import { RentalSection } from './components/home/RentalSection';
import { ServicesSection } from './components/home/ServicesSection';
import { BenefitsSection } from './components/home/BenefitsSection';
import { HowItWorksSection } from './components/home/HowItWorksSection';
import { CommercialCTA } from './components/home/CommercialCTA';
import { ContactFormSection } from './components/home/ContactFormSection';

import { EducationLandingPage } from './pages/EducationLandingPage';
import { SalesLandingPage } from './pages/SalesLandingPage';
import { ServicesLandingPage } from './pages/ServicesLandingPage';
import { RentalLandingPage } from './pages/RentalLandingPage';
import { PrivacyPolicyPage } from './pages/public/PrivacyPolicyPage';
import { LivePreviewIframe } from './components/admin/LivePreviewIframe';

// Code splitting / Lazy Loading of the entire Admin Panel
const AdminPage = lazy(() => import('./pages/admin/AdminPage').then(m => ({ default: m.AdminPage })));

function MainAppContent() {
  const { state, isPreviewMode, setIsPreviewMode } = useCMS();
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [proposalInitialType, setProposalInitialType] = useState<string>('geral');

  // Sync route from URL or hash
  useEffect(() => {
    const syncPath = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      
      if (path.startsWith('/admin') || hash.startsWith('#admin')) {
        setCurrentPath('/admin');
      } else if (path === '/educacao' || path === '/escolas' || hash === '#educacao') {
        setCurrentPath('/educacao');
      } else if (path === '/vendas' || hash === '#vendas' || hash === '#venda') {
        setCurrentPath('/vendas');
      } else if (path === '/servicos' || hash === '#servicos-page' || hash === '#servico') {
        setCurrentPath('/servicos');
      } else if (path === '/locacao' || hash === '#locacao-page' || hash === '#locacoes') {
        setCurrentPath('/locacao');
      } else if (path === '/privacidade' || hash === '#privacidade') {
        setCurrentPath('/privacidade');
      } else {
        setCurrentPath('/');
      }
    };

    syncPath();
    window.addEventListener('popstate', syncPath);
    window.addEventListener('hashchange', syncPath);
    return () => {
      window.removeEventListener('popstate', syncPath);
      window.removeEventListener('hashchange', syncPath);
    };
  }, []);

  // Dynamic SEO metadata updates
  useEffect(() => {
    if (currentPath.startsWith('/admin')) {
      document.title = 'Painel CMS Administrativo | Ouzze Tecnologia';
    } else if (currentPath === '/educacao') {
      document.title = state.settings.seo?.title || 'Ouzze Tecnologia | Soluções de TI para Educação e Instituições de Ensino';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', state.settings.seo?.description || 'Locação e implantação de laboratórios de informática, notebooks pedagógicos e infraestrutura de TI para colégios e faculdades.');
      }
    } else if (currentPath === '/vendas') {
      document.title = 'Venda de Hardware Corporativo, Workstations & Redes | Ouzze Tecnologia';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Venda de computadores, notebooks corporativos, servidores e redes para empresas com nota fiscal, faturamento PJ e garantia de até 36 meses.');
      }
    } else if (currentPath === '/servicos') {
      document.title = 'Serviços de TI, Suporte Técnico & Helpdesk Empresarial | Ouzze Tecnologia';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Terceirização de TI, suporte helpdesk remoto e presencial, manutenção preventiva e cabeamento de redes com SLA garantido.');
      }
    } else if (currentPath === '/locacao') {
      document.title = 'Locação de Computadores, Notebooks & TI Corporativa | Ouzze Tecnologia';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Locação corporativa de computadores, notebooks e infraestrutura com manutenção e troca expressa inclusas no contrato.');
      }
    } else if (currentPath === '/privacidade') {
      document.title = 'Política de Privacidade & LGPD | Ouzze Tecnologia';
    } else {
      document.title = state.settings.brandName 
        ? `${state.settings.brandName} | Locação, Venda e Serviços de TI`
        : 'Ouzze Tecnologia | Locação, Venda e Serviços de TI';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', state.settings.seo?.description || 'Soluções corporativas em locação de computadores, notebooks e impressoras, venda de hardware e serviços de TI para empresas.');
      }
    }
  }, [currentPath, state.settings]);

  const handleNavigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProposal = (type: string = 'geral') => {
    setProposalInitialType(type);
    setIsProposalModalOpen(true);
  };

  const handleCloseProposal = () => {
    setIsProposalModalOpen(false);
  };

  // If in Admin panel
  if (currentPath.startsWith('/admin')) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#07080B] flex items-center justify-center text-zinc-400">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-mono uppercase tracking-wider">Carregando Módulo Administrativo...</span>
            </div>
          </div>
        }
      >
        <AdminPage onBackToSite={() => handleNavigate('/')} />
      </Suspense>
    );
  }

  const renderPublicContent = () => (
    <div className="min-h-screen bg-[#0A0B0E] text-slate-100 flex flex-col selection:bg-red-600 selection:text-white font-sans">
      
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Header */}
      <Header
        activePath={currentPath}
        onNavigate={handleNavigate}
        onOpenProposal={handleOpenProposal}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPath === '/educacao' ? (
          <EducationLandingPage
            onBackToHome={() => handleNavigate('/')}
            onOpenProposal={handleOpenProposal}
          />
        ) : currentPath === '/vendas' ? (
          <SalesLandingPage
            onBackToHome={() => handleNavigate('/')}
            onOpenProposal={handleOpenProposal}
          />
        ) : currentPath === '/servicos' ? (
          <ServicesLandingPage
            onBackToHome={() => handleNavigate('/')}
            onOpenProposal={handleOpenProposal}
          />
        ) : currentPath === '/locacao' ? (
          <RentalLandingPage
            onBackToHome={() => handleNavigate('/')}
            onOpenProposal={handleOpenProposal}
          />
        ) : currentPath === '/privacidade' ? (
          <PrivacyPolicyPage onBack={() => handleNavigate('/')} />
        ) : (
          <>
            {/* 1. Hero Principal com Animação do Computador */}
            <Hero onOpenProposal={handleOpenProposal} />

            {/* 2. Seção 3 Pilares: Ouzze Locação, Vendas e Serviços */}
            <PillarsSection 
              onSelectPillar={(pillarId) => {
                if (pillarId === 'locacao') {
                  handleNavigate('/locacao');
                } else if (pillarId === 'vendas') {
                  handleNavigate('/vendas');
                } else if (pillarId === 'servicos') {
                  handleNavigate('/servicos');
                } else {
                  const el = document.getElementById(pillarId);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onOpenProposal={handleOpenProposal} 
            />

            {/* 3. Seção Sobre a Ouzze */}
            <AboutSection onOpenProposal={handleOpenProposal} />

            {/* 4. Soluções por Segmento (com link para Educação) */}
            <SegmentsSection 
              onNavigateToEducation={() => handleNavigate('/educacao')}
              onOpenProposal={handleOpenProposal}
            />

            {/* 5. Seção Locação (Equipamentos B2B) */}
            <RentalSection onOpenProposal={handleOpenProposal} />

            {/* 6. Seção Serviços & Suporte */}
            <ServicesSection onOpenProposal={handleOpenProposal} />

            {/* 7. Benefícios: Por que escolher a Ouzze? */}
            <BenefitsSection />

            {/* 8. Como Funciona (Linha do Tempo em 5 Passos) */}
            <HowItWorksSection />

            {/* 9. Chamada Comercial de Alto Impacto */}
            <CommercialCTA onOpenProposal={handleOpenProposal} />

            {/* 10. Formulário Profissional de Contato / Proposta */}
            <ContactFormSection initialSolution="Locação" />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onNavigateToEducation={() => handleNavigate('/educacao')}
        onOpenProposal={handleOpenProposal}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Quick Proposal Modal */}
      <ProposalModal
        isOpen={isProposalModalOpen}
        onClose={handleCloseProposal}
        initialType={proposalInitialType}
      />

    </div>
  );

  return (
    <>
      {renderPublicContent()}

      {/* Live Preview Modal Frame (if triggered from admin) */}
      {isPreviewMode && (
        <LivePreviewIframe onClose={() => setIsPreviewMode(false)}>
          {renderPublicContent()}
        </LivePreviewIframe>
      )}
    </>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <CMSProvider>
        <ThemeTokensProvider>
          <MainAppContent />
        </ThemeTokensProvider>
      </CMSProvider>
    </AdminAuthProvider>
  );
}

