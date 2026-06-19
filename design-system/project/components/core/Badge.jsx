import React from 'react';

/**
 * Beeko Badge — small status/label pill. Tones map to semantic colors.
 * Use for «جديد»، «خصم»، «قطن ١٠٠٪», stock states.
 */
export function Badge({ children, tone = 'neutral', solid = false, style = {} }) {
  const tones = {
    neutral: { soft: ['var(--cream-200)', 'var(--ink-700)'], solid: ['var(--ink-900)', 'var(--cream-50)'] },
    sage:    { soft: ['var(--sage-100)', 'var(--sage-700)'], solid: ['var(--sage-600)', 'var(--white)'] },
    sale:    { soft: ['var(--sale-100)', 'var(--sale-600)'], solid: ['var(--sale-600)', 'var(--white)'] },
    success: { soft: ['var(--success-100)', 'var(--success-600)'], solid: ['var(--success-600)', 'var(--white)'] },
    info:    { soft: ['var(--info-100)', 'var(--info-600)'], solid: ['var(--info-600)', 'var(--white)'] },
  };
  const [bg, fg] = (tones[tone] || tones.neutral)[solid ? 'solid' : 'soft'];

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px',
      background: bg, color: fg,
      fontFamily: 'var(--font-body)', fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)', lineHeight: 1.4,
      borderRadius: 'var(--radius-pill)',
      ...style,
    }}>{children}</span>
  );
}
