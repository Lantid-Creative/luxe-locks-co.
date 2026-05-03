import { Link } from 'react-router-dom';
import { Instagram, Mail, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'All Wigs', href: '/shop' },
    { name: 'Lace Front Wigs', href: '/shop?category=lace-wigs' },
    { name: 'Closure Wigs', href: '/shop?category=closure-wigs' },
    { name: 'Human Hair', href: '/shop?category=human-hair' },
    { name: 'Bundles & Frontals', href: '/shop?category=frontals' },
  ],
  help: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Trust Badges */}
      <div className="border-b border-white/[0.08]">
        <div className="container mx-auto px-4 py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { text: 'Secure Payment', icon: '🔒' },
              { text: '100% Human Hair', icon: '✨' },
              { text: 'Fast Shipping', icon: '🚚' },
              { text: 'Quality Guarantee', icon: '💎' },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center justify-center gap-3">
                <span className="text-lg">{badge.icon}</span>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/60">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="font-serif text-3xl font-bold tracking-tight text-white">
                TRAZZIE<span className="text-gold">✦</span>
              </span>
            </Link>
            <p className="text-white/40 mb-8 max-w-sm text-sm leading-relaxed">
              Elevate your beauty with premium quality wigs and hair extensions.
              Confidence starts with stunning hair.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center hover:bg-gold hover:border-gold hover:text-accent-foreground transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center hover:bg-gold hover:border-gold hover:text-accent-foreground transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.82a4.83 4.83 0 0 1-1-.13z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold text-[11px] tracking-[0.25em] uppercase mb-6 text-white/80">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-white/40 hover:text-gold transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-bold text-[11px] tracking-[0.25em] uppercase mb-6 text-white/80">Company</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-white/40 hover:text-gold transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Contact */}
          <div>
            <h4 className="font-bold text-[11px] tracking-[0.25em] uppercase mb-6 text-white/80">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-white/40 hover:text-gold transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <a href="mailto:hello@trazzie.com" className="inline-flex items-center gap-2 text-white/40 hover:text-gold transition-colors text-sm group">
                <Mail className="w-4 h-4" />
                <span>hello@trazzie.com</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.08]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/25 text-xs tracking-wide">
              © 2026 Trazzie. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs">
              <Link to="/privacy-policy" className="text-white/25 hover:text-gold transition-colors">
                Privacy
              </Link>
              <Link to="/terms-of-service" className="text-white/25 hover:text-gold transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
