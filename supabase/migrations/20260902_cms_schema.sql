-- ==============================================================================
-- OUZZE TECNOLOGIA - SCHEMA DO CMS & PAINEL ADMINISTRATIVO
-- ==============================================================================

-- 1. Habilitar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabela de Usuários Administrativos
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'editor')),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Tabela de Configurações Gerais do Site
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'primary',
  brand_name TEXT NOT NULL DEFAULT 'OUZZE TECNOLOGIA',
  short_name TEXT NOT NULL DEFAULT 'Ouzze',
  tagline TEXT,
  slogan TEXT,
  meta_description TEXT,
  logo_url TEXT NOT NULL DEFAULT '/logo.svg',
  logo_dark_url TEXT,
  logo_mobile_url TEXT,
  logo_original_meta JSONB,
  logo_container_style JSONB DEFAULT '{"maxHeight": 48, "maxWidth": 220, "padding": 0, "alignment": "left"}'::jsonb,
  favicon_url TEXT DEFAULT '/logo.svg',
  whatsapp JSONB DEFAULT '{"phone": "5511999999999", "formattedPhone": "", "defaultMessage": "Olá, vim do site da Ouzze Tecnologia.", "autoOpenAfterForm": true}'::jsonb,
  contact JSONB DEFAULT '{"email": "", "salesEmail": "", "phone": "", "address": "", "city": "São Paulo", "state": "SP", "cep": "", "businessHours": "Segunda a Sexta, das 08h às 18h"}'::jsonb,
  socials JSONB DEFAULT '{"whatsapp": "https://wa.me/5511999999999"}'::jsonb,
  seo JSONB DEFAULT '{"domain": "https://ouzze.com.br", "titleTemplate": "%s | Ouzze Tecnologia", "robotsIndex": true, "cookieConsentEnabled": false}'::jsonb,
  legal JSONB DEFAULT '{"cnpj": "", "companyLegalName": "OUZZE TECNOLOGIA"}'::jsonb,
  maintenance JSONB DEFAULT '{"enabled": false, "message": "Em manutenção", "allowAdminBypass": true}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Tabela de Tokens de Design & Identidade Visual
CREATE TABLE IF NOT EXISTS public.brand_design_tokens (
  id TEXT PRIMARY KEY DEFAULT 'primary',
  preset TEXT NOT NULL DEFAULT 'OUZZE_PREMIUM',
  colors JSONB NOT NULL,
  neon JSONB NOT NULL,
  typography JSONB NOT NULL,
  style JSONB NOT NULL,
  motion JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Tabela de Páginas
CREATE TABLE IF NOT EXISTS public.pages (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  og_image TEXT,
  status TEXT NOT NULL DEFAULT 'PUBLISHED' CHECK (status IN ('PUBLISHED', 'DRAFT', 'ARCHIVED')),
  is_system BOOLEAN DEFAULT false,
  sections_order JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT
);

-- 6. Tabela de Seções de Página
CREATE TABLE IF NOT EXISTS public.page_sections (
  id TEXT PRIMARY KEY,
  page_slug TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  "order" INTEGER NOT NULL DEFAULT 0,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  styles JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Tabela de Segmentos Atendidos
CREATE TABLE IF NOT EXISTS public.segments (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  key_benefits JSONB DEFAULT '[]'::jsonb,
  slug TEXT NOT NULL,
  icon_name TEXT DEFAULT 'Layers',
  stats_highlight TEXT,
  is_featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Tabela de Equipamentos (Locação & Vendas)
CREATE TABLE IF NOT EXISTS public.equipment_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT,
  short_desc TEXT,
  specs JSONB DEFAULT '[]'::jsonb,
  recommended_for TEXT,
  icon_name TEXT DEFAULT 'Monitor',
  badge TEXT,
  for_rental BOOLEAN DEFAULT true,
  for_sale BOOLEAN DEFAULT true,
  active BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Tabela de Serviços de TI
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  sla TEXT,
  icon_name TEXT DEFAULT 'ShieldCheck',
  active BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Tabela de Leads & Oportunidades Comerciais (Privada)
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  cnpj TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  solution_type TEXT NOT NULL,
  segment TEXT,
  estimated_quantity TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  page TEXT DEFAULT '/',
  status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST', 'ARCHIVED')),
  admin_notes JSONB DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Tabela de Itens de Navegação (Menus)
CREATE TABLE IF NOT EXISTS public.navigation_items (
  id TEXT PRIMARY KEY,
  menu_location TEXT NOT NULL CHECK (menu_location IN ('header', 'footer')),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  is_external BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  highlight BOOLEAN DEFAULT false,
  badge TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Tabela de Biblioteca de Mídia
CREATE TABLE IF NOT EXISTS public.media_assets (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  name TEXT NOT NULL,
  original_name TEXT NOT NULL,
  url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  dimensions JSONB,
  alt_text TEXT DEFAULT '',
  is_decorative BOOLEAN DEFAULT false,
  tags JSONB DEFAULT '[]'::jsonb,
  usage_locations JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Tabela de Materiais para Download (PDFs)
CREATE TABLE IF NOT EXISTS public.material_downloads (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT,
  file_size TEXT,
  cover_url TEXT,
  segment TEXT,
  button_text TEXT DEFAULT 'Baixar Apresentação',
  active BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. Tabela de Banners / Avisos
CREATE TABLE IF NOT EXISTS public.announcements (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  text TEXT NOT NULL,
  link TEXT,
  link_text TEXT,
  bg_color TEXT DEFAULT '#DC2626',
  text_color TEXT DEFAULT '#FFFFFF',
  active BOOLEAN DEFAULT false,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. Tabela de FAQ
CREATE TABLE IF NOT EXISTS public.faqs (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'geral',
  active BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. Histórico de Versões / Content Revisions
CREATE TABLE IF NOT EXISTS public.content_revisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  version SERIAL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  snapshot JSONB NOT NULL,
  description TEXT,
  created_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. Log de Auditoria
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details TEXT,
  user_email TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- POLÍTICAS DE SEGURANÇA (ROW LEVEL SECURITY - RLS)
-- ==============================================================================

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_design_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.material_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Funções Auxiliares Seguras de Verificação de Perfil Administrativo
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND active = true
  );
$$;

CREATE OR REPLACE FUNCTION public.is_owner()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND role = 'owner' AND active = true
  );
$$;

-- 1. Regras para admin_users:
-- Administradores ativos podem visualizar a equipe; apenas 'owner' pode criar, alterar permissões ou desativar usuários.
CREATE POLICY "Admin View Users" ON public.admin_users
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Owner Manage Users" ON public.admin_users
  FOR ALL TO authenticated
  USING (public.is_owner())
  WITH CHECK (public.is_owner());

-- 2. Regras Públicas de Leitura (Visitantes anônimos só leem conteúdo publicado e ativo)
CREATE POLICY "Public Read Settings" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Public Read Brand Tokens" ON public.brand_design_tokens
  FOR SELECT USING (true);

CREATE POLICY "Public Read Published Pages" ON public.pages
  FOR SELECT USING (status = 'PUBLISHED');

CREATE POLICY "Public Read Active Sections of Published Pages" ON public.page_sections
  FOR SELECT USING (
    active = true AND
    EXISTS (
      SELECT 1 FROM public.pages
      WHERE pages.slug = page_sections.page_slug AND pages.status = 'PUBLISHED'
    )
  );

CREATE POLICY "Public Read Active Segments" ON public.segments
  FOR SELECT USING (active = true);

CREATE POLICY "Public Read Active Equipment" ON public.equipment_items
  FOR SELECT USING (active = true);

CREATE POLICY "Public Read Active Services" ON public.services
  FOR SELECT USING (active = true);

CREATE POLICY "Public Read Navigation" ON public.navigation_items
  FOR SELECT USING (active = true);

CREATE POLICY "Public Read Media" ON public.media_assets
  FOR SELECT USING (true);

CREATE POLICY "Public Read Downloads" ON public.material_downloads
  FOR SELECT USING (active = true);

CREATE POLICY "Public Read Announcements" ON public.announcements
  FOR SELECT USING (active = true);

CREATE POLICY "Public Read FAQs" ON public.faqs
  FOR SELECT USING (active = true);

-- 3. Inserção de Leads:
-- Visitantes anônimos podem APENAS inserir novos leads; NUNCA ler, atualizar ou excluir.
CREATE POLICY "Public Insert Leads" ON public.leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Administradores autorizados gerenciam leads
CREATE POLICY "Admin Select Leads" ON public.leads
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin Update Leads" ON public.leads
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin Delete Leads" ON public.leads
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- 4. Operações Administrativas (Todas exigem is_admin())
CREATE POLICY "Admin Full Access Settings" ON public.site_settings
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin Full Access Brand Tokens" ON public.brand_design_tokens
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin Full Access Pages" ON public.pages
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin Full Access Sections" ON public.page_sections
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin Full Access Segments" ON public.segments
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin Full Access Equipment" ON public.equipment_items
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin Full Access Services" ON public.services
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin Full Access Navigation" ON public.navigation_items
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin Full Access Media" ON public.media_assets
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin Full Access Downloads" ON public.material_downloads
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin Full Access Announcements" ON public.announcements
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin Full Access FAQs" ON public.faqs
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin Full Access Revisions" ON public.content_revisions
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin Full Access Audit" ON public.audit_logs
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ==============================================================================
-- STORAGE BUCKETS & POLICIES
-- ==============================================================================

-- Criar Buckets se não existirem
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('public-media', 'public-media', true),
  ('brand-originals', 'brand-originals', true),
  ('documents', 'documents', true)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

-- Leitura pública de mídias e marcas
CREATE POLICY "Public Read Storage Public Media" ON storage.objects
  FOR SELECT
  USING (bucket_id IN ('public-media', 'brand-originals', 'documents'));

-- Administradores autorizados têm permissão para upload, atualização e exclusão
CREATE POLICY "Admin Upload Storage" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id IN ('public-media', 'brand-originals', 'documents') AND
    public.is_admin()
  );

CREATE POLICY "Admin Update Storage" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id IN ('public-media', 'brand-originals', 'documents') AND
    public.is_admin()
  )
  WITH CHECK (
    bucket_id IN ('public-media', 'brand-originals', 'documents') AND
    public.is_admin()
  );

CREATE POLICY "Admin Delete Storage" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id IN ('public-media', 'brand-originals', 'documents') AND
    public.is_admin()
  );
