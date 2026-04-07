import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'trazzie-recently-viewed';
const MAX_ITEMS = 8;

export function useRecentlyViewed() {
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });

  const addToRecentlyViewed = useCallback((productId: string) => {
    setRecentIds(prev => {
      const updated = [productId, ...prev.filter(id => id !== productId)].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { recentIds, addToRecentlyViewed };
}
