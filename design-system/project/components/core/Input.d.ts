import * as React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label?: string;
  hint?: string;
  error?: string;
  /** Leading icon node, e.g. <i data-lucide="search" />. */
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Text input with label, hint/error and optional leading icon. */
export function Input(props: InputProps): JSX.Element;
