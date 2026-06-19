import * as React from 'react';

export interface ChipProps {
  children?: React.ReactNode;
  /** Selected (ink-filled) state. */
  selected?: boolean;
  /** Leading icon node. */
  icon?: React.ReactNode;
  /** Mark as interactive even without onClick. */
  selectable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

/** Pill for filters, tags and reassurance cues. */
export function Chip(props: ChipProps): JSX.Element;
