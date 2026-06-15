import type { SortField, SortDir, EnrichedEtf } from '@/types/etf';

/**
 * Sort an array of EnrichedEtf by the given field and direction.
 * null values always sort last regardless of direction.
 */
export function sortEtfs(
  etfs: readonly EnrichedEtf[],
  field: SortField,
  dir: SortDir,
): EnrichedEtf[] {
  if (etfs.length <= 1) return [...etfs];
  const multiplier = dir === 'asc' ? 1 : -1;
  const copy = [...etfs];

  copy.sort((a, b) => {
    const va = a[field];
    const vb = b[field];

    // nulls last
    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;

    if (typeof va === 'string' && typeof vb === 'string') {
      return multiplier * va.localeCompare(vb, 'zh-CN');
    }

    return multiplier * ((va as number) - (vb as number));
  });

  return copy;
}
