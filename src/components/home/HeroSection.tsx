import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MarqueeBanner } from './MarqueeBanner';

export function HeroSection() {
  const { data: products } = useQuery({
    queryKey: ['products-for-hero'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('featured_image')
        .eq('is_active', true)
        .limit(1);
      if (error) throw error;
      return data;
    },
  });

  const heroImage = products?.[0]?.featured_image || '/placeholder.svg';

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Beautiful woman with luxurious hair"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-40 pb-24">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-6">
              TRAZZIE✦
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] mb-6 text-white">
              Elevate Your Natural Beauty
              <span className="block mt-2">With Premium, Ethically</span>
              <span className="block mt-2">Sourced Hair Extensions.</span>
            </h1>

            <p className="text-lg text-white/70 max-w-lg mb-10 leading-relaxed">
              Discover the secret to effortless volume and length. Our luxury wigs and extensions
              are handcrafted from 100% virgin hair to ensure a flawless, natural finish.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gold text-accent-foreground hover:bg-gold-light h-14 px-10 text-base font-semibold rounded-full group"
                asChild
              >
                <Link to="/shop">
                  View Our Products
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/40 text-white hover:bg-white/10 h-14 px-10 text-base font-semibold rounded-full"
                asChild
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>

            {/* Stats row */}
            <div className="flex gap-10 mt-14 pt-8 border-t border-white/20">
              <div>
                <p className="font-serif text-3xl lg:text-4xl font-semibold text-white">50K+</p>
                <p className="text-sm text-white/50 mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="font-serif text-3xl lg:text-4xl font-semibold text-white">100%</p>
                <p className="text-sm text-white/50 mt-1">Human Hair</p>
              </div>
              <div>
                <p className="font-serif text-3xl lg:text-4xl font-semibold text-white">4.9★</p>
                <p className="text-sm text-white/50 mt-1">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Marquee */}
      <MarqueeBanner />
    </>
  );
}
