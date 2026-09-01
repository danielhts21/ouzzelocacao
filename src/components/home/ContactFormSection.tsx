import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Send, 
  CheckCircle2, 
  Building, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  HelpCircle,
  FileCheck,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { ProposalFormData } from '../../types';
import { siteConfig } from '../../config/siteConfig';

interface ContactFormSectionProps {
  initialSolution?: string;
  onSuccess?: () => void;
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({ 
  initialSolution = 'Locação',
  onSuccess
}) => {
  const [formData, setFormData] = useState<ProposalFormData>({
    name: '',
    company: '',
    cnpj: '',
    city: '',
    state: 'SP',
    phone: '',
    email: '',
    solutionType: (initialSolution as any) || 'Locação',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate reliable submission feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    }, 1000);
  };

  const handleWhatsAppDirect = () => {
    const text = `*Solicitação de Proposta - Ouzze Tecnologia*%0A%0A` +
      `*Nome:* ${formData.name}%0A` +
      `*Empresa:* ${formData.company}%0A` +
      (formData.cnpj ? `*CNPJ:* ${formData.cnpj}%0A` : '') +
      `*Local:* ${formData.city}/${formData.state}%0A` +
      `*Telefone:* ${formData.phone}%0A` +
      `*E-mail:* ${formData.email}%0A` +
      `*Solução:* ${formData.solutionType}%0A` +
      `*Necessidade:* ${formData.message || 'Gostaria de atendimento consultivo.'}`;

    window.open(`https://wa.me/${siteConfig.whatsapp.phone}?text=${text}`, '_blank');
  };

  return (
    <section 
      id="contato" 
      className="py-20 bg-black text-white relative border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: INFORMATION & VALUE */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
              Atendimento Corporativo
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Solicite uma proposta sob medida para sua empresa.
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Preencha o formulário com os detalhes da sua necessidade. Nossos especialistas técnicos entrarão em contato com uma cotação transparente e ajustada à sua realidade operacional.
            </p>

            <div className="p-6 rounded-lg bg-zinc-900 border border-white/10 space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                O que você recebe:
              </h4>

              <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Dimensionamento técnico sem custos ou compromisso.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Opções de prazos contratuais e modelos fiscais (OPEX vs CAPEX).</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>SLA documentado com garantia de troca de peças expressa.</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs text-zinc-400 mb-2">Prefere falar instantaneamente por mensagem?</p>
              <a
                href={`https://wa.me/${siteConfig.whatsapp.phone}?text=${encodeURIComponent(siteConfig.whatsapp.defaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-emerald-400 text-xs font-bold uppercase tracking-wider transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp: {siteConfig.whatsapp.formattedPhone}</span>
              </a>
            </div>
          </div>

          {/* RIGHT: PROFESSIONAL B2B FORM */}
          <div className="lg:col-span-7">
            <div className="rounded-lg bg-zinc-900 border border-white/10 p-6 sm:p-10 shadow-2xl relative">
              
              {isSuccess ? (
                <div className="text-center py-12 space-y-5 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-sm bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Solicitação enviada com sucesso!</h3>
                  <p className="text-zinc-300 text-sm max-w-md mx-auto">
                    Agradecemos seu contato. Um consultor corporativo da Ouzze Tecnologia entrará em contato em breve através do e-mail ou telefone informado.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="w-full sm:w-auto px-5 py-3 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Agilizar pelo WhatsApp</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          name: '',
                          company: '',
                          cnpj: '',
                          city: '',
                          state: 'SP',
                          phone: '',
                          email: '',
                          solutionType: 'Locação',
                          message: ''
                        });
                      }}
                      className="w-full sm:w-auto px-5 py-3 rounded-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-wider border border-white/10 cursor-pointer"
                    >
                      Enviar outra solicitação
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Row 1: Nome & Empresa */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        Nome Completo *
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Carlos Silva"
                        className="w-full px-3.5 py-2.5 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        Empresa / Instituição *
                      </label>
                      <input
                        id="form-company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Ex: Alfa Logística S/A"
                        className="w-full px-3.5 py-2.5 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: CNPJ (Opcional) & Tipo de Solução */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        CNPJ (Opcional)
                      </label>
                      <input
                        id="form-cnpj"
                        type="text"
                        value={formData.cnpj}
                        onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                        placeholder="00.000.000/0001-00"
                        className="w-full px-3.5 py-2.5 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        Tipo de Solução *
                      </label>
                      <select
                        id="form-solution-type"
                        value={formData.solutionType}
                        onChange={(e) => setFormData({ ...formData, solutionType: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Locação">Locação de Equipamentos</option>
                        <option value="Compra">Compra / Vendas Corporativas</option>
                        <option value="Serviços">Serviços / Suporte de TI</option>
                        <option value="Não sei ainda">Não sei ainda (Preciso de consultoria)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Cidade & Estado */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        Cidade *
                      </label>
                      <input
                        id="form-city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Ex: São Paulo"
                        className="w-full px-3.5 py-2.5 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        Estado (UF) *
                      </label>
                      <select
                        id="form-state"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none transition-colors cursor-pointer"
                      >
                        {brazilianStates.map((uf) => (
                          <option key={uf} value={uf}>{uf}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Telefone / WhatsApp & E-mail */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        id="form-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(11) 99999-9999"
                        className="w-full px-3.5 py-2.5 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        E-mail Corporativo *
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nome@empresa.com.br"
                        className="w-full px-3.5 py-2.5 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 5: Mensagem */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      Necessidade (quantidade de máquinas, prazo, etc.)
                    </label>
                    <textarea
                      id="form-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ex: Precisamos locar 25 notebooks corporativos e 2 impressoras para um projeto de 12 meses..."
                      className="w-full px-3.5 py-2.5 rounded-sm bg-black border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      id="form-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider neon-glow-btn transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Enviar solicitação de proposta</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-zinc-500 text-center font-mono">
                    🔒 Seus dados estão seguros e protegidos em conformidade com a LGPD.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
