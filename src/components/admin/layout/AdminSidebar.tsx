
import React from 'react';
import { Sun, Moon, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator
} from '@/components/ui/sidebar';
import { menuItems } from './admin-menu-items';

interface AdminSidebarProps {
  activeSection: string;
  darkMode: boolean;
  onSectionChange: (section: string) => void;
  onToggleDarkMode: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeSection,
  darkMode,
  onSectionChange,
  onToggleDarkMode,
}) => {
  const { signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de se déconnecter",
        variant: "destructive"
      });
    }
  };
  return (
    <>
      <SidebarHeader className="flex items-center justify-center py-6">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-digitech-blue">DIGITECH</span>
          <span className="text-sm font-medium text-digitech-orange">ADMIN</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="overflow-y-auto flex-grow">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton 
                isActive={activeSection === item.id} 
                onClick={() => onSectionChange(item.id)}
                tooltip={item.label}
                className="transition-colors duration-200"
              >
                <item.icon className="w-5 h-5" />
                <span className="ml-2 md:opacity-100">{item.label}</span>
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
            className="w-full justify-start transition-colors duration-200"
            onClick={onToggleDarkMode}
          >
            {darkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
            {darkMode ? "Mode Clair" : "Mode Sombre"}
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="w-full justify-start bg-digitech-orange hover:bg-digitech-orange/90 transition-colors duration-200"
          >
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            className="w-full justify-start transition-colors duration-200"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </SidebarFooter>
    </>
  );
};
