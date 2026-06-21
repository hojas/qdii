import type { ReactNode } from 'react';
import type { IndexType } from '@/types/etf';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  activeIndex: IndexType;
  onIndexChange: (index: IndexType) => void;
}

export function Layout({ children, activeIndex, onIndexChange }: LayoutProps) {
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  const weekdayStr = ['日', '一', '二', '三', '四', '五', '六'][today.getDay()];

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <header className="sticky top-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur-sm border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-1.5 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-3 text-[10px] font-mono text-[var(--color-text-faint)] tracking-[0.2em] uppercase">
              <span>场内ETF对比</span>
              <span className="text-[var(--color-border)]">/</span>
              <span>周{weekdayStr} · {dateStr}</span>
            </div>
            <span className="text-[10px] text-[var(--color-text-muted)] tracking-[0.2em] uppercase font-mono">
              每日更新
            </span>
          </div>

          <Tabs
            value={activeIndex}
            onValueChange={(v) => onIndexChange(v as IndexType)}
            className="py-2"
          >
            <TabsList variant="line" className="bg-transparent">
              <TabsTrigger value="nasdaq-100">纳斯达克100</TabsTrigger>
              <TabsTrigger value="sp500">标普500</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
        <Footer />
      </div>
    </div>
  );
}
