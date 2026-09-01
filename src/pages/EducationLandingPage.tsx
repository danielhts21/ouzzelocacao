import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Monitor, 
  Laptop, 
  Tablet, 
  Printer, 
  Wifi, 
  ShieldCheck, 
  Check, 
  ArrowLeft, 
  Send, 
  PhoneCall, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { EDUCATION_PAGE_DATA } from '../data/siteData';
import { siteConfig } from '../config/siteConfig';

interface EducationLandingPageProps {
  onBackToHome: () => void;
  onOpenProposal: (type?: string) => void;
}

export const EducationLandingPage: React.FC<EducationLandingPageProps> = ({ 
  onBackToHome, 
  onOpenProposal 
}) => {
  const [schoolName, setSchoolName] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studentCount, setStudentCount] = useState('100 a 500');
  const [interestArea, setInterestArea] = useState('Laboratório de Informática');
  const [notes, setNotes] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const getSolutionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor':
        return <Monitor className="w-6 h-6 text-red-500" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6 text-red-500" />;
      case 'Tablet':
        return <Tablet className="w-6 h-6 text-red-500" />;
      case 'Printer':
        return <Printer className="w-6 h-6 text-red-500" />;
      case 'Wifi':
        return <Wifi className="w-6 h-6 text-red-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-red-500" />;
      default:
        return <GraduationCap className="w-6 h-6 text-red-500" />;
    }
  };

  const buildEducationWhatsAppMessage = () => {
    return `*Contato Ouzze Educação*\n\n` +
      `*Instituição:* ${schoolName}\n` +
      `*Responsável:* ${responsibleName}\n` +
      `*WhatsApp:* ${phone}\n` +
      `*E-mail:* ${email}\n` +
      `*Porte Estimado:* ${studentCount}\n` +
      `*Área de Interesse:* ${interestArea}\n` +
      `*Observações:* ${notes || 'Gostaria de atendimento consultivo para minha instituição de ensino.'}`;
  };

  const getWhatsAppEducationUrl = () => {
    const text = buildEducationWhatsAppMessage();
    return `https://wa.me/${siteConfig.whatsapp.phone}?text=${encodeURIComponent(text)}`;
  };

  const handleSchoolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getWhatsAppEducationUrl();
    window.open(url, '_blank');
    setHasSubmitted(true);
  };

  const handleOpenEducationWhatsAppAgain = () => {
    const url = getWhatsAppEducationUrl();
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Top Breadcrumb / Return */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          id="btn-back-home"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a página inicial</span>
        </button>
      </div>

      {/* Hero Section - Educação */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            Divisão Educacional Ouzze
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12]">
            {EDUCATION_PAGE_DATA.hero.title}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 font-medium">
            {EDUCATION_PAGE_DATA.hero.subtitle}
          </p>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {EDUCATION_PAGE_DATA.hero.description}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              id="cta-edu-form"
              href="#formulario-escolas"
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider neon-glow-btn transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              <span>Solicitar projeto para sua escola</span>
              <Send className="w-4 h-4" />
            </a>

            <button
              id="cta-edu-modal"
              onClick={() => onOpenProposal('Educação - Soluções')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 hover:border-white/20 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
            >
              Atendimento Consultivo
            </button>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-zinc-900/30 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
              Ecossistema Educacional
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight uppercase">
              Soluções integradas para ensino fundamental, médio e superior
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EDUCATION_PAGE_DATA.solutions.map((sol, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 sm:p-7 rounded-lg bg-zinc-900 border border-white/5 hover:border-red-600/40 transition-all group shadow-lg"
              >
                <div className="w-12 h-12 rounded-sm bg-black border border-white/10 flex items-center justify-center mb-5 group-hover:border-red-600/40 transition-colors">
                  {getSolutionIcon(sol.icon)}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-500 transition-colors uppercase tracking-tight">
                  {sol.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {sol.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Education Benefits Highlights */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-lg bg-zinc-900 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-sm mb-3">
                Gestão Estruturada
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 uppercase tracking-tight">
                Vantagens da terceirização e infraestrutura Ouzze para ensino
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
                Garantimos que sua equipe pedagógica e seus alunos tenham acesso à tecnologia moderna e estável, com rotinas de suporte programadas para atender o calendário da sua instituição.
              </p>

              <div className="space-y-3">
                {EDUCATION_PAGE_DATA.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialized Education Form */}
            <div id="formulario-escolas" className="rounded-lg bg-black border border-white/10 p-6 sm:p-8">
              {hasSubmitted ? (
                <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-sm bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white uppercase tracking-tight">
                      Mensagem formatada para o WhatsApp
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Sua solicitação de consultoria educacional foi preparada para envio direto no WhatsApp corporativo da Ouzze.
                    </p>
                  </div>

                  <div className="p-3.5 rounded bg-zinc-900 border border-white/10 text-left text-xs font-mono text-zinc-300 space-y-1">
                    <p><span className="text-zinc-500">Instituição:</span> {schoolName}</p>
                    <p><span className="text-zinc-500">Responsável:</span> {responsibleName} ({phone})</p>
                    <p><span className="text-zinc-500">Área:</span> {interestArea}</p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      id="btn-edu-open-again"
                      onClick={handleOpenEducationWhatsAppAgain}
                      className="w-full py-3.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Abrir WhatsApp Comercial</span>
                    </button>

                    <button
                      onClick={() => setHasSubmitted(false)}
                      className="w-full py-2.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider border border-white/10 cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
                    >
                      Editar informações
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSchoolSubmit} className="space-y-3">
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight border-b border-white/10 pb-2">
                    Diagnóstico Tecnológico para Escolas
                  </h4>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Nome da Instituição *</label>
                    <input
                      type="text"
                      required
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="Ex: Colégio Horizon / Faculdade Nova"
                      className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Responsável *</label>
                      <input
                        type="text"
                        required
                        value={responsibleName}
                        onChange={(e) => setResponsibleName(e.target.value)}
                        placeholder="Nome do gestor"
                        className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(00) 00000-0000"
                        className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Qtd. Alunos Estimada</label>
                      <select
                        value={studentCount}
                        onChange={(e) => setStudentCount(e.target.value)}
                        className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Até 100">Até 100 alunos</option>
                        <option value="100 a 500">100 a 500 alunos</option>
                        <option value="500 a 1.500">500 a 1.500 alunos</option>
                        <option value="Acima de 1.500">Acima de 1.500 alunos</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Área Principal</label>
                      <select
                        value={interestArea}
                        onChange={(e) => setInterestArea(e.target.value)}
                        className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Laboratório de Informática">Laboratório de Informática</option>
                        <option value="Notebooks para Professores">Notebooks para Professores</option>
                        <option value="Tablets & Mobilidade">Tablets & Mobilidade</option>
                        <option value="Wi-Fi de Alta Densidade">Wi-Fi de Alta Densidade</option>
                        <option value="Projeto Geral">Projeto Geral</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">E-mail Institucional *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="diretoria@escola.com.br"
                      className="w-full px-3 py-2 rounded-sm bg-zinc-900 border border-white/10 text-white text-xs focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      id="btn-edu-submit"
                      type="submit"
                      className="w-full py-3 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider neon-glow-btn transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                    >
                      <span>Receber proposta via WhatsApp</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[10px] text-zinc-400 text-center font-normal pt-1">
                    Ao enviar, seus dados serão utilizados apenas para atendimento da solicitação.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

