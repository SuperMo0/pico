import * as React from 'react';

export interface IconButtonProps {
  /** Icon node, e.g. <i data-lucide="shopping-bag" />. */
  icon?: React.ReactNode;
  /** Accessible label (also the tooltip). */
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'solid';
  round?: boolean;
  /** Optional count badge (e.g. cart items). */
  badge?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

/** Icon-only control for header actions and steppers. */
export function IconButton(props: IconButtonProps): JSX.Element;
