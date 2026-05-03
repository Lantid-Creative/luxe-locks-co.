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
      name: 'Straight',
      tagline: 'Sleek & polished',
      slug: 'straight',
      image: products?.find(p => p.name.toLowerCase().includes('straight'))?.featured_image || '/placeholder.svg',
    },
    {
      id: 'bodywave-24',
      name: 'Body Wave 24"',
      tagline: 'Maximum glamour',
      slug: 'body-wave',
      image: products?.find(p => p.name.toLowerCase().includes('24'))?.featured_image || '/placeholder.svg',
    },
    {
      id: 'bodywave-16',
      name: 'Body Wave 16"',
      tagline: 'Everyday elegance',
      slug: 'body-wave',
      image: products?.find(p => p.name.toLowerCase().includes('16'))?.featured_image || '/placeholder.svg',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Curated For You
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <h2 className="font-serif text-4xl lg:text-6xl font-bold leading-tight">
              Shop by <span className="heading-italic text-primary">Collection.</span>
            </h2>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-primary hover:text-gold transition-colors group"
            >
              View All
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {collectionData.map((collection) => (
            <Link
              key={collection.id}
              to={`/shop?collection=${collection.slug}`}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden"
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-white/60 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                  {collection.tagline}
                </p>
                <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-3">
                  {collection.name}
                </h3>
                <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-bold tracking-wider uppercase px-5 py-2.5 rounded-full group-hover:bg-white/25 transition-colors">
                  Shop Now
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
