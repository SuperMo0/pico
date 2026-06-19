import * as React from 'react';

export interface CardProps {
  children?: React.ReactNode;
  /** CSS padding value. */
  padding?: string;
  /** Enable soft hover-lift. */
  hover?: boolean;
  style?: React.CSSProperties;
}

/** Generic white surface container with warm hairline border. */
export function Card(props: CardProps): JSX.Element;
