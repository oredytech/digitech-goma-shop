
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Home, Store, Percent, Users, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { to: '/', label: 'Accueil', icon: <Home className="mr-1" size={18} /> },
    { to: '/shop', label: 'Boutique', icon: <Store className="mr-1" size={18} /> },
    { to: '/promotions', label: 'Promotions', icon: <Percent className="mr-1" size={18} /> },
    { to: '/about', label: 'Qui sommes-nous ?', icon: <Users className="mr-1" size={18} /> },
    { to: '/contact', label: 'Contact', icon: <Phone className="mr-1" size={18} /> },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log(`Recherche pour: ${searchQuery}`);
      // Logique de recherche à implémenter
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-digitech-blue text-xl font-bold">DIGITECH</span>
            <span className="text-digitech-orange text-sm ml-1 font-medium">GOMA</span>
          </Link>

          {/* Search Bar - For Desktop Only */}
          {!isMobile && (
            <form onSubmit={handleSearch} className="hidden md:flex w-1/3">
              <div className="relative w-full">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-digitech-blue"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Search size={18} className="text-gray-500" />
                </button>
              </div>
            </form>
          )}

          {/* Desktop Navigation Links */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center text-gray-600 hover:text-digitech-blue transition-colors"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Cart and Mobile Menu Icons */}
          <div className="flex items-center">
            <Link to="/cart" className="mr-4 relative">
              <ShoppingCart className="text-gray-700 hover:text-digitech-orange transition-colors" />
              <span className="absolute -top-2 -right-2 bg-digitech-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>
            
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleMenu}
                className="p-1"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search - Only shown on mobile */}
        {isMobile && (
          <form onSubmit={handleSearch} className="mt-4">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-digitech-blue"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Search size={18} className="text-gray-500" />
              </button>
            </div>
          </form>
        )}

        {/* Mobile Navigation Menu */}
        {isMobile && isMenuOpen && (
          <div className="md:hidden mt-4 py-2 bg-white border-t border-gray-100 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center text-gray-600 hover:text-digitech-blue transition-colors py-3 px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
