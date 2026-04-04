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

  // Collect all product images into a flat array for the grid
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
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-gold mb-3">
            <Instagram className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">@Trazzie</span>
          </div>
          <h2 className="font-serif text-3xl lg:text-5xl font-semibold mb-4">
            Follow Us on Instagram
          </h2>
          <p className="text-muted-foreground">
            Share your Trazzie moments with #TrazzieBeauty
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayImages.map((img, index) => (
            <a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden image-zoom"
            >
              <img
                src={img}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                <Instagram className="w-8 h-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
