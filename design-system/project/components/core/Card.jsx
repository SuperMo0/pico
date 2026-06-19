import React from 'react';

/**
 * Beeko Card — white surface with warm hairline border, gentle radius,
 * optional soft hover-lift. The generic container primitive.
 */
export function Card({ children, padding = 'var(--space-5)', hover = false, style = {}, ...rest }) {
  const [h, setH] = React.useState(false);
  return (
    <div
      onMouseEnter={() => hover && setH(true)}
      onMouseLeave={() => hover && setH(false)}
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-hairline)',
        borderRadius: 'var(--radius-card)',
        padding,
        boxShadow: h ? 'var(--shadow-md)' : 'var(--shadow-none)',
        transform: h ? 'translateY(-2px)' : 'none',
        transition: 'box-shadow var(--dur-base) var(--ease-soft), transform var(--dur-base) var(--ease-soft)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
