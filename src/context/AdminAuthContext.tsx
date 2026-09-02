import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AdminUser, AdminRole } from '../types/cms';

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  hasRole: (requiredRole: AdminRole) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to strictly verify user against the admin_users table
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

      if (!isSupabaseConfigured) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const verifiedAdmin = await verifyAdminUser(session.user.id);
          if (verifiedAdmin) {
            setUser(verifiedAdmin);
          } else {
            // User has auth session but is not authorized in admin_users -> sign out immediately
            await supabase.auth.signOut();
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.warn('Supabase auth session check error:', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Listen to Supabase auth state changes
    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_OUT' || !session?.user) {
          setUser(null);
          return;
        }

        if (session?.user) {
          const verifiedAdmin = await verifyAdminUser(session.user.id);
          if (verifiedAdmin) {
            setUser(verifiedAdmin);
          } else {
            await supabase.auth.signOut();
            setUser(null);
          }
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [verifyAdminUser]);

  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return { 
        success: false, 
        error: 'CMS não configurado. As variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY não estão configuradas.' 
      };
    }

    if (!email || !password) {
      setIsLoading(false);
      return { success: false, error: 'Por favor preencha e-mail e senha.' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message || 'Credenciais inválidas.' };
      }

      if (!data.user) {
        setIsLoading(false);
        return { success: false, error: 'Usuário não autenticado.' };
      }

      // Mandatory query to admin_users table
      const verifiedAdmin = await verifyAdminUser(data.user.id);

      if (!verifiedAdmin) {
        // Immediately revoke session
        await supabase.auth.signOut();
        setUser(null);
        setIsLoading(false);
        return { 
          success: false, 
          error: 'Usuário não autorizado para acessar o painel administrativo. Contate o administrador.' 
        };
      }

      setUser(verifiedAdmin);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Falha na autenticação com o servidor.' };
    }
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
    setUser(null);
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
        isConfigured: isSupabaseConfigured,
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
      isConfigured: isSupabaseConfigured,
      login: async () => ({ success: false, error: 'AdminAuthProvider não encontrado' }),
      logout: async () => {},
      hasRole: () => false
    };
  }
  return context;
};
