
import React, { useState } from 'react';
import { Settings, Save, Globe, Palette, Bell, CreditCard, Truck, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const SiteSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: 'DIGITECH',
    siteDescription: 'Votre boutique tech de confiance',
    email: 'contact@digitech.com',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de la Tech, 75001 Paris',
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    stockAlerts: true,
    promotionalEmails: true,
    freeShippingThreshold: 50,
    currency: 'EUR',
    taxRate: 20,
    maintenanceMode: false,
  });

  const handleSave = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Les paramètres du site ont été mis à jour avec succès.",
    });
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Paramètres du Site</h1>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Sauvegarder
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Général
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="commerce" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Commerce
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Apparence
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>Configuration de base de votre site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nom du site</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange('siteName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email de contact</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange('email', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Description du site</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleSettingChange('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => handleSettingChange('address', e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                />
                <Label htmlFor="maintenanceMode">Mode maintenance</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notifications</CardTitle>
              <CardDescription>Gérez les notifications automatiques</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">Recevoir les notifications par email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications SMS</Label>
                  <p className="text-sm text-muted-foreground">Recevoir les notifications par SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications de commandes</Label>
                  <p className="text-sm text-muted-foreground">Alertes pour les nouvelles commandes</p>
                </div>
                <Switch
                  checked={settings.orderNotifications}
                  onCheckedChange={(checked) => handleSettingChange('orderNotifications', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertes de stock</Label>
                  <p className="text-sm text-muted-foreground">Alertes quand le stock est bas</p>
                </div>
                <Switch
                  checked={settings.stockAlerts}
                  onCheckedChange={(checked) => handleSettingChange('stockAlerts', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Emails promotionnels</Label>
                  <p className="text-sm text-muted-foreground">Envoyer des emails marketing</p>
                </div>
                <Switch
                  checked={settings.promotionalEmails}
                  onCheckedChange={(checked) => handleSettingChange('promotionalEmails', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commerce" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de commerce</CardTitle>
              <CardDescription>Configuration des ventes et des livraisons</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="freeShippingThreshold">Seuil livraison gratuite (€)</Label>
                  <Input
                    id="freeShippingThreshold"
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) => handleSettingChange('freeShippingThreshold', parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Devise</Label>
                  <Input
                    id="currency"
                    value={settings.currency}
                    onChange={(e) => handleSettingChange('currency', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Taux de TVA (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => handleSettingChange('taxRate', parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Moyens de paiement</CardTitle>
              <CardDescription>Configurez les options de paiement acceptées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="paypal" defaultChecked />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="stripe" defaultChecked />
                  <Label htmlFor="stripe">Carte bancaire</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="virement" />
                  <Label htmlFor="virement">Virement bancaire</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="cash" />
                  <Label htmlFor="cash">Paiement à la livraison</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personnalisation de l'apparence</CardTitle>
              <CardDescription>Configurez l'aspect visuel de votre site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Couleur principale</Label>
                  <div className="flex space-x-2">
                    <div className="w-10 h-10 bg-digitech-blue rounded border-2 border-gray-300"></div>
                    <Input type="color" defaultValue="#1f2937" className="w-20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Couleur secondaire</Label>
                  <div className="flex space-x-2">
                    <div className="w-10 h-10 bg-digitech-orange rounded border-2 border-gray-300"></div>
                    <Input type="color" defaultValue="#f97316" className="w-20" />
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Logo du site</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <p className="text-sm text-gray-500">Glissez-déposez votre logo ici ou cliquez pour parcourir</p>
                    <Button variant="outline" className="mt-2">Choisir un fichier</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettings;
