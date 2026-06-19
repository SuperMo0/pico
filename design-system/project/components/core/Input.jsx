import React from 'react';

/**
 * Beeko Input — text field with optional label, hint and leading icon.
 * Hairline border, ink focus ring. RTL.
 */
export function Input({
  label,
  hint,
  error,
  icon = null,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      {label && (
        <label htmlFor={inputId} style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)',
          fontWeight: 'var(--fw-medium)', color: 'var(--text-strong)',
        }}>{label}</label>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'var(--white)',
        border: `1px solid ${error ? 'var(--sale-600)' : focus ? 'var(--border-focus)' : 'var(--border-strong)'}`,
        borderRadius: 'var(--radius-md)',
        padding: '0 14px',
        boxShadow: focus && !error ? 'var(--ring)' : 'none',
        transition: 'border-color var(--dur-fast) var(--ease-soft), box-shadow var(--dur-fast) var(--ease-soft)',
      }}>
        {icon && <span style={{ color: 'var(--text-muted)', display: 'inline-flex' }}>{icon}</span>}
        <input
          id={inputId}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)',
            color: 'var(--text-strong)', padding: '13px 0',
            textAlign: 'right', direction: 'rtl',
            ...style,
          }}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--fs-xs)',
          color: error ? 'var(--sale-600)' : 'var(--text-muted)',
        }}>{error || hint}</span>
      )}
    </div>
  );
}
