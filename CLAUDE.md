# CLAUDE.md — Beeko Shopify Theme

> Production Arabic-RTL Shopify OS 2.0 theme. Every rule below is non-negotiable.

---

## 0. Session Start — Read These First (every session)

1. `PLAN.md` — to know the important instrcutions at the top and what's next (top unchecked item)
2. `PROGRESS.md` — what's already shipped
3. `DISCOVERIES.md` — known gotchas; check before writing code
4. `design-system/project/SKILL.md` — brand tokens, voice, visual rules

**Before implementing any section or feature — read the matching JSX prototype file first:**

- `design-system/project/ui_kits/storefront/Header.jsx` → header
- `design-system/project/ui_kits/storefront/Home.jsx` → hero, reassurance strip, category grid, featured collection, editorial band
- `design-system/project/ui_kits/storefront/Listing.jsx` → collection page
- `design-system/project/ui_kits/storefront/Product.jsx` → product page
- `design-system/project/ui_kits/storefront/CartDrawer.jsx` → cart drawer
- `design-system/project/ui_kits/storefront/Footer.jsx` → footer

Every color, spacing value, border-radius, font size, and column count in the JSX is the source of truth. Do not invent layout — transcribe it.

**For any section, feature, styling, or layout task — also invoke these skills before writing a line:**

- `/shopify-architecture` — project-local skill, MANDATORY for all section/block/snippet work
- `/liquid-skills:shopify-liquid-themes` — Liquid syntax, schema patterns, filter reference
- `/liquid-skills:liquid-theme-standards` — CSS/JS coding standards

**Each skill needs to be invoked only once per session.** If a skill was already loaded earlier in the same conversation, do not invoke it again — the content is already in context.

If any file or skill is missing, STOP and report it.

---

## 0.5 Quick Commands

```bash
shopify theme dev --environment=<env>    # Live preview
shopify theme push --environment=<env>  # Push to store
shopify theme check                      # Lint / validate — run after every section
```

---

## 1. Non-Negotiable Rules

### Sections

- Every section is its own file in `sections/`. Never embed one section inside another.
- Every section has a `{% schema %}` with `name`, `settings`, `blocks` (where applicable), and `presets`.
- **Completion gate (mandatory):** After implementing any section or feature, run `shopify theme check` and fix every reported error to zero before marking the task done in PLANE.MD and updating `PROGRESS.md`. No exceptions.

### Locale — Arabic is the default

- `locales/ar.default.json` — all storefront strings (used by `{{ 'key' | t }}`)
- `locales/ar.default.schema.json` — all schema editor strings (used by `t:` in schema)
- **When implementing any section:** add ALL new locale keys to both Arabic files first. English files (`en.json`, `en.schema.json`) must be a subset of the Arabic defaults — never add keys there that don't exist in the Arabic files.
- **Before referencing any locale key** in `{{ 'key' | t }}` or a `t:` schema field, open `locales/ar.default.json` (or `ar.default.schema.json`) and confirm the key is present. Never write the reference first and add the key later.
- Keys must be namespaced: `sections.<name>.*`, `labels.*`, `general.*`, `accessibility.*`
- A section is NOT done until `shopify theme check` shows zero `TranslationKeyExists` or `MatchingTranslations` errors.

### Dynamic data — never hardcode

| Use case | Required object |
| --- | --- |
| Products | `product`, `product.featured_media`, `product.price`, `product.url` |
| Collections | `section.settings.collection.products` (looped) |
| Cart | `cart.item_count`, `cart.items`, `cart.total_price` |
| Images | `image_url`, `image_tag` with `widths:` + `sizes:` |
| Money | `| money` or `| money_with_currency` filter |
| URLs | `routes.*` — never hardcoded paths |

Static fallback only inside `{% if section.settings.collection == blank %}`.

### Images

- Every `object-fit: cover` image MUST have `style="object-position: {{ image.presentation.focal_point }}"`. No exceptions.
- Above-fold: `loading: 'eager'` + `fetchpriority: 'high'`. Everything else: `loading: 'lazy'`.
- Always use `image_tag` with `widths:` and `sizes:` for srcset.

### Styling

- All colors, type, spacing, and motion from tokens in `assets/theme.css` — never raw hex, font family, or magic numbers.
- **Never add `max-width: var(--container-max)` to section inner containers.** The `.shopify-section` class in `assets/critical.css` is a 3-column CSS grid whose middle column is already width-constrained by `--page-width`. Every direct child of `.shopify-section` defaults to `grid-column: 2` (the constrained column). Adding `max-width` on inner `__inner` divs is redundant. Use only `padding-inline: var(--container-pad)` for horizontal breathing room.
- **Full-width sections** (those that need an edge-to-edge background, e.g. footer, hero): add class `full-width` to the section's root element — this spans `grid-column: 1 / -1` (full viewport). The inner container still must NOT use `max-width: var(--container-max)`, only `padding-inline: var(--container-pad)`.
- Global stylesheet (`assets/theme.css`): body defaults, h1–h6 base, box-sizing reset, `.visually-hidden`, shared utilities.
- Section `{% stylesheet %}`: layout unique to that section only. No re-declaring inherited fonts/colors.
- **Mobile-first — non-negotiable:** Write base styles for the smallest screen (≤767px). Use only `@media (min-width: …)` to progressively enhance for larger viewports. Never use `@media (max-width: …)` to "patch" a desktop layout for mobile.
- **Touch fallbacks are mandatory:** Any interaction that depends on `:hover` (slide-up panels, reveal buttons, overlay controls) MUST have an `@media (hover: none)` block that makes the same functionality always visible or tap-accessible. Hover-only UI is unusable on mobile.
- **Minimum touch target:** Every `<button>`, `<a>`, or `<input>` must be at least 44×44px on mobile. Use `@media (hover: none)` to enlarge interactive elements if needed.
- **No fixed widths on containers.** Use `max-width` + `padding-inline` instead. `width: 100%` is the floor, not the ceiling.

### JavaScript

- All interactive UI = web components (`class Foo extends HTMLElement`). One component per file. Init in `connectedCallback()`. Scope with `this.querySelector()`.
- Cross-component events fire on `document` with `theme:` prefix: `document.dispatchEvent(new CustomEvent('theme:cart:updated', { detail: { cart } }))`.
- `document.currentScript` is always `null` inside `{% javascript %}` blocks — never use it.

### Modularity — prefer reuse over repetition

- **Snippets first:** Any markup used in 2+ sections belongs in `snippets/`. Render with `{% render 'snippet-name', param: value %}`. Never copy-paste Liquid blocks between sections.
- **Global CSS utilities:** Before writing new CSS, check `assets/theme.css` for an existing utility class. Add shared patterns there; never duplicate them in section stylesheets.
- **Global JS utilities:** Shared logic (e.g. focus trap, debounce, fetch helpers) lives in a dedicated `assets/*.js` file. Load it once; never inline the same logic in multiple components.
- If no reusable snippet/utility exists yet but the pattern will recur, create it first, then use it.

### Accessibility

- Every interactive element: keyboard reachable, visible focus state, correct `aria-*`.
- Every section: labelled landmark (`aria-labelledby` → heading `id`).
- WCAG AA contrast. Decorative SVGs: `aria-hidden="true"`.

---

## 2. When in Doubt — Look It Up

**Default rule: if Shopify could have an opinion on it, verify before writing code.**

- Liquid/schema/section questions → invoke `/shopify-plugin:shopify-liquid`
- CLI questions → invoke `/shopify-plugin:shopify-use-shopify-cli`
- Metafield/metaobject → invoke `/shopify-plugin:shopify-custom-data`
- Storefront API → invoke `/shopify-plugin:shopify-storefront-graphql`
- Anything else Shopify → invoke `/shopify-plugin:shopify-dev`
- **Multiple valid approaches exist?** → ask the user before picking one. Never silently choose.

Known gotchas (do not re-derive — also in DISCOVERIES.md):

- `document.currentScript` = `null` in `{% javascript %}` blocks
- Single-variant products synthesize `Title / Default Title` — guard with `unless product.has_only_default_variant`
- Multi-line `image_tag` filter chains break under auto-formatters — pre-compute params in `{% liquid %}` blocks
- CSS Grid reflows on conditional children — test single-item edge cases
- **Never set `max-width: var(--container-max)` on `__inner` divs** — `.shopify-section` grid already constrains width; use only `padding-inline: var(--container-pad)`. Add `full-width` class to the section root for edge-to-edge backgrounds.

---

## 3. Live Documents (session memory — keep current)

### `PLAN.md` — task roadmap

One unchecked item = one focused session. Do not skip or combine tasks.make sure to mark task as completed when you finish.

### `PROGRESS.md` — completion log

add some context of what was implemented and the desicion that you made, 1-3 lines so that next agent can continue from where you left.

### `DISCOVERIES.md` — wrong assumptions that caused bugs

Add an entry whenever a bug was caused by a wrong assumption about Shopify:

```text
### Title
**Issue:** what you tried / what went wrong
**Root cause:** why it fails
**Fix:** correct pattern
**Files affected:** path + line
**Date discovered:** YYYY-MM-DD
```

---

## 4. Hard Bans

- Hardcoded product names, prices, images, URLs, or copy outside the blank-collection fallback branch
- `object-fit: cover` image missing focal-point `object-position`
- Schema setting without a `t:` key, or `t:` key without a matching Arabic locale entry
- Raw hex, font family, or magic px in a section stylesheet
- Duplicated CSS that should be a shared utility
- Interactive behavior as scattered `{% javascript %}` listeners instead of web components
- Marking a task DONE without updating `PROGRESS.md`
- Adding README.md or other docs files unless the user explicitly requests it
- Not running `shopify theme check` before calling a section complete

---

## 5. Commits

Do not commit unless the user explicitly says to.

---

## 6. Task Execution

- **One task at a time.** Complete a task, report back to the user, and wait for explicit instruction before starting the next task.
- Never chain tasks automatically. "Implement the next step" means exactly one task.
- After each task: report what was done, run `shopify theme check`, update `PROGRESS.md`, then stop.
