import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { SectionRenderer } from './SectionRenderer';
import { PageSection } from '../../types/cms';

interface DynamicPageProps {
  pageSlug: string;
  onOpenProposal: (type?: string) => void;
  onNavigate: (path: string) => void;
}

export const DynamicPage: React.FC<DynamicPageProps> = ({
  pageSlug,
  onOpenProposal,
  onNavigate
}) => {
  const { state } = useCMS();

  // Find page definition in CMS state
  const page = state.pages.find(p => p.slug === pageSlug);

  // Filter sections by pageSlug and sort by order
  const pageSections = state.sections
    .filter(s => s.pageSlug === pageSlug)
    .sort((a, b) => a.order - b.order);

  // Update SEO Headings dynamically
  useEffect(() => {
    if (page) {
      const pageTitle = page.seoTitle || `${page.name} | ${state.settings.brandName || 'Ouzze Tecnologia'}`;
      document.title = pageTitle;

      if (page.seoDescription) {
        let metaDescTag = document.querySelector('meta[name="description"]');
        if (!metaDescTag) {
          metaDescTag = document.createElement('meta');
          metaDescTag.setAttribute('name', 'description');
          document.head.appendChild(metaDescTag);
        }
        metaDescTag.setAttribute('content', page.seoDescription);
      }
    }
  }, [page, state.settings.brandName]);

  // If we have sections configured in the CMS for this page, render them!
  if (pageSections.length > 0) {
    return (
      <main className="min-h-screen bg-black text-white">
        {pageSections.map((section) => (
          <SectionRenderer 
            key={section.id} 
            section={section} 
            onOpenProposal={onOpenProposal} 
            onNavigate={onNavigate} 
          />
        ))}
      </main>
    );
  }

  // Fallback if no sections exist yet in CMS for this page:
  // Render a clean, high-tech standard template layout
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Fallback Hero */}
      <section className="py-24 bg-gradient-to-b from-zinc-950 to-black text-white border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            {page ? page.name : 'Ouzze Tecnologia Corporativa'}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            {page ? page.name : 'Soluções Corporativas em Tecnologia'}
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {page?.seoDescription || 'Infraestrutura de ponta, fornecimento de equipamentos e serviços gerenciados com alta confiabilidade.'}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenProposal(page?.name || 'Geral')}
              className="px-8 py-3.5 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
            >
              Solicitar Atendimento Comercial
            </button>
            <button
              onClick={() => onNavigate('/')}
              className="px-8 py-3.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-wider border border-white/10 transition-colors cursor-pointer"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </section>

      {/* Fallback CTA */}
      <SectionRenderer 
        section={{
          id: 'fallback-cta',
          pageSlug,
          type: 'cta',
          title: 'Sua empresa precisa de tecnologia. Nós cuidamos do resto.',
          badge: 'Atendimento Consultivo',
          order: 99,
          active: true,
          visible: true,
          content: {
            buttonText: 'Pedir Proposta',
            badge: 'Atendimento Consultivo'
          }
        }}
        onOpenProposal={onOpenProposal}
        onNavigate={onNavigate}
      />
    </main>
  );
};
