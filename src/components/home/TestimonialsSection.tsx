import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: '1',
    author: 'Michelle T.',
    initials: 'MT',
    rating: 5,
    date: '2 weeks ago',
    content: 'This wig is absolutely stunning! The hair quality is amazing and it looks so natural. I\'ve received so many compliments. Will definitely be ordering again!',
    productName: 'Trazzie Straight Special',
    verified: true,
  },
  {
    id: '2',
    author: 'Jasmine K.',
    initials: 'JK',
    rating: 5,
    date: '1 month ago',
    content: 'I\'ve tried many wig brands and this is by far the best! The lace melted perfectly and the hair is so soft. Worth every penny.',
    productName: 'Trazzie Bodywave Curve Wig 24"',
    verified: true,
  },
  {
    id: '3',
    author: 'Aisha R.',
    initials: 'AR',
    rating: 5,
    date: '3 weeks ago',
    content: 'The shipping was fast and the wig came beautifully packaged. It\'s my go-to for special occasions now. Absolutely love it!',
    productName: 'Trazzie Bodywave Curve Wig 16"',
    verified: true,
  },
  {
    id: '4',
    author: 'Taylor M.',
    initials: 'TM',
    rating: 5,
    date: '1 week ago',
    content: 'Exceeded my expectations! The density is perfect and it looks so natural. Customer service was also incredibly helpful.',
    productName: 'Trazzie Straight Special',
    verified: true,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Real Reviews
          </p>
          <h2 className="font-serif text-3xl lg:text-5xl font-semibold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of women who've transformed their confidence with Trazzie
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((review, index) => (
            <div
              key={review.id}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <Quote className="w-7 h-7 text-gold/30 mb-4" />
              
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < review.rating ? 'text-gold fill-gold' : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-4">
                "{review.content}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  {review.initials}
                </div>
                <div>
                  <p className="font-medium text-sm flex items-center gap-1.5">
                    {review.author}
                    {review.verified && (
                      <span className="text-[10px] text-gold font-semibold">✓ Verified</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
