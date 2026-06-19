import React from 'react';

/**
 * Beeko Chip — pill used as a filter toggle, category tag, or reassurance
 * cue («قطن ١٠٠٪»، «لطيف على البشرة»). Selectable variant flips to ink.
 */
export function Chip({ children, selected = false, icon = null, onClick, selectable = false, style = {} }) {
  const [hover, setHover] = React.useState(false);
  const interactive = selectable || !!onClick;

  let bg = 'var(--white)', fg = 'var(--text-body)', border = 'var(--border-strong)';
  if (selected) { bg = 'var(--ink-900)'; fg = 'var(--cream-50)'; border = 'var(--ink-900)'; }
  else if (hover && interactive) { bg = 'var(--surface-raised)'; }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '8px 14px',
        background: bg, color: fg,
        border: `1px solid ${border}`,
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)',
        fontWeight: 'var(--fw-medium)', lineHeight: 1,
        cursor: interactive ? 'pointer' : 'default',
        transition: 'background var(--dur-fast) var(--ease-soft), color var(--dur-fast) var(--ease-soft), border-color var(--dur-fast) var(--ease-soft)',
        ...style,
      }}
    >
      {icon}
      {children}
    </button>
  );
}
