import {
  SiteSettings,
  BrandDesignTokens,
  NavigationConfig,
  Page,
  PageSection,
  MaterialDownload,
  Announcement,
  FAQItem,
  MediaAsset,
  Lead
} from '../types/cms';
import {
  PILLARS_DATA,
  RENTAL_EQUIPMENT,
  SERVICES_LIST,
  SEGMENTS_DATA,
  BENEFITS_DATA,
  HOW_IT_WORKS_STEPS,
  EDUCATION_PAGE_DATA
} from './siteData';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brandName: 'OUZZE TECNOLOGIA',
  shortName: 'Ouzze',
  tagline: 'Tecnologia que impulsiona o seu negócio.',
  slogan: 'Locação, venda e serviços de tecnologia em uma única empresa.',
  metaDescription: 'Soluções corporativas em locação de computadores, notebooks e impressoras, venda de hardware e serviços de TI para empresas.',
  
  logoUrl: '/logo.svg',
  faviconUrl: '/logo.svg',
  logoOriginalMeta: {
    originalName: 'logoouzze.png',
    fileSize: 34500,
    dimensions: { width: 760, height: 300 },
    mimeType: 'image/png',
    uploadedAt: '2026-09-02T04:40:00.000Z',
    url: '/logo.svg',
    sha256: '8f7a94b5e87178d2273e843e936746cfcb6127b404d09339e08398aef72c8427'
  },
  logoContainerStyle: {
    maxHeight: 48,
    maxWidth: 220,
    padding: 0,
    alignment: 'left'
  },

  whatsapp: {
    phone: '5511999999999',
    formattedPhone: '',
    defaultMessage: 'Olá, vim do site da Ouzze Tecnologia e gostaria de informações.',
    salesMessage: 'Olá! Gostaria de falar com um especialista sobre soluções da Ouzze.',
    educationMessage: 'Olá! Gostaria de atendimento especializado para o segmento de Educação.',
    autoOpenAfterForm: true
  },

  contact: {
    email: '',
    salesEmail: '',
    phone: '',
    address: '',
    city: 'São Paulo',
    state: 'SP',
    cep: '',
    businessHours: 'Segunda a Sexta, das 08h às 18h'
  },

  socials: {
    linkedin: '',
    instagram: '',
    whatsapp: 'https://wa.me/5511999999999',
    facebook: '',
    youtube: '',
    tiktok: '',
    x: ''
  },

  seo: {
    domain: 'https://ouzze.com.br',
    titleTemplate: '%s | Ouzze Tecnologia',
    defaultKeywords: ['locação de computadores', 'aluguel de notebooks', 'TI corporativa', 'outsourcing de impressão', 'suporte de TI', 'computadores para escolas'],
    ogImage: '',
    canonicalDomain: 'https://ouzze.com.br',
    robotsIndex: true,
    cookieConsentEnabled: false
  },

  legal: {
    cnpj: '',
    companyLegalName: 'OUZZE TECNOLOGIA',
    privacyPolicyContent: 'Esta Política de Privacidade descreve como a Ouzze Tecnologia coleta, usa e protege os dados fornecidos por clientes e visitantes conforme a LGPD (Lei Geral de Proteção de Dados). Os dados preenchidos em nossos formulários de contato e propostas são utilizados estritamente para retorno comercial e atendimento consultivo especializado.',
    termsOfUseContent: 'Termos de uso dos serviços e canais digitais da Ouzze Tecnologia. As especificações de equipamentos e orçamentos apresentados no portal corporativo estão sujeitos a validação prévia de disponibilidade de estoque e contrato formal de prestação de serviços.'
  },

  maintenance: {
    enabled: false,
    message: 'Estamos realizando melhorias programadas em nossa plataforma. Retornaremos em breve!',
    allowAdminBypass: true
  }
};

export const DEFAULT_BRAND_TOKENS: BrandDesignTokens = {
  preset: 'OUZZE_PREMIUM',
  
  colors: {
    primary: '#DC2626',
    primaryHover: '#B91C1C',
    secondary: '#18181B',
    bgDark: '#0A0B0E',
    bgLight: '#FFFFFF',
    textPrimary: '#F4F4F5',
    textMuted: '#A1A1AA',
    border: 'rgba(255, 255, 255, 0.1)',
    surface: '#121318',
    surfaceHover: '#181A22',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444'
  },

  neon: {
    enabled: true,
    intensity: 75,
    heroGlow: true,
    buttonGlow: true,
    cardGlow: true,
    lineGlow: true
  },

  typography: {
    headingFont: 'Plus Jakarta Sans',
    bodyFont: 'Plus Jakarta Sans',
    h1Size: '3.5rem',
    h2Size: '2.5rem',
    h3Size: '1.75rem',
    bodySize: '1rem',
    lineHeight: '1.6',
    letterSpacing: '-0.02em',
    headingTransform: 'none'
  },

  style: {
    borderRadius: 4,
    buttonRadius: 4,
    cardRadius: 8,
    containerMaxWidth: '1280px',
    sectionSpacing: 'py-20',
    shadowIntensity: 'medium'
  },

  motion: {
    enabled: true,
    intensity: 'medium',
    parallaxEnabled: true,
    parallaxIntensity: 'medium'
  }
};

export const DEFAULT_NAVIGATION: NavigationConfig = {
  headerItems: [
    { id: 'nav-pilares', label: 'Soluções', href: '#pilares', active: true, order: 1 },
    { id: 'nav-sobre', label: 'Sobre', href: '#sobre', active: true, order: 2 },
    { id: 'nav-segmentos', label: 'Segmentos', href: '#segmentos', active: true, order: 3 },
    { id: 'nav-locacao', label: 'Locação', href: '#locacao', active: true, order: 4 },
    { id: 'nav-servicos', label: 'Serviços', href: '#servicos', active: true, order: 5 },
    { id: 'nav-como-funciona', label: 'Como Funciona', href: '#como-funciona', active: true, order: 6 },
    { id: 'nav-contato', label: 'Contato', href: '#contato', active: true, order: 7 }
  ],
  footerItems: [
    { id: 'ft-locacao', label: 'Locação de Equipamentos', href: '#locacao', active: true, order: 1 },
    { id: 'ft-vendas', label: 'Venda de Hardware', href: '#locacao', active: true, order: 2 },
    { id: 'ft-servicos', label: 'Serviços de TI & Suporte', href: '#servicos', active: true, order: 3 },
    { id: 'ft-educacao', label: 'Soluções para Educação', href: '/educacao', active: true, order: 4 },
    { id: 'ft-privacidade', label: 'Política de Privacidade', href: '/politica-de-privacidade', active: true, order: 5 }
  ],
  ctaButtonText: 'Solicitar Proposta',
  ctaButtonAction: 'open_modal'
};

export const DEFAULT_HOME_SECTIONS: PageSection[] = [
  {
    id: 'sec-hero',
    pageSlug: '/',
    type: 'hero',
    title: 'Infraestrutura de TI Completa para sua Operação.',
    subtitle: 'Locação de computadores, notebooks e impressoras, venda consultiva e suporte técnico especializado.',
    description: 'Transforme o investimento em TI em agilidade operacional. Elimine paradas de produção com equipamentos corporativos de alta performance e suporte proativo.',
    active: true,
    order: 1,
    content: {
      eyebrow: 'OUZZE TECNOLOGIA • SOLUÇÕES CORPORATIVAS DE TI',
      highlightWord: 'Completa',
      ctaPrimaryText: 'Solicitar Proposta Comercial',
      ctaSecondaryText: 'Conhecer Soluções',
      showAssemblyAnimation: true,
      imageObjectFit: 'contain',
      imagePosition: 'center',
      imageScale: 1
    },
    styles: {
      background: 'dark',
      paddingTop: 'lg',
      paddingBottom: 'lg',
      alignment: 'center',
      maxWidth: '7xl',
      animation: 'fadeUp',
      parallax: true,
      visibility: { desktop: true, tablet: true, mobile: true }
    }
  },
  {
    id: 'sec-pillars',
    pageSlug: '/',
    type: 'pillars',
    title: 'Nossos 3 Pilares Estratégicos',
    subtitle: 'Do aluguel flexível à implantação e suporte completo.',
    description: 'Atendemos demandas de diferentes portes com flexibilidade contratual e agilidade de entrega.',
    active: true,
    order: 2,
    content: {
      pillars: PILLARS_DATA
    },
    styles: {
      background: 'surface',
      paddingTop: 'lg',
      paddingBottom: 'lg',
      alignment: 'left',
      maxWidth: '7xl',
      animation: 'fadeUp',
      parallax: false,
      visibility: { desktop: true, tablet: true, mobile: true }
    }
  },
  {
    id: 'sec-about',
    pageSlug: '/',
    type: 'about',
    title: 'Mais que fornecedores: parceiros estratégicos da sua operação.',
    subtitle: 'Sobre a Ouzze Tecnologia',
    description: 'A Ouzze Tecnologia nasceu para simplificar a gestão de TI corporativa. Aliamos consultoria técnica precisa, agilidade logística e foco inegociável na continuidade do seu negócio.',
    active: true,
    order: 3,
    content: {
      badge: 'Sobre a Ouzze',
      highlights: [
        { title: 'Agilidade Operacional', desc: 'Respostas rápidas para substituições e suporte sem burocracia.' },
        { title: 'Equipamentos Homologados', desc: 'Máquinas de marcas líderes preparadas para alta produtividade.' },
        { title: 'Flexibilidade Contratual', desc: 'Projetos sob medida para o tamanho e a demanda da sua empresa.' }
      ]
    },
    styles: {
      background: 'dark',
      paddingTop: 'lg',
      paddingBottom: 'lg',
      alignment: 'left',
      maxWidth: '7xl',
      animation: 'fadeUp',
      parallax: false,
      visibility: { desktop: true, tablet: true, mobile: true }
    }
  },
  {
    id: 'sec-segments',
    pageSlug: '/',
    type: 'segments',
    title: 'Tecnologia pensada para cada setor do mercado.',
    subtitle: 'Segmentos Atendidos',
    description: 'Entendemos as particularidades regulatórias e operacionais de diferentes segmentos empresariais, educacionais e corporativos.',
    active: true,
    order: 4,
    content: {
      segments: SEGMENTS_DATA
    },
    styles: {
      background: 'surface',
      paddingTop: 'lg',
      paddingBottom: 'lg',
      alignment: 'left',
      maxWidth: '7xl',
      animation: 'fadeUp',
      parallax: false,
      visibility: { desktop: true, tablet: true, mobile: true }
    }
  },
  {
    id: 'sec-rental',
    pageSlug: '/',
    type: 'rental',
    title: 'Equipamentos Corporativos para Locação',
    subtitle: 'Ouzze Locação',
    description: 'Computadores, notebooks, impressoras gerenciadas, dispositivos móveis e infraestrutura com manutenção e reposição inclusas.',
    active: true,
    order: 5,
    content: {
      items: RENTAL_EQUIPMENT
    },
    styles: {
      background: 'dark',
      paddingTop: 'lg',
      paddingBottom: 'lg',
      alignment: 'left',
      maxWidth: '7xl',
      animation: 'fadeUp',
      parallax: false,
      visibility: { desktop: true, tablet: true, mobile: true }
    }
  },
  {
    id: 'sec-services',
    pageSlug: '/',
    type: 'services',
    title: 'Serviços Especializados de TI',
    subtitle: 'Ouzze Serviços',
    description: 'Do suporte proativo multicanal à engenharia de redes estruturadas e manutenção preventiva periódica.',
    active: true,
    order: 6,
    content: {
      services: SERVICES_LIST
    },
    styles: {
      background: 'surface',
      paddingTop: 'lg',
      paddingBottom: 'lg',
      alignment: 'left',
      maxWidth: '7xl',
      animation: 'fadeUp',
      parallax: false,
      visibility: { desktop: true, tablet: true, mobile: true }
    }
  },
  {
    id: 'sec-benefits',
    pageSlug: '/',
    type: 'benefits',
    title: 'Por que escolher a Ouzze Tecnologia?',
    subtitle: 'Vantagens Competitivas',
    description: 'Vantagens comprovadas para você reduzir custos e ganhar previsibilidade.',
    active: true,
    order: 7,
    content: {
      benefits: BENEFITS_DATA
    },
    styles: {
      background: 'dark',
      paddingTop: 'lg',
      paddingBottom: 'lg',
      alignment: 'center',
      maxWidth: '7xl',
      animation: 'fadeUp',
      parallax: false,
      visibility: { desktop: true, tablet: true, mobile: true }
    }
  },
  {
    id: 'sec-howitworks',
    pageSlug: '/',
    type: 'howItWorks',
    title: 'Como Funciona Nosso Atendimento',
    subtitle: 'Passo a Passo Simples',
    description: 'Processo ágil e transparente em 5 etapas para colocar sua infraestrutura em funcionamento.',
    active: true,
    order: 8,
    content: {
      steps: HOW_IT_WORKS_STEPS
    },
    styles: {
      background: 'surface',
      paddingTop: 'lg',
      paddingBottom: 'lg',
      alignment: 'left',
      maxWidth: '7xl',
      animation: 'fadeUp',
      parallax: false,
      visibility: { desktop: true, tablet: true, mobile: true }
    }
  },
  {
    id: 'sec-commercialcta',
    pageSlug: '/',
    type: 'cta',
    title: 'Pronto para modernizar a TI da sua empresa?',
    subtitle: 'Fale Conosco',
    description: 'Converse com nossos especialistas e receba uma proposta técnica e comercial sob medida para a sua operação.',
    active: true,
    order: 9,
    content: {
      buttonText: 'Solicitar Proposta Personalizada',
      badge: 'Atendimento Consultivo B2B'
    },
    styles: {
      background: 'gradient',
      paddingTop: 'lg',
      paddingBottom: 'lg',
      alignment: 'center',
      maxWidth: '6xl',
      animation: 'scale',
      parallax: false,
      visibility: { desktop: true, tablet: true, mobile: true }
    }
  },
  {
    id: 'sec-contact',
    pageSlug: '/',
    type: 'contact',
    title: 'Solicite uma Proposta Sob Medida',
    subtitle: 'Formulário de Contato',
    description: 'Preencha os dados abaixo para receber um estudo de viabilidade e orçamento detalhado da nossa equipe comercial.',
    active: true,
    order: 10,
    content: {
      defaultSolution: 'Locação'
    },
    styles: {
      background: 'dark',
      paddingTop: 'lg',
      paddingBottom: 'lg',
      alignment: 'left',
      maxWidth: '6xl',
      animation: 'fadeUp',
      parallax: false,
      visibility: { desktop: true, tablet: true, mobile: true }
    }
  }
];

export const DEFAULT_EDUCATION_SECTIONS: PageSection[] = [
  {
    id: 'sec-edu-hero',
    pageSlug: '/educacao',
    type: 'hero',
    title: EDUCATION_PAGE_DATA.hero.title,
    subtitle: EDUCATION_PAGE_DATA.hero.subtitle,
    description: EDUCATION_PAGE_DATA.hero.description,
    active: true,
    order: 1,
    content: {
      badge: EDUCATION_PAGE_DATA.hero.badge,
      ctaPrimaryText: 'Solicitar Proposta para Minha Escola',
      ctaSecondaryText: 'Baixar Apresentação em PDF'
    },
    styles: {
      background: 'dark',
      paddingTop: 'lg',
      paddingBottom: 'lg',
      alignment: 'center',
      maxWidth: '7xl',
      animation: 'fadeUp',
      parallax: true,
      visibility: { desktop: true, tablet: true, mobile: true }
    }
  },
  {
    id: 'sec-edu-solutions',
    pageSlug: '/educacao',
    type: 'custom_cards',
    title: 'Soluções Integradas para Instituições de Ensino',
    subtitle: 'Ecossistema Educacional',
    description: 'Projetadas para suportar as demandas pedagógicas e administrativas da comunidade escolar.',
    active: true,
    order: 2,
    content: {
      cards: EDUCATION_PAGE_DATA.solutions
    },
    styles: {
      background: 'surface',
      paddingTop: 'lg',
      paddingBottom: 'lg',
      alignment: 'left',
      maxWidth: '7xl',
      animation: 'fadeUp',
      parallax: false,
      visibility: { desktop: true, tablet: true, mobile: true }
    }
  },
  {
    id: 'sec-edu-downloads',
    pageSlug: '/educacao',
    type: 'downloads',
    title: 'Material Institucional para Download',
    subtitle: 'Apresentação Pedagógica',
    description: 'Baixe nossa apresentação completa em PDF com especificações de laboratórios, modelos de contratação e detalhes técnicos.',
    active: true,
    order: 3,
    content: {
      materialId: 'mat-edu-apresentacao'
    },
    styles: {
      background: 'dark',
      paddingTop: 'md',
      paddingBottom: 'md',
      alignment: 'center',
      maxWidth: '5xl',
      animation: 'fadeUp',
      parallax: false,
      visibility: { desktop: true, tablet: true, mobile: true }
    }
  }
];

export const DEFAULT_PAGES: Page[] = [
  {
    id: 'page-home',
    slug: '/',
    name: 'Página Inicial (Home)',
    seoTitle: 'Ouzze Tecnologia | Locação, Venda e Serviços de TI',
    seoDescription: 'Soluções corporativas em locação de computadores, notebooks e impressoras, venda de hardware e serviços de TI para empresas.',
    status: 'PUBLISHED',
    isSystem: true,
    sectionsOrder: DEFAULT_HOME_SECTIONS.map(s => s.id),
    updatedAt: '2026-09-02T05:00:00.000Z',
    updatedBy: 'admin@ouzze.com.br'
  },
  {
    id: 'page-educacao',
    slug: '/educacao',
    name: 'Educação & Escolas',
    seoTitle: 'Ouzze Tecnologia | Soluções de TI para Educação e Instituições de Ensino',
    seoDescription: 'Locação e implantação de laboratórios de informática, notebooks pedagógicos e infraestrutura de TI para colégios, faculdades e polos educacionais.',
    status: 'PUBLISHED',
    isSystem: true,
    sectionsOrder: DEFAULT_EDUCATION_SECTIONS.map(s => s.id),
    updatedAt: '2026-09-02T05:00:00.000Z',
    updatedBy: 'admin@ouzze.com.br'
  },
  {
    id: 'page-privacidade',
    slug: '/politica-de-privacidade',
    name: 'Política de Privacidade',
    seoTitle: 'Política de Privacidade | Ouzze Tecnologia',
    seoDescription: 'Informações sobre tratamento de dados e privacidade em conformidade com a LGPD.',
    status: 'PUBLISHED',
    isSystem: false,
    sectionsOrder: [],
    updatedAt: '2026-09-02T05:00:00.000Z',
    updatedBy: 'admin@ouzze.com.br'
  }
];

export const DEFAULT_DOWNLOADS: MaterialDownload[] = [
  {
    id: 'mat-edu-apresentacao',
    title: 'Apresentação Comercial Ouzze Educação (PDF)',
    description: 'Catálogo detalhado de soluções em laboratórios de informática, notebooks docentes e planos de locação educacional.',
    fileUrl: '#',
    fileName: 'apresentacao-ouzze-educacao.pdf',
    fileSize: '4.2 MB',
    segment: 'educacao',
    buttonText: 'Baixar Apresentação para Escolas',
    active: true,
    order: 1
  }
];

export const DEFAULT_ANNOUNCEMENT: Announcement = {
  id: 'announcement-1',
  text: '🚀 Condições especiais para modernização de laboratórios e parques de TI corporativos neste mês!',
  link: '#contato',
  linkText: 'Solicitar cotação',
  bgColor: '#DC2626',
  textColor: '#FFFFFF',
  active: false
};

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Como funciona a substituição de equipamentos com defeito na locação?',
    answer: 'Em caso de qualquer falha de hardware, nossa equipe técnica realiza a troca rápida do equipamento por outro de especificação idêntica ou superior, garantindo que sua equipe não fique parada.',
    active: true,
    order: 1
  },
  {
    id: 'faq-2',
    question: 'Quais são os prazos mínimos para contratos de locação?',
    answer: 'Trabalhamos com contratos flexíveis de curta, média e longa duração (12, 24 ou 36 meses), além de locações especiais para eventos e projetos temporários.',
    active: true,
    order: 2
  },
  {
    id: 'faq-3',
    question: 'A Ouzze entrega as máquinas já configuradas com os softwares da minha empresa?',
    answer: 'Sim. Antes da entrega, efetuamos a preparação, clone de imagens corporativas e testes de estresse em bancada, entregando equipamentos 100% prontos para o uso imediato dos colaboradores.',
    active: true,
    order: 3
  }
];

export const DEFAULT_MEDIA_ASSETS: MediaAsset[] = [
  {
    id: 'med-logo-svg',
    name: 'Logo Ouzze Locação',
    originalName: 'logo.svg',
    url: '/logo.svg',
    fileType: 'image/svg+xml',
    size: 4500,
    dimensions: { width: 760, height: 300 },
    altText: 'Logo Oficial Ouzze Tecnologia e Locação',
    isDecorative: false,
    tags: ['logo', 'marca', 'header', 'footer'],
    usageLocations: ['Header', 'Footer', 'Modal de Proposta'],
    createdAt: '2026-09-02T04:40:00.000Z'
  }
];
