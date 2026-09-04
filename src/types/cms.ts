export type AdminRole = 'owner' | 'admin' | 'editor';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type ContentStatus = 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';

export interface LogoMetadata {
  originalName: string;
  fileSize: number;
  dimensions?: { width: number; height: number };
  mimeType: string;
  sha256?: string;
  uploadedAt: string;
  url: string;
}

export interface SiteSettings {
  brandName: string;
  shortName: string;
  tagline: string;
  slogan: string;
  metaDescription: string;
  
  // Brand Logo & Favicon Assets
  logoUrl: string;
  logoDarkUrl?: string;
  logoMobileUrl?: string;
  logoOriginalMeta?: LogoMetadata;
  faviconUrl: string;
  logoContainerStyle: {
    maxHeight: number; // in px
    maxWidth: number; // in px
    padding: number;
    alignment: 'left' | 'center' | 'right';
  };

  // Contacts
  whatsapp: {
    phone: string;
    formattedPhone: string;
    defaultMessage: string;
    salesMessage: string;
    educationMessage: string;
    autoOpenAfterForm: boolean;
  };
  contact: {
    email: string;
    salesEmail: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    cep: string;
    businessHours: string;
  };

  // Social Channels
  socials: {
    linkedin?: string;
    instagram?: string;
    whatsapp?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
    x?: string;
  };

  // SEO & Analytics
  seo: {
    domain: string;
    titleTemplate: string;
    defaultKeywords: string[];
    ogImage: string;
    canonicalDomain: string;
    robotsIndex: boolean;
    googleAnalyticsId?: string;
    googleTagManagerId?: string;
    cookieConsentEnabled: boolean;
  };

  // Legal
  legal: {
    cnpj: string;
    companyLegalName: string;
    privacyPolicyContent?: string;
    termsOfUseContent?: string;
  };

  // Maintenance
  maintenance: {
    enabled: boolean;
    message: string;
    allowAdminBypass: boolean;
  };
}

export interface BrandDesignTokens {
  preset: 'OUZZE_PREMIUM' | 'OUZZE_MINIMAL' | 'OUZZE_DARK' | 'CUSTOM';
  
  colors: {
    primary: string; // e.g., #DC2626
    primaryHover: string; // e.g., #B91C1C
    secondary: string; // e.g., #18181B
    bgDark: string; // e.g., #0A0B0E
    bgLight: string; // e.g., #FFFFFF
    textPrimary: string; // e.g., #F4F4F5
    textMuted: string; // e.g., #A1A1AA
    border: string; // e.g., rgba(255, 255, 255, 0.1)
    surface: string; // e.g., #121318
    surfaceHover: string; // e.g., #181A22
    success: string; // #10B981
    warning: string; // #F59E0B
    error: string; // #EF4444
  };

  neon: {
    enabled: boolean;
    intensity: number; // 0 to 100
    heroGlow: boolean;
    buttonGlow: boolean;
    cardGlow: boolean;
    lineGlow: boolean;
  };

  typography: {
    headingFont: string; // 'Plus Jakarta Sans' | 'Inter' | 'Outfit' | 'Montserrat' | 'Roboto' | 'Poppins'
    bodyFont: string;
    h1Size: string; // e.g., '3.5rem'
    h2Size: string;
    h3Size: string;
    bodySize: string;
    lineHeight: string;
    letterSpacing: string;
    headingTransform: 'uppercase' | 'none' | 'capitalize';
  };

  style: {
    borderRadius: number; // e.g., 4px
    buttonRadius: number;
    cardRadius: number;
    containerMaxWidth: string; // '1280px'
    sectionSpacing: string; // 'py-20'
    shadowIntensity: 'none' | 'subtle' | 'medium' | 'high';
  };

  motion: {
    enabled: boolean;
    intensity: 'low' | 'medium' | 'high';
    parallaxEnabled: boolean;
    parallaxIntensity: 'low' | 'medium' | 'high';
  };
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
  active: boolean;
  order: number;
  highlight?: boolean;
  badge?: string;
  children?: NavItem[];
}

export interface NavigationConfig {
  headerItems: NavItem[];
  footerItems: NavItem[];
  ctaButtonText: string;
  ctaButtonAction: string;
}

export type SectionType = 
  | 'hero'
  | 'pillars'
  | 'about'
  | 'segments'
  | 'rental'
  | 'sales'
  | 'services'
  | 'benefits'
  | 'howItWorks'
  | 'cta'
  | 'contact'
  | 'features'
  | 'equipment_grid'
  | 'services_grid'
  | 'custom_text'
  | 'custom_cards'
  | 'custom_bento'
  | 'faq'
  | 'downloads'
  | 'gallery'
  | 'banner';

export interface SectionStyles {
  background: 'dark' | 'black' | 'surface' | 'gradient' | 'dots' | 'grid';
  paddingTop: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  paddingBottom: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  alignment: 'left' | 'center' | 'right';
  maxWidth: 'full' | '6xl' | '7xl' | '5xl';
  animation: 'none' | 'fade' | 'fadeUp' | 'fadeDown' | 'slideLeft' | 'slideRight' | 'scale';
  parallax: boolean;
  visibility: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
}

export interface PageSection {
  id: string;
  pageSlug: string;
  type: SectionType;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  active: boolean;
  visible?: boolean;
  order: number;
  content: Record<string, any>;
  styles?: Partial<SectionStyles>;
}

export interface Page {
  id: string;
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
  status: ContentStatus;
  isSystem?: boolean; // '/' and '/educacao' are system
  sectionsOrder: string[]; // list of section IDs
  updatedAt: string;
  updatedBy: string;
}

export interface MaterialDownload {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  coverUrl?: string;
  segment?: string;
  buttonText: string;
  active: boolean;
  order: number;
}

export interface MediaAsset {
  id: string;
  name: string;
  originalName: string;
  url: string;
  fileType: string;
  size: number;
  dimensions?: { width: number; height: number };
  altText: string;
  isDecorative: boolean;
  tags: string[];
  usageLocations: string[];
  createdAt: string;
}

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'WON' | 'LOST' | 'ARCHIVED';

export interface Lead {
  id: string;
  name: string;
  company: string;
  cnpj?: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  solutionType: string;
  segment?: string;
  estimatedQuantity?: string;
  message: string;
  source: string;
  page: string;
  status: LeadStatus;
  adminNotes: { id: string; author: string; text: string; date: string }[];
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: 'LOGIN' | 'PUBLISH' | 'UNPUBLISH' | 'DELETE' | 'RESTORE' | 'LOGO_CHANGE' | 'SETTINGS_CHANGE' | 'CREATE' | 'UPDATE';
  entityType: string;
  entityId?: string;
  details: string;
  userEmail: string;
  timestamp: string;
}

export interface ContentRevision {
  id: string;
  version: number;
  entityType: 'FULL_SITE' | 'PAGE' | 'SETTINGS' | 'BRAND';
  entityId: string;
  snapshot: Record<string, any>;
  description: string;
  createdBy: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  text: string;
  link?: string;
  linkText?: string;
  bgColor?: string;
  textColor?: string;
  active: boolean;
  startDate?: string;
  endDate?: string;
}

export interface RedirectItem {
  id: string;
  fromPath: string;
  toPath: string;
  statusCode: 301 | 302;
  active: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  active: boolean;
  order: number;
}

export type { EquipmentItem, ServiceItem, SegmentItem, ProposalFormData } from './index';


