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
    description: 'Equipamentos de alta performance para empresas e instituições com suporte e substituição ágil inclusos no contrato.',
    items: [
      'Computadores Desktop & Workstations',
      'Notebooks Corporativos & Ultrabooks',
      'Impressoras & Multifuncionais Gerenciadas',
      'Celulares & Tablets Corporativos',
      'Monitores Profissionais & Displays',
      'Equipamentos de Infraestrutura e Redes'
    ],
    ctaText: 'Conhecer Locação',
    targetSection: 'locacao',
    highlightText: 'Atualização contínua do parque, zero custo de manutenção e deduções fiscais em OPEX.',
    badge: 'Mais Procurado'
  },
  {
    id: 'vendas',
    tag: 'Ouzze Vendas',
    name: 'Venda Consultiva',
    title: 'Equipamentos certos para cada operação.',
    description: 'Fornecimento de hardware corporativo com procedência, garantia estendida e orientação técnica especializada para sua infraestrutura.',
    items: [
      'Computadores e Desktops Customizados',
      'Notebooks Executivos e de Engenharia',
      'Hardware Corporativo & Upgrades',
      'Periféricos Profissionais & Acessórios',
      'Impressoras e Multifuncionais',
      'Racks, Switches e Equipamentos de Rede'
    ],
    ctaText: 'Conhecer Vendas',
    targetSection: 'locacao',
    highlightText: 'Equipamentos corporativos de alta durabilidade com faturamento B2B personalizado.',
    badge: 'Hardware Corporativo'
  },
  {
    id: 'servicos',
    tag: 'Ouzze Serviços',
    name: 'Gestão & Suporte de TI',
    title: 'Sua operação funcionando. Sempre.',
    description: 'Suporte técnico proativo, manutenção preventiva/corretiva e engenharia de redes para manter sua infraestrutura segura e disponível.',
    items: [
      'Suporte Remoto com Atendimento Ágil',
      'Suporte Presencial e Field Service Especializado',
      'Manutenção Preventiva e Inspeções Periódicas',
      'Manutenção Corretiva e Reparo Avançado',
      'Projetos de Cabeamento Estruturado e Wi-Fi',
      'Instalação, Implantação e Padronização de Imagens'
    ],
    ctaText: 'Conhecer Serviços',
    targetSection: 'servicos',
    highlightText: 'Equipe especializada com monitoramento contínuo e chamados centralizados.',
    badge: 'Continuidade B2B'
  }
];

export const RENTAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'desktops-workstations',
    name: 'Computadores & Workstations',
    category: 'computadores',
    categoryLabel: 'Desktops & Workstations',
    shortDesc: 'Equipamentos corporativos configurados para tarefas administrativas ou cargas pesadas de engenharia e design.',
    specs: ['Processadores Intel Core i5/i7/i9 e equivalentes', 'Memória RAM de 16GB a 64GB DDR4/DDR5', 'Armazenamento SSD NVMe de alta velocidade', 'Opções com Placas Gráficas Dedicadas'],
    recommendedFor: 'Escritórios, Desenvolvedores, Engenharia, Finanças',
    iconName: 'Monitor',
    badge: 'Alta Performance'
  },
  {
    id: 'notebooks-executivos',
    name: 'Notebooks Corporativos',
    category: 'notebooks',
    categoryLabel: 'Notebooks Corporativos',
    shortDesc: 'Mobilidade corporativa com segurança de dados, chassi reforçado e autonomia para a rotina de trabalho.',
    specs: ['Telas 14" e 15.6" Full HD Anti-reflexo', 'Processadores corporativos com segurança por hardware', 'Baterias com autonomia para jornada de trabalho', 'Estrutura reforçada para uso corporativo'],
    recommendedFor: 'Equipes Híbridas, Vendas Externas, Gestores e Docentes',
    iconName: 'Laptop',
    badge: 'Mobilidade'
  },
  {
    id: 'impressoras-multifuncionais',
    name: 'Impressoras & Multifuncionais',
    category: 'impressoras',
    categoryLabel: 'Impressoras & Outsourcing',
    shortDesc: 'Parque de impressão corporativo com suporte, manutenção e substituição de consumíveis conforme contrato.',
    specs: ['Laser Monocromático e Colorido de Alta Velocidade', 'Digitalização em rede e duplex automático', 'Gerenciamento e controle de impressão', 'Manutenção e suporte técnico inclusos'],
    recommendedFor: 'Escolas, Clínicas, Escritórios e Centros Logísticos',
    iconName: 'Printer',
    badge: 'Gestão Inteligente'
  },
  {
    id: 'celulares-tablets',
    name: 'Celulares & Tablets Corporativos',
    category: 'celulares',
    categoryLabel: 'Dispositivos Móveis',
    shortDesc: 'Smartphones e tablets corporativos com suporte a gerenciamento centralizado (MDM) para equipes.',
    specs: ['Compatibilidade com ecossistemas corporativos', 'Suporte a gerenciamento remoto e políticas de segurança', 'Acessórios de proteção para uso diário', 'Configuração e preparação sob medida'],
    recommendedFor: 'Logística, Vendas em Campo, Ensino Digital e Auditorias',
    iconName: 'Smartphone',
    badge: 'Uso Corporativo'
  },
  {
    id: 'monitores-ergonomia',
    name: 'Monitores Profissionais',
    category: 'monitores',
    categoryLabel: 'Monitores & Displays',
    shortDesc: 'Telas profissionais com ajustes de ergonomia, conforto visual e alta nitidez para trabalho contínuo.',
    specs: ['Telas IPS de 24", 27" e formatos ultrawide', 'Ajuste de altura, inclinação e rotação pivot', 'Recursos de conforto visual contra fadiga ocular', 'Conexões HDMI, DisplayPort e USB'],
    recommendedFor: 'Produtividade de escritório, Design, Finanças e Operações',
    iconName: 'Tv',
    badge: 'Conforto Visual'
  },
  {
    id: 'infra-servidores',
    name: 'Equipamentos de Infra & Redes',
    category: 'corporativo',
    categoryLabel: 'Infraestrutura de TI',
    shortDesc: 'Switches empresariais, access points corporativos, nobreaks senoidais e soluções de conectividade.',
    specs: ['Switches gerenciáveis Gigabit e PoE', 'Access Points corporativos com ampla cobertura', 'Nobreaks senoidais para proteção energética', 'Acessórios de cabeamento e organização'],
    recommendedFor: 'Novas filiais, reestruturações de sede e eventos temporários',
    iconName: 'Server',
    badge: 'Rede Corporativa'
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'suporte-remoto',
    title: 'Suporte Remoto Proativo',
    category: 'suporte',
    description: 'Central de atendimento para resolução ágil de chamados do dia a dia, dúvidas de usuários e suporte a softwares sem deslocamento.',
    features: ['Atendimento por múltiplos canais (WhatsApp e chamados)', 'Abertura e acompanhamento estruturado de solicitações', 'Instalação e configuração remota de softwares autorizados', 'Diagnóstico e manutenção lógica de computadores'],
    sla: 'Atendimento ágil multicanal',
    iconName: 'Headphones'
  },
  {
    id: 'suporte-presencial',
    title: 'Suporte Presencial (Field Service)',
    category: 'suporte',
    description: 'Técnicos qualificados para visitas agendadas ou atendimentos na sua sede, resolvendo falhas físicas e de infraestrutura.',
    features: ['Visitas de rotina e vistorias preventivas', 'Substituição ágil de peças e equipamentos', 'Alocação técnica conforme necessidade do contrato', 'Organização de postos de trabalho e cabeamento'],
    sla: 'Atendimento presencial programado',
    iconName: 'UserCheck'
  },
  {
    id: 'manutencao-preventiva',
    title: 'Manutenção Preventiva',
    category: 'manutencao',
    description: 'Inspeções periódicas para limpeza interna, renovação de pasta térmica, atualização de softwares e testes de hardware.',
    features: ['Prolonga a vida útil do parque de TI', 'Reduz o risco de paradas inesperadas', 'Avaliação da integridade de discos e memórias', 'Padronização periódica do sistema operacional'],
    sla: 'Cronograma periódico',
    iconName: 'ShieldCheck'
  },
  {
    id: 'manutencao-corretiva',
    title: 'Manutenção Corretiva Especializada',
    category: 'manutencao',
    description: 'Diagnóstico e conserto especializado para recuperação de notebooks, desktops, fontes e componentes de hardware.',
    features: ['Diagnóstico técnico com instrumental especializado', 'Reparo e recuperação de placas e conectores', 'Substituição por peças compatíveis de alta qualidade', 'Relatório e garantia do serviço executado'],
    sla: 'Laudo técnico estruturado',
    iconName: 'Wrench'
  },
  {
    id: 'redes-conectividade',
    title: 'Infraestrutura de Redes e Wi-Fi',
    category: 'infraestrutura',
    description: 'Projetos de rede cabeada estruturada, fibra óptica e redes sem fio empresariais com estabilidade e segurança.',
    features: ['Planejamento e passagem de pontos de rede cabeada', 'Wi-Fi corporativo de alta densidade sem pontos cegos', 'Configuração de roteadores, switches e firewalls', 'Organização e identificação padrão de racks'],
    sla: 'Projetos estruturados',
    iconName: 'Network'
  },
  {
    id: 'implantacao-configuracao',
    title: 'Instalação e Configuração de TI',
    category: 'instalacao',
    description: 'Padronização e preparação de parques computacionais para operação imediata dos colaboradores e equipes.',
    features: ['Instalação e clonagem de sistemas em lote', 'Configuração de e-mails corporativos e perfis de acesso', 'Aplicação de políticas de segurança e proteção de dados', 'Configuração de rotinas de backup e restauração'],
    sla: 'Implantação ágil',
    iconName: 'Cpu'
  }
];

export const SEGMENTS_DATA: SegmentItem[] = [
  {
    id: 'educacao',
    title: 'Educação',
    subtitle: 'Escolas, faculdades e instituições de ensino',
    description: 'Laboratórios de informática, notebooks para corpo docente, tablets pedagógicos e infraestrutura de rede resiliente para aulas presenciais e plataformas digitais.',
    keyBenefits: [
      'Laboratórios completos configurados para o ambiente escolar',
      'Notebooks resistentes para coordenação e professores',
      'Rede Wi-Fi dimensionada para múltiplos acessos simultâneos',
      'Suporte técnico alinhado ao calendário letivo'
    ],
    slug: '/educacao',
    iconName: 'GraduationCap',
    statsHighlight: 'Destaque Educacional'
  },
  {
    id: 'empresas',
    title: 'Empresas & Escritórios',
    subtitle: 'Soluções completas para operações corporativas',
    description: 'Padronização de computadores, suporte técnico dedicado e flexibilidade para contratações, novas filiais e trabalho híbrido.',
    keyBenefits: [
      'Parque de máquinas atualizado com flexibilidade de contrato',
      'Redução de paradas operacionais e chamados improdutivos',
      'Gestão simplificada do inventário de TI',
      'Substituição ágil de equipamentos inclusa'
    ],
    slug: '#empresas-info',
    iconName: 'Building2',
    statsHighlight: 'Continuidade Operacional'
  },
  {
    id: 'saude',
    title: 'Saúde & Clínicas',
    subtitle: 'Clínicas, consultórios e laboratórios',
    description: 'Equipamentos ágeis para recepções e consultórios, monitores de alta nitidez para visualização de sistemas e suporte confiável.',
    keyBenefits: [
      'Estações de trabalho rápidas para prontuários eletrônicos',
      'Monitores com alta definição e conforto visual',
      'Ambiente de rede configurado com foco em segurança de dados',
      'Impressão de laudos e receituários com reposição ágil'
    ],
    slug: '#saude-info',
    iconName: 'Activity',
    statsHighlight: 'Segurança & Estabilidade'
  },
  {
    id: 'eventos',
    title: 'Eventos & Feiras',
    subtitle: 'Estrutura tecnológica temporária',
    description: 'Locação sob medida de notebooks para credenciamento, totens, impressoras de crachás e infraestrutura de conectividade temporária.',
    keyBenefits: [
      'Locação flexível por dias, semanas ou meses',
      'Equipamentos testados e prontos para uso imediato',
      'Suporte técnico presencial durante a realização do evento',
      'Logística de entrega, instalação e retirada'
    ],
    slug: '#eventos-info',
    iconName: 'CalendarRange',
    statsHighlight: 'Estrutura Temporária'
  },
  {
    id: 'setor-publico',
    title: 'Setor Público',
    subtitle: 'Órgãos e instituições públicas',
    description: 'Atendimento a editais, atas e contratos com rigor documental, conformidade técnica e suporte formal.',
    keyBenefits: [
      'Equipamentos em conformidade com o termo de referência',
      'Documentação e certidões organizadas',
      'Acompanhamento técnico por profissionais qualificados',
      'Capacidade de atendimento conforme o projeto contratado'
    ],
    slug: '#setor-publico-info',
    iconName: 'Landmark',
    statsHighlight: 'Rigor Documental'
  }
];

export const BENEFITS_DATA: BenefitItem[] = [
  {
    id: 'solucoes-completas',
    title: 'Solução Completa',
    description: 'Locação, venda de hardware e serviços de engenharia de TI integrados em um só parceiro.',
    iconName: 'Layers'
  },
  {
    id: 'flexibilidade-contratual',
    title: 'Flexibilidade',
    description: 'Projetos adaptados à necessidade real de cada operação, com prazos e quantidades sob medida.',
    iconName: 'Sliders'
  },
  {
    id: 'atendimento-especializado',
    title: 'Atendimento Especializado',
    description: 'Contato direto com equipe técnica e comercial preparada para entender demandas B2B.',
    iconName: 'Users'
  },
  {
    id: 'escalabilidade',
    title: 'Escalabilidade',
    description: 'Estrutura que acompanha o crescimento e as demandas de diferentes tamanhos de projeto.',
    iconName: 'TrendingUp'
  }
];

export const STATS_DATA: StatItem[] = [
  {
    id: 'equipamentos',
    prefix: '',
    value: 0,
    suffix: '',
    displayPlaceholder: 'B2B',
    label: 'Equipamentos Corporativos',
    description: 'Desktops, notebooks e infraestrutura empresarial'
  }
];

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Entendemos sua necessidade',
    description: 'Realizamos um diagnóstico detalhado da sua operação, identificando quantidade de usuários, perfis de uso, softwares necessários e prazos.',
    details: 'Alinhamento consultivo com especialistas técnicos.'
  },
  {
    number: '02',
    title: 'Desenvolvemos a solução sob medida',
    description: 'Apresentamos uma proposta personalizada indicando o melhor modelo (locação, aquisição ou suporte) com total transparência de custos.',
    details: 'Planejamento de OPEX/CAPEX e dimensionamento de infraestrutura.'
  },
  {
    number: '03',
    title: 'Preparamos os equipamentos e serviços',
    description: 'Configuramos, testamos em bancada e padronizamos as máquinas com os sistemas, navegadores e ferramentas da sua empresa.',
    details: 'Processo rigoroso de controle de qualidade e testes de estresse.'
  },
  {
    number: '04',
    title: 'Implantamos na sua operação',
    description: 'Entregamos os equipamentos e realizamos a montagem e conexão no seu ambiente, garantindo que tudo funcione perfeitamente.',
    details: 'Equipe técnica especializada e entrega pronta para uso.'
  },
  {
    number: '05',
    title: 'Acompanhamos sua operação continuamente',
    description: 'Suporte técnico contínuo, manutenções periódicas e substituição ágil em caso de qualquer eventualidade durante todo o contrato.',
    details: 'Seu time foca no negócio, enquanto a Ouzze cuida da tecnologia.'
  }
];

export const EDUCATION_PAGE_DATA = {
  hero: {
    badge: 'Ouzze Educação',
    title: 'Tecnologia que transforma salas de aula em centros de inovação.',
    subtitle: 'Soluções completas de locação e infraestrutura de TI para escolas, faculdades e redes de ensino.',
    description: 'Fornecemos desde laboratórios completos e notebooks para professores até redes Wi-Fi de alta densidade e suporte técnico dedicado conforme o projeto contratado.',
  },
  solutions: [
    {
      title: 'Laboratórios de Informática Completos',
      desc: 'Computadores de alta durabilidade, monitores ergonômicos e softwares pedagógicos configurados para a rotina de alunos e professores.',
      icon: 'Monitor'
    },
    {
      title: 'Notebooks para Professores & Coordenação',
      desc: 'Dispositivos portáteis e ágeis com boa autonomia de bateria para preparo de aulas, diários eletrônicos e atividades pedagógicas.',
      icon: 'Laptop'
    },
    {
      title: 'Tablets & Dispositivos Educacionais',
      desc: 'Tablets com acessórios de proteção e suporte a gestão de conteúdo para projetos de leitura digital e salas colaborativas.',
      icon: 'Tablet'
    },
    {
      title: 'Ambientes Administrativos & Secretaria',
      desc: 'Desktops, impressoras gerenciadas e nobreaks para manter a secretaria e o setor administrativo sempre operacionais.',
      icon: 'Printer'
    },
    {
      title: 'Wi-Fi Escolar de Alta Densidade',
      desc: 'Projetos de rede sem fio dimensionados para suportar múltiplos alunos e docentes conectados simultaneamente com estabilidade.',
      icon: 'Wifi'
    },
    {
      title: 'Suporte Técnico Dedicado para Ensino',
      desc: 'Atendimento técnico e manutenção programados de acordo com a rotina e o calendário letivo da instituição.',
      icon: 'ShieldCheck'
    }
  ],
  benefits: [
    'Preservação do capital: sem imobilizar grandes recursos em compra de equipamentos',
    'Renovação programada do parque tecnológico a cada ciclo contratual',
    'Substituição de equipamentos com defeito inclusa no contrato',
    'Suporte técnico e implantação orientados para o ambiente escolar'
  ]
};


