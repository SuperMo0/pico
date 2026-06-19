import React from 'react';

/**
 * Beeko IconButton — square/round icon-only control for header actions
 * (search, cart, account, wishlist) and steppers. Pass a Lucide <i> node.
 */
export function IconButton({
  icon,
  label,
  size = 'md',
  variant = 'ghost',
  round = false,
  badge = null,
  onClick,
  style = {},
  ...rest
}) {
  const dims = { sm: 36, md: 44, lg: 52 }[size] || 44;
  const [hover, setHover] = React.useState(false);

  const variants = {
    ghost: { background: hover ? 'var(--surface-raised)' : 'transparent', border: '1px solid transparent', color: 'var(--ink-700)' },
    outline: { background: hover ? 'var(--surface-raised)' : 'transparent', border: '1px solid var(--border-strong)', color: 'var(--ink-700)' },
    solid: { background: hover ? 'var(--action-primary-hover)' : 'var(--action-primary)', border: '1px solid var(--action-primary)', color: 'var(--action-primary-text)' },
  };
  const v = variants[variant] || variants.ghost;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        width: dims, height: dims,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: round ? 'var(--radius-pill)' : 'var(--radius-md)',
        cursor: 'pointer',
        transition: 'background var(--dur-fast) var(--ease-soft)',
        ...v,
        ...style,
      }}
      {...rest}
    >
      {icon}
      {badge != null && (
        <span style={{
          position: 'absolute', top: 4, insetInlineStart: 4,
          minWidth: 18, height: 18, padding: '0 5px',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--ink-900)', color: 'var(--cream-50)',
          fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 'var(--fw-bold)',
          borderRadius: 'var(--radius-pill)', lineHeight: 1,
        }}>{badge}</span>
      )}
    </button>
  );
}
