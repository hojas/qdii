import type { EnrichedEtf, ColumnDef } from '@/types/etf';
import { TableRow } from '@/components/ui/table';
import { MetricCell } from './MetricCell';
import { cn } from '@/utils/cn';

interface EtfTableRowProps {
  etf: EnrichedEtf;
  columns: readonly ColumnDef[];
  index: number;
}

export function EtfTableRow({ etf, columns, index }: EtfTableRowProps) {
  return (
    <TableRow
      className={cn(
        'transition-transform duration-[var(--duration-fast)] animate-fade-in-up',
      )}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {columns.map((col) => (
        <MetricCell key={col.field} column={col} etf={etf} />
      ))}
    </TableRow>
  );
}
