
import React, { useState, useEffect } from 'react';
import { Percent, Eye, EyeOff, Trash2, TrendingUp, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { PromotionModal } from './modals/PromotionModal';
import { GenericDeleteModal } from './modals/GenericDeleteModal';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Promotion {
  id: string;
  name: string;
  description?: string;
  type: 'percentage' | 'fixed_amount';
  value: number;
  promo_code?: string;
  minimum_amount: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  usage_limit?: number;
  usage_count: number;
  created_at: string;
}

const PromotionsManagement = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    upcoming: 0,
  });
  const { toast } = useToast();

  const fetchPromotions = async () => {
    try {
      const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPromotions(data as Promotion[] || []);
      
      // Calculate stats
      const now = new Date();
      const total = data?.length || 0;
      const active = data?.filter(p => 
        p.is_active && 
        new Date(p.start_date) <= now && 
        new Date(p.end_date) >= now
      ).length || 0;
      const expired = data?.filter(p => new Date(p.end_date) < now).length || 0;
      const upcoming = data?.filter(p => new Date(p.start_date) > now).length || 0;

      setStats({ total, active, expired, upcoming });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les promotions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const togglePromotionStatus = async (promotion: Promotion) => {
    try {
      const { error } = await supabase
        .from('promotions')
        .update({ is_active: !promotion.is_active })
        .eq('id', promotion.id);

      if (error) throw error;

      toast({
        title: promotion.is_active ? "Promotion désactivée" : "Promotion activée",
        description: `La promotion "${promotion.name}" a été ${promotion.is_active ? 'désactivée' : 'activée'}.`,
      });

      fetchPromotions();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut de la promotion.",
        variant: "destructive",
      });
    }
  };

  const deletePromotion = async (promotionId: string) => {
    try {
      const { error } = await supabase
        .from('promotions')
        .delete()
        .eq('id', promotionId);

      if (error) throw error;

      toast({
        title: "Promotion supprimée",
        description: "La promotion a été supprimée avec succès.",
      });

      fetchPromotions();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la promotion.",
        variant: "destructive",
      });
    }
  };

  const getPromotionStatus = (promotion: Promotion) => {
    const now = new Date();
    const startDate = new Date(promotion.start_date);
    const endDate = new Date(promotion.end_date);

    if (!promotion.is_active) {
      return { label: 'Inactive', variant: 'secondary' as const };
    } else if (endDate < now) {
      return { label: 'Expirée', variant: 'destructive' as const };
    } else if (startDate > now) {
      return { label: 'À venir', variant: 'outline' as const };
    } else {
      return { label: 'Active', variant: 'default' as const };
    }
  };

  const formatValue = (type: string, value: number) => {
    return type === 'percentage' ? `${value}%` : `${value}€`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestion des Promotions</h1>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-lg"></div>
            ))}
          </div>
          <div className="h-96 bg-muted rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion des Promotions</h1>
        <PromotionModal onSuccess={fetchPromotions} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Promotions créées</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actives</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-xs text-muted-foreground">En cours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">À venir</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.upcoming}</div>
            <p className="text-xs text-muted-foreground">Programmées</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expirées</CardTitle>
            <Users className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
            <p className="text-xs text-muted-foreground">Terminées</p>
          </CardContent>
        </Card>
      </div>

      {/* Promotions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Promotions</CardTitle>
          <CardDescription>
            Gérez vos promotions et suivez leurs performances.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {promotions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Percent className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground mb-4">
                Aucune promotion créée pour le moment.
              </p>
              <PromotionModal onSuccess={fetchPromotions} />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Réduction</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Utilisation</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promotions.map((promotion) => {
                  const status = getPromotionStatus(promotion);
                  return (
                    <TableRow key={promotion.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{promotion.name}</div>
                          {promotion.description && (
                            <div className="text-sm text-muted-foreground">
                              {promotion.description}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {promotion.promo_code ? (
                          <Badge variant="outline">{promotion.promo_code}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {formatValue(promotion.type, promotion.value)}
                        </div>
                        {promotion.minimum_amount > 0 && (
                          <div className="text-sm text-muted-foreground">
                            Min. {promotion.minimum_amount}€
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Du {format(new Date(promotion.start_date), 'dd/MM/yyyy', { locale: fr })}</div>
                          <div>Au {format(new Date(promotion.end_date), 'dd/MM/yyyy', { locale: fr })}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{promotion.usage_count} utilisations</div>
                          {promotion.usage_limit && (
                            <div className="text-muted-foreground">
                              / {promotion.usage_limit} max
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <PromotionModal promotion={promotion} onSuccess={fetchPromotions} />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePromotionStatus(promotion)}
                          >
                            {promotion.is_active ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <GenericDeleteModal
                            title="Supprimer la promotion"
                            description={`Êtes-vous sûr de vouloir supprimer la promotion "${promotion.name}" ? Cette action est irréversible.`}
                            onConfirm={() => deletePromotion(promotion.id)}
                            trigger={
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            }
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionsManagement;
