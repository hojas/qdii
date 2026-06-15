import { useState, useEffect, useRef, useCallback } from 'react';
import { getSdk } from './sdk';
import type { EtfStatic } from '@/types/etf';
import { REFRESH_INTERVAL_MS } from '@/utils/constants';

interface UseEtfNavResult {
  navMap: Map<string, number>;
  loading: boolean;
}

export function useEtfNav(etfs: readonly EtfStatic[]): UseEtfNavResult {
  const [navMap, setNavMap] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  const fetchNav = useCallback(async () => {
    if (etfs.length === 0) return;
    try {
      const sdk = getSdk();
      const results = await sdk.quotes.fund(etfs.map((e) => e.code));
      if (!mountedRef.current) return;

      const map = new Map<string, number>();
      for (const quote of results) {
        if (quote && quote.nav > 0) {
          map.set(quote.code, quote.nav);
        }
      }
      setNavMap(map);
      setLoading(false);
    } catch {
      if (mountedRef.current) setLoading(false);
    }
  }, [etfs]);

  useEffect(() => {
    mountedRef.current = true;
    fetchNav();
    const interval = setInterval(fetchNav, REFRESH_INTERVAL_MS);
    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, [fetchNav]);

  return { navMap, loading };
}
