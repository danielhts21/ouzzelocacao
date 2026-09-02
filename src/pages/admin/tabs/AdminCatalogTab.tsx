import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import {
  Boxes,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Laptop,
  Server,
  Wrench,
  Building,
  FileDown,
  Star,
  Tag
} from 'lucide-react';
import { EquipmentItem, ServiceItem, SegmentItem, MaterialDownload } from '../../../types/cms';

export const AdminCatalogTab: React.FC = () => {
  const {
    state,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    addService,
    updateService,
    deleteService,
    addSegment,
    updateSegment,
    deleteSegment,
    addDownload,
    updateDownload,
    deleteDownload
  } = useCMS();

  const [activeSubtab, setActiveSubtab] = useState<'equipment' | 'services' | 'segments' | 'downloads'>('equipment');

  // Equipment Form state
  const [editingEquipmentId, setEditingEquipmentId] = useState<string | null>(null);
  const [isAddingEquipment, setIsAddingEquipment] = useState(false);
  const [newEquipment, setNewEquipment] = useState<Partial<EquipmentItem>>({
    name: '',
    category: 'notebooks',
    categoryLabel: 'Notebooks Corporativos',
    shortDesc: 'Configuração balanceada para produtividade corporativa.',
    specs: ['Intel Core i5 / i7', '16GB RAM', '512GB NVMe SSD'],
    recommendedFor: 'Corporativo & Produtividade',
    iconName: 'Laptop'
  });

  // Services Form state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState<Partial<ServiceItem>>({
    title: '',
    description: '',
    category: 'suporte',
    features: ['SLA de 4 horas', 'Suporte Presencial e Remoto', 'Equipamento reserva imediato'],
    sla: 'Até 4 horas úteis',
    iconName: 'Wrench'
  });

  // Segments Form state
  const [editingSegmentId, setEditingSegmentId] = useState<string | null>(null);
  const [isAddingSegment, setIsAddingSegment] = useState(false);
  const [newSegment, setNewSegment] = useState<Partial<SegmentItem>>({
    title: '',
    subtitle: '',
    description: '',
    keyBenefits: ['Parque completo de notebooks', 'Suporte local dedicado'],
    slug: 'educacao',
    iconName: 'GraduationCap'
  });

  const handleSaveNewEquipment = () => {
    if (!newEquipment.name) return;
    const item: EquipmentItem = {
      id: `equip-${Date.now()}`,
      name: newEquipment.name || 'Equipamento',
      category: (newEquipment.category as any) || 'notebooks',
      categoryLabel: newEquipment.categoryLabel || 'Notebooks Corporativos',
      shortDesc: newEquipment.shortDesc || 'Configuração corporativa de alta performance',
      specs: newEquipment.specs || ['Intel Core i5 / i7', '16GB RAM', '512GB SSD'],
      recommendedFor: newEquipment.recommendedFor || 'Produtividade corporativa',
      iconName: newEquipment.iconName || 'Laptop',
      badge: newEquipment.badge
    };
    addEquipment(item);
    setIsAddingEquipment(false);
    setNewEquipment({
      name: '',
      category: 'notebooks',
      categoryLabel: 'Notebooks Corporativos',
      shortDesc: 'Configuração balanceada para produtividade corporativa.',
      specs: ['Intel Core i5 / i7', '16GB RAM', '512GB NVMe SSD'],
      recommendedFor: 'Corporativo & Produtividade',
      iconName: 'Laptop'
    });
  };

  const handleSaveNewService = () => {
    if (!newService.title) return;
    const serv: ServiceItem = {
      id: `srv-${Date.now()}`,
      title: newService.title,
      description: newService.description || '',
      category: (newService.category as any) || 'suporte',
      features: newService.features || ['SLA de 4 horas', 'Suporte Presencial'],
      sla: newService.sla || 'Até 4 horas',
      iconName: newService.iconName || 'Wrench'
    };
    addService(serv);
    setIsAddingService(false);
    setNewService({
      title: '',
      description: '',
      category: 'suporte',
      features: ['SLA de 4 horas', 'Suporte Presencial e Remoto'],
      sla: 'Até 4 horas',
      iconName: 'Wrench'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Boxes className="w-5 h-5 text-red-500" />
            <span>Catálogo, Serviços & Segmentos</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Cadastre e edite hardware para locação, venda corporativa, serviços de TI e materiais para download.
          </p>
        </div>

        {/* Subtabs */}
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-md border border-zinc-800">
          <button
            onClick={() => setActiveSubtab('equipment')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeSubtab === 'equipment' ? 'bg-red-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Equipamentos ({state.equipment?.length || 0})
          </button>
          <button
            onClick={() => setActiveSubtab('services')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeSubtab === 'services' ? 'bg-red-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Serviços ({state.services?.length || 0})
          </button>
          <button
            onClick={() => setActiveSubtab('segments')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeSubtab === 'segments' ? 'bg-red-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Segmentos ({state.segments?.length || 0})
          </button>
          <button
            onClick={() => setActiveSubtab('downloads')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeSubtab === 'downloads' ? 'bg-red-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Downloads ({state.downloads?.length || 0})
          </button>
        </div>
      </div>

      {/* SUBTAB 1: EQUIPMENT */}
      {activeSubtab === 'equipment' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Modelos de Hardware Cadastrados
            </h3>
            <button
              onClick={() => setIsAddingEquipment(!isAddingEquipment)}
              className="px-3 py-1.5 rounded-sm bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Equipamento</span>
            </button>
          </div>

          {/* Add Equipment Form */}
          {isAddingEquipment && (
            <div className="p-4 rounded-md bg-zinc-900 border border-zinc-700 space-y-3">
              <div className="text-xs font-bold text-white uppercase">Cadastrar Novo Hardware</div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Nome / Modelo *</label>
                  <input
                    type="text"
                    required
                    value={newEquipment.name}
                    onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                    placeholder="Ex: Dell Latitude 5440"
                    className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Categoria</label>
                  <select
                    value={newEquipment.category}
                    onChange={(e) => setNewEquipment({ ...newEquipment, category: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
                  >
                    <option value="notebooks">Notebooks</option>
                    <option value="desktops">Desktops & Mini PCs</option>
                    <option value="servidores">Servidores & Storage</option>
                    <option value="impressoras">Impressoras & Outsourcing</option>
                    <option value="monitores">Monitores & Periféricos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Processador</label>
                  <input
                    type="text"
                    value={newEquipment.processor}
                    onChange={(e) => setNewEquipment({ ...newEquipment, processor: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Memória RAM</label>
                  <input
                    type="text"
                    value={newEquipment.ram}
                    onChange={(e) => setNewEquipment({ ...newEquipment, ram: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Armazenamento SSD</label>
                  <input
                    type="text"
                    value={newEquipment.storage}
                    onChange={(e) => setNewEquipment({ ...newEquipment, storage: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Perfil Ideal</label>
                  <input
                    type="text"
                    value={newEquipment.idealFor}
                    onChange={(e) => setNewEquipment({ ...newEquipment, idealFor: e.target.value })}
                    placeholder="Ex: Engenharia / Executivos"
                    className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newEquipment.highlight}
                    onChange={(e) => setNewEquipment({ ...newEquipment, highlight: e.target.checked })}
                    className="w-4 h-4 rounded text-red-600 bg-black border-zinc-700"
                  />
                  <span className="text-xs text-zinc-300">Marcar como Destaque no Site</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAddingEquipment(false)}
                    className="px-3 py-1.5 rounded text-xs text-zinc-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveNewEquipment}
                    className="px-4 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase"
                  >
                    Salvar Equipamento
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {state.equipment?.map(item => (
              <div key={item.id} className="p-4 rounded bg-[#0E1015] border border-zinc-800 space-y-2 relative group">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">{item.name}</h4>
                  </div>

                  <div className="flex items-center gap-1">
                    {item.highlight && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                    <button
                      onClick={() => {
                        if (confirm(`Excluir o equipamento "${item.name}"?`)) {
                          deleteEquipment(item.id);
                        }
                      }}
                      className="p-1 rounded bg-zinc-800 hover:bg-red-950/40 text-zinc-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-xs font-mono text-zinc-400 space-y-0.5 pt-1">
                  <div>⚡ {item.processor} • {item.ram}</div>
                  <div>💾 {item.storage}</div>
                  <div className="text-zinc-500 font-sans mt-1">🎯 {item.idealFor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: SERVICES */}
      {activeSubtab === 'services' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Serviços de TI & Suporte Corporativo
            </h3>
            <button
              onClick={() => setIsAddingService(!isAddingService)}
              className="px-3 py-1.5 rounded-sm bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Serviço</span>
            </button>
          </div>

          {isAddingService && (
            <div className="p-4 rounded-md bg-zinc-900 border border-zinc-700 space-y-3">
              <div className="text-xs font-bold text-white uppercase">Novo Serviço de TI</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Título do Serviço *</label>
                  <input
                    type="text"
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                    placeholder="Ex: Field Service & Troca Rápida"
                    className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Categoria</label>
                  <input
                    type="text"
                    value={newService.category}
                    onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Descrição</label>
                  <textarea
                    rows={2}
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsAddingService(false)}
                  className="px-3 py-1.5 rounded text-xs text-zinc-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveNewService}
                  className="px-4 py-1.5 rounded bg-red-600 text-white text-xs font-bold uppercase"
                >
                  Salvar Serviço
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {state.services?.map(s => (
              <div key={s.id} className="p-4 rounded bg-[#0E1015] border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{s.title}</span>
                  <button
                    onClick={() => {
                      if (confirm(`Excluir serviço "${s.title}"?`)) deleteService(s.id);
                    }}
                    className="p-1 text-zinc-500 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-zinc-400">{s.description}</p>
                {s.features && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {s.features.map((f, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: SEGMENTS */}
      {activeSubtab === 'segments' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Segmentos Atendidos pela Ouzze
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {state.segments?.map(seg => (
              <div key={seg.id} className="p-4 rounded bg-[#0E1015] border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{seg.title}</span>
                  <span className="text-[10px] font-mono text-red-400">{seg.subtitle}</span>
                </div>
                <p className="text-xs text-zinc-400">{seg.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: DOWNLOADS */}
      {activeSubtab === 'downloads' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Materiais Ricos & Manuais para Download
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {state.downloads?.map(d => (
              <div key={d.id} className="p-4 rounded bg-[#0E1015] border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{d.title}</span>
                  <span className="text-[10px] font-mono text-zinc-400">{d.fileSize}</span>
                </div>
                <p className="text-xs text-zinc-400">{d.description}</p>
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-red-400 truncate block">{d.url}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
