import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { products as mockProducts } from '@/lib/data';

interface SearchResult {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        // Try to search from database first
        const { data, error } = await supabase
          .from('products')
          .select('id, name, price, featured_image, hair_type')
          .ilike('name', `%${query}%`)
          .eq('is_active', true)
          .limit(10);

        if (error) throw error;

        if (data && data.length > 0) {
          setResults(
            data.map(p => ({
              id: p.id,
              name: p.name,
              price: Number(p.price),
              image: p.featured_image || '/placeholder.svg',
              category: p.hair_type || undefined,
            }))
          );
        } else {
          // Fallback to mock data
          const filtered = mockProducts.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase())
          );
          setResults(
            filtered.map(p => ({
              id: p.id,
              name: p.name,
              price: p.price,
              image: p.image,
              category: p.hairType,
            }))
          );
        }
      } catch (error) {
        // Fallback to mock data on error
        const filtered = mockProducts.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(
          filtered.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.image,
            category: p.hairType,
          }))
        );
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (product: SearchResult) => {
    // Save to recent searches
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));

    onOpenChange(false);
    setQuery('');
    navigate(`/product/${product.id}`);
  };

  const handleRecentSearch = (search: string) => {
    setQuery(search);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="sr-only">Search Products</DialogTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for wigs, hair products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-lg"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : query ? (
            results.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-3">
                  {results.length} results found
                </p>
                {results.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelect(product)}
                    className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{product.name}</h4>
                      {product.category && (
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      )}
                      <p className="text-sm font-semibold text-primary">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No products found for "{query}"</p>
                <Button
                  variant="link"
                  onClick={() => {
                    onOpenChange(false);
                    navigate('/shop');
                  }}
                >
                  Browse all products
                </Button>
              </div>
            )
          ) : (
            <>
              {recentSearches.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Recent Searches</h3>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, i) => (
                      <button
                        key={i}
                        onClick={() => handleRecentSearch(search)}
                        className="px-3 py-1.5 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium mb-3">Popular Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Lace Front Wigs', 'Human Hair', 'Closure Wigs', 'Frontals'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setQuery(cat)}
                      className="p-3 bg-muted rounded-lg text-sm hover:bg-muted/80 transition-colors text-left"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
