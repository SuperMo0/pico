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

## Active Refinements
