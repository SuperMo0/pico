import * as React from 'react';

/**
 * Beeko typographic Arabic wordmark (بيكو) — placeholder until a real logo is supplied.
 * @startingPoint section="Brand" subtitle="Wordmark — ink & cream tones" viewport="700x160"
 */
export interface LogoProps {
  /** Wordmark height in px. */
  size?: number;
  /** ink (default, dark on cream) or cream (light on dark). */
  tone?: 'ink' | 'cream';
  /** Show the «ملابس أطفال قطنية» tagline beneath. */
  tagline?: boolean;
  style?: React.CSSProperties;
}

/** Beeko typographic Arabic wordmark (بيكو) — placeholder until a real logo is supplied. */
export function Logo(props: LogoProps): JSX.Element;
