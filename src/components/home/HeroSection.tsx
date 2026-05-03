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
      <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
        {/* Right side image */}
        <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full">
          <img
            src={heroImage}
            alt="Beautiful woman with luxurious hair"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent lg:from-background lg:via-transparent lg:to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-44 pb-28">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary/80 border border-border rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                New Collection Available
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.05] mb-8 text-foreground">
              Elevate your
              <br />
              natural beauty,
              <br />
              <span className="heading-italic font-medium text-primary">effortlessly.</span>
            </h1>

            <p className="text-base lg:text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed">
              Premium, ethically sourced wigs & extensions — handcrafted from 100% virgin hair
              for a flawless, natural finish that turns heads.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10 text-sm font-bold tracking-wide rounded-full group"
                asChild
              >
                <Link to="/shop">
                  Shop Collection
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-border hover:bg-secondary h-14 px-10 text-sm font-bold tracking-wide rounded-full"
                asChild
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-16 pt-8 border-t border-border/60">
              {[
                { value: '50K+', label: 'Happy Customers' },
                { value: '100%', label: 'Human Hair' },
                { value: '4.9★', label: 'Average Rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl lg:text-4xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 tracking-wide uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MarqueeBanner />
    </>
  );
}
