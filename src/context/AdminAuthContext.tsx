import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AdminUser, AdminRole } from '../types/cms';
import {
  isLocalAdminEnabled,
  validateLocalDevLogin,
  saveLocalSession,
  getLocalSession,
  clearLocalSession
} from '../lib/localAdminAuth';

export type AuthProviderType = 'local-dev' | 'supabase' | 'none';

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  authProvider: AuthProviderType;
  isLocalDevMode: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  hasRole: (requiredRole: AdminRole) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authProvider, setAuthProvider] = useState<AuthProviderType>('none');

  const isLocalEnabled = isLocalAdminEnabled();
  const isAvailable = isSupabaseConfigured || isLocalEnabled;

  // Helper to strictly verify user against the Supabase admin_users table
  const verifyAdminUser = useCallback(async (userId: string): Promise<AdminUser | null> => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, user_id, name, email, role, active, created_at')
        .eq('user_id', userId)
        .maybeSingle();

      if (error || !data) {
        console.warn('Admin user verification failed or user not registered:', error?.message);
        return null;
      }

      if (!data.active) {
        console.warn('Admin user is deactivated:', data.email);
        return null;
      }

      return {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role as AdminRole,
        active: data.active,
        createdAt: data.created_at
      };
    } catch (err) {
      console.error('Error querying admin_users table:', err);
      return null;
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);

      // 1. Check Supabase session if configured
      if (isSupabaseConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const verifiedAdmin = await verifyAdminUser(session.user.id);
            if (verifiedAdmin) {
              setUser(verifiedAdmin);
              setAuthProvider('supabase');
              setIsLoading(false);
              return;
            } else {
              await supabase.auth.signOut();
            }
          }
        } catch (err) {
          console.warn('Supabase auth session check warning:', err);
        }
      }

      // 2. Check local dev session in sessionStorage (development only)
      if (isLocalAdminEnabled()) {
        const localUser = getLocalSession();
        if (localUser) {
          setUser(localUser);
          setAuthProvider('local-dev');
          setIsLoading(false);
          return;
        }
      }

      setUser(null);
      setAuthProvider('none');
      setIsLoading(false);
    };

    initAuth();

    // Supabase auth state listener
    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_OUT' || !session?.user) {
          if (authProvider === 'supabase') {
            setUser(null);
            setAuthProvider('none');
          }
          return;
        }

        if (session?.user) {
          const verifiedAdmin = await verifyAdminUser(session.user.id);
          if (verifiedAdmin) {
            setUser(verifiedAdmin);
            setAuthProvider('supabase');
          } else {
            await supabase.auth.signOut();
            setUser(null);
            setAuthProvider('none');
          }
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [verifyAdminUser, authProvider]);

  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    if (!email || !password) {
      setIsLoading(false);
      return { success: false, error: 'Por favor preencha e-mail e senha de acesso.' };
    }

    // 1. Try Supabase Auth if configured
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });

        if (!error && data.user) {
          const verifiedAdmin = await verifyAdminUser(data.user.id);
          if (verifiedAdmin) {
            setUser(verifiedAdmin);
            setAuthProvider('supabase');
            setIsLoading(false);
            return { success: true };
          } else {
            await supabase.auth.signOut();
            setIsLoading(false);
            return { 
              success: false, 
              error: 'Usuário não autorizado no perfil administrativo (admin_users).' 
            };
          }
        }
      } catch (err: any) {
        console.warn('Supabase auth attempt failed:', err);
      }
    }

    // 2. Try Local Development Auth (strictly when enabled)
    if (isLocalAdminEnabled()) {
      const localRes = await validateLocalDevLogin(email, password);
      if (localRes.success && localRes.user) {
        saveLocalSession(localRes.user);
        setUser(localRes.user);
        setAuthProvider('local-dev');
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { 
          success: false, 
          error: localRes.error || 'Credenciais de desenvolvimento inválidas.' 
        };
      }
    }

    // 3. Neither provider available (Production without Supabase)
    setIsLoading(false);
    return {
      success: false,
      error: 'CMS administrativo ainda não configurado para produção.'
    };
  };

  const logout = async () => {
    setIsLoading(true);
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Sign out error:', e);
      }
    }
    clearLocalSession();
    setUser(null);
    setAuthProvider('none');
    setIsLoading(false);
  };

  const hasRole = (requiredRole: AdminRole): boolean => {
    if (!user || !user.active) return false;
    if (user.role === 'owner') return true;
    if (user.role === 'admin' && (requiredRole === 'admin' || requiredRole === 'editor')) return true;
    if (user.role === 'editor' && requiredRole === 'editor') return true;
    return false;
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && user.active,
        isLoading,
        isConfigured: isAvailable,
        authProvider,
        isLocalDevMode: authProvider === 'local-dev',
        login,
        logout,
        hasRole
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isConfigured: false,
      authProvider: 'none' as AuthProviderType,
      isLocalDevMode: false,
      login: async () => ({ success: false, error: 'AdminAuthProvider não encontrado' }),
      logout: async () => {},
      hasRole: () => false
    };
  }
  return context;
};
