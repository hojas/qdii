import { useState, useMemo, useCallback } from 'react';
import type { SortField, SortDir, IndexType } from '@/types/etf';
import { INDEX_ETF_MAP } from '@/config/etf.config';
import { INDEX_INTRO_MAP } from '@/config/qdii-intro';
import { DEFAULT_SORT_FIELD, DEFAULT_SORT_DIR } from '@/utils/constants';
import { sortEtfs } from '@/utils/sort';
import { useEnrichedEtfs } from '@/data/useEnrichedEtfs';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/HeroSection';
import { DataStatusBar } from '@/components/DataStatusBar';
import { EtfComparisonTable } from '@/components/EtfComparisonTable';
import { EtfCardList } from '@/components/EtfCardList';

export default function App() {
  const [activeIndex, setActiveIndex] = useState<IndexType>('nasdaq-100');
  const { etfs, loading, error, lastUpdated } = useEnrichedEtfs(INDEX_ETF_MAP[activeIndex]);
  const [sortField, setSortField] = useState<SortField>(DEFAULT_SORT_FIELD);
  const [sortDir, setSortDir] = useState<SortDir>(DEFAULT_SORT_DIR);

  const handleSort = useCallback(
    (field: SortField) => {
      setSortField((prevField) => {
        if (prevField === field) {
          setSortDir((prevDir) => (prevDir === 'asc' ? 'desc' : 'asc'));
          return prevField;
        }
        setSortDir('desc');
        return field;
      });
    },
    [],
  );

  const sortedEtfs = useMemo(
    () => sortEtfs(etfs, sortField, sortDir),
    [etfs, sortField, sortDir],
  );

  const handleIndexChange = useCallback((index: IndexType) => {
    setActiveIndex(index);
    setSortField(DEFAULT_SORT_FIELD);
    setSortDir(DEFAULT_SORT_DIR);
  }, []);

  return (
    <Layout activeIndex={activeIndex} onIndexChange={handleIndexChange}>
      <HeroSection intro={INDEX_INTRO_MAP[activeIndex]} indexType={activeIndex} />

      <DataStatusBar loading={loading} error={error} lastUpdated={lastUpdated} />

      {/* Desktop: full table */}
      <div className="hidden lg:block">
        <EtfComparisonTable
          etfs={sortedEtfs}
          sortField={sortField}
          sortDir={sortDir}
          onSort={handleSort}
          loading={loading}
        />
      </div>

      {/* Mobile: card list */}
      <div className="lg:hidden">
        <EtfCardList
          etfs={sortedEtfs}
          sortField={sortField}
          sortDir={sortDir}
          onSort={handleSort}
          loading={loading}
        />
      </div>
    </Layout>
  );
}
