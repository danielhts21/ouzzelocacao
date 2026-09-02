import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Monitor, Tablet, Smartphone, X, ExternalLink } from 'lucide-react';

interface LivePreviewIframeProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const LivePreviewIframe: React.FC<LivePreviewIframeProps> = ({ onClose, children }) => {
  const { previewDevice, setPreviewDevice } = useCMS();

  const getDeviceWidth = () => {
    switch (previewDevice) {
      case 'mobile':
        return 'w-[390px] h-[844px]';
      case 'tablet':
        return 'w-[768px] h-[1024px]';
      case 'desktop':
      default:
        return 'w-full h-full';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col">
      
      {/* Top Preview Bar */}
      <div className="h-14 bg-zinc-900 border-b border-zinc-800 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Modo de Pré-visualização em Tempo Real (Rascunho)
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30 font-mono">
            Rascunho Ativo
          </span>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-2 bg-black/60 p-1 rounded-md border border-zinc-800">
          <button
            onClick={() => setPreviewDevice('desktop')}
            className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
              previewDevice === 'desktop' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setPreviewDevice('tablet')}
            className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
              previewDevice === 'tablet' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet (768px)</span>
          </button>
          <button
            onClick={() => setPreviewDevice('mobile')}
            className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
              previewDevice === 'mobile' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile (390px)</span>
          </button>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="p-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Frame Container */}
      <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-[#050608]">
        <div
          className={`${getDeviceWidth()} max-h-[95vh] bg-black border border-zinc-800 rounded-lg overflow-y-auto shadow-2xl transition-all duration-300`}
        >
          {children}
        </div>
      </div>

    </div>
  );
};
