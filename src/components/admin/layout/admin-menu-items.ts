
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
} from 'lucide-react';

export const menuItems = [
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
