import type { EnrichedEtf, SortField, SortDir } from '@/types/etf';
import { ETF_COLUMNS } from '@/utils/constants';
import { EtfTableHeader } from './EtfTableHeader';
import { EtfTableRow } from './EtfTableRow';

interface EtfComparisonTableProps {
  etfs: readonly EnrichedEtf[];
  sortField: SortField;
  sortDir: SortDir;
  onSort: (field: SortField) => void;
  loading: boolean;
}

function SkeletonRow({ index }: { index: number }) {
  return (
    <tr style={{ animationDelay: `${index * 40}ms` }}>
      {ETF_COLUMNS.map((col) => (
        <td key={col.field} className="px-4 py-3">
          <div
            className="skeleton h-4 rounded"
            style={{ width: col.format === 'name' ? '120px' : '64px' }}
          />
        </td>
      ))}
    </tr>
  );
}

export function EtfComparisonTable({
  etfs,
  sortField,
  sortDir,
  onSort,
  loading,
}: EtfComparisonTableProps) {
  return (
    <section aria-label="ETF Comparison Table" className="w-full overflow-x-auto">
      <div className="min-w-[900px]">
        <table className="w-full border-collapse">
          <EtfTableHeader
            columns={ETF_COLUMNS}
            sortField={sortField}
            sortDir={sortDir}
            onSort={onSort}
          />
          <tbody>
            {loading
              ? Array.from({ length: etfs.length || 12 }, (_, i) => <SkeletonRow key={i} index={i} />)
              : etfs.map((etf, i) => (
                  <EtfTableRow key={etf.code} etf={etf} columns={ETF_COLUMNS} index={i} />
                ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
