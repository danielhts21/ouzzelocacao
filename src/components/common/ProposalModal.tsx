import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, PhoneCall, ExternalLink, MessageSquare } from 'lucide-react';
import { Logo } from './Logo';
import { useCMS } from '../../context/CMSContext';

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
  const { state, submitLead } = useCMS();
  const { settings } = state;

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('SP');
  const [solutionType, setSolutionType] = useState('Locação');
  const [segment, setSegment] = useState('Empresas');
  const [estimatedQuantity, setEstimatedQuantity] = useState('1-10');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (initialType) {
      if (initialType.toLowerCase().includes('compra') || initialType.toLowerCase().includes('venda')) {
        setSolutionType('Compra');
      } else if (initialType.toLowerCase().includes('serviço') || initialType.toLowerCase().includes('suporte')) {
        setSolutionType('Serviços');
      } else if (initialType.toLowerCase().includes('educa')) {
        setSolutionType('Educação');
        setSegment('Educação');
      } else {
        setSolutionType('Locação');
      }
      if (initialType !== 'geral') {
        setMessage(`Interesse em: ${initialType}`);
      }
    }
  }, [initialType, isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const buildWhatsAppMessage = () => {
    return `*Solicitação de Proposta - Ouzze Tecnologia*\n\n` +
      `*Nome:* ${name}\n` +
      `*Empresa:* ${company}\n` +
      (cnpj ? `*CNPJ:* ${cnpj}\n` : '') +
      `*WhatsApp:* ${phone}\n` +
      `*E-mail:* ${email}\n` +
      (city ? `*Local:* ${city} - ${stateName}\n` : '') +
      `*Solução:* ${solutionType}\n` +
      `*Segmento:* ${segment}\n` +
      `*Qtd Estimada:* ${estimatedQuantity}\n` +
      `*Detalhes:* ${message || 'Gostaria de atendimento consultivo.'}`;
  };

  const getWhatsAppUrl = () => {
    const whatsappPhone = settings?.whatsapp?.phone || '5511999999999';
    const text = buildWhatsAppMessage();
    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Submit lead to CMS and Supabase database
      await submitLead(
        {
          name,
          company,
          cnpj,
          city,
          state: stateName,
          phone,
          email,
          solutionType,
          segment,
          estimatedQuantity,
          message
        },
        'modal_proposta',
        window.location.pathname
      );

      // 2. Open WhatsApp if phone is configured
      const url = getWhatsAppUrl();
      window.open(url, '_blank');
      setHasSubmitted(true);
    } catch (err) {
      console.error('Lead submission error:', err);
      // Fallback direct WhatsApp open
      const url = getWhatsAppUrl();
      window.open(url, '_blank');
      setHasSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppAgain = () => {
    const url = getWhatsAppUrl();
    window.open(url, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-lg rounded-lg bg-zinc-900 border border-white/10 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        
        {/* Close Button */}
        <button
          id="modal-close-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-sm bg-black text-zinc-400 hover:text-white border border-white/10 hover:border-red-600/40 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
          aria-label="Fechar janela"
        >
          <X className="w-4 h-4" />
        </button>

        {hasSubmitted ? (
          <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-sm bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            
            <div className="space-y-1">
              <h3 id="modal-title" className="text-xl font-bold text-white uppercase tracking-tight">
                Proposta Registrada com Sucesso!
              </h3>
              <p className="text-xs text-zinc-300">
                Sua solicitação foi salva em nosso sistema e direcionada para a equipe comercial no WhatsApp.
              </p>
            </div>

            <div className="p-3.5 rounded bg-black/60 border border-white/10 text-left text-xs font-mono text-zinc-300 space-y-1">
              <p><span className="text-zinc-500">Contato:</span> {name} ({company})</p>
              <p><span className="text-zinc-500">Solução:</span> {solutionType} • {segment}</p>
              <p><span className="text-zinc-500">Status:</span> Lead cadastrado no CMS</p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                id="modal-whatsapp-again-btn"
                onClick={handleWhatsAppAgain}
                className="w-full py-3.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Abrir WhatsApp Comercial</span>
              </button>
              
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-wider border border-white/10 cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
              >
                Fechar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5 space-y-2">
              <div className="mb-2">
                <Logo size="sm" />
              </div>
              <div className="inline-block px-2.5 py-0.5 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                Proposta Comercial Direta
              </div>
              <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight uppercase">
                Fale com a Ouzze Tecnologia
              </h3>
              <p className="text-xs text-zinc-400">
                Preencha para solicitar atendimento consultivo direto e proposta formal.
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
                  className="w-full px-3.5 py-2 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Empresa / Razão Social *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Nome da empresa"
                    className="w-full px-3.5 py-2 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">CNPJ (Opcional)</label>
                  <input
                    type="text"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    placeholder="00.000.000/0001-00"
                    className="w-full px-3.5 py-2 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">WhatsApp / Telefone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3.5 py-2 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">E-mail Corporativo *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contato@empresa.com.br"
                    className="w-full px-3.5 py-2 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Solução Principal *</label>
                  <select
                    value={solutionType}
                    onChange={(e) => setSolutionType(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Locação">Locação de Equipamentos</option>
                    <option value="Compra">Venda Corporativa</option>
                    <option value="Serviços">Suporte & Serviços de TI</option>
                    <option value="Educação">Soluções para Educação</option>
                    <option value="Outsourcing de Impressoras">Outsourcing de Impressoras</option>
                    <option value="Infraestrutura de Redes">Infraestrutura de Redes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Quantidade Estimada</label>
                  <select
                    value={estimatedQuantity}
                    onChange={(e) => setEstimatedQuantity(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors cursor-pointer"
                  >
                    <option value="1 a 5">1 a 5 equipamentos</option>
                    <option value="6 a 20">6 a 20 equipamentos</option>
                    <option value="21 a 50">21 a 50 equipamentos</option>
                    <option value="50+">Mais de 50 equipamentos</option>
                    <option value="Consultoria">Projeto / Sob demanda</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Detalhes da Necessidade</label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Configurações desejadas, prazo de início ou dúvidas..."
                  className="w-full px-3.5 py-2 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-sm bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider neon-glow-btn transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                >
                  <span>{isSubmitting ? 'Registrando proposta...' : 'Enviar Proposta & Abrir WhatsApp'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[10px] text-zinc-400 text-center font-normal pt-1">
                Conforme a LGPD, seus dados serão utilizados exclusivamente para elaboração da proposta solicitada.
              </p>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
