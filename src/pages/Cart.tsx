
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, CreditCard, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CartItem from '@/components/CartItem';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    setIsProcessing(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Commande passée avec succès !",
        description: "Merci pour votre achat. Vous recevrez un email de confirmation.",
        variant: "default",
      });
      
      clearCart();
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-digitech-blue text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Votre Panier</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    Produits ({cart.reduce((total, item) => total + item.quantity, 0)})
                  </h2>
                  <Button 
                    variant="ghost" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={clearCart}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Vider le panier
                  </Button>
                </div>
                
                {/* Cart items list */}
                <div>
                  {cart.map((item) => (
                    <CartItem 
                      key={item.product.id}
                      product={item.product}
                      quantity={item.quantity}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>
                
                <div className="mt-6">
                  <Link to="/shop">
                    <Button variant="outline" className="text-digitech-blue">
                      Continuer vos achats
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Récapitulatif de commande</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span>Calculé à la prochaine étape</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-digitech-blue hover:bg-digitech-blue/90 mt-4 py-6"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      "Traitement en cours..."
                    ) : (
                      <>
                        <CreditCard size={18} className="mr-2" />
                        Commander maintenant
                        <ArrowRight size={18} className="ml-2" />
                      </>
                    )}
                  </Button>
                  
                  <div className="mt-4 text-sm text-gray-500">
                    <p>Moyens de paiement acceptés:</p>
                    <div className="flex gap-2 mt-2">
                      <div className="border rounded px-2 py-1 text-xs">PayPal</div>
                      <div className="border rounded px-2 py-1 text-xs">M-Pesa</div>
                      <div className="border rounded px-2 py-1 text-xs">Airtel Money</div>
                      <div className="border rounded px-2 py-1 text-xs">Virement</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Votre panier est vide</h2>
            <p className="text-gray-600 mb-8">
              Vous n'avez aucun article dans votre panier actuellement.
            </p>
            <Link to="/shop">
              <Button className="bg-digitech-blue hover:bg-digitech-blue/90">
                Explorer notre boutique
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
