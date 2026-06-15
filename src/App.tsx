import { useState, useMemo, useCallback } from 'react';
import type { SortField, SortDir } from '@/types/etf';
import { DEFAULT_SORT_FIELD, DEFAULT_SORT_DIR } from '@/utils/constants';
import { sortEtfs } from '@/utils/sort';
import { useEnrichedEtfs } from '@/data/useEnrichedEtfs';
import { Layout } from '@/components/Layout';
import { DataStatusBar } from '@/components/DataStatusBar';
import { EtfComparisonTable } from '@/components/EtfComparisonTable';
import { EtfCardList } from '@/components/EtfCardList';

export default function App() {
  const { etfs, loading, error, lastUpdated } = useEnrichedEtfs();
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

  return (
    <Layout>
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
