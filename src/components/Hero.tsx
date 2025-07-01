
import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Paintbrush, Zap, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

const Hero = () => {
  const services = [
    {
      icon: <Monitor className="h-10 w-10 sm:h-12 sm:w-12 text-digitech-orange" />,
      title: "Informatique & Électronique",
      description: "Vente et réparation d'ordinateurs, smartphones et accessoires tech",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&auto=format&fit=crop"
    },
    {
      icon: <Paintbrush className="h-10 w-10 sm:h-12 sm:w-12 text-digitech-orange" />,
      title: "Services de Peinture",
      description: "Peinture intérieure et extérieure, décoration murale professionnelle",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format&fit=crop"
    },
    {
      icon: <Zap className="h-10 w-10 sm:h-12 sm:w-12 text-digitech-orange" />,
      title: "Services Électriques",
      description: "Installation électrique, maintenance et dépannage électrique",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop"
    }
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section className="bg-digitech-blue text-white py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Hero Content */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6 animate-fade-in order-2 lg:order-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight">
              Trouvez la <span className="text-digitech-orange">technologie</span> et les 
              <span className="text-digitech-orange"> services</span> qui vous correspondent à Goma
            </h1>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed">
              DIGITECH vous propose une large gamme d'ordinateurs, de smartphones, d'accessoires tech de qualité, 
              ainsi que des services de peinture et d'électricité professionnels.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link to="/shop" className="w-full sm:w-auto">
                <Button 
                  className="w-full sm:w-auto bg-digitech-orange hover:bg-digitech-orange/90 text-white font-semibold px-4 sm:px-6 py-3 sm:py-4 md:py-6 h-auto text-sm md:text-base"
                  size="lg"
                >
                  Explorer notre boutique
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button 
                  className="w-full sm:w-auto bg-transparent hover:bg-white/10 border border-white text-white font-semibold px-4 sm:px-6 py-3 sm:py-4 md:py-6 h-auto text-sm md:text-base"
                  variant="outline"
                  size="lg"
                >
                  Nos services
                </Button>
              </Link>
            </div>
          </div>

          {/* Services Carousel */}
          <div className="order-1 lg:order-2 animate-fade-in">
            <Carousel 
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {services.map((service, index) => (
                  <CarouselItem key={index}>
                    <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-gradient-to-br from-digitech-blue/30 to-digitech-orange/30 backdrop-blur">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="object-cover w-full h-full mix-blend-overlay"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-digitech-blue/80 to-transparent"></div>
                      
                      {/* Service content */}
                      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-3 sm:p-4 md:p-6">
                        <div className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-full mb-2 sm:mb-3 md:mb-4">
                          {service.icon}
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 px-2">{service.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-100 leading-relaxed px-2">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-3 md:-left-4 lg:-left-8" />
              <CarouselNext className="hidden sm:flex -right-3 md:-right-4 lg:-right-8" />
            </Carousel>
            
            {/* Mobile indicators */}
            <div className="flex justify-center mt-3 sm:mt-4 space-x-2 sm:hidden">
              {services.map((_, index) => (
                <div key={index} className="w-2 h-2 bg-white/30 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16 py-4">
          <div className="flex items-start space-x-3 md:space-x-4">
            <div className="bg-white/10 p-2 md:p-3 rounded-full flex-shrink-0">
              <Truck className="h-5 w-5 md:h-6 md:w-6 text-digitech-orange" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Livraison à Goma</h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                Livraison rapide et fiable pour tous vos achats dans toute la ville de Goma
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 md:space-x-4">
            <div className="bg-white/10 p-2 md:p-3 rounded-full flex-shrink-0">
              <ShieldCheck className="h-5 w-5 md:h-6 md:w-6 text-digitech-orange" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Services Garantis</h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                Tous nos produits et services bénéficient d'une garantie de qualité
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 md:space-x-4 sm:col-span-2 lg:col-span-1">
            <div className="bg-white/10 p-2 md:p-3 rounded-full flex-shrink-0">
              <RefreshCw className="h-5 w-5 md:h-6 md:w-6 text-digitech-orange" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Support Complet</h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                Assistance technique et conseils pour tous nos produits et services
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
