import * as React from 'react';

/**
 * Primary call-to-action and secondary buttons for the Beeko storefront.
 * @startingPoint section="Core" subtitle="Buttons — primary, accent, outline, ghost" viewport="700x200"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** Visual style. primary = warm ink, accent = sage, outline, ghost. */
  variant?: 'primary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Full-width button. */
  block?: boolean;
  disabled?: boolean;
  /** Icon node placed at the start (right, in RTL). */
  iconStart?: React.ReactNode;
  /** Icon node placed at the end (left, in RTL). */
  iconEnd?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

/** Primary call-to-action and secondary buttons for the Beeko storefront. */
export function Button(props: ButtonProps): JSX.Element;
