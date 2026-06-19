# Beeko Shopify Theme — Implementation Plan

## Context

Beeko (بيكو) is a production Arabic-RTL Shopify Online Store 2.0 theme for kids' cotton homewear. The design system is fully specified in `design-system/project/SKILL.md` and its token files. A complete UI prototype exists as JSX files in `design-system/project/ui_kits/storefront/`. The skeleton theme is a bare starter — all sections, locale files, and the global stylesheet are empty or stub-only.

**Goal**: Build every section from the prototype into production-ready Shopify Liquid, wired fully to dynamic Liquid objects (no hardcoded products, links, prices, or images), with a complete Arabic locale, RTL layout, and merchant-editable schemas throughout.

**Arabic-only locale approach**: Populate `locales/ar.json` (storefront strings) and `locales/ar.schema.json` (theme editor labels) with Arabic text section by section. The en.default files remain as the key-namespace baseline. Merchants set Arabic as the store's default language in Shopify admin.

---

## Key Files

| File | Role |
|---|---|
| `design-system/project/SKILL.md` | Brand voice, component rules, design decisions |
| `design-system/project/tokens/*.css` | All raw and semantic design tokens |
| `design-system/project/ui_kits/storefront/*.jsx` | Prototype — source of truth for layout and UX |
| `assets/critical.css` | Reset + `.shopify-section` grid — keep as-is, do not add tokens here |
| `assets/theme.css` | To be created — Beeko tokens + RTL global stylesheet |
| `layout/theme.liquid` | Must add: `dir="rtl"`, Google Fonts, load theme.css |
| `snippets/css-variables.liquid` | Shopify-injected runtime vars — keep as-is |
| `locales/ar.json` | Empty — populate section by section |
| `locales/ar.schema.json` | Empty — populate section by section |
| `templates/index.json` | Currently only `hello-world` — rebuild with all homepage sections |
| `templates/collection.json` | Exists — verify wiring after collection section rebuild |
| `templates/product.json` | Exists — verify wiring after product section rebuild |
| `sections/header-group.json` | Add cart-drawer section reference here |

---

## Implementation Roadmap — Beeko Skeleton Theme

### Foundation

- [x] **Create `assets/theme.css`** — copy all token declarations from `design-system/project/tokens/colors.css`, `typography.css`, `spacing.css`, `radius.css`, `base.css` into one `:root {}` block; add RTL global stylesheet: `html { direction: rtl; }`, `body` font-family to `--font-body`, h1–h6 to `--font-display`, `.visually-hidden` utility, heading base weights and line-heights, `a` color and hover from `--link` / `--link-hover`, focus-visible using `--ring` token, `.container` max-width utility using `--container-max` + `--container-pad`
- [x] **Update `layout/theme.liquid`** — add `dir="rtl"` to `<html>`; add Google Fonts preconnect + stylesheet link for Tajawal (400/500/700/800) and IBM Plex Sans Arabic (400/500/700); load `assets/theme.css` via `stylesheet_tag` after `critical.css`; remove Shopify font preload block (we use Google Fonts directly for Beeko)
- [x] **Initialize locale stubs** — add top-level namespace keys to `locales/ar.json` and `locales/ar.schema.json` so they are valid JSON; keys filled section by section

---

### Announcement Bar

- [x] **Add announcement bar to `sections/header.liquid`** — full-width stripe above the nav bar; schema: `announcement_text` (text, default `t:`), `announcement_link` (url), `show_announcement` (checkbox); renders only when `show_announcement` is true; locale keys in `ar.json` and `ar.schema.json`

---

### Header Section

- [ ] **Rebuild `sections/header.liquid`** — sticky header (position: sticky, top: 0, z-index 50, backdrop-filter blur); announcement bar on top; logo row: logo image (`image_picker`, fallback to shop.name text), nav menu (`link_list` picker renders `linklists[header_menu].links` — no hardcoded links), icon toolbar (search, account `routes.account_url`, cart); schema settings: logo image, logo width, menu linklist, show search toggle, sticky enabled; locale keys for all aria-labels and sr-only strings
- [ ] **Implement `<site-header>` web component** — mobile hamburger toggle (opens/closes an overlay nav panel); desktop: nav links inline; breakpoint via CSS only (hamburger hidden above 768px); close overlay on ESC key; trap focus while open; dispatches no custom events
- [ ] **Implement search form** — `<search-toggle>` web component: icon click reveals an inline search bar (slides down); `<form>` posts to `{{ routes.search_url }}`; works without JS (icon links to `/search`); `autocomplete="off"`; placeholder from locale; close on ESC or outside click
- [ ] **Wire cart icon badge** — `<cart-count>` span initialized from `{{ cart.item_count }}`; listens for `theme:cart:updated` event; updates count display; shows/hides badge when count > 0
- [ ] **Verify `sections/header-group.json`** — header section is already referenced; add `cart-drawer` section reference here so the drawer is in the DOM on every page

---

### Hero Section

- [ ] **Create `sections/hero.liquid`** — 2-column grid (text column + image column) on desktop ≥768px; stacked (image below text) on mobile; schema: `eyebrow_text` (text), `heading` (text), `subheading` (richtext), `image` (image_picker), `primary_cta_label` (text), `primary_cta_url` (url), `secondary_cta_label` (text), `secondary_cta_url` (url), `image_position` (select: right/left); image rendered with `image_tag`, `widths:`, `sizes:`, `loading: 'eager'`, `fetchpriority: 'high'`, focal point `object-position: {{ image.presentation.focal_point }}`; section has `aria-labelledby` → heading id; presets entry so it's addable from Theme Editor; locale keys in `ar.json` + `ar.schema.json`
- [ ] **Add hero to `templates/index.json`**

---

### Reassurance Strip

- [ ] **Create `sections/reassurance-strip.liquid`** — full-width strip with `--surface-sunken` background, border-top and border-bottom; horizontal flex row (wraps on mobile) of icon+label items; implemented as `blocks`; schema: up to 8 blocks each with `icon` (select list: leaf, feather, truck, refresh-cw, shield, star, heart, package), `label` (text), `subtext` (text, optional); SVG icons inlined via snippet `snippets/icon.liquid`; locale keys
- [ ] **Add reassurance strip to `templates/index.json`**

---

### Category Grid

- [ ] **Create `sections/collection-list.liquid`** — heading + 4-column grid (2-col on mobile) of collection cards; each card: `collection.featured_image` rendered with focal point, card aspect-ratio 3:4, absolute-positioned label overlay showing `collection.title`; card links to `collection.url`; schema: `heading` (text), up to 8 collection blocks each with `collection` (collection picker) — all images and titles come from the collection Liquid object; locale keys
- [ ] **Add collection list to `templates/index.json`**

---

### ProductCard Snippet (shared — used by Featured Collection + Collection page)

- [ ] **Create `snippets/product-card.liquid`** — accepts `product` variable; renders: `product.featured_media` as primary image with `image_tag` lazy, hover image from `product.media[1]` via `data-hover-src` attribute, badge from `product.metafields.custom.badge` or tag, `product.title`, age range from `product.metafields.custom.age_range`, `product.price | money` + `product.compare_at_price | money` when on sale (marked with `--text-sale`), color swatch strip from `product.options_with_values` for the color option (one swatch per value, background color from metafield or CSS class), quick-add button (form submit to `/cart/add`, AJAX via product-card component); `unless product.has_only_default_variant` guard around variant UI
- [ ] **Implement `<product-card>` web component** — hover image swap on `mouseenter`/`mouseleave` (swaps `src` and `srcset`); color swatch click updates displayed image to that variant's media; quick-add button: AJAX POST to `/cart/add.js`; on success dispatches `theme:cart:updated` with cart payload; no page reload; shows loading spinner on button during request

---

### Featured Collection Section

- [ ] **Create `sections/featured-collection.liquid`** — section heading, "view all" link (to `section.settings.collection.url`), 4-column product grid (2-col mobile, 3-col tablet, 4-col desktop); renders `section.settings.collection.products` (sliced to `section.settings.product_count`); each product rendered via `snippets/product-card.liquid`; static empty-state branch when `section.settings.collection == blank`; schema: `heading` (text), `collection` (collection picker), `product_count` (select: 4/8/12), `view_all_label` (text); locale keys
- [ ] **Add featured collection to `templates/index.json`**

---

### Editorial Band Section

- [ ] **Create `sections/editorial-band.liquid`** — `--surface-accent` (sage-100) background, `--radius-xl` corners; 2-column grid (text + image); schema: `eyebrow` (text), `heading` (text), `body` (richtext), `cta_label` (text), `cta_url` (url), `image` (image_picker), `image_position` (select: right/left, default right); image with focal point, `object-fit: cover`, aspect-ratio 1:1; text column: eyebrow in small caps, h2, richtext body, CTA button (accent style); `aria-labelledby` on section; locale keys
- [ ] **Add editorial band to `templates/index.json`**
- [ ] **Update `templates/index.json` order** — finalize section render order: hero → reassurance-strip → collection-list → featured-collection → editorial-band

---

### Collection Page (Listing)

- [ ] **Rebuild `sections/collection.liquid`** — breadcrumb (Home / collection.title with `routes.root_url`), page heading (h1 = `collection.title`), product count line; 2-column layout (filter sidebar left, product grid right) on desktop ≥768px; product grid uses `snippets/product-card.liquid` in a 3-col grid (2-col tablet, 1-col mobile); paginator using `paginate` tag on `collection.products`; empty-state message when no products match; schema: `show_filters` (checkbox), `products_per_page` (select: 12/24/48); locale keys
- [ ] **Implement faceted filter sidebar** — uses Shopify's native `collection.filters` object (storefront filtering); renders age-range and color filters as chip toggles; filter form submits to current URL with `filter.*` params appended; `<collection-filters>` web component: intercepts form submit, fetches filtered collection via Section Rendering API (`?sections=collection&filter.*=...`), replaces product grid innerHTML without page reload; shows active-filter count badge; "clear filters" link resets all params; sidebar is hidden on mobile behind a "Filters" toggle button
- [ ] **Verify `templates/collection.json`** wires to rebuilt collection section

---

### Product Page (PDP)

- [ ] **Rebuild `sections/product.liquid`** — breadcrumb (Home / product.title); 2-column grid (gallery 55% left, info panel 45% right sticky `top: 96px`) on desktop; stacked on mobile; `aria-labelledby` on section; schema: `show_breadcrumb` toggle, accordion content blocks (richtext for product details, fabric care, shipping & returns); locale keys for all strings
- [ ] **Implement `<product-gallery>` web component** — thumbnail strip from `product.media` (first 3 thumbnails, 72px wide, column layout); main image (4:5 aspect ratio, `--radius-card` border); thumbnail click swaps main image src/srcset and active border; built from `product.media` loop, no hardcoded images
- [ ] **Implement `<variant-picker>` web component** — reads `product.variants` JSON from a `<script type="application/json">` tag in the section; color swatches: one button per color option value, swatch background from product option metafield (CSS custom property); size chips: one button per size/age option; selecting updates hidden `input[name="id"]` variant_id; marks sold-out variants disabled; respects `unless product.has_only_default_variant` guard
- [ ] **Implement `<quantity-input>` web component** — decrement / number input / increment; clamped 1–99; emits `change` event on the input; used in both PDP and cart drawer
- [ ] **Implement `<product-form>` web component** — wraps Shopify `<form action="/cart/add">` product form; on submit: AJAX POST to `/cart/add.js` with variant id + qty; on success: fetches `/cart.js` for full cart state, dispatches `theme:cart:updated` with payload on `document`; shows loading state on ATC button; handles sold-out (button text switches to locale "sold_out" string); falls back to native form submit if JS fails
- [ ] **Implement `<accordion-tabs>` web component** — renders 3 expandable panels: Product Details, Fabric & Care, Shipping & Returns; all panel content comes from `section.blocks` (type: `accordion_panel`, settings: `title` text + `content` richtext); first panel open by default; toggled with `aria-expanded`, `aria-controls`, `hidden` attribute; smooth CSS height animation using `--dur-base` motion token; no hardcoded text
- [ ] **Trust chips strip** — inline in product section (not web component): 3 chips with icons; text from locale `ar.json`; no schema settings needed (always shown)
- [ ] **Verify `templates/product.json`** wires to rebuilt product section

---

### Cart Drawer (Web Component)

- [ ] **Create `sections/cart-drawer.liquid`** — full drawer markup: fixed scrim overlay + slide-in panel (420px wide, 92vw max); panel structure: header row (title + close button), free-shipping progress bar, scrollable line-items list, pinned checkout footer; all text from locale `ar.json`; schema: `free_shipping_threshold` (number, default 200); section registered as `cart-drawer` type
- [ ] **Add `cart-drawer` to `sections/header-group.json`** so it renders on every page
- [ ] **Implement `<cart-drawer>` web component** — listens for `theme:cart:updated` on `document`; on open: `setAttribute('open', '')` → CSS `translateX(0)` transition; on close: `removeAttribute('open')` → slides back; scrim click closes; ESC key closes; adds/removes `scroll-lock` attribute on `<html>` to lock body scroll while open; fetches `/cart.js` to refresh state after any cart mutation
- [ ] **Implement cart line item rendering** — for each cart item: `image_url` thumbnail (78×96px), item title, variant title (size · color), `<quantity-input>` (AJAX POST to `/cart/change.js` on change), remove button (trash icon, AJAX POST to `/cart/change.js` with qty 0), line total price; all rendered from cart JSON payload after `theme:cart:updated`; empty-state when `cart.item_count === 0`
- [ ] **Implement free-shipping progress bar** — threshold from section setting; progress width = `min(100, subtotal / threshold * 100)%`; animated via `--dur-base` CSS transition; text: "أضف X ر.س للشحن المجاني" → "حصلتِ على الشحن المجاني!" when threshold met; subtotal and remaining from cart JSON
- [ ] **Implement checkout button** — links to `routes.cart_url` (standard Shopify checkout); no AJAX needed; locale key for button label and fine print text

---

### Footer Section

- [ ] **Rebuild `sections/footer.liquid`** — dark `--ink-900` background, `--cream-200` text, `--space-12` top margin; 4-column grid (brand 1.4fr + 3 nav columns 1fr each) collapses to 2-col on tablet and 1-col on mobile; Column 1: logo (image_picker, cream tint), brand description (richtext); Columns 2–4: each is a `link_list` block (linklist picker → renders `linklists[block.settings.menu].links` — no hardcoded links); bottom bar: copyright text (text setting), trust tagline text (text setting); schema: logo image, brand description richtext, 3 menu blocks, copyright text, trust tagline; locale keys
- [ ] **Verify `sections/footer-group.json`** references footer section correctly

---

### Polish & QA

- [ ] **Responsive audit** — manually verify every section at 360px (mobile), 768px (tablet), 1024px (large tablet), 1440px (desktop): no overflow, no broken grids, no truncated text, images maintain focal-point crop
- [ ] **Accessibility audit** — every interactive element keyboard-reachable; visible focus ring (CSS `--ring` token); all images have meaningful `alt`; all sections have `aria-labelledby` pointing to their heading; ARIA roles correct on nav, combobox (search), dialog (cart drawer); color contrast WCAG AA on all text/background pairs
- [ ] **Locale completeness** — for every `{{ 'key' | t }}` call and every `t:` schema label across all sections, confirm a matching key exists in `locales/ar.json` and `locales/ar.schema.json`; no missing or orphaned keys
- [ ] **Run `shopify theme check`** — resolve all errors and warnings before shipping
- [ ] **Performance audit** — hero image has `loading: 'eager'` + `fetchpriority: 'high'`; Google Fonts loaded with `display=swap`; `theme.css` loaded with preload; no render-blocking scripts; product grid images `loading: 'lazy'`

---

## Design Token Cheat Sheet (reference during implementation)

- Page background: `var(--surface-page)` = `#FCFAF6`
- Card background: `var(--surface-card)` = `#FFFFFF`
- Raised surface / hover: `var(--surface-raised)` = `#F6F1E9`
- Sunken block: `var(--surface-sunken)` = `#EFE8DC`
- Accent tint: `var(--surface-accent)` = sage-100 `#E9EEDF`
- Primary text: `var(--text-strong)` = `#2B2721`
- Body text: `var(--text-body)` = `#5A5246`
- Muted text: `var(--text-muted)` = `#8C8473`
- Accent text/links hover: `var(--text-accent)` = `#5E6C4F`
- Sale price: `var(--text-sale)` = `#B0593F`
- Hairline border: `var(--border-hairline)` = `#E7DECF`
- Focus ring: `var(--ring)` = sage-tinted box-shadow
- Primary button: `var(--action-primary)` fill = `#2B2721`, text = `var(--action-primary-text)`
- Accent button: `var(--action-accent)` = `#6E7D5C`
- Display font: `var(--font-display)` = Tajawal
- Body font: `var(--font-body)` = IBM Plex Sans Arabic
- Card radius: `var(--radius-card)` = 18px
- Motion: `var(--dur-base)` = 220ms, `var(--ease-soft)`
- Container max: `var(--container-max)` = 1240px

## Verification

- After Foundation: run `shopify theme dev` and confirm page loads with correct fonts, cream background, RTL layout
- After each section: view in Theme Editor, confirm all schema settings appear and work, confirm no hardcoded strings remain, confirm Arabic text renders
- After Cart Drawer: add a product, verify cart drawer opens, qty updates, remove works, free-shipping progress animates
- After Collection page: apply age and color filters, verify URL params update and grid re-renders without page reload
- After polish: run `shopify theme check` with 0 errors; run Lighthouse on homepage and PDP
