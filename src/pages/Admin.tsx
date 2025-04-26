
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
  Menu,
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: BarChart3 },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'orders', label: 'Commandes', icon: ShoppingBag },
    { id: 'customers', label: 'Clients', icon: Users },
    { id: 'payments', label: 'Paiements', icon: CreditCard },
    { id: 'promotions', label: 'Promotions', icon: Percent },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'amazon', label: 'Affiliations Amazon', icon: ExternalLink },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  // Renamed to AdminSidebarContent to avoid conflicts with imported SidebarContent
  const AdminSidebarContent = () => (
    <>
      <SidebarHeader className="flex items-center justify-center py-6">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-digitech-blue">DIGITECH</span>
          <span className="text-sm font-medium text-digitech-orange">ADMIN</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton 
                isActive={activeSection === item.id} 
                onClick={() => setActiveSection(item.id)}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
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
    </>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {/* Desktop Sidebar */}
          <Sidebar variant="sidebar" collapsible="icon">
            <AdminSidebarContent />
          </Sidebar>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="fixed top-4 left-4 z-50 md:hidden"
              >
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <AdminSidebarContent />
            </SheetContent>
          </Sheet>

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
