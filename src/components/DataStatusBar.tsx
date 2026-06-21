import type { IndexType } from '@/types/etf';
import { INDEX_INTRO_MAP } from '@/config/qdii-intro';
import { formatTime } from '@/utils/format';
import { cn } from '@/utils/cn';

interface DataStatusBarProps {
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
  etfCount: number;
  indexType: IndexType;
}

export function DataStatusBar({ loading, error, lastUpdated, etfCount, indexType }: DataStatusBarProps) {
  const indexLabel = INDEX_INTRO_MAP[indexType].subtitle;

  return (
    <div className="flex items-center justify-between py-3 mb-6 border-b border-[var(--color-border)]">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'inline-block w-2 h-2 rounded-full',
            loading
              ? 'bg-[var(--color-accent-amber)] animate-pulse'
              : error
                ? 'bg-[var(--color-accent-red)]'
                : 'bg-[var(--color-accent-green)]',
          )}
        />
        <span className="text-xs text-[var(--color-text-secondary)]">
          {loading ? '加载中...' : error ? `数据异常: ${error}` : '实时数据'}
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
        {lastUpdated && !loading && (
          <span>更新于 {formatTime(lastUpdated)}</span>
        )}
        <span>{etfCount}只ETF · {indexLabel}</span>
      </div>
    </div>
  );
}
