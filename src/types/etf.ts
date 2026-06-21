/** Supported index types */
export type IndexType = 'nasdaq-100' | 'sp500';

/** Index-level display content for hero section */
export interface IndexIntro {
  title: string;
  subtitle: string;
  description: string;
  facts: readonly { label: string; value: string }[];
}

/** Static metadata for a single ETF (not provided by stock-sdk) */
export interface EtfStatic {
  /** Trading code, e.g. "513100" (bare, no exchange prefix) */
  code: string;
  /** Full fund name in Chinese */
  name: string;
  /** Annual management fee as percentage, e.g. 0.80 means 0.80% */
  managementFee: number;
  /** Approximate fund AUM in 亿元 (null for unknown/small funds) */
  fundSize: number | null;
  /** Fund inception date as ISO string, e.g. "2013-04-25" */
  inceptionDate: string;
  /** Exchange: "sh" for Shanghai (51xxxx) or "sz" for Shenzhen (159xxx) */
  exchange: 'sh' | 'sz';
}

/** Live quote fields fetched from stock-sdk (only displayed fields kept) */
export interface EtfLiveQuote {
  price: number | null;
  changePercent: number | null;
  volume: number | null;
  amount: number | null;
}

/** Merged ETF data = static metadata + live quotes + derived fields */
export interface EnrichedEtf extends EtfStatic, EtfLiveQuote {
  /** Premium/discount rate = (price - nav) / nav × 100. Positive = premium, negative = discount. */
  premiumRate: number | null;
}

/** Sortable column identifiers */
export type SortField =
  | 'code'
  | 'name'
  | 'price'
  | 'changePercent'
  | 'managementFee'
  | 'fundSize'
  | 'volume'
  | 'amount'
  | 'premiumRate';

/** Sort direction */
export type SortDir = 'asc' | 'desc';

/** Column definition for the comparison table */
export interface ColumnDef {
  field: SortField;
  label: string;
  format: 'code' | 'name' | 'price' | 'percent' | 'fee' | 'fundSize' | 'volume' | 'amount';
  sortable: boolean;
  align: 'left' | 'right';
}
