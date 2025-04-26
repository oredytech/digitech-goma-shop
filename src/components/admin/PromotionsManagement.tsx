
import React from 'react';
import { Percent } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PromotionsManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion des Promotions</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Promotions</CardTitle>
          <CardDescription>Cette section sera implémentée prochainement.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <Percent className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-center text-gray-500">
              Ici vous pourrez créer des promotions, définir des réductions de prix,
              générer des coupons et suivre l'impact des promotions sur les ventes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionsManagement;
