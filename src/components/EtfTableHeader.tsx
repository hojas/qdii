import type { ColumnDef, SortField, SortDir } from '@/types/etf';
import { TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { cn } from '@/utils/cn';

interface EtfTableHeaderProps {
  columns: readonly ColumnDef[];
  sortField: SortField;
  sortDir: SortDir;
  onSort: (field: SortField) => void;
}

export function EtfTableHeader({ columns, sortField, sortDir, onSort }: EtfTableHeaderProps) {
  return (
    <TableHeader className="sticky top-0 z-10">
      <TableRow className="bg-[var(--color-surface)]">
        {columns.map((col) => {
          const isActive = sortField === col.field;
          const canSort = col.sortable;

          return (
            <TableHead
              key={col.field}
              className={cn(
                'group text-xs font-medium uppercase tracking-wider select-none',
                col.align === 'right' ? 'text-right' : 'text-left',
                canSort
                  ? 'cursor-pointer hover:text-[var(--color-accent-amber)] transition-colors duration-[var(--duration-fast)]'
                  : 'cursor-default',
                isActive
                  ? 'text-[var(--color-accent-amber)] border-b-2 border-[var(--color-accent-amber)]'
                  : 'text-[var(--color-text-secondary)] border-b border-[var(--color-border)]',
              )}
              onClick={() => canSort && onSort(col.field)}
              aria-sort={isActive ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
            >
              <span className="inline-flex items-center gap-1">
                {col.label}
                {canSort && (
                  <span
                    className={cn(
                      'text-[10px] transition-opacity duration-[var(--duration-fast)]',
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50',
                    )}
                  >
                    {isActive ? (sortDir === 'asc' ? '▲' : '▼') : '▼'}
                  </span>
                )}
              </span>
            </TableHead>
          );
        })}
      </TableRow>
    </TableHeader>
  );
}
