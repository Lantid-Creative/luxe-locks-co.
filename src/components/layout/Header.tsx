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
  { name: 'New Collection', href: '/collections' },
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
        <div className="bg-primary text-white text-center py-2 text-xs tracking-wider">
          <p>✨ Free Shipping on Orders Over $200 | Use Code: <span className="font-semibold">TRAZZIE20</span> for 20% Off</p>
        </div>

        <nav className="bg-background/90 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Left Nav */}
              <div className="hidden lg:flex items-center gap-7">
                {navigation.slice(0, 3).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'text-xs font-medium tracking-wider uppercase transition-colors hover:text-gold',
                      location.pathname === item.href
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 -ml-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Logo */}
              <Link to="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
                <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-tight text-gold">
                  TRAZZIE✦
                </span>
              </Link>

              {/* Right Nav + Actions */}
              <div className="flex items-center gap-5">
                <div className="hidden lg:flex items-center gap-7">
                  {navigation.slice(3).map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'text-xs font-medium tracking-wider uppercase transition-colors hover:text-gold',
                        location.pathname === item.href
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="w-9 h-9" onClick={() => setSearchOpen(true)}>
                    <Search className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-9 h-9" asChild>
                    <Link to="/wishlist">
                      <Heart className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="hidden lg:flex w-9 h-9" asChild>
                    <Link to={user ? "/account" : "/auth"}>
                      <User className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative w-9 h-9"
                    onClick={() => setIsCartOpen(true)}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {totalItems > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
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
              <div className="flex flex-col gap-4 pt-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'text-base font-medium transition-colors hover:text-gold',
                      location.pathname === item.href ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
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
