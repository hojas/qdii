import type { ColumnDef, EnrichedEtf } from '@/types/etf';
import {
  formatPrice,
  formatPercent,
  formatFee,
  formatFundSize,
  formatVolume,
  formatAmount,
  changeColorClass,
  feeColorClass,
  premiumColorClass,
} from '@/utils/format';
import { cn } from '@/utils/cn';

interface MetricCellProps {
  column: ColumnDef;
  etf: EnrichedEtf;
}

function formatCellValue(etf: EnrichedEtf, col: ColumnDef): string {
  const val = etf[col.field];
  if (val == null) return '--';
  switch (col.format) {
    case 'price':    return formatPrice(val as number);
    case 'percent':  return formatPercent(val as number);
    case 'fee':      return formatFee(val as number);
    case 'fundSize': return formatFundSize(val as number);
    case 'volume':   return formatVolume(val as number);
    case 'amount':   return formatAmount(val as number);
    default:         return String(val);
  }
}

function cellColorClass(etf: EnrichedEtf, col: ColumnDef): string {
  if (col.format === 'percent' && col.field === 'changePercent') {
    return changeColorClass(etf.changePercent);
  }
  if (col.format === 'fee') {
    return feeColorClass(etf.managementFee);
  }
  if (col.format === 'percent' && col.field === 'premiumRate') {
    return premiumColorClass(etf.premiumRate);
  }
  if (col.format === 'code') return 'font-mono text-[var(--color-accent-blue)]';
  return 'text-[var(--color-text-primary)]';
}

export function MetricCell({ column, etf }: MetricCellProps) {
  const value = formatCellValue(etf, column);
  const colorCls = cellColorClass(etf, column);

  return (
    <td
      className={cn(
        'px-4 py-3 text-sm whitespace-nowrap',
        column.align === 'right' ? 'text-right font-mono tabular-nums' : 'text-left',
        colorCls,
        column.format === 'name' && 'max-w-[180px] truncate',
      )}
    >
      {value.startsWith('--') ? (
        <span className="text-[var(--color-text-muted)]">{value}</span>
      ) : (
        value
      )}
    </td>
  );
}
