import type { IndexIntro, IndexType } from '@/types/etf';
import { NasdaqStatCard } from './NasdaqStatCard';
import { IndexQuote } from './IndexQuote';
import { INDEX_SYMBOL_MAP } from '@/utils/constants';

type Props = {
  intro: IndexIntro;
  indexType: IndexType;
};

export function HeroSection({ intro, indexType }: Props) {
  return (
    <header className="mb-12">
      <div className="mb-8">
        <p className="text-xs font-medium text-[var(--color-accent-amber)] uppercase tracking-[0.2em] mb-3">
          {intro.subtitle}
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[var(--color-text-primary)] mb-6 tracking-tight">
          {intro.title}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
          {intro.description}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="col-span-2 md:col-span-2 lg:col-span-2">
          <IndexQuote key={INDEX_SYMBOL_MAP[indexType]} symbol={INDEX_SYMBOL_MAP[indexType]} />
        </div>
        {intro.facts.map((fact, i) => (
          <NasdaqStatCard
            key={fact.label}
            label={fact.label}
            value={fact.value}
            accent={i === 0}
          />
        ))}
      </div>
    </header>
  );
}
