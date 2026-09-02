import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Logo } from '../../components/common/Logo';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Database, Check } from 'lucide-react';

interface AdminLoginPageProps {
  onSuccess: () => void;
  onBackToSite: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccess, onBackToSite }) => {
  const { login, isLoading, isMockAuth } = useAdminAuth();
  const [email, setEmail] = useState('admin@ouzze.com.br');
  const [password, setPassword] = useState('ouzze2026');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const res = await login(email, password);
    if (res.success) {
      onSuccess();
    } else {
      setErrorMsg(res.error || 'Falha no login. Verifique as credenciais.');
    }
  };

  const handleQuickDemoLogin = async () => {
    setEmail('admin@ouzze.com.br');
    setPassword('ouzze2026');
    const res = await login('admin@ouzze.com.br', 'ouzze2026');
    if (res.success) {
      onSuccess();
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
          className="text-xs text-zinc-400 hover:text-white transition-colors border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 px-3.5 py-1.5 rounded-sm"
        >
          ← Voltar para o Site Público
        </button>
      </div>

      {/* Login Box */}
      <div className="w-full max-w-md my-auto z-10">
        <div className="bg-[#0E1015] border border-zinc-800/90 rounded-lg p-6 sm:p-8 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-sm bg-red-950/60 border border-red-600/30 text-red-500 flex items-center justify-center mx-auto mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
              Acesso ao Painel CMS
            </h1>
            <p className="text-xs text-zinc-400">
              Gerencie todo o conteúdo, catálogo, identidade e leads da Ouzze Tecnologia.
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
                  placeholder="admin@ouzze.com.br"
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
              <span>{isLoading ? 'Autenticando...' : 'Entrar no Painel'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Mode */}
          <div className="pt-4 border-t border-zinc-800/80 space-y-3">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span>Modo Proprietário Rápido:</span>
              <span className="text-emerald-400 font-mono">Pronto para Uso</span>
            </div>
            
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2 px-3 rounded-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>Entrar com Acesso Total (Owner)</span>
            </button>
          </div>

        </div>
      </div>

      {/* Footer / Compliance */}
      <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400 pt-6 z-10">
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-zinc-400" />
          <span>Segurança Supabase RLS & Criptografia Ponta a Ponta</span>
        </div>
        <div>
          <span>© {new Date().getFullYear()} Ouzze Tecnologia • CMS Pro</span>
        </div>
      </div>

    </div>
  );
};
