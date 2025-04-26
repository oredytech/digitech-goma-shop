
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Message envoyé!",
        description: "Nous vous répondrons dans les plus brefs délais.",
        variant: "default",
      });
      
      // Reset form after some time to show success message
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-digitech-blue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contactez-Nous</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-200">
            Une question, un projet ou besoin d'assistance? Notre équipe est là pour vous aider.
          </p>
        </div>
      </section>
      
      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-digitech-blue">Envoyez-nous un message</h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message envoyé avec succès!</h3>
                  <p className="text-gray-600">
                    Merci de nous avoir contacté. Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+243 xxxxxxxx"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet</Label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-digitech-blue"
                        required
                      >
                        <option value="" disabled>Sélectionnez un sujet</option>
                        <option value="information">Demande d'information</option>
                        <option value="support">Support technique</option>
                        <option value="order">Question sur une commande</option>
                        <option value="partnership">Partenariat</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Comment pouvons-nous vous aider ?"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-digitech-blue hover:bg-digitech-blue/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <Send size={16} className="mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-digitech-blue">Nos coordonnées</h2>
              
              <div className="space-y-8">
                <div className="flex">
                  <div className="mr-4 bg-digitech-blue rounded-full p-3 h-min">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Adresse</h3>
                    <p className="text-gray-700">
                      DIGITECH - Avenue du Lac <br />
                      Quartier Les Volcans <br />
                      Goma, Nord-Kivu <br />
                      République Démocratique du Congo
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 bg-digitech-blue rounded-full p-3 h-min">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Téléphone</h3>
                    <p className="text-gray-700">
                      Général: <a href="tel:+243123456789" className="text-digitech-blue hover:underline">+243 123 456 789</a> <br />
                      Support: <a href="tel:+243987654321" className="text-digitech-blue hover:underline">+243 987 654 321</a> <br />
                      WhatsApp: <a href="https://wa.me/243123456789" className="text-digitech-blue hover:underline">+243 123 456 789</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 bg-digitech-blue rounded-full p-3 h-min">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Email</h3>
                    <p className="text-gray-700">
                      Général: <a href="mailto:info@digitech-goma.com" className="text-digitech-blue hover:underline">info@digitech-goma.com</a> <br />
                      Support: <a href="mailto:support@digitech-goma.com" className="text-digitech-blue hover:underline">support@digitech-goma.com</a> <br />
                      Commercial: <a href="mailto:sales@digitech-goma.com" className="text-digitech-blue hover:underline">sales@digitech-goma.com</a>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Opening Hours */}
              <div className="mt-12">
                <h3 className="font-semibold text-lg mb-4">Heures d'ouverture</h3>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-700">Lundi - Vendredi:</div>
                    <div className="font-medium">8h30 - 17h30</div>
                    
                    <div className="text-gray-700">Samedi:</div>
                    <div className="font-medium">9h00 - 16h00</div>
                    
                    <div className="text-gray-700">Dimanche:</div>
                    <div className="font-medium">Fermé</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Google Maps Embed */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="h-96 w-full rounded-lg overflow-hidden shadow-sm">
            {/* This is a placeholder for a Google Maps embed */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-gray-600">Google Maps emplacement placeholder</h3>
                <p className="text-gray-500 text-sm">Carte de Goma avec notre emplacement</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
