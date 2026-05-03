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
    <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-14">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold mb-4">
            The Trazzie Difference
          </p>
          <h2 className="font-serif text-4xl lg:text-6xl font-bold mb-4 max-w-2xl">
            Why choose <span className="heading-italic font-medium">us.</span>
          </h2>
          <p className="text-primary-foreground/50 max-w-xl text-base">
            We didn't reinvent the wig — we put premium craftsmanship behind it.
            Verified quality, ethically sourced, transparent pricing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-7 rounded-2xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold/15 text-gold mb-6">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/50 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
