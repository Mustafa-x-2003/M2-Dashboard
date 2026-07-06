import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { searchProducts, getAllProducts } from "../services/productsApi";

export function useProductSearch() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState([]);
  const [refreshkey, setRefreshKey] = useState(0);

  const search = useCallback(async (q, category, signal) => {
    setLoading(true);
    setError(null);
    try {
      const hasQuery    = q.trim()   !== '';
      const hasCategory = category   !== 'all';

      if (!hasQuery && !hasCategory) {
        const { data } = await getAllProducts(signal);
        setResult(Array.isArray(data) ? data : (data.products ?? []));
      } else {
        const params = {};
        if (hasQuery)    params.search   = q.trim();
        if (hasCategory) params.category = category;

        const { data } = await searchProducts(params, signal);
        setResult(Array.isArray(data) ? data : (data.products ?? []));
      }
    } catch (err) {
      if (axios.isCancel(err) || err?.code === "ERR_CANCELED") return;
      setError(err);
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const delay = query.trim() ? 400 : 0;
    const timer = setTimeout(() => search(query, cat, controller.signal), delay);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, cat, refreshkey, search]);

  const refresh = () => setRefreshKey(prev => prev + 1);
  return { result, loading, error, refresh, query, setQuery, cat, setCat };
}