import type { ReactNode } from 'react';
import { HeroSection } from './HeroSection';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
