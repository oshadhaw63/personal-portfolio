import type { CSSProperties } from "react";

/** Inline custom properties, typed loosely enough for `--var` keys. */
export function cssVars(vars: Record<`--${string}`, string | number>) {
  return vars as CSSProperties;
}
