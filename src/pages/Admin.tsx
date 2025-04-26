
import React, { useState } from 'react';
import { 
  BarChart3, 
  ShoppingBag, 
  Package, 
  Users, 
  CreditCard, 
  Percent, 
  Settings, 
  MessageSquare,
  ExternalLink,
  Sun,
  Moon,
  Bell,
} from 'lucide-react';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

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

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real implementation, you would apply dark mode to the entire app
    // by toggling a class on the document or using a context
  };

  // Function to render the active section content
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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar variant="sidebar" collapsible="icon">
            <SidebarHeader className="flex items-center justify-center py-6">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-digitech-blue">DIGITECH</span>
                <span className="text-sm font-medium text-digitech-orange">ADMIN</span>
              </div>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeSection === 'dashboard'} 
                    onClick={() => setActiveSection('dashboard')}
                    tooltip="Tableau de Bord"
                  >
                    <BarChart3 />
                    <span>Tableau de Bord</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeSection === 'products'} 
                    onClick={() => setActiveSection('products')}
                    tooltip="Produits"
                  >
                    <Package />
                    <span>Produits</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeSection === 'orders'} 
                    onClick={() => setActiveSection('orders')}
                    tooltip="Commandes"
                  >
                    <ShoppingBag />
                    <span>Commandes</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeSection === 'customers'} 
                    onClick={() => setActiveSection('customers')}
                    tooltip="Clients"
                  >
                    <Users />
                    <span>Clients</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeSection === 'payments'} 
                    onClick={() => setActiveSection('payments')}
                    tooltip="Paiements"
                  >
                    <CreditCard />
                    <span>Paiements</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeSection === 'promotions'} 
                    onClick={() => setActiveSection('promotions')}
                    tooltip="Promotions"
                  >
                    <Percent />
                    <span>Promotions</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeSection === 'messages'} 
                    onClick={() => setActiveSection('messages')}
                    tooltip="Messages"
                  >
                    <MessageSquare />
                    <span>Messages</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeSection === 'amazon'} 
                    onClick={() => setActiveSection('amazon')}
                    tooltip="Affiliations Amazon"
                  >
                    <ExternalLink />
                    <span>Affiliations Amazon</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeSection === 'settings'} 
                    onClick={() => setActiveSection('settings')}
                    tooltip="Paramètres"
                  >
                    <Settings />
                    <span>Paramètres</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <div className="flex flex-col p-4 space-y-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                  {darkMode ? "Mode Clair" : "Mode Sombre"}
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full justify-start bg-digitech-orange hover:bg-digitech-orange/90"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>

          <main className="flex-1 overflow-y-auto p-6">
            <div className="container mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Admin;
