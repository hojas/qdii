import { useIndexQuote } from '@/data/useIndexQuote';
import { formatPrice, formatPercent, changeColorClass } from '@/utils/format';
import { cn } from '@/utils/cn';

export function IndexQuote() {
  const { data, loading, error } = useIndexQuote();

  if (error) {
    return (
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-5">
        <p className="text-xs text-[var(--color-text-muted)]">指数数据暂不可用</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-5 animate-pulse">
        <div className="skeleton h-3 w-16 mb-3" />
        <div className="skeleton h-8 w-32 mb-2" />
        <div className="skeleton h-4 w-20" />
      </div>
    );
  }

  const changeCls = changeColorClass(data.changePercent);

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-5">
      <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">
        实时指数
      </p>
      <p className="text-3xl font-bold font-mono tabular-nums text-[var(--color-text-primary)]">
        {data.price != null ? formatPrice(data.price) : '--'}
      </p>
      <p className={cn('text-sm font-mono mt-1', changeCls)}>
        {data.changePercent != null ? formatPercent(data.changePercent) : '--'}
      </p>
    </div>
  );
}
