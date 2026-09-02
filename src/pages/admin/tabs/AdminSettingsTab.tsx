import React, { useState, useRef } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import { isLocalAdminEnabled, LOCAL_DEV_ADMIN_EMAIL, computeSHA256 } from '../../../lib/localAdminAuth';
import {
  Settings,
  Phone,
  Mail,
  Share2,
  Globe,
  Database,
  Download,
  Upload,
  Shield,
  Check,
  AlertTriangle,
  Megaphone,
  KeyRound,
  Copy,
  Terminal
} from 'lucide-react';

export const AdminSettingsTab: React.FC = () => {
  const { state, updateSettings, updateAnnouncement, exportBackupJSON, importBackupJSON } = useCMS();
  const { settings, announcements } = state;
  const announcement = announcements?.[0];

  const [importStatus, setImportStatus] = useState<{ msg: string; error?: boolean } | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [generatedHash, setGeneratedHash] = useState<string | null>(null);
  const [hashCopied, setHashCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isLocalDevMode } = useAdminAuth();
  const isLocalEnabled = isLocalAdminEnabled();

  const handleGenerateHash = async () => {
    if (!newPasswordInput.trim()) return;
    const hash = await computeSHA256(newPasswordInput);
    setGeneratedHash(hash);
    setHashCopied(false);
  };

  const handleCopyHash = () => {
    if (generatedHash) {
      navigator.clipboard.writeText(generatedHash);
      setHashCopied(true);
      setTimeout(() => setHashCopied(false), 2000);
    }
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = await importBackupJSON(content);
        if (res.success) {
          setImportStatus({ msg: 'Backup importado com sucesso para o rascunho!' });
        } else {
          setImportStatus({ msg: res.message || 'Erro na importação', error: true });
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Settings className="w-5 h-5 text-red-500" />
            <span>Configurações Globais do Site</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Ajuste canais de contato, WhatsApp corporativo, SEO, dados fiscais e backups JSON.
          </p>
        </div>
      </div>

      {/* SECTION 1: ANNOUNCEMENT BAR */}
      <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-red-500" />
              <span>1. Barra de Aviso no Topo (Announcement Bar)</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Exiba avisos de urgência, promoções ou plantões técnicos no topo de todas as páginas.
            </p>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={announcement?.active || false}
              onChange={(e) => updateAnnouncement({ active: e.target.checked })}
              className="w-4 h-4 rounded text-red-600 bg-black border-zinc-700"
            />
            <span className="text-xs font-bold text-zinc-300">Barra Ativa</span>
          </label>
        </div>

        {announcement?.active && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono text-zinc-400 mb-1">Texto do Aviso</label>
              <input
                type="text"
                value={announcement.text || ''}
                onChange={(e) => updateAnnouncement({ text: e.target.value })}
                placeholder="Ex: Atendimento consultivo para locação de notebooks em todo o Brasil!"
                className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 mb-1">Texto do Botão / Link</label>
              <input
                type="text"
                value={announcement.linkText || ''}
                onChange={(e) => updateAnnouncement({ linkText: e.target.value })}
                placeholder="Ex: Falar com especialista"
                className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 mb-1">URL / Link de Destino</label>
              <input
                type="text"
                value={announcement.link || ''}
                onChange={(e) => updateAnnouncement({ link: e.target.value })}
                placeholder="Ex: #contato ou https://wa.me/..."
                className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: WHATSAPP CORPORATIVO */}
      <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <Phone className="w-4 h-4 text-emerald-400" />
          <span>2. Configuração do WhatsApp Comercial</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">
              Número com DDI e DDD (Apenas Números) *
            </label>
            <input
              type="text"
              value={settings.whatsapp?.phone || ''}
              onChange={(e) => updateSettings({
                whatsapp: { ...settings.whatsapp, phone: e.target.value.replace(/\D/g, '') }
              })}
              placeholder="Ex: 5511999999999"
              className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">
              Telefone Formatado para Exibição
            </label>
            <input
              type="text"
              value={settings.whatsapp?.formattedPhone || ''}
              onChange={(e) => updateSettings({
                whatsapp: { ...settings.whatsapp, formattedPhone: e.target.value }
              })}
              placeholder="Ex: (11) 99999-9999"
              className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">
              Mensagem Padrão de Início de Conversa
            </label>
            <input
              type="text"
              value={settings.whatsapp?.defaultMessage || ''}
              onChange={(e) => updateSettings({
                whatsapp: { ...settings.whatsapp, defaultMessage: e.target.value }
              })}
              placeholder="Ex: Olá! Gostaria de uma cotação para locação de computadores."
              className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: DADOS DE CONTATO & JURÍDICO */}
      <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-zinc-400" />
          <span>3. Dados Institucionais & Conformidade Legal (LGPD)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">Razão Social / Nome Legal</label>
            <input
              type="text"
              value={settings.legal?.companyLegalName || ''}
              onChange={(e) => updateSettings({
                legal: { ...settings.legal, companyLegalName: e.target.value }
              })}
              className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">CNPJ</label>
            <input
              type="text"
              value={settings.legal?.cnpj || ''}
              onChange={(e) => updateSettings({
                legal: { ...settings.legal, cnpj: e.target.value }
              })}
              className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">E-mail Principal</label>
            <input
              type="email"
              value={settings.contact?.email || ''}
              onChange={(e) => updateSettings({
                contact: { ...settings.contact, email: e.target.value }
              })}
              className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">Endereço / Sede</label>
            <input
              type="text"
              value={settings.contact?.address || ''}
              onChange={(e) => updateSettings({
                contact: { ...settings.contact, address: e.target.value }
              })}
              className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: REDES SOCIAIS */}
      <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <Share2 className="w-4 h-4 text-zinc-400" />
          <span>4. Links de Redes Sociais</span>
        </h3>
        <p className="text-xs text-zinc-400">
          Campos vazios não serão renderizados no rodapé do site.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">LinkedIn URL</label>
            <input
              type="text"
              value={settings.socials?.linkedin || ''}
              onChange={(e) => updateSettings({
                socials: { ...settings.socials, linkedin: e.target.value }
              })}
              placeholder="https://linkedin.com/company/ouzze"
              className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">Instagram URL</label>
            <input
              type="text"
              value={settings.socials?.instagram || ''}
              onChange={(e) => updateSettings({
                socials: { ...settings.socials, instagram: e.target.value }
              })}
              placeholder="https://instagram.com/ouzzesolucoes"
              className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">Facebook URL</label>
            <input
              type="text"
              value={settings.socials?.facebook || ''}
              onChange={(e) => updateSettings({
                socials: { ...settings.socials, facebook: e.target.value }
              })}
              placeholder="https://facebook.com/..."
              className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">YouTube URL</label>
            <input
              type="text"
              value={settings.socials?.youtube || ''}
              onChange={(e) => updateSettings({
                socials: { ...settings.socials, youtube: e.target.value }
              })}
              placeholder="https://youtube.com/..."
              className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {/* SECTION 5: BACKUP & RESTAURAÇÃO JSON */}
      <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-400" />
          <span>5. Exportação e Importação de Backup Completo</span>
        </h3>
        <p className="text-xs text-zinc-400">
          Exporte um snapshot completo do site em formato JSON para salvar ou migrar entre ambientes com segurança total.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={exportBackupJSON}
            className="px-4 py-2.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Baixar Backup Completo (JSON)</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileImport}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4 text-amber-400" />
            <span>Restaurar de Arquivo JSON</span>
          </button>
        </div>

        {importStatus && (
          <div className={`p-3 rounded text-xs flex items-center gap-2 ${
            importStatus.error ? 'bg-red-950 border border-red-800 text-red-300' : 'bg-emerald-950 border border-emerald-800 text-emerald-300'
          }`}>
            <span>{importStatus.msg}</span>
          </div>
        )}
      </div>

      {/* SECTION 6: SEGURANÇA & DESENVOLVIMENTO LOCAL */}
      <div className="bg-[#0E1015] border border-zinc-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-500" />
              <span>6. Segurança & Autenticação Local de Desenvolvimento</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Controle de acesso temporário para desenvolvimento e testes do painel CMS.
            </p>
          </div>

          <span className={`text-[11px] font-mono px-2.5 py-1 rounded border flex items-center gap-1.5 ${
            isLocalEnabled 
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
              : 'bg-zinc-800 border-zinc-700 text-zinc-400'
          }`}>
            <Terminal className="w-3.5 h-3.5" />
            <span>{isLocalEnabled ? 'Modo Local Ativo' : 'Desabilitado em Produção'}</span>
          </span>
        </div>

        <div className="p-4 rounded bg-black/60 border border-zinc-800 text-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-zinc-400 font-mono text-[11px]">E-mail autorizado:</span>
              <span className="ml-2 font-mono text-zinc-200">{LOCAL_DEV_ADMIN_EMAIL}</span>
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              Provedor atual: <span className="text-zinc-300">{isLocalDevMode ? 'local-dev (sessão temporária)' : 'supabase / padrão'}</span>
            </div>
          </div>

          <div className="border-t border-zinc-800/80 pt-3 space-y-2">
            <div className="flex items-center gap-2 text-zinc-200 font-semibold">
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>Alterar senha local de desenvolvimento</span>
            </div>
            
            <p className="text-zinc-400 text-xs leading-relaxed">
              Para alterar a senha local temporária, gere um novo hash e atualize a configuração de desenvolvimento em <code className="text-zinc-300 font-mono bg-zinc-900 px-1 py-0.5 rounded">src/lib/localAdminAuth.ts</code>. A senha original nunca é gravada em arquivos nem exposta no repositório Git.
            </p>

            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="password"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="Digite a nova senha desejada para gerar o hash..."
                  className="flex-1 px-3 py-2 rounded bg-zinc-900 border border-zinc-700 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
                />
                <button
                  type="button"
                  onClick={handleGenerateHash}
                  className="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Gerar Hash SHA-256
                </button>
              </div>

              {generatedHash && (
                <div className="p-3 rounded bg-zinc-900/90 border border-zinc-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-zinc-400">Hash SHA-256 gerado:</span>
                    <button
                      type="button"
                      onClick={handleCopyHash}
                      className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-mono"
                    >
                      {hashCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{hashCopied ? 'Copiado!' : 'Copiar Hash'}</span>
                    </button>
                  </div>
                  <div className="p-2 bg-black rounded font-mono text-[11px] text-amber-400 break-all border border-zinc-800 select-all">
                    {generatedHash}
                  </div>
                  <p className="text-[10px] text-zinc-500 italic">
                    Substitua o valor da constante <code className="text-zinc-400">LOCAL_DEV_ADMIN_HASH</code> em <code className="text-zinc-400">src/lib/localAdminAuth.ts</code> com este hash.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
