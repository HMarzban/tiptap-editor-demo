/**
 * Browser-only `window.prompt` wrapper: trims input and treats empty/whitespace as cancel.
 * Returns null when `window` is undefined (e.g. SSR) or when the user dismisses the prompt.
 */
export function promptForImageUrl(): string | null {
  if (typeof window === "undefined") return null;
  const raw = window.prompt("Enter image URL:");
  const trimmed = raw?.trim();
  return trimmed || null;
}
