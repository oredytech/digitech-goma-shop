
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  SidebarProvider, 
  Sidebar,
} from '@/components/ui/sidebar';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onToggleDarkMode: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  darkMode,
  activeSection,
  onSectionChange,
  onToggleDarkMode,
}) => {
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {/* Desktop Sidebar */}
          <Sidebar 
            variant="sidebar" 
            collapsible="icon" 
            className="hidden md:flex border-r border-gray-200 dark:border-gray-800"
          >
            <AdminSidebar
              activeSection={activeSection}
              darkMode={darkMode}
              onSectionChange={onSectionChange}
              onToggleDarkMode={onToggleDarkMode}
            />
          </Sidebar>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="fixed top-4 left-4 z-50 md:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="w-[280px] p-0 border-r border-gray-200 dark:border-gray-800"
            >
              <AdminSidebar
                activeSection={activeSection}
                darkMode={darkMode}
                onSectionChange={onSectionChange}
                onToggleDarkMode={onToggleDarkMode}
              />
            </SheetContent>
          </Sheet>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="container mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};
