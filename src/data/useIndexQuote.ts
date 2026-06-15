import { useState, useEffect, useRef, useCallback } from 'react';
import { getSdk } from './sdk';
import { REFRESH_INTERVAL_MS } from '@/utils/constants';

interface IndexQuoteData {
  price: number | null;
  changePercent: number | null;
}

interface UseIndexQuoteResult {
  data: IndexQuoteData;
  loading: boolean;
  error: boolean;
  lastUpdated: number | null;
}

export function useIndexQuote(): UseIndexQuoteResult {
  const [data, setData] = useState<IndexQuoteData>({ price: null, changePercent: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const mountedRef = useRef(true);

  const fetchIndex = useCallback(async () => {
    try {
      const sdk = getSdk();
      const results = await sdk.quotes.us(['NDX']);
      if (!mountedRef.current) return;

      const quote = results[0];
      if (quote) {
        setData({
          price: quote.price ?? null,
          changePercent: quote.changePercent ?? null,
        });
        setLastUpdated(Date.now());
        setError(false);
        setLoading(false);
      }
    } catch {
      if (mountedRef.current) setError(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    fetchIndex();

    const interval = setInterval(fetchIndex, REFRESH_INTERVAL_MS);
    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, [fetchIndex]);

  return { data, loading, error, lastUpdated };
}
