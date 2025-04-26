
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AmazonAffiliates = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Affiliations Amazon</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Affiliations Amazon</CardTitle>
          <CardDescription>Cette section sera implémentée prochainement.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <ExternalLink className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-center text-gray-500">
              Ici vous pourrez gérer les produits avec des liens d'affiliation Amazon,
              mettre à jour les liens et suivre les performances des affiliations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AmazonAffiliates;
