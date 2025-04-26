
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  product,
  quantity,
  onUpdateQuantity,
  onRemove,
}) => {
  const { id, name, price, discountPrice, image } = product;
  
  const handleIncrement = () => {
    onUpdateQuantity(id, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };
  
  const handleRemove = () => {
    onRemove(id);
  };
  
  const actualPrice = discountPrice || price;
  const totalPrice = actualPrice * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-center py-4 border-b border-gray-200">
      {/* Product image */}
      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 sm:mr-4">
        <img src={image} alt={name} className="w-full h-full object-cover rounded" />
      </div>

      {/* Product details */}
      <div className="flex-1 sm:mr-4">
        <h3 className="text-base font-medium text-gray-800">{name}</h3>
        <div className="mt-1 flex items-center">
          <span className="text-digitech-orange font-medium">
            ${discountPrice || price}
          </span>
          {discountPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${price}
            </span>
          )}
        </div>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center border border-gray-200 rounded-md mt-4 sm:mt-0 sm:mr-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDecrement}
          disabled={quantity <= 1}
          className="px-2 h-8 text-gray-600 hover:text-digitech-blue hover:bg-transparent disabled:opacity-50"
        >
          <Minus size={16} />
        </Button>

        <span className="px-4 text-center">{quantity}</span>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleIncrement}
          className="px-2 h-8 text-gray-600 hover:text-digitech-blue hover:bg-transparent"
        >
          <Plus size={16} />
        </Button>
      </div>

      {/* Total price */}
      <div className="w-24 text-right sm:mr-4 mt-4 sm:mt-0">
        <span className="font-medium">${totalPrice.toFixed(2)}</span>
      </div>

      {/* Remove button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        className="text-gray-500 hover:text-digitech-orange hover:bg-transparent mt-4 sm:mt-0"
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
