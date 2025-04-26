
import React from 'react';
import { ShoppingBag, Filter, Download, Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

// Demo orders data
const orders = [
  {
    id: "ORD-001",
    customer: "Jean Mutombo",
    date: "2023-04-27",
    status: "livré",
    payment: "PayPal",
    items: [
      { name: "Ordinateur Portable HP ProBook 450", quantity: 1, price: 850 }
    ],
    total: 850
  },
  {
    id: "ORD-002",
    customer: "Marie Kabongo",
    date: "2023-04-26",
    status: "en préparation",
    payment: "Mobile Money",
    items: [
      { name: "Samsung Galaxy A53", quantity: 1, price: 299 }
    ],
    total: 299
  },
  {
    id: "ORD-003",
    customer: "Pierre Kasongo",
    date: "2023-04-25",
    status: "payé",
    payment: "Virement Bancaire",
    items: [
      { name: "Écran Dell 27\" FHD", quantity: 1, price: 199 }
    ],
    total: 199
  },
  {
    id: "ORD-004",
    customer: "Sophie Mbaya",
    date: "2023-04-24",
    status: "annulé",
    payment: "PayPal",
    items: [
      { name: "Câble HDMI 4K 2m", quantity: 1, price: 12 },
      { name: "Clavier Mécanique Keychron K2", quantity: 1, price: 89 }
    ],
    total: 101
  },
  {
    id: "ORD-005",
    customer: "Albert Lukusa",
    date: "2023-04-23",
    status: "en attente",
    payment: "En attente",
    items: [
      { name: "Disque SSD Samsung 970 EVO 1TB", quantity: 1, price: 110 }
    ],
    total: 110
  }
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
      return <Badge variant="outline">En attente</Badge>;
  }
};

const OrdersManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion des Commandes</h1>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exporter CSV
        </Button>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Toutes</p>
            <h3 className="text-xl font-bold">248</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">En attente</p>
            <h3 className="text-xl font-bold">32</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">En préparation</p>
            <h3 className="text-xl font-bold">29</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Livrées</p>
            <h3 className="text-xl font-bold">187</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Annulées</p>
            <h3 className="text-xl font-bold">14</h3>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input placeholder="Rechercher une commande..." className="pl-10" />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <ShoppingBag className="h-4 w-4" />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtrer
        </Button>
      </div>
      
      {/* Orders Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Paiement</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{order.payment}</TableCell>
                <TableCell className="text-right">${order.total}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersManagement;
