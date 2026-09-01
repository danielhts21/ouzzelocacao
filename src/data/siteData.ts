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
    shortDesc: 'Equipamentos configurados para tarefas administrativas ou cargas pesadas de engenharia e design.',
    specs: ['Processadores Intel Core i5/i7/i9 & Xeon', 'Memória RAM de 16GB a 64GB DDR4/DDR5', 'Armazenamento SSD NVMe Ultra Rápido', 'Opções com Placas Gráficas Dedicadas RTX'],
    recommendedFor: 'Escritórios, Desenvolvedores, Engenharia, Finanças',
    iconName: 'Monitor',
    badge: 'Alta Performance'
  },
  {
    id: 'notebooks-executivos',
    name: 'Notebooks Corporativos',
    category: 'notebooks',
    categoryLabel: 'Notebooks Corporativos',
    shortDesc: 'Mobilidade com segurança de dados, chassi reforçado e longa duração de bateria.',
    specs: ['Telas 14" e 15.6" Full HD / IPS Anti-reflexo', 'Processadores corporativos com TPM 2.0', 'Baterias de alta densidade e carregamento rápido', 'Peso reduzido e resistência estrutural'],
    recommendedFor: 'Equipes Híbridas, Vendas Externas, Gestores e Docentes',
    iconName: 'Laptop',
    badge: 'Mobilidade'
  },
  {
    id: 'impressoras-multifuncionais',
    name: 'Impressoras & Multifuncionais',
    category: 'impressoras',
    categoryLabel: 'Impressoras & Outsourcing',
    shortDesc: 'Parque de impressão controlado com fornecimento contínuo de consumíveis e manutenção.',
    specs: ['Laser Monocromático e Colorido de Alta Velocidade', 'Digitalização em rede e duplex automático', 'Controle de cotas de impressão por usuário', 'Manutenção preventiva e troca de suprimentos inclusa'],
    recommendedFor: 'Escolas, Clínicas, Escritórios e Centros Logísticos',
    iconName: 'Printer',
    badge: 'Gestão Inteligente'
  },
  {
    id: 'celulares-tablets',
    name: 'Celulares & Tablets Corporativos',
    category: 'celulares',
    categoryLabel: 'Dispositivos Móveis',
    shortDesc: 'Smartphones e tablets gerenciados com MDM para forças de vendas e equipes de campo.',
    specs: ['Android Enterprise & iOS homologados', 'Gestão remota de aplicativos e segurança (MDM)', 'Capas de proteção e películas aplicadas', 'Chips de dados configuráveis sob demanda'],
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
    recommendedFor: 'Produtividade de escritório, Design, Finanças e Operações',
    iconName: 'Tv',
    badge: 'Ergonomia'
  },
  {
    id: 'infra-servidores',
    name: 'Equipamentos de Infra & Redes',
    category: 'corporativo',
    categoryLabel: 'Infraestrutura de TI',
    shortDesc: 'Switches gerenciáveis, roteadores empresariais, access points corporativos e nobreaks senoidais.',
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
    features: ['Atendimento por múltiplos canais (Helpdesk, WhatsApp, Telefone)', 'Abertura e controle de chamados com protocolo direto', 'Instalação remota de softwares e drivers autorizados', 'Limpeza lógica e segurança de endpoints'],
    sla: 'Atendimento ágil multicanal',
    iconName: 'Headphones'
  },
  {
    id: 'suporte-presencial',
    title: 'Suporte Presencial (Field Service)',
    category: 'suporte',
    description: 'Técnicos especializados para visitas agendadas ou intervenções na sua sede, resolvendo falhas físicas e de infraestrutura.',
    features: ['Visitas periódicas de rotina e vistorias de conformidade', 'Substituição rápida de peças e equipamentos com defeito', 'Alocação de técnico residente para operações de grande porte', 'Organização física de postos de trabalho e cabeamento'],
    sla: 'Atendimento presencial prioritário',
    iconName: 'UserCheck'
  },
  {
    id: 'manutencao-preventiva',
    title: 'Manutenção Preventiva',
    category: 'manutencao',
    description: 'Inspeções programadas para limpeza interna, troca de pasta térmica, atualização de firmwares e testes de hardware.',
    features: ['Prolonga a vida útil do parque tecnológico', 'Evita paradas repentinas e perda de dados operacionais', 'Relatórios técnicos de integridade de discos e componentes', 'Padronização periódica do sistema operacional'],
    sla: 'Cronograma programado',
    iconName: 'ShieldCheck'
  },
  {
    id: 'manutencao-corretiva',
    title: 'Manutenção Corretiva Especializada',
    category: 'manutencao',
    description: 'Laboratório técnico próprio para conserto avançado de placas-mãe, fontes, dobradiças e displays de notebooks.',
    features: ['Diagnóstico com instrumental eletrônico especializado', 'Reparo em nível de componentes (BGA, SMD e circuitos)', 'Peças de reposição originais e certificadas', 'Garantia técnica documentada por ordem de serviço'],
    sla: 'Laudo técnico detalhado',
    iconName: 'Wrench'
  },
  {
    id: 'redes-conectividade',
    title: 'Infraestrutura de Redes e Wi-Fi',
    category: 'infraestrutura',
    description: 'Engenharia de rede cabeada Cat6/Cat6a, fibra óptica e redes sem fio corporativas com segmentação de tráfego.',
    features: ['Mapeamento e certificação de pontos de rede cabeada', 'Wi-Fi corporativo de alta densidade sem zonas de sombra', 'Configuração de Firewalls, VPNs corporativas e roteamento', 'Organização e identificação padrão de racks e patch panels'],
    sla: 'Projetos certificados',
    iconName: 'Network'
  },
  {
    id: 'implantacao-configuracao',
    title: 'Instalação e Configuração de TI',
    category: 'instalacao',
    description: 'Padronização completa de novos parques computacionais com criação de imagens de sistema personalizadas.',
    features: ['Clonagem e implantação rápida de lotes de máquinas', 'Ingresso em domínios Active Directory / Azure AD / Google Workspace', 'Políticas de segurança de endpoint e proteção corporativa', 'Backup automatizado de dados e perfis de usuário'],
    sla: 'Implantação estruturada',
    iconName: 'Cpu'
  }
];

export const SEGMENTS_DATA: SegmentItem[] = [
  {
    id: 'educacao',
    title: 'Educação',
    subtitle: 'Escolas, faculdades e instituições de ensino',
    description: 'Laboratórios de informática modernos, notebooks para docentes, tablets pedagógicos e infraestrutura de rede resiliente para aulas e avaliações.',
    keyBenefits: [
      'Laboratórios completos com bloqueio pedagógico',
      'Notebooks resistentes para corpo docente',
      'Rede Wi-Fi de alta densidade para múltiplos acessos simultâneos',
      'Suporte prioritário durante períodos letivos e matrículas'
    ],
    slug: '/educacao',
    iconName: 'GraduationCap',
    statsHighlight: 'Solução Especializada'
  },
  {
    id: 'empresas',
    title: 'Empresas & Escritórios',
    subtitle: 'Soluções completas para operações corporativas',
    description: 'Padronização de computadores, suporte Helpdesk dedicado e escalabilidade ágil para contratações, novas filiais e trabalho híbrido.',
    keyBenefits: [
      'Parque de máquinas atualizado com flexibilidade de contrato',
      'Redução de paradas operacionais e chamados improdutivos',
      'Gestão de ativos de TI e inventário simplificado',
      'Substituição ágil de equipamentos sem custo extra'
    ],
    slug: '#empresas-info',
    iconName: 'Building2',
    statsHighlight: 'Continuidade Operacional'
  },
  {
    id: 'saude',
    title: 'Saúde & Clínicas',
    subtitle: 'Clínicas, laboratórios e hospitais',
    description: 'Equipamentos higienizáveis para recepções e consultórios, computadores de alta resolução para laudos médicos e suporte ininterrupto.',
    keyBenefits: [
      'Estações de trabalho rápidas para prontuários eletrônicos',
      'Monitores com fidelidade para visualização de exames',
      'Rede isolada para segurança e conformidade LGPD',
      'Impressão térmica e de receituários com reposição rápida'
    ],
    slug: '#saude-info',
    iconName: 'Activity',
    statsHighlight: 'Segurança & Conformidade'
  },
  {
    id: 'eventos',
    title: 'Eventos & Feiras',
    subtitle: 'Estrutura tecnológica temporária',
    description: 'Locação de curto prazo de notebooks para credenciamento, totens interativos, impressoras térmicas para crachás e Wi-Fi de evento.',
    keyBenefits: [
      'Locação sob medida por dias, semanas ou meses',
      'Equipamentos entregues testados e pré-configurados',
      'Plantão técnico presencial durante a realização do evento',
      'Logística de montagem, desmontagem e recolhimento'
    ],
    slug: '#eventos-info',
    iconName: 'CalendarRange',
    statsHighlight: 'Estrutura Temporária'
  },
  {
    id: 'setor-publico',
    title: 'Setor Público',
    subtitle: 'Órgãos e instituições públicas',
    description: 'Atendimento a editais, atas de registro de preços e contratos governamentais com rigor documental, garantias fiscais e suporte técnico formal.',
    keyBenefits: [
      'Equipamentos em estrita conformidade com termos de referência',
      'Documentação fiscal e certidões sempre atualizadas',
      'Acompanhamento técnico por especialistas',
      'Capacidade operacional para entregas de grande volume'
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
      title: 'Suporte Técnico Dedicado para Ensino',
      desc: 'Atendimento ágil e plantão técnico durante períodos de avaliações, vestibulares e matrículas escolares.',
      icon: 'ShieldCheck'
    }
  ],
  benefits: [
    'Preservação do caixa da escola: sem imobilizar grandes valores em compra de equipamentos',
    'Renovação programada do parque tecnológico a cada ciclo contratual',
    'Substituição de máquinas com defeito inclusa no contrato',
    'Conformidade com a BNCC e capacitação para ferramentas digitais'
  ]
};

