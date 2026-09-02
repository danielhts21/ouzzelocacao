import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Logo } from '../../components/common/Logo';
import { Lock, Mail, ArrowRight, AlertCircle, Database, ShieldAlert } from 'lucide-react';

interface AdminLoginPageProps {
  onSuccess: () => void;
  onBackToSite: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccess, onBackToSite }) => {
  const { login, isLoading, isConfigured } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg('Preencha o e-mail e a senha cadastrados.');
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
    <div className="min-h-screen bg-[#07080B] text-zinc-100 flex flex-col justify-between items-center p-4 sm:p-6 relative overflow-hidden font-sans">
      
      {/* Subtle red background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <div className="w-full max-w-6xl flex items-center justify-between z-10">
        <div className="flex items-center">
          <Logo size="md" />
        </div>
        <button
          onClick={onBackToSite}
          className="text-xs text-zinc-400 hover:text-white transition-colors border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 px-3.5 py-1.5 rounded-sm cursor-pointer"
        >
          ← Voltar para o Site Público
        </button>
      </div>

      {/* Login Box */}
      <div className="w-full max-w-md my-auto z-10">
        <div className="bg-[#0E1015] border border-zinc-800/90 rounded-lg p-6 sm:p-8 shadow-2xl space-y-6">
          
          {!isConfigured ? (
            <div className="space-y-5 text-center">
              <div className="w-14 h-14 rounded-sm bg-amber-950/40 border border-amber-600/40 text-amber-400 flex items-center justify-center mx-auto">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                  CMS não configurado
                </h1>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  A integração de segurança e persistência em banco de dados Supabase não está ativa.
                </p>
              </div>

              <div className="p-4 rounded-sm bg-zinc-900/90 border border-zinc-800 text-left text-xs space-y-2 text-zinc-300">
                <p className="font-semibold text-zinc-200">Requisitos para Ativação do Painel:</p>
                <ul className="list-disc list-inside text-zinc-400 space-y-1 text-[11px]">
                  <li>Definir <code className="text-red-400 font-mono">VITE_SUPABASE_URL</code></li>
                  <li>Definir <code className="text-red-400 font-mono">VITE_SUPABASE_ANON_KEY</code></li>
                  <li>Executar as migrações SQL com a tabela <code className="text-zinc-200 font-mono">admin_users</code></li>
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
                  Autenticação obrigatória e verificação de perfil administrativo (RLS).
                </p>
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
                    E-mail Administrativo
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu-email@ouzze.com.br"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-sm bg-black border border-zinc-700 text-white text-sm focus:border-red-600 focus-visible:ring-1 focus-visible:ring-red-600 focus:outline-none transition-colors"
                    />
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Senha de Acesso
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-sm bg-black border border-zinc-700 text-white text-sm focus:border-red-600 focus-visible:ring-1 focus-visible:ring-red-600 focus:outline-none transition-colors"
                    />
                    <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-sm bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] cursor-pointer"
                >
                  <span>{isLoading ? 'Verificando credenciais...' : 'Entrar no Painel'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

        </div>
      </div>

      {/* Footer / Compliance */}
      <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400 pt-6 z-10">
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-zinc-400" />
          <span>Segurança Supabase RLS & Autenticação Baseada em Perfis (admin_users)</span>
        </div>
        <div>
          <span>© {new Date().getFullYear()} Ouzze Tecnologia • CMS Pro</span>
        </div>
      </div>

    </div>
  );
};
