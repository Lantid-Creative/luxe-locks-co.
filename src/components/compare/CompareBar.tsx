import { Link } from 'react-router-dom';
import { X, GitCompare } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function CompareBar() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();

  const compareProducts = compareItems
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as typeof products;

  if (compareItems.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t shadow-lg"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 overflow-x-auto">
              <div className="flex items-center gap-2 text-sm font-medium shrink-0">
                <GitCompare className="w-4 h-4" />
                Compare ({compareItems.length}/4)
              </div>
              
              <div className="flex items-center gap-2">
                {compareProducts.map((product) => (
                  <div
                    key={product.id}
                    className="relative group shrink-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg border"
                    />
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="sm" onClick={clearCompare}>
                Clear
              </Button>
              <Button size="sm" asChild>
                <Link to="/compare">Compare Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
