import { Sparkles, Truck, Shield, Clock } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: '100% Human Hair',
    description: 'Premium quality virgin hair that looks and feels natural. Style it just like your own.',
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: 'Every wig is quality tested. Not satisfied? We offer hassle-free returns within 30 days.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Free express shipping on orders over $200. Most orders delivered within 3-5 business days.',
  },
  {
    icon: Clock,
    title: 'Long Lasting',
    description: 'With proper care, our wigs last 12-24 months. Investment pieces for your beauty routine.',
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-gold text-sm font-medium tracking-wider uppercase mb-3">
            The LuxeHair Difference
          </p>
          <h2 className="font-serif text-3xl lg:text-5xl font-semibold mb-4">
            Why Choose Us
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            We're committed to helping you look and feel your absolute best
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-2xl bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 text-gold mb-6">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
