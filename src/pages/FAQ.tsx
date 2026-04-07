import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { PageMeta } from '@/components/seo/PageMeta';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';

const faqSections = [
  {
    title: 'Shipping & Delivery',
    items: [
      { q: 'How long does shipping take?', a: 'Standard shipping typically takes 3-7 business days within the US. Expedited shipping (1-3 business days) is available at checkout.' },
      { q: 'Do you offer free shipping?', a: 'Yes! We offer free standard shipping on all orders over $200. Use code TRAZZIE20 for 20% off your order.' },
      { q: 'Do you ship internationally?', a: 'Currently we ship within the United States. International shipping is coming soon!' },
      { q: 'How can I track my order?', a: 'Once your order ships, you\'ll receive a tracking number via email. You can also check your order status in your account dashboard.' },
    ],
  },
  {
    title: 'Returns & Exchanges',
    items: [
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery. Items must be unworn, in original packaging, with tags attached. Custom-colored wigs are final sale.' },
      { q: 'How do I start a return?', a: 'Contact our support team via the Contact page or email us. We\'ll provide a prepaid return label and process your refund within 5-7 business days after receiving the item.' },
      { q: 'Can I exchange for a different size or color?', a: 'Yes! Contact us within 30 days and we\'ll arrange an exchange. If the new item has a price difference, we\'ll adjust accordingly.' },
    ],
  },
  {
    title: 'Wig Care & Maintenance',
    items: [
      { q: 'How do I wash my wig?', a: 'Use lukewarm water and sulfate-free shampoo. Gently detangle with a wide-tooth comb before washing. Air dry on a wig stand — avoid wringing or twisting.' },
      { q: 'Can I heat style my wig?', a: 'Our human hair wigs can be heat styled up to 350°F. Always use a heat protectant spray. Synthetic wigs should not be heat styled unless specifically labeled as heat-resistant.' },
      { q: 'How long do your wigs last?', a: 'With proper care, our human hair wigs last 1-2 years. We recommend washing every 7-10 wears and storing on a wig stand when not in use.' },
      { q: 'How do I store my wig?', a: 'Store on a wig stand or mannequin head to maintain its shape. Keep in a cool, dry place away from direct sunlight. Use a silk or satin bag for travel.' },
    ],
  },
  {
    title: 'Cap Sizing & Fit',
    items: [
      { q: 'How do I find my cap size?', a: 'Measure your head circumference with a soft tape measure: Small (21"-21.5"), Medium (22"-22.5"), Large (23"-23.5"). Most customers fit a Medium.' },
      { q: 'What if I\'m between sizes?', a: 'We recommend going with the larger size. All our wigs feature adjustable straps and combs for a secure, customized fit.' },
      { q: 'Do your wigs have adjustable straps?', a: 'Yes! Every wig comes with adjustable straps at the nape for up to 1" of adjustment, plus built-in combs for extra security.' },
    ],
  },
  {
    title: 'Payment & Orders',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay through our secure checkout.' },
      { q: 'Is my payment information secure?', a: 'Absolutely. We use Stripe for payment processing with industry-standard SSL encryption. We never store your card details.' },
      { q: 'Can I cancel or modify my order?', a: 'Orders can be modified or cancelled within 2 hours of placement. After that, the order enters processing. Contact us ASAP if you need changes.' },
    ],
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="FAQ - Frequently Asked Questions | Trazzie"
        description="Find answers to common questions about shipping, returns, wig care, cap sizing, and payments at Trazzie."
      />
      <Header />
      <CartDrawer />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <Breadcrumbs items={[{ label: 'FAQ' }]} />

          <div className="text-center mb-12">
            <p className="text-gold text-sm font-medium tracking-wider uppercase mb-4">Help Center</p>
            <h1 className="font-serif text-4xl lg:text-5xl font-semibold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground">
              Everything you need to know about shopping with Trazzie.
            </p>
          </div>

          <div className="space-y-10">
            {faqSections.map(section => (
              <div key={section.title}>
                <h2 className="font-serif text-2xl font-semibold mb-4">{section.title}</h2>
                <Accordion type="single" collapsible className="border border-border rounded-lg overflow-hidden">
                  {section.items.map((item, i) => (
                    <AccordionItem key={i} value={`${section.title}-${i}`} className="border-b border-border last:border-0">
                      <AccordionTrigger className="px-5 py-4 text-left hover:no-underline hover:text-gold">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-4 text-muted-foreground leading-relaxed">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
