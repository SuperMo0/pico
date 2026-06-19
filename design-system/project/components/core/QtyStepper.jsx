import React from 'react';

/**
 * Beeko QtyStepper — minus / value / plus control for cart quantities.
 * Hairline pill, ink glyphs. RTL: minus on the right, plus on the left.
 */
export function QtyStepper({ value = 1, min = 1, max = 99, onChange, size = 'md', style = {} }) {
  const dims = { sm: 32, md: 40 }[size] || 40;
  const set = (n) => { const c = Math.max(min, Math.min(max, n)); onChange && onChange(c); };

  const btn = (sym, fn, disabled) => (
    <button type="button" onClick={fn} disabled={disabled} style={{
      width: dims, height: dims, border: 'none', background: 'transparent',
      cursor: disabled ? 'not-allowed' : 'pointer', color: 'var(--ink-700)',
      fontSize: 18, lineHeight: 1, display: 'inline-flex', alignItems: 'center',
      justifyContent: 'center', opacity: disabled ? 0.35 : 1,
      fontFamily: 'var(--font-body)',
    }}>{sym}</button>
  );

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center',
      border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-pill)',
      background: 'var(--white)', ...style,
    }}>
      {btn('−', () => set(value - 1), value <= min)}
      <span style={{
        minWidth: dims, textAlign: 'center', fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)',
      }}>{value}</span>
      {btn('+', () => set(value + 1), value >= max)}
    </div>
  );
}
