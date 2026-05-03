import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { SearchDialog } from '@/components/search/SearchDialog';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Best Sellers', href: '/shop?sort=bestsellers' },
  { name: 'Collections', href: '/collections' },
  { name: 'Products', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/faq' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Announcement Bar */}
        <div className="bg-primary text-primary-foreground text-center py-2.5 text-xs tracking-[0.15em] font-medium">
          <p>FREE SHIPPING ON ORDERS OVER $200 — USE CODE <span className="font-bold text-gold">TRAZZIE20</span> FOR 20% OFF</p>
        </div>

        <nav className="bg-background/95 backdrop-blur-lg border-b border-border/60">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-[72px]">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 -ml-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Left Nav — pill-shaped like Susu */}
              <div className="hidden lg:flex items-center">
                <div className="flex items-center gap-1 bg-secondary/80 rounded-full px-2 py-1.5">
                  {navigation.slice(0, 4).map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'text-[11px] font-semibold tracking-[0.1em] uppercase px-4 py-2 rounded-full transition-all duration-200',
                        location.pathname === item.href || (item.href === '/' && location.pathname === '/')
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-background/60'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Logo — centered */}
              <Link to="/" className="absolute left-1/2 -translate-x-1/2">
                <span className="font-serif text-2xl lg:text-[28px] font-bold tracking-tight text-foreground">
                  TRAZZIE<span className="text-gold">✦</span>
                </span>
              </Link>

              {/* Right side — remaining links + actions */}
              <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-1 bg-secondary/80 rounded-full px-2 py-1.5">
                  {navigation.slice(4).map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'text-[11px] font-semibold tracking-[0.1em] uppercase px-4 py-2 rounded-full transition-all duration-200',
                        location.pathname === item.href
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-background/60'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-0.5">
                  <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full" onClick={() => setSearchOpen(true)}>
                    <Search className="w-[18px] h-[18px]" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full" asChild>
                    <Link to="/wishlist">
                      <Heart className="w-[18px] h-[18px]" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="hidden lg:flex w-9 h-9 rounded-full" asChild>
                    <Link to={user ? "/account" : "/auth"}>
                      <User className="w-[18px] h-[18px]" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative w-9 h-9 rounded-full"
                    onClick={() => setIsCartOpen(true)}
                  >
                    <ShoppingBag className="w-[18px] h-[18px]" />
                    {totalItems > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={cn(
                'lg:hidden overflow-hidden transition-all duration-300',
                mobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
              )}
            >
              <div className="flex flex-col gap-3 pt-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'text-sm font-semibold tracking-wide transition-colors px-4 py-2.5 rounded-xl',
                      location.pathname === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="flex-1 rounded-full" asChild>
                    <Link to={user ? "/account" : "/auth"} onClick={() => setMobileMenuOpen(false)}>
                      <User className="w-4 h-4 mr-2" />
                      Account
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 rounded-full" asChild>
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                      Contact
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
