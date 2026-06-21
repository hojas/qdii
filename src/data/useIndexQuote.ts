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

export function useIndexQuote(symbol: string): UseIndexQuoteResult {
  const [data, setData] = useState<IndexQuoteData>({ price: null, changePercent: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const mountedRef = useRef(true);
  const prevSymbolRef = useRef(symbol);

  // Reset loading state when symbol changes
  if (prevSymbolRef.current !== symbol) {
    prevSymbolRef.current = symbol;
    setLoading(true);
    setError(false);
  }

  const fetchIndex = useCallback(async () => {
    try {
      const sdk = getSdk();
      const results = await sdk.quotes.us([symbol]);
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
      } else {
        setError(true);
        setLoading(false);
      }
    } catch {
      if (mountedRef.current) setError(true);
      setLoading(false);
    }
  }, [symbol]);

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
