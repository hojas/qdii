import type { EnrichedEtf, SortField, SortDir } from '@/types/etf';
import { ETF_COLUMNS } from '@/utils/constants';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table';
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
    <TableRow style={{ animationDelay: `${index * 40}ms` }}>
      {ETF_COLUMNS.map((col) => (
        <TableCell key={col.field}>
          <div
            className="skeleton h-4 rounded"
            style={{ width: col.format === 'name' ? '120px' : '64px' }}
          />
        </TableCell>
      ))}
    </TableRow>
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
    <section aria-label="ETF Comparison Table" className="w-full">
      <div className="min-w-[900px]">
        <Table>
          <EtfTableHeader
            columns={ETF_COLUMNS}
            sortField={sortField}
            sortDir={sortDir}
            onSort={onSort}
          />
          <TableBody>
            {loading
              ? Array.from({ length: etfs.length || 12 }, (_, i) => <SkeletonRow key={i} index={i} />)
              : etfs.map((etf, i) => (
                  <EtfTableRow key={etf.code} etf={etf} columns={ETF_COLUMNS} index={i} />
                ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
