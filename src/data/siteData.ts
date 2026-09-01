import {
  PillarItem,
  EquipmentItem,
  ServiceItem,
  SegmentItem,
  StepItem,
  BenefitItem,
  StatItem
} from '../types';

export const PILLARS_DATA: PillarItem[] = [
  {
    id: 'locacao',
    tag: 'Ouzze Locação',
    name: 'Locação Corporativa',
    title: 'Tecnologia sem imobilizar capital.',
    description: 'Locação de equipamentos de tecnologia de alta performance para empresas, instituições e projetos com suporte e substituição inclusos.',
    items: [
      'Computadores Desktop & Workstations',
      'Notebooks Corporativos & Ultrabooks',
      'Impressoras & Multifuncionais Gerenciadas',
      'Celulares & Tablets Corporativos',
      'Monitores Profissionais & Ultrawide',
      'Equipamentos de Infraestrutura e Redes'
    ],
    ctaText: 'Conhecer Locação',
    targetSection: 'locacao',
    highlightText: 'Zero custo de manutenção, atualização contínua e deduções fiscais em OPEX.',
    badge: 'Mais Demandado'
  },
  {
    id: 'vendas',
    tag: 'Ouzze Vendas',
    name: 'Venda Consultiva',
    title: 'Tecnologia para comprar. Confiança para crescer.',
    description: 'Equipamentos e soluções completas de hardware para empresas que precisam comprar com procedência, garantia estendida e suporte especializado.',
    items: [
      'Computadores e Desktops Customizados',
      'Notebooks Executivos e de Engenharia',
      'Hardware Corporativo & Upgrades',
      'Periféricos Profissionais & Acessórios',
      'Impressoras Térmicas e Multifuncionais',
      'Equipamentos e Racks para Data Center'
    ],
    ctaText: 'Conhecer Vendas',
    targetSection: 'vendas',
    highlightText: 'Linhas homologadas pelos maiores fabricantes globais com faturamento corporativo.',
    badge: 'Garantia Direta'
  },
  {
    id: 'servicos',
    tag: 'Ouzze Serviços',
    name: 'Gestão & Suporte de TI',
    title: 'Sua operação não pode parar.',
    description: 'Suporte técnico proativo, manutenção preventiva/corretiva e engenharia de redes para manter sua infraestrutura segura e estável 24/7.',
    items: [
      'Suporte Remoto com SLA de Resposta Imediata',
      'Suporte Presencial e Field Service Especializado',
      'Manutenção Preventiva e Limpeza Técnica',
      'Manutenção Corretiva e Reparo de Placas',
      'Projetos de Cabeamento Estruturado e Wi-Fi Corporativo',
      'Instalação, Implantação e Padronização de Imagens'
    ],
    ctaText: 'Conhecer Serviços',
    targetSection: 'servicos',
    highlightText: 'Equipe certificada com monitoramento contínuo e chamados centralizados.',
    badge: 'Alta Disponibilidade'
  }
];

export const RENTAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'desktops-workstations',
    name: 'Computadores & Workstations',
    category: 'computadores',
    categoryLabel: 'Desktops & Workstations',
    shortDesc: 'Equipamentos configurados para tarefas administrativas ou cargas pesadas de engenharia e design.',
    specs: ['Processadores Intel Core i5/i7/i9 & Xeon', 'Memória RAM de 16GB a 64GB DDR4/DDR5', 'Armazenamento SSD NVMe Ultra Rápido', 'Opções com Placas Gráficas Dedicadas RTX'],
    recommendedFor: 'Escritórios, Desenvolvedores, Engenharia, Call Centers',
    iconName: 'Monitor',
    badge: 'Alta Performance'
  },
  {
    id: 'notebooks-executivos',
    name: 'Notebooks Corporativos',
    category: 'notebooks',
    categoryLabel: 'Notebooks Corporativos',
    shortDesc: 'Mobilidade com segurança de dados, chassi reforçado e longa duração de bateria.',
    specs: ['Telas 14" e 15.6" Full HD / IPS Anti-reflexo', 'Processadores de última geração com TPM 2.0', 'Baterias de alta densidade e carregamento rápido', 'Peso reduzido e resistência a impactos'],
    recommendedFor: 'Equipes Híbridas, Vendas Externas, Gestores e Docentes',
    iconName: 'Laptop',
    badge: 'Mobilidade Total'
  },
  {
    id: 'impressoras-multifuncionais',
    name: 'Impressoras & Outsourcing',
    category: 'impressoras',
    categoryLabel: 'Impressoras & Multifuncionais',
    shortDesc: 'Parque de impressão controlado com fornecimento contínuo de consumíveis e manutenção.',
    specs: ['Laser Monocromático e Colorido de Alta Velocidade', 'Digitalização em rede e duplex automático', 'Controle de cotas de impressão por usuário', 'Manutenção preventiva e troca de suprimentos inclusa'],
    recommendedFor: 'Escolas, Clínicas, Contabilidades e Centros Logísticos',
    iconName: 'Printer',
    badge: 'Gestão Inteligente'
  },
  {
    id: 'celulares-tablets',
    name: 'Celulares & Tablets Corporativos',
    category: 'celulares',
    categoryLabel: 'Dispositivos Móveis',
    shortDesc: 'Smartphones e tablets gerenciados com MDM para forças de vendas e equipes de campo.',
    specs: ['Android Enterprise & iOS homologados', 'Gestão remota de aplicativos e segurança (MDM)', 'Capas de proteção industrial e películas aplicadas', 'Chips de dados configuráveis sob demanda'],
    recommendedFor: 'Logística, Vendas em Campo, Ensino Digital e Auditorias',
    iconName: 'Smartphone',
    badge: 'MDM Pronto'
  },
  {
    id: 'monitores-ergonomia',
    name: 'Monitores Profissionais',
    category: 'monitores',
    categoryLabel: 'Monitores & Displays',
    shortDesc: 'Telas com certificação ergonômica NR-17, ajuste de altura e fidelidade visual.',
    specs: ['Telas IPS de 24", 27" e 34" Ultrawide', 'Ajuste de altura, inclinação e rotação pivot', 'Filtro de luz azul para proteção ocular contínua', 'Conexões HDMI, DisplayPort e USB-C Hub'],
    recommendedFor: 'Produtividade de escritório, Design, Finanças e Trading',
    iconName: 'Tv',
    badge: 'Norma NR-17'
  },
  {
    id: 'infra-servidores',
    name: 'Equipamentos de Infra & Redes',
    category: 'corporativo',
    categoryLabel: 'Infraestrutura de TI',
    shortDesc: 'Switches gerenciáveis, roteadores empresariais, access points Wi-Fi 6 e nobreaks senoidais.',
    specs: ['Switches PoE+ Gigabit e 10G SFP+', 'Access Points corporativos com roaming contínuo', 'Nobreaks senoidais com autonomia expansível', 'Racks de 19" e patch panels organizados'],
    recommendedFor: 'Novas filiais, reestruturações de sede e eventos temporários',
    iconName: 'Server',
    badge: 'Rede Segura'
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'suporte-remoto',
    title: 'Suporte Remoto Proativo',
    category: 'suporte',
    description: 'Central de Service Desk para resolução ágil de chamados do dia a dia, dúvidas de usuários e correção de falhas de software sem deslocamento.',
    features: ['Atendimento por múltiplos canais (Helpdesk, WhatsApp, Telefone)', 'Abertura e controle rigoroso de chamados com SLA contratual', 'Instalação remota de softwares e drivers autorizados', 'Limpeza lógica e remoção de ameaças digitais'],
    sla: 'Resposta em até 15 minutos',
    iconName: 'Headphones'
  },
  {
    id: 'suporte-presencial',
    title: 'Suporte Presencial (Field Service)',
    category: 'suporte',
    description: 'Técnicos especializados para visitas agendadas ou intervenções emergenciais na sua sede, resolvendo falhas físicas e de cabeamento.',
    features: ['Visitas periódicas de rotina e vistorias de conformidade', 'Substituição imediata de peças e equipamentos com defeito', 'Alocação de técnico residente para operações de grande porte', 'Organização física de postos de trabalho e cabos'],
    sla: 'Acionamento com SLA presencial prioritário',
    iconName: 'UserCheck'
  },
  {
    id: 'manutencao-preventiva',
    title: 'Manutenção Preventiva',
    category: 'manutencao',
    description: 'Inspeções programadas para limpeza interna, troca de pasta térmica, atualização de firmwares e testes de estresse de hardware.',
    features: ['Prolonga a vida útil do parque em mais de 40%', 'Evita paradas repentinas e perda de dados críticos', 'Relatórios técnicos de saúde de discos (SSD/HDD) e fontes', 'Padronização periódica do sistema operacional'],
    sla: 'Cronograma mensal ou trimestral',
    iconName: 'ShieldCheck'
  },
  {
    id: 'manutencao-corretiva',
    title: 'Manutenção Corretiva Especializada',
    category: 'manutencao',
    description: 'Laboratório técnico próprio para conserto avançado de placas-mãe, fontes industriais, dobradiças de notebooks e telas.',
    features: ['Diagnóstico com instrumental eletrônico de ponta', 'Reparo em nível de componentes (BGA, SMD e circuitos)', 'Peças de reposição originais e certificadas', 'Garantia técnica documentada por ordem de serviço'],
    sla: 'Laudo técnico em até 24h',
    iconName: 'Wrench'
  },
  {
    id: 'redes-conectividade',
    title: 'Infraestrutura de Redes e Wi-Fi',
    category: 'infraestrutura',
    description: 'Engenharia de rede cabeada Cat6/Cat6a, fibra óptica e redes sem fio corporativas com divisão de VLANs para visitantes e administração.',
    features: ['Mapeamento e certificação de pontos de rede cabeada', 'Wi-Fi corporativo de alta densidade sem pontos cegos', 'Configuração de Firewalls, VPNs corporativas e roteamento', 'Organização e identificação padrão de racks e patch panels'],
    sla: 'Projetos com certificação de desempenho',
    iconName: 'Network'
  },
  {
    id: 'implantacao-configuracao',
    title: 'Instalação e Configuração de TI',
    category: 'instalacao',
    description: 'Padronização completa de novos parques computacionais com criação de imagens de sistema personalizadas e domínio corporativo.',
    features: ['Clonagem e implantação rápida de dezenas de máquinas', 'Ingresso em Active Directory / Azure AD / Google Workspace', 'Políticas de segurança de endpoint e antivírus corporativo', 'Backup automatizado de dados e perfis de usuário'],
    sla: 'Rollout rápido com zero impacto na rotina',
    iconName: 'Cpu'
  }
];

export const SEGMENTS_DATA: SegmentItem[] = [
  {
    id: 'educacao',
    title: 'Educação',
    subtitle: 'Escolas, faculdades e instituições de ensino',
    description: 'Laboratórios de informática modernos, notebooks para docentes, tablets pedagógicos e infraestrutura de rede resiliente para aulas híbridas e vestibulares digitais.',
    keyBenefits: [
      'Laboratórios completos com bloqueio pedagógico',
      'Notebooks resistentes para corpo docente',
      'Rede Wi-Fi de alta densidade para centenas de alunos simultâneos',
      'Suporte prioritário durante períodos de provas e matrículas'
    ],
    slug: '/educacao',
    iconName: 'GraduationCap',
    statsHighlight: 'Mais de 10.000 alunos impactados'
  },
  {
    id: 'empresas',
    title: 'Empresas & Escritórios',
    subtitle: 'Soluções completas para operações corporativas',
    description: 'Padronização de computadores, suporte Helpdesk dedicado e escalabilidade ágil para contratações, novas filiais e trabalho híbrido.',
    keyBenefits: [
      'Parque de máquinas atualizado com flexibilidade de contrato',
      'Redução comprovada de chamados improdutivos',
      'Gestão de ativos de TI e inventário simplificado',
      'SLA de substituição imediata sem custo adicional'
    ],
    slug: '#empresas-info',
    iconName: 'Building2',
    statsHighlight: 'Disponibilidade de operação 99.8%'
  },
  {
    id: 'saude',
    title: 'Saúde & Clínicas',
    subtitle: 'Clínicas, laboratórios e hospitais',
    description: 'Equipamentos higienizáveis para recepções e consultórios, computadores de alta resolução para laudos médicos e suporte ininterrupto.',
    keyBenefits: [
      'Estações de trabalho rápidas para prontuários eletrônicos',
      'Monitores com fidelidade para visualização de exames',
      'Rede isolada para segurança e conformidade LGPD médica',
      'Impressão térmica e de receituários com reposição rápida'
    ],
    slug: '#saude-info',
    iconName: 'Activity',
    statsHighlight: 'Conformidade e segurança de dados'
  },
  {
    id: 'eventos',
    title: 'Eventos & Feiras',
    subtitle: 'Estrutura tecnológica temporária',
    description: 'Locação de curto prazo de notebooks para credenciamento, totens interativos, impressoras térmicas para crachás e Wi-Fi de evento.',
    keyBenefits: [
      'Locação diária, semanal ou mensal sob medida',
      'Equipamentos entregues testados e pré-configurados',
      'Plantão técnico presencial durante a realização do evento',
      'Logística de montagem, desmontagem e recolhimento'
    ],
    slug: '#eventos-info',
    iconName: 'CalendarRange',
    statsHighlight: 'Montagem ágil em até 24h'
  },
  {
    id: 'setor-publico',
    title: 'Setor Público',
    subtitle: 'Órgãos e instituições públicas',
    description: 'Atendimento a editais, atas de registro de preços e contratos governamentais com rigor documental, garantias fiscais e suporte técnico formal.',
    keyBenefits: [
      'Equipamentos em estrita conformidade com termos de referência',
      'Documentação fiscal e certidões sempre atualizadas',
      'Acompanhamento técnico por engenheiros e especialistas',
      'Capacidade operacional para entregas de grande volume'
    ],
    slug: '#setor-publico-info',
    iconName: 'Landmark',
    statsHighlight: 'Conformidade com Leis de Licitações'
  }
];

export const BENEFITS_DATA: BenefitItem[] = [
  {
    id: 'solucoes-completas',
    title: 'Soluções Completas em um Só Parceiro',
    description: 'Locação, venda de hardware e serviços de engenharia de TI integrados. Você não precisa negociar com múltiplos fornecedores.',
    iconName: 'Layers'
  },
  {
    id: 'atendimento-especializado',
    title: 'Atendimento Consultivo Especializado',
    description: 'Nossos consultores analisam seu fluxo de trabalho real para dimensionar exatamente as máquinas e serviços que sua equipe precisa.',
    iconName: 'Users'
  },
  {
    id: 'flexibilidade-contratual',
    title: 'Flexibilidade & Agilidade Operacional',
    description: 'Projetos personalizados por prazo, quantidade e perfil de equipamento, com rápida capacidade de expansão ou ajuste.',
    iconName: 'Sliders'
  },
  {
    id: 'suporte-garantia',
    title: 'Suporte com SLA Rigoroso',
    description: 'Tecnologia acompanhada de suporte humano, canais diretos e resolução ágil. Se uma máquina falhar, nós substituímos com rapidez.',
    iconName: 'ShieldAlert'
  },
  {
    id: 'escalabilidade',
    title: 'Escalabilidade para seu Crescimento',
    description: 'Acompanhamos a expansão da sua empresa, desde 5 computadores até centenas de postos em múltiplas filiais.',
    iconName: 'TrendingUp'
  }
];

export const STATS_DATA: StatItem[] = [
  {
    id: 'equipamentos',
    prefix: '+',
    value: 2500,
    suffix: '',
    displayPlaceholder: '+2.500',
    label: 'Equipamentos Gerenciados',
    description: 'Computadores, notebooks e dispositivos em operação contínua'
  },
  {
    id: 'clientes',
    prefix: '+',
    value: 350,
    suffix: '',
    displayPlaceholder: '+350',
    label: 'Empresas e Instituições',
    description: 'Clientes corporativos e educacionais atendidos'
  },
  {
    id: 'experiencia',
    prefix: '+',
    value: 12,
    suffix: ' Anos',
    displayPlaceholder: '+12 Anos',
    label: 'Experiência no Mercado',
    description: 'Solidez e expertise em soluções tecnológicas B2B'
  },
  {
    id: 'estados',
    prefix: '',
    value: 15,
    suffix: ' Estados',
    displayPlaceholder: '15 Estados',
    label: 'Presença Nacional',
    description: 'Capacidade de atendimento e logística em múltiplos estados'
  }
];

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Entendemos sua necessidade',
    description: 'Realizamos um diagnóstico detalhado da sua operação, identificando quantidade de usuários, perfis de uso, softwares necessários e prazos.',
    details: 'Alinhamento consultivo sem compromisso com nossos especialistas em TI.'
  },
  {
    number: '02',
    title: 'Desenvolvemos a solução sob medida',
    description: 'Apresentamos uma proposta personalizada indicando o melhor modelo financeiro (locação, aquisição ou suporte) com transparência de custos.',
    details: 'Planejamento de OPEX/CAPEX e dimensionamento de infraestrutura.'
  },
  {
    number: '03',
    title: 'Preparamos os equipamentos ou serviços',
    description: 'Configuramos, testamos em bancada e padronizamos as máquinas com os sistemas, navegadores e ferramentas da sua empresa.',
    details: 'Processo rigoroso de Quality Assurance e testes de estresse de hardware.'
  },
  {
    number: '04',
    title: 'Implantamos com zero atrito',
    description: 'Entregamos os equipamentos e realizamos a montagem e conexão no seu ambiente, garantindo que tudo funcione perfeitamente desde o minuto zero.',
    details: 'Equipe técnica no local ou entrega pronta para uso (Plug & Play).'
  },
  {
    number: '05',
    title: 'Acompanhamos sua operação continuamente',
    description: 'Monitoramento, suporte técnico, manutenções periódicas e substituição imediata em caso de qualquer eventualidade durante todo o contrato.',
    details: 'Seu time foca no negócio, enquanto a Ouzze cuida da tecnologia.'
  }
];

export const EDUCATION_PAGE_DATA = {
  hero: {
    badge: 'Ouzze Educação',
    title: 'Tecnologia que transforma salas de aula em centros de inovação.',
    subtitle: 'Soluções completas de locação e infraestrutura de TI para escolas, faculdades e redes de ensino.',
    description: 'Fornecemos desde laboratórios completos e notebooks para professores até redes Wi-Fi de alta densidade e suporte técnico dedicado para sua instituição nunca parar.',
  },
  solutions: [
    {
      title: 'Laboratórios de Informática Completos',
      desc: 'Computadores de alta durabilidade, telas ergonômicas, softwares pedagógicos pré-instalados e sistemas de congelamento/bloqueio para alunos.',
      icon: 'Monitor'
    },
    {
      title: 'Notebooks para Professores & Coordenação',
      desc: 'Dispositivos portáteis e ágeis com autonomia de bateria para preparo de aulas, diários eletrônicos e transmissões ao vivo.',
      icon: 'Laptop'
    },
    {
      title: 'Tablets & Dispositivos Educacionais',
      desc: 'Tablets com proteção antichoque e gestão de conteúdo (MDM) para projetos de leitura digital e salas colaborativas.',
      icon: 'Tablet'
    },
    {
      title: 'Ambientes Administrativos & Secretaria',
      desc: 'Desktops, impressoras com controle de cotas e nobreaks para manter a secretaria e o financeiro sem interrupções.',
      icon: 'Printer'
    },
    {
      title: 'Wi-Fi Escolar de Alta Densidade',
      desc: 'Projetos de rede sem fio capazes de suportar centenas de alunos conectados simultaneamente no pátio e salas sem lentidão.',
      icon: 'Wifi'
    },
    {
      title: 'Suporte Técnico Prioritário para Ensino',
      desc: 'Plantão técnico e atendimento imediato durante períodos de avaliações, vestibulares e matrículas escolares.',
      icon: 'ShieldCheck'
    }
  ],
  benefits: [
    'Preservação do caixa da escola: sem imobilizar grandes valores em compra de equipamentos',
    'Renovação programada do parque tecnológico a cada ciclo contratual',
    'Substituição de máquinas danificadas sem custo adicional de peças',
    'Conformidade com a BNCC e capacitação para ferramentas digitais'
  ]
};
