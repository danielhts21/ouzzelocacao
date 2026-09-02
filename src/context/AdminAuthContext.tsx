import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AdminUser, AdminRole } from '../types/cms';

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  hasRole: (requiredRole: AdminRole) => boolean;
  isMockAuth: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const LOCAL_ADMIN_KEY = 'ouzze_cms_admin_session';

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMockAuth, setIsMockAuth] = useState(!isSupabaseConfigured);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);

      if (isSupabaseConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            // Check admin_users table
            const { data: adminData } = await supabase
              .from('admin_users')
              .select('*')
              .eq('user_id', session.user.id)
              .single();

            if (adminData && adminData.active) {
              setUser({
                id: adminData.id,
                email: adminData.email,
                name: adminData.name,
                role: adminData.role as AdminRole,
                active: adminData.active,
                createdAt: adminData.created_at
              });
              setIsMockAuth(false);
              setIsLoading(false);
              return;
            } else {
              // Fallback to basic session role if record not yet synced
              setUser({
                id: session.user.id,
                email: session.user.email || 'admin@ouzze.com.br',
                name: session.user.user_metadata?.name || 'Administrador Ouzze',
                role: 'owner',
                active: true,
                createdAt: session.user.created_at
              });
              setIsMockAuth(false);
              setIsLoading(false);
              return;
            }
          }
        } catch (err) {
          console.warn('Supabase auth check error:', err);
        }
      }

      // Check local storage session for fallback / local admin mode
      const savedSession = localStorage.getItem(LOCAL_ADMIN_KEY);
      if (savedSession) {
        try {
          const parsed = JSON.parse(savedSession);
          if (parsed && parsed.email) {
            setUser(parsed);
          }
        } catch (e) {
          localStorage.removeItem(LOCAL_ADMIN_KEY);
        }
      }

      setIsLoading(false);
    };

    initAuth();

    // Listen to Supabase auth changes if configured
    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'admin@ouzze.com.br',
            name: session.user.user_metadata?.name || 'Administrador Ouzze',
            role: 'owner',
            active: true,
            createdAt: session.user.created_at
          });
          setIsMockAuth(false);
        } else {
          const savedSession = localStorage.getItem(LOCAL_ADMIN_KEY);
          if (!savedSession) {
            setUser(null);
          }
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    if (isSupabaseConfigured && password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          const adminObj: AdminUser = {
            id: data.user.id,
            email: data.user.email || email,
            name: data.user.user_metadata?.name || 'Administrador Ouzze',
            role: 'owner',
            active: true,
            createdAt: data.user.created_at
          };
          setUser(adminObj);
          setIsMockAuth(false);
          setIsLoading(false);
          return { success: true };
        }
      } catch (err: any) {
        setIsLoading(false);
        return { success: false, error: err?.message || 'Falha na autenticação' };
      }
    }

    // Local / Demonstration mode (e.g. initial setup)
    // Validate email format
    if (!email || !email.includes('@')) {
      setIsLoading(false);
      return { success: false, error: 'Por favor insira um e-mail corporativo válido.' };
    }

    const mockAdmin: AdminUser = {
      id: 'local-owner-001',
      email,
      name: email.split('@')[0].toUpperCase(),
      role: 'owner',
      active: true,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(mockAdmin));
    setUser(mockAdmin);
    setIsMockAuth(true);
    setIsLoading(false);
    return { success: true };
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
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    setUser(null);
    setIsLoading(false);
  };

  const hasRole = (requiredRole: AdminRole): boolean => {
    if (!user) return false;
    if (user.role === 'owner') return true;
    if (user.role === 'admin' && (requiredRole === 'admin' || requiredRole === 'editor')) return true;
    if (user.role === 'editor' && requiredRole === 'editor') return true;
    return false;
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        hasRole,
        isMockAuth
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
      login: async () => ({ success: false, error: 'AdminAuthProvider não encontrado' }),
      logout: async () => {},
      hasRole: () => false,
      isMockAuth: true
    };
  }
  return context;
};
