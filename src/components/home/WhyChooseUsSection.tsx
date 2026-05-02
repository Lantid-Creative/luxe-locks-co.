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
    <section className="py-24 lg:py-32 bg-primary text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            The Trazzie Difference
          </p>
          <h2 className="font-serif text-3xl lg:text-5xl font-semibold mb-4">
            Why Choose Us
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            We're committed to helping you look and feel your absolute best
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/20 text-gold mb-6">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
