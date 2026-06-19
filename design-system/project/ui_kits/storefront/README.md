# Beeko Storefront — UI kit

An interactive, high-fidelity recreation of the Beeko online store. Arabic,
RTL, built entirely from the design-system primitives (`window.BeekoDesignSystem_e717fe`).

## Run
Open `index.html`. It composes screens from sibling JSX files via the compiled
`_ds_bundle.js` (two levels up at the project root) and Lucide icons (CDN).

## Flow (all fake, client-side)
`Home` → click a product → `Product` (PDP) → **أضِف إلى السلّة** → `CartDrawer`
slides in. Header nav switches to `Listing` (category) pages; filters by age &
color work. Cart supports quantity, remove, and a free-shipping progress bar.

## Files
| File | Surface |
|---|---|
| `index.html` | Shell — loads React, bundle, icons, all screens. |
| `data.js` | Demo catalogue (`window.BEEKO.PRODUCTS` / `.CATEGORIES`). |
| `App.jsx` | Navigation state, cart state, screen routing. |
| `Header.jsx` | Sticky header — logo, nav, search/account/wishlist/cart. |
| `Home.jsx` | Hero, reassurance strip, categories, bestsellers, editorial band. |
| `Listing.jsx` | Category grid with age/color filters. |
| `Product.jsx` | PDP — gallery, color/size pickers, qty, accordion. |
| `CartDrawer.jsx` | Slide-in cart with free-shipping progress. |
| `Footer.jsx` | Ink footer, link columns. |

## Components used
`Logo, Button, IconButton, Input, Badge, Chip, ColorSwatch, QtyStepper,
ProductCard, PriceTag` — no primitives are re-implemented here.

## Notes
- Product photography is placeholder reference imagery from `assets/products/`.
- Prices use Arabic-Indic numerals; currency «ر.س» is text.
- No emoji; calm motion only (fades, gentle slides).
