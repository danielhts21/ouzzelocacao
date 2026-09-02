import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import {
  History,
  RotateCcw,
  CheckCircle,
  Clock,
  ShieldCheck,
  AlertCircle,
  FileText
} from 'lucide-react';

export const AdminHistoryTab: React.FC = () => {
  const { state, rollbackRevision } = useCMS();
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [restoredSuccess, setRestoredSuccess] = useState<string | null>(null);

  const revisions = state.revisions || [];
  const logs = state.auditLogs || [];

  const handleRollback = async (revId: string, version: number) => {
    if (!confirm(`Deseja realmente restaurar a versão #${version} para o rascunho de trabalho?`)) {
      return;
    }

    setRestoringId(revId);
    const success = await rollbackRevision(revId);
    setRestoringId(null);
    if (success) {
      setRestoredSuccess(`Versão #${version} restaurada com sucesso! Você pode revisar ou publicar novamente.`);
      setTimeout(() => setRestoredSuccess(null), 5000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <History className="w-5 h-5 text-red-500" />
            <span>Histórico de Publicações & Rollback</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Cada publicação gera uma versão imutável. Você pode reverter qualquer alteração com um único clique.
          </p>
        </div>
      </div>

      {restoredSuccess && (
        <div className="p-4 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{restoredSuccess}</span>
        </div>
      )}

      {/* Revisions Grid */}
      <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-5 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Versões Salvas do Portal ({revisions.length})</span>
        </h3>

        {revisions.length > 0 ? (
          <div className="divide-y divide-zinc-800/80">
            {revisions.map((rev, index) => (
              <div key={rev.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-red-400">Versão #{rev.version}</span>
                    {index === 0 && (
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        Última Publicada
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-300 font-medium">{rev.description || 'Publicação de conteúdo'}</p>
                  <div className="text-[11px] text-zinc-500 flex items-center gap-3">
                    <span>{new Date(rev.createdAt).toLocaleString('pt-BR')}</span>
                    <span>•</span>
                    <span>Autor: {rev.createdBy}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRollback(rev.id, rev.version)}
                  disabled={restoringId === rev.id}
                  className="px-3 py-1.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>{restoringId === rev.id ? 'Restaurando...' : 'Reverter para esta versão'}</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-zinc-500">
            Nenhuma revisão histórica registrada ainda. Elas serão criadas automaticamente a cada clique em "Publicar".
          </div>
        )}
      </div>

      {/* Audit Logs Table */}
      <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-5 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-zinc-400" />
          <span>Trilha de Auditoria (Logs de Modificação)</span>
        </h3>

        {logs.length > 0 ? (
          <div className="divide-y divide-zinc-800/80 max-h-96 overflow-y-auto">
            {logs.map(log => (
              <div key={log.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-zinc-300">{log.action}</span>
                    <span className="text-[11px] text-zinc-500 font-mono">[{log.entityType}]</span>
                  </div>
                  <p className="text-zinc-400">{log.details}</p>
                </div>
                <div className="text-right text-[11px] text-zinc-500 font-mono shrink-0">
                  <div>{new Date(log.timestamp).toLocaleTimeString('pt-BR')}</div>
                  <div>{log.userEmail}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-zinc-500">
            Nenhum registro de auditoria.
          </div>
        )}
      </div>

    </div>
  );
};
