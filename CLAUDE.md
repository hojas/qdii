# QDII — ETF Comparison Tool

NASDAQ-100 & S&P 500 ETF real-time comparison for Chinese cross-border investors.

## Commands

```bash
pnpm dev          # Start Vite dev server (port 5173 by default)
pnpm build        # Type-check then production build (tsc -b && vite build)
pnpm preview      # Preview production build locally
pnpm tsc --noEmit # Type-check only
```

## Stack

- **Runtime:** React 19.2, React DOM 19.2
- **Build:** Vite 8, TypeScript 6.0
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite` plugin), shadcn/ui components
- **Charts/Data:** `stock-sdk` for ETF quotes, `lucide-react` for icons
- **Package manager:** pnpm (lockfile checked in)
- **Path alias:** `@/` → `./src/`
- **Base path:** `/qdii/` (set in `vite.config.ts`)

## Project Structure

```
src/
├── components/   # React components (feature-organized)
├── config/       # ETF product config, intro text
├── data/         # Custom hooks for data fetching (useEnrichedEtfs, useEtfNav, etc.)
├── lib/          # Shared utilities
├── types/        # TypeScript type definitions (etf.ts)
├── utils/        # cn(), format(), sort(), constants
├── App.tsx       # Root component
├── main.tsx      # Entry point
└── index.css     # Global styles + Tailwind
```

## Theming

Light and dark mode via CSS custom properties with a `data-theme` attribute on `<html>`.
- `ThemeToggle.tsx` switches between `"light"` and `"dark"`
- Initial theme set via inline `<script>` in `index.html` to prevent flash
- The editorial warm-paper palette is defined in `index.css`
- Colors use oklch throughout

## Data Sources

- ETF NAV and quotes from `stock-sdk` (`stock-sdk-v2.linkdiary.cn`)
- Fund details from East Money (`fundf10.eastmoney.com`)
- Configured ETF products in `src/config/etf.config.ts`
- Type definitions for ETF data in `src/types/etf.ts`

## Coding Conventions

- Props typed with named interfaces (no `React.FC`)
- Immutable state updates with spread
- `cn()` helper from `@/utils/cn` wraps `clsx` + `tailwind-merge`
- Component files colocated with related sub-components
- CSS: prefer `transform`/`opacity` for animations, avoid animating layout properties
