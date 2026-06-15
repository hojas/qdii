import type { EtfStatic } from '@/types/etf';

/**
 * Static metadata for all Chinese A-share listed NASDAQ-100 ETFs.
 * Fund sizes are approximate as of mid-2026. Management fees are total
 * (management fee + custodian fee). Data sourced from public fund filings.
 */
export const NASDAQ_100_ETFS: readonly EtfStatic[] = [
  {
    code: '513100',
    name: '国泰纳斯达克100ETF',

    managementFee: 0.80,
    fundSize: 166,
    inceptionDate: '2013-04-25',
    exchange: 'sh',
  },
  {
    code: '159941',
    name: '广发纳斯达克100ETF',

    managementFee: 1.05,
    fundSize: 246,
    inceptionDate: '2015-06-10',
    exchange: 'sz',
  },
  {
    code: '513300',
    name: '华夏纳斯达克100ETF',

    managementFee: 0.80,
    fundSize: 90,
    inceptionDate: '2020-10-22',
    exchange: 'sh',
  },
  {
    code: '159632',
    name: '华安纳斯达克100ETF',

    managementFee: 0.80,
    fundSize: 95,
    inceptionDate: '2022-07-21',
    exchange: 'sz',
  },
  {
    code: '159501',
    name: '嘉实纳斯达克100ETF',

    managementFee: 0.60,
    fundSize: 83,
    inceptionDate: '2023-05-15',
    exchange: 'sz',
  },
  {
    code: '159513',
    name: '大成纳斯达克100ETF',

    managementFee: 1.05,
    fundSize: 60,
    inceptionDate: '2023-05-25',
    exchange: 'sz',
  },
  {
    code: '159659',
    name: '招商纳斯达克100ETF',

    managementFee: 0.65,
    fundSize: 50,
    inceptionDate: '2023-06-15',
    exchange: 'sz',
  },
  {
    code: '159696',
    name: '易方达纳斯达克100ETF',

    managementFee: 0.60,
    fundSize: 28,
    inceptionDate: '2023-07-10',
    exchange: 'sz',
  },
  {
    code: '159660',
    name: '汇添富纳斯达克100ETF',

    managementFee: 0.65,
    fundSize: null,
    inceptionDate: '2023-07-19',
    exchange: 'sz',
  },
  {
    code: '513390',
    name: '博时纳斯达克100ETF',

    managementFee: 0.65,
    fundSize: null,
    inceptionDate: '2023-08-01',
    exchange: 'sh',
  },
  {
    code: '513110',
    name: '华泰柏瑞纳斯达克100ETF',

    managementFee: 1.00,
    fundSize: null,
    inceptionDate: '2024-01-15',
    exchange: 'sh',
  },
  {
    code: '513870',
    name: '富国纳斯达克100ETF',

    managementFee: 0.60,
    fundSize: 18,
    inceptionDate: '2024-03-20',
    exchange: 'sh',
  },
];
