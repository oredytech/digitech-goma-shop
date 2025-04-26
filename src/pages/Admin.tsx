
import React, { useState } from 'react';
import { AdminLayout } from '../components/admin/layout/AdminLayout';

// Dashboard components
import DashboardOverview from '../components/admin/DashboardOverview';
import ProductsManagement from '../components/admin/ProductsManagement';
import OrdersManagement from '../components/admin/OrdersManagement';
import CustomersManagement from '../components/admin/CustomersManagement';
import PaymentsManagement from '../components/admin/PaymentsManagement';
import PromotionsManagement from '../components/admin/PromotionsManagement';
import MessagesManagement from '../components/admin/MessagesManagement';
import SiteSettings from '../components/admin/SiteSettings';
import AmazonAffiliates from '../components/admin/AmazonAffiliates';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'products':
        return <ProductsManagement />;
      case 'orders':
        return <OrdersManagement />;
      case 'customers':
        return <CustomersManagement />;
      case 'payments':
        return <PaymentsManagement />;
      case 'promotions':
        return <PromotionsManagement />;
      case 'messages':
        return <MessagesManagement />;
      case 'settings':
        return <SiteSettings />;
      case 'amazon':
        return <AmazonAffiliates />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <AdminLayout
      darkMode={darkMode}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onToggleDarkMode={toggleDarkMode}
    >
      {renderContent()}
    </AdminLayout>
  );
};

export default Admin;
