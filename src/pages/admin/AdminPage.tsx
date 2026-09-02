import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useCMS } from '../../context/CMSContext';
import { AdminLayout, AdminTab } from './AdminLayout';
import { AdminLoginPage } from './AdminLoginPage';
import { AdminDashboardTab } from './tabs/AdminDashboardTab';
import { AdminBrandTab } from './tabs/AdminBrandTab';
import { AdminPagesTab } from './tabs/AdminPagesTab';
import { AdminCatalogTab } from './tabs/AdminCatalogTab';
import { AdminMediaTab } from './tabs/AdminMediaTab';
import { AdminLeadsTab } from './tabs/AdminLeadsTab';
import { AdminSettingsTab } from './tabs/AdminSettingsTab';
import { AdminHistoryTab } from './tabs/AdminHistoryTab';

interface AdminPageProps {
  onBackToSite: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToSite }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07080B] flex items-center justify-center text-zinc-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono uppercase tracking-wider">Carregando Painel CMS...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLoginPage
        onSuccess={() => setCurrentTab('dashboard')}
        onBackToSite={onBackToSite}
      />
    );
  }

  return (
    <AdminLayout
      currentTab={currentTab}
      onSelectTab={setCurrentTab}
      onExitAdmin={onBackToSite}
    >
      {currentTab === 'dashboard' && <AdminDashboardTab onNavigateTab={setCurrentTab} />}
      {currentTab === 'brand' && <AdminBrandTab />}
      {currentTab === 'pages' && <AdminPagesTab />}
      {currentTab === 'catalog' && <AdminCatalogTab />}
      {currentTab === 'media' && <AdminMediaTab />}
      {currentTab === 'leads' && <AdminLeadsTab />}
      {currentTab === 'settings' && <AdminSettingsTab />}
      {currentTab === 'history' && <AdminHistoryTab />}
    </AdminLayout>
  );
};
