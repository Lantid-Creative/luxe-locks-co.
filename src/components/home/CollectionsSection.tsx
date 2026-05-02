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
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-14">
          <div>
            <p className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Curated For You
            </p>
            <h2 className="font-serif text-3xl lg:text-5xl font-semibold leading-tight">
              Shop by Collection
            </h2>
          </div>
          <Link to="/shop" className="text-sm font-medium text-primary hover:text-gold transition-colors flex items-center gap-1 group">
            View All
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Collections Grid — featured first item large */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {collectionData.map((collection, index) => (
            <Link
              key={collection.id}
              to={collection.slug === 'all' ? '/shop' : `/shop?collection=${collection.slug}`}
              className={`group relative overflow-hidden rounded-2xl card-hover ${index === 0 ? 'md:col-span-2 md:row-span-2 aspect-square' : 'aspect-[3/4]'}`}
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="font-serif text-xl lg:text-2xl font-semibold text-white mb-1">
                  {collection.name}
                </h3>
                <p className="text-white/60 text-sm mb-3">
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
