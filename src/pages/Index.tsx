
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import { ShoppingBag, ThumbsUp, Award, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';

const Index = () => {
  const newProducts = products.filter(product => product.isNew).slice(0, 4);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <FeaturedProducts />
      
      {/* New Arrivals Section */}
      <section className="bg-gray-50 py-12">
        <div className="section-container">
          <h2 className="section-title text-center">Nouveaux Arrivages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <div key={product.id} className="bg-white shadow-sm rounded-lg p-4 flex flex-col items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-contain mb-4"
                />
                <h3 className="font-medium text-center line-clamp-1">{product.name}</h3>
                <p className="text-digitech-orange font-semibold mt-1">
                  ${product.discountPrice || product.price}
                </p>
                <Link to={`/product/${product.id}`} className="mt-2 w-full">
                  <Button className="w-full" variant="outline">
                    Voir détails
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/shop">
              <Button className="bg-digitech-blue hover:bg-digitech-blue/90">
                Voir tous les produits
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="section-container">
        <h2 className="section-title text-center">Pourquoi Choisir DIGITECH?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="bg-digitech-blue/10 p-4 rounded-full mb-4">
              <ShoppingBag className="h-8 w-8 text-digitech-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Produits Authentiques</h3>
            <p className="text-gray-600">
              Tous nos produits sont garantis 100% authentiques et de qualité supérieure
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="bg-digitech-blue/10 p-4 rounded-full mb-4">
              <ThumbsUp className="h-8 w-8 text-digitech-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Service Local</h3>
            <p className="text-gray-600">
              Une entreprise locale qui comprend les besoins spécifiques des clients de Goma
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="bg-digitech-blue/10 p-4 rounded-full mb-4">
              <Award className="h-8 w-8 text-digitech-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Qualité Garantie</h3>
            <p className="text-gray-600">
              Des produits soigneusement sélectionnés pour leur fiabilité et performance
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="bg-digitech-blue/10 p-4 rounded-full mb-4">
              <UserCheck className="h-8 w-8 text-digitech-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Support Personnalisé</h3>
            <p className="text-gray-600">
              Assistance technique et conseils personnalisés pour tous vos achats
            </p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-digitech-blue text-white py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à découvrir nos produits?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Visitez notre boutique ou contactez-nous pour toute demande spécifique
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/shop">
              <Button className="bg-digitech-orange hover:bg-digitech-orange/90 text-white px-8 py-6 h-auto font-semibold">
                Explorer la boutique
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-transparent border border-white hover:bg-white/10 text-white px-8 py-6 h-auto font-semibold">
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
