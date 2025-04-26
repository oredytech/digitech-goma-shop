
import React from 'react';
import { CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentsManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion des Paiements</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Paiements</CardTitle>
          <CardDescription>Cette section sera implémentée prochainement.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <CreditCard className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-center text-gray-500">
              Ici vous pourrez consulter l'historique des paiements reçus, 
              gérer les transactions PayPal, Mobile Money et virements bancaires.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsManagement;
