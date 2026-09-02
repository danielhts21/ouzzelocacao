import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface LegalPageProps {
  onBack: () => void;
}

export const PrivacyPolicyPage: React.FC<LegalPageProps> = ({ onBack }) => {
  const { state } = useCMS();
  const { settings } = state;

  return (
    <div className="min-h-screen bg-[#08090C] text-zinc-300 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase text-red-500 hover:text-red-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Início</span>
        </button>

        <div className="space-y-2 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Conformidade com a Lei Geral de Proteção de Dados (LGPD)</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Política de Privacidade
          </h1>
          <p className="text-xs text-zinc-400">
            Última atualização: {new Date().toLocaleDateString('pt-BR')} • {settings.legal?.companyLegalName || 'OUZZE TECNOLOGIA'}
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Informações Gerais</h2>
            <p>
              A <strong>{settings.legal?.companyLegalName || 'OUZZE TECNOLOGIA'}</strong> (CNPJ: {settings.legal?.cnpj || 'Consulte nosso atendimento'}) preza pela total transparência e segurança no tratamento dos dados pessoais de seus clientes, parceiros e visitantes corporativos.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Dados Coletados</h2>
            <p>
              Coletamos dados fornecidos voluntariamente por você ao solicitar cotações de locação ou compras, tais como: nome completo, razão social da empresa, CNPJ, e-mail corporativo, número de WhatsApp/telefone e detalhes técnicos dos equipamentos necessários.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Finalidade do Tratamento</h2>
            <p>
              Os dados coletados são utilizados única e exclusivamente para:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li>Elaboração de propostas comerciais personalizadas;</li>
              <li>Atendimento consultivo e suporte técnico via WhatsApp e e-mail;</li>
              <li>Emissão de contratos de locação de equipamentos e faturamento corporativo;</li>
              <li>Cumprimento de obrigações legais e fiscais.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Seus Direitos (LGPD)</h2>
            <p>
              Você tem direito de solicitar a confirmação da existência de tratamento, o acesso aos dados, a correção de dados incompletos ou a eliminação de dados tratados com seu consentimento, através do e-mail: <strong className="text-red-400">{settings.contact?.email || 'contato@ouzze.com.br'}</strong>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};
