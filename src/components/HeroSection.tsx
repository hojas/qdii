import { NDX_INTRO } from '@/config/ndx-intro';
import { NasdaqStatCard } from './NasdaqStatCard';
import { IndexQuote } from './IndexQuote';

export function HeroSection() {
  return (
    <header className="mb-12">
      <div className="mb-8">
        <p className="text-xs font-medium text-[var(--color-accent-amber)] uppercase tracking-[0.2em] mb-3">
          {NDX_INTRO.subtitle}
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[var(--color-text-primary)] mb-6 tracking-tight">
          {NDX_INTRO.title}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
          {NDX_INTRO.description}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="col-span-2 md:col-span-2 lg:col-span-2">
          <IndexQuote />
        </div>
        {NDX_INTRO.facts.map((fact, i) => (
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
