import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Product } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProductsContextType {
  products: Product[];
  addProduct: (productData: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, productData: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  toggleProductVisibility: (id: string) => Promise<void>;
  loading: boolean;
  refetch: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load products from Supabase
  const loadProducts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const mappedProducts: Product[] = data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
        discountPrice: item.discount_price ? (typeof item.discount_price === 'string' ? parseFloat(item.discount_price) : item.discount_price) : undefined,
        image: item.image_url,
        category: item.category,
        inStock: item.in_stock,
        isFeatured: item.is_featured,
        isAmazonAffiliate: item.is_amazon_affiliate,
        amazonUrl: item.amazon_url
      }));
      
      setProducts(mappedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les produits",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const addProduct = useCallback(async (productData: Omit<Product, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          discount_price: productData.discountPrice,
          image_url: productData.image,
          category: productData.category,
          in_stock: productData.inStock,
          is_featured: productData.isFeatured,
          is_amazon_affiliate: productData.isAmazonAffiliate,
          amazon_url: productData.amazonUrl
        })
        .select()
        .single();

      if (error) throw error;

      const newProduct: Product = {
        id: data.id,
        name: data.name,
        description: data.description || '',
        price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
        discountPrice: data.discount_price ? (typeof data.discount_price === 'string' ? parseFloat(data.discount_price) : data.discount_price) : undefined,
        image: data.image_url,
        category: data.category,
        inStock: data.in_stock,
        isFeatured: data.is_featured,
        isAmazonAffiliate: data.is_amazon_affiliate,
        amazonUrl: data.amazon_url
      };

      setProducts(prev => [...prev, newProduct]);
      toast({
        title: "Produit ajouté",
        description: `Le produit "${productData.name}" a été ajouté avec succès.`,
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit",
        variant: "destructive"
      });
    }
  }, [toast]);

  const updateProduct = useCallback(async (id: string, productData: Omit<Product, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          discount_price: productData.discountPrice,
          image_url: productData.image,
          category: productData.category,
          in_stock: productData.inStock,
          is_featured: productData.isFeatured,
          is_amazon_affiliate: productData.isAmazonAffiliate,
          amazon_url: productData.amazonUrl
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const updatedProduct: Product = {
        id: data.id,
        name: data.name,
        description: data.description || '',
        price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
        discountPrice: data.discount_price ? (typeof data.discount_price === 'string' ? parseFloat(data.discount_price) : data.discount_price) : undefined,
        image: data.image_url,
        category: data.category,
        inStock: data.in_stock,
        isFeatured: data.is_featured,
        isAmazonAffiliate: data.is_amazon_affiliate,
        amazonUrl: data.amazon_url
      };

      setProducts(prev => prev.map(product => 
        product.id === id ? updatedProduct : product
      ));
      toast({
        title: "Produit modifié",
        description: `Le produit "${productData.name}" a été mis à jour avec succès.`,
      });
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le produit",
        variant: "destructive"
      });
    }
  }, [toast]);

  const deleteProduct = useCallback(async (id: string) => {
    const product = products.find(p => p.id === id);
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.filter(product => product.id !== id));
      toast({
        title: "Produit supprimé",
        description: `Le produit "${product?.name}" a été supprimé avec succès.`,
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le produit",
        variant: "destructive"
      });
    }
  }, [products, toast]);

  const toggleProductVisibility = useCallback(async (id: string) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    try {
      const { error } = await supabase
        .from('products')
        .update({ in_stock: !product.inStock })
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.map(product => 
        product.id === id ? { ...product, inStock: !product.inStock } : product
      ));
      toast({
        title: "Visibilité modifiée",
        description: `Le produit "${product.name}" est maintenant ${!product.inStock ? 'visible' : 'masqué'}.`,
      });
    } catch (error) {
      console.error('Error toggling product visibility:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier la visibilité",
        variant: "destructive"
      });
    }
  }, [products, toast]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductVisibility,
        loading,
        refetch: loadProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};