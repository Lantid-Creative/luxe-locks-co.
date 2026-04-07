import { cn } from '@/lib/utils';

interface StockBadgeProps {
  stockQuantity: number;
  threshold?: number;
  className?: string;
}

export function StockBadge({ stockQuantity, threshold = 5, className }: StockBadgeProps) {
  if (stockQuantity <= 0) {
    return (
      <span className={cn('px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full', className)}>
        Out of Stock
      </span>
    );
  }

  if (stockQuantity <= threshold) {
    return (
      <span className={cn('px-3 py-1 bg-destructive/10 text-destructive text-xs font-semibold rounded-full animate-pulse', className)}>
        Only {stockQuantity} left!
      </span>
    );
  }

  return null;
}
