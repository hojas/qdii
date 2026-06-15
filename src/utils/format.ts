/**
 * Format a number as Chinese Yuan price (3 decimal places for ETFs).
 * Returns "--" for null/undefined.
 */
export function formatPrice(value: number | null | undefined): string {
  if (value == null) return '--';
  return `¥${value.toFixed(3)}`;
}

/**
 * Format a percentage value. Returns "+X.XX%" / "-X.XX%" with sign.
 * Returns "--" for null/undefined.
 */
export function formatPercent(value: number | null | undefined): string {
  if (value == null) return '--';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * Return a color class for a percentage change value.
 * Green for positive, red for negative, muted for null.
 */
export function changeColorClass(value: number | null | undefined): string {
  if (value == null) return 'text-[var(--color-text-muted)]';
  if (value > 0) return 'text-[var(--color-accent-green)]';
  if (value < 0) return 'text-[var(--color-accent-red)]';
  return 'text-[var(--color-text-secondary)]';
}

/**
 * Return a heat color class for a management fee value.
 * Lower fees are greener, higher fees are redder.
 */
export function feeColorClass(fee: number): string {
  if (fee <= 0.60) return 'text-[var(--color-accent-green)]';
  if (fee <= 0.80) return 'text-[var(--color-text-primary)]';
  if (fee <= 1.00) return 'text-[var(--color-accent-amber)]';
  return 'text-[var(--color-accent-red)]';
}

/**
 * Return a color class for premium/discount rate.
 * Premium (positive) = red (overpaying), discount (negative) = green.
 */
export function premiumColorClass(value: number | null | undefined): string {
  if (value == null) return 'text-[var(--color-text-muted)]';
  if (value > 0) return 'text-[var(--color-accent-red)]';
  if (value < 0) return 'text-[var(--color-accent-green)]';
  return 'text-[var(--color-text-secondary)]';
}

/**
 * Format management fee as percentage string, e.g. "0.80%".
 */
export function formatFee(value: number | null | undefined): string {
  if (value == null) return '--';
  return `${value.toFixed(2)}%`;
}

/**
 * Format fund size in 亿元. Appends "亿". Returns "--" for null.
 */
export function formatFundSize(value: number | null | undefined): string {
  if (value == null) return '--';
  if (value >= 100) return `${value.toFixed(0)}亿`;
  return `${value.toFixed(1)}亿`;
}

/**
 * Format volume in 万手 (10,000 lots).
 * stock-sdk FullQuote.volume is already in 手 (lots).
 * Returns "--" for null.
 */
export function formatVolume(value: number | null | undefined): string {
  if (value == null) return '--';
  const wanShou = value / 10000;
  if (wanShou >= 100) return `${wanShou.toFixed(0)}万手`;
  if (wanShou >= 1) return `${wanShou.toFixed(2)}万手`;
  return `${wanShou.toFixed(4)}万手`;
}

/**
 * Format turnover amount in 亿元.
 * stock-sdk FullQuote.amount is already in 万元 (万 CNY).
 * Returns "--" for null.
 */
export function formatAmount(value: number | null | undefined): string {
  if (value == null) return '--';
  const yi = value / 1e4;
  if (yi >= 100) return `${yi.toFixed(0)}亿`;
  if (yi >= 1) return `${yi.toFixed(2)}亿`;
  return `${yi.toFixed(4)}亿`;
}

/**
 * Format a UTC timestamp (ms) to a locale time string.
 * Returns "--" for null.
 */
export function formatTime(ts: number | null | undefined): string {
  if (ts == null) return '--';
  return new Date(ts).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
