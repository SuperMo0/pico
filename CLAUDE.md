# CLAUDE.md — Shopify Theme Project Context

> **You are building a production Shopify theme.** Read this file in full before touching any code. These rules are non-negotiable and override default behavior.

---

## 0. Required Reading (every new session)

Before any task, you MUST:

1. **Read** `PROGRESS.md` — current status, active refinements, and open backlog.
2. **Read** `DISCOVERIES.md` — known Shopify quirks; match your approach against "Bad" patterns before writing code.
3. **Read** `design-system/project/SKILL.md` — brand design system: tokens,
   component intent, voice, and visual guidelines. Required before any section,
   styling, or token decision.
4. **If the task involves new sections, new features, styling, layout, or token decisions:** also read the design system docs for this project, invoke the `shopify-architecture` skill, and invoke the brand design-system skill if one exists. Skip these for isolated bug fixes and copy/schema-only changes.

If any of these files or skills are missing, STOP and report it. Do not improvise.

---

## 0.5 Quick Commands

```bash
shopify theme dev --environment=<env>   # Live preview
shopify theme push --environment=<env>  # Push to store
shopify theme check                     # Lint / validate theme
```

> Replace `<env>` with the environment name configured in `.env` or `shopify.theme.toml`.

---

## 1. Project Context

This is a **fully-fledged, production-ready Shopify Online Store 2.0 theme**.

- **Not** a prototype. **Not** a demo. **Not** a static landing page.
- Must be **100% responsive** across mobile (≤640px), tablet (641–1024px), and desktop (≥1025px).
- Must be **merchant-editable** end-to-end via the Theme Editor — every text, image, color, link, and toggle is a schema setting or block.
- Target: passes Shopify Theme Store technical requirements (Lighthouse, a11y, performance, schema validation, locale completeness).

---

## 2. Shopify Architecture & Liquid Rules

### 2.1 Dynamic Liquid Objects — MANDATORY

All product, collection, cart, and content data MUST flow from Shopify Liquid objects. **Never** hardcode product names, prices, images, or copy in a production section.

| Use case | Required object |
| --- | --- |
| Product cards | `product`, `product.featured_media`, `product.price`, `product.url`, `product.metafields` |
| Collection grids | `section.settings.collection.products` (looped) |
| Cart count / drawer | `cart.item_count`, `cart.items`, `cart.total_price` |
| Recommended products | `recommendations.products` (with `intent: 'related'`) |
| Images | `image_url`, `image_tag`, `media`, `featured_media` |
| Money | `money`, `money_with_currency` filters (never raw price strings) |
| URLs | `routes.*`, `product.url`, `collection.url` (never hardcoded paths) |

**Static fallbacks are permitted ONLY** when a merchant has not yet selected a collection/product in the Theme Editor. In that case, render a clearly-labeled demo state behind an explicit `{% if section.settings.collection == blank %}` branch.

### 2.2 OS 2.0 JSON Schemas — MANDATORY

Every section MUST ship a comprehensive `{% schema %}` block:

- **Every** user-visible string is a setting (`text`, `richtext`, `inline_richtext`) with a `t:` locale key default.
- **Every** image is an `image_picker`.
- **Every** link is a `url` setting.
- **Every** color override is a `color` or `color_scheme` setting (defaults pull from theme tokens).
- Provide `blocks` (with `type`, `name`, `limit`, `settings`) wherever a section has a repeatable list (nav links, feature rows, footer columns, etc.). Loop with `{% for block in section.blocks %}` + `{{ block.shopify_attributes }}`.
- Include a `presets` array so the section is addable from the Theme Editor.
- Include `enabled_on`/`disabled_on` only when intentional.
- Use `header` and `paragraph` setting types to group settings logically in the editor.

### 2.3 Locale Management — STRICT

- All schema labels (`label`, `info`, `name`) MUST use `t:` keys mapped to `locales/en.default.schema.json`.
- All section-rendered strings MUST use `{{ 'key' | t }}` mapped to `locales/en.default.json`.
- New keys go under the correct namespace (`sections.<section_name>.*`, `accessibility.*`, `labels.*`, `general.*`). Do not flatten.

### 2.4 Section Groups & Templates

- Header/footer wire through `sections/header-group.json` and `sections/footer-group.json`.
- Homepage wires through `templates/index.json` (JSON template, not Liquid).
- All product/collection/cart/page templates use `.json` templates with section references.

### 2.5 Predictive Search — MANDATORY pattern

Follow Shopify's official pattern only. Key rules: form must work without JS (posts to `routes.search_url`); ARIA uses the W3C combobox + listbox pattern; `autocomplete="off"` suppresses browser-native suggestions. Do NOT invent a custom approach — if predictive search has already been implemented in this project, read the existing file and extend it.

### 2.6 Product Recommendations — MANDATORY pattern

Follow Shopify's official pattern only. Key rules: `recommendations` object is only populated via Section Rendering API (initial render shows nothing); BOTH guards required — `recommendations.performed?` AND `recommendations.products_count > 0`; load triggered by `IntersectionObserver` with `rootMargin: '0px 0px 200px 0px'`. Do NOT invent a custom approach.

---

## 3. Media & Images

### 3.1 Focal Point — MANDATORY

Anywhere CSS uses `object-fit: cover` on an image, the corresponding `<img>` MUST set:

```liquid
style="object-position: {{ image.presentation.focal_point }}"
```

This applies to ALL image renders: hero, product cards, thumbnails, galleries, etc. No exceptions. Merchants set focal points in the Files admin; the theme MUST honor them.

### 3.2 Responsive Images

- Always use `image_tag` with `widths:` and `sizes:` for responsive `srcset`.
- Always set `loading: 'lazy'` except for above-the-fold critical images (`loading: 'eager'` + `fetchpriority: 'high'`).
- Always set a meaningful `alt` — pull from `image.alt` first, fall back to a descriptive setting, never empty unless purely decorative (`alt: ''` + `aria-hidden`).
- Use `image_url` with explicit `width:` so Shopify CDN serves correctly-sized assets.

---

## 4. Design System & Styling

### 4.1 Source of Truth

Tokens are derived from `design-system/project/tokens/` and consolidated into
`assets/theme.css`. This is the only source of truth for colors, type, spacing,
radius, and motion.
**Never** introduce a raw hex, raw font family, raw magic number, or one-off scale. If a value is needed, it goes through the token system or it doesn't ship. If no design system skill exists for this project yet, define tokens in `assets/theme.css` (or equivalent global stylesheet) and treat that as canonical.

### 4.2 DRY & Global Utilities — MANDATORY

There is one global stylesheet for shared visual primitives loaded once from `layout/theme.liquid`.

**What MUST live in the global stylesheet:**

1. **Body defaults.** `body` sets the default `font-family`, `color`, and `background`. Sections do NOT re-set these unless explicitly inverting.
2. **Heading base rules.** `h1–h6` set the display font, weight, and any universal text transforms. Sections set only `font-size` (via `clamp()`) and contextual color overrides.
3. **Reset / box-sizing.** `*, *::before, *::after { box-sizing: border-box; }` Standard normalize baseline.
4. **Recurring micro-patterns** — when the EXACT same set of declarations appears in 2+ sections, extract a utility class. Do not extract for a pattern that only appears once.
5. **`.visually-hidden`** — WCAG-standard screen-reader-only utility (used for form labels and accessible text).
6. **Section bleed pattern** if used globally — `width: 100vw; margin-left: calc(50% - 50vw)`.

**What stays local in a section's `{% stylesheet %}`:**

- Layout genuinely unique to that section (grid templates, gaps, aspect ratios).
- Section-specific `font-size`, `color`, or `background` overrides.
- The section's own BEM block names.

**Anti-patterns — DO NOT do these:**

- Re-stating inherited font families inside sections when the body or heading base rule already provides them.
- Inventing a one-off utility class for a pattern that only appears once.
- Adding rules to the global stylesheet that only apply to a single section.

**The test before extracting:** "Have I written this exact CSS block in two different sections, and could a third also use it?" If yes — extract. If guessing — leave it inline.

### 4.3 Responsive

- Mobile-first. Base styles target mobile; `@media (min-width: …)` upgrades to larger viewports.
- Test mental model at 360px, 768px, 1024px, 1440px minimum.
- No fixed widths on layout containers; use `max-width`, `clamp()`, `grid`, `flex`.
- Typography scales via `clamp(min, fluid, max)`.

### 4.4 Accessibility

- Every interactive element is reachable by keyboard, has a visible focus state, and a correct `aria-*`.
- Every section has a labelled landmark (`aria-labelledby` → heading `id`).
- Color contrast meets WCAG AA against the section's background.
- Decorative SVGs and icons get `aria-hidden="true"`.

---

## 5. JavaScript — Web Component Approach

### 5.1 Default to native web components

All interactive UI (cart drawers, variant pickers, quantity steppers, modal dialogs, accordions, tabs, etc.) MUST be implemented as **custom HTML elements** (`class Foo extends HTMLElement`). This is the Shopify-idiomatic pattern and the simplest long-term architecture.

**Rules:**

- Define one custom element per interactive behavior. Name it with a dash: `<cart-drawer>`, `<product-form>`, `<variant-picker>`, `<quantity-input>`.
- All initialization logic goes in `connectedCallback()`. No external init calls needed.
- Use `this.querySelector(…)` / `this.querySelectorAll(…)` — never global selectors inside a component. This gives automatic scoping.
- Communicate between components via **custom events on `document`** (or a shared parent). Never reach into another component's internals.
- Register with `customElements.define('tag-name', ClassName)` at the bottom of the file.

**Example skeleton:**

```js
class CartDrawer extends HTMLElement {
  connectedCallback() {
    this.toggle = this.querySelector('[data-drawer-toggle]');
    this.toggle?.addEventListener('click', () => this.open());
    document.addEventListener('delve:cart:updated', (e) => this.refresh(e.detail.cart));
  }

  open() { this.setAttribute('open', ''); }
  close() { this.removeAttribute('open'); }
  refresh(cart) { /* update count / items */ }
}
customElements.define('cart-drawer', CartDrawer);
```

**Keep it simple:** Do not reach for a framework. Do not build an abstraction layer. One component = one file = one responsibility. If you need shared utilities, put them in a plain module file — not a base class hierarchy.

### 5.2 `document.currentScript` is always `null` in `{% javascript %}` blocks

Shopify concatenates all `{% javascript %}` blocks into a single bundle. `document.currentScript` is always `null` at runtime. Use `this.querySelector(…)` inside the component's own methods instead.

### 5.3 Event contract between components

When one component triggers a state change that others need to react to, fire a named event on `document`:

```js
document.dispatchEvent(new CustomEvent('theme:cart:updated', { detail: { cart } }));
```

Other components listen with `document.addEventListener('theme:cart:updated', …)`. Choose a consistent namespace prefix (e.g., `theme:`) and document it in `DISCOVERIES.md`.

---

## 6. Workflow

### 6.1 Subagent-driven development for non-trivial tasks

Every non-trivial task (new section, schema overhaul, bug fix touching multiple files) follows this pipeline:

1. **Implementer agent** — writes the Liquid, schema, locale entries, styles, and JS per spec.
2. **Spec-review agent** — verifies the implementation matches design intent and the schema is complete.
3. **Quality-review agent** — verifies Liquid correctness, locale coverage, focal-point usage, a11y, responsiveness, performance, and DRY adherence.

Do **not** mark a task DONE until all three passes are complete. Fixes from review feed back to the implementer; loop until clean.

### 6.2 After any feature or bug fix

After completing any feature or bug fix, append one row to `PROGRESS.md → Active Refinements`:

```text
| YYYY-MM-DD | <Area> | <One-line description of what changed and why> | Done |
```

Keep the description under ~55 characters. Add the row only on completion — do not pre-log pending work.

### 6.3 Commits

Do not commit anything unless the user explicitly says so.

### 6.4 Shopify-Specific Behavior — When In Doubt, Look It Up

**Default rule: if Shopify could have an opinion on it, look it up before writing code.**

This is not limited to the examples below. Any time you are about to assume how a Shopify API, Liquid object, filter, schema setting type, AJAX endpoint, theme architecture pattern, or built-in component works — stop and verify. The cost of a wrong assumption is a bug that is hard to trace. The cost of a `search_docs_chunks` call is two seconds.

**How to look it up:**

- Call `search_docs_chunks` with the feature or topic name (e.g. `"predictive search"`, `"image_tag filter"`, `"cart AJAX API"`).
- For section/Liquid/schema questions, invoke `/shopify-plugin:shopify-liquid` first.
- For CLI or store auth questions, invoke `/shopify-plugin:shopify-use-shopify-cli`.
- For metafield/metaobject questions, invoke `/shopify-plugin:shopify-custom-data`.
- For Storefront API questions, invoke `/shopify-plugin:shopify-storefront-graphql`.
- For any other Shopify topic with no specific skill match, use `/shopify-plugin:shopify-dev`.

**Common traps that always require a doc check before implementing:**

- **Shopify-provided custom elements** (`<shopify-account>`, etc.) — slot names, attributes, and events are NOT derived from the element name. Always search docs for the component + "slot" or "attributes".
- **Metaobject field names** — field names are merchant-defined. Never assume `.label`, `.title`, `.name`, or `.value` without confirmation. Ask the merchant or inspect the metaobject schema.
- **Section Rendering API response shape** — confirm selectors exist in rendered HTML before relying on them.
- **Liquid filter vs. method syntax** — Liquid has no object methods. All operations are pipe filters (`| escape`, not `.escape()`).
- **Any new section or interactive component** — invoke `/shopify-plugin:shopify-liquid` and search docs for the feature before writing a single line.

**Discovery log:** When a bug is fixed because of a wrong assumption about Shopify behavior, document it in `DISCOVERIES.md` immediately. Include: what was assumed, what the reality is, the fix, and the file/line affected.

**Known Shopify gotchas (do not re-derive):**

- `document.currentScript` is `null` inside `{% javascript %}` blocks — use `this.querySelector()` in web components.
- Multi-line `image_tag` filter chains break under auto-formatters — pre-compute all parameters in `{% liquid %}` blocks and call `image_tag` on a single line.
- Single-variant products synthesize a `Title / Default Title` option — guard with `unless product.has_only_default_variant`.
- CSS Grid reflows when conditional children disappear — always test single-item edge cases and use `:not(:has(child))` to adjust column definitions.
- State that depends on element visibility must live INSIDE the toggled element (not in a wrapper).

---

## 7. Live Documents — Keep These Updated

These files are the session memory for this project. Keeping them current is as important as writing correct code.

### `PROGRESS.md`

Tracks what is built and what is open. Format:

```markdown
## Active Refinements
| Date | Area | Description | Status |
| ... | ... | ... | ... |
```

Add a row on every completion. Never pre-log.

### `DISCOVERIES.md`

Tracks wrong assumptions that caused bugs. Format per entry:

```markdown
### Short descriptive title

**Issue:** What you tried to do and what went wrong.
**Root cause:** Why it actually fails.
**Bad:** (optional code of the wrong approach)
**Fix:** The correct pattern.
**Files affected:** Which files were fixed and where.
**Date discovered:** YYYY-MM-DD
```

Add an entry every time a bug is fixed due to a Shopify-specific or project-specific wrong assumption. Check this file before implementing any pattern — if your intent matches a "Bad" example, use the "Fix" instead.

---

## 8. Hard Bans

The following are **immediate rejections** in review:

- Hardcoded product names, prices, images, URLs, or copy in a production section (outside the explicit empty-collection fallback branch).
- Any `<img>` with `object-fit: cover` that omits the focal-point `object-position`.
- A schema setting without a `t:` locale key (or a `t:` key without a matching locale entry).
- A raw color hex, font family, or magic px value in a section stylesheet that should be a token.
- Duplicated CSS that should be a global utility.
- Interactive behavior implemented with vanilla JS event listeners scattered in `{% javascript %}` blocks instead of web components.
- Skipping any of the three review passes for non-trivial tasks.
- Marking a task DONE without updating `PROGRESS.md`.
- Adding `README.md` or other documentation files unless explicitly requested by the user.

---

## 9. When in Doubt

- **Design question** → re-read the design source files and the brand design-system skill for this project.
- **Any Shopify question, uncertainty, or "I think this is how it works"** → do NOT proceed on assumption. Call `search_docs_chunks` first, then write code. If a relevant skill exists (see §6.4), invoke it. This applies to filters, objects, schema setting types, AJAX APIs, built-in components, CLI flags, theme architecture — everything.
- **Scope question** → ask the user. Do not invent scope.

**The bar for skipping a doc check is high:** only skip it if you have already verified the exact behavior in this session (e.g. you just read the docs for this feature). "I'm pretty sure" is not a sufficient reason to skip.

Build it like it ships tomorrow.
