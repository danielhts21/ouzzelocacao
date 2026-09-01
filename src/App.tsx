import React, { useState, useEffect } from 'react';
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
import { StatsSection } from './components/home/StatsSection';
import { HowItWorksSection } from './components/home/HowItWorksSection';
import { CommercialCTA } from './components/home/CommercialCTA';
import { ContactFormSection } from './components/home/ContactFormSection';

import { EducationLandingPage } from './pages/EducationLandingPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [proposalInitialType, setProposalInitialType] = useState<string>('geral');

  // Handle browser back/forward and initial path
  useEffect(() => {
    const syncPath = () => {
      const path = window.location.pathname;
      if (path === '/educacao' || path === '/escolas') {
        setCurrentPath('/educacao');
      } else {
        setCurrentPath('/');
      }
    };

    syncPath();
    window.addEventListener('popstate', syncPath);
    return () => window.removeEventListener('popstate', syncPath);
  }, []);

  const handleNavigate = (path: string) => {
    if (path === '/educacao' || path === '/escolas') {
      window.history.pushState({}, '', '/educacao');
      setCurrentPath('/educacao');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenProposal = (type: string = 'geral') => {
    setProposalInitialType(type);
    setIsProposalModalOpen(true);
  };

  const handleCloseProposal = () => {
    setIsProposalModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-slate-100 flex flex-col selection:bg-red-600 selection:text-white font-sans">
      
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
        ) : (
          <>
            {/* 1. Hero Principal com Animação do Computador */}
            <Hero onOpenProposal={handleOpenProposal} />

            {/* 2. Seção 3 Pilares: Ouzze Locação, Vendas e Serviços */}
            <PillarsSection 
              onSelectPillar={(pillarId) => {
                const el = document.getElementById(pillarId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
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

            {/* 8. Números & Estatísticas Animadas */}
            <StatsSection />

            {/* 9. Como Funciona (Linha do Tempo em 5 Passos) */}
            <HowItWorksSection />

            {/* 10. Chamada Comercial de Alto Impacto */}
            <CommercialCTA onOpenProposal={handleOpenProposal} />

            {/* 11. Formulário Profissional de Contato / Proposta */}
            <ContactFormSection initialSolution="Locação" />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer 
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
}
