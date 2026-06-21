import { useMemo } from 'react';
import { useEtfQuotes } from './useEtfQuotes';
import { useEtfNav } from './useEtfNav';
import type { EnrichedEtf, EtfStatic } from '@/types/etf';

interface UseEnrichedEtfsResult {
  etfs: readonly EnrichedEtf[];
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

/** Merge static ETF config with live quotes + NAV, compute derived fields. */
export function useEnrichedEtfs(etfs: readonly EtfStatic[]): UseEnrichedEtfsResult {
  const { quotes, loading: quotesLoading, error, lastUpdated } = useEtfQuotes(etfs);
  const { navMap, loading: navLoading } = useEtfNav(etfs);

  const result: readonly EnrichedEtf[] = useMemo(() => {
    return etfs.map((staticData) => {
      const live = quotes.get(staticData.code);

      // Compute premium/discount rate: (market price - NAV) / NAV × 100
      let premiumRate: number | null = null;
      const nav = navMap.get(staticData.code);
      if (live?.price != null && nav != null && nav > 0) {
        premiumRate = ((live.price - nav) / nav) * 100;
      }

      return {
        ...staticData,
        price: live?.price ?? null,
        changePercent: live?.changePercent ?? null,
        volume: live?.volume ?? null,
        amount: live?.amount ?? null,
        premiumRate,
      };
    });
  }, [etfs, quotes, navMap]);

  return { etfs: result, loading: quotesLoading || navLoading, error, lastUpdated };
}
