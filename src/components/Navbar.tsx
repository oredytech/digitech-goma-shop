
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
    { to: '/', label: 'Accueil', icon: <Home className="mr-1" size={16} /> },
    { to: '/shop', label: 'Boutique', icon: <Store className="mr-1" size={16} /> },
    { to: '/promotions', label: 'Promotions', icon: <Percent className="mr-1" size={16} /> },
    { to: '/about', label: 'Qui sommes-nous ?', icon: <Users className="mr-1" size={16} /> },
    { to: '/contact', label: 'Contact', icon: <Phone className="mr-1" size={16} /> },
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
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <span className="text-digitech-blue text-lg sm:text-xl md:text-2xl font-bold">DIGITECH</span>
            <span className="text-digitech-orange text-xs sm:text-sm ml-1 font-medium">GOMA</span>
          </Link>

          {/* Search Bar - For Desktop and Tablet */}
          {!isMobile && (
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  className="w-full px-3 md:px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-digitech-blue text-sm"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-digitech-blue transition-colors"
                >
                  <Search size={16} className="text-gray-500" />
                </button>
              </div>
            </form>
          )}

          {/* Desktop Navigation Links */}
          {!isMobile && (
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center text-gray-600 hover:text-digitech-blue transition-colors text-sm xl:text-base whitespace-nowrap"
                >
                  {item.icon}
                  <span className="hidden xl:inline">{item.label}</span>
                  <span className="lg:inline xl:hidden">{item.label.split(' ')[0]}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Cart and Mobile Menu Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link to="/cart" className="relative p-1">
              <ShoppingCart className="text-gray-700 hover:text-digitech-orange transition-colors w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute -top-1 -right-1 bg-digitech-orange text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs font-medium">
                3
              </span>
            </Link>
            
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleMenu}
                className="p-1 sm:p-2"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search - Only shown on mobile */}
        {isMobile && (
          <form onSubmit={handleSearch} className="mt-3 sm:mt-4">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-digitech-blue text-sm"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-digitech-blue transition-colors"
              >
                <Search size={16} className="text-gray-500" />
              </button>
            </div>
          </form>
        )}

        {/* Mobile Navigation Menu */}
        {isMobile && isMenuOpen && (
          <div className="md:hidden mt-3 sm:mt-4 py-2 bg-white border-t border-gray-100 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center text-gray-600 hover:text-digitech-blue transition-colors py-2 sm:py-3 px-2 text-sm sm:text-base"
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
