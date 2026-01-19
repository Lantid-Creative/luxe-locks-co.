export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  hairType: 'Human Hair' | 'Synthetic';
  laceType: string;
  length: string;
  density: string;
  capSize: string[];
  colors: string[];
  description: string;
  careInstructions: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  bestseller?: boolean;
  new?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  productName: string;
  verified: boolean;
}

export const collections: Collection[] = [
  {
    id: 'lace-wigs',
    name: 'Lace Front Wigs',
    description: 'Seamless, natural-looking hairlines',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
    productCount: 48,
  },
  {
    id: 'closure-wigs',
    name: 'Closure Wigs',
    description: 'Full coverage with realistic partings',
    image: 'https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=800&q=80',
    productCount: 36,
  },
  {
    id: 'frontals',
    name: 'Frontals & Bundles',
    description: 'Premium quality bundles for versatile styling',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80',
    productCount: 24,
  },
  {
    id: 'human-hair',
    name: 'Human Hair Collection',
    description: '100% virgin human hair for ultimate luxury',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80',
    productCount: 52,
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Brazilian Body Wave Lace Front Wig',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
      'https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=800&q=80',
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80',
    ],
    category: 'lace-wigs',
    hairType: 'Human Hair',
    laceType: '13x4 HD Lace',
    length: '22"',
    density: '180%',
    capSize: ['Small', 'Medium', 'Large'],
    colors: ['Natural Black', 'Dark Brown', 'Honey Blonde'],
    description: 'Experience luxury with our Brazilian Body Wave Lace Front Wig. Crafted from 100% virgin human hair, this wig features an undetectable HD lace front for a flawless, natural-looking hairline.',
    careInstructions: [
      'Wash with sulfate-free shampoo',
      'Deep condition weekly',
      'Air dry or use low heat',
      'Store on a wig stand',
      'Detangle gently from ends to roots',
    ],
    rating: 4.9,
    reviews: 127,
    inStock: true,
    bestseller: true,
  },
  {
    id: '2',
    name: 'Silky Straight Closure Wig',
    price: 249,
    image: 'https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=800&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
    ],
    category: 'closure-wigs',
    hairType: 'Human Hair',
    laceType: '4x4 Closure',
    length: '20"',
    density: '150%',
    capSize: ['Small', 'Medium', 'Large'],
    colors: ['Jet Black', 'Natural Black', 'Dark Brown'],
    description: 'Sleek and sophisticated, our Silky Straight Closure Wig delivers effortless elegance. The 4x4 closure provides a natural part while protecting your natural hair.',
    careInstructions: [
      'Wash with sulfate-free shampoo',
      'Apply heat protectant before styling',
      'Use silk pillowcase while sleeping',
      'Store on a wig stand',
    ],
    rating: 4.8,
    reviews: 89,
    inStock: true,
    new: true,
  },
  {
    id: '3',
    name: 'Deep Wave Frontal Wig',
    price: 349,
    originalPrice: 449,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80',
    ],
    category: 'frontals',
    hairType: 'Human Hair',
    laceType: '13x6 Frontal',
    length: '26"',
    density: '200%',
    capSize: ['Medium', 'Large'],
    colors: ['Natural Black', 'Burgundy', 'Ombre'],
    description: 'Make a statement with our luxurious Deep Wave Frontal Wig. The 13x6 frontal offers maximum styling versatility with gorgeous, bouncy curls.',
    careInstructions: [
      'Co-wash between washes',
      'Apply curl cream for definition',
      'Air dry for best results',
      'Use satin bonnet at night',
    ],
    rating: 4.9,
    reviews: 156,
    inStock: true,
    bestseller: true,
  },
  {
    id: '4',
    name: 'Kinky Straight Bob Wig',
    price: 189,
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80',
    ],
    category: 'human-hair',
    hairType: 'Human Hair',
    laceType: '4x4 Closure',
    length: '12"',
    density: '150%',
    capSize: ['Small', 'Medium'],
    colors: ['Natural Black', 'Off Black'],
    description: 'Chic and low-maintenance, our Kinky Straight Bob Wig perfectly mimics relaxed natural hair texture. Ideal for a professional yet stylish look.',
    careInstructions: [
      'Moisturize regularly',
      'Use wide-tooth comb',
      'Wrap at night',
    ],
    rating: 4.7,
    reviews: 64,
    inStock: true,
    new: true,
  },
  {
    id: '5',
    name: 'Honey Blonde Highlight Wig',
    price: 329,
    image: 'https://images.unsplash.com/photo-1605980776566-0486c3b394f2?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1605980776566-0486c3b394f2?w=800&q=80',
    ],
    category: 'lace-wigs',
    hairType: 'Human Hair',
    laceType: '13x4 HD Lace',
    length: '24"',
    density: '180%',
    capSize: ['Small', 'Medium', 'Large'],
    colors: ['Honey Blonde Highlight'],
    description: 'Turn heads with our stunning Honey Blonde Highlight Wig. Beautiful blonde tones woven through dark roots create a dimensional, sun-kissed look.',
    careInstructions: [
      'Use purple shampoo to maintain tone',
      'Deep condition bi-weekly',
      'Avoid chlorine and salt water',
    ],
    rating: 4.8,
    reviews: 98,
    inStock: true,
    bestseller: true,
  },
  {
    id: '6',
    name: 'Water Wave Synthetic Wig',
    price: 79,
    originalPrice: 99,
    image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80',
    ],
    category: 'closure-wigs',
    hairType: 'Synthetic',
    laceType: '4x4 Closure',
    length: '18"',
    density: '130%',
    capSize: ['Medium'],
    colors: ['Black', 'Dark Brown', 'Burgundy'],
    description: 'Affordable luxury meets style with our Water Wave Synthetic Wig. Heat-resistant fibers allow for versatile styling while maintaining beautiful waves.',
    careInstructions: [
      'Wash in cold water only',
      'Do not use heat above 300°F',
      'Use synthetic-safe products',
    ],
    rating: 4.5,
    reviews: 234,
    inStock: true,
  },
  {
    id: '7',
    name: 'Loose Deep Wave Wig',
    price: 279,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    ],
    category: 'human-hair',
    hairType: 'Human Hair',
    laceType: '5x5 Closure',
    length: '22"',
    density: '180%',
    capSize: ['Small', 'Medium', 'Large'],
    colors: ['Natural Black', 'Dark Brown'],
    description: 'Romantic and glamorous, our Loose Deep Wave Wig features cascading curls that are perfect for any occasion.',
    careInstructions: [
      'Finger detangle before washing',
      'Apply leave-in conditioner',
      'Refresh curls with water and oil',
    ],
    rating: 4.9,
    reviews: 112,
    inStock: true,
  },
  {
    id: '8',
    name: 'Colored 99J Burgundy Wig',
    price: 269,
    image: 'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=800&q=80',
    ],
    category: 'lace-wigs',
    hairType: 'Human Hair',
    laceType: '13x4 HD Lace',
    length: '20"',
    density: '180%',
    capSize: ['Medium', 'Large'],
    colors: ['99J Burgundy'],
    description: 'Bold and beautiful, our 99J Burgundy Wig offers rich, wine-inspired color that commands attention.',
    careInstructions: [
      'Use color-safe shampoo',
      'Minimize heat styling',
      'Apply UV protectant',
    ],
    rating: 4.7,
    reviews: 76,
    inStock: true,
    new: true,
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    author: 'Michelle T.',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&q=80',
    rating: 5,
    date: '2 weeks ago',
    content: 'This wig is absolutely stunning! The hair quality is amazing and it looks so natural. I\'ve received so many compliments. Will definitely be ordering again!',
    productName: 'Brazilian Body Wave Lace Front Wig',
    verified: true,
  },
  {
    id: '2',
    author: 'Jasmine K.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    rating: 5,
    date: '1 month ago',
    content: 'I\'ve tried many wig brands and this is by far the best! The lace melted perfectly and the hair is so soft. Worth every penny.',
    productName: 'Deep Wave Frontal Wig',
    verified: true,
  },
  {
    id: '3',
    author: 'Aisha R.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80',
    rating: 5,
    date: '3 weeks ago',
    content: 'The shipping was fast and the wig came beautifully packaged. It\'s my go-to for special occasions now. Absolutely love it!',
    productName: 'Silky Straight Closure Wig',
    verified: true,
  },
  {
    id: '4',
    author: 'Taylor M.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    rating: 5,
    date: '1 week ago',
    content: 'Exceeded my expectations! The density is perfect and it looks so natural. Customer service was also incredibly helpful.',
    productName: 'Honey Blonde Highlight Wig',
    verified: true,
  },
];

export const instagramPosts = [
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
  'https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=400&q=80',
  'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&q=80',
  'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&q=80',
  'https://images.unsplash.com/photo-1605980776566-0486c3b394f2?w=400&q=80',
  'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&q=80',
];
