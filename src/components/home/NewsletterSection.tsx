import { useState } from 'react';
import { Mail } from 'lucide-react';
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
    <section className="py-24 lg:py-32 bg-primary text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/20 text-gold mb-6">
            <Mail className="w-7 h-7" />
          </div>
          
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-4">
            Join the Trazzie Family
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Subscribe for exclusive offers, styling tips, and be the first to know about new arrivals. 
            Get 15% off your first order!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="h-14 px-6 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-8 bg-gold text-accent-foreground hover:bg-gold-light rounded-full whitespace-nowrap font-semibold"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>

          <p className="text-xs text-white/40 mt-4">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
