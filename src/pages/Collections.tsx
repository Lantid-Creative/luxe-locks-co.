import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { PageMeta } from '@/components/seo/PageMeta';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export default function Collections() {
  const { data: products } = useQuery({
    queryKey: ['products-for-collections-page'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, featured_image, name, slug')
        .eq('is_active', true)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const collectionData = [
    {
      id: 'straight',
      name: 'Straight Collection',
      description: 'Sleek, polished looks for every occasion. Our straight wigs deliver effortless elegance with silky-smooth textures.',
      image: products?.find(p => p.name.toLowerCase().includes('straight'))?.featured_image || '/placeholder.svg',
      productCount: products?.filter(p => p.name.toLowerCase().includes('straight')).length || 0,
    },
    {
      id: 'body-wave',
      name: 'Body Wave Collection',
      description: 'Luxurious waves that flow naturally. Perfect for adding volume and movement to your everyday look.',
      image: products?.find(p => p.name.toLowerCase().includes('bodywave') || p.name.toLowerCase().includes('body wave'))?.featured_image || '/placeholder.svg',
      productCount: products?.filter(p => p.name.toLowerCase().includes('bodywave') || p.name.toLowerCase().includes('body wave')).length || 0,
    },
    {
      id: 'human-hair',
      name: 'Human Hair Collection',
      description: '100% virgin human hair for ultimate luxury. Style, color, and heat-treat just like your own natural hair.',
      image: products?.[0]?.featured_image || '/placeholder.svg',
      productCount: products?.length || 0,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title="Collections | Trazzie" description="Explore our curated wig collections — lace fronts, closures, and more. Find your perfect style and express your beauty." />
      <Header />
      <CartDrawer />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: 'Collections' }]} />
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-gold text-sm font-medium tracking-wider uppercase mb-4">
              Curated For You
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl font-semibold mb-4">
              Our Collections
            </h1>
            <p className="text-muted-foreground">
              Explore our carefully curated collections, each designed to help you 
              find your perfect style and express your unique beauty.
            </p>
          </div>

          <div className="space-y-8">
            {collectionData.map((collection, index) => (
              <Link
                key={collection.id}
                to={`/shop?collection=${collection.id}`}
                className={`group grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`order-1 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden image-zoom">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className={`order-2 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="text-gold text-sm font-medium">
                    {collection.productCount} Products
                  </span>
                  <h2 className="font-serif text-3xl lg:text-4xl font-semibold mt-2 mb-4 group-hover:text-gold transition-colors">
                    {collection.name}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center text-foreground font-medium group-hover:text-gold group-hover:gap-3 transition-all">
                    Shop Collection
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
