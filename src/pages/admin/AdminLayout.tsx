import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useCMS } from '../../context/CMSContext';
import {
  LayoutDashboard,
  Palette,
  FileText,
  Boxes,
  Image as ImageIcon,
  Users,
  Settings,
  History,
  Eye,
  LogOut,
  Send,
  Save,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Layers,
  HelpCircle,
  ExternalLink,
  Smartphone,
  Tablet,
  Monitor,
  Menu,
  X,
  RefreshCw
} from 'lucide-react';
import { Logo } from '../../components/common/Logo';

export type AdminTab = 
  | 'dashboard'
  | 'brand'
  | 'pages'
  | 'catalog'
  | 'media'
  | 'leads'
  | 'settings'
  | 'history';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onExitAdmin: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onExitAdmin,
  children
}) => {
  const { user, logout } = useAdminAuth();
  const {
    state,
    isDraftModified,
    isSupabaseOnline,
    isLoading,
    lastSavedAt,
    lastPublishedAt,
    saveDraft,
    publishChanges,
    isPreviewMode,
    setIsPreviewMode,
    previewDevice,
    setPreviewDevice
  } = useCMS();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [publishNote, setPublishNote] = useState('');
  const [publishSuccess, setPublishSuccess] = useState(false);

  const navItems: { id: AdminTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: 'Painel Geral', icon: LayoutDashboard },
    { id: 'brand', label: 'Identidade & Visual', icon: Palette },
    { id: 'pages', label: 'Páginas & Seções', icon: FileText, badge: state.pages?.length },
    { id: 'catalog', label: 'Catálogo & Serviços', icon: Boxes, badge: (state.equipment?.length || 0) + (state.services?.length || 0) },
    { id: 'media', label: 'Biblioteca de Mídia', icon: ImageIcon, badge: state.mediaAssets?.length },
    { id: 'leads', label: 'Leads & Propostas', icon: Users, badge: state.leads?.filter(l => l.status === 'NEW').length || undefined },
    { id: 'settings', label: 'Configurações do Site', icon: Settings },
    { id: 'history', label: 'Histórico & Rollback', icon: History, badge: state.revisions?.length }
  ];

  const handlePublish = async () => {
    const success = await publishChanges(publishNote || 'Publicação manual via painel de administração');
    if (success) {
      setPublishSuccess(true);
      setTimeout(() => {
        setPublishSuccess(false);
        setPublishModalOpen(false);
        setPublishNote('');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-zinc-100 flex flex-col font-sans">
      
      {/* TOP ADMIN BAR */}
      <header className="h-16 bg-[#0E1015] border-b border-zinc-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        
        {/* Left: Brand & Mobile Menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-sm bg-zinc-900 border border-zinc-700 text-zinc-300"
            aria-label="Menu administrativo"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <span>CMS Administrativo</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-red-600/20 border border-red-500/40 text-red-400 rounded-sm font-mono">v1.0 Pro</span>
              </span>
              <span className="text-[10px] text-zinc-400">Ouzze Tecnologia • Painel Visual</span>
            </div>
          </div>
        </div>

        {/* Center: Device Switcher & Live Preview indicator */}
        <div className="hidden md:flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 rounded-md p-1">
          <button
            onClick={() => { setPreviewDevice('desktop'); setIsPreviewMode(true); }}
            className={`p-1.5 px-2.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
              isPreviewMode && previewDevice === 'desktop'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="Visualizar Desktop"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>

          <button
            onClick={() => { setPreviewDevice('tablet'); setIsPreviewMode(true); }}
            className={`p-1.5 px-2.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
              isPreviewMode && previewDevice === 'tablet'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="Visualizar Tablet"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>

          <button
            onClick={() => { setPreviewDevice('mobile'); setIsPreviewMode(true); }}
            className={`p-1.5 px-2.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
              isPreviewMode && previewDevice === 'mobile'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="Visualizar Smartphone"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right: Status, Actions, User */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Supabase Status Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300">
            <span className={`w-2 h-2 rounded-full ${isSupabaseOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span>{isSupabaseOnline ? 'Supabase Conectado' : 'Modo Local / Offline'}</span>
          </div>

          {/* Draft indicator */}
          {isDraftModified && (
            <span className="text-[11px] font-mono text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>Rascunho não publicado</span>
            </span>
          )}

          {/* Save Draft */}
          <button
            onClick={() => saveDraft()}
            className="p-2 sm:px-3 sm:py-1.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            title="Salvar Rascunho"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Salvar</span>
          </button>

          {/* Publish Button */}
          <button
            onClick={() => setPublishModalOpen(true)}
            className="px-3.5 py-1.5 rounded-sm bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publicar</span>
          </button>

          {/* Exit / View Site */}
          <button
            onClick={onExitAdmin}
            className="p-2 rounded-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white"
            title="Ir para o Site Público"
          >
            <ExternalLink className="w-4 h-4" />
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="p-2 rounded-sm bg-zinc-900 hover:bg-red-950/40 border border-zinc-700 hover:border-red-600/40 text-zinc-400 hover:text-red-400 transition-colors"
            title="Sair do painel"
          >
            <LogOut className="w-4 h-4" />
          </button>

        </div>
      </header>

      {/* BODY WITH SIDEBAR AND MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex w-64 bg-[#0E1015] border-r border-zinc-800/80 flex-col justify-between p-3.5 shrink-0">
          
          <div className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
              Navegação Administrativa
            </div>

            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white font-semibold shadow-sm'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                        isActive
                          ? 'bg-white text-red-600'
                          : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* User Info Footer */}
          <div className="pt-4 border-t border-zinc-800/80 space-y-2">
            <div className="px-3 py-2 rounded bg-zinc-900/60 border border-zinc-800 text-xs">
              <div className="font-semibold text-zinc-200 truncate">{user?.name || 'Administrador Ouzze'}</div>
              <div className="text-[11px] text-zinc-400 truncate">{user?.email}</div>
              <div className="mt-1 text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                Função: {user?.role?.toUpperCase()}
              </div>
            </div>

            <button
              onClick={onExitAdmin}
              className="w-full py-2 px-3 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-medium flex items-center justify-center gap-2 border border-zinc-800"
            >
              <Eye className="w-3.5 h-3.5 text-zinc-400" />
              <span>Ver Site Público</span>
            </button>
          </div>

        </aside>

        {/* MOBILE DRAWER */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-sm flex">
            <div className="w-72 bg-[#0E1015] border-r border-zinc-800 h-full p-4 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <Logo size="sm" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectTab(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-red-600 text-white font-semibold'
                            : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-zinc-800 text-zinc-300">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 space-y-2">
                <button
                  onClick={() => {
                    onExitAdmin();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-sm bg-zinc-900 text-zinc-200 text-xs font-medium flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Site Público</span>
                </button>
                <button
                  onClick={logout}
                  className="w-full py-2 px-3 rounded-sm bg-red-950/40 border border-red-800/40 text-red-300 text-xs font-medium flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Desconectar</span>
                </button>
              </div>

            </div>
            
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto bg-[#08090C] p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>

      </div>

      {/* PUBLISH CONFIRMATION MODAL */}
      {publishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4 shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-base font-bold text-white uppercase tracking-tight flex items-center gap-2">
                <Send className="w-4 h-4 text-red-500" />
                <span>Publicar Alterações no Site</span>
              </h3>
              <button
                onClick={() => setPublishModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {publishSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">Publicado com Sucesso!</h4>
                <p className="text-xs text-zinc-400">
                  Todas as alterações foram consolidadas e estão visíveis para todos os visitantes do site.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Isso irá criar uma nova versão histórica (com possibilidade de rollback a qualquer momento) e atualizará todo o conteúdo publicado visível ao público.
                </p>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Nota da Publicação (Opcional)
                  </label>
                  <input
                    type="text"
                    value={publishNote}
                    onChange={(e) => setPublishNote(e.target.value)}
                    placeholder="Ex: Atualização de preços de locação e novo banner"
                    className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-zinc-800">
                  <button
                    onClick={() => setPublishModalOpen(false)}
                    className="px-3.5 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handlePublish}
                    disabled={isLoading}
                    className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isLoading ? 'Publicando...' : 'Confirmar e Publicar'}</span>
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
