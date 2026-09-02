import React, { useState, useRef } from 'react';
import { useCMS } from '../../../context/CMSContext';
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Copy,
  Check,
  Search,
  ExternalLink,
  ShieldAlert,
  FileText
} from 'lucide-react';
import { uploadBrandAsset } from '../../../lib/supabase';
import { MediaAsset } from '../../../types/cms';

export const AdminMediaTab: React.FC = () => {
  const { state, addMediaAsset, deleteMediaAsset } = useCMS();
  const [search, setSearch] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mediaList = (state.mediaAssets || []).filter(m =>
    m.originalName.toLowerCase().includes(search.toLowerCase()) ||
    (m.altText && m.altText.toLowerCase().includes(search.toLowerCase()))
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadBrandAsset(file, 'general');
      if (res.success && res.url) {
        const newAsset: MediaAsset = {
          id: `media-${Date.now()}`,
          name: file.name,
          url: res.url,
          originalName: file.name,
          fileType: file.type,
          size: file.size,
          altText: file.name,
          isDecorative: false,
          tags: [],
          usageLocations: [],
          createdAt: new Date().toISOString()
        };
        addMediaAsset(newAsset);
      }
    } catch (err) {
      console.error('Media upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (asset: MediaAsset) => {
    const res = deleteMediaAsset(asset.id);
    if (!res.success && res.message) {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-red-500" />
            <span>Biblioteca de Mídia & Arquivos Originais</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Gerencie fotos de equipamentos, logotipos, ícones e documentos sem recompressão destrutiva.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2 rounded-sm bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'Enviando...' : 'Enviar Arquivo'}</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-[#0E1015] p-3 rounded-md border border-zinc-800">
        <Search className="w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome do arquivo ou texto alternativo..."
          className="bg-transparent border-0 text-xs text-white placeholder:text-zinc-500 focus:outline-none w-full"
        />
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaList.map(asset => (
          <div key={asset.id} className="bg-[#0E1015] border border-zinc-800 rounded-lg overflow-hidden group space-y-2 pb-3">
            {/* Preview Box */}
            <div className="h-32 bg-black flex items-center justify-center p-3 relative overflow-hidden">
              <img
                src={asset.url}
                alt={asset.altText || asset.originalName}
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1 right-1 text-[9px] font-mono px-1.5 py-0.2 bg-black/80 text-zinc-400 rounded">
                {(asset.size / 1024).toFixed(0)} KB
              </span>
            </div>

            {/* Info */}
            <div className="px-3 space-y-1">
              <div className="text-xs font-bold text-white truncate" title={asset.originalName}>
                {asset.originalName}
              </div>
              <div className="text-[10px] font-mono text-zinc-400 truncate">
                {asset.fileType}
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between border-t border-zinc-800/80">
                <button
                  onClick={() => handleCopy(asset.url, asset.id)}
                  className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1"
                  title="Copiar URL"
                >
                  {copiedId === asset.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar URL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(asset)}
                  className="p-1 text-zinc-500 hover:text-red-400"
                  title="Excluir"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
