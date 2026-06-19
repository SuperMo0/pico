/* @ds-bundle: {"format":3,"namespace":"BeekoDesignSystem_e717fe","components":[{"name":"Logo","sourcePath":"components/commerce/Logo.jsx"},{"name":"PriceTag","sourcePath":"components/commerce/PriceTag.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"ColorSwatch","sourcePath":"components/core/ColorSwatch.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"QtyStepper","sourcePath":"components/core/QtyStepper.jsx"}],"sourceHashes":{"components/commerce/Logo.jsx":"f1b208077956","components/commerce/PriceTag.jsx":"b9b43605fcf0","components/commerce/ProductCard.jsx":"7e2cf67ed496","components/core/Badge.jsx":"d00e88d14665","components/core/Button.jsx":"91b0e60ccb24","components/core/Card.jsx":"b4218a99ce7e","components/core/Chip.jsx":"b8452a7f53b1","components/core/ColorSwatch.jsx":"4678975bf269","components/core/IconButton.jsx":"94bbc9b67caa","components/core/Input.jsx":"b00c45d8af3a","components/core/QtyStepper.jsx":"ba60c0ac61c6","ui_kits/storefront/App.jsx":"7f0520eef066","ui_kits/storefront/CartDrawer.jsx":"6475f37df682","ui_kits/storefront/Footer.jsx":"90857d152c98","ui_kits/storefront/Header.jsx":"dc10c1b5cd5a","ui_kits/storefront/Home.jsx":"61cec048c066","ui_kits/storefront/Listing.jsx":"05474e5eacad","ui_kits/storefront/Product.jsx":"ef7f84dd71ea","ui_kits/storefront/data.js":"e89c0a1a5a07"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BeekoDesignSystem_e717fe = window.BeekoDesignSystem_e717fe || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/commerce/Logo.jsx
try { (() => {
/**
 * Beeko Logo — typographic Arabic wordmark (بيكو). No symbol; pure type in
 * Tajawal, with a small sage tittle accent over the kāf. Placeholder mark
 * until a real logo is supplied.
 */
function Logo({
  size = 28,
  tone = 'ink',
  tagline = false,
  style = {}
}) {
  const color = tone === 'cream' ? 'var(--cream-50)' : 'var(--ink-900)';
  const accent = tone === 'cream' ? 'var(--sage-200)' : 'var(--sage-600)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      lineHeight: 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-black)',
      fontSize: size,
      color,
      letterSpacing: '-0.01em',
      direction: 'rtl'
    }
  }, "\u0628\u064A\u0643\u0648", /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      insetInlineStart: -2,
      top: size * 0.04,
      width: Math.max(5, size * 0.16),
      height: Math.max(5, size * 0.16),
      background: accent,
      borderRadius: 'var(--radius-pill)'
    }
  })), tagline && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-medium)',
      fontSize: size * 0.32,
      color: tone === 'cream' ? 'var(--cream-200)' : 'var(--text-muted)',
      marginTop: size * 0.12,
      direction: 'rtl'
    }
  }, "\u0645\u0644\u0627\u0628\u0633 \u0623\u0637\u0641\u0627\u0644 \u0642\u0637\u0646\u064A\u0629"));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/Logo.jsx", error: String((e && e.message) || e) }); }

// components/commerce/PriceTag.jsx
try { (() => {
/**
 * Beeko PriceTag — price with optional strikethrough original (sale).
 * Currency «ر.س» as text. Arabic numerals optional via children-formatted value.
 */
function PriceTag({
  price,
  was = null,
  currency = 'ر.س',
  size = 'md',
  style = {}
}) {
  const fs = {
    sm: 'var(--fs-sm)',
    md: 'var(--fs-body-lg)',
    lg: 'var(--fs-h3)'
  }[size] || 'var(--fs-body-lg)';
  const onSale = was != null;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 8,
      direction: 'rtl',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-bold)',
      fontSize: fs,
      color: onSale ? 'var(--text-sale)' : 'var(--text-strong)'
    }
  }, price, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.7em',
      fontWeight: 'var(--fw-medium)'
    }
  }, currency)), onSale && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '0.82em',
      color: 'var(--text-muted)',
      textDecoration: 'line-through'
    }
  }, was, " ", currency));
}
Object.assign(__ds_scope, { PriceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/PriceTag.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/**
 * Beeko Badge — small status/label pill. Tones map to semantic colors.
 * Use for «جديد»، «خصم»، «قطن ١٠٠٪», stock states.
 */
function Badge({
  children,
  tone = 'neutral',
  solid = false,
  style = {}
}) {
  const tones = {
    neutral: {
      soft: ['var(--cream-200)', 'var(--ink-700)'],
      solid: ['var(--ink-900)', 'var(--cream-50)']
    },
    sage: {
      soft: ['var(--sage-100)', 'var(--sage-700)'],
      solid: ['var(--sage-600)', 'var(--white)']
    },
    sale: {
      soft: ['var(--sale-100)', 'var(--sale-600)'],
      solid: ['var(--sale-600)', 'var(--white)']
    },
    success: {
      soft: ['var(--success-100)', 'var(--success-600)'],
      solid: ['var(--success-600)', 'var(--white)']
    },
    info: {
      soft: ['var(--info-100)', 'var(--info-600)'],
      solid: ['var(--info-600)', 'var(--white)']
    }
  };
  const [bg, fg] = (tones[tone] || tones.neutral)[solid ? 'solid' : 'soft'];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 10px',
      background: bg,
      color: fg,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      lineHeight: 1.4,
      borderRadius: 'var(--radius-pill)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Beeko Button — warm-ink primary, sage/outline/ghost secondaries.
 * Calm hover (darken), gentle press (scale 0.98). RTL-native.
 */
function Button({
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
    sm: {
      padding: '8px 16px',
      fontSize: 'var(--fs-sm)',
      radius: 'var(--radius-sm)',
      gap: '6px'
    },
    md: {
      padding: '12px 24px',
      fontSize: 'var(--fs-body)',
      radius: 'var(--radius-md)',
      gap: '8px'
    },
    lg: {
      padding: '16px 32px',
      fontSize: 'var(--fs-body-lg)',
      radius: 'var(--radius-md)',
      gap: '10px'
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'var(--action-primary)',
      color: 'var(--action-primary-text)',
      border: '1px solid var(--action-primary)'
    },
    accent: {
      background: 'var(--action-accent)',
      color: 'var(--action-accent-text)',
      border: '1px solid var(--action-accent)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: '1px solid transparent'
    }
  };
  const v = variants[variant] || variants.primary;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const hoverBg = {
    primary: 'var(--action-primary-hover)',
    accent: 'var(--action-accent-hover)',
    outline: 'var(--surface-raised)',
    ghost: 'var(--surface-raised)'
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
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
      ...style
    }
  }, rest), iconStart, children, iconEnd);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Beeko Card — white surface with warm hairline border, gentle radius,
 * optional soft hover-lift. The generic container primitive.
 */
function Card({
  children,
  padding = 'var(--space-5)',
  hover = false,
  style = {},
  ...rest
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => hover && setH(true),
    onMouseLeave: () => hover && setH(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-card)',
      padding,
      boxShadow: h ? 'var(--shadow-md)' : 'var(--shadow-none)',
      transform: h ? 'translateY(-2px)' : 'none',
      transition: 'box-shadow var(--dur-base) var(--ease-soft), transform var(--dur-base) var(--ease-soft)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
/**
 * Beeko Chip — pill used as a filter toggle, category tag, or reassurance
 * cue («قطن ١٠٠٪»، «لطيف على البشرة»). Selectable variant flips to ink.
 */
function Chip({
  children,
  selected = false,
  icon = null,
  onClick,
  selectable = false,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const interactive = selectable || !!onClick;
  let bg = 'var(--white)',
    fg = 'var(--text-body)',
    border = 'var(--border-strong)';
  if (selected) {
    bg = 'var(--ink-900)';
    fg = 'var(--cream-50)';
    border = 'var(--ink-900)';
  } else if (hover && interactive) {
    bg = 'var(--surface-raised)';
  }
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '8px 14px',
      background: bg,
      color: fg,
      border: `1px solid ${border}`,
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-medium)',
      lineHeight: 1,
      cursor: interactive ? 'pointer' : 'default',
      transition: 'background var(--dur-fast) var(--ease-soft), color var(--dur-fast) var(--ease-soft), border-color var(--dur-fast) var(--ease-soft)',
      ...style
    }
  }, icon, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/ColorSwatch.jsx
try { (() => {
const SWATCHES = {
  blue: 'var(--pc-blue)',
  pink: 'var(--pc-pink)',
  peach: 'var(--pc-peach)',
  mint: 'var(--pc-mint)',
  sage: 'var(--pc-sage)',
  lilac: 'var(--pc-lilac)',
  cream: 'var(--pc-cream)',
  grey: 'var(--pc-grey)'
};

/**
 * Beeko ColorSwatch — selectable product-colorway dot. Shows an ink ring
 * when selected. Use on product cards and the PDP color picker.
 */
function ColorSwatch({
  color = 'blue',
  selected = false,
  size = 28,
  label,
  onClick,
  style = {}
}) {
  const fill = SWATCHES[color] || color;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": label || color,
    title: label || color,
    onClick: onClick,
    style: {
      width: size + 8,
      height: size + 8,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-pill)',
      background: 'transparent',
      border: `1.5px solid ${selected ? 'var(--ink-900)' : 'transparent'}`,
      cursor: 'pointer',
      padding: 0,
      transition: 'border-color var(--dur-fast) var(--ease-soft)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--radius-pill)',
      background: fill,
      border: '1px solid rgba(43,39,33,0.12)',
      display: 'block'
    }
  }));
}
Object.assign(__ds_scope, { ColorSwatch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ColorSwatch.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
/**
 * Beeko ProductCard — borderless product tile. Image sits on cream, soft
 * hover-lift, optional second-image crossfade, wishlist heart, colorway dots,
 * name, age range and price. The workhorse of listing pages.
 */
function ProductCard({
  image,
  imageAlt = '',
  hoverImage = null,
  name,
  ageRange,
  price,
  was = null,
  colors = [],
  badge = null,
  badgeTone = 'neutral',
  onAdd,
  onWishlist,
  wished = false,
  onClick,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      cursor: 'pointer',
      direction: 'rtl',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '4 / 5',
      overflow: 'hidden',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--cream-100)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: imageAlt || name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'opacity var(--dur-slow) var(--ease-soft), transform var(--dur-slow) var(--ease-soft)',
      opacity: hover && hoverImage ? 0 : 1,
      transform: hover ? 'scale(1.03)' : 'scale(1)'
    }
  }), hoverImage && /*#__PURE__*/React.createElement("img", {
    src: hoverImage,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'opacity var(--dur-slow) var(--ease-soft)',
      opacity: hover ? 1 : 0
    }
  }), badge && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 12,
      insetInlineEnd: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: badgeTone,
    solid: badgeTone === 'sale'
  }, badge)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "\u0623\u0636\u0650\u0641 \u0625\u0644\u0649 \u0627\u0644\u0645\u0641\u0636\u0651\u0644\u0629",
    onClick: e => {
      e.stopPropagation();
      onWishlist && onWishlist();
    },
    style: {
      position: 'absolute',
      top: 10,
      insetInlineStart: 10,
      width: 38,
      height: 38,
      borderRadius: 'var(--radius-pill)',
      background: 'rgba(252,250,246,0.9)',
      border: '1px solid var(--border-hairline)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: wished ? 'var(--sale-600)' : 'var(--ink-700)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "heart",
    style: {
      width: 18,
      height: 18,
      fill: wished ? 'var(--sale-600)' : 'none'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      insetInline: 10,
      bottom: 10,
      transform: hover ? 'translateY(0)' : 'translateY(120%)',
      opacity: hover ? 1 : 0,
      transition: 'transform var(--dur-base) var(--ease-soft), opacity var(--dur-base) var(--ease-soft)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onAdd && onAdd();
    },
    style: {
      width: '100%',
      padding: '11px',
      border: 'none',
      cursor: 'pointer',
      background: 'var(--ink-900)',
      color: 'var(--cream-50)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-semibold)',
      borderRadius: 'var(--radius-md)'
    }
  }, "\u0623\u0636\u0650\u0641 \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0651\u0629"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, colors.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2,
      marginInlineStart: -4
    }
  }, colors.slice(0, 6).map((c, i) => /*#__PURE__*/React.createElement(__ds_scope.ColorSwatch, {
    key: i,
    color: c,
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-body)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-strong)'
    }
  }, name), ageRange && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-muted)'
    }
  }, ageRange), /*#__PURE__*/React.createElement(__ds_scope.PriceTag, {
    price: price,
    was: was
  })));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Beeko IconButton — square/round icon-only control for header actions
 * (search, cart, account, wishlist) and steppers. Pass a Lucide <i> node.
 */
function IconButton({
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
  const dims = {
    sm: 36,
    md: 44,
    lg: 52
  }[size] || 44;
  const [hover, setHover] = React.useState(false);
  const variants = {
    ghost: {
      background: hover ? 'var(--surface-raised)' : 'transparent',
      border: '1px solid transparent',
      color: 'var(--ink-700)'
    },
    outline: {
      background: hover ? 'var(--surface-raised)' : 'transparent',
      border: '1px solid var(--border-strong)',
      color: 'var(--ink-700)'
    },
    solid: {
      background: hover ? 'var(--action-primary-hover)' : 'var(--action-primary)',
      border: '1px solid var(--action-primary)',
      color: 'var(--action-primary-text)'
    }
  };
  const v = variants[variant] || variants.ghost;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      width: dims,
      height: dims,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: round ? 'var(--radius-pill)' : 'var(--radius-md)',
      cursor: 'pointer',
      transition: 'background var(--dur-fast) var(--ease-soft)',
      ...v,
      ...style
    }
  }, rest), icon, badge != null && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 4,
      insetInlineStart: 4,
      minWidth: 18,
      height: 18,
      padding: '0 5px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--ink-900)',
      color: 'var(--cream-50)',
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      fontWeight: 'var(--fw-bold)',
      borderRadius: 'var(--radius-pill)',
      lineHeight: 1
    }
  }, badge));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Beeko Input — text field with optional label, hint and leading icon.
 * Hairline border, ink focus ring. RTL.
 */
function Input({
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
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-strong)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--white)',
      border: `1px solid ${error ? 'var(--sale-600)' : focus ? 'var(--border-focus)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-md)',
      padding: '0 14px',
      boxShadow: focus && !error ? 'var(--ring)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-soft), box-shadow var(--dur-fast) var(--ease-soft)'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      display: 'inline-flex'
    }
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-body)',
      color: 'var(--text-strong)',
      padding: '13px 0',
      textAlign: 'right',
      direction: 'rtl',
      ...style
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-xs)',
      color: error ? 'var(--sale-600)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/QtyStepper.jsx
try { (() => {
/**
 * Beeko QtyStepper — minus / value / plus control for cart quantities.
 * Hairline pill, ink glyphs. RTL: minus on the right, plus on the left.
 */
function QtyStepper({
  value = 1,
  min = 1,
  max = 99,
  onChange,
  size = 'md',
  style = {}
}) {
  const dims = {
    sm: 32,
    md: 40
  }[size] || 40;
  const set = n => {
    const c = Math.max(min, Math.min(max, n));
    onChange && onChange(c);
  };
  const btn = (sym, fn, disabled) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: fn,
    disabled: disabled,
    style: {
      width: dims,
      height: dims,
      border: 'none',
      background: 'transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: 'var(--ink-700)',
      fontSize: 18,
      lineHeight: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.35 : 1,
      fontFamily: 'var(--font-body)'
    }
  }, sym);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--white)',
      ...style
    }
  }, btn('−', () => set(value - 1), value <= min), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: dims,
      textAlign: 'center',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-body)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-strong)'
    }
  }, value), btn('+', () => set(value + 1), value >= max));
}
Object.assign(__ds_scope, { QtyStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/QtyStepper.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/App.jsx
try { (() => {
// Beeko storefront — app shell & navigation state.
(function () {
  const {
    Header,
    Footer,
    Home,
    Listing,
    Product,
    CartDrawer
  } = window.BEEKO;
  const PRODUCTS = window.BEEKO.PRODUCTS;
  const CATEGORIES = window.BEEKO.CATEGORIES;
  const COLOR_LABELS = {
    blue: 'أزرق',
    pink: 'وردي',
    peach: 'مشمشي',
    mint: 'نعناعي',
    sage: 'زيتي',
    lilac: 'بنفسجي',
    cream: 'بيج',
    grey: 'رمادي'
  };
  const CAT_TITLES = {
    home: 'الرئيسية',
    newborn: 'حديثو الولادة',
    tops: 'البلوزات',
    bottoms: 'البناطيل',
    sets: 'الأطقم',
    sale: 'تخفيضات'
  };
  function catProducts(cat) {
    if (cat === 'sale') return PRODUCTS.filter(p => p.was);
    if (cat === 'newborn') return PRODUCTS.filter(p => p.ageRange.indexOf('أشهر') > -1);
    if (['tops', 'bottoms', 'sets'].includes(cat)) return PRODUCTS.filter(p => p.cat === cat);
    return PRODUCTS;
  }
  function App() {
    const [view, setView] = React.useState({
      name: 'home'
    });
    const [cartOpen, setCartOpen] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const nav = id => {
      window.scrollTo({
        top: 0
      });
      if (id === 'home') setView({
        name: 'home'
      });else setView({
        name: 'listing',
        cat: id
      });
    };
    const openProduct = p => {
      window.scrollTo({
        top: 0
      });
      setView({
        name: 'product',
        product: p
      });
    };
    const add = (p, opts) => {
      const o = opts || {
        color: p.colors[0],
        size: p.ageRange,
        qty: 1
      };
      const key = p.id + '|' + o.color + '|' + o.size;
      setItems(prev => {
        const ex = prev.find(it => it.key === key);
        if (ex) return prev.map(it => it.key === key ? {
          ...it,
          qty: it.qty + o.qty
        } : it);
        return [...prev, {
          key,
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.image,
          size: o.size,
          color: o.color,
          colorLabel: COLOR_LABELS[o.color] || o.color,
          qty: o.qty
        }];
      });
      setCartOpen(true);
    };
    const setQty = (key, q) => setItems(prev => prev.map(it => it.key === key ? {
      ...it,
      qty: q
    } : it));
    const remove = key => setItems(prev => prev.filter(it => it.key !== key));
    const count = items.reduce((s, it) => s + it.qty, 0);
    const active = view.name === 'home' ? 'home' : view.name === 'listing' ? view.cat : '';
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, {
      onNav: nav,
      onCart: () => setCartOpen(true),
      cartCount: count,
      active: active
    }), view.name === 'home' && /*#__PURE__*/React.createElement(Home, {
      products: PRODUCTS,
      categories: CATEGORIES,
      onProduct: openProduct,
      onAdd: add,
      onNav: nav
    }), view.name === 'listing' && /*#__PURE__*/React.createElement(Listing, {
      products: catProducts(view.cat),
      title: CAT_TITLES[view.cat] || 'المنتجات',
      onProduct: openProduct,
      onAdd: add
    }), view.name === 'product' && /*#__PURE__*/React.createElement(Product, {
      product: view.product,
      onAdd: add,
      onNav: nav
    }), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(CartDrawer, {
      open: cartOpen,
      items: items,
      onClose: () => setCartOpen(false),
      onQty: setQty,
      onRemove: remove
    }));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
  setTimeout(() => window.lucide && window.lucide.createIcons(), 80);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/CartDrawer.jsx
try { (() => {
// Beeko storefront — slide-in cart drawer.
(function () {
  const NS = window.BeekoDesignSystem_e717fe;
  const {
    Button,
    QtyStepper,
    PriceTag
  } = NS;
  const P = '../../assets/products/';
  const num = s => Number(String(s).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
  const ar = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[+d]);
  function CartDrawer({
    open,
    items,
    onClose,
    onQty,
    onRemove
  }) {
    const ic = (n, s) => React.createElement('i', {
      'data-lucide': n,
      style: {
        width: 20,
        height: 20,
        ...s
      }
    });
    React.useEffect(() => {
      window.lucide && window.lucide.createIcons();
    });
    const subtotal = items.reduce((s, it) => s + num(it.price) * it.qty, 0);
    const FREE = 200;
    const remain = Math.max(0, FREE - subtotal);
    const pct = Math.min(100, subtotal / FREE * 100);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      onClick: onClose,
      style: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(43,39,33,0.32)',
        zIndex: 90,
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity var(--dur-base) var(--ease-soft)'
      }
    }), /*#__PURE__*/React.createElement("aside", {
      style: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        insetInlineStart: 0,
        width: 420,
        maxWidth: '92vw',
        zIndex: 100,
        background: 'var(--surface-page)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform var(--dur-base) var(--ease-soft)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-5)',
        borderBottom: '1px solid var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--fs-h3)'
      }
    }, "\u0633\u0644\u0651\u062A\u0643 (", ar(items.length), ")"), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      "aria-label": "\u0625\u063A\u0644\u0627\u0642",
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--ink-700)',
        display: 'inline-flex'
      }
    }, ic('x'))), items.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-6)',
        color: 'var(--text-muted)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ink-300)'
      }
    }, ic('shopping-bag', {
      width: 40,
      height: 40
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0
      }
    }, "\u0633\u0644\u0651\u062A\u0643 \u0641\u0627\u0631\u063A\u0629 \u0627\u0644\u0622\u0646."), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      onClick: onClose
    }, "\u062A\u0627\u0628\u0639\u064A \u0627\u0644\u062A\u0633\u0648\u0651\u0642")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 'var(--space-4) var(--space-5)',
        background: 'var(--surface-sunken)',
        borderBottom: '1px solid var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-xs)',
        color: 'var(--ink-700)',
        marginBottom: 8
      }
    }, remain > 0 ? /*#__PURE__*/React.createElement("span", null, "\u0623\u0636\u0650\u0641 ", /*#__PURE__*/React.createElement("b", null, ar(remain), " \u0631.\u0633"), " \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0634\u062D\u0646 \u0645\u062C\u0627\u0646\u064A") : /*#__PURE__*/React.createElement("span", null, "\u0631\u0627\u0626\u0639 \u2014 \u062D\u0635\u0644\u062A\u0650 \u0639\u0644\u0649 \u0627\u0644\u0634\u062D\u0646 \u0627\u0644\u0645\u062C\u0627\u0646\u064A.")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        borderRadius: 'var(--radius-pill)',
        background: 'var(--sand-200)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: pct + '%',
        height: '100%',
        background: 'var(--sage-600)',
        transition: 'width var(--dur-base) var(--ease-soft)'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: 'auto',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)'
      }
    }, items.map(it => /*#__PURE__*/React.createElement("div", {
      key: it.key,
      style: {
        display: 'flex',
        gap: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 78,
        height: 96,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        background: 'var(--cream-100)',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: P + it.image,
      alt: it.name,
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: 'var(--fs-sm)',
        color: 'var(--ink-900)'
      }
    }, it.name), /*#__PURE__*/React.createElement("button", {
      onClick: () => onRemove(it.key),
      "aria-label": "\u062D\u0630\u0641",
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--ink-500)',
        display: 'inline-flex',
        height: 'fit-content'
      }
    }, ic('trash-2', {
      width: 16,
      height: 16
    }))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-xs)',
        color: 'var(--text-muted)',
        marginTop: 2
      }
    }, it.size, " \xB7 ", it.colorLabel), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(QtyStepper, {
      size: "sm",
      value: it.qty,
      onChange: q => onQty(it.key, q)
    }), /*#__PURE__*/React.createElement(PriceTag, {
      price: ar(num(it.price) * it.qty),
      size: "sm"
    })))))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 'var(--space-5)',
        borderTop: '1px solid var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--fs-h4)'
      }
    }, "\u0627\u0644\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0641\u0631\u0639\u064A"), /*#__PURE__*/React.createElement(PriceTag, {
      price: ar(subtotal),
      size: "md"
    })), /*#__PURE__*/React.createElement(Button, {
      block: true,
      size: "lg"
    }, "\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u0634\u0631\u0627\u0621"), /*#__PURE__*/React.createElement("p", {
      style: {
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-xs)',
        color: 'var(--text-muted)',
        margin: '12px 0 0'
      }
    }, "\u0627\u0644\u0636\u0631\u064A\u0628\u0629 \u0648\u0627\u0644\u0634\u062D\u0646 \u062A\u064F\u062D\u062A\u0633\u0628 \u0639\u0646\u062F \u0627\u0644\u062F\u0641\u0639.")))));
  }
  window.BEEKO = window.BEEKO || {};
  window.BEEKO.CartDrawer = CartDrawer;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/CartDrawer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Footer.jsx
try { (() => {
// Beeko storefront — footer (ink band, cream logo).
(function () {
  const NS = window.BeekoDesignSystem_e717fe;
  const {
    Logo,
    Button,
    Input
  } = NS;
  const COLS = [{
    h: 'تسوّقي',
    links: ['حديثو الولادة', 'البلوزات', 'البناطيل', 'الأطقم', 'تخفيضات']
  }, {
    h: 'المساعدة',
    links: ['دليل القياسات', 'الشحن والتوصيل', 'الإرجاع والاستبدال', 'العناية بالقطن', 'تواصلي معنا']
  }, {
    h: 'عن بيكو',
    links: ['قصتنا', 'جودة القطن', 'الاستدامة', 'فروعنا']
  }];
  function Footer() {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        background: 'var(--ink-900)',
        color: 'var(--cream-200)',
        marginTop: 'var(--space-12)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: 'var(--space-10) var(--space-5) var(--space-7)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
        gap: 'var(--space-7)'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
      size: 28,
      tone: "cream",
      tagline: true
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-sm)',
        lineHeight: 1.8,
        color: 'var(--cream-200)',
        marginTop: 'var(--space-4)',
        maxWidth: '34ch'
      }
    }, "\u0645\u0644\u0627\u0628\u0633 \u0645\u0646\u0632\u0644\u064A\u0629 \u0642\u0637\u0646\u064A\u0629 \u0644\u0644\u0623\u0637\u0641\u0627\u0644\u060C \u0628\u0623\u0644\u0648\u0627\u0646 \u0647\u0627\u062F\u0626\u0629 \u0648\u062E\u0627\u0645\u0627\u062A \u0644\u0637\u064A\u0641\u0629 \u0639\u0644\u0649 \u0627\u0644\u0628\u0634\u0631\u0629. \u0635\u064F\u0646\u0639\u062A \u0644\u062A\u062F\u0648\u0645 \u0646\u0627\u0639\u0645\u0629.")), COLS.map(c => /*#__PURE__*/React.createElement("div", {
      key: c.h
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--fs-h4)',
        color: 'var(--cream-50)',
        marginBottom: 'var(--space-4)'
      }
    }, c.h), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, c.links.map(l => /*#__PURE__*/React.createElement("li", {
      key: l
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-sm)',
        color: 'var(--cream-200)'
      }
    }, l))))))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'var(--space-8)',
        paddingTop: 'var(--space-5)',
        borderTop: '1px solid rgba(252,250,246,0.14)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 'var(--space-5)',
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-xs)',
        color: 'var(--cream-200)'
      }
    }, "\xA9 \u0662\u0660\u0662\u0666 \u0628\u064A\u0643\u0648 \u2014 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629."), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-xs)',
        color: 'var(--cream-200)'
      }
    }, "\u0642\u0637\u0646 \u0661\u0660\u0660\u066A \xB7 \u0634\u062D\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \xB7 \u062F\u0641\u0639 \u0622\u0645\u0646"))));
  }
  window.BEEKO = window.BEEKO || {};
  window.BEEKO.Footer = Footer;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Header.jsx
try { (() => {
// Beeko storefront — sticky header. Uses Logo + IconButton from the bundle.
(function () {
  const NS = window.BeekoDesignSystem_e717fe;
  const {
    Logo,
    IconButton
  } = NS;
  const NAV = [{
    id: 'home',
    label: 'الرئيسية'
  }, {
    id: 'newborn',
    label: 'حديثو الولادة'
  }, {
    id: 'tops',
    label: 'البلوزات'
  }, {
    id: 'bottoms',
    label: 'البناطيل'
  }, {
    id: 'sets',
    label: 'الأطقم'
  }, {
    id: 'sale',
    label: 'تخفيضات'
  }];
  function Header({
    onNav,
    onCart,
    cartCount = 0,
    active = 'home'
  }) {
    const ic = n => React.createElement('i', {
      'data-lucide': n,
      style: {
        width: 20,
        height: 20
      }
    });
    React.useEffect(() => {
      window.lucide && window.lucide.createIcons();
    });
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(252,250,246,0.94)',
        backdropFilter: 'saturate(120%) blur(6px)',
        borderBottom: '1px solid var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--ink-900)',
        color: 'var(--cream-50)',
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-xs)',
        padding: '7px 16px',
        fontWeight: 500
      }
    }, "\u0634\u062D\u0646 \u0645\u062C\u0627\u0646\u064A \u0644\u0644\u0637\u0644\u0628\u0627\u062A \u0641\u0648\u0642 \u0662\u0660\u0660 \u0631.\u0633 \xB7 \u0625\u0631\u062C\u0627\u0639 \u0633\u0647\u0644 \u062E\u0644\u0627\u0644 \u0661\u0664 \u064A\u0648\u0645\u064B\u0627"), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: '0 var(--space-5)',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-6)'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNav('home');
      },
      style: {
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      size: 26
    })), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        gap: 'var(--space-5)',
        flex: 1
      }
    }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
      key: n.id,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNav(n.id);
      },
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-sm)',
        fontWeight: active === n.id ? 700 : 500,
        color: active === n.id ? 'var(--ink-900)' : 'var(--ink-700)',
        paddingBottom: 2,
        borderBottom: active === n.id ? '2px solid var(--ink-900)' : '2px solid transparent'
      }
    }, n.label))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      icon: ic('search'),
      label: "\u0628\u062D\u062B"
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: ic('heart'),
      label: "\u0627\u0644\u0645\u0641\u0636\u0651\u0644\u0629"
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: ic('user'),
      label: "\u062D\u0633\u0627\u0628\u064A"
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: ic('shopping-bag'),
      label: "\u0627\u0644\u0633\u0644\u0651\u0629",
      badge: cartCount || null,
      onClick: onCart
    }))));
  }
  window.BEEKO = window.BEEKO || {};
  window.BEEKO.Header = Header;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Home.jsx
try { (() => {
// Beeko storefront — home page.
(function () {
  const NS = window.BeekoDesignSystem_e717fe;
  const {
    Button,
    Chip,
    ProductCard
  } = NS;
  const P = '../../assets/products/';
  const REASSURE = [{
    i: 'leaf',
    t: 'قطن ١٠٠٪'
  }, {
    i: 'feather',
    t: 'لطيف على البشرة'
  }, {
    i: 'truck',
    t: 'شحن مجاني فوق ٢٠٠ ر.س'
  }, {
    i: 'refresh-ccw',
    t: 'إرجاع سهل ١٤ يومًا'
  }];
  function Home({
    products,
    categories,
    onProduct,
    onAdd,
    onNav
  }) {
    const ic = (n, s) => React.createElement('i', {
      'data-lucide': n,
      style: {
        width: 18,
        height: 18,
        ...s
      }
    });
    React.useEffect(() => {
      window.lucide && window.lucide.createIcons();
    });
    const wrap = {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--space-5)'
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-8)',
        alignItems: 'center',
        padding: 'var(--space-10) var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "beeko-eyebrow",
      style: {
        marginBottom: 'var(--space-4)'
      }
    }, "\u0645\u062C\u0645\u0648\u0639\u0629 \u0627\u0644\u0645\u0646\u0632\u0644"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 'var(--fs-display)',
        lineHeight: 1.15,
        marginBottom: 'var(--space-4)'
      }
    }, "\u0642\u0637\u0646 \u0646\u0627\u0639\u0645\u2026 \u0644\u064A\u0648\u0645 \u0643\u0627\u0645\u0644 \u0645\u0646 \u0627\u0644\u0644\u0639\u0628 \u0648\u0627\u0644\u0631\u0627\u062D\u0629"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 'var(--fs-body-lg)',
        color: 'var(--text-body)',
        maxWidth: '46ch',
        marginBottom: 'var(--space-6)'
      }
    }, "\u0645\u0644\u0627\u0628\u0633 \u0645\u0646\u0632\u0644\u064A\u0629 \u0645\u0631\u064A\u062D\u0629 \u0628\u0623\u0644\u0648\u0627\u0646 \u0647\u0627\u062F\u0626\u0629\u060C \u0645\u0635\u0646\u0648\u0639\u0629 \u0645\u0646 \u0642\u0637\u0646 \u0644\u0637\u064A\u0641 \u0639\u0644\u0649 \u0628\u0634\u0631\u0629 \u0637\u0641\u0644\u0643."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      onClick: () => onNav('tops')
    }, "\u062A\u0633\u0648\u0651\u0642\u064A \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629"), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      variant: "outline",
      onClick: () => onNav('newborn')
    }, "\u062D\u062F\u064A\u062B\u0648 \u0627\u0644\u0648\u0644\u0627\u062F\u0629"))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        background: 'var(--cream-100)',
        aspectRatio: '4 / 5'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: P + 'model-blue-set.jpeg',
      alt: "\u0637\u0641\u0644 \u064A\u0631\u062A\u062F\u064A \u0637\u0642\u0645 \u0628\u064A\u0643\u0648 \u0627\u0644\u0642\u0637\u0646\u064A",
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }))), /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--surface-sunken)',
        borderBlock: '1px solid var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...wrap,
        display: 'flex',
        justifyContent: 'space-between',
        gap: 'var(--space-5)',
        padding: 'var(--space-5)',
        flexWrap: 'wrap'
      }
    }, REASSURE.map(r => /*#__PURE__*/React.createElement("div", {
      key: r.t,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        color: 'var(--ink-800)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-sm)',
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--sage-600)',
        display: 'inline-flex'
      }
    }, ic(r.i, {
      width: 20,
      height: 20
    })), r.t)))), /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        padding: 'var(--space-10) var(--space-5) 0'
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 'var(--fs-h2)',
        marginBottom: 'var(--space-6)'
      }
    }, "\u062A\u0633\u0648\u0651\u0642\u064A \u062D\u0633\u0628 \u0627\u0644\u0641\u0626\u0629"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'var(--grid-gutter)'
      }
    }, categories.map(c => /*#__PURE__*/React.createElement("a", {
      key: c.id,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNav(c.id);
      },
      style: {
        display: 'block'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        aspectRatio: '3 / 4',
        background: 'var(--cream-100)',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: P + c.image,
      alt: c.name,
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        insetInline: 12,
        bottom: 12,
        background: 'rgba(252,250,246,0.94)',
        borderRadius: 'var(--radius-md)',
        padding: '10px 14px',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--fs-h4)',
        color: 'var(--ink-900)',
        textAlign: 'center'
      }
    }, c.name)))))), /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        padding: 'var(--space-10) var(--space-5) 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 'var(--space-6)'
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 'var(--fs-h2)',
        margin: 0
      }
    }, "\u0627\u0644\u0623\u0643\u062B\u0631 \u0645\u0628\u064A\u0639\u064B\u0627"), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNav('tops');
      },
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-sm)',
        fontWeight: 600
      }
    }, "\u0639\u0631\u0636 \u0627\u0644\u0643\u0644 \u2190")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'var(--grid-gutter)'
      }
    }, products.slice(0, 4).map(p => /*#__PURE__*/React.createElement(ProductCard, {
      key: p.id,
      image: P + p.image,
      hoverImage: P + p.hoverImage,
      name: p.name,
      ageRange: p.ageRange,
      price: p.price,
      was: p.was,
      colors: p.colors,
      badge: p.badge,
      badgeTone: p.badgeTone,
      onAdd: () => onAdd(p),
      onWishlist: () => {},
      onClick: () => onProduct(p),
      style: {
        cursor: 'pointer'
      }
    })))), /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        padding: 'var(--space-10) var(--space-5) 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        background: 'var(--sage-100)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 'var(--space-8)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "beeko-eyebrow",
      style: {
        marginBottom: 12
      }
    }, "\u0644\u0645\u0627\u0630\u0627 \u0627\u0644\u0642\u0637\u0646\u061F"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 'var(--fs-h1)',
        marginBottom: 'var(--space-4)'
      }
    }, "\u062E\u0627\u0645\u0629 \u062A\u062A\u0646\u0641\u0651\u0633\u060C \u062A\u0628\u0642\u0649 \u0646\u0627\u0639\u0645\u0629"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 'var(--fs-body-lg)',
        color: 'var(--ink-800)',
        maxWidth: '40ch',
        marginBottom: 'var(--space-5)'
      }
    }, "\u0646\u062E\u062A\u0627\u0631 \u0642\u0637\u0646\u064B\u0627 \u0637\u0628\u064A\u0639\u064A\u064B\u0627 \u0644\u0637\u064A\u0641\u064B\u0627 \u0639\u0644\u0649 \u0627\u0644\u0628\u0634\u0631\u0629 \u0627\u0644\u062D\u0633\u0651\u0627\u0633\u0629\u060C \u0648\u064A\u062D\u062A\u0641\u0638 \u0628\u0646\u0639\u0648\u0645\u062A\u0647 \u0628\u0639\u062F \u0643\u0644 \u063A\u0633\u0644\u0629."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      onClick: () => onNav('tops')
    }, "\u0627\u0639\u0631\u0641\u064A \u0623\u0643\u062B\u0631"))), /*#__PURE__*/React.createElement("div", {
      style: {
        aspectRatio: '1 / 1',
        background: 'var(--cream-100)'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: P + 'top-peach-hanger.jpeg',
      alt: "\u0628\u0644\u0648\u0632\u0629 \u0642\u0637\u0646\u064A\u0629 \u0645\u0639\u0644\u0651\u0642\u0629",
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    })))));
  }
  window.BEEKO = window.BEEKO || {};
  window.BEEKO.Home = Home;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Listing.jsx
try { (() => {
// Beeko storefront — product listing / category page.
(function () {
  const NS = window.BeekoDesignSystem_e717fe;
  const {
    ProductCard,
    Chip,
    ColorSwatch
  } = NS;
  const P = '../../assets/products/';
  const AGES = ['٠–٣ أشهر', '٦–١٢ شهر', 'سنة–سنتان'];
  const COLORS = ['blue', 'pink', 'peach', 'mint', 'sage', 'lilac', 'cream', 'grey'];
  function Listing({
    products,
    title,
    onProduct,
    onAdd
  }) {
    const [age, setAge] = React.useState(null);
    const [color, setColor] = React.useState(null);
    React.useEffect(() => {
      window.lucide && window.lucide.createIcons();
    });
    const filtered = products.filter(p => (!age || p.ageRange === age) && (!color || p.colors.includes(color)));
    const wrap = {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--space-5)'
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        ...wrap,
        paddingTop: 'var(--space-7)',
        paddingBottom: 'var(--space-8)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-xs)',
        color: 'var(--text-muted)',
        marginBottom: 'var(--space-3)'
      }
    }, "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 / ", title), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 'var(--fs-h1)',
        marginBottom: 'var(--space-2)'
      }
    }, title), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--text-muted)',
        fontSize: 'var(--fs-sm)',
        marginBottom: 'var(--space-6)'
      }
    }, filtered.length, " \u0645\u0646\u062A\u062C"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        gap: 'var(--space-8)',
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement("aside", {
      style: {
        position: 'sticky',
        top: 96,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--fs-h4)',
        marginBottom: 'var(--space-3)'
      }
    }, "\u0627\u0644\u0639\u0645\u0631"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8
      }
    }, AGES.map(a => /*#__PURE__*/React.createElement(Chip, {
      key: a,
      selectable: true,
      selected: age === a,
      onClick: () => setAge(age === a ? null : a)
    }, a)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--fs-h4)',
        marginBottom: 'var(--space-3)'
      }
    }, "\u0627\u0644\u0644\u0648\u0646"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6
      }
    }, COLORS.map(c => /*#__PURE__*/React.createElement(ColorSwatch, {
      key: c,
      color: c,
      selected: color === c,
      onClick: () => setColor(color === c ? null : c)
    })))), (age || color) && /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        setAge(null);
        setColor(null);
      },
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-sm)',
        color: 'var(--sage-700)',
        fontWeight: 600
      }
    }, "\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631")), /*#__PURE__*/React.createElement("div", null, filtered.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 'var(--space-10)',
        textAlign: 'center',
        color: 'var(--text-muted)',
        background: 'var(--surface-raised)',
        borderRadius: 'var(--radius-lg)'
      }
    }, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0646\u062A\u062C\u0627\u062A \u0628\u0647\u0630\u0627 \u0627\u0644\u0641\u0644\u062A\u0631.") : /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--grid-gutter)'
      }
    }, filtered.map(p => /*#__PURE__*/React.createElement(ProductCard, {
      key: p.id,
      image: P + p.image,
      hoverImage: P + p.hoverImage,
      name: p.name,
      ageRange: p.ageRange,
      price: p.price,
      was: p.was,
      colors: p.colors,
      badge: p.badge,
      badgeTone: p.badgeTone,
      onAdd: () => onAdd(p),
      onClick: () => onProduct(p)
    }))))));
  }
  window.BEEKO = window.BEEKO || {};
  window.BEEKO.Listing = Listing;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Listing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Product.jsx
try { (() => {
// Beeko storefront — product detail page (PDP).
(function () {
  const NS = window.BeekoDesignSystem_e717fe;
  const {
    Button,
    ColorSwatch,
    Chip,
    QtyStepper,
    PriceTag,
    Badge
  } = NS;
  const P = '../../assets/products/';
  const SIZES = ['٠–٣ أشهر', '٣–٦ أشهر', '٦–١٢ شهر', 'سنة–سنتان'];
  function Product({
    product,
    onAdd,
    onNav
  }) {
    const ic = (n, s) => React.createElement('i', {
      'data-lucide': n,
      style: {
        width: 18,
        height: 18,
        ...s
      }
    });
    const gallery = [product.image, product.hoverImage, product.image].filter(Boolean);
    const [main, setMain] = React.useState(gallery[0]);
    const [color, setColor] = React.useState(product.colors[0]);
    const [size, setSize] = React.useState(SIZES[2]);
    const [qty, setQty] = React.useState(1);
    const [open, setOpen] = React.useState('details');
    React.useEffect(() => {
      window.lucide && window.lucide.createIcons();
    });
    React.useEffect(() => {
      setMain(product.image);
      setColor(product.colors[0]);
      setQty(1);
    }, [product.id]);
    const wrap = {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--space-5)'
    };
    const ACC = [{
      id: 'details',
      h: 'تفاصيل المنتج',
      b: product.blurb + ' قَصّة مريحة تمنح حرية الحركة، وحياكة متينة تدوم مع الغسل المتكرّر.'
    }, {
      id: 'fabric',
      h: 'الخامة والعناية',
      b: 'قطن ١٠٠٪. يُغسل في الغسالة على ٣٠°. لا يُستخدم مبيّض. كي على حرارة منخفضة عند الحاجة.'
    }, {
      id: 'shipping',
      h: 'الشحن والإرجاع',
      b: 'شحن مجاني للطلبات فوق ٢٠٠ ر.س. التوصيل خلال ٢–٤ أيام عمل. إرجاع سهل خلال ١٤ يومًا.'
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        ...wrap,
        paddingTop: 'var(--space-6)',
        paddingBottom: 'var(--space-8)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-xs)',
        color: 'var(--text-muted)',
        marginBottom: 'var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNav('home');
      },
      style: {
        color: 'var(--text-muted)'
      }
    }, "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629"), " / ", product.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        gap: 'var(--space-8)',
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '72px 1fr',
        gap: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, gallery.map((g, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => setMain(g),
      style: {
        padding: 0,
        border: `1px solid ${main === g ? 'var(--ink-900)' : 'var(--border-hairline)'}`,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'none',
        aspectRatio: '4/5'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: P + g,
      alt: "",
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'var(--cream-100)',
        aspectRatio: '4/5'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: P + main,
      alt: product.name,
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'sticky',
        top: 96
      }
    }, product.badge && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: product.badgeTone,
      solid: product.badgeTone === 'sale'
    }, product.badge)), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 'var(--fs-h1)',
        marginBottom: 'var(--space-3)'
      }
    }, product.name), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 'var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement(PriceTag, {
      price: product.price,
      was: product.was,
      size: "lg"
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--text-body)',
        fontSize: 'var(--fs-body-lg)',
        maxWidth: '46ch',
        marginBottom: 'var(--space-6)'
      }
    }, product.blurb), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 'var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-sm)',
        fontWeight: 600,
        marginBottom: 10
      }
    }, "\u0627\u0644\u0644\u0648\u0646"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, product.colors.map(c => /*#__PURE__*/React.createElement(ColorSwatch, {
      key: c,
      color: c,
      size: 30,
      selected: color === c,
      onClick: () => setColor(c)
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 'var(--space-6)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-sm)',
        fontWeight: 600
      }
    }, "\u0627\u0644\u0645\u0642\u0627\u0633 (\u0627\u0644\u0639\u0645\u0631)"), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => e.preventDefault(),
      style: {
        fontSize: 'var(--fs-xs)',
        color: 'var(--sage-700)',
        fontWeight: 600
      }
    }, "\u062F\u0644\u064A\u0644 \u0627\u0644\u0642\u064A\u0627\u0633")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8
      }
    }, SIZES.map(s => /*#__PURE__*/React.createElement(Chip, {
      key: s,
      selectable: true,
      selected: size === s,
      onClick: () => setSize(s)
    }, s)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-3)',
        alignItems: 'center',
        marginBottom: 'var(--space-6)'
      }
    }, /*#__PURE__*/React.createElement(QtyStepper, {
      value: qty,
      onChange: setQty
    }), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      block: true,
      onClick: () => onAdd(product, {
        color,
        size,
        qty
      }),
      style: {
        flex: 1
      }
    }, "\u0623\u0636\u0650\u0641 \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0651\u0629")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 'var(--space-6)'
      }
    }, /*#__PURE__*/React.createElement(Chip, {
      icon: ic('leaf', {
        width: 15,
        height: 15
      })
    }, "\u0642\u0637\u0646 \u0661\u0660\u0660\u066A"), /*#__PURE__*/React.createElement(Chip, {
      icon: ic('feather', {
        width: 15,
        height: 15
      })
    }, "\u0644\u0637\u064A\u0641 \u0639\u0644\u0649 \u0627\u0644\u0628\u0634\u0631\u0629"), /*#__PURE__*/React.createElement(Chip, {
      icon: ic('truck', {
        width: 15,
        height: 15
      })
    }, "\u0634\u062D\u0646 \u0645\u062C\u0627\u0646\u064A \u0641\u0648\u0642 \u0662\u0660\u0660 \u0631.\u0633")), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: '1px solid var(--border-hairline)'
      }
    }, ACC.map(a => /*#__PURE__*/React.createElement("div", {
      key: a.id,
      style: {
        borderBottom: '1px solid var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(open === a.id ? null : a.id),
      style: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '16px 0',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--fs-h4)',
        color: 'var(--ink-900)'
      }
    }, a.h, ic(open === a.id ? 'minus' : 'plus', {
      width: 18,
      height: 18
    })), open === a.id && /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--text-body)',
        fontSize: 'var(--fs-body)',
        lineHeight: 1.8,
        paddingBottom: 16,
        margin: 0
      }
    }, a.b)))))));
  }
  window.BEEKO = window.BEEKO || {};
  window.BEEKO.Product = Product;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Product.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/data.js
try { (() => {
// Beeko storefront — demo product catalogue. Arabic, RTL.
// Images live in /assets/products (path is relative to index.html).
window.BEEKO = window.BEEKO || {};
window.BEEKO.PRODUCTS = [{
  id: 'tee-ss',
  name: 'تيشيرت قطني بأكمام قصيرة',
  cat: 'tops',
  ageRange: '٠–٣ أشهر',
  price: '٨٩',
  was: null,
  badge: 'جديد',
  badgeTone: 'neutral',
  colors: ['blue', 'peach', 'mint', 'pink', 'grey'],
  image: 'tee-blue.jpeg',
  hoverImage: 'tee-peach.jpeg',
  blurb: 'تيشيرت يومي بقَصّة مريحة وخامة قطنية تتنفّس — لطيف على بشرة طفلك طوال اليوم.'
}, {
  id: 'top-ls-peach',
  name: 'بلوزة قطنية بأكمام طويلة',
  cat: 'tops',
  ageRange: '٦–١٢ شهر',
  price: '٦٩',
  was: '٨٩',
  badge: 'خصم',
  badgeTone: 'sale',
  colors: ['peach', 'cream', 'grey', 'blue'],
  image: 'top-peach-longsleeve.jpeg',
  hoverImage: 'top-peach-ribbed.jpeg',
  blurb: 'بلوزة دافئة بأكمام طويلة وخامة مضلّعة ناعمة، مثالية لأمسيات المنزل الهادئة.'
}, {
  id: 'pants-blue',
  name: 'بنطلون قطني مريح',
  cat: 'bottoms',
  ageRange: 'سنة–سنتان',
  price: '٧٩',
  was: null,
  badge: null,
  colors: ['blue', 'sage', 'lilac', 'cream'],
  image: 'pants-blue.jpeg',
  hoverImage: 'pants-blue-alt.jpeg',
  blurb: 'بنطلون بخصر مطّاطي لطيف وحاشية مريحة عند الكاحل — حرية حركة طوال اليوم.'
}, {
  id: 'top-beige',
  name: 'بلوزة قطنية بياقة دائرية',
  cat: 'tops',
  ageRange: '٦–١٢ شهر',
  price: '٧٥',
  was: null,
  badge: null,
  colors: ['cream', 'peach', 'grey'],
  image: 'top-beige-longsleeve.jpeg',
  hoverImage: 'top-grey-longsleeve.jpeg',
  blurb: 'لون بيج هادئ يناسب كل القطع — خامة قطنية ناعمة بقَصّة كلاسيكية.'
}, {
  id: 'set-blue',
  name: 'طقم منزلي قطني — قطعتان',
  cat: 'sets',
  ageRange: '٦–٩ أشهر',
  price: '١٤٩',
  was: '١٧٩',
  badge: 'الأكثر مبيعًا',
  badgeTone: 'sage',
  colors: ['blue', 'pink', 'mint', 'peach'],
  image: 'set-blue-flatlay.jpeg',
  hoverImage: 'model-blue-set.jpeg',
  blurb: 'طقم من قطعتين بأزرار أمامية سهلة — بلوزة وبنطلون من القطن الناعم بلون موحّد.'
}, {
  id: 'top-grey',
  name: 'بلوزة قطنية مضلّعة',
  cat: 'tops',
  ageRange: 'سنة–سنتان',
  price: '٧٩',
  was: null,
  badge: null,
  colors: ['grey', 'cream', 'sage'],
  image: 'top-grey-longsleeve.jpeg',
  hoverImage: 'top-beige-longsleeve.jpeg',
  blurb: 'خامة مضلّعة مرنة تحتفظ بشكلها، بلون رمادي محايد يسهل تنسيقه.'
}, {
  id: 'tee-peach',
  name: 'تيشيرت قطني مشمشي',
  cat: 'tops',
  ageRange: '٠–٣ أشهر',
  price: '٨٩',
  was: null,
  badge: null,
  colors: ['peach', 'blue', 'mint', 'lilac'],
  image: 'tee-peach.jpeg',
  hoverImage: 'tee-blue.jpeg',
  blurb: 'لون مشمشي دافئ يضيف لمسة لطيفة على إطلالة طفلك اليومية.'
}, {
  id: 'pants-sage',
  name: 'بنطلون قطني بحاشية مطّاطية',
  cat: 'bottoms',
  ageRange: '٦–١٢ شهر',
  price: '٧٢',
  was: '٨٩',
  badge: 'خصم',
  badgeTone: 'sale',
  colors: ['sage', 'blue', 'grey', 'lilac'],
  image: 'pants-blue-alt.jpeg',
  hoverImage: 'pants-blue.jpeg',
  blurb: 'حاشية مطّاطية تبقى ثابتة دون أن تضغط — راحة تدوم مع كل خطوة.'
}];
window.BEEKO.CATEGORIES = [{
  id: 'newborn',
  name: 'حديثو الولادة',
  image: 'model-pink-set.jpeg'
}, {
  id: 'tops',
  name: 'البلوزات',
  image: 'top-peach-longsleeve.jpeg'
}, {
  id: 'bottoms',
  name: 'البناطيل',
  image: 'pants-blue.jpeg'
}, {
  id: 'sets',
  name: 'الأطقم',
  image: 'set-blue-flatlay.jpeg'
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.PriceTag = __ds_scope.PriceTag;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.ColorSwatch = __ds_scope.ColorSwatch;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.QtyStepper = __ds_scope.QtyStepper;

})();
