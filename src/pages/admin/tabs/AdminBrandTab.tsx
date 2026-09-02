import React, { useState, useRef } from 'react';
import { useCMS } from '../../../context/CMSContext';
import {
  Palette,
  Upload,
  Check,
  RotateCcw,
  Sparkles,
  Type,
  Maximize2,
  ShieldAlert,
  Info,
  Sliders,
  Sun,
  Moon,
  Eye
} from 'lucide-react';
import { Logo } from '../../../components/common/Logo';
import { uploadBrandAsset } from '../../../lib/supabase';
import { BrandDesignTokens } from '../../../types/cms';

export const AdminBrandTab: React.FC = () => {
  const { state, updateSettings, updateBrandTokens, restoreDefaultBrandTokens } = useCMS();
  const { settings, brandTokens } = state;

  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [logoUploadMsg, setLogoUploadMsg] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  const handleLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      alert('Formato inválido. Por favor envie SVG, PNG, JPG ou WebP.');
      return;
    }

    setUploadingLogo(true);
    setLogoUploadMsg('Fazendo upload com preservação de fidelidade original...');

    try {
      const result = await uploadBrandAsset(file, 'logo');
      if (result.success && result.url) {
        updateSettings({
          logoUrl: result.url,
          logoOriginalMeta: {
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type,
            uploadedAt: new Date().toISOString(),
            storagePath: result.path
          }
        });
        setLogoUploadMsg('Logo atualizado com sucesso! O arquivo original está preservado.');
      } else {
        setLogoUploadMsg(result.error || 'Erro ao fazer upload do arquivo.');
      }
    } catch (err: any) {
      setLogoUploadMsg(err?.message || 'Falha no processamento.');
    } finally {
      setUploadingLogo(false);
      setTimeout(() => setLogoUploadMsg(null), 4000);
    }
  };

  const handleFaviconFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFavicon(true);
    try {
      const result = await uploadBrandAsset(file, 'favicon');
      if (result.success && result.url) {
        updateSettings({ faviconUrl: result.url });
        // Also update the document head favicon
        const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (link) link.href = result.url;
      }
    } catch (err) {
      console.error('Favicon error:', err);
    } finally {
      setUploadingFavicon(false);
    }
  };

  const colorPresets: { name: string; preset: BrandDesignTokens['preset']; colors: typeof brandTokens.colors }[] = [
    {
      name: 'Ouzze Vermelho Oficial (Padrão)',
      preset: 'OUZZE_PREMIUM',
      colors: {
        primary: '#DC2626',
        primaryHover: '#B91C1C',
        secondary: '#EF4444',
        accent: '#991B1B',
        bgDark: '#0B0D12',
        bgLight: '#11141D',
        textPrimary: '#F8FAFC',
        textMuted: '#94A3B8',
        border: 'rgba(255, 255, 255, 0.1)',
        surface: 'rgba(17, 20, 29, 0.8)',
        surfaceHover: 'rgba(25, 30, 44, 0.9)'
      }
    },
    {
      name: 'Ouzze Cyber Neon',
      preset: 'CUSTOM',
      colors: {
        primary: '#FF1744',
        primaryHover: '#D50000',
        secondary: '#FF5252',
        accent: '#B71C1C',
        bgDark: '#050608',
        bgLight: '#0E1015',
        textPrimary: '#FFFFFF',
        textMuted: '#A1A1AA',
        border: 'rgba(255, 23, 68, 0.2)',
        surface: 'rgba(14, 16, 21, 0.9)',
        surfaceHover: 'rgba(24, 28, 38, 0.95)'
      }
    },
    {
      name: 'High Contrast Corporate',
      preset: 'OUZZE_DARK',
      colors: {
        primary: '#E11D48',
        primaryHover: '#BE123C',
        secondary: '#F43F5E',
        accent: '#881337',
        bgDark: '#000000',
        bgLight: '#121212',
        textPrimary: '#FFFFFF',
        textMuted: '#CBD5E1',
        border: 'rgba(255, 255, 255, 0.18)',
        surface: '#121212',
        surfaceHover: '#1E1E1E'
      }
    },
    {
      name: 'Stealth Minimalist',
      preset: 'OUZZE_MINIMAL',
      colors: {
        primary: '#C53030',
        primaryHover: '#9B2C2C',
        secondary: '#E53E3E',
        accent: '#742A2A',
        bgDark: '#0A0A0A',
        bgLight: '#141414',
        textPrimary: '#EDEDED',
        textMuted: '#737373',
        border: 'rgba(255, 255, 255, 0.08)',
        surface: '#141414',
        surfaceHover: '#1F1F1F'
      }
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Palette className="w-5 h-5 text-red-500" />
            <span>Identidade Visual, Logo & Design Tokens</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Controle a marca, tipografia, cores, intensidade do neon e arquivos originais sem alterar código.
          </p>
        </div>

        <button
          onClick={restoreDefaultBrandTokens}
          className="px-3 py-1.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-medium flex items-center gap-1.5 self-start cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
          <span>Restaurar Padrão Ouzze</span>
        </button>
      </div>

      {/* SECTION 1: LOGO & ASSETS (WITH ABSOLUTE FIDELITY RULES) */}
      <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-6 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              1. Gerenciamento do Logo Oficial (Regra de Fidelidade Rigorosa)
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono">
              Fidelidade 100%
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            O logo é renderizado em container seguro com <code className="text-red-400 font-mono">object-fit: contain</code> sem distorções, recortes ou filtros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Logo Preview Box */}
          <div className="p-6 rounded-lg bg-black border border-zinc-800/80 space-y-4">
            <div className="text-[11px] font-mono text-zinc-400 uppercase">Pré-visualização em Fundo Escuro Real:</div>
            
            <div className="h-28 flex items-center justify-center p-4 bg-[#08090C] rounded border border-zinc-800/60 overflow-hidden">
              <Logo size="lg" customUrl={settings.logoUrl} />
            </div>

            {settings.logoOriginalMeta && (
              <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800 text-[11px] font-mono text-zinc-400 space-y-0.5">
                <div><span className="text-zinc-500">Arquivo:</span> {settings.logoOriginalMeta.fileName}</div>
                <div><span className="text-zinc-500">Formato:</span> {settings.logoOriginalMeta.mimeType}</div>
                <div><span className="text-zinc-500">Tamanho:</span> {(settings.logoOriginalMeta.fileSize / 1024).toFixed(1)} KB</div>
              </div>
            )}
          </div>

          {/* Logo Upload & Container Settings */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2">
                Substituir Arquivo de Logo (Original)
              </label>
              
              <input
                type="file"
                ref={logoInputRef}
                onChange={handleLogoFileChange}
                accept=".svg,.png,.jpg,.jpeg,.webp"
                className="hidden"
              />

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={uploadingLogo}
                  onClick={() => logoInputRef.current?.click()}
                  className="px-4 py-2.5 rounded-sm bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>{uploadingLogo ? 'Enviando...' : 'Fazer Upload do Logo'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => updateSettings({ logoUrl: '/logo.svg', logoOriginalMeta: undefined })}
                  className="px-3.5 py-2.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-medium"
                >
                  Usar Logo Padrão SVG
                </button>
              </div>

              {logoUploadMsg && (
                <div className="mt-2 text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>{logoUploadMsg}</span>
                </div>
              )}
            </div>

            {/* Direct URL option */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                Ou informe a URL direta da imagem:
              </label>
              <input
                type="text"
                value={settings.logoUrl || ''}
                onChange={(e) => updateSettings({ logoUrl: e.target.value })}
                placeholder="https://... ou /logo.svg"
                className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none"
              />
            </div>

            {/* Favicon Upload */}
            <div className="pt-4 border-t border-zinc-800">
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                Favicon do Site (.ico, .png, .svg)
              </label>
              <input
                type="file"
                ref={faviconInputRef}
                onChange={handleFaviconFileChange}
                accept=".ico,.png,.svg"
                className="hidden"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={uploadingFavicon}
                  onClick={() => faviconInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-medium flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingFavicon ? 'Enviando...' : 'Alterar Favicon'}</span>
                </button>
                <span className="text-[11px] text-zinc-400 truncate max-w-xs">{settings.faviconUrl}</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* SECTION 2: PALETA DE CORES & PRESETS */}
      <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-6 space-y-6">
        <div className="space-y-1">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            2. Paleta de Cores e Temas da Marca
          </h3>
          <p className="text-xs text-zinc-400">
            Escolha um tema pronto ou personalize os tons exatos aplicados em todo o portal.
          </p>
        </div>

        {/* Theme Presets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {colorPresets.map(preset => {
            const isCurrent = brandTokens.preset === preset.preset;
            return (
              <button
                key={preset.preset}
                onClick={() => {
                  updateBrandTokens({
                    preset: preset.preset,
                    colors: preset.colors
                  });
                }}
                className={`p-3.5 rounded-md border text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-zinc-800/90 border-red-500 ring-1 ring-red-500'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white">{preset.name}</span>
                  {isCurrent && <Check className="w-3.5 h-3.5 text-red-500" />}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: preset.colors.primary }} />
                  <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: preset.colors.secondary }} />
                  <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: preset.colors.bgDark }} />
                  <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: preset.colors.surface }} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom Color Pickers */}
        <div className="pt-4 border-t border-zinc-800 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Primária (CTA)</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brandTokens.colors.primary}
                onChange={(e) => updateBrandTokens({ colors: { ...brandTokens.colors, primary: e.target.value } })}
                className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
              />
              <span className="text-xs font-mono text-zinc-300">{brandTokens.colors.primary}</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Primária Hover</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brandTokens.colors.primaryHover}
                onChange={(e) => updateBrandTokens({ colors: { ...brandTokens.colors, primaryHover: e.target.value } })}
                className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
              />
              <span className="text-xs font-mono text-zinc-300">{brandTokens.colors.primaryHover}</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Secundária</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brandTokens.colors.secondary}
                onChange={(e) => updateBrandTokens({ colors: { ...brandTokens.colors, secondary: e.target.value } })}
                className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
              />
              <span className="text-xs font-mono text-zinc-300">{brandTokens.colors.secondary}</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Fundo Principal</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brandTokens.colors.bgDark}
                onChange={(e) => updateBrandTokens({ colors: { ...brandTokens.colors, bgDark: e.target.value } })}
                className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
              />
              <span className="text-xs font-mono text-zinc-300">{brandTokens.colors.bgDark}</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Texto Principal</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brandTokens.colors.textPrimary}
                onChange={(e) => updateBrandTokens({ colors: { ...brandTokens.colors, textPrimary: e.target.value } })}
                className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
              />
              <span className="text-xs font-mono text-zinc-300">{brandTokens.colors.textPrimary}</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Texto Suave</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brandTokens.colors.textMuted}
                onChange={(e) => updateBrandTokens({ colors: { ...brandTokens.colors, textMuted: e.target.value } })}
                className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
              />
              <span className="text-xs font-mono text-zinc-300">{brandTokens.colors.textMuted}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: NEON & ILUMINAÇÃO CYBER */}
      <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span>3. Efeitos Neon & Brilho Corporativo</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Controle a atmosfera luminosa da marca Ouzze nos botões, cards e divisores.
            </p>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={brandTokens.neon.enabled}
              onChange={(e) => updateBrandTokens({ neon: { ...brandTokens.neon, enabled: e.target.checked } })}
              className="w-4 h-4 rounded text-red-600 bg-black border-zinc-700"
            />
            <span className="text-xs font-bold text-zinc-300">Ativar Efeitos Neon</span>
          </label>
        </div>

        {brandTokens.neon.enabled && (
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-zinc-300">Intensidade do Brilho:</label>
                <span className="text-xs font-mono text-red-400">{brandTokens.neon.intensity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={brandTokens.neon.intensity}
                onChange={(e) => updateBrandTokens({ neon: { ...brandTokens.neon, intensity: Number(e.target.value) } })}
                className="w-full accent-red-600"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <label className="p-3 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-between cursor-pointer">
                <span className="text-xs text-zinc-300">Glow no Hero</span>
                <input
                  type="checkbox"
                  checked={brandTokens.neon.heroGlow}
                  onChange={(e) => updateBrandTokens({ neon: { ...brandTokens.neon, heroGlow: e.target.checked } })}
                  className="w-4 h-4 rounded text-red-600 bg-black border-zinc-700"
                />
              </label>

              <label className="p-3 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-between cursor-pointer">
                <span className="text-xs text-zinc-300">Glow em Botões</span>
                <input
                  type="checkbox"
                  checked={brandTokens.neon.buttonGlow}
                  onChange={(e) => updateBrandTokens({ neon: { ...brandTokens.neon, buttonGlow: e.target.checked } })}
                  className="w-4 h-4 rounded text-red-600 bg-black border-zinc-700"
                />
              </label>

              <label className="p-3 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-between cursor-pointer">
                <span className="text-xs text-zinc-300">Glow em Cards</span>
                <input
                  type="checkbox"
                  checked={brandTokens.neon.cardGlow}
                  onChange={(e) => updateBrandTokens({ neon: { ...brandTokens.neon, cardGlow: e.target.checked } })}
                  className="w-4 h-4 rounded text-red-600 bg-black border-zinc-700"
                />
              </label>

              <label className="p-3 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-between cursor-pointer">
                <span className="text-xs text-zinc-300">Glow em Linhas</span>
                <input
                  type="checkbox"
                  checked={brandTokens.neon.lineGlow}
                  onChange={(e) => updateBrandTokens({ neon: { ...brandTokens.neon, lineGlow: e.target.checked } })}
                  className="w-4 h-4 rounded text-red-600 bg-black border-zinc-700"
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: TIPOGRAFIA & ESPAÇAMENTOS */}
      <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-6 space-y-6">
        <div className="space-y-1">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Type className="w-4 h-4 text-red-500" />
            <span>4. Tipografia e Arredondamento (Border Radius)</span>
          </h3>
          <p className="text-xs text-zinc-400">
            Ajuste a família de fontes e o estilo de cantos dos componentes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">
              Fonte dos Títulos (Heading)
            </label>
            <select
              value={brandTokens.typography.headingFont}
              onChange={(e) => updateBrandTokens({ typography: { ...brandTokens.typography, headingFont: e.target.value } })}
              className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none"
            >
              <option value="Plus Jakarta Sans">Plus Jakarta Sans (Padrão)</option>
              <option value="Outfit">Outfit</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Poppins">Poppins</option>
              <option value="Manrope">Manrope</option>
              <option value="Inter">Inter</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">
              Fonte do Corpo de Texto (Body)
            </label>
            <select
              value={brandTokens.typography.bodyFont}
              onChange={(e) => updateBrandTokens({ typography: { ...brandTokens.typography, bodyFont: e.target.value } })}
              className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white focus:border-red-500 focus:outline-none"
            >
              <option value="Plus Jakarta Sans">Plus Jakarta Sans (Padrão)</option>
              <option value="Inter">Inter</option>
              <option value="DM Sans">DM Sans</option>
              <option value="Roboto">Roboto</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-zinc-400">Arredondamento Base:</label>
              <span className="text-xs font-mono text-zinc-300">{brandTokens.style.borderRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              value={brandTokens.style.borderRadius}
              onChange={(e) => updateBrandTokens({ style: { ...brandTokens.style, borderRadius: Number(e.target.value) } })}
              className="w-full accent-red-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-zinc-400">Cantos de Botões:</label>
              <span className="text-xs font-mono text-zinc-300">{brandTokens.style.buttonRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={brandTokens.style.buttonRadius}
              onChange={(e) => updateBrandTokens({ style: { ...brandTokens.style, buttonRadius: Number(e.target.value) } })}
              className="w-full accent-red-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-zinc-400">Cantos de Cards:</label>
              <span className="text-xs font-mono text-zinc-300">{brandTokens.style.cardRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              value={brandTokens.style.cardRadius}
              onChange={(e) => updateBrandTokens({ style: { ...brandTokens.style, cardRadius: Number(e.target.value) } })}
              className="w-full accent-red-600"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
