
import React, { useState } from 'react';
import { categories } from '@/data/products';
import { useProducts } from '@/context/ProductsContext';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Filter, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

const Shop = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [sortBy, setSortBy] = useState('default');
  const [stockFilter, setStockFilter] = useState('all');
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleAddToCart = (productId: string, productName: string) => {
    addToCart(productId);
    toast({
      title: "Produit ajouté au panier",
      description: `${productName} a été ajouté à votre panier`,
      variant: "default",
    });
  };
  
  // Filter products based on selected category and stock filter
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const stockMatch = stockFilter === 'all' || 
                      (stockFilter === 'inStock' && product.inStock) || 
                      (stockFilter === 'outOfStock' && !product.inStock);
    
    return categoryMatch && stockMatch;
  });
  
  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discountPrice || a.price;
    const priceB = b.discountPrice || b.price;
    
    switch (sortBy) {
      case 'price-asc':
        return priceA - priceB;
      case 'price-desc':
        return priceB - priceA;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-digitech-blue text-white py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Notre Boutique</h1>
          <p className="text-gray-300 mt-2">
            Découvrez notre sélection de produits tech de qualité
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile filter toggle */}
          {isMobile && (
            <div className="mb-4">
              <Button
                onClick={toggleFilters}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <Filter size={18} />
                {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
              </Button>
            </div>
          )}
          
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Catégories</h3>
                  <SlidersHorizontal size={18} className="text-gray-500" />
                </div>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                          selectedCategory === category.id
                            ? 'bg-digitech-blue/10 text-digitech-blue font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                        {selectedCategory === category.id && (
                          <CheckCircle2 size={16} className="text-digitech-blue" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Separator className="my-4" />
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-4">Disponibilité</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stock"
                      checked={stockFilter === 'all'}
                      onChange={() => setStockFilter('all')}
                      className="mr-2"
                    />
                    Tous les produits
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stock"
                      checked={stockFilter === 'inStock'}
                      onChange={() => setStockFilter('inStock')}
                      className="mr-2"
                    />
                    En stock
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stock"
                      checked={stockFilter === 'outOfStock'}
                      onChange={() => setStockFilter('outOfStock')}
                      className="mr-2"
                    />
                    Rupture de stock
                  </label>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="font-semibold text-lg mb-4">Trier par</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-digitech-blue"
                >
                  <option value="default">Défaut</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="name-asc">Nom (A-Z)</option>
                  <option value="name-desc">Nom (Z-A)</option>
                </select>
              </div>
            </aside>
          )}
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-700">
                {sortedProducts.length} produit{sortedProducts.length !== 1 ? 's' : ''} trouvé{sortedProducts.length !== 1 ? 's' : ''}
              </p>
              
              {/* Sort dropdown for mobile */}
              {isMobile && (
                <div className="w-40">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                  >
                    <option value="default">Trier par</option>
                    <option value="price-asc">Prix ↑</option>
                    <option value="price-desc">Prix ↓</option>
                    <option value="name-asc">Nom (A-Z)</option>
                    <option value="name-desc">Nom (Z-A)</option>
                  </select>
                </div>
              )}
            </div>
            
            {/* Products */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    onAddToCart={() => handleAddToCart(product.id, product.name)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Aucun produit ne correspond à votre recherche.
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory('all');
                    setStockFilter('all');
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
