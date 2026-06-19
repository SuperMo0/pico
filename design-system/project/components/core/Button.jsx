import React from 'react';

/**
 * Beeko Button — warm-ink primary, sage/outline/ghost secondaries.
 * Calm hover (darken), gentle press (scale 0.98). RTL-native.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  iconStart = null,
  iconEnd = null,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '8px 16px', fontSize: 'var(--fs-sm)', radius: 'var(--radius-sm)', gap: '6px' },
    md: { padding: '12px 24px', fontSize: 'var(--fs-body)', radius: 'var(--radius-md)', gap: '8px' },
    lg: { padding: '16px 32px', fontSize: 'var(--fs-body-lg)', radius: 'var(--radius-md)', gap: '10px' },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: {
      background: 'var(--action-primary)',
      color: 'var(--action-primary-text)',
      border: '1px solid var(--action-primary)',
    },
    accent: {
      background: 'var(--action-accent)',
      color: 'var(--action-accent-text)',
      border: '1px solid var(--action-accent)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-strong)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: '1px solid transparent',
    },
  };
  const v = variants[variant] || variants.primary;

  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);

  const hoverBg = {
    primary: 'var(--action-primary-hover)',
    accent: 'var(--action-accent-hover)',
    outline: 'var(--surface-raised)',
    ghost: 'var(--surface-raised)',
  }[variant];

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: block ? 'flex' : 'inline-flex',
        width: block ? '100%' : 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        padding: s.padding,
        fontSize: s.fontSize,
        fontFamily: 'var(--font-body)',
        fontWeight: 'var(--fw-semibold)',
        lineHeight: 1,
        borderRadius: s.radius,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'background var(--dur-fast) var(--ease-soft), transform var(--dur-fast) var(--ease-soft)',
        transform: press && !disabled ? 'scale(0.98)' : 'scale(1)',
        background: hover && !disabled ? hoverBg : v.background,
        color: v.color,
        border: v.border,
        ...style,
      }}
      {...rest}
    >
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
}
