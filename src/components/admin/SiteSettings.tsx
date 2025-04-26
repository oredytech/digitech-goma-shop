
import React from 'react';
import { Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SiteSettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Paramètres du Site</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Paramètres du Site</CardTitle>
          <CardDescription>Cette section sera implémentée prochainement.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <Settings className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-center text-gray-500">
              Ici vous pourrez configurer les paramètres généraux du site,
              les moyens de paiement, les options de livraison et les notifications automatiques.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettings;
