import React from 'react';
import { ProductsProvider } from './ProductsContext';
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
};