import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import {
  Users,
  Download,
  Phone,
  Mail,
  Building,
  Calendar,
  MessageSquare,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Send,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import { Lead } from '../../../types/cms';

export const AdminLeadsTab: React.FC = () => {
  const { state, updateLeadStatus, addLeadNote, deleteLead, exportLeadsCSV } = useCMS();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNote, setNewNote] = useState('');

  const leads = (state.leads || []).filter(lead => {
    const matchesStatus = filterStatus === 'ALL' || lead.status === filterStatus;
    const matchesSearch = 
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search);
    return matchesStatus && matchesSearch;
  });

  const handleAddNote = () => {
    if (!selectedLead || !newNote.trim()) return;
    addLeadNote(selectedLead.id, newNote);
    setNewNote('');
  };

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'NEW':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">NOVO</span>;
      case 'CONTACTED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-950/80 border border-blue-500/40 text-blue-300">CONTATADO</span>;
      case 'QUALIFIED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950/80 border border-purple-500/40 text-purple-300">QUALIFICADO</span>;
      case 'PROPOSAL':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-950/80 border border-amber-500/40 text-amber-300">PROPOSTA ENVIADA</span>;
      case 'WON':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-green-950/80 border border-green-500/40 text-green-300">FECHADO / GANHO</span>;
      case 'LOST':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-zinc-800 border border-zinc-700 text-zinc-400">PERDIDO</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-red-500" />
            <span>Gestão de Leads & Propostas Comerciais</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Acompanhe o funil de vendas, envie propostas e visualize contatos recebidos em tempo real.
          </p>
        </div>

        <button
          onClick={exportLeadsCSV}
          className="px-3.5 py-2 rounded-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer self-start"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span>Exportar Planilha (CSV)</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-[#0E1015] p-2.5 rounded-md border border-zinc-800">
          <Search className="w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, empresa, e-mail ou telefone..."
            className="bg-transparent border-0 text-xs text-white placeholder:text-zinc-500 focus:outline-none w-full"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                filterStatus === st
                  ? 'bg-red-600 text-white font-bold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {st === 'ALL' ? 'Todos' : st === 'PROPOSAL' ? 'Proposta' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table / List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Leads List (7 cols) */}
        <div className="lg:col-span-7 bg-[#0E1015] border border-zinc-800 rounded-lg overflow-hidden divide-y divide-zinc-800/80">
          {leads.length > 0 ? (
            leads.map(lead => {
              const isSelected = selectedLead?.id === lead.id;
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`p-4 transition-colors cursor-pointer space-y-2 ${
                    isSelected ? 'bg-zinc-800/80 border-l-4 border-l-red-500' : 'hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{lead.name}</span>
                        <span className="text-xs text-zinc-400">({lead.company})</span>
                      </div>
                      <div className="text-xs text-zinc-400 flex items-center gap-3 mt-0.5">
                        <span>{lead.solutionType}</span>
                        <span>•</span>
                        <span>{lead.phone}</span>
                      </div>
                    </div>
                    {getStatusBadge(lead.status)}
                  </div>

                  {lead.message && (
                    <p className="text-xs text-zinc-400 line-clamp-1 italic">"{lead.message}"</p>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono pt-1">
                    <span>Recebido: {new Date(lead.createdAt).toLocaleString('pt-BR')}</span>
                    {lead.adminNotes && lead.adminNotes.length > 0 && (
                      <span className="text-red-400">{lead.adminNotes.length} anotações</span>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-xs text-zinc-500">
              Nenhum lead encontrado com os filtros selecionados.
            </div>
          )}
        </div>

        {/* Lead Detail & Actions Drawer (5 cols) */}
        <div className="lg:col-span-5">
          {selectedLead ? (
            <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-5 space-y-5 sticky top-20">
              
              <div className="flex items-start justify-between pb-3 border-b border-zinc-800">
                <div>
                  <h3 className="text-base font-bold text-white">{selectedLead.name}</h3>
                  <div className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                    <Building className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{selectedLead.company}</span>
                    {selectedLead.cnpj && <span className="font-mono text-[10px]">({selectedLead.cnpj})</span>}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (confirm('Deseja excluir este lead?')) {
                      deleteLead(selectedLead.id);
                      setSelectedLead(null);
                    }
                  }}
                  className="p-1.5 rounded bg-zinc-900 hover:bg-red-950 text-zinc-400 hover:text-red-400"
                  title="Excluir Lead"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">
                  Status Comercial do Lead
                </label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => {
                    const newSt = e.target.value as any;
                    updateLeadStatus(selectedLead.id, newSt);
                    setSelectedLead({ ...selectedLead, status: newSt });
                  }}
                  className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
                >
                  <option value="NEW">NOVO</option>
                  <option value="CONTACTED">CONTATADO</option>
                  <option value="QUALIFIED">QUALIFICADO</option>
                  <option value="PROPOSAL">PROPOSTA ENVIADA</option>
                  <option value="WON">FECHADO / CONVERTIDO</option>
                  <option value="LOST">PERDIDO / CANCELADO</option>
                </select>
              </div>

              {/* Quick WhatsApp Contact */}
              {selectedLead.phone && (
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${selectedLead.name}, tudo bem? Aqui é da Ouzze Tecnologia a respeito de sua solicitação de ${selectedLead.solutionType}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Chamar no WhatsApp ({selectedLead.phone})</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              )}

              {/* Details grid */}
              <div className="p-3 rounded bg-black/60 border border-zinc-800 text-xs space-y-2">
                <div><span className="text-zinc-500 font-mono">E-mail:</span> <span className="text-zinc-200">{selectedLead.email}</span></div>
                <div><span className="text-zinc-500 font-mono">Solução:</span> <span className="text-zinc-200">{selectedLead.solutionType}</span></div>
                {selectedLead.segment && <div><span className="text-zinc-500 font-mono">Segmento:</span> <span className="text-zinc-200">{selectedLead.segment}</span></div>}
                {selectedLead.estimatedQuantity && <div><span className="text-zinc-500 font-mono">Quantidade:</span> <span className="text-zinc-200">{selectedLead.estimatedQuantity}</span></div>}
                {selectedLead.city && <div><span className="text-zinc-500 font-mono">Localização:</span> <span className="text-zinc-200">{selectedLead.city} - {selectedLead.state}</span></div>}
                {selectedLead.message && (
                  <div className="pt-2 border-t border-zinc-800/80">
                    <span className="text-zinc-500 font-mono block mb-1">Mensagem enviada:</span>
                    <p className="text-zinc-300 italic">{selectedLead.message}</p>
                  </div>
                )}
              </div>

              {/* Follow-up Notes */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Histórico de Atendimento ({selectedLead.adminNotes?.length || 0})</span>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedLead.adminNotes && selectedLead.adminNotes.length > 0 ? (
                    selectedLead.adminNotes.map(n => (
                      <div key={n.id} className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-xs space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-zinc-500">
                          <span className="font-bold text-zinc-300">{n.author}</span>
                          <span>{new Date(n.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <p className="text-zinc-300">{n.text}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-[11px] text-zinc-500 text-center py-2">
                      Nenhuma anotação registrada ainda.
                    </div>
                  )}
                </div>

                {/* Add Note Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Adicionar nota comercial..."
                    className="flex-1 px-3 py-1.5 rounded bg-black border border-zinc-700 text-xs text-white"
                  />
                  <button
                    onClick={handleAddNote}
                    className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
                  >
                    Salvar
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-8 text-center text-xs text-zinc-500">
              Selecione um lead da lista ao lado para ver os detalhes, chamar no WhatsApp ou registrar anotações.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
