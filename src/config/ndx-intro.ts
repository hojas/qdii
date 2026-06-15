export const NDX_INTRO = {
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
} as const;
