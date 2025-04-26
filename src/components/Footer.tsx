import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-digitech-blue text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-white text-xl font-bold">DIGITECH</span>
              <span className="text-digitech-orange text-sm ml-1 font-medium">GOMA</span>
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              Votre partenaire tech à Goma, offrant le meilleur des ordinateurs, accessoires et équipements électriques.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-white transition-colors">
                  Boutique
                </Link>
              </li>
              <li>
                <Link to="/promotions" className="text-gray-300 hover:text-white transition-colors">
                  Promotions
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  Qui sommes-nous ?
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@digitech-goma.com" className="text-gray-300 hover:text-white transition-colors">
                  info@digitech-goma.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:+243123456789" className="text-gray-300 hover:text-white transition-colors">
                  +243 123 456 789
                </a>
              </li>
              <li className="mt-2 text-gray-300">
                Avenue du Lac, Goma<br />
                République Démocratique du Congo
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Inscrivez-vous pour recevoir nos dernières offres et nouvelles.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-2 text-sm text-black rounded-l-md focus:outline-none w-full"
              />
              <button 
                type="submit"
                className="bg-digitech-orange hover:bg-opacity-90 text-white px-4 py-2 rounded-r-md"
              >
                OK
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} DIGITECH GOMA. Tous droits réservés.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Conditions générales
            </Link>
          </div>
          <div className="text-gray-400 text-sm mt-2 md:mt-0">
            Conçu par <a href="https://oredytech.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Oredy Technologies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
