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

export const SALES_PAGE_DATA = {
  hero: {
    badge: 'Ouzze Venda de Hardware Corporativo',
    title: 'Venda de equipamentos de TI com procedência, garantia e faturamento PJ.',
    subtitle: 'Workstations, computadores, notebooks corporativos e servidores para expandir seu parque tecnológico.',
    description: 'Atendemos empresas, indústrias e escritórios com hardware corporativo de alta durabilidade, nota fiscal integral, faturamento no boleto faturado para PJ e consultoria para dimensionamento de lote.',
  },
  categories: [
    {
      id: 'desktops',
      title: 'Desktops & Workstations Empresariais',
      desc: 'Computadores de alta durabilidade, gabinetes industriais, fontes 80 Plus e placas gráficas dedicadas para engenharia, arquitetura, design e finanças.',
      specs: [
        'Processadores Intel Core i5/i7/i9 e Xeon / AMD Ryzen Pro',
        'Memórias DDR4/DDR5 com ECC opcional',
        'SSDs NVMe de alto IOPS com criptografia de hardware',
        'Suporte nativo a múltiplos monitores'
      ],
      icon: 'Monitor',
      badge: 'Alta Performance'
    },
    {
      id: 'notebooks',
      title: 'Notebooks Corporativos & Ultrabooks',
      desc: 'Portáteis de classe empresarial (ThinkPad, Latitude, ProBook) com teclado ergonômico, resistência mecânica contra impactos e leitor biométrico.',
      specs: [
        'Chassi reforçado em fibra de carbono ou magnésio',
        'Autonomia de bateria prolongada e recarga rápida',
        'Telas foscas antirreflexo Full HD/2K',
        'Garantia corporativa com reposição ágil'
      ],
      icon: 'Laptop',
      badge: 'Mobilidade B2B'
    },
    {
      id: 'servidores',
      title: 'Servidores & Armazenamento em Rede',
      desc: 'Servidores em torre ou formato rack de 1U a 4U, storages NAS para contingência de dados e fontes redundantes hot-swap.',
      specs: [
        'Controladoras RAID por hardware com bateria de cache',
        'Discos SAS/Enterprise e SSDs para leitura intensa',
        'Gerenciamento remoto out-of-band (iDRAC / iLO)',
        'Fontes redundantes bivolt automáticas'
      ],
      icon: 'Server',
      badge: 'Alta Disponibilidade'
    },
    {
      id: 'monitores',
      title: 'Monitores Profissionais & Ergonomia',
      desc: 'Telas ergonômicas certificadas para NR-17, com regulagem de altura e tecnologia de conforto visual contra fadiga ocular.',
      specs: [
        'Painéis IPS de 24", 27" e 34" Ultrawide',
        'Hub USB integrado e portas HDMI/DisplayPort/Type-C',
        'Base pivot com regulagem de altura e inclinação',
        'Baixo consumo energético com certificação Energy Star'
      ],
      icon: 'Tv',
      badge: 'Ergonomia NR-17'
    },
    {
      id: 'redes',
      title: 'Switches, Roteadores & Racks',
      desc: 'Infraestrutura completa de rede para matriz e filiais, garantindo estabilidade de tráfego, PoE para câmeras/APs e nobreaks senoidais.',
      specs: [
        'Switches Gigabit e 10G gerenciáveis L2/L3',
        'Access Points corporativos Wi-Fi 6 de alta densidade',
        'Racks organizadores de 6U a 44U padrão 19 polegadas',
        'Nobreaks senoidais com gerenciamento SNMP'
      ],
      icon: 'Network',
      badge: 'Infraestrutura'
    },
    {
      id: 'impressao',
      title: 'Impressoras & Multifuncionais Laser',
      desc: 'Equipamentos de alta tiragem para faturamento, logística, escritórios e expedição com baixo custo de impressão.',
      specs: [
        'Tecnologia laser monocromática e colorida',
        'Alimentador automático de documentos (ADF) duplex',
        'Conexão em rede cabeada e Wi-Fi corporativo',
        'Alta capacidade de bandeja de entrada'
      ],
      icon: 'Printer',
      badge: 'Alta Tiragem'
    }
  ],
  differentials: [
    'Faturamento faturado no boleto bancário direto para Pessoa Jurídica (28/35/42 dias)',
    'Garantia de 12 a 36 meses com atendimento prioritário e reposição ágil de peças',
    'Equipamentos entregues testados em bancada com sistema operacional homologado',
    'Procedência comprovada com Nota Fiscal integral e rastreabilidade por número de série',
    'Condições especiais para compra de lotes homogêneos e renovação de parque',
    'Consultoria técnica pré-venda para evitar compras superdimensionadas ou incompatíveis'
  ],
  steps: [
    {
      number: '01',
      title: 'Diagnóstico e Dimensionamento',
      desc: 'Entendemos a aplicação do hardware na sua empresa e definimos a melhor configuração custo-benefício.'
    },
    {
      number: '02',
      title: 'Proposta Comercial PJ',
      desc: 'Apresentamos cotação com opções de pagamento flexíveis faturadas para sua Pessoa Jurídica.'
    },
    {
      number: '03',
      title: 'Testes & Padronização em Bancada',
      desc: 'Configuramos os equipamentos, executamos testes de estresse e aplicamos a imagem do sistema desejado.'
    },
    {
      number: '04',
      title: 'Entrega Técnica & Garantia',
      desc: 'Envio seguro com nota fiscal eletrônica e suporte de garantia ativado imediatamente.'
    }
  ]
};

export const SERVICES_PAGE_DATA = {
  hero: {
    badge: 'Ouzze Serviços & Suporte Técnico de TI',
    title: 'Terceirização de TI e suporte especializado para sua empresa nunca parar.',
    subtitle: 'Helpdesk remoto ágil, manutenção preventiva/corretiva, visitas técnicas presenciais e engenharia de redes.',
    description: 'Elimine gargalos operacionais e proteja a continuidade do seu negócio. Contratos de suporte corporativo sob medida com SLA garantido, técnicos certificados e atendimento multicanal.',
  },
  services: [
    {
      id: 'helpdesk-remoto',
      title: 'Helpdesk Remoto (Níveis 1 e 2)',
      desc: 'Central de atendimento ágil para resolução rápida de lentidões, configuração de e-mails corporativos, impressoras em rede, softwares e dúvidas de colaboradores sem deslocamento.',
      sla: 'Atendimento inicial em até 15 minutos para chamados prioritários',
      features: [
        'Abertura descomplicada via WhatsApp corporativo e portal',
        'Taxa de resolução no primeiro contato superior a 85%',
        'Instalação e homologação remota de softwares corporativos',
        'Configuração de VPN segura e ferramentas para trabalho híbrido'
      ],
      icon: 'Headphones'
    },
    {
      id: 'field-service',
      title: 'Suporte Presencial (Field Service)',
      desc: 'Visitas técnicas programadas ou emergenciais com profissionais qualificados para troca física de peças, formatação no local, organização de postos de trabalho e vistorias.',
      sla: 'Visitas periódicas de rotina ou atendimento presencial emergencial',
      features: [
        'Técnicos alocados em dias fixos ou conforme chamado',
        'Diagnóstico e substituição de hardware físico no local',
        'Organização e padronização ergonômica de cabeamento de mesas',
        'Acompanhamento técnico presencial em auditorias de TI'
      ],
      icon: 'UserCheck'
    },
    {
      id: 'manutencao-preventiva',
      title: 'Manutenção Preventiva de Parque',
      desc: 'Inspeções e intervenções regulares para limpeza interna contra poeira, renovação de composto térmico, verificação da integridade de memórias e discos SSD/HD.',
      sla: 'Ciclos periódicos mensais ou trimestrais programados',
      features: [
        'Prolonga em até 40% a vida útil das estações de trabalho',
        'Elimina paradas não planejadas e superaquecimento',
        'Identificação antecipada de componentes próximos ao desgaste',
        'Emissão de relatório técnico de integridade a cada rodada'
      ],
      icon: 'ShieldCheck'
    },
    {
      id: 'manutencao-corretiva',
      title: 'Manutenção Corretiva & Laboratório Especializado',
      desc: 'Bancada técnica completa equipada para conserto avançado de placas-mãe, fontes de alimentação, substituição de telas de notebooks e recuperação física.',
      sla: 'Diagnóstico técnico estruturado com orçamento transparente',
      features: [
        'Reparo especializado em circuitos de alimentação e VRM',
        'Recuperação de carcaças, dobradiças e portas USB/HDMI',
        'Substituição por peças homologadas com garantia formal',
        'Emissão de laudo pericial para seguradoras ou inventário'
      ],
      icon: 'Wrench'
    },
    {
      id: 'redes-cabeamento',
      title: 'Cabeamento Estruturado & Redes Wi-Fi',
      desc: 'Projetos e execução de cabeamento de dados Cat6/Cat6A, fusão de fibra óptica, organização e certificação de racks, roteadores de borda e Wi-Fi sem pontos cegos.',
      sla: 'Projetos certificados com documentação completa',
      features: [
        'Certificação de pontos de rede com entrega de relatório',
        'Organização e identificação visual de racks de servidores',
        'Wi-Fi corporativo de alta densidade com rede de visitantes isolada',
        'Configuração de firewalls, switches gerenciáveis e regras de acesso'
      ],
      icon: 'Network'
    },
    {
      id: 'backup-seguranca',
      title: 'Gestão de Ativos, Backup & Segurança',
      desc: 'Padronização do parque computacional, aplicação de políticas de segurança, rotinas automatizadas de backup em nuvem (regra 3-2-1) e antivírus gerenciado.',
      sla: 'Monitoramento contínuo da integridade dos dados',
      features: [
        'Rotinas de cópias de segurança criptografadas em nuvem',
        'Clonagem rápida de imagens para integração imediata de novos funcionários',
        'Controle de privilégios de usuário e bloqueio de dispositivos USB',
        'Adequação básica da infraestrutura às boas práticas da LGPD'
      ],
      icon: 'Cpu'
    }
  ],
  contractModels: [
    {
      id: 'gestao-completa',
      title: 'Contrato de TI Completo (MSP)',
      desc: 'Gestão contínua com chamados ilimitados, visitas preventivas, monitoramento proativo e SLA garantido. Ideal para empresas a partir de 5 computadores.',
      badge: 'Mais Escolhido'
    },
    {
      id: 'banco-horas',
      title: 'Banco de Horas Pré-Pago',
      desc: 'Pacote flexível de horas técnicas para suporte remoto ou presencial sem mensalidade fixa. Ideal para empresas com demandas sazonais.',
      badge: 'Flexibilidade'
    },
    {
      id: 'projetos-avulsos',
      title: 'Projetos Especiais & Implantação',
      desc: 'Contratação pontual para mudança de sede, implantação de cabeamento estruturado, auditoria de segurança ou padronização de parque computacional.',
      badge: 'Pontual / Sob Medida'
    }
  ],
  differentials: [
    'Economia de até 40% em relação aos custos de manter um departamento próprio interno',
    'Central ágil de chamados com múltiplos canais (WhatsApp corporativo e chamados)',
    'Equipe multidisciplinar especializada em hardware, servidores e redes corporativas',
    'Atendimento preventivo focado em evitar interrupções que prejudiquem as vendas',
    'Relatórios periódicos de chamados e saúde das estações para a diretoria'
  ]
};

export const RENTAL_PAGE_DATA = {
  hero: {
    badge: 'Ouzze Locação Corporativa de TI',
    title: 'Locação de computadores, notebooks e infraestrutura para sua empresa.',
    subtitle: 'Parque computacional moderno com suporte técnico, manutenção e substituição expressa inclusos no contrato.',
    description: 'Converta investimentos pesados de compra (CAPEX) em despesas operacionais 100% dedutíveis no IRPJ/CSLL (OPEX). Conte com equipamentos de última geração, zero custo imprevisto de manutenção e suporte contínuo.',
  },
  benefits: [
    'Preservação total de fluxo de caixa e capital de giro',
    '100% das parcelas dedutíveis como despesa operacional (Lucro Real)',
    'Manutenção preventiva e corretiva inclusas em todo o período',
    'Substituição ágil de máquinas com defeito sem parar sua equipe',
    'Atualização periódica do parque computacional a cada ciclo contratual',
    'Equipamentos entregues padronizados e prontos para uso imediato'
  ]
};


