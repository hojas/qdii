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
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Top navigation bar */}
      <header className="sticky top-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur-sm border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
