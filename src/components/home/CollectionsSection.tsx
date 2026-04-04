import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function CollectionsSection() {
  const { data: products } = useQuery({
    queryKey: ['products-for-collections'],
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

  // Map each collection to the correct product image by matching product name keywords
  const collectionData = [
    {
      id: 'straight',
      name: 'Straight Collection',
      description: 'Sleek, polished looks for every occasion',
      slug: 'straight',
      image: products?.find(p => p.name.toLowerCase().includes('straight'))?.featured_image || '/placeholder.svg',
    },
    {
      id: 'bodywave-24',
      name: 'Body Wave 24"',
      description: 'Long, luxurious waves for maximum glamour',
      slug: 'body-wave',
      image: products?.find(p => p.name.toLowerCase().includes('24'))?.featured_image || '/placeholder.svg',
    },
    {
      id: 'bodywave-16',
      name: 'Body Wave 16"',
      description: 'Effortless everyday elegance',
      slug: 'body-wave',
      image: products?.find(p => p.name.toLowerCase().includes('16'))?.featured_image || '/placeholder.svg',
    },
    {
      id: 'all',
      name: 'Shop All',
      description: 'Browse our full range of luxury wigs',
      slug: 'all',
      image: products?.[0]?.featured_image || '/placeholder.svg',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-gold text-sm font-medium tracking-wider uppercase mb-3">
            Curated For You
          </p>
          <h2 className="font-serif text-3xl lg:text-5xl font-semibold mb-4">
            Shop by Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated collections designed to match every style and occasion
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collectionData.map((collection, index) => (
            <Link
              key={collection.id}
              to={collection.slug === 'all' ? '/shop' : `/shop?collection=${collection.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={getImage(index)}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="font-serif text-xl lg:text-2xl font-semibold text-primary-foreground mb-2">
                  {collection.name}
                </h3>
                <p className="text-primary-foreground/70 text-sm mb-4">
                  {collection.description}
                </p>
                <span className="inline-flex items-center text-gold text-sm font-medium group-hover:gap-2 transition-all">
                  Shop Now
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
