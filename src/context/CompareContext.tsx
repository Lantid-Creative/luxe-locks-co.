import React, { createContext, useContext, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CompareContextType {
  compareItems: string[];
  addToCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  maxItems: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<string[]>([]);
  const maxItems = 4;
  const { toast } = useToast();

  const addToCompare = (productId: string) => {
    if (compareItems.includes(productId)) {
      toast({
        title: 'Already in compare',
        description: 'This product is already in your compare list.',
      });
      return;
    }

    if (compareItems.length >= maxItems) {
      toast({
        title: 'Compare limit reached',
        description: `You can only compare up to ${maxItems} products at a time.`,
        variant: 'destructive',
      });
      return;
    }

    setCompareItems(prev => [...prev, productId]);
    toast({
      title: 'Added to compare',
      description: 'Product added to compare list.',
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareItems(prev => prev.filter(id => id !== productId));
    toast({
      title: 'Removed from compare',
      description: 'Product removed from compare list.',
    });
  };

  const isInCompare = (productId: string) => {
    return compareItems.includes(productId);
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        maxItems,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};
