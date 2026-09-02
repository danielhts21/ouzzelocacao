import React from 'react';
import { useCMS } from '../../../context/CMSContext';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import { AdminTab } from '../AdminLayout';
import {
  Users,
  Palette,
  FileText,
  Boxes,
  Eye,
  CheckCircle2,
  Clock,
  Send,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  Smartphone,
  ShieldAlert,
  Database,
  RefreshCw
} from 'lucide-react';

interface AdminDashboardTabProps {
  onNavigateTab: (tab: AdminTab) => void;
}

export const AdminDashboardTab: React.FC<AdminDashboardTabProps> = ({ onNavigateTab }) => {
  const { user } = useAdminAuth();
  const {
    state,
    isDraftModified,
    isSupabaseOnline,
    lastPublishedAt,
    lastSavedAt,
    publishChanges,
    setIsPreviewMode
  } = useCMS();

  const newLeads = state.leads?.filter(l => l.status === 'NEW') || [];
  const recentLogs = (state.auditLogs || []).slice(0, 6);

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-red-950/30 border border-zinc-800 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-[11px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Painel de Controle Ativo</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Bem-vindo(a), {user?.name || 'Administrador'}!
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
            Gerencie todo o site visualmente, edite páginas, produtos de locação, regras de design, textos e atenda leads em tempo real sem tocar em código.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isDraftModified && (
            <button
              onClick={() => publishChanges('Publicação rápida a partir do Dashboard')}
              className="px-4 py-2 rounded-sm bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-red-600/30 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publicar Alterações</span>
            </button>
          )}

          <button
            onClick={() => onNavigateTab('brand')}
            className="px-4 py-2 rounded-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 border border-zinc-700 cursor-pointer"
          >
            <Palette className="w-3.5 h-3.5 text-red-400" />
            <span>Editar Visual & Logo</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Leads */}
        <div 
          onClick={() => onNavigateTab('leads')}
          className="bg-[#0E1015] border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-zinc-400">Leads Comerciais</span>
            <div className="w-8 h-8 rounded-sm bg-red-600/10 border border-red-500/20 text-red-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white font-mono">{state.leads?.length || 0}</span>
            {newLeads.length > 0 && (
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                {newLeads.length} novos
              </span>
            )}
          </div>
          <span className="text-[11px] text-zinc-400 mt-1 block">Recebidos via formulários e WhatsApp</span>
        </div>

        {/* Metric 2: Pages & Sections */}
        <div 
          onClick={() => onNavigateTab('pages')}
          className="bg-[#0E1015] border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-zinc-400">Páginas & Seções</span>
            <div className="w-8 h-8 rounded-sm bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white font-mono">{state.pages?.length || 2}</span>
            <span className="text-xs text-zinc-400">({state.sections?.length || 0} seções)</span>
          </div>
          <span className="text-[11px] text-zinc-400 mt-1 block">Início, Educação e landing pages</span>
        </div>

        {/* Metric 3: Catalog Items */}
        <div 
          onClick={() => onNavigateTab('catalog')}
          className="bg-[#0E1015] border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-zinc-400">Equipamentos & Serviços</span>
            <div className="w-8 h-8 rounded-sm bg-amber-600/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white font-mono">
              {(state.equipment?.length || 0) + (state.services?.length || 0)}
            </span>
            <span className="text-xs text-zinc-400">cadastrados</span>
          </div>
          <span className="text-[11px] text-zinc-400 mt-1 block">Notebooks, desktops, servidores e suporte</span>
        </div>

        {/* Metric 4: Revisions / Sync */}
        <div 
          onClick={() => onNavigateTab('history')}
          className="bg-[#0E1015] border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-zinc-400">Versões & Backup</span>
            <div className="w-8 h-8 rounded-sm bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white font-mono">{state.revisions?.length || 0}</span>
            <span className="text-xs text-emerald-400">versões salvas</span>
          </div>
          <span className="text-[11px] text-zinc-400 mt-1 block">Rollback seguro com 1 clique</span>
        </div>

      </div>

      {/* Main Grid: Status & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1 & 2: Quick Management Actions & Recent Leads */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Actions Panel */}
          <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span>Ações Rápidas de Administração</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => onNavigateTab('brand')}
                className="p-3 rounded-md bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 text-left transition-colors flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded bg-red-600/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Alterar Logo & Cores</div>
                  <div className="text-[11px] text-zinc-400">Substitua o logo oficial e ajuste os tons da marca</div>
                </div>
              </button>

              <button
                onClick={() => onNavigateTab('pages')}
                className="p-3 rounded-md bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 text-left transition-colors flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Editar Textos & Seções</div>
                  <div className="text-[11px] text-zinc-400">Modifique títulos, benefícios e ordem dos blocos</div>
                </div>
              </button>

              <button
                onClick={() => onNavigateTab('catalog')}
                className="p-3 rounded-md bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 text-left transition-colors flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Boxes className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Adicionar Equipamento</div>
                  <div className="text-[11px] text-zinc-400">Cadastre novos modelos de notebook ou impressoras</div>
                </div>
              </button>

              <button
                onClick={() => onNavigateTab('settings')}
                className="p-3 rounded-md bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 text-left transition-colors flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Backup & Redes Sociais</div>
                  <div className="text-[11px] text-zinc-400">WhatsApp, telefone, exportação JSON e SEO</div>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Leads Preview */}
          <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Últimos Leads Registrados</span>
              </h3>
              <button
                onClick={() => onNavigateTab('leads')}
                className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1"
              >
                <span>Ver todos ({state.leads?.length || 0})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {state.leads && state.leads.length > 0 ? (
              <div className="divide-y divide-zinc-800/60">
                {state.leads.slice(0, 4).map(lead => (
                  <div key={lead.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white truncate">{lead.name}</span>
                        <span className="text-[10px] font-mono text-zinc-400">({lead.company})</span>
                      </div>
                      <div className="text-[11px] text-zinc-400 truncate">
                        {lead.solutionType} • {lead.email} • {lead.phone}
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono shrink-0 ${
                      lead.status === 'NEW' 
                        ? 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-bold'
                        : lead.status === 'CONTACTED'
                        ? 'bg-blue-950/70 border border-blue-500/40 text-blue-300'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-zinc-400 bg-zinc-900/40 rounded-sm border border-zinc-800/40">
                Nenhum lead recebido até o momento. Quando os visitantes preencherem o formulário, eles aparecerão aqui instantaneamente.
              </div>
            )}
          </div>

        </div>

        {/* Col 3: System Status & Audit Activity */}
        <div className="space-y-6">
          
          {/* Status Box */}
          <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Status do Sistema
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-zinc-900/70 border border-zinc-800">
                <span className="text-zinc-400">Banco de Dados:</span>
                <span className={`font-mono font-bold flex items-center gap-1.5 ${isSupabaseOnline ? 'text-emerald-400' : 'text-amber-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${isSupabaseOnline ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  {isSupabaseOnline ? 'Supabase Online' : 'Snapshot Local'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-zinc-900/70 border border-zinc-800">
                <span className="text-zinc-400">Última Publicação:</span>
                <span className="font-mono text-zinc-300">{lastPublishedAt || 'Padrão do Sistema'}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-zinc-900/70 border border-zinc-800">
                <span className="text-zinc-400">Último Salvamento:</span>
                <span className="font-mono text-zinc-300">{lastSavedAt || 'Automático'}</span>
              </div>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-5 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-400" />
              <span>Atividades Recentes</span>
            </h3>

            {recentLogs.length > 0 ? (
              <div className="space-y-2.5">
                {recentLogs.map(log => (
                  <div key={log.id} className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800 text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-zinc-400">
                      <span className="font-mono font-bold text-zinc-300">{log.action}</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString('pt-BR')}</span>
                    </div>
                    <p className="text-zinc-400 line-clamp-1">{log.details}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-zinc-400 py-4 text-center">
                Nenhuma alteração registrada recentemente.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
