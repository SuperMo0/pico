# Beeko Shopify Theme — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement every page and section of the Beeko storefront so the live Shopify theme matches the JSX prototype in `design-system/project/ui_kits/storefront/` pixel-for-pixel build for mobile first and make sure every thing is responsive.

**Architecture:** Each page maps to one rebuilt Liquid section; shared UI (product card, SVG icons) lives in `snippets/`; all interactivity is web components in `{% javascript %}` blocks; design tokens are already in `assets/theme.css`.

**Tech Stack:** Shopify OS 2.0, Liquid, vanilla web components, CSS custom properties, `ar.default.json` locale (Arabic is default).

## Global Constraints

- **Design source of truth:** Read the matching `.jsx` file in `design-system/project/ui_kits/storefront/` before writing a single line of Liquid for any section. Every color, spacing value, border-radius, font size, and layout column is specified there.
- Arabic is the default locale — every `{{ 'key' | t }}` and every `t:` schema key MUST exist in `locales/ar.default.json` / `locales/ar.default.schema.json` BEFORE it is referenced in Liquid.
- Run `shopify theme check` after every task. Fix all errors before marking done.
- All design tokens come from `assets/theme.css` `:root` block — never raw hex, never magic px.
- Images: `image_tag` with `widths:` + `sizes:`, focal point `object-position`, `loading: eager` above fold / `loading: lazy` elsewhere.
- Web components: one `class Foo extends HTMLElement` per component, init in `connectedCallback()`, scope with `this.querySelector()`.
- No hardcoded products, prices, links, or copy outside blank-state fallback branches.
- **Mobile-first CSS is mandatory:** Base styles target mobile (≤767px). Use only `@media (min-width: …)` to enhance for larger screens. Never patch with `max-width` queries.
- **Hover interactions need touch fallbacks:** Every `:hover`-triggered reveal (slide-up buttons, overlays) must have an `@media (hover: none)` block making it always visible or tap-accessible.
- **Minimum touch targets:** All interactive elements (`<button>`, `<a>`, `<input>`) must be at least 44×44px. Enlarge via `@media (hover: none)` if the desktop size is smaller.
- **Responsive audit before marking done:** Mentally check every new section at 360px, 768px, 1024px. No overflow, no broken grids, no hover-only dead zones.

---

## What Is Already Done

| Area | Files | Status |
|---|---|---|
| Foundation | `assets/theme.css`, `layout/theme.liquid` | ✅ Done |
| Announcement bar | `sections/announcement-bar.liquid` | ✅ Done |
| Header | `sections/header.liquid`, `sections/header-group.json` | ✅ Done |
| Locale stubs | `locales/ar.default.json`, `locales/ar.default.schema.json` | ✅ Done |

---

## File Map

| Create / Modify | File | Responsible for |
|---|---|---|
| Create | `snippets/icon.liquid` | Inline SVG for all theme icons (leaf, feather, truck, refresh-ccw, shopping-bag, x, trash-2, plus, minus, heart, user, search, chevron-down) |
| Create | `snippets/product-card.liquid` | Reusable product tile — hover image, badge, color dots, title, age range, price, quick-add |
| Create | `sections/hero.liquid` | Homepage hero — 2-col text+image grid |
| Create | `sections/reassurance-strip.liquid` | 4-icon trust strip |
| Create | `sections/collection-list.liquid` | Category grid (4 cards, 3:4 aspect) |
| Create | `sections/featured-collection.liquid` | Bestsellers heading + 4-col product grid |
| Create | `sections/editorial-band.liquid` | Sage-100 2-col editorial band |
| Modify | `templates/index.json` | Wire all homepage sections in order |
| Create | `sections/cart-drawer.liquid` | Slide-in cart panel + web component |
| Modify | `sections/header-group.json` | Add cart-drawer so it renders on every page |
| Modify | `sections/footer.liquid` | Full rebuild — ink-900 bg, 4-col grid, linklists |
| Modify | `sections/collection.liquid` | Full rebuild — breadcrumb, filter sidebar, 3-col grid |
| Modify | `sections/product.liquid` | Full rebuild — gallery, variant picker, ATC form, accordion |

---

## Task 1: `snippets/icon.liquid`

**Design ref:** icons used across `Header.jsx`, `Home.jsx`, `CartDrawer.jsx`, `Product.jsx`, `Listing.jsx`
**Files:** Create `snippets/icon.liquid`

Icon snippet accepts `icon` (string name) and optional `size` (default 20). Renders inline `<svg>` with `aria-hidden="true"`, `width` and `height` from `size`, `stroke="currentColor"`, `stroke-width="1.75"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"`, `viewBox="0 0 24 24"`.

- [x] Create `snippets/icon.liquid` with a `{% case icon %}` block containing paths for every icon used in the theme. Required icons and their SVG path content:

```liquid
{% comment %} Usage: {% render 'icon', icon: 'leaf', size: 20 %} {% endcomment %}
{%- assign icon_size = size | default: 20 -%}
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="{{ icon_size }}" height="{{ icon_size }}"
  fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  {%- case icon -%}
    {%- when 'leaf' -%}
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    {%- when 'feather' -%}
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
      <line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/>
    {%- when 'truck' -%}
      <rect width="16" height="11" x="1" y="3" rx="2"/>
      <path d="M17 7h4l3 4v4h-7V7z"/>
      <circle cx="7.5" cy="18" r="2"/><circle cx="17.5" cy="18" r="2"/>
    {%- when 'refresh-ccw' -%}
      <path d="M3 2v6h6"/><path d="M21 12A9 9 0 0 0 6 5.3L3 8"/>
      <path d="M21 22v-6h-6"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/>
    {%- when 'shopping-bag' -%}
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    {%- when 'x' -%}
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    {%- when 'trash-2' -%}
      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
      <line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
    {%- when 'plus' -%}
      <path d="M5 12h14"/><path d="M12 5v14"/>
    {%- when 'minus' -%}
      <path d="M5 12h14"/>
    {%- when 'heart' -%}
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    {%- when 'user' -%}
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    {%- when 'search' -%}
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    {%- when 'chevron-down' -%}
      <path d="m6 9 6 6 6-6"/>
    {%- when 'chevron-up' -%}
      <path d="m18 15-6-6-6 6"/>
  {%- endcase -%}
</svg>
```

- [x] Run `shopify theme check` — 0 errors expected (snippet has no schema).

---

## Task 2: `snippets/product-card.liquid`

**Design ref:** `design-system/project/components/commerce/ProductCard.jsx`
**Files:** Create `snippets/product-card.liquid`

Accepts variable `product`. Card layout: flex column, `gap: var(--space-3)`. Image well: `aspect-ratio: 4/5`, `border-radius: var(--radius-lg)`, `background: var(--cream-100)`, `overflow: hidden`, `position: relative`. Primary image + optional hover image (crossfade via `data-hover-src`). Badge top-inline-end. Heart wishlist button top-inline-start (`38px` circle, `rgba(252,250,246,0.9)` bg). Quick-add button slides up on hover (`translateY(120%)` → `translateY(0)`). Below image: color dot row (`16px` swatches), product title, age range (muted xs), price tag (current + was).

- [x] Add locale keys to `locales/ar.default.json` (verify first — add only if missing):
  - `products.product.add_to_cart` → `"أضِف إلى السلّة"`
  - `products.product.add_to_wishlist` → `"أضِف إلى المفضّلة"`

- [x] Add matching keys to `locales/en.json`.

- [x] Create `snippets/product-card.liquid`:

```liquid
{%- liquid
  assign card_media = product.featured_media
  assign hover_media = product.media[1]
  assign card_badge = product.metafields.custom.badge.value
  assign age_range = product.metafields.custom.age_range.value
-%}
<div class="product-card" data-product-url="{{ product.url }}">
  <div class="product-card__media">
    {%- if card_media -%}
      {%- liquid
        assign img_widths = '200,300,400,600'
        assign img_sizes = '(min-width: 768px) 25vw, 50vw'
      -%}
      {{ card_media | image_url: width: 600 | image_tag:
        alt: card_media.alt | default: product.title,
        class: 'product-card__img product-card__img--primary',
        widths: img_widths,
        sizes: img_sizes,
        loading: 'lazy',
        style: "object-position: {{ card_media.presentation.focal_point }}"
      }}
      {%- if hover_media -%}
        {{ hover_media | image_url: width: 600 | image_tag:
          alt: '',
          class: 'product-card__img product-card__img--hover',
          widths: img_widths,
          sizes: img_sizes,
          loading: 'lazy',
          style: "object-position: {{ hover_media.presentation.focal_point }}"
        }}
      {%- endif -%}
    {%- endif -%}

    {%- if card_badge -%}
      <span class="product-card__badge">{{ card_badge }}</span>
    {%- endif -%}

    <button type="button" class="product-card__wishlist" aria-label="{{ 'products.product.add_to_wishlist' | t }}">
      {% render 'icon', icon: 'heart', size: 18 %}
    </button>

    <div class="product-card__quick-add-wrap">
      <form action="{{ routes.cart_add_url }}" method="post" class="product-card__quick-add-form">
        <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
        <input type="hidden" name="quantity" value="1">
        <button type="submit" class="product-card__quick-add-btn">
          {{ 'products.product.add_to_cart' | t }}
        </button>
      </form>
    </div>
  </div>

  <div class="product-card__meta">
    {%- unless product.has_only_default_variant -%}
      {%- assign color_option = product.options_with_values | where: 'name', 'اللون' | first -%}
      {%- if color_option -%}
        <div class="product-card__colors">
          {%- for val in color_option.values -%}
            {%- assign swatch_color = 'pc-' | append: val | downcase -%}
            <span class="product-card__swatch" style="background: var(--{{ swatch_color }}, var(--cream-100));" aria-label="{{ val }}"></span>
          {%- endfor -%}
        </div>
      {%- endif -%}
    {%- endunless -%}
    <a href="{{ product.url }}" class="product-card__title">{{ product.title }}</a>
    {%- if age_range -%}
      <span class="product-card__age">{{ age_range }}</span>
    {%- endif -%}
    <div class="product-card__price">
      {%- if product.compare_at_price > product.price -%}
        <span class="product-card__price--sale">{{ product.price | money }}</span>
        <s class="product-card__price--was">{{ product.compare_at_price | money }}</s>
      {%- else -%}
        <span>{{ product.price | money }}</span>
      {%- endif -%}
    </div>
  </div>
</div>
```

- [ ] Add `{% stylesheet %}` block to the snippet with these styles:

```css
.product-card { display: flex; flex-direction: column; gap: var(--space-3); }
.product-card__media {
  position: relative; aspect-ratio: 4 / 5; overflow: hidden;
  border-radius: var(--radius-lg); background: var(--cream-100);
}
.product-card__img { width: 100%; height: 100%; object-fit: cover;
  transition: opacity var(--dur-slow) var(--ease-soft), transform var(--dur-slow) var(--ease-soft); }
.product-card__img--primary { position: relative; z-index: 1; }
.product-card__img--hover { position: absolute; inset: 0; opacity: 0; z-index: 2;
  transition: opacity var(--dur-slow) var(--ease-soft); }
.product-card:hover .product-card__img--primary { transform: scale(1.03); opacity: 0; }
.product-card:hover .product-card__img--hover { opacity: 1; }
.product-card:hover .product-card__img--primary:only-child { opacity: 1; transform: scale(1.03); }
.product-card__badge {
  position: absolute; top: 12px; inset-inline-end: 12px;
  background: var(--sale-100); color: var(--sale-600);
  font-family: var(--font-body); font-size: var(--fs-xs); font-weight: var(--fw-semibold);
  padding: 4px 10px; border-radius: var(--radius-pill);
}
.product-card__wishlist {
  position: absolute; top: 10px; inset-inline-start: 10px;
  width: 38px; height: 38px; border-radius: var(--radius-pill);
  background: rgba(252,250,246,0.9); border: 1px solid var(--border-hairline);
  display: inline-flex; align-items: center; justify-content: center;
  cursor: pointer; color: var(--ink-700);
  transition: color var(--dur-fast) var(--ease-soft);
}
.product-card__wishlist:hover { color: var(--sale-600); }
.product-card__wishlist:focus-visible { outline: 2px solid var(--border-focus); outline-offset: 2px; }
.product-card__quick-add-wrap {
  position: absolute; inset-inline: 10px; bottom: 10px;
  transform: translateY(120%); opacity: 0;
  transition: transform var(--dur-base) var(--ease-soft), opacity var(--dur-base) var(--ease-soft);
}
.product-card:hover .product-card__quick-add-wrap { transform: translateY(0); opacity: 1; }
.product-card__quick-add-btn {
  width: 100%; padding: 11px; border: none; cursor: pointer;
  background: var(--ink-900); color: var(--cream-50);
  font-family: var(--font-body); font-size: var(--fs-sm); font-weight: var(--fw-semibold);
  border-radius: var(--radius-md);
  transition: background var(--dur-fast) var(--ease-soft);
}
.product-card__quick-add-btn:hover { background: var(--ink-800); }
.product-card__meta { display: flex; flex-direction: column; gap: 6px; }
.product-card__colors { display: flex; gap: 2px; margin-inline-start: -4px; }
.product-card__swatch { width: 16px; height: 16px; border-radius: var(--radius-pill);
  border: 1px solid var(--border-hairline); flex-shrink: 0; }
.product-card__title {
  font-family: var(--font-body); font-size: var(--fs-body); font-weight: var(--fw-medium);
  color: var(--text-strong); text-decoration: none;
}
.product-card__title:hover { color: var(--text-accent); }
.product-card__age { font-family: var(--font-body); font-size: var(--fs-xs); color: var(--text-muted); }
.product-card__price { font-family: var(--font-body); font-size: var(--fs-sm); }
.product-card__price--sale { color: var(--text-sale); font-weight: var(--fw-semibold); margin-inline-end: 6px; }
.product-card__price--was { color: var(--text-muted); }
```

- [ ] Add `{% javascript %}` block with `<product-card>` web component: on `connectedCallback`, intercepts `.product-card__quick-add-form` submit, POSTs to `/cart/add.js`, on success dispatches `theme:cart:updated` with cart payload on `document`. Shows loading state on button during fetch.

- [ ] Run `shopify theme check` — 0 errors.

---

## Task 3: `sections/hero.liquid`

**Design ref:** `Home.jsx` lines 22–39 (Hero section)
**Files:** Create `sections/hero.liquid`, update `locales/ar.default.json`, `locales/ar.default.schema.json`, `locales/en.json`, `locales/en.schema.json`

Layout: 2-column CSS grid `1fr 1fr`, `gap: var(--space-8)`, `align-items: center`. Padding block: `var(--space-10)` top + bottom. Text column: eyebrow (`.beeko-eyebrow`), h1 (`--fs-display` font-size), body paragraph (`--fs-body-lg`, `--text-body`, `max-width: 46ch`), two CTA buttons side-by-side (`gap: var(--space-3)`). Image column: `border-radius: var(--radius-xl)`, `overflow: hidden`, `background: var(--cream-100)`, `aspect-ratio: 4/5`, image fills 100% with `object-fit: cover`. On mobile (< 768px): single column, image below text.

- [ ] Add to `locales/ar.default.schema.json` under `sections.hero.settings`:
  - `eyebrow_text`, `heading`, `subheading`, `image`, `image_position`, `image_position_right`, `image_position_left`, `primary_cta_label`, `primary_cta_url`, `secondary_cta_label`, `secondary_cta_url`
  - Add preset name under `sections.hero.presets.name`

- [ ] Add matching English values to `locales/en.schema.json`.

- [ ] Create `sections/hero.liquid` with full Liquid + schema:

```liquid
{%- liquid
  assign img_pos = section.settings.image_position | default: 'right'
  assign hero_img = section.settings.image
-%}
<section class="hero shopify-section-padding" aria-labelledby="hero-heading-{{ section.id }}">
  <div class="hero__inner{% if img_pos == 'left' %} hero__inner--img-left{% endif %}">
    <div class="hero__text">
      {%- if section.settings.eyebrow_text != blank -%}
        <div class="beeko-eyebrow hero__eyebrow">{{ section.settings.eyebrow_text }}</div>
      {%- endif -%}
      <h1 id="hero-heading-{{ section.id }}" class="hero__heading">{{ section.settings.heading }}</h1>
      {%- if section.settings.subheading != blank -%}
        <div class="hero__sub">{{ section.settings.subheading }}</div>
      {%- endif -%}
      <div class="hero__ctas">
        {%- if section.settings.primary_cta_label != blank -%}
          <a href="{{ section.settings.primary_cta_url }}" class="btn btn--primary btn--lg">{{ section.settings.primary_cta_label }}</a>
        {%- endif -%}
        {%- if section.settings.secondary_cta_label != blank -%}
          <a href="{{ section.settings.secondary_cta_url }}" class="btn btn--outline btn--lg">{{ section.settings.secondary_cta_label }}</a>
        {%- endif -%}
      </div>
    </div>
    <div class="hero__media">
      {%- if hero_img != blank -%}
        {{ hero_img | image_url: width: 900 | image_tag:
          alt: hero_img.alt | default: section.settings.heading,
          widths: '400,600,900',
          sizes: '(min-width: 768px) 50vw, 100vw',
          loading: 'eager',
          fetchpriority: 'high',
          style: "object-position: {{ hero_img.presentation.focal_point }}"
        }}
      {%- else -%}
        {{ 'image' | placeholder_svg_tag: 'hero__placeholder' }}
      {%- endif -%}
    </div>
  </div>
</section>
```

- [ ] Add `{% stylesheet %}` with:

```css
.hero { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); padding-block: var(--space-10); }
.hero__inner { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-8); align-items: center; }
.hero__inner--img-left .hero__text { order: 2; }
.hero__inner--img-left .hero__media { order: 1; }
.hero__eyebrow { margin-bottom: var(--space-4); }
.hero__heading { font-size: var(--fs-display); line-height: 1.15; margin-bottom: var(--space-4); }
.hero__sub { font-size: var(--fs-body-lg); color: var(--text-body); max-width: 46ch; margin-bottom: var(--space-6); }
.hero__ctas { display: flex; gap: var(--space-3); flex-wrap: wrap; }
.hero__media { border-radius: var(--radius-xl); overflow: hidden; background: var(--cream-100); aspect-ratio: 4 / 5; }
.hero__media img { width: 100%; height: 100%; object-fit: cover; display: block; }
.hero__placeholder { width: 100%; height: 100%; }
@media (max-width: 767px) {
  .hero__inner { grid-template-columns: 1fr; }
  .hero__inner--img-left .hero__text { order: 1; }
  .hero__inner--img-left .hero__media { order: 2; }
  .hero__heading { font-size: var(--fs-h1); }
}
```

- [ ] Add global button utilities to `assets/theme.css` (if not already present):

```css
.btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2);
  font-family: var(--font-body); font-size: var(--fs-body); font-weight: var(--fw-semibold);
  border-radius: var(--radius-md); padding: 12px var(--space-5); border: 1.5px solid transparent;
  cursor: pointer; text-decoration: none; transition: background var(--dur-fast) var(--ease-soft), color var(--dur-fast) var(--ease-soft), border-color var(--dur-fast) var(--ease-soft); }
.btn--lg { font-size: var(--fs-body-lg); padding: 14px var(--space-6); }
.btn--primary { background: var(--action-primary); color: var(--action-primary-text); border-color: var(--action-primary); }
.btn--primary:hover { background: var(--action-primary-hover); border-color: var(--action-primary-hover); color: var(--action-primary-text); }
.btn--outline { background: transparent; color: var(--text-strong); border-color: var(--border-strong); }
.btn--outline:hover { background: var(--surface-raised); }
.btn--accent { background: var(--action-accent); color: var(--action-accent-text); border-color: var(--action-accent); }
.btn--accent:hover { background: var(--action-accent-hover); border-color: var(--action-accent-hover); color: var(--action-accent-text); }
.btn:focus-visible { outline: 2px solid var(--border-focus); outline-offset: 3px; }
```

- [ ] Add `{% schema %}` with name `t:sections.hero.name`, settings for eyebrow_text, heading, subheading (richtext), image, image_position (select with right/left options), primary_cta_label, primary_cta_url, secondary_cta_label, secondary_cta_url; one preset `t:sections.hero.presets.name`.

- [ ] Run `shopify theme check` — 0 errors.

---

## Task 4: `sections/reassurance-strip.liquid`

**Design ref:** `Home.jsx` lines 42–51 (Reassurance strip)
**Files:** Create `sections/reassurance-strip.liquid`

Strip: `background: var(--surface-sunken)`, `border-block: 1px solid var(--border-hairline)`. Inner: `max-width: var(--container-max)`, flex row, `justify-content: space-between`, `flex-wrap: wrap`, `gap: var(--space-5)`, `padding: var(--space-5)`. Each item: flex row, `gap: 10px`, icon in `--sage-600`, label in `--ink-800` `--font-body` `--fs-sm` `font-weight: 600`. Icons: Lucide (rendered via `snippets/icon.liquid`). Schema: up to 8 blocks of type `item`, each with `icon` (select: leaf/feather/truck/refresh-ccw/shield/star/heart/package) and `label` (text) and `subtext` (text, optional).

- [ ] Add to `locales/ar.default.schema.json` under `sections.reassurance_strip`: `name`, `blocks.item.name`, `blocks.item.settings.icon`, `blocks.item.settings.label`, `blocks.item.settings.subtext`.
- [ ] Add to `locales/ar.default.json` under `sections.reassurance_strip`: preset content if needed.
- [ ] Sync English locale files.

- [ ] Create `sections/reassurance-strip.liquid`:

```liquid
<section class="reassurance-strip">
  <div class="reassurance-strip__inner">
    {%- for block in section.blocks -%}
      {%- if block.settings.label != blank -%}
        <div class="reassurance-strip__item" {{ block.shopify_attributes }}>
          <span class="reassurance-strip__icon">{% render 'icon', icon: block.settings.icon, size: 20 %}</span>
          <span class="reassurance-strip__label">{{ block.settings.label }}</span>
          {%- if block.settings.subtext != blank -%}
            <span class="reassurance-strip__sub">{{ block.settings.subtext }}</span>
          {%- endif -%}
        </div>
      {%- endif -%}
    {%- endfor -%}
  </div>
</section>
```

- [ ] Add `{% stylesheet %}`:

```css
.reassurance-strip { background: var(--surface-sunken); border-block: 1px solid var(--border-hairline); }
.reassurance-strip__inner {
  max-width: var(--container-max); margin-inline: auto;
  padding: var(--space-5) var(--container-pad);
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: var(--space-5);
}
.reassurance-strip__item { display: flex; align-items: center; gap: 10px; }
.reassurance-strip__icon { color: var(--sage-600); display: inline-flex; }
.reassurance-strip__label { font-family: var(--font-body); font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--ink-800); }
.reassurance-strip__sub { font-family: var(--font-body); font-size: var(--fs-xs); color: var(--text-muted); }
```

- [ ] Add schema with 4 default blocks (leaf/قطن ١٠٠٪, feather/لطيف على البشرة, truck/شحن مجاني فوق ٢٠٠ ر.س, refresh-ccw/إرجاع سهل ١٤ يومًا), max_blocks: 8, preset name.
- [ ] Run `shopify theme check` — 0 errors.

---

## Task 5: `sections/collection-list.liquid`

**Design ref:** `Home.jsx` lines 54–67 (Categories section)
**Files:** Create `sections/collection-list.liquid`

Section heading h2 (`--fs-h2`, `margin-bottom: var(--space-6)`). 4-col CSS grid desktop, 2-col mobile, `gap: var(--grid-gutter)`. Each card: `<a>` block, inner div `border-radius: var(--radius-lg)`, `overflow: hidden`, `aspect-ratio: 3/4`, `background: var(--cream-100)`, `position: relative`. Image fills 100%, `object-fit: cover`, focal point. Label overlay: `position: absolute; inset-inline: 12px; bottom: 12px`, `background: rgba(252,250,246,0.94)`, `border-radius: var(--radius-md)`, `padding: 10px 14px`, `font-family: var(--font-display)`, `font-weight: 700`, `font-size: var(--fs-h4)`, `color: var(--ink-900)`, `text-align: center`.

Schema: `heading` (text), up to 8 blocks of type `collection` (collection picker). Fallback: when block collection is blank render placeholder SVG.

- [ ] Add locale keys (verify first):
  - `locales/ar.default.schema.json` → `sections.collection_list.name`, `settings.heading`, `blocks.collection.name`, `blocks.collection.settings.collection`
  - `locales/en.schema.json` → matching English values

- [ ] Create `sections/collection-list.liquid`:

```liquid
<section class="collection-list shopify-section-padding" aria-labelledby="cl-heading-{{ section.id }}">
  <div class="collection-list__inner">
    {%- if section.settings.heading != blank -%}
      <h2 id="cl-heading-{{ section.id }}" class="collection-list__heading">{{ section.settings.heading }}</h2>
    {%- endif -%}
    <div class="collection-list__grid">
      {%- for block in section.blocks -%}
        {%- assign col = block.settings.collection -%}
        <a href="{{ col.url | default: '#' }}" class="collection-list__card" {{ block.shopify_attributes }}>
          <div class="collection-list__card-img-wrap">
            {%- if col.featured_image -%}
              {{ col.featured_image | image_url: width: 600 | image_tag:
                alt: col.featured_image.alt | default: col.title,
                widths: '300,500,600',
                sizes: '(min-width: 768px) 25vw, 50vw',
                loading: 'lazy',
                style: "object-position: {{ col.featured_image.presentation.focal_point }}"
              }}
            {%- else -%}
              {{ 'collection-1' | placeholder_svg_tag: 'collection-list__placeholder' }}
            {%- endif -%}
            <span class="collection-list__card-label">{{ col.title | default: block.settings.collection.title }}</span>
          </div>
        </a>
      {%- endfor -%}
    </div>
  </div>
</section>
```

- [ ] Add `{% stylesheet %}`:

```css
.collection-list { padding-block: var(--space-10); }
.collection-list__inner { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); }
.collection-list__heading { font-size: var(--fs-h2); margin-bottom: var(--space-6); }
.collection-list__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--grid-gutter); }
.collection-list__card { display: block; text-decoration: none; }
.collection-list__card-img-wrap { border-radius: var(--radius-lg); overflow: hidden; aspect-ratio: 3 / 4; background: var(--cream-100); position: relative; }
.collection-list__card-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform var(--dur-slow) var(--ease-soft); }
.collection-list__card:hover .collection-list__card-img-wrap img { transform: scale(1.04); }
.collection-list__card-label {
  position: absolute; inset-inline: 12px; bottom: 12px;
  background: rgba(252,250,246,0.94); border-radius: var(--radius-md);
  padding: 10px 14px; font-family: var(--font-display); font-weight: var(--fw-bold);
  font-size: var(--fs-h4); color: var(--ink-900); text-align: center; display: block;
}
.collection-list__placeholder { width: 100%; height: 100%; }
@media (max-width: 767px) {
  .collection-list__grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] Add schema: `heading` setting, blocks of type `collection` (collection picker), max_blocks: 8, preset.
- [ ] Run `shopify theme check` — 0 errors.

---

## Task 6: `sections/featured-collection.liquid`

**Design ref:** `Home.jsx` lines 70–86 (Bestsellers section)
**Files:** Create `sections/featured-collection.liquid`

Header row: h2 left, "عرض الكل ←" link right (`font-size: var(--fs-sm)`, `font-weight: 600`, links to `section.settings.collection.url`). Product grid: 4-col desktop, 2-col tablet (≥ 480px), 2-col mobile, `gap: var(--grid-gutter)`. Products from `section.settings.collection.products`, sliced to `section.settings.product_count`. Each product rendered via `{% render 'product-card', product: product %}`. Empty state when `section.settings.collection == blank`.

- [ ] Add locale keys (verify first):
  - `locales/ar.default.json` → `sections.featured_collection.view_all` (already exists: "عرض الكل")
  - `locales/ar.default.schema.json` → `sections.featured_collection.settings.heading`, `settings.collection`, `settings.product_count`, `settings.view_all_label`

- [ ] Create `sections/featured-collection.liquid`:

```liquid
{%- liquid
  assign fc_col = section.settings.collection
  assign fc_count = section.settings.product_count | default: 4
-%}
<section class="featured-collection shopify-section-padding" aria-labelledby="fc-heading-{{ section.id }}">
  <div class="featured-collection__inner">
    <div class="featured-collection__header">
      <h2 id="fc-heading-{{ section.id }}" class="featured-collection__heading">{{ section.settings.heading }}</h2>
      {%- if fc_col != blank -%}
        <a href="{{ fc_col.url }}" class="featured-collection__view-all">{{ section.settings.view_all_label | default: 'sections.featured_collection.view_all' | t }} ←</a>
      {%- endif -%}
    </div>
    <div class="featured-collection__grid">
      {%- if fc_col != blank -%}
        {%- for product in fc_col.products limit: fc_count -%}
          <div>{% render 'product-card', product: product %}</div>
        {%- endfor -%}
      {%- else -%}
        {%- for i in (1..4) -%}
          <div class="featured-collection__placeholder">{{ 'product-1' | placeholder_svg_tag: 'placeholder-svg' }}</div>
        {%- endfor -%}
      {%- endif -%}
    </div>
  </div>
</section>
```

- [ ] Add `{% stylesheet %}`:

```css
.featured-collection { padding-block: var(--space-10); }
.featured-collection__inner { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); }
.featured-collection__header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-6); }
.featured-collection__heading { font-size: var(--fs-h2); margin: 0; }
.featured-collection__view-all { font-family: var(--font-body); font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-body); }
.featured-collection__view-all:hover { color: var(--text-accent); }
.featured-collection__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--grid-gutter); }
@media (max-width: 767px) { .featured-collection__grid { grid-template-columns: repeat(2, 1fr); } }
```

- [ ] Add schema: `heading` (text), `collection` (collection picker), `product_count` (select: 4/8/12), `view_all_label` (text), preset.
- [ ] Run `shopify theme check` — 0 errors.

---

## Task 7: `sections/editorial-band.liquid`

**Design ref:** `Home.jsx` lines 88–103 (Editorial band)
**Files:** Create `sections/editorial-band.liquid`

Outer wrapper: `max-width: var(--container-max)`, `padding-inline: var(--container-pad)`, `padding-block: var(--space-10)`. Inner band: 2-col grid `1fr 1fr`, `border-radius: var(--radius-xl)`, `overflow: hidden`, `background: var(--sage-100)`. Text col: `padding: var(--space-8)`, flex column, `justify-content: center`. Eyebrow (`.beeko-eyebrow`, `margin-bottom: 12px`), h2 (`--fs-h1`), p (`--fs-body-lg`, `--ink-800`, `max-width: 40ch`, `margin-bottom: var(--space-5)`), accent button. Image col: `aspect-ratio: 1/1`, `background: var(--cream-100)`, image fills 100% cover. Image left or right via `section.settings.image_position`. Mobile: stacked, text first.

- [ ] Add locale keys (verify first): `sections.editorial_band` in both schema files.

- [ ] Create `sections/editorial-band.liquid`:

```liquid
{%- assign eb_img = section.settings.image -%}
{%- assign eb_pos = section.settings.image_position | default: 'right' -%}
<section class="editorial-band shopify-section-padding" aria-labelledby="eb-heading-{{ section.id }}">
  <div class="editorial-band__outer">
    <div class="editorial-band__band{% if eb_pos == 'left' %} editorial-band__band--img-left{% endif %}">
      <div class="editorial-band__text">
        {%- if section.settings.eyebrow != blank -%}
          <div class="beeko-eyebrow editorial-band__eyebrow">{{ section.settings.eyebrow }}</div>
        {%- endif -%}
        <h2 id="eb-heading-{{ section.id }}" class="editorial-band__heading">{{ section.settings.heading }}</h2>
        {%- if section.settings.body != blank -%}
          <div class="editorial-band__body">{{ section.settings.body }}</div>
        {%- endif -%}
        {%- if section.settings.cta_label != blank -%}
          <a href="{{ section.settings.cta_url }}" class="btn btn--accent">{{ section.settings.cta_label }}</a>
        {%- endif -%}
      </div>
      <div class="editorial-band__media">
        {%- if eb_img != blank -%}
          {{ eb_img | image_url: width: 800 | image_tag:
            alt: eb_img.alt | default: section.settings.heading,
            widths: '400,600,800',
            sizes: '(min-width: 768px) 50vw, 100vw',
            loading: 'lazy',
            style: "object-position: {{ eb_img.presentation.focal_point }}"
          }}
        {%- else -%}
          {{ 'lifestyle-1' | placeholder_svg_tag: 'editorial-band__placeholder' }}
        {%- endif -%}
      </div>
    </div>
  </div>
</section>
```

- [ ] Add `{% stylesheet %}`:

```css
.editorial-band { padding-block: var(--space-10); }
.editorial-band__outer { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); }
.editorial-band__band { display: grid; grid-template-columns: 1fr 1fr; border-radius: var(--radius-xl); overflow: hidden; background: var(--sage-100); }
.editorial-band__band--img-left .editorial-band__text { order: 2; }
.editorial-band__band--img-left .editorial-band__media { order: 1; }
.editorial-band__text { padding: var(--space-8); display: flex; flex-direction: column; justify-content: center; }
.editorial-band__eyebrow { margin-bottom: 12px; }
.editorial-band__heading { font-size: var(--fs-h1); margin-bottom: var(--space-4); }
.editorial-band__body { font-size: var(--fs-body-lg); color: var(--ink-800); max-width: 40ch; margin-bottom: var(--space-5); }
.editorial-band__body p { margin: 0; }
.editorial-band__media { aspect-ratio: 1 / 1; background: var(--cream-100); overflow: hidden; }
.editorial-band__media img { width: 100%; height: 100%; object-fit: cover; display: block; }
.editorial-band__placeholder { width: 100%; height: 100%; }
@media (max-width: 767px) {
  .editorial-band__band { grid-template-columns: 1fr; }
  .editorial-band__band--img-left .editorial-band__text { order: 1; }
  .editorial-band__band--img-left .editorial-band__media { order: 2; }
  .editorial-band__heading { font-size: var(--fs-h2); }
}
```

- [ ] Add schema: eyebrow (text), heading (text), body (richtext), cta_label (text), cta_url (url), image (image_picker), image_position (select right/left), preset.
- [ ] Run `shopify theme check` — 0 errors.

---

## Task 8: Homepage template `templates/index.json`

**Files:** Modify `templates/index.json`

- [ ] Rewrite `templates/index.json` to include all homepage sections in order: hero → reassurance-strip → collection-list → featured-collection → editorial-band:

```json
{
  "sections": {
    "hero": { "type": "hero", "settings": {
      "heading": "قطن ناعم… ليوم كامل من اللعب والراحة",
      "eyebrow_text": "مجموعة المنزل",
      "subheading": "<p>ملابس منزلية مريحة بألوان هادئة، مصنوعة من قطن لطيف على بشرة طفلك.</p>",
      "primary_cta_label": "تسوّقي المجموعة",
      "secondary_cta_label": "حديثو الولادة",
      "image_position": "right"
    }},
    "reassurance": { "type": "reassurance-strip", "blocks": {
      "leaf": { "type": "item", "settings": { "icon": "leaf", "label": "قطن ١٠٠٪" }},
      "feather": { "type": "item", "settings": { "icon": "feather", "label": "لطيف على البشرة" }},
      "truck": { "type": "item", "settings": { "icon": "truck", "label": "شحن مجاني فوق ٢٠٠ ر.س" }},
      "refresh": { "type": "item", "settings": { "icon": "refresh-ccw", "label": "إرجاع سهل ١٤ يومًا" }}
    }, "block_order": ["leaf","feather","truck","refresh"], "settings": {}},
    "categories": { "type": "collection-list", "settings": { "heading": "تسوّقي حسب الفئة" }, "blocks": {}, "block_order": [] },
    "bestsellers": { "type": "featured-collection", "settings": {
      "heading": "الأكثر مبيعًا",
      "product_count": 4
    }},
    "editorial": { "type": "editorial-band", "settings": {
      "eyebrow": "لماذا القطن؟",
      "heading": "خامة تتنفّس، تبقى ناعمة",
      "body": "<p>نختار قطنًا طبيعيًا لطيفًا على البشرة الحسّاسة، ويحتفظ بنعومته بعد كل غسلة.</p>",
      "cta_label": "اعرفي أكثر",
      "image_position": "right"
    }}
  },
  "order": ["hero", "reassurance", "categories", "bestsellers", "editorial"]
}
```

- [ ] Run `shopify theme check` — 0 errors.
- [ ] Start `shopify theme dev` and visually confirm all sections appear in correct order with correct layout.

---

## Task 9: `sections/cart-drawer.liquid`

**Design ref:** `CartDrawer.jsx` (full file)
**Files:** Create `sections/cart-drawer.liquid`, modify `sections/header-group.json`

Panel: `position: fixed; top: 0; bottom: 0; inset-inline-start: 0; width: 420px; max-width: 92vw; z-index: 100`. Slides in from inline-start (right side in RTL) using `transform: translateX(100%)` closed → `translateX(0)` open. `transition: transform var(--dur-base) var(--ease-soft)`. Shadow: `var(--shadow-lg)`. Scrim: `position: fixed; inset: 0; background: rgba(43,39,33,0.32); z-index: 90`, opacity transition. Panel structure:

1. **Header** — title "سلّتك" + item count, X close button (`{% render 'icon', icon: 'x' %}`)
2. **Free-shipping bar** (shown when items > 0) — `--surface-sunken` bg, track `--sand-200` 6px pill, fill `--sage-600`, animated width
3. **Items list** — scrollable flex column; per item: `78×96` thumbnail (`--radius-md`), name (bold sm), variant (muted xs), qty stepper, trash-2 remove button, line price
4. **Empty state** — shopping-bag icon (40px `--ink-300`), "سلّتك فارغة الآن.", "تابعي التسوّق" outline button
5. **Footer** — subtotal label + price, primary "إتمام الشراء" button (`routes.cart_url`), tax fine-print

- [ ] Verify all locale keys exist in `locales/ar.default.json` (add if missing): `sections.cart_drawer.title`, `empty_heading`, `continue_shopping`, `free_shipping_progress`, `free_shipping_achieved`, `subtotal`, `checkout`, `tax_note`, `remove_item`, `item_count_one`, `item_count_other`
- [ ] Verify `locales/ar.default.schema.json` has `sections.cart_drawer.settings.free_shipping_threshold`
- [ ] Sync English locale files.

- [ ] Create `sections/cart-drawer.liquid` with full markup (schema: `free_shipping_threshold` number setting, default 200):

```liquid
<cart-drawer id="cart-drawer" class="cart-drawer" aria-modal="true" role="dialog" aria-label="{{ 'sections.cart_drawer.title' | t }}" hidden>
  <div class="cart-drawer__scrim" data-close-drawer></div>
  <aside class="cart-drawer__panel">
    <div class="cart-drawer__header">
      <span class="cart-drawer__title">{{ 'sections.cart_drawer.title' | t }}
        <cart-drawer-count class="cart-drawer__count"></cart-drawer-count>
      </span>
      <button type="button" class="cart-drawer__close icon-btn" aria-label="{{ 'accessibility.close_menu' | t }}" data-close-drawer>
        {% render 'icon', icon: 'x', size: 20 %}
      </button>
    </div>

    <div class="cart-drawer__shipping-bar" hidden>
      <p class="cart-drawer__shipping-text"></p>
      <div class="cart-drawer__shipping-track">
        <div class="cart-drawer__shipping-fill" style="width: 0%"></div>
      </div>
    </div>

    <div class="cart-drawer__items" aria-live="polite"></div>

    <div class="cart-drawer__empty" hidden>
      <span class="cart-drawer__empty-icon">{% render 'icon', icon: 'shopping-bag', size: 40 %}</span>
      <p>{{ 'sections.cart_drawer.empty_heading' | t }}</p>
      <button type="button" class="btn btn--outline" data-close-drawer>{{ 'sections.cart_drawer.continue_shopping' | t }}</button>
    </div>

    <div class="cart-drawer__footer" hidden>
      <div class="cart-drawer__subtotal-row">
        <span class="cart-drawer__subtotal-label">{{ 'sections.cart_drawer.subtotal' | t }}</span>
        <span class="cart-drawer__subtotal-price"></span>
      </div>
      <a href="{{ routes.cart_url }}" class="btn btn--primary cart-drawer__checkout">{{ 'sections.cart_drawer.checkout' | t }}</a>
      <p class="cart-drawer__tax-note">{{ 'sections.cart_drawer.tax_note' | t }}</p>
    </div>
  </aside>
</cart-drawer>
```

- [ ] Add `{% stylesheet %}` matching CartDrawer.jsx layout exactly (scrim, panel slide, shipping bar, item row, footer).

- [ ] Add `{% javascript %}` with `<cart-drawer>` web component:
  - Listens for `theme:cart:updated` on `document`; calls `this._renderCart(cart)` to rebuild items list, update count, subtotal, shipping bar
  - `open()`: removes `hidden`, sets `transform: translateX(0)` via class, adds `scroll-lock` to `<html>`
  - `close()`: adds `hidden` back, removes scroll-lock
  - Scrim click and X button call `close()`
  - ESC key calls `close()`
  - `_renderCart(cart)`: builds item rows from `cart.items` (thumbnail, title, variant, qty AJAX stepper, remove button, line price), shows/hides empty state, updates subtotal, updates shipping bar width

- [ ] Modify `sections/header-group.json`: add `"cart-drawer": { "type": "cart-drawer", "settings": {} }` to sections object and add `"cart-drawer"` to order array.

- [ ] Run `shopify theme check` — 0 errors.

---

## Task 10: `sections/footer.liquid` (full rebuild)

**Design ref:** `Footer.jsx` (full file)
**Files:** Modify `sections/footer.liquid`

`background: var(--ink-900)`, `color: var(--cream-200)`, `margin-top: var(--space-12)`. Inner: `max-width: var(--container-max)`, `padding: var(--space-10) var(--container-pad) var(--space-7)`. Grid: `grid-template-columns: 1.4fr 1fr 1fr 1fr`, `gap: var(--space-7)`. Column 1: logo image picker (tinted cream on dark) + brand description richtext. Columns 2–4: each a `link_list` block — heading (`--cream-50`, `--font-display`, fw-bold, `--fs-h4`) + `<ul>` of links (`--cream-200`, `--font-body`, `--fs-sm`). Bottom bar: `border-top: 1px solid rgba(252,250,246,0.14)`, flex row space-between, copyright text + trust tagline. Responsive: 2-col on tablet (≤ 900px), 1-col on mobile (≤ 600px).

- [ ] Verify locale keys (add if missing): `sections.footer.copyright`, `sections.footer.trust_tagline` in `locales/ar.default.json`. Schema keys in `locales/ar.default.schema.json`.
- [ ] Sync English locale files.

- [ ] Fully rewrite `sections/footer.liquid` replacing the skeleton. Logo uses `image_tag` with `widths:` and `sizes:`. Links loop via `section.blocks` of type `link_list` using `block.settings.menu.links`. Copyright and trust tagline from schema text settings. No hardcoded links or text.

- [ ] Add `{% stylesheet %}` matching footer design (dark bg, 4-col grid, bottom bar, responsive breakpoints).

- [ ] Add schema: logo (image_picker), logo_width (range 40–200 default 120), brand_description (richtext), copyright_text (text), trust_tagline (text); blocks of type `link_list` each with heading (text) and menu (link_list), max 3 blocks; no presets (footer is a static section).

- [ ] Run `shopify theme check` — 0 errors.

---

## Task 11: `sections/collection.liquid` (full rebuild)

**Design ref:** `Listing.jsx` (full file)
**Files:** Modify `sections/collection.liquid`, `templates/collection.json`

Layout: breadcrumb (Home / collection.title), h1 `collection.title`, product count line. 2-col grid `220px 1fr`, `gap: var(--space-8)`. Filter sidebar: `position: sticky; top: 96px`. Age filter: Chips from `collection.filters` where filter.label matches age (type: list). Color filter: ColorSwatch-style buttons. Clear filters link when active. Product grid: 3-col, gap `var(--grid-gutter)`. Each product: `{% render 'product-card', product: product %}`. Empty state div. Paginator via `{% paginate collection.products by section.settings.products_per_page %}`. Mobile: sidebar hidden behind "فلترة" toggle button at top (mobile filter toggle), grid becomes 2-col.

- [ ] Verify locale keys (add if missing): `sections.collection.breadcrumb_home`, `product_count_one`, `product_count_other`, `filter_label`, `clear_filters`, `no_results`, `filters_toggle` in `locales/ar.default.json`. Schema keys in `locales/ar.default.schema.json`.
- [ ] Sync English locale files.

- [ ] Fully rewrite `sections/collection.liquid`:
  - Breadcrumb using `routes.root_url`
  - Product count using `collection.products_count` with `| pluralize:` for `product_count_one` / `product_count_other`
  - Filter sidebar using `collection.filters` — render `list` type filters as chip buttons, `boolean` as toggle; form uses GET to current URL with `filter.*` params
  - Product grid renders `product-card` snippet
  - Paginator using `paginate` tag
  - `<collection-filters>` web component intercepts filter form, fetches updated HTML via Section Rendering API (`?sections=collection-products`), replaces grid

- [ ] Add `{% stylesheet %}` for 2-col layout, sticky sidebar, chip filters, color swatches, mobile toggle.

- [ ] Add `{% javascript %}` for `<collection-filters>` web component: intercepts form submit, builds URL with filter params, fetches `?sections=main-collection`, replaces product grid innerHTML without reload.

- [ ] Add schema: `show_filters` (checkbox, default true), `products_per_page` (select: 12/24/48).

- [ ] Verify `templates/collection.json` references section type `collection`. If using default skeleton wiring, confirm the section id matches.

- [ ] Run `shopify theme check` — 0 errors.

---

## Task 12: `sections/product.liquid` (full rebuild)

**Design ref:** `Product.jsx` (full file)
**Files:** Modify `sections/product.liquid`, `templates/product.json`

Breadcrumb. 2-col grid `1.1fr 1fr`, `gap: var(--space-8)`, `align-items: start`. **Gallery column:** inner grid `72px 1fr`, `gap: var(--space-3)`. Thumbnails column: flex column, `gap: 10px`; each thumb is a `<button>`, `aspect-ratio: 4/5`, `--radius-md` border, 1px solid hairline (active: `--ink-900`), `overflow: hidden`. Main image: `--radius-lg`, `--cream-100` bg, `aspect-ratio: 4/5`, `overflow: hidden`. **Info column:** `position: sticky; top: 96px`. Badge (from `product.metafields.custom.badge.value`). h1 `product.title`. Price tag (sale / compare_at). Description `product.description`. Color picker (option loop, `<variant-picker>` web component). Size/age chips. Qty stepper (`<quantity-input>` web component). ATC button full-width (`<product-form>` web component). Trust chips row (3 chips: leaf, feather, truck). Accordion: 3 panels from `section.blocks` of type `accordion_panel`. Mobile: stacked, gallery above info.

- [ ] Verify locale keys (add if missing): `sections.product.breadcrumb_home`, `add_to_cart`, `sold_out`, `color_label`, `size_label`, `size_guide`, `trust_cotton`, `trust_gentle`, `trust_shipping`, `accordion_details`, `accordion_fabric`, `accordion_shipping`, `quantity_label` in `locales/ar.default.json`. Schema keys in `locales/ar.default.schema.json`.
- [ ] Sync English locale files.

- [ ] Fully rewrite `sections/product.liquid` with:
  - `{% render 'icon', icon: 'leaf', size: 15 %}` etc for trust chips
  - `<script type="application/json" id="product-json-{{ section.id }}">{{ product | json }}</script>` for variant picker JS
  - `{% unless product.has_only_default_variant %}` guard around variant UI
  - `{% form 'product', product %}` wrapping ATC form
  - `{% for block in section.blocks %}` for accordion panels

- [ ] Add `{% stylesheet %}` for 2-col layout, gallery grid, thumbnail buttons, sticky info panel, variant picker chips, accordion panels.

- [ ] Add `{% javascript %}` with:
  - `<product-gallery>` — thumbnail click swaps main image src/srcset, adds active border class
  - `<variant-picker>` — reads product JSON, color swatch + size chip selection updates hidden `input[name="id"]`, marks sold-out disabled
  - `<quantity-input>` — decrement/increment clamped 1–99
  - `<product-form>` — intercepts Shopify form submit, AJAX POST to `/cart/add.js`, on success dispatches `theme:cart:updated`, shows loading on ATC button, handles sold-out state
  - `<accordion-tabs>` — toggle panels with `aria-expanded`, `hidden`, CSS height transition

- [ ] Add schema: `show_breadcrumb` (checkbox); blocks of type `accordion_panel` with `title` (text) and `content` (richtext), max 4 blocks, with 3 default blocks (product details, fabric & care, shipping & returns).

- [ ] Verify `templates/product.json` references the product section.

- [ ] Run `shopify theme check` — 0 errors.

---

## Task 13: QA & Polish

- [ ] **Responsive audit** — open `shopify theme dev`, check every section at 360px, 768px, 1024px, 1440px. No overflow, no broken grids, images maintain focal-point crop.
- [ ] **Locale completeness** — grep all `'*' | t` and all `t:*` in schema across every section. For each key confirm it exists in `locales/ar.default.json` / `locales/ar.default.schema.json`.
- [ ] **Accessibility** — every interactive element keyboard-reachable, visible focus ring (`--ring`), correct `aria-*`, WCAG AA contrast.
- [ ] **Final `shopify theme check`** — must show 0 errors (only acceptable warnings: RemoteAsset for Google Fonts in layout/theme.liquid).
- [ ] **Update `PROGRESS.md`** — one row per completed section.

---

## Design Token Reference (quick lookup)

| Token | Value |
|---|---|
| `--surface-page` | `#FCFAF6` (cream-50) |
| `--surface-sunken` | `#EFE8DC` (cream-200) |
| `--surface-accent` | `#E9EEDF` (sage-100) |
| `--ink-900` | `#2B2721` |
| `--sage-100` | `#E9EEDF` |
| `--sage-600` | `#6E7D5C` |
| `--radius-xl` | `26px` |
| `--radius-lg` | `18px` |
| `--radius-md` | `12px` |
| `--fs-display` | `3.25rem` |
| `--space-8` | `3rem` |
| `--space-10` | `4rem` |
| `--grid-gutter` | `var(--space-5)` = `1.5rem` |
| `--container-max` | `1240px` |
| `--shadow-lg` | `0 18px 48px rgba(43,39,33,0.10)` |
