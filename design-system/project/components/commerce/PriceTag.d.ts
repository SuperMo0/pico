import * as React from 'react';

export interface PriceTagProps {
  /** Current price (string or number; pre-format Arabic numerals if desired). */
  price: React.ReactNode;
  /** Original price for sale strikethrough. */
  was?: React.ReactNode | null;
  /** Currency label, default «ر.س». */
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

/** Price display with optional sale strikethrough. */
export function PriceTag(props: PriceTagProps): JSX.Element;
