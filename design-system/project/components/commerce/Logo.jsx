import React from 'react';

/**
 * Beeko Logo — typographic Arabic wordmark (بيكو). No symbol; pure type in
 * Tajawal, with a small sage tittle accent over the kāf. Placeholder mark
 * until a real logo is supplied.
 */
export function Logo({ size = 28, tone = 'ink', tagline = false, style = {} }) {
  const color = tone === 'cream' ? 'var(--cream-50)' : 'var(--ink-900)';
  const accent = tone === 'cream' ? 'var(--sage-200)' : 'var(--sage-600)';

  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1, ...style }}>
      <span style={{
        position: 'relative',
        fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-black)',
        fontSize: size, color, letterSpacing: '-0.01em', direction: 'rtl',
      }}>
        بيكو
        <span style={{
          position: 'absolute', insetInlineStart: -2, top: size * 0.04,
          width: Math.max(5, size * 0.16), height: Math.max(5, size * 0.16),
          background: accent, borderRadius: 'var(--radius-pill)',
        }} />
      </span>
      {tagline && (
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 'var(--fw-medium)',
          fontSize: size * 0.32, color: tone === 'cream' ? 'var(--cream-200)' : 'var(--text-muted)',
          marginTop: size * 0.12, direction: 'rtl',
        }}>ملابس أطفال قطنية</span>
      )}
    </span>
  );
}
