import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const hairTypes = ['Human Hair', 'Synthetic'];
const laceTypes = ['13x4 HD Lace', '13x6 Frontal', '4x4 Closure', '5x5 Closure'];
const lengths = ['12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"'];
const priceRanges = [
  { label: 'Under $100', min: 0, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: '$200 - $300', min: 200, max: 300 },
  { label: 'Over $300', min: 300, max: Infinity },
];
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Most Popular', value: 'popular' },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedHairTypes, setSelectedHairTypes] = useState<string[]>([]);
  const [selectedLaceTypes, setSelectedLaceTypes] = useState<string[]>([]);
  const [selectedLengths, setSelectedLengths] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<typeof priceRanges[0] | null>(null);
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by hair type
    if (selectedHairTypes.length > 0) {
      result = result.filter((p) => selectedHairTypes.includes(p.hairType));
    }

    // Filter by lace type
    if (selectedLaceTypes.length > 0) {
      result = result.filter((p) => selectedLaceTypes.includes(p.laceType));
    }

    // Filter by length
    if (selectedLengths.length > 0) {
      result = result.filter((p) => selectedLengths.includes(p.length));
    }

    // Filter by price
    if (selectedPriceRange) {
      result = result.filter(
        (p) => p.price >= selectedPriceRange.min && p.price < selectedPriceRange.max
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // newest - keep original order
        break;
    }

    return result;
  }, [selectedHairTypes, selectedLaceTypes, selectedLengths, selectedPriceRange, sortBy]);

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearFilters = () => {
    setSelectedHairTypes([]);
    setSelectedLaceTypes([]);
    setSelectedLengths([]);
    setSelectedPriceRange(null);
  };

  const hasActiveFilters =
    selectedHairTypes.length > 0 ||
    selectedLaceTypes.length > 0 ||
    selectedLengths.length > 0 ||
    selectedPriceRange !== null;

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border-b border-border pb-6 mb-6">
      <h4 className="font-medium mb-4 flex items-center justify-between">
        {title}
        <ChevronDown className="w-4 h-4" />
      </h4>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl lg:text-5xl font-semibold mb-4">
              Shop All Wigs
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our complete collection of premium quality wigs. 
              From lace fronts to closures, find your perfect match.
            </p>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-32">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-lg font-semibold">Filters</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-gold hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <FilterSection title="Hair Type">
                  <div className="space-y-3">
                    {hairTypes.map((type) => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer">
                        <Checkbox
                          checked={selectedHairTypes.includes(type)}
                          onCheckedChange={() =>
                            toggleFilter(type, selectedHairTypes, setSelectedHairTypes)
                          }
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection title="Lace Type">
                  <div className="space-y-3">
                    {laceTypes.map((type) => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer">
                        <Checkbox
                          checked={selectedLaceTypes.includes(type)}
                          onCheckedChange={() =>
                            toggleFilter(type, selectedLaceTypes, setSelectedLaceTypes)
                          }
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection title="Length">
                  <div className="grid grid-cols-2 gap-2">
                    {lengths.map((length) => (
                      <button
                        key={length}
                        onClick={() => toggleFilter(length, selectedLengths, setSelectedLengths)}
                        className={cn(
                          'px-3 py-2 text-sm rounded-lg border transition-colors',
                          selectedLengths.includes(length)
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border hover:border-gold'
                        )}
                      >
                        {length}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection title="Price">
                  <div className="space-y-3">
                    {priceRanges.map((range) => (
                      <label key={range.label} className="flex items-center gap-3 cursor-pointer">
                        <Checkbox
                          checked={selectedPriceRange?.label === range.label}
                          onCheckedChange={() =>
                            setSelectedPriceRange(
                              selectedPriceRange?.label === range.label ? null : range
                            )
                          }
                        />
                        <span className="text-sm">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> products
                </p>

                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    className="lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-2 w-5 h-5 bg-gold text-accent-foreground text-xs rounded-full flex items-center justify-center">
                        !
                      </span>
                    )}
                  </Button>

                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-10 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Products */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">
                    No products found matching your filters.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          mobileFiltersOpen ? 'block' : 'hidden'
        )}
      >
        <div
          className="absolute inset-0 bg-foreground/50"
          onClick={() => setMobileFiltersOpen(false)}
        />
        <div className="absolute left-0 top-0 bottom-0 w-80 max-w-full bg-background overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-semibold">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Same filter sections as desktop */}
            <FilterSection title="Hair Type">
              <div className="space-y-3">
                {hairTypes.map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={selectedHairTypes.includes(type)}
                      onCheckedChange={() =>
                        toggleFilter(type, selectedHairTypes, setSelectedHairTypes)
                      }
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Lace Type">
              <div className="space-y-3">
                {laceTypes.map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={selectedLaceTypes.includes(type)}
                      onCheckedChange={() =>
                        toggleFilter(type, selectedLaceTypes, setSelectedLaceTypes)
                      }
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Length">
              <div className="grid grid-cols-2 gap-2">
                {lengths.map((length) => (
                  <button
                    key={length}
                    onClick={() => toggleFilter(length, selectedLengths, setSelectedLengths)}
                    className={cn(
                      'px-3 py-2 text-sm rounded-lg border transition-colors',
                      selectedLengths.includes(length)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:border-gold'
                    )}
                  >
                    {length}
                  </button>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Price">
              <div className="space-y-3">
                {priceRanges.map((range) => (
                  <label key={range.label} className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={selectedPriceRange?.label === range.label}
                      onCheckedChange={() =>
                        setSelectedPriceRange(
                          selectedPriceRange?.label === range.label ? null : range
                        )
                      }
                    />
                    <span className="text-sm">{range.label}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <div className="flex gap-4 mt-6">
              <Button variant="outline" className="flex-1" onClick={clearFilters}>
                Clear All
              </Button>
              <Button
                className="flex-1 bg-primary text-primary-foreground"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
