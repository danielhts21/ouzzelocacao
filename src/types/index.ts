export type SolutionType = 'locacao' | 'vendas' | 'servicos' | 'geral';

export interface PillarItem {
  id: string;
  tag: string;
  name: string;
  title: string;
  description: string;
  items: string[];
  ctaText: string;
  targetSection: string;
  highlightText: string;
  badge: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'computadores' | 'notebooks' | 'impressoras' | 'celulares' | 'monitores' | 'corporativo';
  categoryLabel: string;
  shortDesc: string;
  specs: string[];
  recommendedFor: string;
  iconName: string;
  badge?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'suporte' | 'manutencao' | 'infraestrutura' | 'instalacao';
  description: string;
  features: string[];
  sla: string;
  iconName: string;
}

export interface SegmentItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keyBenefits: string[];
  slug: string;
  iconName: string;
  statsHighlight?: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  details: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface StatItem {
  id: string;
  prefix?: string;
  value: number;
  suffix?: string;
  displayPlaceholder: string;
  label: string;
  description: string;
}

export interface ProposalFormData {
  name: string;
  company: string;
  cnpj?: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  solutionType: 'Locação' | 'Compra' | 'Serviços' | 'Não sei ainda';
  segment?: string;
  estimatedQuantity?: string;
  message: string;
}
