import type { EnrichedEtf, ColumnDef } from '@/types/etf';
import { MetricCell } from './MetricCell';
import { cn } from '@/utils/cn';

interface EtfTableRowProps {
  etf: EnrichedEtf;
  columns: readonly ColumnDef[];
  index: number;
}

export function EtfTableRow({ etf, columns, index }: EtfTableRowProps) {
  return (
    <tr
      className={cn(
        'border-b border-[var(--color-border)] transition-transform duration-[var(--duration-fast)]',
        'hover:scale-[1.002] hover:bg-[var(--color-surface-elevated)]',
        'animate-fade-in-up',
      )}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {columns.map((col) => (
        <MetricCell key={col.field} column={col} etf={etf} />
      ))}
    </tr>
  );
}
