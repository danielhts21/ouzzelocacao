import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { isLocalAdminEnabled } from '../../lib/localAdminAuth';
import { Logo } from '../../components/common/Logo';
import { Lock, Mail, ArrowRight, AlertCircle, Database, ShieldAlert, Terminal } from 'lucide-react';

interface AdminLoginPageProps {
  onSuccess: () => void;
  onBackToSite: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccess, onBackToSite }) => {
  const { login, isLoading, isConfigured, isLocalDevMode } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isLocalDevAvailable = isLocalAdminEnabled();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg('Preencha o e-mail e a senha de acesso.');
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      onSuccess();
    } else {
      setErrorMsg(res.error || 'Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-zinc-100 flex flex-col justify-between items-center p-4 sm:p-6 relative overflow-hidden font-sans select-none">
      
      {/* Background Gradients & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f2430_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="w-full max-w-6xl flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Logo size="sm" />
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase hidden sm:inline">
            • CMS Gestão
          </span>
        </div>
        <button
          onClick={onBackToSite}
          className="text-xs text-zinc-400 hover:text-white transition-colors border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 px-3.5 py-1.5 rounded-sm cursor-pointer"
        >
          ← Voltar para o Site Público
        </button>
      </div>

      {/* Center Box */}
      <div className="w-full max-w-md my-auto z-10">
        <div className="bg-[#0E1015] border border-zinc-800/90 rounded-lg p-6 sm:p-8 shadow-2xl space-y-6">
          
          {!isConfigured ? (
            <div className="space-y-5 text-center">
              <div className="w-14 h-14 rounded-sm bg-amber-950/40 border border-amber-600/40 text-amber-400 flex items-center justify-center mx-auto">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                  CMS Não Configurado
                </h1>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  CMS administrativo ainda não configurado para produção.
                </p>
              </div>

              <div className="p-4 rounded-sm bg-zinc-900/90 border border-zinc-800 text-left text-xs space-y-2 text-zinc-300">
                <p className="font-semibold text-zinc-200">Requisitos para Ativação em Produção:</p>
                <ul className="list-disc list-inside text-zinc-400 space-y-1 text-[11px]">
                  <li>Configurar <code className="text-red-400 font-mono">VITE_SUPABASE_URL</code></li>
                  <li>Configurar <code className="text-red-400 font-mono">VITE_SUPABASE_ANON_KEY</code></li>
                  <li>Cadastrar credenciais na tabela <code className="text-zinc-200 font-mono">admin_users</code></li>
                </ul>
              </div>

              <button
                onClick={onBackToSite}
                className="w-full py-3 rounded-sm bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Voltar para o Site Público
              </button>
            </div>
          ) : (
            <>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-sm bg-red-950/60 border border-red-600/30 text-red-500 flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-6 h-6" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                  Acesso ao Painel CMS
                </h1>
                <p className="text-xs text-zinc-400">
                  Gerenciamento de conteúdo, catálogo e propostas da Ouzze Tecnologia.
                </p>

                {isLocalDevAvailable && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mt-2 rounded bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-400 font-mono">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Ambiente de Desenvolvimento Local</span>
                  </div>
                )}
              </div>

              {errorMsg && (
                <div className="p-3 rounded-sm bg-red-950/50 border border-red-600/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    E-mail
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu-email@dominio.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-sm bg-black border border-zinc-700 text-white text-sm focus:border-red-600 focus-visible:ring-1 focus-visible:ring-red-600 focus:outline-none transition-colors"
                      autoComplete="username"
                    />
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-sm bg-black border border-zinc-700 text-white text-sm focus:border-red-600 focus-visible:ring-1 focus-visible:ring-red-600 focus:outline-none transition-colors"
                      autoComplete="current-password"
                    />
                    <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-sm bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] cursor-pointer"
                >
                  <span>{isLoading ? 'Verificando...' : 'Entrar'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {/* Diagnóstico SOMENTE em DEV - removido no build de produção */}
          {import.meta.env.DEV && (
            <div className="p-3 rounded bg-zinc-950/80 border border-zinc-800/90 text-[11px] font-mono space-y-1.5">
              <div className="text-zinc-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5 pb-1 border-b border-zinc-800">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>Diagnóstico de Ambiente</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>DEV:</span>
                <span className="text-zinc-200">{String(Boolean(import.meta.env.DEV))}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>PROD:</span>
                <span className="text-zinc-200">{String(Boolean(import.meta.env.PROD))}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Hostname:</span>
                <span className="text-zinc-200 truncate max-w-[220px]" title={typeof window !== 'undefined' ? window.location.hostname : ''}>
                  {typeof window !== 'undefined' ? window.location.hostname : ''}
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Local Admin Enabled:</span>
                <span className={isLocalDevAvailable ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                  {String(isLocalDevAvailable)}
                </span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Footer Info */}
      <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400 pt-6 z-10">
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-zinc-400" />
          <span>Ouzze Tecnologia • CMS Multi-Provider (Dev / Supabase)</span>
        </div>
        <div>
          <span>© {new Date().getFullYear()} Ouzze Tecnologia • Painel Administrativo</span>
        </div>
      </div>

    </div>
  );
};
