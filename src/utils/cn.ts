/**
 * Merge Tailwind class strings, filtering out falsy values.
 * Lightweight alternative to clsx + tailwind-merge for our scale.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
