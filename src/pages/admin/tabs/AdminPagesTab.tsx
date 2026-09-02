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
  Layout,
  Globe
} from 'lucide-react';
import { PageSection } from '../../../types/cms';

export const AdminPagesTab: React.FC = () => {
  const { state, updatePage, updateSection, addSection, deleteSection, reorderSections } = useCMS();
  const [selectedPageSlug, setSelectedPageSlug] = useState<string>('home');
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [isAddingSection, setIsAddingSection] = useState(false);

  const currentPage = state.pages?.find(p => p.slug === selectedPageSlug) || state.pages?.[0];
  const pageSections = state.sections
    ?.filter(s => s.pageSlug === selectedPageSlug)
    .sort((a, b) => a.order - b.order) || [];

  // Reorder handlers
  const handleMoveSection = (sectionId: string, direction: 'up' | 'down') => {
    const currentOrder = pageSections.map(s => s.id);
    const index = currentOrder.indexOf(sectionId);
    if (index === -1) return;

    if (direction === 'up' && index > 0) {
      const temp = currentOrder[index - 1];
      currentOrder[index - 1] = currentOrder[index];
      currentOrder[index] = temp;
      reorderSections(selectedPageSlug, currentOrder);
    } else if (direction === 'down' && index < currentOrder.length - 1) {
      const temp = currentOrder[index + 1];
      currentOrder[index + 1] = currentOrder[index];
      currentOrder[index] = temp;
      reorderSections(selectedPageSlug, currentOrder);
    }
  };

  const [newSectionType, setNewSectionType] = useState<PageSection['type']>('features');
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionSubtitle, setNewSectionSubtitle] = useState('');

  const handleCreateSection = () => {
    if (!newSectionTitle.trim()) return;

    const newSec: PageSection = {
      id: `custom-sec-${Date.now()}`,
      pageSlug: selectedPageSlug,
      type: newSectionType,
      title: newSectionTitle,
      subtitle: newSectionSubtitle,
      active: true,
      visible: true,
      order: pageSections.length + 1,
      content: {}
    };

    addSection(newSec);
    setIsAddingSection(false);
    setNewSectionTitle('');
    setNewSectionSubtitle('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-500" />
            <span>Páginas, Estrutura & Seções</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Controle a ordem dos blocos, visibilidade, textos, chamadas e SEO de cada página do portal.
          </p>
        </div>

        {/* Page selector pills */}
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-md border border-zinc-800">
          {state.pages?.map(p => (
            <button
              key={p.slug}
              onClick={() => { setSelectedPageSlug(p.slug); setEditingSectionId(null); }}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                selectedPageSlug === p.slug
                  ? 'bg-red-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {currentPage && (
        <div className="space-y-6">
          
          {/* Page Meta & SEO */}
          <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-zinc-400" />
              <span>Metadados e SEO da Página ({currentPage.name})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  Título da Página (Meta Title)
                </label>
                <input
                  type="text"
                  value={currentPage.title}
                  onChange={(e) => updatePage(currentPage.slug, { title: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  Caminho da Rota (URL)
                </label>
                <input
                  type="text"
                  disabled
                  value={currentPage.path}
                  className="w-full px-3 py-2 rounded bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  Descrição para o Google (Meta Description)
                </label>
                <textarea
                  rows={2}
                  value={currentPage.description || ''}
                  onChange={(e) => updatePage(currentPage.slug, { description: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Sections List & Ordering */}
          <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-red-500" />
                <span>Seções da Página ({pageSections.length} ativas)</span>
              </h3>

              <button
                onClick={() => setIsAddingSection(!isAddingSection)}
                className="px-3 py-1.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-red-400" />
                <span>Nova Seção</span>
              </button>
            </div>

            {/* Add Section Form */}
            {isAddingSection && (
              <div className="p-4 rounded-md bg-zinc-900 border border-zinc-700 space-y-3 animate-in fade-in duration-200">
                <div className="text-xs font-bold text-white uppercase">Adicionar Novo Bloco de Conteúdo</div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Tipo de Seção</label>
                    <select
                      value={newSectionType}
                      onChange={(e) => setNewSectionType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
                    >
                      <option value="features">Destaques / Recursos</option>
                      <option value="catalog">Catálogo / Equipamentos</option>
                      <option value="services">Serviços / Suporte</option>
                      <option value="cta">Chamada para Ação (CTA)</option>
                      <option value="faq">Perguntas Frequentes (FAQ)</option>
                      <option value="custom">Bloco Livre Customizado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Título da Seção</label>
                    <input
                      type="text"
                      value={newSectionTitle}
                      onChange={(e) => setNewSectionTitle(e.target.value)}
                      placeholder="Ex: Nossos Diferenciais"
                      className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Subtítulo / Descrição</label>
                    <input
                      type="text"
                      value={newSectionSubtitle}
                      onChange={(e) => setNewSectionSubtitle(e.target.value)}
                      placeholder="Ex: Por que escolher a Ouzze"
                      className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
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
                    className="px-4 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase"
                  >
                    Adicionar Seção
                  </button>
                </div>
              </div>
            )}

            {/* List of sections */}
            <div className="space-y-2.5">
              {pageSections.map((sec, index) => {
                const isEditing = editingSectionId === sec.id;
                return (
                  <div
                    key={sec.id}
                    className={`rounded-md border transition-all ${
                      isEditing
                        ? 'bg-zinc-900 border-red-500/80 p-4'
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
                            className="p-1 rounded bg-black hover:bg-zinc-800 disabled:opacity-30 text-zinc-400 hover:text-white"
                            title="Mover para cima"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            disabled={index === pageSections.length - 1}
                            onClick={() => handleMoveSection(sec.id, 'down')}
                            className="p-1 rounded bg-black hover:bg-zinc-800 disabled:opacity-30 text-zinc-400 hover:text-white"
                            title="Mover para baixo"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-zinc-500">#{index + 1}</span>
                            <span className="text-xs font-bold text-white truncate">{sec.title || sec.id}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">
                              {sec.type}
                            </span>
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
                          onClick={() => updateSection(sec.id, { visible: !sec.visible })}
                          className={`p-1.5 rounded text-xs flex items-center gap-1 border transition-colors ${
                            sec.visible
                              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                              : 'bg-zinc-800 border-zinc-700 text-zinc-500'
                          }`}
                          title={sec.visible ? 'Visível no site' : 'Oculto no site'}
                        >
                          {sec.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          <span className="hidden sm:inline text-[10px]">{sec.visible ? 'Ativo' : 'Oculto'}</span>
                        </button>

                        {/* Edit Section Content */}
                        <button
                          onClick={() => setEditingSectionId(isEditing ? null : sec.id)}
                          className={`p-1.5 px-2.5 rounded text-xs font-medium flex items-center gap-1 border ${
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
                          className="p-1.5 rounded bg-zinc-800 hover:bg-red-950/50 border border-zinc-700 hover:border-red-600/40 text-zinc-400 hover:text-red-400 transition-colors"
                          title="Excluir Seção"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>

                    {/* Section Edit Expanded Form */}
                    {isEditing && (
                      <div className="mt-4 pt-4 border-t border-zinc-800 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-mono text-zinc-400 mb-1">Título Principal</label>
                            <input
                              type="text"
                              value={sec.title}
                              onChange={(e) => updateSection(sec.id, { title: e.target.value })}
                              className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-zinc-400 mb-1">Tag / Badge de Categoria</label>
                            <input
                              type="text"
                              value={sec.badge || ''}
                              onChange={(e) => updateSection(sec.id, { badge: e.target.value })}
                              placeholder="Ex: ALTA DISPONIBILIDADE"
                              className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-mono text-zinc-400 mb-1">Subtítulo / Descrição da Seção</label>
                            <textarea
                              rows={2}
                              value={sec.subtitle || ''}
                              onChange={(e) => updateSection(sec.id, { subtitle: e.target.value })}
                              className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white resize-none"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end pt-2">
                          <button
                            onClick={() => setEditingSectionId(null)}
                            className="px-4 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium flex items-center gap-1.5"
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
          </div>

        </div>
      )}

    </div>
  );
};
