interface NasdaqStatCardProps {
  label: string;
  value: string;
  accent?: boolean;
}

export function NasdaqStatCard({ label, value, accent }: NasdaqStatCardProps) {
  return (
    <div
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-5
        transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-border-hover)]"
    >
      <dt className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
        {label}
      </dt>
      <dd
        className={`text-2xl font-bold font-mono tabular-nums ${
          accent ? 'text-[var(--color-accent-amber)]' : 'text-[var(--color-text-primary)]'
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
