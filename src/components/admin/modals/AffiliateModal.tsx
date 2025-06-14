
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Product, categories } from '@/data/products';

const affiliateSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().min(1, "La description est requise"),
  price: z.number().min(0, "Le prix doit être positif"),
  discountPrice: z.number().optional(),
  category: z.string().min(1, "La catégorie est requise"),
  inStock: z.boolean(),
  amazonUrl: z.string().url("URL Amazon valide requise"),
  image: z.string().url("URL d'image valide requise"),
  isFeatured: z.boolean().optional(),
  isNew: z.boolean().optional(),
});

type AffiliateFormData = z.infer<typeof affiliateSchema>;

interface AffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'>) => void;
  product?: Product;
  mode: 'add' | 'edit';
}

export const AffiliateModal: React.FC<AffiliateModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
  mode,
}) => {
  const form = useForm<AffiliateFormData>({
    resolver: zodResolver(affiliateSchema),
    defaultValues: product ? {
      name: product.name,
      description: product.description,
      price: product.price,
      discountPrice: product.discountPrice,
      category: product.category,
      inStock: product.inStock,
      amazonUrl: product.amazonUrl || '',
      image: product.image,
      isFeatured: product.isFeatured || false,
      isNew: product.isNew || false,
    } : {
      name: '',
      description: '',
      price: 0,
      category: '',
      inStock: true,
      amazonUrl: '',
      image: '',
      isFeatured: false,
      isNew: false,
    },
  });

  const onSubmit = (data: AffiliateFormData) => {
    const productData: Omit<Product, 'id'> = {
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      inStock: data.inStock,
      isAmazonAffiliate: true, // Toujours true pour les affiliations Amazon
      image: data.image,
      isFeatured: data.isFeatured || false,
      isNew: data.isNew || false,
      discountPrice: data.discountPrice || undefined,
      amazonUrl: data.amazonUrl,
    };
    
    onSave(productData);
    form.reset();
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-[#FF9900]">Amazon</span>
            {mode === 'add' ? 'Nouveau lien d\'affiliation' : 'Modifier l\'affiliation'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du produit</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom du produit Amazon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.filter(cat => cat.id !== 'all').map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Description du produit Amazon" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amazonUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lien d'affiliation Amazon</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://www.amazon.com/dp/..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-gray-500">
                    Collez le lien d'affiliation Amazon complet ici
                  </p>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01"
                        placeholder="0.00" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="discountPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix promotionnel ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01"
                        placeholder="0.00" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de l'image</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/product-image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="inStock"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Actif</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Produit vedette</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isNew"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Nouveau</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Annuler
              </Button>
              <Button type="submit" className="bg-[#FF9900] hover:bg-[#FF9900]/90 text-black font-medium">
                {mode === 'add' ? 'Ajouter l\'affiliation' : 'Sauvegarder'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
