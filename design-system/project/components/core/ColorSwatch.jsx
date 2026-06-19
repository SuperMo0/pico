import React from 'react';

const SWATCHES = {
  blue: 'var(--pc-blue)', pink: 'var(--pc-pink)', peach: 'var(--pc-peach)',
  mint: 'var(--pc-mint)', sage: 'var(--pc-sage)', lilac: 'var(--pc-lilac)',
  cream: 'var(--pc-cream)', grey: 'var(--pc-grey)',
};

/**
 * Beeko ColorSwatch — selectable product-colorway dot. Shows an ink ring
 * when selected. Use on product cards and the PDP color picker.
 */
export function ColorSwatch({ color = 'blue', selected = false, size = 28, label, onClick, style = {} }) {
  const fill = SWATCHES[color] || color;
  return (
    <button
      type="button"
      aria-label={label || color}
      title={label || color}
      onClick={onClick}
      style={{
        width: size + 8, height: size + 8,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--radius-pill)',
        background: 'transparent',
        border: `1.5px solid ${selected ? 'var(--ink-900)' : 'transparent'}`,
        cursor: 'pointer', padding: 0,
        transition: 'border-color var(--dur-fast) var(--ease-soft)',
        ...style,
      }}
    >
      <span style={{
        width: size, height: size, borderRadius: 'var(--radius-pill)',
        background: fill, border: '1px solid rgba(43,39,33,0.12)',
        display: 'block',
      }} />
    </button>
  );
}
