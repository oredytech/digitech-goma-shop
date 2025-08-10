import React from 'react';
import { ProductsProvider } from './ProductsContext';
import { CartProvider } from './CartContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProductsProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </ProductsProvider>
  );
};