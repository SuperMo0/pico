import * as React from 'react';

export interface QtyStepperProps {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

/** Minus / value / plus quantity control for cart rows. */
export function QtyStepper(props: QtyStepperProps): JSX.Element;
