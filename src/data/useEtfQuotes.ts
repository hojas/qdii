import { useState, useEffect, useRef, useCallback } from 'react';
import { getSdk } from './sdk';
import type { EtfLiveQuote, EtfStatic } from '@/types/etf';
import { REFRESH_INTERVAL_MS } from '@/utils/constants';

interface UseEtfQuotesResult {
  quotes: Map<string, EtfLiveQuote>;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

/** Build full SDK code with exchange prefix: 51xxxx → sh, 159xxx → sz */
function toSdkCode(etf: EtfStatic): string {
  return `${etf.exchange}${etf.code}`;
}

/** Fetch live quotes for all ETFs and auto-refresh on interval. */
export function useEtfQuotes(etfs: readonly EtfStatic[]): UseEtfQuotesResult {
  const [quotes, setQuotes] = useState<Map<string, EtfLiveQuote>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const mountedRef = useRef(true);

  const fetchQuotes = useCallback(async () => {
    if (etfs.length === 0) return;

    try {
      const sdk = getSdk();
      const codes = etfs.map(toSdkCode);
      const results = await sdk.quotes.cn(codes);

      // Build lookup keyed by bare code (FullQuote.code returns bare code like "513100")
      const codeToEtf = new Map(etfs.map((e) => [e.code, e]));

      const map = new Map<string, EtfLiveQuote>();
      for (const quote of results) {
        if (!quote) continue;
        const etf = codeToEtf.get(quote.code);
        if (!etf) continue;
        map.set(etf.code, {
          price: quote.price ?? null,
          changePercent: quote.changePercent ?? null,
          volume: quote.volume ?? null,
          amount: quote.amount ?? null,
        });
      }

      if (mountedRef.current) {
        setQuotes(map);
        setLastUpdated(Date.now());
        setError(null);
        setLoading(false);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : 'Failed to fetch quotes');
        setLoading(false);
      }
    }
  }, [etfs]);

  useEffect(() => {
    mountedRef.current = true;
    fetchQuotes();

    const interval = setInterval(fetchQuotes, REFRESH_INTERVAL_MS);
    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, [fetchQuotes]);

  return { quotes, loading, error, lastUpdated };
}
