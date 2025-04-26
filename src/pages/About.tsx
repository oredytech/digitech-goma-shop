
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Award, Users, MapPin, Headphones, MessageSquare, Star } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-digitech-blue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Qui Sommes-Nous ?</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-200">
            DIGITECH est votre partenaire technologique de confiance à Goma, 
            offrant des produits et services informatiques de qualité depuis 2018.
          </p>
        </div>
      </section>
      
      {/* Company Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-digitech-blue">Notre Histoire</h2>
              <p className="text-gray-700 mb-4">
                Fondée en 2018 par deux passionnés d'informatique, DIGITECH est née de la volonté 
                d'offrir aux habitants de Goma une alternative locale de qualité pour l'achat 
                de matériel informatique et électronique.
              </p>
              <p className="text-gray-700 mb-4">
                Face aux défis d'approvisionnement en produits tech authentiques dans la région, 
                nous avons créé un écosystème fiable qui combine vente directe locale et accès 
                aux meilleures marques internationales via nos partenariats.
              </p>
              <p className="text-gray-700">
                Aujourd'hui, DIGITECH est devenue une référence à Goma, alliant expertise technique,
                service client personnalisé et engagement pour la démocratisation des technologies dans notre région.
              </p>
            </div>
            
            <div className="order-1 md:order-2 bg-white p-4 rounded-lg shadow-sm">
              <div className="rounded-lg overflow-hidden aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  alt="DIGITECH store"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-digitech-blue">
            Notre Mission & Nos Valeurs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-digitech-blue/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-digitech-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Qualité</h3>
              <p className="text-gray-700">
                Nous ne proposons que des produits authentiques et de qualité, 
                soigneusement sélectionnés pour leur fiabilité et leurs performances.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-digitech-blue/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-digitech-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Service Client</h3>
              <p className="text-gray-700">
                Nous mettons l'accent sur un service personnalisé, avec des conseils 
                adaptés à vos besoins et un support technique réactif.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-digitech-blue/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-digitech-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Développement Local</h3>
              <p className="text-gray-700">
                Nous contribuons à l'économie locale en créant des emplois et en facilitant 
                l'accès aux technologies dans notre communauté.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-digitech-blue">
            Notre Équipe
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  alt="Team member"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Joseph Kabila</h3>
                <p className="text-gray-600 text-sm">Co-fondateur & Directeur</p>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  alt="Team member"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Marie Nyota</h3>
                <p className="text-gray-600 text-sm">Co-fondatrice & Responsable Marketing</p>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  alt="Team member"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Patrick Mutombo</h3>
                <p className="text-gray-600 text-sm">Technicien Expert</p>
              </div>
            </div>
            
            {/* Team Member 4 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  alt="Team member"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Sylvie Kalunga</h3>
                <p className="text-gray-600 text-sm">Service Client</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-digitech-blue">
            Ce Que Nos Clients Disent
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "J'ai acheté mon ordinateur chez DIGITECH et je suis très satisfait
                de la qualité du service et des conseils reçus. Le personnel est compétent et très aimable."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Claude Bisimwa</h4>
                  <p className="text-gray-600 text-sm">Client depuis 2 ans</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Le service de livraison est rapide et les prix sont très compétitifs.
                J'apprécie aussi leur service après-vente quand j'ai des questions techniques."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Yvette Maroy</h4>
                  <p className="text-gray-600 text-sm">Cliente fidèle</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} className={i < 5 ? "text-yellow-400 fill-yellow-400" : "text-yellow-400"} />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "En tant que petite entreprise, nous avons pu équiper tout notre bureau grâce à DIGITECH
                qui nous a proposé des solutions adaptées à notre budget. Très professionnel !"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/67.jpg"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Jean-Paul Mugisha</h4>
                  <p className="text-gray-600 text-sm">Entrepreneur local</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-digitech-blue">
            Questions Fréquentes
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Où se situe votre boutique physique ?</h3>
                <p className="text-gray-700">
                  Notre boutique est située sur l'Avenue du Lac, au centre-ville de Goma, 
                  République Démocratique du Congo.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Proposez-vous des services de réparation ?</h3>
                <p className="text-gray-700">
                  Oui, nous proposons des services de réparation pour ordinateurs, smartphones et autres 
                  appareils électroniques, effectués par nos techniciens qualifiés.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Comment fonctionne la garantie sur vos produits ?</h3>
                <p className="text-gray-700">
                  Tous nos produits bénéficient de la garantie fabricant standard, généralement 
                  de 12 mois. Nous assurons le suivi et la gestion des retours si nécessaire.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Livrez-vous en dehors de Goma ?</h3>
                <p className="text-gray-700">
                  Actuellement, notre service de livraison est disponible uniquement 
                  dans la ville de Goma. Pour les clients situés ailleurs, nous proposons 
                  des produits via nos partenaires comme Amazon.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Acceptez-vous les retours de produits ?</h3>
                <p className="text-gray-700">
                  Oui, nous acceptons les retours de produits non utilisés dans leur emballage 
                  d'origine sous 7 jours après l'achat. Des conditions spécifiques s'appliquent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-digitech-blue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à nous contacter ?</h2>
          <p className="max-w-2xl mx-auto text-gray-300 mb-8">
            Notre équipe est disponible pour répondre à toutes vos questions
            et vous accompagner dans vos projets technologiques.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-white text-digitech-blue hover:bg-gray-100 px-8 py-6 h-auto">
                <MessageSquare size={18} className="mr-2" />
                Nous contacter
              </Button>
            </Link>
            <Link to="/shop">
              <Button className="bg-digitech-orange hover:bg-digitech-orange/90 text-white px-8 py-6 h-auto">
                <Headphones size={18} className="mr-2" />
                Support technique
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
