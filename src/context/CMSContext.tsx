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
  sections: [...DEFAULT_HOME_SECTIONS, ...DEFAULT_EDUCATION_SECTIONS],
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
  
  const [publishedState, setPublishedState] = useState<CMSState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PUBLISHED_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...getInitialState(), ...parsed };
      } catch (e) {
        console.error('Error parsing published local storage:', e);
      }
    }
    return getInitialState();
  });

  const [draftState, setDraftState] = useState<CMSState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_DRAFT_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...getInitialState(), ...parsed };
      } catch (e) {
        console.error('Error parsing draft local storage:', e);
      }
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

  // Load published data from Supabase if configured, with graceful fallback
  useEffect(() => {
    const fetchFromSupabase = async () => {
      if (!isSupabaseConfigured) {
        setIsSupabaseOnline(false);
        return;
      }

      try {
        setIsLoading(true);
        // Test connection with a lightweight fetch
        const { data: settingsData, error } = await supabase
          .from('site_settings')
          .select('*')
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.warn('Supabase not fully seeded or schema pending:', error.message);
          setIsSupabaseOnline(false);
        } else if (settingsData) {
          setIsSupabaseOnline(true);
          // Sync live state from Supabase
          // (In a full prod environment, all tables are fetched or subscribed to)
        }
      } catch (err) {
        console.warn('Supabase fetch failed, relying on local snapshot:', err);
        setIsSupabaseOnline(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFromSupabase();
  }, []);

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

      // If Supabase is online, publish to Supabase tables
      if (isSupabaseConfigured) {
        try {
          await supabase.from('site_settings').upsert({
            id: 'primary',
            brand_name: draftState.settings.brandName,
            short_name: draftState.settings.shortName,
            tagline: draftState.settings.tagline,
            slogan: draftState.settings.slogan,
            meta_description: draftState.settings.metaDescription,
            logo_url: draftState.settings.logoUrl,
            logo_dark_url: draftState.settings.logoDarkUrl,
            logo_original_meta: draftState.settings.logoOriginalMeta,
            logo_container_style: draftState.settings.logoContainerStyle,
            favicon_url: draftState.settings.faviconUrl,
            whatsapp: draftState.settings.whatsapp,
            contact: draftState.settings.contact,
            socials: draftState.settings.socials,
            seo: draftState.settings.seo,
            legal: draftState.settings.legal,
            maintenance: draftState.settings.maintenance,
            updated_at: new Date().toISOString()
          });

          await supabase.from('brand_design_tokens').upsert({
            id: 'primary',
            preset: draftState.brandTokens.preset,
            colors: draftState.brandTokens.colors,
            neon: draftState.brandTokens.neon,
            typography: draftState.brandTokens.typography,
            style: draftState.brandTokens.style,
            motion: draftState.brandTokens.motion,
            updated_at: new Date().toISOString()
          });
        } catch (err) {
          console.warn('Supabase publish partial sync:', err);
        }
      }

      // Persist to local published storage
      localStorage.setItem(LOCAL_STORAGE_PUBLISHED_KEY, JSON.stringify(newPublishedState));
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
