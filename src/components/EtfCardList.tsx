import type { EnrichedEtf, SortField, SortDir } from '@/types/etf';
import { ETF_COLUMNS } from '@/utils/constants';
import { cn } from '@/utils/cn';
import {
  formatPrice, formatPercent, formatFee,
  formatFundSize, formatVolume, formatAmount,
  changeColorClass, feeColorClass, premiumColorClass,
} from '@/utils/format';

interface EtfCardListProps {
  etfs: readonly EnrichedEtf[];
  sortField: SortField;
  sortDir: SortDir;
  onSort: (field: SortField) => void;
  loading: boolean;
}

function SkeletonCard() {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-4 animate-pulse">
      <div className="skeleton h-5 w-32 mb-3" />
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="skeleton h-4 w-20" />
        ))}
      </div>
    </div>
  );
}

function EtfCard({ etf, index }: { etf: EnrichedEtf; index: number }) {
  const changeCls = changeColorClass(etf.changePercent);
  const feeCls = feeColorClass(etf.managementFee);

  return (
    <div
      className={cn(
        'bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-4',
        'transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-border-hover)]',
        'animate-fade-in-up',
      )}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Header: code + name */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-sm text-[var(--color-accent-blue)]">{etf.code}</span>
        <span className={cn('text-sm font-mono font-medium tabular-nums', changeCls)}>
          {formatPercent(etf.changePercent)}
        </span>
      </div>
      <p className="text-sm font-medium text-[var(--color-text-primary)] mb-3 truncate">
        {etf.name}
      </p>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        {([
          { label: '最新价',   value: formatPrice(etf.price),               cls: 'text-[var(--color-text-primary)]' },
          { label: '管理费率', value: formatFee(etf.managementFee),         cls: feeCls },
          { label: '规模',     value: formatFundSize(etf.fundSize),         cls: 'text-[var(--color-text-primary)]' },
          { label: '溢价率',   value: formatPercent(etf.premiumRate),       cls: premiumColorClass(etf.premiumRate) },
          { label: '成交量',   value: formatVolume(etf.volume),             cls: 'text-[var(--color-text-primary)]' },
          { label: '成交额',   value: formatAmount(etf.amount),             cls: 'text-[var(--color-text-primary)]' },
        ]).map((m) => (
          <div key={m.label} className="flex justify-between">
            <span className="text-[var(--color-text-muted)]">{m.label}</span>
            <span className={cn('font-mono tabular-nums', m.cls)}>{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SORTABLE_COLUMNS = ETF_COLUMNS.filter((c) => c.sortable);

export function EtfCardList({ etfs, sortField, sortDir, onSort, loading }: EtfCardListProps) {
  return (
    <section aria-label="ETF Card List">
      {/* Sort controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        {SORTABLE_COLUMNS.map((col) => {
          const isActive = sortField === col.field;
          return (
            <button
              key={col.field}
              type="button"
              onClick={() => onSort(col.field)}
              className={cn(
                'px-3 py-1.5 text-xs rounded-[var(--radius-sm)] border transition-colors duration-[var(--duration-fast)]',
                isActive
                  ? 'border-[var(--color-accent-amber)] text-[var(--color-accent-amber)] bg-[var(--color-surface-elevated)]'
                  : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]',
              )}
            >
              {col.label}
              {isActive && (sortDir === 'asc' ? ' ↑' : ' ↓')}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {loading
          ? Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)
          : etfs.map((etf, i) => <EtfCard key={etf.code} etf={etf} index={i} />)}
      </div>
    </section>
  );
}
