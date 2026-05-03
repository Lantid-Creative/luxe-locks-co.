import { Instagram } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function InstagramSection() {
  const { data: products } = useQuery({
    queryKey: ['products-for-instagram'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('images, featured_image')
        .eq('is_active', true);
      if (error) throw error;
      return data;
    },
  });

  const allImages: string[] = [];
  products?.forEach((p) => {
    if (p.featured_image) allImages.push(p.featured_image);
    p.images?.forEach((img) => {
      if (img && !allImages.includes(img)) allImages.push(img);
    });
  });
  const displayImages = allImages.slice(0, 6);

  if (displayImages.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-warm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <Instagram className="w-5 h-5" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">@Trazzie</span>
          </div>
          <h2 className="font-serif text-4xl lg:text-6xl font-bold mb-4">
            Follow <span className="heading-italic text-primary">the vibe.</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Share your Trazzie moments — #TrazzieBeauty
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {displayImages.map((img, index) => (
            <a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden"
            >
              <img
                src={img}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                <Instagram className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
