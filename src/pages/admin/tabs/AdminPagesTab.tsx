import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import {
  FileText,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Edit3,
  Plus,
  Trash2,
  Check,
  X,
  Layers,
  Sparkles,
  Globe,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  ChevronDown
} from 'lucide-react';
import { Page, PageSection, SectionType } from '../../../types/cms';

export const AdminPagesTab: React.FC = () => {
  const {
    state,
    updatePage,
    addPage,
    deletePage,
    updateSection,
    addSection,
    deleteSection,
    reorderSections
  } = useCMS();

  const [selectedPageSlug, setSelectedPageSlug] = useState<string>(state.pages?.[0]?.slug || '/');
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [isCreatingPage, setIsCreatingPage] = useState(false);

  // New Page State
  const [newPageName, setNewPageName] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newPageSeoTitle, setNewPageSeoTitle] = useState('');
  const [newPageSeoDescription, setNewPageSeoDescription] = useState('');
  const [newPageTemplate, setNewPageTemplate] = useState<'landing' | 'catalog' | 'services' | 'simple' | 'blank'>('landing');

  // New Section State
  const [newSectionType, setNewSectionType] = useState<SectionType>('hero');
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionSubtitle, setNewSectionSubtitle] = useState('');
  const [newSectionBadge, setNewSectionBadge] = useState('');

  const currentPage = state.pages?.find(p => p.slug === selectedPageSlug) || state.pages?.[0];
  const activeSlug = currentPage?.slug || selectedPageSlug;

  const pageSections = state.sections
    ?.filter(s => s.pageSlug === activeSlug)
    .sort((a, b) => a.order - b.order) || [];

  // Slug generator helper
  const handleNameChange = (val: string) => {
    setNewPageName(val);
    const generated = '/' + val
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setNewPageSlug(generated);
    setNewPageSeoTitle(`${val} | ${state.settings.brandName || 'Ouzze Tecnologia'}`);
  };

  const handleCreatePage = () => {
    if (!newPageName.trim() || !newPageSlug.trim()) return;

    const formattedSlug = newPageSlug.startsWith('/') ? newPageSlug : `/${newPageSlug}`;

    // Check duplicate
    if (state.pages.some(p => p.slug === formattedSlug)) {
      alert('Já existe uma página com esta URL.');
      return;
    }

    const newPage: Page = {
      id: `page-${Date.now()}`,
      name: newPageName.trim(),
      slug: formattedSlug,
      seoTitle: newPageSeoTitle.trim() || `${newPageName} | ${state.settings.brandName || 'Ouzze Tecnologia'}`,
      seoDescription: newPageSeoDescription.trim() || `Soluções especializadas em tecnologia da Ouzze para ${newPageName}.`,
      status: 'PUBLISHED',
      isSystem: false,
      sectionsOrder: [],
      updatedAt: new Date().toISOString(),
      updatedBy: 'admin@ouzze.com.br'
    };

    addPage(newPage);

    // Populate initial starter sections based on template
    const initialSections: PageSection[] = [];
    const timestamp = Date.now();

    if (newPageTemplate === 'landing') {
      initialSections.push(
        {
          id: `sec-${timestamp}-1`,
          pageSlug: formattedSlug,
          type: 'hero',
          title: `Soluções Especializadas de TI para ${newPageName}`,
          subtitle: `Locação ágil, venda de hardware e suporte técnico sob medida para ${newPageName}.`,
          description: `Infraestrutura corporativa completa com atendimento consultivo e substituição expressa.`,
          badge: newPageName.toUpperCase(),
          active: true,
          visible: true,
          order: 1,
          content: {
            ctaPrimaryText: 'Solicitar Proposta Comercial',
            ctaSecondaryText: 'Falar no WhatsApp'
          },
          styles: { background: 'dark', alignment: 'center', visibility: { desktop: true, tablet: true, mobile: true } }
        },
        {
          id: `sec-${timestamp}-2`,
          pageSlug: formattedSlug,
          type: 'custom_cards',
          title: `Por que a Ouzze é ideal para ${newPageName}?`,
          subtitle: 'Diferenciais Estratégicos',
          description: 'Soluções desenvolvidas para atender as demandas específicas da sua operação.',
          badge: 'BENEFÍCIOS',
          active: true,
          visible: true,
          order: 2,
          content: {
            cards: [
              { title: 'Equipamentos Homologados', desc: 'Notebooks, desktops e servidores preparados para alto rendimento operacional.', badge: 'Hardware' },
              { title: 'SLA de Substituição Ágil', desc: 'Troca expressa de máquinas em caso de falhas, sem travar sua equipe.', badge: 'Suporte' },
              { title: 'Previsibilidade Financeira', desc: 'Custos 100% dedutíveis como despesa operacional (OPEX) com faturamento PJ.', badge: 'Gestão' }
            ]
          },
          styles: { background: 'surface', alignment: 'left', visibility: { desktop: true, tablet: true, mobile: true } }
        },
        {
          id: `sec-${timestamp}-3`,
          pageSlug: formattedSlug,
          type: 'rental',
          title: 'Equipamentos Recomendados',
          subtitle: 'Catálogo Corporativo',
          description: 'Selecione os equipamentos necessários para a sua operação.',
          active: true,
          visible: true,
          order: 3,
          content: {},
          styles: { background: 'dark', alignment: 'left', visibility: { desktop: true, tablet: true, mobile: true } }
        },
        {
          id: `sec-${timestamp}-4`,
          pageSlug: formattedSlug,
          type: 'cta',
          title: `Pronto para modernizar a TI da sua operação de ${newPageName}?`,
          subtitle: 'Fale Conosco',
          description: 'Receba uma proposta técnica e comercial detalhada em menos de 2 horas úteis.',
          badge: 'ATENDIMENTO B2B',
          active: true,
          visible: true,
          order: 4,
          content: { buttonText: 'Falar com Consultor Especialista' },
          styles: { background: 'gradient', alignment: 'center', visibility: { desktop: true, tablet: true, mobile: true } }
        },
        {
          id: `sec-${timestamp}-5`,
          pageSlug: formattedSlug,
          type: 'contact',
          title: 'Solicite seu Orçamento Personalizado',
          subtitle: 'Atendimento Rápido',
          description: 'Preencha o formulário e nossa equipe entrará em contato imediatamente.',
          active: true,
          visible: true,
          order: 5,
          content: { defaultSolution: 'Locação' },
          styles: { background: 'black', alignment: 'left', visibility: { desktop: true, tablet: true, mobile: true } }
        }
      );
    } else if (newPageTemplate === 'catalog') {
      initialSections.push(
        {
          id: `sec-${timestamp}-1`,
          pageSlug: formattedSlug,
          type: 'hero',
          title: `Catálogo de Equipamentos para ${newPageName}`,
          subtitle: 'Computadores, notebooks corporativos e infraestrutura para locação e venda.',
          badge: 'CATÁLOGO',
          active: true,
          visible: true,
          order: 1,
          content: {},
          styles: { background: 'dark', alignment: 'center', visibility: { desktop: true, tablet: true, mobile: true } }
        },
        {
          id: `sec-${timestamp}-2`,
          pageSlug: formattedSlug,
          type: 'rental',
          title: 'Equipamentos Disponíveis',
          subtitle: 'Hardware Corporativo Homologado',
          active: true,
          visible: true,
          order: 2,
          content: {},
          styles: { background: 'surface', alignment: 'left', visibility: { desktop: true, tablet: true, mobile: true } }
        },
        {
          id: `sec-${timestamp}-3`,
          pageSlug: formattedSlug,
          type: 'contact',
          title: 'Cotação de Equipamentos',
          subtitle: 'Fale com Especialista',
          active: true,
          visible: true,
          order: 3,
          content: {},
          styles: { background: 'dark', alignment: 'left', visibility: { desktop: true, tablet: true, mobile: true } }
        }
      );
    } else {
      initialSections.push(
        {
          id: `sec-${timestamp}-1`,
          pageSlug: formattedSlug,
          type: 'hero',
          title: newPageName,
          subtitle: `Página institucional e informativa sobre ${newPageName}.`,
          active: true,
          visible: true,
          order: 1,
          content: {},
          styles: { background: 'dark', alignment: 'center', visibility: { desktop: true, tablet: true, mobile: true } }
        },
        {
          id: `sec-${timestamp}-2`,
          pageSlug: formattedSlug,
          type: 'custom_text',
          title: `Sobre ${newPageName}`,
          subtitle: 'Apresentação',
          description: 'Insira aqui o conteúdo descritivo detalhado desta página utilizando o editor de seções.',
          active: true,
          visible: true,
          order: 2,
          content: {},
          styles: { background: 'surface', alignment: 'left', visibility: { desktop: true, tablet: true, mobile: true } }
        },
        {
          id: `sec-${timestamp}-3`,
          pageSlug: formattedSlug,
          type: 'contact',
          title: 'Entre em Contato',
          active: true,
          visible: true,
          order: 3,
          content: {},
          styles: { background: 'black', alignment: 'left', visibility: { desktop: true, tablet: true, mobile: true } }
        }
      );
    }

    initialSections.forEach(sec => addSection(sec));

    setSelectedPageSlug(formattedSlug);
    setIsCreatingPage(false);
    setNewPageName('');
    setNewPageSlug('');
    setNewPageSeoTitle('');
    setNewPageSeoDescription('');
  };

  const handleDeletePage = (slug: string, name: string) => {
    if (confirm(`Tem certeza que deseja excluir a página "${name}" (${slug})? Todas as suas seções associadas serão removidas.`)) {
      pageSections.forEach(s => deleteSection(s.id));
      deletePage(slug);
      setSelectedPageSlug(state.pages[0]?.slug || '/');
    }
  };

  // Reorder handlers
  const handleMoveSection = (sectionId: string, direction: 'up' | 'down') => {
    const currentOrder = pageSections.map(s => s.id);
    const index = currentOrder.indexOf(sectionId);
    if (index === -1) return;

    if (direction === 'up' && index > 0) {
      const temp = currentOrder[index - 1];
      currentOrder[index - 1] = currentOrder[index];
      currentOrder[index] = temp;
      reorderSections(activeSlug, currentOrder);
    } else if (direction === 'down' && index < currentOrder.length - 1) {
      const temp = currentOrder[index + 1];
      currentOrder[index + 1] = currentOrder[index];
      currentOrder[index] = temp;
      reorderSections(activeSlug, currentOrder);
    }
  };

  const handleCreateSection = () => {
    if (!newSectionTitle.trim()) return;

    const newSec: PageSection = {
      id: `sec-${Date.now()}`,
      pageSlug: activeSlug,
      type: newSectionType,
      title: newSectionTitle.trim(),
      subtitle: newSectionSubtitle.trim() || undefined,
      badge: newSectionBadge.trim() || undefined,
      active: true,
      visible: true,
      order: pageSections.length + 1,
      content: {},
      styles: {
        background: 'dark',
        alignment: 'left',
        visibility: { desktop: true, tablet: true, mobile: true }
      }
    };

    addSection(newSec);
    setIsAddingSection(false);
    setNewSectionTitle('');
    setNewSectionSubtitle('');
    setNewSectionBadge('');
  };

  const sectionTypeLabels: Record<SectionType, string> = {
    hero: 'Hero Principal / Banner de Abertura',
    features: 'Destaques / Recursos Principais',
    pillars: '3 Pilares (Locação, Vendas e Serviços)',
    about: 'Sobre a Empresa / Institucional',
    segments: 'Segmentos de Mercado Atendidos',
    rental: 'Catálogo de Locação Corporativa',
    sales: 'Venda de Hardware Corporativo',
    services: 'Serviços de TI & Suporte Técnico',
    benefits: 'Vantagens Competitivas & Benefícios',
    howItWorks: 'Como Funciona Nosso Atendimento (5 Passos)',
    cta: 'Chamada Comercial de Alto Impacto (CTA)',
    contact: 'Formulário de Contato & Proposta',
    equipment_grid: 'Grid Filtrável de Equipamentos',
    services_grid: 'Grid de Serviços Especializados & SLA',
    custom_text: 'Texto Editorial Livre / Artigo',
    custom_cards: 'Grade de Cards Personalizados',
    custom_bento: 'Painel Visual Tipo Bento Box',
    faq: 'Perguntas Frequentes (FAQ)',
    downloads: 'Materiais & Catálogos em PDF',
    gallery: 'Galeria de Imagens / Fotos',
    banner: 'Faixa de Destaque / Aviso'
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Page Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-500" />
            <span>Páginas & Construtor de Conteúdo</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Crie novas páginas sem código, reordene blocos e configure títulos, SEO e visibilidade.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsCreatingPage(true)}
            className="px-3.5 py-2 rounded-sm bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-lg cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Página</span>
          </button>
        </div>
      </div>

      {/* Pages Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {state.pages?.map(p => {
          const isSelected = activeSlug === p.slug;
          return (
            <button
              key={p.id || p.slug}
              onClick={() => {
                setSelectedPageSlug(p.slug);
                setEditingSectionId(null);
              }}
              className={`px-3.5 py-2 rounded text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
                isSelected
                  ? 'bg-red-600 border-red-500 text-white shadow-md'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <span>{p.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                isSelected ? 'bg-red-700 text-white' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {p.slug}
              </span>
            </button>
          );
        })}
      </div>

      {/* NEW PAGE MODAL / ACCORDION */}
      {isCreatingPage && (
        <div className="p-6 rounded-lg bg-[#0E1015] border border-red-500/60 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Criar Nova Página no Portal (Sem Código)
              </h3>
            </div>
            <button
              onClick={() => setIsCreatingPage(false)}
              className="p-1 rounded text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                Nome da Página *
              </label>
              <input
                type="text"
                value={newPageName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ex: Indústrias, Hospitais, Eventos, Varejo"
                className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                URL da Página (Slug) *
              </label>
              <input
                type="text"
                value={newPageSlug}
                onChange={(e) => setNewPageSlug(e.target.value)}
                placeholder="Ex: /industrias"
                className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white font-mono focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                Modelo Inicial de Seções
              </label>
              <select
                value={newPageTemplate}
                onChange={(e) => setNewPageTemplate(e.target.value as any)}
                className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none"
              >
                <option value="landing">Landing Page Completa (Hero + Cards + Catálogo + CTA + Contato)</option>
                <option value="catalog">Catálogo de Produtos (Hero + Equipamentos + Contato)</option>
                <option value="services">Serviços & Suporte (Hero + Serviços + Como Funciona + Contato)</option>
                <option value="simple">Institucional Simples (Hero + Texto + Contato)</option>
                <option value="blank">Em Branco (Apenas Hero básico)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                Título SEO (Meta Title)
              </label>
              <input
                type="text"
                value={newPageSeoTitle}
                onChange={(e) => setNewPageSeoTitle(e.target.value)}
                placeholder="Ex: Locação de TI para Indústrias | Ouzze Tecnologia"
                className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                Descrição para Buscadores (Meta Description)
              </label>
              <textarea
                rows={2}
                value={newPageSeoDescription}
                onChange={(e) => setNewPageSeoDescription(e.target.value)}
                placeholder="Breve resumo da página para o Google e redes sociais..."
                className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setIsCreatingPage(false)}
              className="px-4 py-2 rounded text-xs text-zinc-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreatePage}
              disabled={!newPageName.trim() || !newPageSlug.trim()}
              className="px-5 py-2 rounded bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Check className="w-4 h-4" />
              <span>Criar Página</span>
            </button>
          </div>
        </div>
      )}

      {currentPage && (
        <div className="space-y-6">
          
          {/* Current Page Meta & SEO Settings */}
          <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-red-500" />
                <span>Configurações & SEO da Página ({currentPage.name})</span>
              </h3>

              {!currentPage.isSystem && (
                <button
                  onClick={() => handleDeletePage(currentPage.slug, currentPage.name)}
                  className="px-2.5 py-1 rounded bg-red-950/40 border border-red-800/60 text-red-400 hover:text-red-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Excluir Página</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  Nome no CMS
                </label>
                <input
                  type="text"
                  value={currentPage.name}
                  onChange={(e) => updatePage(currentPage.slug, { name: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  URL da Rota (Slug)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    disabled={currentPage.isSystem}
                    value={currentPage.slug}
                    onChange={(e) => updatePage(currentPage.slug, { slug: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 font-mono disabled:opacity-60"
                  />
                  <a
                    href={currentPage.slug}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded bg-zinc-800 text-zinc-400 hover:text-white shrink-0"
                    title="Visualizar URL no navegador"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  Status de Publicação
                </label>
                <select
                  value={currentPage.status}
                  onChange={(e) => updatePage(currentPage.slug, { status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none"
                >
                  <option value="PUBLISHED">Publicado (Visível no site)</option>
                  <option value="DRAFT">Rascunho (Apenas no CMS)</option>
                  <option value="ARCHIVED">Arquivado</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  Título SEO da Aba (Meta Title)
                </label>
                <input
                  type="text"
                  value={currentPage.seoTitle || ''}
                  onChange={(e) => updatePage(currentPage.slug, { seoTitle: e.target.value })}
                  placeholder="Ex: Ouzze Tecnologia | Vendas e Locação de Hardware"
                  className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  Descrição para o Google (Meta Description)
                </label>
                <textarea
                  rows={2}
                  value={currentPage.seoDescription || ''}
                  onChange={(e) => updatePage(currentPage.slug, { seoDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Sections List & Ordering */}
          <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-red-500" />
                  <span>Seções da Página ({pageSections.length} blocos)</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Arraste ou use as setas para alterar a ordem em que os blocos aparecem para o visitante.
                </p>
              </div>

              <button
                onClick={() => setIsAddingSection(!isAddingSection)}
                className="px-3.5 py-1.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 text-red-400" />
                <span>Adicionar Seção</span>
              </button>
            </div>

            {/* Add Section Form */}
            {isAddingSection && (
              <div className="p-4 rounded-md bg-zinc-900 border border-zinc-700 space-y-4 animate-in fade-in duration-200">
                <div className="text-xs font-bold text-white uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-red-500" />
                  <span>Novo Bloco de Conteúdo para {currentPage.name}</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Tipo de Bloco *</label>
                    <select
                      value={newSectionType}
                      onChange={(e) => setNewSectionType(e.target.value as SectionType)}
                      className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none"
                    >
                      {Object.entries(sectionTypeLabels).map(([type, label]) => (
                        <option key={type} value={type}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Título Principal *</label>
                    <input
                      type="text"
                      value={newSectionTitle}
                      onChange={(e) => setNewSectionTitle(e.target.value)}
                      placeholder="Ex: Nossos Diferenciais Corporativos"
                      className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Subtítulo / Linha de Apoio</label>
                    <input
                      type="text"
                      value={newSectionSubtitle}
                      onChange={(e) => setNewSectionSubtitle(e.target.value)}
                      placeholder="Ex: Soluções completas com SLA garantido"
                      className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Badge Superior</label>
                    <input
                      type="text"
                      value={newSectionBadge}
                      onChange={(e) => setNewSectionBadge(e.target.value)}
                      placeholder="Ex: ALTA PERFORMANCE"
                      className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsAddingSection(false)}
                    className="px-3 py-1.5 rounded text-xs text-zinc-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateSection}
                    disabled={!newSectionTitle.trim()}
                    className="px-4 py-1.5 rounded bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold uppercase cursor-pointer"
                  >
                    Adicionar Bloco
                  </button>
                </div>
              </div>
            )}

            {/* List of sections */}
            {pageSections.length === 0 ? (
              <div className="p-8 text-center bg-zinc-900/40 rounded-lg border border-dashed border-zinc-800 text-zinc-400 space-y-2">
                <p className="text-sm">Esta página ainda não possui blocos de conteúdo.</p>
                <button
                  onClick={() => setIsAddingSection(true)}
                  className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Primeiro Bloco</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {pageSections.map((sec, index) => {
                  const isEditing = editingSectionId === sec.id;
                  const isVisible = sec.visible !== false && sec.active !== false;

                  return (
                    <div
                      key={sec.id}
                      className={`rounded-md border transition-all ${
                        isEditing
                          ? 'bg-zinc-900 border-red-500/80 p-4 shadow-xl'
                          : 'bg-zinc-900/60 border-zinc-800 p-3 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        
                        {/* Left: Reorder controls & info */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex flex-col gap-1">
                            <button
                              disabled={index === 0}
                              onClick={() => handleMoveSection(sec.id, 'up')}
                              className="p-1 rounded bg-black hover:bg-zinc-800 disabled:opacity-30 text-zinc-400 hover:text-white cursor-pointer"
                              title="Mover para cima"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              disabled={index === pageSections.length - 1}
                              onClick={() => handleMoveSection(sec.id, 'down')}
                              className="p-1 rounded bg-black hover:bg-zinc-800 disabled:opacity-30 text-zinc-400 hover:text-white cursor-pointer"
                              title="Mover para baixo"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-mono font-bold text-zinc-500">#{index + 1}</span>
                              <span className="text-xs font-bold text-white truncate max-w-[280px]">
                                {sec.title || sec.id}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                                {sec.type}
                              </span>
                              {sec.badge && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-950/60 border border-red-800/60 text-red-400 font-bold uppercase">
                                  {sec.badge}
                                </span>
                              )}
                            </div>
                            {sec.subtitle && (
                              <p className="text-[11px] text-zinc-400 truncate mt-0.5">{sec.subtitle}</p>
                            )}
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Toggle visibility */}
                          <button
                            onClick={() => updateSection(sec.id, { visible: !isVisible, active: !isVisible })}
                            className={`p-1.5 rounded text-xs flex items-center gap-1 border transition-colors cursor-pointer ${
                              isVisible
                                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                                : 'bg-zinc-800 border-zinc-700 text-zinc-500'
                            }`}
                            title={isVisible ? 'Visível para os visitantes' : 'Oculto para os visitantes'}
                          >
                            {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            <span className="hidden sm:inline text-[10px] font-medium">{isVisible ? 'Ativo' : 'Oculto'}</span>
                          </button>

                          {/* Edit Section Content */}
                          <button
                            onClick={() => setEditingSectionId(isEditing ? null : sec.id)}
                            className={`p-1.5 px-2.5 rounded text-xs font-medium flex items-center gap-1 border cursor-pointer ${
                              isEditing
                                ? 'bg-red-600 border-red-600 text-white'
                                : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300'
                            }`}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>{isEditing ? 'Fechar' : 'Editar'}</span>
                          </button>

                          {/* Delete section */}
                          <button
                            onClick={() => {
                              if (confirm(`Tem certeza que deseja excluir a seção "${sec.title}"?`)) {
                                deleteSection(sec.id);
                              }
                            }}
                            className="p-1.5 rounded bg-zinc-800 hover:bg-red-950/50 border border-zinc-700 hover:border-red-600/40 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                            title="Excluir Seção"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>

                      {/* Section Edit Expanded Form */}
                      {isEditing && (
                        <div className="mt-4 pt-4 border-t border-zinc-800 space-y-4">
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-mono text-zinc-400 mb-1">Título Principal</label>
                              <input
                                type="text"
                                value={sec.title || ''}
                                onChange={(e) => updateSection(sec.id, { title: e.target.value })}
                                className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-mono text-zinc-400 mb-1">Tag / Badge de Destaque</label>
                              <input
                                type="text"
                                value={sec.badge || ''}
                                onChange={(e) => updateSection(sec.id, { badge: e.target.value })}
                                placeholder="Ex: ALTA DISPONIBILIDADE"
                                className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-mono text-zinc-400 mb-1">Subtítulo / Linha Fina</label>
                              <input
                                type="text"
                                value={sec.subtitle || ''}
                                onChange={(e) => updateSection(sec.id, { subtitle: e.target.value })}
                                className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-mono text-zinc-400 mb-1">Texto Descritivo / Parágrafo</label>
                              <textarea
                                rows={3}
                                value={sec.description || ''}
                                onChange={(e) => updateSection(sec.id, { description: e.target.value })}
                                className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white resize-none"
                              />
                            </div>
                          </div>

                          {/* Specific Content for Custom Blocks */}
                          {sec.type === 'hero' && (
                            <div className="p-3 bg-black/50 rounded border border-zinc-800 space-y-3">
                              <div className="text-[11px] font-bold text-red-400 uppercase font-mono">Opções Específicas do Hero</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[10px] font-mono text-zinc-400 mb-1">Texto Botão Primário (CTA)</label>
                                  <input
                                    type="text"
                                    value={sec.content?.ctaPrimaryText || 'Solicitar Proposta Comercial'}
                                    onChange={(e) => updateSection(sec.id, {
                                      content: { ...sec.content, ctaPrimaryText: e.target.value }
                                    })}
                                    className="w-full px-3 py-1.5 rounded bg-zinc-900 border border-zinc-700 text-xs text-white"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-mono text-zinc-400 mb-1">Texto Botão Secundário</label>
                                  <input
                                    type="text"
                                    value={sec.content?.ctaSecondaryText || 'Conhecer Soluções'}
                                    onChange={(e) => updateSection(sec.id, {
                                      content: { ...sec.content, ctaSecondaryText: e.target.value }
                                    })}
                                    className="w-full px-3 py-1.5 rounded bg-zinc-900 border border-zinc-700 text-xs text-white"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {sec.type === 'cta' && (
                            <div className="p-3 bg-black/50 rounded border border-zinc-800 space-y-3">
                              <div className="text-[11px] font-bold text-red-400 uppercase font-mono">Texto do Botão CTA</div>
                              <input
                                type="text"
                                value={sec.content?.buttonText || 'Solicitar Proposta Personalizada'}
                                onChange={(e) => updateSection(sec.id, {
                                  content: { ...sec.content, buttonText: e.target.value }
                                })}
                                className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 text-xs text-white"
                              />
                            </div>
                          )}

                          {/* Device Visibility & Styling controls */}
                          <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <span className="text-[11px] font-mono uppercase text-zinc-400">Exibir em:</span>
                              <label className="flex items-center gap-1.5 text-xs text-zinc-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={sec.styles?.visibility?.desktop !== false}
                                  onChange={(e) => updateSection(sec.id, {
                                    styles: {
                                      ...sec.styles,
                                      visibility: {
                                        ...(sec.styles?.visibility || { desktop: true, tablet: true, mobile: true }),
                                        desktop: e.target.checked
                                      }
                                    }
                                  })}
                                  className="w-3.5 h-3.5 rounded text-red-600 bg-black border-zinc-700"
                                />
                                <Monitor className="w-3.5 h-3.5 text-zinc-400" />
                                <span>Desktop</span>
                              </label>

                              <label className="flex items-center gap-1.5 text-xs text-zinc-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={sec.styles?.visibility?.tablet !== false}
                                  onChange={(e) => updateSection(sec.id, {
                                    styles: {
                                      ...sec.styles,
                                      visibility: {
                                        ...(sec.styles?.visibility || { desktop: true, tablet: true, mobile: true }),
                                        tablet: e.target.checked
                                      }
                                    }
                                  })}
                                  className="w-3.5 h-3.5 rounded text-red-600 bg-black border-zinc-700"
                                />
                                <Tablet className="w-3.5 h-3.5 text-zinc-400" />
                                <span>Tablet</span>
                              </label>

                              <label className="flex items-center gap-1.5 text-xs text-zinc-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={sec.styles?.visibility?.mobile !== false}
                                  onChange={(e) => updateSection(sec.id, {
                                    styles: {
                                      ...sec.styles,
                                      visibility: {
                                        ...(sec.styles?.visibility || { desktop: true, tablet: true, mobile: true }),
                                        mobile: e.target.checked
                                      }
                                    }
                                  })}
                                  className="w-3.5 h-3.5 rounded text-red-600 bg-black border-zinc-700"
                                />
                                <Smartphone className="w-3.5 h-3.5 text-zinc-400" />
                                <span>Mobile</span>
                              </label>
                            </div>

                            <button
                              onClick={() => setEditingSectionId(null)}
                              className="px-4 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer ml-auto"
                            >
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Salvar Edição</span>
                            </button>
                          </div>

                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
