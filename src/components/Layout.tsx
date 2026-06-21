import type { ReactNode } from 'react';
import type { IndexType } from '@/types/etf';
import { Footer } from './Footer';
import { cn } from '@/utils/cn';

const TABS: { key: IndexType; label: string }[] = [
  { key: 'nasdaq-100', label: '纳斯达克100' },
  { key: 'sp500', label: '标普500' },
];

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
          <nav className="flex gap-1 py-3" aria-label="指数选择">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => onIndexChange(tab.key)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-colors',
                  activeIndex === tab.key
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
        <Footer />
      </div>
    </div>
  );
}
