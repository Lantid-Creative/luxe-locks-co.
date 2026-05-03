import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({ title: 'Please enter a valid email address', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase
      .from('newsletter_subscribers' as any)
      .insert({ email } as any);

    if (error) {
      if (error.code === '23505') {
        toast({ title: 'You\'re already subscribed!', description: 'Check your inbox for updates.' });
      } else {
        toast({ title: 'Something went wrong', description: 'Please try again later.', variant: 'destructive' });
      }
    } else {
      toast({ title: 'Welcome to the Trazzie family! 🎉', description: 'Use code WELCOME15 for 15% off your first order.' });
      setEmail('');
    }
    setIsSubmitting(false);
  };

  return (
    <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold mb-4">
            Stay In The Loop
          </p>

          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Your next look starts
            <br />
            <span className="heading-italic font-medium">the moment you subscribe.</span>
          </h2>

          <p className="text-primary-foreground/50 mb-10 max-w-lg mx-auto text-sm leading-relaxed">
            Exclusive offers, styling tips, and first access to new arrivals.
            Get 15% off your first order.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email..."
              className="h-14 px-6 bg-white/10 border-white/15 text-white placeholder:text-white/35 rounded-full focus:border-gold"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-8 bg-gold text-accent-foreground hover:bg-gold-light rounded-full whitespace-nowrap font-bold tracking-wide group"
            >
              {isSubmitting ? 'Subscribing...' : (
                <>
                  Subscribe
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-primary-foreground/30 mt-5">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
