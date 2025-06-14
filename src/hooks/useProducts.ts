
import { useState, useCallback } from 'react';
import { Product, products as initialProducts } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const { toast } = useToast();

  const addProduct = useCallback((productData: Omit<Product, 'id'>) => {
    const newId = (Math.max(...products.map(p => parseInt(p.id))) + 1).toString();
    const newProduct: Product = {
      ...productData,
      id: newId,
    };
    
    setProducts(prev => [...prev, newProduct]);
    toast({
      title: "Produit ajouté",
      description: `Le produit "${productData.name}" a été ajouté avec succès.`,
    });
  }, [products, toast]);

  const updateProduct = useCallback((id: string, productData: Omit<Product, 'id'>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...productData, id } : product
    ));
    toast({
      title: "Produit modifié",
      description: `Le produit "${productData.name}" a été mis à jour avec succès.`,
    });
  }, [toast]);

  const deleteProduct = useCallback((id: string) => {
    const product = products.find(p => p.id === id);
    setProducts(prev => prev.filter(product => product.id !== id));
    toast({
      title: "Produit supprimé",
      description: `Le produit "${product?.name}" a été supprimé avec succès.`,
    });
  }, [products, toast]);

  const toggleProductVisibility = useCallback((id: string) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, inStock: !product.inStock } : product
    ));
    const product = products.find(p => p.id === id);
    toast({
      title: "Visibilité modifiée",
      description: `Le produit "${product?.name}" est maintenant ${product?.inStock ? 'masqué' : 'visible'}.`,
    });
  }, [products, toast]);

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductVisibility,
  };
};
