import React from 'react';

/**
 * Beeko PriceTag — price with optional strikethrough original (sale).
 * Currency «ر.س» as text. Arabic numerals optional via children-formatted value.
 */
export function PriceTag({ price, was = null, currency = 'ر.س', size = 'md', style = {} }) {
  const fs = { sm: 'var(--fs-sm)', md: 'var(--fs-body-lg)', lg: 'var(--fs-h3)' }[size] || 'var(--fs-body-lg)';
  const onSale = was != null;

  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8, direction: 'rtl', ...style }}>
      <span style={{
        fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-bold)',
        fontSize: fs, color: onSale ? 'var(--text-sale)' : 'var(--text-strong)',
      }}>
        {price} <span style={{ fontSize: '0.7em', fontWeight: 'var(--fw-medium)' }}>{currency}</span>
      </span>
      {onSale && (
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: '0.82em',
          color: 'var(--text-muted)', textDecoration: 'line-through',
        }}>{was} {currency}</span>
      )}
    </span>
  );
}
