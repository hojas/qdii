import type { ColumnDef, IndexType } from '@/types/etf';

/** Map from index type to stock-sdk US symbol */
export const INDEX_SYMBOL_MAP: Record<IndexType, string> = {
  'nasdaq-100': 'NDX',
  sp500: 'INX',
};

export const ETF_COLUMNS: readonly ColumnDef[] = [
  { field: 'code', label: '代码', format: 'code', sortable: true, align: 'left' },
  { field: 'name', label: '基金简称', format: 'name', sortable: true, align: 'left' },
  { field: 'price', label: '最新价', format: 'price', sortable: true, align: 'right' },
  { field: 'changePercent', label: '涨跌幅', format: 'percent', sortable: true, align: 'right' },
  { field: 'managementFee', label: '管理费率', format: 'fee', sortable: true, align: 'right' },
  { field: 'fundSize', label: '基金规模', format: 'fundSize', sortable: true, align: 'right' },
  { field: 'volume', label: '成交量', format: 'volume', sortable: true, align: 'right' },
  { field: 'amount', label: '成交额', format: 'amount', sortable: true, align: 'right' },
  { field: 'premiumRate', label: '溢价率', format: 'percent', sortable: true, align: 'right' },
];

export const DEFAULT_SORT_FIELD = 'changePercent';
export const DEFAULT_SORT_DIR = 'desc';
export const REFRESH_INTERVAL_MS = 60_000;
