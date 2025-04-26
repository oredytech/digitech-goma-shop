
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  ShoppingCart, 
  Package, 
  CheckCircle, 
  Clock, 
  XCircle, 
  MessageSquare, 
  TrendingUp 
} from 'lucide-react';

// Demo data - In a real app, this would come from an API
const salesData = [
  { name: 'Jan', total: 2400 },
  { name: 'Fév', total: 1398 },
  { name: 'Mar', total: 9800 },
  { name: 'Avr', total: 3908 },
  { name: 'Mai', total: 4800 },
  { name: 'Jun', total: 3800 },
  { name: 'Jul', total: 4300 },
];

const topProducts = [
  { id: 1, name: "Ordinateur Portable HP ProBook 450", sold: 27, views: 342 },
  { id: 2, name: "Samsung Galaxy A53", sold: 21, views: 289 },
  { id: 3, name: "Écran Dell 27\" FHD", sold: 19, views: 255 },
  { id: 4, name: "Clavier Mécanique Keychron K2", sold: 15, views: 201 },
];

const recentOrders = [
  { id: "ORD-001", customer: "Jean Mutombo", status: "livré", date: "27 Avr 2023", amount: "850 USD" },
  { id: "ORD-002", customer: "Marie Kabongo", status: "en préparation", date: "26 Avr 2023", amount: "299 USD" },
  { id: "ORD-003", customer: "Pierre Kasongo", status: "payé", date: "25 Avr 2023", amount: "199 USD" },
  { id: "ORD-004", customer: "Sophie Mbaya", status: "annulé", date: "24 Avr 2023", amount: "110 USD" },
];

const getStatusBadge = (status: string) => {
  switch(status) {
    case 'livré':
      return <Badge className="bg-green-500">Livré</Badge>;
    case 'payé':
      return <Badge className="bg-blue-500">Payé</Badge>;
    case 'en préparation':
      return <Badge className="bg-yellow-500">En préparation</Badge>;
    case 'annulé':
      return <Badge className="bg-red-500">Annulé</Badge>;
    default:
      return <Badge>En attente</Badge>;
  }
};

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tableau de Bord</h1>
        <p className="text-sm text-gray-500">Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <ShoppingCart className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Commandes Totales</p>
              <h3 className="text-2xl font-bold">248</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Commandes Livrées</p>
              <h3 className="text-2xl font-bold">187</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">En Attente</p>
              <h3 className="text-2xl font-bold">32</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-purple-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Nouveaux Messages</p>
              <h3 className="text-2xl font-bold">19</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Chiffre d'Affaires</CardTitle>
          <CardDescription>Aperçu mensuel des ventes en USD</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} USD`, 'Ventes']}
                labelFormatter={(label) => `Mois: ${label}`}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="total" fill="#0a192f" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Produits les Plus Vendus</CardTitle>
            <CardDescription>Basé sur le nombre de ventes</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead className="text-right">Vendus</TableHead>
                  <TableHead className="text-right">Vues</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-right">{product.sold}</TableCell>
                    <TableCell className="text-right">{product.views}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Commandes Récentes</CardTitle>
            <CardDescription>Les dernières commandes reçues</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
