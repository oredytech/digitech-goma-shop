
import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-digitech-blue text-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-6 md:pr-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Trouvez la <span className="text-digitech-orange">technologie</span> qui vous 
              correspond à Goma
            </h1>
            <p className="text-gray-300 text-lg md:text-xl">
              DIGITECH vous propose une large gamme d'ordinateurs, de smartphones et d'accessoires tech de qualité, disponibles localement ou via nos partenaires.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <Link to="/shop">
                <Button 
                  className="bg-digitech-orange hover:bg-digitech-orange/90 text-white font-semibold px-6 py-6 h-auto"
                  size="lg"
                >
                  Explorer notre boutique
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/promotions">
                <Button 
                  className="bg-transparent hover:bg-white/10 border border-white text-white font-semibold px-6 py-6 h-auto"
                  variant="outline"
                  size="lg"
                >
                  Voir nos promotions
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden md:block relative h-full animate-fade-in">
            <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-gradient-to-br from-digitech-blue/30 to-digitech-orange/30 backdrop-blur">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format&fit=crop"
                alt="Tech Products"
                className="object-cover w-full h-full mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-digitech-blue/80 to-transparent"></div>
              
              {/* Overlay content */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Informatique & Électronique</h3>
                <p className="text-sm text-gray-100">
                  Les meilleurs produits tech à Goma avec livraison locale rapide
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16 py-4">
          <div className="flex items-start space-x-4">
            <div className="bg-white/10 p-3 rounded-full">
              <Truck className="h-6 w-6 text-digitech-orange" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Livraison à Goma</h3>
              <p className="text-gray-300 text-sm">
                Livraison rapide et fiable pour tous vos achats dans toute la ville de Goma
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-white/10 p-3 rounded-full">
              <ShieldCheck className="h-6 w-6 text-digitech-orange" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Produits Garantis</h3>
              <p className="text-gray-300 text-sm">
                Tous nos produits sont authentiques et bénéficient d'une garantie fabricant
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-white/10 p-3 rounded-full">
              <RefreshCw className="h-6 w-6 text-digitech-orange" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Service Après-vente</h3>
              <p className="text-gray-300 text-sm">
                Notre équipe technique est disponible pour vous accompagner et vous dépanner
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
