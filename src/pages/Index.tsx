
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import { ShoppingBag, ThumbsUp, Award, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/context/ProductsContext';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { products } = useProducts();
  const { isAdmin } = useAuth();
  const newProducts = products.filter(product => product.isNew).slice(0, 4);
  
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <Hero />
      
      {/* Admin Access Banner */}
      {isAdmin && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="container mx-auto px-4 py-3 text-center">
            <p className="text-blue-800 text-sm mb-2">Accès Administrateur Disponible</p>
            <Link to="/admin">
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                Accéder au Tableau de Bord
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Featured Products Section */}
      <FeaturedProducts />
      
      {/* New Arrivals Section */}
      <section className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-digitech-blue mb-4 md:mb-6 text-center">
            Nouveaux Arrivages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {newProducts.map((product) => (
              <div key={product.id} className="bg-white shadow-sm rounded-lg p-3 md:p-4 flex flex-col items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 md:w-24 md:h-24 object-contain mb-3 md:mb-4"
                />
                <h3 className="font-medium text-center line-clamp-2 text-sm md:text-base mb-1 md:mb-2 px-1">
                  {product.name}
                </h3>
                <p className="text-digitech-orange font-semibold text-sm md:text-base">
                  ${product.discountPrice || product.price}
                </p>
                <Link to={`/product/${product.id}`} className="mt-2 w-full">
                  <Button className="w-full text-xs md:text-sm py-2" variant="outline">
                    Voir détails
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6 md:mt-8 text-center">
            <Link to="/shop">
              <Button className="bg-digitech-blue hover:bg-digitech-blue/90 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base">
                Voir tous les produits
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-digitech-blue mb-6 md:mb-8 text-center">
            Pourquoi Choisir DIGITECH?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            <div className="flex flex-col items-center text-center p-4 md:p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-digitech-blue/10 p-3 md:p-4 rounded-full mb-3 md:mb-4">
                <ShoppingBag className="h-6 w-6 md:h-8 md:w-8 text-digitech-blue" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Produits Authentiques</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Tous nos produits sont garantis 100% authentiques et de qualité supérieure
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 md:p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-digitech-blue/10 p-3 md:p-4 rounded-full mb-3 md:mb-4">
                <ThumbsUp className="h-6 w-6 md:h-8 md:w-8 text-digitech-blue" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Service Local</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Une entreprise locale qui comprend les besoins spécifiques des clients de Goma
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 md:p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-digitech-blue/10 p-3 md:p-4 rounded-full mb-3 md:mb-4">
                <Award className="h-6 w-6 md:h-8 md:w-8 text-digitech-blue" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Qualité Garantie</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Des produits et services soigneusement sélectionnés pour leur fiabilité
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 md:p-6 bg-white rounded-lg shadow-sm md:col-span-2 xl:col-span-1">
              <div className="bg-digitech-blue/10 p-3 md:p-4 rounded-full mb-3 md:mb-4">
                <UserCheck className="h-6 w-6 md:h-8 md:w-8 text-digitech-blue" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Support Personnalisé</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Assistance technique et conseils personnalisés pour tous vos besoins
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-digitech-blue text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
            Prêt à découvrir nos produits et services?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
            Visitez notre boutique ou contactez-nous pour toute demande spécifique
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 max-w-md mx-auto">
            <Link to="/shop" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-digitech-orange hover:bg-digitech-orange/90 text-white px-6 md:px-8 py-4 md:py-6 h-auto font-semibold text-sm md:text-base">
                Explorer la boutique
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-transparent border border-white hover:bg-white/10 text-white px-6 md:px-8 py-4 md:py-6 h-auto font-semibold text-sm md:text-base">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
