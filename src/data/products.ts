
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  inStock: boolean;
  isAmazonAffiliate: boolean;
  amazonUrl?: string;
  image: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Ordinateur Portable HP ProBook 450",
    description: "Ordinateur portable professionnel avec processeur Intel Core i5, 8 Go de RAM et disque SSD 256 Go. Parfait pour le travail et les études.",
    price: 850,
    category: "ordinateurs",
    inStock: true,
    isAmazonAffiliate: true,
    amazonUrl: "https://www.amazon.com/dp/B08529BZSQ",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isFeatured: true
  },
  {
    id: "2",
    name: "Smartphone Samsung Galaxy A53",
    description: "Téléphone intelligent avec écran AMOLED 6.5\", caméra 64MP, batterie 5000mAh et 128 Go de stockage.",
    price: 350,
    discountPrice: 299,
    category: "smartphones",
    inStock: true,
    isAmazonAffiliate: false,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isFeatured: true,
    isNew: true
  },
  {
    id: "3",
    name: "Souris Gaming Logitech G502",
    description: "Souris de jeu haute performance avec capteur optique HERO 25K, 11 boutons programmables et éclairage RGB.",
    price: 75,
    category: "accessoires",
    inStock: true,
    isAmazonAffiliate: true,
    amazonUrl: "https://www.amazon.com/dp/B07GBZ4Q68",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "4",
    name: "Tablette iPad Air",
    description: "iPad Air avec puce M1, écran Liquid Retina 10.9\", Touch ID et stockage de 64 Go.",
    price: 599,
    category: "tablettes",
    inStock: false,
    isAmazonAffiliate: true,
    amazonUrl: "https://www.amazon.com/dp/B09V3HN1KC",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "5",
    name: "Écran Dell 27\" FHD",
    description: "Moniteur Dell de 27 pouces avec résolution Full HD 1080p, technologie IPS et ports HDMI/DisplayPort.",
    price: 240,
    discountPrice: 199,
    category: "moniteurs",
    inStock: true,
    isAmazonAffiliate: false,
    image: "https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isFeatured: true
  },
  {
    id: "6",
    name: "Clavier Mécanique Keychron K2",
    description: "Clavier mécanique sans fil avec touches rétroéclairées, compatible Mac et Windows.",
    price: 89,
    category: "accessoires",
    inStock: true,
    isAmazonAffiliate: true,
    amazonUrl: "https://www.amazon.com/dp/B07YB32H52",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isNew: true
  },
  {
    id: "7",
    name: "Disque SSD Samsung 970 EVO 1TB",
    description: "SSD NVMe M.2 avec vitesse de lecture allant jusqu'à 3500 Mo/s et capacité de 1 To.",
    price: 110,
    category: "composants",
    inStock: true,
    isAmazonAffiliate: true,
    amazonUrl: "https://www.amazon.com/dp/B07BN4NJ2J",
    image: "https://images.unsplash.com/photo-1597838816882-4435b1977fbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "8",
    name: "Câble HDMI 4K 2m",
    description: "Câble HDMI 2.0 haute vitesse supportant la 4K à 60Hz et l'Audio Return Channel.",
    price: 12,
    category: "accessoires",
    inStock: true,
    isAmazonAffiliate: false,
    image: "https://images.unsplash.com/photo-1601737487795-dab272f52420?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

export const categories = [
  { id: "all", name: "Tous les produits" },
  { id: "ordinateurs", name: "Ordinateurs" },
  { id: "smartphones", name: "Smartphones" },
  { id: "tablettes", name: "Tablettes" },
  { id: "moniteurs", name: "Moniteurs" },
  { id: "accessoires", name: "Accessoires" },
  { id: "composants", name: "Composants" }
];
