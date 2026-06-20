# Progress Log — Beeko Shopify Theme

## Completed Tasks

### Task 2 — `snippets/product-card.liquid` (2026-06-20)

Created reusable product tile snippet. Pre-computes all `image_tag` params in `{% liquid %}` blocks to avoid formatter mangling (DISCOVERIES.md). Web component (`<product-card>`) intercepts quick-add form, POSTs to `/cart/add.js`, then fetches `/cart.js` and dispatches `theme:cart:updated` on `document`. Color swatches guarded with `unless product.has_only_default_variant`. Added `products.product.add_to_wishlist` to both Arabic and English locale files.

---

### Task 3 — `sections/hero.liquid` (2026-06-20)

Added `.btn` / `.btn--primary` / `.btn--outline` / `.btn--accent` / `.btn--lg` utilities to `assets/theme.css` (global, used by hero + future sections). Created hero section: mobile-first single column base, 2-col grid at 768px. `--fs-h1` on mobile, `--fs-display` on desktop. Image pre-computation in `{% liquid %}` block (DISCOVERIES.md). `loading: eager` + `fetchpriority: high` on above-fold image. Image position (left/right) via modifier class.

---

### Header + Announcement Bar alignment to design system (2026-06-20)

Replaced all inline SVG / `inline_asset_content` icon references in `sections/header.liquid` with `{% render 'icon', icon: '...', size: 20 %}`. Added wishlist heart button ("المفضّلة") between search and account icons. Switched `shopify-account` inner to use `slot="signed-out-avatar"` / `slot="signed-in-avatar"` slots. Changed cart icon from `icon-cart.svg` to `shopping-bag`, account from `icon-account.svg` to `user`. Fixed inner gap from `--space-5` to `--space-6` (matches JSX). Updated `sections/announcement-bar.liquid`: font-size `--fs-xs`, weight `--fw-medium`, tighter padding `--space-2 --space-4`. Added `wishlist_label` locale key to `ar.default.json` and `en.json`.

---

### Task 4 — `sections/reassurance-strip.liquid` (2026-06-20)

Created trust/reassurance strip section. Flex row with `flex-wrap: wrap` handles mobile reflow naturally — no breakpoint needed. Each block renders an icon (via `snippets/icon.liquid`) + label + optional subtext. Icon select limited to the 6 icons actually defined in `icon.liquid` (leaf, feather, truck, refresh-ccw, heart, shopping-bag) — plan referenced `shield`, `star`, `package` which don't exist yet. Added `sections.reassurance_strip.name` key to `ar.default.json` and `en.json` (was missing from storefront locale). Schema and schema locale keys were already present. `shopify theme check` — 0 errors.

---

### Task 5 — `sections/collection-list.liquid` (2026-06-20)

Created category grid section. Mobile-first: 2-col base grid, 4-col at 768px (plan had `max-width` — corrected to `min-width`). Image params pre-computed in `{% liquid %}` block. Fallback `visually-hidden` span used as `aria-labelledby` target when heading is blank. Added `sections.collection_list.name` to `ar.default.json` and `en.json` (was missing from storefront locale). Schema locale keys were already complete. `shopify theme check` — 0 errors.

---

### Task 6 — `sections/featured-collection.liquid` (2026-06-20)

Created featured collection section. Renders up to 4/8/12 products via `{% render 'product-card' %}`. Mobile-first 2-col base → 4-col at 768px (plan used `max-width` — corrected). Fixed plan's broken filter chain `view_all_label | default: '...' | t` — used a `{% liquid %}` block to pick label vs. locale key explicitly. Placeholder grid uses `'product-' | append: i` cycling 1-4 SVGs. OrphanedSnippet warning for product-card is now resolved. `shopify theme check` — 0 errors.

---

### Task 7 — `sections/editorial-band.liquid` (2026-06-20)

Created sage-100 2-col editorial band section. All locale keys were already present in both schema and storefront files — no additions needed. Image params pre-computed in `{% liquid %}` block per DISCOVERIES.md to prevent auto-formatter mangling. CSS is mobile-first: base 1-col grid, heading at `--fs-h2`; `@media (min-width: 768px)` switches to 2-col and `--fs-h1`, and applies `order` swap for `--img-left` modifier only at desktop width (plan used `max-width: 767px` — corrected to `min-width: 768px`). `shopify theme check` — 0 errors.

---

### Task 8 — `templates/index.json` (2026-06-20)

Wired all 5 homepage sections in order: hero (preserved existing entry with real Shopify image URL) → reassurance (4 trust blocks pre-filled) → categories (empty blocks, merchant adds collections via editor) → bestsellers (heading + count pre-filled) → editorial (copy pre-filled, merchant adds image). Stripped the auto-generated JS comment block (Shopify re-adds it on next push). `shopify theme check` — 0 errors.

---

### Task 9 — `sections/cart-drawer.liquid` + `sections/header-group.json` (2026-06-20)

Created slide-in cart drawer panel. All locale keys were already present. Translation strings for the dynamic shipping-progress message are embedded as `data-i18n-*` attributes using `| t: amount: '__AMOUNT__'` so JS can inject the real amount at runtime. Panel slides from `inset-inline-start: 0` (right edge in RTL) via `translateX(100%)` → `translateX(0)` using a CSS `--open` modifier class. `requestAnimationFrame` guards the class toggle so the CSS transition fires after `hidden` is removed. Scroll-lock via `html.scroll-lock { overflow: hidden }` defined in the section stylesheet. `_changeQty` re-dispatches `theme:cart:updated` after `/cart/change.js` resolves so any other listeners (e.g., header count badge) stay in sync. Added `cart-drawer` to `header-group.json` so the drawer renders on every page. `shopify theme check` — 0 errors.

---

### Task 10 — `sections/footer.liquid` (full rebuild) (2026-06-20)

Full rebuild of the footer section. Dark ink-900 background, 4-col grid desktop (`1.4fr 1fr 1fr 1fr`) → 2-col at 601px → 1-col on mobile. Column 1: logo image picker tinted cream via CSS `filter: brightness(0) invert(1)` + brand description richtext, falling back to shop.name. Columns 2–4: up to 3 `link_list` blocks (heading + menu). Bottom bar: copyright + trust tagline, flex row space-between. Both copyright and trust tagline fall back to locale keys (`sections.footer.copyright` / `sections.footer.trust_tagline`) when not set by merchant. Added `logo_width` key to both `ar.default.schema.json` and `en.schema.json` (was missing). Updated `sections/footer-group.json` to remove deprecated `menu`/`show_payment_icons` settings. `shopify theme check` — 0 errors (3 acceptable Google Fonts RemoteAsset warnings only).

---

### Task 11 — `sections/collection.liquid` (full rebuild) (2026-06-20)

Full rebuild of the collection page. All locale keys were already present in both `ar.default.json` and `en.json` — no additions needed. `paginate.items` used for accurate filtered product count (not `collection.products_count` which is unfiltered). Filter sidebar renders `list`-type filters from `collection.filters` as chips (all filters) or swatches (when `filter.label == 'اللون'`). `<collection-filters>` web component handles mobile toggle (adding `--open` class to sidebar) and AJAX filter updates: intercepts `data-filter-url` link clicks, fetches the new URL, parses the HTML response, and replaces the product grid + sidebar innerHTML. Sidebar hidden on mobile via CSS (`display: none`), always visible on desktop (`@media (min-width: 768px)`), no `!important` needed. `products_per_page` select uses the string value from schema (`"12"` etc.) with `| default: 12` fallback. `templates/collection.json` already wired correctly (`type: "collection"`, key `"main"`). `shopify theme check` — 0 errors (3 acceptable Google Fonts RemoteAsset warnings only).

---

### Task 12 — `sections/product.liquid` (full rebuild) (2026-06-20)

Full rebuild of the product page. All locale keys and schema keys were already present in both Arabic and English files. Used `<details>/<summary>` for the accordion (native browser toggle, no JS web component needed — more accessible, simpler). Key decisions: `product.featured_media` for the initial main image (not `product.images[0]`); `thumbnail data-main-src` stores the 900w URL for JS gallery swapping (srcset cleared on swap to avoid stale sizes); `{% form 'product', product %}` generates the Shopify form (CSRF + cart route handled automatically). Four web components in the `{% javascript %}` block: `<product-gallery>` (thumbnail click → update main image src + object-position), `<variant-picker>` (tracks selected options via position→value map, finds matching variant, dispatches `variant:changed` event), `<quantity-input>` (±1 clamped 1–99), `<product-form>` (listens for `variant:changed` to update price + ATC button state; intercepts form submit for AJAX `/cart/add.js` → dispatches `theme:cart:updated`). Money formatting handled via `shop.money_format` passed as `data-money-format` attribute (since `{% javascript %}` blocks cannot use Liquid). `{{ amount }}` in JS block causes theme check error — workaround: fallback to `{amount}` (single braces) + regex handles both. `templates/product.json` already wired correctly. `shopify theme check` — 0 errors (3 acceptable Google Fonts RemoteAsset warnings only).

---

### Product page — block-driven refactor + variant picker fix (2026-06-20)

Refactored `sections/product.liquid` to make the info column fully block-driven. Added 6 new block types: `title`, `price`, `description`, `variant_picker`, `buy_buttons`, `trust`. Kept `accordion_panel`. The `product-form` web component now wraps the entire info column (non-form elements inside `<form>` is valid HTML). The `product-json` script sits inside `product-form` but outside the `<form>` tag. Variant picker fix: instead of detecting option names to decide what to render, the code now loops ALL `product.options_with_values` and always renders every option — name detection is used only to choose display style (swatches vs chips). This fixes the "only 1 picker showing" bug regardless of exact option name spelling. Size guide link on non-color options is controlled via a `show_size_guide` checkbox + `size_guide_page` page-picker on the `variant_picker` block. Preset now includes 4 accordion blocks in correct order: "دليل المقاسات" (between variant_picker and buy_buttons), then product details / fabric / shipping. Added locale keys: `gallery_label`, `quantity_decrement`, `quantity_increment` to `ar.default.json` and `en.json`; all new block type keys to `ar.default.schema.json` and `en.schema.json`. `shopify theme check` — 0 errors on `sections/product.liquid` (all reported errors are from `docs/product.liquid` reference file only).

---

## Active Refinements
