# Code Review: NASDAQ-100 ETF Comparison Page

**Reviewed**: 2025-06-16
**Branch**: main (local, uncommitted)
**Decision**: APPROVE with fixes recommended

## Summary

Well-structured single-page React app with solid TypeScript typing, clean data layer separation, and polished dark financial-terminal design. No security issues. Two correctness bugs found (incorrect quote-code mapping assumption, broken sort-indicator hover). A few code quality items worth addressing before commit.

## Validation Results

| Check | Result |
|-------|--------|
| Type check (`tsc --noEmit`) | Pass |
| Build (`vite build`) | Pass (335KB JS, 14KB CSS) |
| Console.log audit | None found |
| Tests | Skipped (no test runner configured) |

## Findings

### HIGH

**H1 — Unsafe assumption: quote results array order matches input codes** (`src/data/useEtfQuotes.ts:35-36`)
The code maps `results[i]` to `etfs[i].code` assuming the SDK returns results in the same order as the input codes array. If the SDK returns results in a different order or skips failed codes, quotes will be mapped to wrong ETFs. The SDK documentation doesn't guarantee positional correspondence.
**Fix**: Use the quote object's own symbol/code field to build the map, not positional index.

**H2 — Broken `group-hover` on sort indicator** (`src/components/EtfTableHeader.tsx:41`)
The sort indicator caret uses `group-hover:opacity-50` but no parent element has the `group` class. The indicator remains invisible on hover, so users can't see which columns are sortable until they click one.
**Fix**: Add `group` class to the parent `<th>` element.

### MEDIUM

**M1 — Duplicate color logic across components** (`src/components/MetricCell.tsx:39-58`, `src/components/EtfCardList.tsx:31-47`)
The `changePercent` color logic and `managementFee` heat-color logic are duplicated between MetricCell and EtfCardList. Changes to thresholds would need updating in two places.
**Fix**: Extract `changeColorClass(value)` and `feeColorClass(fee)` utilities to `src/utils/format.ts`.

**M2 — Unsafe type cast in formatValue** (`src/components/MetricCell.tsx:25`)
`val as number | null` cast bypasses type-checking. While the switch on `col.format` ensures numeric fields only hit numeric branches, the cast masks potential mismatches.
**Fix**: Narrow via discriminated union or proper type guards instead of casting.

**M3 — Hardcoded skeleton row count** (`src/components/EtfComparisonTable.tsx:48`)
Skeleton loading shows 12 rows regardless of actual ETF count. If ETF config changes, skeleton count is wrong.
**Fix**: Use `etfs.length || NASDAQ_100_ETFS.length`.

**M4 — IndexQuote duplicates SDK/interval pattern** (`src/components/IndexQuote.tsx:11-35`)
IndexQuote re-implements the SDK fetch+interval+cleanup pattern already encapsulated in `useEtfQuotes`.
**Fix**: Either extend `useEtfQuotes` to support US-market codes, or create a small `useIndexQuote()` hook.

### LOW

**L1 — No tests** (all files)
The project has no test runner configured and zero tests. Coding style rules require 80% test coverage.
**Fix**: Add Vitest + React Testing Library. Test: format utilities, sortEtfs, and component rendering.

**L2 — `percentSign` exported but unused** (`src/utils/format.ts:23-26`)
The `percentSign` function is exported but never imported by any component.
**Fix**: Remove or use in a component.

## Files Reviewed (19 source files)

| File | Lines | Issues |
|------|-------|--------|
| `src/App.tsx` | 62 | — |
| `src/main.tsx` | 10 | — |
| `src/index.css` | 78 | — |
| `src/types/etf.ts` | 40 | — |
| `src/utils/format.ts` | 82 | L2 |
| `src/utils/sort.ts` | 33 | — |
| `src/utils/cn.ts` | 5 | — |
| `src/utils/constants.ts` | 15 | — |
| `src/config/etf.config.ts` | 117 | — |
| `src/config/ndx-intro.ts` | 23 | — |
| `src/data/sdk.ts` | 14 | — |
| `src/data/useEtfQuotes.ts` | 80 | H1 |
| `src/data/useEnrichedEtfs.ts` | 50 | — |
| `src/components/MetricCell.tsx` | 82 | M1, M2 |
| `src/components/EtfTableRow.tsx` | 27 | — |
| `src/components/EtfTableHeader.tsx` | 55 | H2 |
| `src/components/EtfComparisonTable.tsx` | 58 | M3 |
| `src/components/EtfCardList.tsx` | 149 | M1 |
| `src/components/IndexQuote.tsx` | 68 | M4 |

Also reviewed: `HeroSection.tsx`, `NasdaqStatCard.tsx`, `DataStatusBar.tsx`, `Footer.tsx`, `Layout.tsx` — no issues.
