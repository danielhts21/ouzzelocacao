import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  Lead,
  AuditLog,
  ContentRevision,
  ContentStatus,
  SegmentItem,
  EquipmentItem,
  ServiceItem,
  ProposalFormData
} from '../types/cms';
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_BRAND_TOKENS,
  DEFAULT_NAVIGATION,
  DEFAULT_PAGES,
  DEFAULT_HOME_SECTIONS,
  DEFAULT_EDUCATION_SECTIONS,
  DEFAULT_RENTAL_SECTIONS,
  DEFAULT_SALES_SECTIONS,
  DEFAULT_SERVICES_SECTIONS,
  DEFAULT_DOWNLOADS,
  DEFAULT_ANNOUNCEMENT,
  DEFAULT_FAQS,
  DEFAULT_MEDIA_ASSETS
} from '../data/defaultCMSData';
import {
  SEGMENTS_DATA,
  RENTAL_EQUIPMENT,
  SERVICES_LIST
} from '../data/siteData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAdminAuth } from './AdminAuthContext';

interface CMSState {
  settings: SiteSettings;
  brandTokens: BrandDesignTokens;
  navigation: NavigationConfig;
  pages: Page[];
  sections: PageSection[];
  segments: SegmentItem[];
  equipment: EquipmentItem[];
  services: ServiceItem[];
  downloads: MaterialDownload[];
  announcements: Announcement[];
  faqs: FAQItem[];
  mediaAssets: MediaAsset[];
  leads: Lead[];
  auditLogs: AuditLog[];
  revisions: ContentRevision[];
}

interface CMSContextType {
  // Current Active (Published for visitor, or Draft for admin in preview)
  state: CMSState;
  publishedState: CMSState;
  isDraftModified: boolean;
  isPreviewMode: boolean;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  setIsPreviewMode: (enabled: boolean) => void;
  
  // Status & Sync
  isSupabaseOnline: boolean;
  isLoading: boolean;
  lastSavedAt: string | null;
  lastPublishedAt: string | null;

  // Actions
  updateSettings: (partial: Partial<SiteSettings>) => void;
  updateBrandTokens: (tokens: Partial<BrandDesignTokens>) => void;
  restoreDefaultBrandTokens: () => void;
  
  // Pages & Sections
  updatePage: (pageSlug: string, partial: Partial<Page>) => void;
  addPage: (page: Page) => void;
  deletePage: (pageSlug: string) => void;
  updateSection: (sectionId: string, partial: Partial<PageSection>) => void;
  addSection: (section: PageSection) => void;
  deleteSection: (sectionId: string) => void;
  reorderSections: (pageSlug: string, orderedIds: string[]) => void;
  
  // Dynamic Entities
  addSegment: (segment: SegmentItem) => void;
  updateSegment: (segmentId: string, partial: Partial<SegmentItem>) => void;
  deleteSegment: (segmentId: string) => void;

  addEquipment: (item: EquipmentItem) => void;
  updateEquipment: (itemId: string, partial: Partial<EquipmentItem>) => void;
  deleteEquipment: (itemId: string) => void;

  addService: (service: ServiceItem) => void;
  updateService: (serviceId: string, partial: Partial<ServiceItem>) => void;
  deleteService: (serviceId: string) => void;

  addDownload: (download: MaterialDownload) => void;
  updateDownload: (downloadId: string, partial: Partial<MaterialDownload>) => void;
  deleteDownload: (downloadId: string) => void;

  updateNavigation: (nav: Partial<NavigationConfig>) => void;
  updateAnnouncement: (announcement: Partial<Announcement>) => void;
  
  // FAQs
  addFaq: (faq: FAQItem) => void;
  updateFaq: (faqId: string, partial: Partial<FAQItem>) => void;
  deleteFaq: (faqId: string) => void;

  // Media
  addMediaAsset: (asset: MediaAsset) => void;
  updateMediaAsset: (assetId: string, partial: Partial<MediaAsset>) => void;
  deleteMediaAsset: (assetId: string) => { success: boolean; usageCount: number; message?: string };

  // Leads
  submitLead: (formData: ProposalFormData, source?: string, page?: string) => Promise<{ success: boolean; leadId?: string; error?: string }>;
  updateLeadStatus: (leadId: string, status: Lead['status']) => void;
  addLeadNote: (leadId: string, noteText: string) => void;
  deleteLead: (leadId: string) => void;
  exportLeadsCSV: () => void;

  // Publishing & Revisions
  saveDraft: () => Promise<void>;
  publishChanges: (description?: string) => Promise<boolean>;
  rollbackRevision: (revisionId: string) => Promise<boolean>;
  
  // Backup & Restore
  exportBackupJSON: () => void;
  importBackupJSON: (jsonString: string) => Promise<{ success: boolean; message?: string }>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const LOCAL_STORAGE_PUBLISHED_KEY = 'ouzze_cms_published_v1';
const LOCAL_STORAGE_DRAFT_KEY = 'ouzze_cms_draft_v1';
const LOCAL_STORAGE_LEADS_KEY = 'ouzze_cms_leads_v1';
const LOCAL_STORAGE_LOGS_KEY = 'ouzze_cms_logs_v1';
const LOCAL_STORAGE_REVISIONS_KEY = 'ouzze_cms_revisions_v1';

const getInitialState = (): CMSState => ({
  settings: DEFAULT_SITE_SETTINGS,
  brandTokens: DEFAULT_BRAND_TOKENS,
  navigation: DEFAULT_NAVIGATION,
  pages: DEFAULT_PAGES,
  sections: [
    ...DEFAULT_HOME_SECTIONS, 
    ...DEFAULT_EDUCATION_SECTIONS,
    ...DEFAULT_RENTAL_SECTIONS,
    ...DEFAULT_SALES_SECTIONS,
    ...DEFAULT_SERVICES_SECTIONS
  ],
  segments: SEGMENTS_DATA,
  equipment: RENTAL_EQUIPMENT,
  services: SERVICES_LIST,
  downloads: DEFAULT_DOWNLOADS,
  announcements: [DEFAULT_ANNOUNCEMENT],
  faqs: DEFAULT_FAQS,
  mediaAssets: DEFAULT_MEDIA_ASSETS,
  leads: [],
  auditLogs: [],
  revisions: []
});

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAdminAuth();
  
  // Public fallback begins with compiled state, not relying on admin localStorage
  const [publishedState, setPublishedState] = useState<CMSState>(() => getInitialState());

  // Draft state initialized from local working copy for administrators
  const [draftState, setDraftState] = useState<CMSState>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...getInitialState(), ...parsed };
      }
    } catch (e) {
      console.error('Error parsing draft local storage:', e);
    }
    return getInitialState();
  });

  const [isDraftModified, setIsDraftModified] = useState<boolean>(false);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isSupabaseOnline, setIsSupabaseOnline] = useState<boolean>(isSupabaseConfigured);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [lastPublishedAt, setLastPublishedAt] = useState<string | null>(null);

  // Load published data from Supabase if configured, with compiled graceful fallback
  useEffect(() => {
    const fetchFromSupabase = async () => {
      if (!isSupabaseConfigured) {
        setIsSupabaseOnline(false);
        return;
      }

      try {
        setIsLoading(true);

        // Fetch primary tables in parallel
        const [
          settingsRes,
          brandRes,
          pagesRes,
          sectionsRes,
          segmentsRes,
          equipmentRes,
          servicesRes,
          mediaRes,
          downloadsRes,
          announcementsRes,
          faqsRes
        ] = await Promise.allSettled([
          supabase.from('site_settings').select('*').limit(1).maybeSingle(),
          supabase.from('brand_design_tokens').select('*').limit(1).maybeSingle(),
          supabase.from('pages').select('*').order('name'),
          supabase.from('page_sections').select('*').order('order'),
          supabase.from('segments').select('*').order('order'),
          supabase.from('equipment_items').select('*').order('order'),
          supabase.from('services').select('*').order('order'),
          supabase.from('media_assets').select('*').order('created_at', { ascending: false }),
          supabase.from('material_downloads').select('*').order('order'),
          supabase.from('announcements').select('*').order('created_at', { ascending: false }),
          supabase.from('faqs').select('*').order('order')
        ]);

        const newState: Partial<CMSState> = {};
        let hasAnyData = false;

        if (settingsRes.status === 'fulfilled' && settingsRes.value.data) {
          const d = settingsRes.value.data;
          newState.settings = {
            brandName: d.brand_name || DEFAULT_SITE_SETTINGS.brandName,
            shortName: d.short_name || DEFAULT_SITE_SETTINGS.shortName,
            tagline: d.tagline || DEFAULT_SITE_SETTINGS.tagline,
            slogan: d.slogan || DEFAULT_SITE_SETTINGS.slogan,
            metaDescription: d.meta_description || DEFAULT_SITE_SETTINGS.metaDescription,
            logoUrl: d.logo_url || DEFAULT_SITE_SETTINGS.logoUrl,
            logoDarkUrl: d.logo_dark_url || DEFAULT_SITE_SETTINGS.logoDarkUrl,
            logoMobileUrl: d.logo_mobile_url || DEFAULT_SITE_SETTINGS.logoMobileUrl,
            logoOriginalMeta: d.logo_original_meta || DEFAULT_SITE_SETTINGS.logoOriginalMeta,
            logoContainerStyle: d.logo_container_style || DEFAULT_SITE_SETTINGS.logoContainerStyle,
            faviconUrl: d.favicon_url || DEFAULT_SITE_SETTINGS.faviconUrl,
            whatsapp: d.whatsapp || DEFAULT_SITE_SETTINGS.whatsapp,
            contact: d.contact || DEFAULT_SITE_SETTINGS.contact,
            socials: d.socials || DEFAULT_SITE_SETTINGS.socials,
            seo: d.seo || DEFAULT_SITE_SETTINGS.seo,
            legal: d.legal || DEFAULT_SITE_SETTINGS.legal,
            maintenance: d.maintenance || DEFAULT_SITE_SETTINGS.maintenance
          };
          hasAnyData = true;
        }

        if (brandRes.status === 'fulfilled' && brandRes.value.data) {
          const d = brandRes.value.data;
          newState.brandTokens = {
            preset: d.preset || DEFAULT_BRAND_TOKENS.preset,
            colors: d.colors || DEFAULT_BRAND_TOKENS.colors,
            neon: d.neon || DEFAULT_BRAND_TOKENS.neon,
            typography: d.typography || DEFAULT_BRAND_TOKENS.typography,
            style: d.style || DEFAULT_BRAND_TOKENS.style,
            motion: d.motion || DEFAULT_BRAND_TOKENS.motion
          };
          hasAnyData = true;
        }

        if (pagesRes.status === 'fulfilled' && pagesRes.value.data && pagesRes.value.data.length > 0) {
          newState.pages = pagesRes.value.data.map(p => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            seoTitle: p.seo_title,
            seoDescription: p.seo_description,
            ogImage: p.og_image,
            status: p.status,
            isSystem: p.is_system,
            sectionsOrder: p.sections_order || [],
            updatedAt: p.updated_at,
            updatedBy: p.updated_by
          }));
          hasAnyData = true;
        }

        if (sectionsRes.status === 'fulfilled' && sectionsRes.value.data && sectionsRes.value.data.length > 0) {
          newState.sections = sectionsRes.value.data.map(s => ({
            id: s.id,
            pageSlug: s.page_slug,
            type: s.type,
            title: s.title,
            subtitle: s.subtitle,
            description: s.description,
            active: s.active,
            order: s.order,
            content: s.content || {},
            styles: s.styles || {}
          }));
          hasAnyData = true;
        }

        if (segmentsRes.status === 'fulfilled' && segmentsRes.value.data && segmentsRes.value.data.length > 0) {
          newState.segments = segmentsRes.value.data.map(seg => ({
            id: seg.id,
            title: seg.title,
            subtitle: seg.subtitle,
            description: seg.description,
            keyBenefits: seg.key_benefits || [],
            slug: seg.slug,
            iconName: seg.icon_name || 'Layers',
            statsHighlight: seg.stats_highlight,
            isFeatured: seg.is_featured,
            active: seg.active,
            order: seg.order
          }));
          hasAnyData = true;
        }

        if (equipmentRes.status === 'fulfilled' && equipmentRes.value.data && equipmentRes.value.data.length > 0) {
          newState.equipment = equipmentRes.value.data.map(eq => ({
            id: eq.id,
            name: eq.name,
            category: eq.category,
            categoryLabel: eq.category_label,
            shortDesc: eq.short_desc,
            specs: eq.specs || [],
            recommendedFor: eq.recommended_for,
            iconName: eq.icon_name || 'Monitor',
            badge: eq.badge,
            forRental: eq.for_rental,
            forSale: eq.for_sale,
            active: eq.active,
            order: eq.order
          }));
          hasAnyData = true;
        }

        if (servicesRes.status === 'fulfilled' && servicesRes.value.data && servicesRes.value.data.length > 0) {
          newState.services = servicesRes.value.data.map(srv => ({
            id: srv.id,
            title: srv.title,
            category: srv.category,
            description: srv.description,
            features: srv.features || [],
            sla: srv.sla,
            iconName: srv.icon_name || 'ShieldCheck',
            active: srv.active,
            order: srv.order
          }));
          hasAnyData = true;
        }

        if (mediaRes.status === 'fulfilled' && mediaRes.value.data && mediaRes.value.data.length > 0) {
          newState.mediaAssets = mediaRes.value.data.map(m => ({
            id: m.id,
            name: m.name,
            originalName: m.original_name,
            url: m.url,
            fileType: m.file_type,
            size: m.size,
            dimensions: m.dimensions,
            altText: m.alt_text,
            isDecorative: m.is_decorative,
            tags: m.tags || [],
            usageLocations: m.usage_locations || [],
            createdAt: m.created_at
          }));
          hasAnyData = true;
        }

        if (downloadsRes.status === 'fulfilled' && downloadsRes.value.data && downloadsRes.value.data.length > 0) {
          newState.downloads = downloadsRes.value.data.map(d => ({
            id: d.id,
            title: d.title,
            description: d.description,
            fileUrl: d.file_url,
            fileName: d.file_name,
            fileSize: d.file_size,
            coverUrl: d.cover_url,
            segment: d.segment,
            buttonText: d.button_text,
            active: d.active,
            order: d.order
          }));
          hasAnyData = true;
        }

        if (announcementsRes.status === 'fulfilled' && announcementsRes.value.data && announcementsRes.value.data.length > 0) {
          newState.announcements = announcementsRes.value.data.map(a => ({
            id: a.id,
            text: a.text,
            link: a.link,
            linkText: a.link_text,
            bgColor: a.bg_color,
            textColor: a.text_color,
            active: a.active,
            startDate: a.start_date,
            endDate: a.end_date
          }));
          hasAnyData = true;
        }

        if (faqsRes.status === 'fulfilled' && faqsRes.value.data && faqsRes.value.data.length > 0) {
          newState.faqs = faqsRes.value.data.map(f => ({
            id: f.id,
            question: f.question,
            answer: f.answer,
            category: f.category,
            active: f.active,
            order: f.order
          }));
          hasAnyData = true;
        }

        // If user is authenticated, also try to fetch admin-only tables
        if (user && user.active) {
          try {
            const [leadsRes, revsRes, logsRes] = await Promise.allSettled([
              supabase.from('leads').select('*').order('created_at', { ascending: false }),
              supabase.from('content_revisions').select('*').order('created_at', { ascending: false }).limit(30),
              supabase.from('audit_logs').select('*').order('timestamp', { ascending: false }).limit(100)
            ]);

            if (leadsRes.status === 'fulfilled' && leadsRes.value.data) {
              newState.leads = leadsRes.value.data.map(l => ({
                id: l.id,
                name: l.name,
                company: l.company,
                cnpj: l.cnpj,
                city: l.city,
                state: l.state,
                phone: l.phone,
                email: l.email,
                solutionType: l.solution_type,
                segment: l.segment,
                estimatedQuantity: l.estimated_quantity,
                message: l.message,
                source: l.source,
                page: l.page,
                status: l.status,
                adminNotes: l.admin_notes || [],
                createdAt: l.created_at
              }));
            }

            if (revsRes.status === 'fulfilled' && revsRes.value.data) {
              newState.revisions = revsRes.value.data.map(r => ({
                id: r.id,
                version: r.version,
                entityType: r.entity_type,
                entityId: r.entity_id,
                snapshot: r.snapshot,
                description: r.description,
                createdBy: r.created_by,
                createdAt: r.created_at
              }));
            }

            if (logsRes.status === 'fulfilled' && logsRes.value.data) {
              newState.auditLogs = logsRes.value.data.map(al => ({
                id: al.id,
                action: al.action,
                entityType: al.entity_type,
                entityId: al.entity_id,
                details: al.details,
                userEmail: al.user_email,
                timestamp: al.timestamp
              }));
            }
          } catch (adminErr) {
            console.warn('Admin tables fetch non-critical warning:', adminErr);
          }
        }

        if (hasAnyData) {
          setIsSupabaseOnline(true);
          setPublishedState(prev => ({ ...prev, ...newState }));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, relying on compiled snapshot:', err);
        setIsSupabaseOnline(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFromSupabase();
  }, [user]);

  // Save draft state to localStorage debounce
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_DRAFT_KEY, JSON.stringify(draftState));
    } catch (e) {
      console.warn('LocalStorage quota warning:', e);
    }
  }, [draftState]);

  // Log audit helper
  const logAudit = useCallback((action: AuditLog['action'], entityType: string, details: string, entityId?: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      action,
      entityType,
      entityId,
      details,
      userEmail: user?.email || 'admin@ouzze.com.br',
      timestamp: new Date().toISOString()
    };

    setDraftState(prev => ({
      ...prev,
      auditLogs: [newLog, ...(prev.auditLogs || []).slice(0, 99)]
    }));

    setPublishedState(prev => ({
      ...prev,
      auditLogs: [newLog, ...(prev.auditLogs || []).slice(0, 99)]
    }));
  }, [user]);

  // CMS Updating Actions
  const updateSettings = (partial: Partial<SiteSettings>) => {
    setDraftState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...partial }
    }));
    setIsDraftModified(true);
    setLastSavedAt(new Date().toLocaleTimeString());
    logAudit('SETTINGS_CHANGE', 'SiteSettings', 'Configurações gerais atualizadas');
  };

  const updateBrandTokens = (tokens: Partial<BrandDesignTokens>) => {
    setDraftState(prev => ({
      ...prev,
      brandTokens: { ...prev.brandTokens, ...tokens }
    }));
    setIsDraftModified(true);
    setLastSavedAt(new Date().toLocaleTimeString());
    logAudit('UPDATE', 'BrandTokens', 'Tokens de design e cores atualizados');
  };

  const restoreDefaultBrandTokens = () => {
    setDraftState(prev => ({
      ...prev,
      brandTokens: DEFAULT_BRAND_TOKENS
    }));
    setIsDraftModified(true);
    logAudit('RESTORE', 'BrandTokens', 'Restaurado padrão de marca Ouzze Premium');
  };

  const updatePage = (pageSlug: string, partial: Partial<Page>) => {
    setDraftState(prev => ({
      ...prev,
      pages: prev.pages.map(p => p.slug === pageSlug ? { ...p, ...partial, updatedAt: new Date().toISOString() } : p)
    }));
    setIsDraftModified(true);
    setLastSavedAt(new Date().toLocaleTimeString());
    logAudit('UPDATE', 'Page', `Página ${pageSlug} atualizada`, pageSlug);
  };

  const addPage = (page: Page) => {
    setDraftState(prev => ({
      ...prev,
      pages: [...prev.pages, page]
    }));
    setIsDraftModified(true);
    logAudit('CREATE', 'Page', `Nova página ${page.name} criada`, page.slug);
  };

  const deletePage = (pageSlug: string) => {
    setDraftState(prev => ({
      ...prev,
      pages: prev.pages.filter(p => p.slug !== pageSlug)
    }));
    setIsDraftModified(true);
    logAudit('DELETE', 'Page', `Página ${pageSlug} excluída`, pageSlug);
  };

  const updateSection = (sectionId: string, partial: Partial<PageSection>) => {
    setDraftState(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === sectionId ? { ...s, ...partial } : s)
    }));
    setIsDraftModified(true);
    setLastSavedAt(new Date().toLocaleTimeString());
    logAudit('UPDATE', 'PageSection', `Seção ${sectionId} modificada`, sectionId);
  };

  const addSection = (section: PageSection) => {
    setDraftState(prev => ({
      ...prev,
      sections: [...prev.sections, section],
      pages: prev.pages.map(p => p.slug === section.pageSlug ? {
        ...p,
        sectionsOrder: [...p.sectionsOrder, section.id]
      } : p)
    }));
    setIsDraftModified(true);
    logAudit('CREATE', 'PageSection', `Nova seção criada: ${section.title}`, section.id);
  };

  const deleteSection = (sectionId: string) => {
    setDraftState(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId),
      pages: prev.pages.map(p => ({
        ...p,
        sectionsOrder: p.sectionsOrder.filter(id => id !== sectionId)
      }))
    }));
    setIsDraftModified(true);
    logAudit('DELETE', 'PageSection', `Seção ${sectionId} removida`, sectionId);
  };

  const reorderSections = (pageSlug: string, orderedIds: string[]) => {
    setDraftState(prev => ({
      ...prev,
      pages: prev.pages.map(p => p.slug === pageSlug ? { ...p, sectionsOrder: orderedIds } : p),
      sections: prev.sections.map(s => {
        if (s.pageSlug === pageSlug) {
          const index = orderedIds.indexOf(s.id);
          return index !== -1 ? { ...s, order: index + 1 } : s;
        }
        return s;
      })
    }));
    setIsDraftModified(true);
    logAudit('UPDATE', 'PageSectionsOrder', `Reordenação de seções da página ${pageSlug}`);
  };

  // Dynamic Entities
  const addSegment = (segment: SegmentItem) => {
    setDraftState(prev => ({ ...prev, segments: [...prev.segments, segment] }));
    setIsDraftModified(true);
    logAudit('CREATE', 'Segment', `Novo segmento adicionado: ${segment.title}`, segment.id);
  };

  const updateSegment = (segmentId: string, partial: Partial<SegmentItem>) => {
    setDraftState(prev => ({
      ...prev,
      segments: prev.segments.map(s => s.id === segmentId ? { ...s, ...partial } : s)
    }));
    setIsDraftModified(true);
    logAudit('UPDATE', 'Segment', `Segmento ${segmentId} atualizado`, segmentId);
  };

  const deleteSegment = (segmentId: string) => {
    setDraftState(prev => ({
      ...prev,
      segments: prev.segments.filter(s => s.id !== segmentId)
    }));
    setIsDraftModified(true);
    logAudit('DELETE', 'Segment', `Segmento ${segmentId} excluído`, segmentId);
  };

  const addEquipment = (item: EquipmentItem) => {
    setDraftState(prev => ({ ...prev, equipment: [...prev.equipment, item] }));
    setIsDraftModified(true);
    logAudit('CREATE', 'Equipment', `Novo equipamento adicionado: ${item.name}`, item.id);
  };

  const updateEquipment = (itemId: string, partial: Partial<EquipmentItem>) => {
    setDraftState(prev => ({
      ...prev,
      equipment: prev.equipment.map(e => e.id === itemId ? { ...e, ...partial } : e)
    }));
    setIsDraftModified(true);
    logAudit('UPDATE', 'Equipment', `Equipamento ${itemId} atualizado`, itemId);
  };

  const deleteEquipment = (itemId: string) => {
    setDraftState(prev => ({
      ...prev,
      equipment: prev.equipment.filter(e => e.id !== itemId)
    }));
    setIsDraftModified(true);
    logAudit('DELETE', 'Equipment', `Equipamento ${itemId} removido`, itemId);
  };

  const addService = (service: ServiceItem) => {
    setDraftState(prev => ({ ...prev, services: [...prev.services, service] }));
    setIsDraftModified(true);
    logAudit('CREATE', 'Service', `Novo serviço adicionado: ${service.title}`, service.id);
  };

  const updateService = (serviceId: string, partial: Partial<ServiceItem>) => {
    setDraftState(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === serviceId ? { ...s, ...partial } : s)
    }));
    setIsDraftModified(true);
    logAudit('UPDATE', 'Service', `Serviço ${serviceId} atualizado`, serviceId);
  };

  const deleteService = (serviceId: string) => {
    setDraftState(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== serviceId)
    }));
    setIsDraftModified(true);
    logAudit('DELETE', 'Service', `Serviço ${serviceId} removido`, serviceId);
  };

  const addDownload = (download: MaterialDownload) => {
    setDraftState(prev => ({ ...prev, downloads: [...prev.downloads, download] }));
    setIsDraftModified(true);
    logAudit('CREATE', 'Download', `Novo download cadastrado: ${download.title}`, download.id);
  };

  const updateDownload = (downloadId: string, partial: Partial<MaterialDownload>) => {
    setDraftState(prev => ({
      ...prev,
      downloads: prev.downloads.map(d => d.id === downloadId ? { ...d, ...partial } : d)
    }));
    setIsDraftModified(true);
    logAudit('UPDATE', 'Download', `Download ${downloadId} atualizado`, downloadId);
  };

  const deleteDownload = (downloadId: string) => {
    setDraftState(prev => ({
      ...prev,
      downloads: prev.downloads.filter(d => d.id !== downloadId)
    }));
    setIsDraftModified(true);
    logAudit('DELETE', 'Download', `Download ${downloadId} removido`, downloadId);
  };

  const updateNavigation = (nav: Partial<NavigationConfig>) => {
    setDraftState(prev => ({
      ...prev,
      navigation: { ...prev.navigation, ...nav }
    }));
    setIsDraftModified(true);
    logAudit('UPDATE', 'Navigation', 'Itens de menu e navegação atualizados');
  };

  const updateAnnouncement = (ann: Partial<Announcement>) => {
    setDraftState(prev => ({
      ...prev,
      announcements: prev.announcements.map((a, i) => i === 0 ? { ...a, ...ann } : a)
    }));
    setIsDraftModified(true);
    logAudit('UPDATE', 'Announcement', 'Barra de avisos atualizada');
  };

  const addFaq = (faq: FAQItem) => {
    setDraftState(prev => ({ ...prev, faqs: [...prev.faqs, faq] }));
    setIsDraftModified(true);
    logAudit('CREATE', 'FAQ', `Novo FAQ adicionado: ${faq.question}`, faq.id);
  };

  const updateFaq = (faqId: string, partial: Partial<FAQItem>) => {
    setDraftState(prev => ({
      ...prev,
      faqs: prev.faqs.map(f => f.id === faqId ? { ...f, ...partial } : f)
    }));
    setIsDraftModified(true);
    logAudit('UPDATE', 'FAQ', `FAQ ${faqId} atualizado`, faqId);
  };

  const deleteFaq = (faqId: string) => {
    setDraftState(prev => ({
      ...prev,
      faqs: prev.faqs.filter(f => f.id !== faqId)
    }));
    setIsDraftModified(true);
    logAudit('DELETE', 'FAQ', `FAQ ${faqId} excluído`, faqId);
  };

  // Media
  const addMediaAsset = (asset: MediaAsset) => {
    setDraftState(prev => ({ ...prev, mediaAssets: [asset, ...prev.mediaAssets] }));
    setIsDraftModified(true);
    logAudit('CREATE', 'MediaAsset', `Upload de mídia: ${asset.originalName}`, asset.id);
  };

  const updateMediaAsset = (assetId: string, partial: Partial<MediaAsset>) => {
    setDraftState(prev => ({
      ...prev,
      mediaAssets: prev.mediaAssets.map(m => m.id === assetId ? { ...m, ...partial } : m)
    }));
    setIsDraftModified(true);
    logAudit('UPDATE', 'MediaAsset', `Mídia ${assetId} atualizada`, assetId);
  };

  const deleteMediaAsset = (assetId: string) => {
    const asset = draftState.mediaAssets.find(m => m.id === assetId);
    if (asset && asset.usageLocations && asset.usageLocations.length > 0) {
      return {
        success: false,
        usageCount: asset.usageLocations.length,
        message: `Esta imagem está sendo utilizada em ${asset.usageLocations.length} local(is): ${asset.usageLocations.join(', ')}.`
      };
    }
    setDraftState(prev => ({
      ...prev,
      mediaAssets: prev.mediaAssets.filter(m => m.id !== assetId)
    }));
    setIsDraftModified(true);
    logAudit('DELETE', 'MediaAsset', `Mídia ${assetId} excluída`, assetId);
    return { success: true, usageCount: 0 };
  };

  // Real Lead Submission
  const submitLead = async (formData: ProposalFormData, source: string = 'website', page: string = '/'): Promise<{ success: boolean; leadId?: string; error?: string }> => {
    const leadId = `lead-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const newLead: Lead = {
      id: leadId,
      name: formData.name,
      company: formData.company,
      cnpj: formData.cnpj,
      city: formData.city,
      state: formData.state,
      phone: formData.phone,
      email: formData.email,
      solutionType: formData.solutionType,
      segment: formData.segment,
      estimatedQuantity: formData.estimatedQuantity,
      message: formData.message,
      source,
      page,
      status: 'NEW',
      adminNotes: [],
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('leads').insert([{
          name: newLead.name,
          company: newLead.company,
          cnpj: newLead.cnpj,
          city: newLead.city,
          state: newLead.state,
          phone: newLead.phone,
          email: newLead.email,
          solution_type: newLead.solutionType,
          segment: newLead.segment,
          estimated_quantity: newLead.estimatedQuantity,
          message: newLead.message,
          source: newLead.source,
          page: newLead.page,
          status: 'NEW'
        }]);

        if (error) {
          console.warn('Supabase lead insert failed, persisting to local cache:', error.message);
        }
      } catch (err) {
        console.warn('Supabase lead submission error:', err);
      }
    }

    // Always store in local state / cache
    setPublishedState(prev => {
      const updated = [newLead, ...(prev.leads || [])];
      try {
        localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(updated));
      } catch (e) {}
      return { ...prev, leads: updated };
    });

    setDraftState(prev => ({
      ...prev,
      leads: [newLead, ...(prev.leads || [])]
    }));

    return { success: true, leadId };
  };

  const updateLeadStatus = (leadId: string, status: Lead['status']) => {
    const updater = (leads: Lead[]) => leads.map(l => l.id === leadId ? { ...l, status } : l);
    setDraftState(prev => ({ ...prev, leads: updater(prev.leads) }));
    setPublishedState(prev => ({ ...prev, leads: updater(prev.leads) }));
    logAudit('UPDATE', 'Lead', `Status do lead ${leadId} alterado para ${status}`, leadId);
  };

  const addLeadNote = (leadId: string, noteText: string) => {
    const newNote = {
      id: `note-${Date.now()}`,
      author: user?.name || 'Administrador',
      text: noteText,
      date: new Date().toISOString()
    };
    const updater = (leads: Lead[]) => leads.map(l => l.id === leadId ? {
      ...l,
      adminNotes: [...(l.adminNotes || []), newNote]
    } : l);

    setDraftState(prev => ({ ...prev, leads: updater(prev.leads) }));
    setPublishedState(prev => ({ ...prev, leads: updater(prev.leads) }));
    logAudit('UPDATE', 'Lead', `Nota administrativa adicionada ao lead ${leadId}`, leadId);
  };

  const deleteLead = (leadId: string) => {
    const updater = (leads: Lead[]) => leads.filter(l => l.id !== leadId);
    setDraftState(prev => ({ ...prev, leads: updater(prev.leads) }));
    setPublishedState(prev => ({ ...prev, leads: updater(prev.leads) }));
    logAudit('DELETE', 'Lead', `Lead ${leadId} excluído`, leadId);
  };

  const exportLeadsCSV = () => {
    const leads = publishedState.leads || [];
    if (leads.length === 0) {
      alert('Não existem leads cadastrados para exportação.');
      return;
    }

    const headers = ['Data', 'Nome', 'Empresa', 'CNPJ', 'Email', 'Telefone', 'Cidade', 'Estado', 'Interesse', 'Segmento', 'Status', 'Mensagem'];
    const rows = leads.map(l => [
      new Date(l.createdAt).toLocaleString('pt-BR'),
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${(l.cnpj || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.city || '').replace(/"/g, '""')}"`,
      `"${(l.state || '').replace(/"/g, '""')}"`,
      `"${(l.solutionType || '').replace(/"/g, '""')}"`,
      `"${(l.segment || '').replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map(e => e.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_ouzze_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Publishing & Revision Rollback
  const saveDraft = async () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_DRAFT_KEY, JSON.stringify(draftState));
      setLastSavedAt(new Date().toLocaleTimeString());
    } catch (e) {
      console.warn('Error saving draft locally:', e);
    }
  };

  const publishChanges = async (description: string = 'Publicação geral de conteúdo'): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Create revision snapshot before publishing
      const newRevision: ContentRevision = {
        id: `rev-${Date.now()}`,
        version: (publishedState.revisions?.length || 0) + 1,
        entityType: 'FULL_SITE',
        entityId: 'primary',
        snapshot: JSON.parse(JSON.stringify(draftState)),
        description,
        createdBy: user?.email || 'admin@ouzze.com.br',
        createdAt: new Date().toISOString()
      };

      const newPublishedState: CMSState = {
        ...draftState,
        revisions: [newRevision, ...(publishedState.revisions || []).slice(0, 29)]
      };

      // If Supabase is online and user is authorized, publish to Supabase tables
      if (isSupabaseConfigured && user && user.active) {
        try {
          const nowIso = new Date().toISOString();

          // 1. Settings
          await supabase.from('site_settings').upsert({
            id: 'primary',
            brand_name: draftState.settings.brandName,
            short_name: draftState.settings.shortName,
            tagline: draftState.settings.tagline,
            slogan: draftState.settings.slogan,
            meta_description: draftState.settings.metaDescription,
            logo_url: draftState.settings.logoUrl,
            logo_dark_url: draftState.settings.logoDarkUrl,
            logo_mobile_url: draftState.settings.logoMobileUrl,
            logo_original_meta: draftState.settings.logoOriginalMeta,
            logo_container_style: draftState.settings.logoContainerStyle,
            favicon_url: draftState.settings.faviconUrl,
            whatsapp: draftState.settings.whatsapp,
            contact: draftState.settings.contact,
            socials: draftState.settings.socials,
            seo: draftState.settings.seo,
            legal: draftState.settings.legal,
            maintenance: draftState.settings.maintenance,
            updated_at: nowIso
          });

          // 2. Brand tokens
          await supabase.from('brand_design_tokens').upsert({
            id: 'primary',
            preset: draftState.brandTokens.preset,
            colors: draftState.brandTokens.colors,
            neon: draftState.brandTokens.neon,
            typography: draftState.brandTokens.typography,
            style: draftState.brandTokens.style,
            motion: draftState.brandTokens.motion,
            updated_at: nowIso
          });

          // 3. Pages
          if (draftState.pages && draftState.pages.length > 0) {
            await supabase.from('pages').upsert(
              draftState.pages.map(p => ({
                id: p.id,
                slug: p.slug,
                name: p.name,
                seo_title: p.seoTitle,
                seo_description: p.seoDescription,
                og_image: p.ogImage,
                status: p.status,
                is_system: p.isSystem,
                sections_order: p.sectionsOrder,
                updated_at: nowIso,
                updated_by: user.email
              }))
            );
          }

          // 4. Sections
          if (draftState.sections && draftState.sections.length > 0) {
            await supabase.from('page_sections').upsert(
              draftState.sections.map(s => ({
                id: s.id,
                page_slug: s.pageSlug,
                type: s.type,
                title: s.title,
                subtitle: s.subtitle,
                description: s.description,
                active: s.active,
                order: s.order,
                content: s.content,
                styles: s.styles,
                updated_at: nowIso
              }))
            );
          }

          // 5. Segments
          if (draftState.segments && draftState.segments.length > 0) {
            await supabase.from('segments').upsert(
              draftState.segments.map(seg => ({
                id: seg.id,
                title: seg.title,
                subtitle: seg.subtitle,
                description: seg.description,
                key_benefits: seg.keyBenefits,
                slug: seg.slug,
                icon_name: seg.iconName,
                stats_highlight: seg.statsHighlight,
                is_featured: seg.isFeatured,
                active: seg.active,
                order: seg.order,
                updated_at: nowIso
              }))
            );
          }

          // 6. Equipment
          if (draftState.equipment && draftState.equipment.length > 0) {
            await supabase.from('equipment_items').upsert(
              draftState.equipment.map(eq => ({
                id: eq.id,
                name: eq.name,
                category: eq.category,
                category_label: eq.categoryLabel,
                short_desc: eq.shortDesc,
                specs: eq.specs,
                recommended_for: eq.recommendedFor,
                icon_name: eq.iconName,
                badge: eq.badge,
                for_rental: eq.forRental,
                for_sale: eq.forSale,
                active: eq.active,
                order: eq.order,
                updated_at: nowIso
              }))
            );
          }

          // 7. Services
          if (draftState.services && draftState.services.length > 0) {
            await supabase.from('services').upsert(
              draftState.services.map(srv => ({
                id: srv.id,
                title: srv.title,
                category: srv.category,
                description: srv.description,
                features: srv.features,
                sla: srv.sla,
                icon_name: srv.iconName,
                active: srv.active,
                order: srv.order,
                updated_at: nowIso
              }))
            );
          }

          // 8. Downloads
          if (draftState.downloads && draftState.downloads.length > 0) {
            await supabase.from('material_downloads').upsert(
              draftState.downloads.map(d => ({
                id: d.id,
                title: d.title,
                description: d.description,
                file_url: d.fileUrl,
                file_name: d.fileName,
                file_size: d.fileSize,
                cover_url: d.coverUrl,
                segment: d.segment,
                button_text: d.buttonText,
                active: d.active,
                order: d.order,
                updated_at: nowIso
              }))
            );
          }

          // 9. Announcements
          if (draftState.announcements && draftState.announcements.length > 0) {
            await supabase.from('announcements').upsert(
              draftState.announcements.map(a => ({
                id: a.id,
                text: a.text,
                link: a.link,
                link_text: a.linkText,
                bg_color: a.bgColor,
                text_color: a.textColor,
                active: a.active,
                start_date: a.startDate,
                end_date: a.endDate,
                updated_at: nowIso
              }))
            );
          }

          // 10. FAQs
          if (draftState.faqs && draftState.faqs.length > 0) {
            await supabase.from('faqs').upsert(
              draftState.faqs.map(f => ({
                id: f.id,
                question: f.question,
                answer: f.answer,
                category: f.category,
                active: f.active,
                order: f.order,
                updated_at: nowIso
              }))
            );
          }

          // 11. Media Assets
          if (draftState.mediaAssets && draftState.mediaAssets.length > 0) {
            await supabase.from('media_assets').upsert(
              draftState.mediaAssets.map(m => ({
                id: m.id,
                name: m.name,
                original_name: m.originalName,
                url: m.url,
                file_type: m.fileType,
                size: m.size,
                dimensions: m.dimensions,
                alt_text: m.altText,
                is_decorative: m.isDecorative,
                tags: m.tags,
                usage_locations: m.usageLocations
              }))
            );
          }

          // 12. Content Revisions
          await supabase.from('content_revisions').insert({
            entity_type: 'FULL_SITE',
            entity_id: 'primary',
            snapshot: draftState,
            description,
            created_by: user.email
          });

          // 13. Audit Log
          await supabase.from('audit_logs').insert({
            action: 'PUBLISH',
            entity_type: 'Site',
            entity_id: 'primary',
            details: description,
            user_email: user.email,
            timestamp: nowIso
          });
        } catch (err) {
          console.warn('Supabase publish sync error:', err);
        }
      }

      setPublishedState(newPublishedState);
      setIsDraftModified(false);
      setLastPublishedAt(new Date().toLocaleTimeString());
      logAudit('PUBLISH', 'Site', description);
      setIsLoading(false);
      return true;
    } catch (e) {
      console.error('Publish error:', e);
      setIsLoading(false);
      return false;
    }
  };

  const rollbackRevision = async (revisionId: string): Promise<boolean> => {
    const revision = publishedState.revisions.find(r => r.id === revisionId);
    if (!revision || !revision.snapshot) return false;

    try {
      const restored = revision.snapshot as CMSState;
      setDraftState(restored);
      setIsDraftModified(true);
      logAudit('RESTORE', 'Revision', `Versão #${revision.version} restaurada para rascunho`, revisionId);
      return true;
    } catch (e) {
      console.error('Rollback error:', e);
      return false;
    }
  };

  const exportBackupJSON = () => {
    const exportData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      state: publishedState
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ouzze_cms_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    logAudit('SETTINGS_CHANGE', 'Backup', 'Exportação de backup JSON realizada');
  };

  const importBackupJSON = async (jsonString: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.state || !parsed.state.settings || !parsed.state.brandTokens) {
        return { success: false, message: 'Arquivo JSON inválido ou incompatível com o CMS da Ouzze.' };
      }
      setDraftState({ ...getInitialState(), ...parsed.state });
      setIsDraftModified(true);
      logAudit('SETTINGS_CHANGE', 'Backup', 'Backup importado para rascunho com sucesso');
      return { success: true, message: 'Conteúdo importado com sucesso para o rascunho!' };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Erro ao processar arquivo JSON.' };
    }
  };

  // Context value
  // In preview mode or admin preview, we view draftState; otherwise visitor views publishedState
  const activeState = isPreviewMode ? draftState : publishedState;

  return (
    <CMSContext.Provider
      value={{
        state: activeState,
        publishedState,
        isDraftModified,
        isPreviewMode,
        previewDevice,
        setPreviewDevice,
        setIsPreviewMode,
        isSupabaseOnline,
        isLoading,
        lastSavedAt,
        lastPublishedAt,
        updateSettings,
        updateBrandTokens,
        restoreDefaultBrandTokens,
        updatePage,
        addPage,
        deletePage,
        updateSection,
        addSection,
        deleteSection,
        reorderSections,
        addSegment,
        updateSegment,
        deleteSegment,
        addEquipment,
        updateEquipment,
        deleteEquipment,
        addService,
        updateService,
        deleteService,
        addDownload,
        updateDownload,
        deleteDownload,
        updateNavigation,
        updateAnnouncement,
        addFaq,
        updateFaq,
        deleteFaq,
        addMediaAsset,
        updateMediaAsset,
        deleteMediaAsset,
        submitLead,
        updateLeadStatus,
        addLeadNote,
        deleteLead,
        exportLeadsCSV,
        saveDraft,
        publishChanges,
        rollbackRevision,
        exportBackupJSON,
        importBackupJSON
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
