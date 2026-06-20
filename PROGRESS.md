# Progress Log — Beeko Shopify Theme

## Completed Tasks

### Task 2 — `snippets/product-card.liquid` (2026-06-20)

Created reusable product tile snippet. Pre-computes all `image_tag` params in `{% liquid %}` blocks to avoid formatter mangling (DISCOVERIES.md). Web component (`<product-card>`) intercepts quick-add form, POSTs to `/cart/add.js`, then fetches `/cart.js` and dispatches `theme:cart:updated` on `document`. Color swatches guarded with `unless product.has_only_default_variant`. Added `products.product.add_to_wishlist` to both Arabic and English locale files.

---

### Task 3 — `sections/hero.liquid` (2026-06-20)

Added `.btn` / `.btn--primary` / `.btn--outline` / `.btn--accent` / `.btn--lg` utilities to `assets/theme.css` (global, used by hero + future sections). Created hero section: mobile-first single column base, 2-col grid at 768px. `--fs-h1` on mobile, `--fs-display` on desktop. Image pre-computation in `{% liquid %}` block (DISCOVERIES.md). `loading: eager` + `fetchpriority: high` on above-fold image. Image position (left/right) via modifier class.

---

## Active Refinements
