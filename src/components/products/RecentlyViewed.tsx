import { useMemo } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { normalizeProduct } from '@/types/product';
import { ProductCardNew } from './ProductCardNew';

interface RecentlyViewedProps {
  excludeId?: string;
}

export function RecentlyViewed({ excludeId }: RecentlyViewedProps) {
  const { recentIds } = useRecentlyViewed();
  const { data: allProducts } = useProducts();

  const recentProducts = useMemo(() => {
    if (!allProducts || recentIds.length === 0) return [];
    return recentIds
      .filter(id => id !== excludeId)
      .map(id => allProducts.find(p => p.id === id))
      .filter(Boolean)
      .slice(0, 4)
      .map(p => normalizeProduct(p!));
  }, [allProducts, recentIds, excludeId]);

  if (recentProducts.length === 0) return null;

  return (
    <div className="mt-16 pt-16 border-t border-border">
      <h3 className="font-serif text-2xl font-semibold mb-8">Recently Viewed</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProducts.map(p => (
          <ProductCardNew key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
