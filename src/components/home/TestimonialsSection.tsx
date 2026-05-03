import { Star } from 'lucide-react';

const testimonials = [
  {
    id: '1',
    author: 'Michelle T.',
    initials: 'MT',
    rating: 5,
    content: 'This wig is absolutely stunning! The hair quality is amazing and it looks so natural. I\'ve received so many compliments. Will definitely be ordering again!',
    verified: true,
  },
  {
    id: '2',
    author: 'Jasmine K.',
    initials: 'JK',
    rating: 5,
    content: 'I\'ve tried many wig brands and this is by far the best! The lace melted perfectly and the hair is so soft. Worth every penny.',
    verified: true,
  },
  {
    id: '3',
    author: 'Aisha R.',
    initials: 'AR',
    rating: 5,
    content: 'The shipping was fast and the wig came beautifully packaged. It\'s my go-to for special occasions now. Absolutely love it!',
    verified: true,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-14">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Voices From Our Customers
          </p>
          <h2 className="font-serif text-4xl lg:text-6xl font-bold max-w-2xl">
            Real women, <span className="heading-italic text-primary">real results.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((review) => (
            <div
              key={review.id}
              className="bg-card rounded-2xl p-8 border border-border hover:border-primary/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'text-gold fill-gold' : 'text-muted'}`}
                  />
                ))}
              </div>

              <p className="text-foreground/80 text-[15px] leading-relaxed mb-8">
                "{review.content}"
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  {review.initials}
                </div>
                <div>
                  <p className="font-bold text-sm flex items-center gap-2">
                    {review.author}
                    {review.verified && (
                      <span className="text-[10px] text-gold font-bold tracking-wider uppercase">Verified</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
