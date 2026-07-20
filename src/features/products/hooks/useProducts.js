import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { getAllProducts } from "../services/productsApi";

export function useProducts() {
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getAllProducts(signal);
      setProducts(Array.isArray(data) ? data : (data.products ?? []));
    } catch (err) {
      if (axios.isCancel(err) || err?.code === "ERR_CANCELED") return;
      setError(err);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
    return () => controller.abort();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}
