
import React from 'react';
import ProductCard from './ProductCard';
import { products } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

const FeaturedProducts = () => {
  const featuredProducts = products.filter(product => product.isFeatured);
  const { toast } = useToast();

  const handleAddToCart = (productId: string, productName: string) => {
    // Cette fonction sera remplacée par la fonction du contexte
    toast({
      title: "Produit ajouté au panier",
      description: `${productName} a été ajouté à votre panier`,
      variant: "default",
    });
  };

  return (
    <div className="section-container">
      <h2 className="section-title text-center">Produits Vedettes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            onAddToCart={() => handleAddToCart(product.id, product.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
