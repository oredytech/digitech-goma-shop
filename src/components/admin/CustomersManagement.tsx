
import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CustomersManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion des Clients</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Clients</CardTitle>
          <CardDescription>Cette section sera implémentée prochainement.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <Users className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-center text-gray-500">
              Ici vous pourrez gérer les comptes clients, consulter leur historique d'achat, 
              et envoyer des emails marketing personnalisés.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersManagement;
