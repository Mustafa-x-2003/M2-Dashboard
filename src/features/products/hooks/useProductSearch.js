import { useCallback, useEffect, useState } from "react";
import { searchProducts, getAllProducts } from "../services/productsApi";

export function useProductSearch() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState([]);
  const [refreshkey, setRefreshKey] = useState(0);

  const search = useCallback(async (q, category, isCancelled) => {
    setLoading(true);
    setError(null);
    try {
      const hasQuery    = q.trim()            !== '';
      const hasCategory = category            !== 'all';

      if (!hasQuery && !hasCategory) {
        
        const { data } = await getAllProducts();
        if (!isCancelled.current) {
          setResult(Array.isArray(data) ? data : (data.products ?? []));
        }
      } else {
        
        const params = {};
        if (hasQuery)    params.search   = q.trim();
        if (hasCategory) params.category = category;

        const { data } = await searchProducts(params);
        if (!isCancelled.current) {
          setResult(Array.isArray(data) ? data : (data.products ?? []));
        }
      }
    } catch (err) {
      if (!isCancelled.current) setError(err);
    } finally {
      if (!isCancelled.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const isCancelled = { current: false };
    const delay = query.trim() ? 400 : 0;
    const timer = setTimeout(() => search(query, cat, isCancelled), delay);
    
    return () => {
      clearTimeout(timer);
      isCancelled.current = true;
    };
  }, [query, cat, refreshkey, search]);

  const refresh = () => setRefreshKey(prev => prev + 1);
  return { result, loading, error, refresh, query, setQuery, cat, setCat };
}