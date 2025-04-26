
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const {
    id,
    name,
    price,
    discountPrice,
    image,
    inStock,
    isAmazonAffiliate,
    amazonUrl,
    isNew
  } = product;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToCart && inStock && !isAmazonAffiliate) {
      onAddToCart();
    }
  };

  const handleBuyOnAmazon = (e: React.MouseEvent) => {
    e.preventDefault();
    if (amazonUrl) {
      window.open(amazonUrl, '_blank');
    }
  };

  return (
    <Link to={`/product/${id}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {/* Product Image */}
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {discountPrice && (
              <Badge className="bg-digitech-orange text-white">
                -{Math.round(((price - discountPrice) / price) * 100)}%
              </Badge>
            )}
            
            {isNew && (
              <Badge className="bg-digitech-green text-white">
                Nouveau
              </Badge>
            )}
            
            {!inStock && (
              <Badge variant="outline" className="bg-white/90 text-gray-700">
                Rupture de stock
              </Badge>
            )}
          </div>
        </div>

        <div className="p-4">
          {/* Product Name */}
          <h3 className="text-gray-800 font-medium mb-2 line-clamp-1 group-hover:text-digitech-blue">
            {name}
          </h3>
          
          {/* Price */}
          <div className="flex items-center mb-3">
            {discountPrice ? (
              <>
                <span className="text-digitech-orange font-semibold mr-2">${discountPrice}</span>
                <span className="text-gray-500 text-sm line-through">${price}</span>
              </>
            ) : (
              <span className="text-gray-800 font-semibold">${price}</span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="mt-auto">
            {isAmazonAffiliate ? (
              <Button 
                className="w-full bg-[#FF9900] hover:bg-[#FF9900]/90 text-black font-medium flex items-center justify-center gap-2"
                onClick={handleBuyOnAmazon}
              >
                <ExternalLink size={16} />
                Acheter sur Amazon
              </Button>
            ) : (
              <Button
                className={`w-full ${
                  inStock ? 'bg-digitech-blue hover:bg-digitech-blue/90' : 'bg-gray-300 cursor-not-allowed'
                } text-white font-medium flex items-center justify-center gap-2`}
                onClick={handleAddToCart}
                disabled={!inStock}
              >
                <ShoppingCart size={16} />
                {inStock ? 'Ajouter au panier' : 'Indisponible'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
