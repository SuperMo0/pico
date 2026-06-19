# CLAUDE.md — Beeko Shopify Theme

> Production Arabic-RTL Shopify OS 2.0 theme. Every rule below is non-negotiable.

---

## 0. Session Start — Read These First (every session)

1. `PLAN.md` — what's next (top unchecked item)
2. `PROGRESS.md` — what's already shipped
3. `DISCOVERIES.md` — known gotchas; check before writing code
4. `design-system/project/SKILL.md` — brand tokens, voice, visual rules

**For any section, feature, styling, or layout task — also invoke these skills before writing a line:**

- `/shopify-architecture` — project-local skill, MANDATORY for all section/block/snippet work
- `/liquid-skills:shopify-liquid-themes` — Liquid syntax, schema patterns, filter reference
- `/liquid-skills:liquid-theme-standards` — CSS/JS coding standards

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
- **Completion gate (mandatory):** After implementing any section or feature, run `shopify theme check` and fix every reported error to zero before marking the task done or updating `PROGRESS.md`. No exceptions.

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
- Global stylesheet (`assets/theme.css`): body defaults, h1–h6 base, box-sizing reset, `.visually-hidden`, shared utilities.
- Section `{% stylesheet %}`: layout unique to that section only. No re-declaring inherited fonts/colors.
- Mobile-first. `@media (min-width: …)` for larger breakpoints. No fixed widths on containers.

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

---

## 3. Live Documents (session memory — keep current)

### `PLAN.md` — task roadmap

One unchecked item = one focused session. Do not skip or combine tasks.

### `PROGRESS.md` — completion log

Add one row on every completion (never pre-log):

```text
| YYYY-MM-DD | <Area> | <Description under 55 chars> | Done |
```

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
