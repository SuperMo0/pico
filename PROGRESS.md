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

### Cart drawer — Section Rendering API refactor (2026-06-21)

Rewrote `sections/cart-drawer.liquid` to use Shopify's Section Rendering API (push model, matching Dawn). Liquid now renders all cart content server-side — items, prices (`| money` in store currency), shipping bar progress, empty vs. filled state via `{% if cart.item_count > 0 %}`. Eliminated `_money()` (was hardcoded ر.س), `_esc()`, and all `items.map(...)` JS string-building. Fixed empty state always showing (`display:flex` was overriding `[hidden]` — removed hidden attributes entirely, Liquid conditionals handle it). Fixed checkout button: was `<a href="{{ routes.cart_url }}">` (went to cart page); now `<form method="post"><button name="checkout">` (goes directly to checkout). Updated `snippets/product-card.liquid` and `sections/product.liquid`: both fetch `/cart.js?sections=${cartSectionId}` (single request, replaces bare `/cart.js`) and dispatch `theme:cart:updated` with `{ cart, sectionHtml }`. Cart drawer `#changeQty` posts to `/cart/change.js` with `sections: [sectionId]` — single request returns cart JSON + rendered HTML, applied directly. `CartCount` in header unchanged (reads `e.detail.cart.item_count`). `shopify theme check` — 0 errors.

---

### Global logo + shop.brand.logo fallback (2026-06-21)

Moved logo picker out of both `sections/header.liquid` and `sections/footer.liquid` into `config/settings_schema.json` as a new "Brand" group (`settings.logo` + `settings.logo_width`). Both sections now resolve the logo via: `settings.logo` → `shop.brand.logo` → `shop.name` text fallback. Removed redundant `logo` / `logo_width` settings from both section schemas. Added `general.brand`, `labels.logo`, `labels.logo_width` to `ar.default.schema.json` and `en.schema.json`; removed the now-dead `sections.header.settings.logo/logo_width` and `sections.footer.settings.logo/logo_width` keys. `shopify theme check` — 0 errors.

---

### Smart sticky header (2026-06-21)

Replaced `sticky_header` checkbox with a three-way select: `off` / `always` / `smart`. `always` keeps the existing `position: sticky` approach (in-flow, no JS). `smart` uses `position: fixed; inset-inline: 0` on `.site-header__bar` with `transform: translateY(-100%) / translateY(0)` and 250ms ease-out transition — host element gets `minHeight` set from JS so the grid layout doesn't collapse. `_initSmartSticky()` on `SiteHeader`: passive scroll listener, hides after user scrolls past the bar's own height (threshold), reveals immediately on any upward scroll. Default is `smart`. Added `options.sticky_header.*` locale keys (off/always/smart) to both Arabic and English schema files. `shopify theme check` — 0 errors.

---

### Social media icons — footer, mobile menu, announcement bar (2026-06-21)

Added global social media icon system. Five platforms: Instagram, TikTok, Facebook, Twitter/X, YouTube. URLs managed via Theme Settings ("Social media links" group in `config/settings_schema.json`) so they're set once and shared everywhere. New `snippets/social-icons.liquid` handles the rendering (renders nothing when all URLs are blank). New social icon paths added to `snippets/icon.liquid` (`instagram`, `tiktok`, `facebook`, `twitter-x`, `youtube`). Icons appear in three places: (1) footer — below brand description with `tone: 'light'` (cream color); (2) mobile burger menu — at the bottom of the overlay panel with `tone: 'dark'` (ink color), pushed to bottom via `margin-top: auto`; (3) announcement bar — desktop only (`display: none` on mobile, flex at 768px), first column in a 3-col flex layout so social icons appear on the visual right in RTL, text stays centered, empty spacer balances the layout. Icons sized 32px in announcement bar, 40px elsewhere (44px touch target via `@media (hover: none)`). `shopify theme check` — 0 errors (3 acceptable Google Fonts warnings only).

---

### Hero — full-bleed overlay redesign (2026-06-21)

Reworked `sections/hero.liquid` from a 2-column text+image grid into a full-width image hero with text overlaid (design chosen via visual brainstorm). Mobile-first: `full-width` class (spans the `.shopify-section` grid edge-to-edge), `min-height: 80dvh`, image as a `z-index:-1` background layer, a bottom-rising gradient **veil** for legibility, and eyebrow + h1 + single CTA anchored to the bottom (`text-align: start`). Desktop (`@media min-width:768px`): content **centers** over a flatter wash, heading scales to `--fs-display`. Two modifier classes drive theming: `hero--text-light/dark` set `--hero-text` + `--hero-veil-rgb` (white text on ink veil, or ink text on cream veil); CTA colors flip to match so they pop on the photo. Veil strength is merchant-controlled via `overlay_opacity` range (0–80%) piped into `--hero-veil-alpha` as an inline style. Image still comes from `section.settings.image` (focal-point `object-position`); blank falls back to `placeholder_svg_tag`. Dropped the now-irrelevant `image_position` setting; added `text_color` + `overlay_opacity` settings and locale keys to both schema locale files. Updated `templates/index.json` hero entry to the minimal one-CTA design. `shopify theme check` — 0 errors (3 acceptable Google Fonts warnings only).

---

### Floating WhatsApp button — `sections/whatsapp-button.liquid` (2026-06-21)

New standalone section: a fixed circular WhatsApp FAB (chosen over the official English-only branded pill — the store is Arabic/RTL, so a language-neutral icon FAB fits the brand better). Merchant enters a **phone number** (international, no zeros/symbols) + an **optional pre-filled message**; the section strips stray `+ - ( ) space` from the number and builds the `https://wa.me/<number>?text=<url_encode message>` link in a `{% liquid %}` block per WhatsApp's docs. Renders nothing when the phone is blank. **Position** is a 4-corner `select` whose values are full modifier classes (`whatsapp-fab--br/bl/tr/tl`, default bottom-right), each setting `inset-block`/`inset-inline` via logical properties (so corners are visual, RTL-safe) + `env(safe-area-inset-bottom)` for notched phones. Brand green `#25d366` (hover `#1da851`) is intentionally hardcoded in the stylesheet as a recognized brand mark — commented to flag the deliberate palette exception; glyph color uses `--cream-50` token. The WhatsApp logo is inlined as a `fill="currentColor"` glyph (NOT added to `snippets/icon.liquid`, which is stroke-only `fill="none"` and would render the solid mark as an outline). `z-index: 60` sits above page content but below the cart drawer scrim (90/100). 56px target (>44px), `:focus-visible` ring, reduced-motion guard. Added `sections.whatsapp_button.aria_label` to storefront locales and `sections.whatsapp_button.*` (name + settings + 4 position labels) to both schema locales. Section is preset-enabled (merchant adds it per template; add to a section group like footer-group for site-wide display). `shopify theme check` — 0 errors (3 acceptable Google Fonts warnings only).

---

### Hero viewport height fix — mobile scrolling (2026-06-21)

Fixed mobile scrolling behavior where the hero image stretched when the browser's address bar and bottom controls hid during scroll. Root cause: `min-height: 80dvh` (dynamic viewport height) expands as the viewport grows. Solution: changed to `min-height: 80svh` (small viewport height), which locks the height at the smallest possible viewport regardless of browser UI visibility. This is the standard modern approach to prevent layout shift on mobile. `shopify theme check` — 0 errors.

---

### Quick-view modal — product card → `<popup-modal>` (2026-06-22)

Added a quick-view modal opened from the product-card quick-add button. Followed Dawn's architecture (no duplicated logic): the four product web components (`ProductGallery`, `VariantPicker`, `QuantityInput`, `ProductForm`) were **lifted verbatim** out of `sections/product.liquid`'s `{% javascript %}` into a global `assets/product-form.js` (loaded in `theme.liquid`), and the shared block CSS (gallery, title, price, variant options, qty/ATC) moved from the section's `{% stylesheet %}` into `assets/theme.css`. **Why:** the Section Rendering API returns only HTML — it does NOT ship a section's `{% javascript %}`/`{% stylesheet %}` bundles — so the components must be globally registered for the injected modal HTML to upgrade and be styled. The block markup was extracted into five shared snippets (`product-gallery`, `product-title`, `product-price`, `product-variant-picker`, `product-buy-buttons`), each taking `product` + `section_id` params; `product.liquid` now `{% render %}`s them from its `case` branches (product page behaviour unchanged — only desktop gallery grid + sticky + breadcrumb/description/trust/accordion CSS remain in the section). New `sections/quick-view.liquid` composes the snippets inside a `<product-form>` carrying `data-in-modal` + `data-product-url` + `data-added-label`; it uses `{% style %}` (inline, ships with the fragment) not `{% stylesheet %}`. `popup-modal.js` got `loadProduct(url)` (fetch `?sections=quick-view`, skeleton, abort handling, `popup-modal--wide`). Components are now context-aware: in the modal they fetch variant section-renders against the product URL (not `window.location`) and skip `history.replaceState`. Add-to-cart from the modal fires `theme:cart:updated` with `suppressDrawer: true` — `cart-drawer.liquid` refreshes contents but stays closed (one-line guard) while the modal shows an "Added" button state and the cart badge bumps. New locale keys: `products.product.{quick_view,view_full_details,added,quick_view_error}` + `sections.quick_view.name`. `shopify theme check` — 0 errors (3 acceptable Google Fonts warnings only). **Not yet browser-verified — needs a `shopify theme dev` pass.**

**Pre-existing oddity preserved:** `product-variant-picker.liquid` still emits a bare `{{value}}` after each colour swatch (carried over verbatim from `product.liquid` to avoid changing the product page). It prints the colour name as loose text next to swatches — likely an accidental leftover worth removing in both places.

---

### As-you-type search dropdown — header search (2026-06-22)

Turned the header's plain search dropdown into live as-you-type search (products + collections). **Critical constraint: predictive search (`/search/suggest` + `predictive_search`) has NO Arabic buyer-locale support** (Arabic isn't in Shopify's supported list), and this store is Arabic — so an initial predictive-search build was reworked to use the **standard `search` object**, which DOES support Arabic full-text. Both versions use the **Section Rendering API** so all markup/tokens/locale strings stay in Liquid.

New `sections/predictive-search.liquid` outputs **pure markup only**, fetched via `/search?q=TERM&type=product&options[prefix]=last&section_id=predictive-search` (`options[prefix]=last` = partial/prefix match for type-ahead). **Products** come from `search.results` (capped at 6) as compact rows (56px focal-point thumbnail + title + `| money`). **Collections aren't a search type** (standard search returns product/article/page only), so they're matched separately by looping the `collections` global and keeping those whose downcased `title` contains the downcased `search.terms` (Arabic substring match works), captured into a var and capped at 4 pill links on top. Plus a "view all results" link to `routes.search_url`. **Caveat:** the collections loop is bound by Liquid's 50-iteration cap — fine for this store's collection count. **Why pure markup:** the Section Rendering API does NOT ship a section's `{% stylesheet %}`/`{% javascript %}` (see DISCOVERIES.md), so **all CSS lives in `sections/header.liquid`'s `{% stylesheet %}`** and the fetch/keyboard JS is a new `<predictive-search>` web component in the header's `{% javascript %}` — both global because the header renders on every page. The section carries a `{% # theme-check-disable ValidScopedCSSClass %}` directive (its classes are intentionally defined globally).

`<predictive-search>` wraps the existing form (search-toggle still owns open/close + focus, so there's a single input owner); input got `role="combobox"` + `aria-controls`/`aria-expanded`/`aria-activedescendant`, results container is `role="listbox"`. Behaviour: 300ms debounce, fires at ≥2 trimmed chars, `AbortController` cancels in-flight fetches, endpoint is `routes.search_url` (JS fallback `/search`). Full ARIA combobox keyboard nav: Arrow Up/Down cycles an active option (`is-active` + `aria-selected`, `scrollIntoView`), Enter opens the highlighted result, empty/short query resets+hides the panel. Loading + no-results states included; `terms` escaped into the `_html` no-results key. The `predictive-search` naming (section/component/CSS/`search.predictive.*` locale keys) was kept — "predictive" describes the type-ahead UX, and renaming was pure churn. New locale keys `search.predictive.{products,collections,results_label,view_all}` added to `ar.default.json` first, mirrored in `en.json`. `shopify theme check` — 0 errors (only 3 pre-existing RemoteAsset warnings in another file). **Not yet browser-verified — needs a `shopify theme dev` pass.**

---

## Active Refinements
