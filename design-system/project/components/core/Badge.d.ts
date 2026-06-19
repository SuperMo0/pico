import * as React from 'react';

export interface BadgeProps {
  children?: React.ReactNode;
  tone?: 'neutral' | 'sage' | 'sale' | 'success' | 'info';
  /** Filled instead of soft tint. */
  solid?: boolean;
  style?: React.CSSProperties;
}

/** Small status/label pill — «جديد», «خصم», stock and care cues. */
export function Badge(props: BadgeProps): JSX.Element;
