import type { IndexType, IndexIntro } from '@/types/etf';

export const INDEX_INTRO_MAP: Record<IndexType, IndexIntro> = {
  'nasdaq-100': {
    title: 'NASDAQ-100',
    subtitle: '纳斯达克100指数',
    description:
      '纳斯达克100指数由纳斯达克交易所上市的 100 家最大的非金融公司组成，' +
      '涵盖科技、消费服务、医疗保健等行业。该指数是全球科技股的核心基准，' +
      '汇聚了 Apple、Microsoft、NVIDIA、Amazon、Meta、Alphabet、Tesla、' +
      'Broadcom 等世界级企业。',
    facts: [
      { label: '成分股数量', value: '100' },
      { label: '加权方式', value: '修正市值加权' },
      { label: '调整频率', value: '每年12月' },
      { label: '基准货币', value: 'USD' },
      { label: '成立时间', value: '1985年1月' },
    ],
  },
  sp500: {
    title: 'S&P 500',
    subtitle: '标普500指数',
    description:
      '标普500指数由标准普尔公司编制，涵盖美国 500 家市值最大的上市公司，' +
      '覆盖信息技术、金融、医疗保健、可选消费、工业等 11 个行业板块。' +
      '该指数被广泛视为美国股市乃至全球资本市场最重要的基准，' +
      '汇聚了 Apple、Microsoft、NVIDIA、Amazon、Berkshire Hathaway、' +
      'JPMorgan Chase、Johnson & Johnson 等全球龙头企业。',
    facts: [
      { label: '成分股数量', value: '503' },
      { label: '加权方式', value: '自由流通市值加权' },
      { label: '调整频率', value: '按需（季度审查）' },
      { label: '基准货币', value: 'USD' },
      { label: '成立时间', value: '1957年3月' },
    ],
  },
} as const;
