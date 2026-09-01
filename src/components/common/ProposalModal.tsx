import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, PhoneCall, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({ 
  isOpen, 
  onClose, 
  initialType = 'Locação' 
}) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [solutionType, setSolutionType] = useState('Locação');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialType) {
      if (initialType.toLowerCase().includes('compra') || initialType.toLowerCase().includes('venda')) {
        setSolutionType('Compra');
      } else if (initialType.toLowerCase().includes('serviço') || initialType.toLowerCase().includes('suporte')) {
        setSolutionType('Serviços');
      } else {
        setSolutionType('Locação');
      }
      if (initialType !== 'geral') {
        setMessage(`Interesse em: ${initialType}`);
      }
    }
  }, [initialType, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleWhatsApp = () => {
    const text = `*Solicitação de Proposta Rápida - Ouzze*%0A%0A` +
      `*Nome:* ${name}%0A` +
      `*Empresa:* ${company}%0A` +
      `*Telefone:* ${phone}%0A` +
      `*E-mail:* ${email}%0A` +
      `*Solução:* ${solutionType}%0A` +
      `*Detalhes:* ${message || 'Solicito contato comercial.'}`;

    window.open(`https://wa.me/${siteConfig.whatsapp.phone}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-lg bg-zinc-900 border border-white/10 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          id="modal-close-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-sm bg-black text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-sm bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Solicitação Recebida!</h3>
            <p className="text-sm text-zinc-300">
              Recebemos sua mensagem com sucesso. Um especialista em soluções corporativas da Ouzze responderá em breve.
            </p>
            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={handleWhatsApp}
                className="w-full py-3.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Conversar agora no WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-wider border border-white/10 cursor-pointer"
              >
                Concluir
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-2">
              <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                Proposta Comercial Rápida
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight uppercase">
                Fale com a Ouzze Tecnologia
              </h3>
              <p className="text-xs text-zinc-400">
                Receba um plano personalizado para sua empresa ou instituição.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Seu Nome *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome completo"
                  className="w-full px-3.5 py-2 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Nome da Empresa / Escola *</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Razão social ou nome fantasia"
                  className="w-full px-3.5 py-2 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3.5 py-2 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">E-mail *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@empresa.com.br"
                    className="w-full px-3.5 py-2 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Solução Principal *</label>
                <select
                  value={solutionType}
                  onChange={(e) => setSolutionType(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="Locação">Locação de Equipamentos</option>
                  <option value="Compra">Compra / Venda Corporativa</option>
                  <option value="Serviços">Suporte & Serviços de TI</option>
                  <option value="Educação">Soluções para Educação</option>
                  <option value="Não sei ainda">Ainda não sei (Preciso de consultoria)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Detalhes (Opcional)</label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Quantidade estimada de equipamentos, softwares necessários..."
                  className="w-full px-3.5 py-2 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider neon-glow-btn transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Solicitar Proposta Comercial</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
