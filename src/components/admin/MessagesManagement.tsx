
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MessagesManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Messagerie</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Messages</CardTitle>
          <CardDescription>Cette section sera implémentée prochainement.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-center text-gray-500">
              Ici vous pourrez gérer les messages reçus depuis le formulaire de contact,
              répondre aux clients et consulter l'historique des conversations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesManagement;
