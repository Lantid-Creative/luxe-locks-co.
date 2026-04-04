import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
    <section className="relative min-h-screen flex items-center bg-cream-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-32 pb-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full text-sm font-medium text-gold mb-6 animate-fade-up">
              <Sparkles className="w-4 h-4" />
              <span>Luxury Hair Collection</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight mb-6 animate-fade-up stagger-1">
              Embrace Your
              <span className="block text-gold-gradient">Natural Beauty</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 animate-fade-up stagger-2">
              Discover premium quality wigs crafted for confidence, 
              beauty, and effortless elegance. Your perfect look awaits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up stagger-3">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-base font-medium group"
                asChild
              >
                <Link to="/shop">
                  Shop Wigs
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary h-14 px-8 text-base font-medium hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <Link to="/collections">
                  View Collections
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border animate-fade-up stagger-4">
              <div className="text-center lg:text-left">
                <p className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">50K+</p>
                <p className="text-sm text-muted-foreground mt-1">Happy Customers</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">100%</p>
                <p className="text-sm text-muted-foreground mt-1">Human Hair</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">4.9★</p>
                <p className="text-sm text-muted-foreground mt-1">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-up stagger-2">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl gold-glow">
              <img
                src={heroImage}
                alt="Beautiful woman with luxurious hair"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 lg:-left-12 bg-background rounded-xl p-4 shadow-xl border border-border animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Premium Quality</p>
                  <p className="text-xs text-muted-foreground">100% Virgin Human Hair</p>
                </div>
              </div>
            </div>

            {/* Second Floating Card */}
            <div className="absolute -top-4 -right-4 lg:-right-8 bg-background rounded-xl p-4 shadow-xl border border-border animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-gold/20 flex items-center justify-center text-xs font-medium text-gold">M</div>
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-gold/30 flex items-center justify-center text-xs font-medium text-gold">J</div>
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-gold/40 flex items-center justify-center text-xs font-medium text-gold">A</div>
                </div>
                <div>
                  <p className="font-medium text-sm">50K+ Reviews</p>
                  <div className="flex text-gold text-xs">★★★★★</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
