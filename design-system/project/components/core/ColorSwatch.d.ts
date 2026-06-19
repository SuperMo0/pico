import * as React from 'react';

export interface ColorSwatchProps {
  /** Named product colorway or any CSS color. */
  color?: 'blue' | 'pink' | 'peach' | 'mint' | 'sage' | 'lilac' | 'cream' | 'grey' | string;
  selected?: boolean;
  /** Dot diameter in px. */
  size?: number;
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

/** Selectable product-colorway dot for cards and the PDP color picker. */
export function ColorSwatch(props: ColorSwatchProps): JSX.Element;
