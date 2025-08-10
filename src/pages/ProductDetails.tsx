
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingCart, Check, ExternalLink, MinusCircle, PlusCircle, Truck, ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useProducts } from '@/context/ProductsContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Find the product by id
  const product = products.find(p => p.id === id);
  
  // Find related products (same category, exclude current product)
  const relatedProducts = product 
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];
  
  // If product not found, navigate to 404
  useEffect(() => {
    if (!product) {
      navigate('/404');
    }
  }, [product, navigate]);
  
  if (!product) {
    return null;
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (!product.inStock || product.isAmazonAffiliate) return;
    
    setIsAddingToCart(true);
    
    // Add product to cart
    addToCart(product.id, quantity);
    
    // Show success toast
    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x ${product.name} ajouté à votre panier`,
      variant: "default",
    });
    
    // Reset quantity and loading state
    setTimeout(() => {
      setQuantity(1);
      setIsAddingToCart(false);
    }, 500);
  };
  
  const handleBuyOnAmazon = () => {
    if (product.amazonUrl) {
      window.open(product.amazonUrl, '_blank');
    }
  };
  
  const actualPrice = product.discountPrice || product.price;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-digitech-blue">Accueil</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to="/shop" className="hover:text-digitech-blue">Boutique</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-digitech-blue pl-0"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} className="mr-2" />
            Retour
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="p-6 flex items-center justify-center bg-gray-50">
              <div className="relative w-full max-w-md aspect-square rounded-md overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.discountPrice && (
                    <Badge className="bg-digitech-orange text-white">
                      -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                    </Badge>
                  )}
                  
                  {product.isNew && (
                    <Badge className="bg-digitech-green text-white">
                      Nouveau
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
              
              {/* Price */}
              <div className="mt-4 flex items-center">
                <span className="text-2xl font-bold text-digitech-blue">${actualPrice}</span>
                {product.discountPrice && (
                  <span className="ml-3 text-gray-500 text-lg line-through">${product.price}</span>
                )}
              </div>
              
              {/* Description */}
              <div className="mt-6">
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <Separator className="my-6" />
              
              {/* Stock Status */}
              <div className="flex items-center mb-6">
                {product.inStock ? (
                  <div className="flex items-center text-green-600">
                    <Check size={18} className="mr-2" />
                    <span>En stock</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <MinusCircle size={18} className="mr-2" />
                    <span>Rupture de stock</span>
                  </div>
                )}
              </div>
              
              {/* Quantity & Add to Cart */}
              {product.isAmazonAffiliate ? (
                <Button 
                  className="w-full mb-4 bg-[#FF9900] hover:bg-[#FF9900]/90 text-black font-medium flex items-center justify-center gap-2 py-6"
                  onClick={handleBuyOnAmazon}
                >
                  <ExternalLink size={18} />
                  Acheter sur Amazon
                </Button>
              ) : (
                <>
                  {product.inStock && (
                    <div className="flex items-center mb-6">
                      <span className="mr-4">Quantité:</span>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity <= 1}
                          className="h-8 w-8 rounded-full"
                        >
                          <MinusCircle size={18} />
                        </Button>
                        <span className="mx-4 w-8 text-center">{quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleQuantityChange(1)}
                          className="h-8 w-8 rounded-full"
                        >
                          <PlusCircle size={18} />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    className={`w-full mb-4 ${
                      product.inStock ? 'bg-digitech-blue hover:bg-digitech-blue/90' : 'bg-gray-300 cursor-not-allowed'
                    } text-white font-medium flex items-center justify-center gap-2 py-6`}
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAddingToCart}
                  >
                    {isAddingToCart ? (
                      "Ajouté ✓"
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        {product.inStock ? 'Ajouter au panier' : 'Indisponible'}
                      </>
                    )}
                  </Button>
                </>
              )}
              
              {/* Additional Info */}
              <div className="mt-6 space-y-4 text-sm bg-gray-50 p-4 rounded-md">
                <div className="flex items-start">
                  <Truck size={16} className="mr-2 mt-1 text-gray-600" />
                  <div>
                    <span className="block font-medium">Livraison:</span>
                    <span className="text-gray-600">Disponible à Goma uniquement</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield size={16} className="mr-2 mt-1 text-gray-600" />
                  <div>
                    <span className="block font-medium">Garantie:</span>
                    <span className="text-gray-600">1 an de garantie fabricant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(related => (
                <div key={related.id} className="bg-white rounded-lg shadow-sm overflow-hidden card-hover">
                  <Link to={`/product/${related.id}`} className="block">
                    <div className="p-4">
                      <div className="aspect-square rounded-md overflow-hidden bg-gray-100 mb-4">
                        <img
                          src={related.image}
                          alt={related.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-gray-900 line-clamp-1">{related.name}</h3>
                      <div className="mt-2">
                        <span className="font-semibold text-digitech-blue">
                          ${related.discountPrice || related.price}
                        </span>
                        {related.discountPrice && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ${related.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
