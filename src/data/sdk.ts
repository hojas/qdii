import { StockSDK } from 'stock-sdk';

let instance: StockSDK | null = null;

/** Get or create the StockSDK singleton */
export function getSdk(): StockSDK {
  if (!instance) {
    instance = new StockSDK({
      timeout: 10000,
      retry: { maxRetries: 2, baseDelay: 500 },
    });
  }
  return instance;
}
