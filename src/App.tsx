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
import { cn } from '@/utils/cn';

const TABS: { key: IndexType; label: string }[] = [
  { key: 'nasdaq-100', label: '纳斯达克100' },
  { key: 'sp500', label: '标普500' },
];

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
    <Layout>
      <HeroSection intro={INDEX_INTRO_MAP[activeIndex]} indexType={activeIndex} />

      {/* Index switcher */}
      <nav
        className="flex gap-1 mb-6 p-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] w-fit"
        aria-label="指数选择"
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => handleIndexChange(tab.key)}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-colors',
              activeIndex === tab.key
                ? 'bg-[var(--color-accent)] text-white'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>

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
