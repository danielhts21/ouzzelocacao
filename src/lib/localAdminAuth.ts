// ==============================================================================
// LOCAL DEVELOPMENT AUTH ONLY — NEVER ENABLE IN PRODUCTION
// Este módulo fornece autenticação local temporária estritamente para o ambiente
// de desenvolvimento antes da conclusão do Supabase Auth definitivo.
// ==============================================================================

import { AdminUser } from '../types/cms';

// E-mail autorizado para desenvolvimento local
export const LOCAL_DEV_ADMIN_EMAIL = 'danielhts21@gmail.com';

// Hash SHA-256 da senha de desenvolvimento (a senha original NUNCA é armazenada em texto puro)
export const LOCAL_DEV_ADMIN_HASH = 'd534010aed8f180810817ca72c745167698bb67535cbe856152f06c58c0ae0e9';

export const LOCAL_SESSION_STORAGE_KEY = 'ouzze_admin_local_session';

export interface LocalAdminSessionData {
  authenticated: boolean;
  email: string;
  name: string;
  role: 'owner';
  provider: 'local-dev';
  createdAt: string;
}

/**
 * Verifica se o modo de administrador local está habilitado.
 * OBRIGATÓRIO: Desabilitado em produção (import.meta.env.PROD === true)
 * e restrito a hostnames de desenvolvimento.
 */
export function isLocalAdminEnabled(): boolean {
  if (typeof window === 'undefined') return false;

  const isDev = Boolean(import.meta.env.DEV);
  const isProd = Boolean(import.meta.env.PROD);

  // Bloqueio rigoroso em produção
  if (!isDev || isProd) {
    return false;
  }

  const hostname = window.location.hostname;
  
  // Permitido somente em localhost, 127.0.0.1, IPv6 loopback ou containers de desenvolvimento local
  const isLocalHost = 
    hostname === 'localhost' || 
    hostname === '127.0.0.1' || 
    hostname === '[::1]' ||
    hostname === '0.0.0.0' ||
    (isDev && (hostname.includes('localhost') || hostname.includes('ais-dev-')));

  return isLocalHost;
}

/**
 * Calcula o hash SHA-256 da senha digitada utilizando a Web Crypto API.
 */
export async function computeSHA256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Valida credenciais do modo local de desenvolvimento.
 */
export async function validateLocalDevLogin(
  emailInput: string,
  passwordInput: string
): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  // Verificação de segurança: não executar se estiver desabilitado
  if (!isLocalAdminEnabled()) {
    return {
      success: false,
      error: 'Autenticação local desabilitada neste ambiente.'
    };
  }

  const normalizedEmail = emailInput.trim().toLowerCase();
  if (normalizedEmail !== LOCAL_DEV_ADMIN_EMAIL.toLowerCase()) {
    return {
      success: false,
      error: 'E-mail administrativo não autorizado para acesso local.'
    };
  }

  const computedHash = await computeSHA256(passwordInput);
  if (computedHash !== LOCAL_DEV_ADMIN_HASH) {
    return {
      success: false,
      error: 'Senha de acesso incorreta.'
    };
  }

  const user: AdminUser = {
    id: 'local-dev-owner',
    email: LOCAL_DEV_ADMIN_EMAIL,
    name: 'Daniel (Dev Owner)',
    role: 'owner',
    active: true,
    createdAt: new Date().toISOString()
  };

  return { success: true, user };
}

/**
 * Salva a sessão local no sessionStorage (NUNCA no localStorage, NUNCA gravando senha ou hash).
 */
export function saveLocalSession(user: AdminUser): void {
  if (typeof window === 'undefined') return;

  const sessionData: LocalAdminSessionData = {
    authenticated: true,
    email: user.email,
    name: user.name,
    role: 'owner',
    provider: 'local-dev',
    createdAt: new Date().toISOString()
  };

  try {
    sessionStorage.setItem(LOCAL_SESSION_STORAGE_KEY, JSON.stringify(sessionData));
  } catch (e) {
    console.error('Erro ao gravar sessão no sessionStorage:', e);
  }
}

/**
 * Obtém a sessão local ativa do sessionStorage, se for válida e se o modo local estiver habilitado.
 */
export function getLocalSession(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  if (!isLocalAdminEnabled()) return null;

  try {
    const raw = sessionStorage.getItem(LOCAL_SESSION_STORAGE_KEY);
    if (!raw) return null;

    const data: LocalAdminSessionData = JSON.parse(raw);
    if (
      data &&
      data.authenticated &&
      data.email.toLowerCase() === LOCAL_DEV_ADMIN_EMAIL.toLowerCase() &&
      data.provider === 'local-dev' &&
      data.role === 'owner'
    ) {
      return {
        id: 'local-dev-owner',
        email: data.email,
        name: data.name || 'Daniel (Dev Owner)',
        role: 'owner',
        active: true,
        createdAt: data.createdAt
      };
    }
  } catch (e) {
    console.error('Erro ao ler sessão do sessionStorage:', e);
  }

  return null;
}

/**
 * Encerra e remove a sessão do sessionStorage.
 */
export function clearLocalSession(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(LOCAL_SESSION_STORAGE_KEY);
  } catch (e) {
    console.error('Erro ao limpar sessão:', e);
  }
}
