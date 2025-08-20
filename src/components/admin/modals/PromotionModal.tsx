import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
}

interface PromotionModalProps {
  promotion?: Promotion;
  onSuccess: () => void;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({ promotion, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'percentage' as 'percentage' | 'fixed_amount',
    value: '',
    promo_code: '',
    minimum_amount: '',
    start_date: new Date(),
    end_date: new Date(),
    is_active: true,
    usage_limit: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    if (promotion && open) {
      setFormData({
        name: promotion.name,
        description: promotion.description || '',
        type: promotion.type,
        value: promotion.value.toString(),
        promo_code: promotion.promo_code || '',
        minimum_amount: promotion.minimum_amount.toString(),
        start_date: new Date(promotion.start_date),
        end_date: new Date(promotion.end_date),
        is_active: promotion.is_active,
        usage_limit: promotion.usage_limit?.toString() || '',
      });
    } else if (!promotion && open) {
      // Reset form for new promotion
      setFormData({
        name: '',
        description: '',
        type: 'percentage',
        value: '',
        promo_code: '',
        minimum_amount: '0',
        start_date: new Date(),
        end_date: new Date(),
        is_active: true,
        usage_limit: '',
      });
    }
  }, [promotion, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const promotionData = {
        name: formData.name,
        description: formData.description || null,
        type: formData.type,
        value: parseFloat(formData.value),
        promo_code: formData.promo_code || null,
        minimum_amount: parseFloat(formData.minimum_amount) || 0,
        start_date: formData.start_date.toISOString(),
        end_date: formData.end_date.toISOString(),
        is_active: formData.is_active,
        usage_limit: formData.usage_limit ? parseInt(formData.usage_limit) : null,
      };

      let error;
      if (promotion) {
        ({ error } = await supabase
          .from('promotions')
          .update(promotionData)
          .eq('id', promotion.id));
      } else {
        ({ error } = await supabase
          .from('promotions')
          .insert([promotionData]));
      }

      if (error) throw error;

      toast({
        title: promotion ? "Promotion mise à jour" : "Promotion créée",
        description: `La promotion "${formData.name}" a été ${promotion ? 'mise à jour' : 'créée'} avec succès.`,
      });

      setOpen(false);
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {promotion ? (
          <Button variant="outline" size="sm">
            Modifier
          </Button>
        ) : (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Promotion
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {promotion ? 'Modifier la promotion' : 'Créer une nouvelle promotion'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de la promotion *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="promo_code">Code promo</Label>
              <Input
                id="promo_code"
                value={formData.promo_code}
                onChange={(e) => setFormData(prev => ({ ...prev, promo_code: e.target.value.toUpperCase() }))}
                placeholder="PROMO20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type de réduction</Label>
              <Select value={formData.type} onValueChange={(value: 'percentage' | 'fixed_amount') => 
                setFormData(prev => ({ ...prev, type: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Pourcentage (%)</SelectItem>
                  <SelectItem value="fixed_amount">Montant fixe (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">
                Valeur * {formData.type === 'percentage' ? '(%)' : '(€)'}
              </Label>
              <Input
                id="value"
                type="number"
                step="0.01"
                min="0"
                max={formData.type === 'percentage' ? '100' : undefined}
                value={formData.value}
                onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minimum_amount">Montant minimum (€)</Label>
              <Input
                id="minimum_amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.minimum_amount}
                onChange={(e) => setFormData(prev => ({ ...prev, minimum_amount: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date de début *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formData.start_date, 'PPP', { locale: fr })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.start_date}
                    onSelect={(date) => date && setFormData(prev => ({ ...prev, start_date: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Date de fin *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formData.end_date, 'PPP', { locale: fr })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.end_date}
                    onSelect={(date) => date && setFormData(prev => ({ ...prev, end_date: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="usage_limit">Limite d'utilisation</Label>
              <Input
                id="usage_limit"
                type="number"
                min="1"
                value={formData.usage_limit}
                onChange={(e) => setFormData(prev => ({ ...prev, usage_limit: e.target.value }))}
                placeholder="Illimité"
              />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="is_active">Promotion active</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Sauvegarde...' : (promotion ? 'Mettre à jour' : 'Créer')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};