import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';

export function BestsellersSection() {
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-gold text-sm font-medium tracking-wider uppercase mb-3">
              Customer Favorites
            </p>
            <h2 className="font-serif text-3xl lg:text-5xl font-semibold">
              Bestselling Wigs
            </h2>
          </div>
          <Button
            variant="outline"
            className="self-start lg:self-auto border-2 group"
            asChild
          >
            <Link to="/shop">
              View All Products
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {bestsellers.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
