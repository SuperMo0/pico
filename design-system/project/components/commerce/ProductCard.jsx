import React from 'react';
import { PriceTag } from './PriceTag.jsx';
import { ColorSwatch } from '../core/ColorSwatch.jsx';
import { Badge } from '../core/Badge.jsx';

/**
 * Beeko ProductCard — borderless product tile. Image sits on cream, soft
 * hover-lift, optional second-image crossfade, wishlist heart, colorway dots,
 * name, age range and price. The workhorse of listing pages.
 */
export function ProductCard({
  image, imageAlt = '', hoverImage = null,
  name, ageRange, price, was = null,
  colors = [], badge = null, badgeTone = 'neutral',
  onAdd, onWishlist, wished = false,
  onClick,
  style = {},
}) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', cursor: 'pointer', direction: 'rtl', ...style }}
    >
      {/* Image well */}
      <div style={{
        position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden',
        borderRadius: 'var(--radius-lg)', background: 'var(--cream-100)',
      }}>
        <img src={image} alt={imageAlt || name} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'opacity var(--dur-slow) var(--ease-soft), transform var(--dur-slow) var(--ease-soft)',
          opacity: hover && hoverImage ? 0 : 1,
          transform: hover ? 'scale(1.03)' : 'scale(1)',
        }} />
        {hoverImage && (
          <img src={hoverImage} alt="" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            transition: 'opacity var(--dur-slow) var(--ease-soft)',
            opacity: hover ? 1 : 0,
          }} />
        )}

        {badge && (
          <span style={{ position: 'absolute', top: 12, insetInlineEnd: 12 }}>
            <Badge tone={badgeTone} solid={badgeTone === 'sale'}>{badge}</Badge>
          </span>
        )}

        <button
          type="button"
          aria-label="أضِف إلى المفضّلة"
          onClick={(e) => { e.stopPropagation(); onWishlist && onWishlist(); }}
          style={{
            position: 'absolute', top: 10, insetInlineStart: 10,
            width: 38, height: 38, borderRadius: 'var(--radius-pill)',
            background: 'rgba(252,250,246,0.9)', border: '1px solid var(--border-hairline)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: wished ? 'var(--sale-600)' : 'var(--ink-700)',
          }}
        >
          <i data-lucide="heart" style={{ width: 18, height: 18, fill: wished ? 'var(--sale-600)' : 'none' }} />
        </button>

        {/* Quick add — slides up on hover */}
        <div style={{
          position: 'absolute', insetInline: 10, bottom: 10,
          transform: hover ? 'translateY(0)' : 'translateY(120%)',
          opacity: hover ? 1 : 0,
          transition: 'transform var(--dur-base) var(--ease-soft), opacity var(--dur-base) var(--ease-soft)',
        }}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onAdd && onAdd(); }}
            style={{
              width: '100%', padding: '11px', border: 'none', cursor: 'pointer',
              background: 'var(--ink-900)', color: 'var(--cream-50)',
              fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)',
              borderRadius: 'var(--radius-md)',
            }}
          >أضِف إلى السلّة</button>
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {colors.length > 0 && (
          <div style={{ display: 'flex', gap: 2, marginInlineStart: -4 }}>
            {colors.slice(0, 6).map((c, i) => (
              <ColorSwatch key={i} color={c} size={16} />
            ))}
          </div>
        )}
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-medium)', color: 'var(--text-strong)' }}>
          {name}
        </div>
        {ageRange && (
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{ageRange}</div>
        )}
        <PriceTag price={price} was={was} />
      </div>
    </div>
  );
}
