# DISCOVERIES.md — Theme Quirks & Lessons

> Fixes born from wrong assumptions. Before implementing a similar pattern, search this file first.
> When a new bug is fixed because of a wrong assumption: add an entry here, then check if it warrants an update to `CLAUDE.md` §5.3.

---

## How to Use

1. Before implementing, search this file for related keywords (e.g., "currentScript", "metaobject", "grid", "image_tag").
2. If your intended pattern matches a **Bad** example below, use the **Fix** instead.
3. When you fix a bug caused by a wrong assumption: add a new entry (see template at bottom).
4. Link new entries in `PROGRESS.md` Active Refinements with `see DISCOVERIES.md#section-heading`.

---

## JavaScript & Shopify Bundling

### `document.currentScript` is always `null` in `{% javascript %}` blocks

**Issue:** Tried to find the parent section using:

```js
const script = document.currentScript;
const root = script?.closest('.shopify-section');
```

Both `script` and `root` were `null`. Quantity ± buttons failed silently.

**Root cause:** Shopify concatenates ALL `{% javascript %}` blocks from all sections into a single `theme.js` file. By the time that file executes, there is no "current script" — `document.currentScript` is always `null` in a bundled context.

**Fix:** Use global selectors with idempotent bind guards:

```js
document.querySelectorAll('.main-product__qty').forEach(function(form) {
  if (form.dataset.delveBound) return;
  form.dataset.delveBound = 'true';
  // bind handlers...
});
```

Wrap in `DOMContentLoaded` if the element may not exist yet at script parse time.

**Files affected:** `sections/main-product.liquid` (quantity picker JS block)
**Date discovered:** 2026-05-21

---

## Liquid Filter Syntax

### Liquid has no object methods — everything is a filter

**Issue:** Used `value.escape` expecting it to escape the string as an object method.

**Root cause:** Liquid has no object methods. Dot-notation on a string returns `nil`. The correct form is always a pipe filter.

**Bad:** `value="{{ value.escape }}"`
**Fix:** `value="{{ value | escape }}"`

**Files affected:** `snippets/product-variant-picker.liquid` (option value input)
**Date discovered:** 2026-05-21

---

### Auto-formatters mangle multi-line `image_tag` filter chains

**Issue:** Multi-line `image_tag` calls had their pipes reorganized by VS Code's auto-formatter, applying `| default:` to the OUTPUT of `image_tag` instead of as a named parameter. The Liquid became syntactically broken.

**Root cause:** Auto-formatters don't understand Liquid; they treat pipe characters like code operators and reflow them.

**Bad:**

```liquid
{{ media.preview_image
  | image_url: width: 1400
  | image_tag:
    loading: img_loading,
    alt: media.alt | default: product.title }}
```

**Fix:** Pre-compute ALL parameters in a `{% liquid %}` block, then call `image_tag` on a single line:

```liquid
{%- liquid
  assign img_alt = media.alt | default: product.title
  assign img_style = 'object-position: ' | append: media.preview_image.presentation.focal_point
-%}
{{ media.preview_image | image_url: width: 1400 | image_tag: loading: img_loading, widths: '600,900,1200,1600', sizes: '(min-width: 1024px) 50vw, 100vw', alt: img_alt, class: 'product-media-gallery__img', style: img_style }}
```

**Files affected:** `snippets/product-media-gallery.liquid` (media rendering loop)
**Date discovered:** 2026-05-21

---

## CSS & Layout

### `.shopify-section` grid already constrains container width — never add `max-width`

**Issue:** Added `max-width: var(--container-max); margin-inline: auto;` to `__inner` divs inside every section, expecting that to limit content width.

**Root cause:** `assets/critical.css` defines `.shopify-section` as a 3-column CSS grid:
`[margin] [content-column] [margin]`. Every direct child defaults to `grid-column: 2` (the content column), whose width is already controlled by `--page-width` and `--page-margin`. The inner `max-width` is therefore redundant and can interfere.

**Bad:**

```css
.hero__inner { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); }
```

**Fix:** Remove `max-width` from all `__inner` containers. Use only `padding-inline`:

```css
.hero__inner { padding-inline: var(--container-pad); }
```

For sections that need an **edge-to-edge background** (footer, hero, editorial band): add class `full-width` to the section root element. This triggers `.shopify-section > .full-width { grid-column: 1 / -1 }` — background spans full viewport. Inner container still uses only `padding-inline`, no `max-width`.

**Files affected:** All section `{% stylesheet %}` blocks
**Date discovered:** 2026-06-20

---

### Grid collapses when a conditionally-rendered child is missing

**Issue:** Gallery grid used `grid-template-columns: 72px 1fr`. On single-media products, the thumbnail `<ol>` is not rendered, so the stage `<div>` auto-places into the first (72px) column, squashing the image to 72px wide.

**Root cause:** CSS Grid auto-places children into available columns. When the first child disappears, the second becomes first and inherits the narrow column definition.

**Bad:** Assuming the grid always has the same number of children.

**Fix:** Use `:not(:has(child))` to adjust the grid template when a child is absent:

```css
.product-media-gallery:not(:has(.product-media-gallery__thumbs)) {
  grid-template-columns: 1fr;
}
```

**Files affected:** `snippets/product-media-gallery.liquid` (CSS block)
**Date discovered:** 2026-05-21

---

### State tied to visibility must live INSIDE the toggled element

**Issue:** Per-frame pagination counter (`01 / 04`) lived in a static `<div>` outside the figure loop. Gallery JS toggled `[hidden]` on figures, but the counter never updated — it always showed `01 / 04`.

**Root cause:** State that depends on which element is visible must be co-located with that element. If it lives in a wrapper, hiding/showing children has no effect on it.

**Bad:** Shared counter element outside the `<figure>` loop.

**Fix:** Move the counter INSIDE each `<figure>`. It auto-hides with the figure when the figure gets `[hidden]`:

```liquid
<figure data-media data-media-id="{{ media.id }}" {% unless is_active %}hidden{% endunless %}>
  {{ media.preview_image | image_url: ... | image_tag: ... }}
  <div class="product-media-gallery__meta product-media-gallery__meta--top">
    <span>{{ img_alt | upcase | truncate: 24 }}</span>
    <span>
      {%- if frame_index < 10 -%}0{%- endif -%}{{ frame_index }} /
      {%- if frame_total < 10 -%}0{%- endif -%}{{ frame_total }}
    </span>
  </div>
</figure>
```

**Files affected:** `snippets/product-media-gallery.liquid` (figure structure)
**Date discovered:** 2026-05-21

---

## Product & Variant Handling

### Single-variant products render a fake "Default Title" option

**Issue:** Variant picker rendered a fieldset with `Title / Default Title` for products that have no real variants.

**Root cause:** Shopify synthesizes a `Title / Default Title` option for every single-variant product to satisfy its internal data model. The picker must explicitly skip this case.

**Fix:** Wrap the entire variant picker (and any related UI like stock legend) in:

```liquid
{%- unless product.has_only_default_variant -%}
  {% render 'product-variant-picker', ... %}
{%- endunless -%}
```

**Files affected:** `sections/main-product.liquid` (variant picker render)
**Date discovered:** 2026-05-21

---

## Metafields & Metaobjects

### Metaobject field names are NOT intuitive — always ask or look them up

**Issue:** Assumed the `custom.volume` metaobject had `.label` and `.title` fields. It actually has `.name` and `.collection` fields. All breadcrumb volume links were broken.

**Root cause:** Metaobject schemas are merchant-defined. There is no convention for field names. Assuming them produces nil values and broken URLs with zero error output.

**Rule:**

- Before reading a metaobject field for the first time, ask the merchant what fields exist, OR search the Shopify MCP docs for the metaobject type.
- Never guess field names like `.label`, `.title`, `.name`, `.value` without confirmation.

**Confirmed fields for `custom.volume` in this store:**

- `.name` — display name string (e.g., "VOL.01")
- `.collection` — metaobject reference to a Shopify collection
- `.collection.value.url` — the resolved collection URL

**Files affected:** `snippets/product-breadcrumb.liquid`
**Date discovered:** 2026-05-21

---

### Metafield reference chain structure for `custom.volume`

**Correct access chain:**

```liquid
assign volume = product.metafields.custom.volume.value
{# volume is now the metaobject itself #}
assign volume_name = volume.name
assign volume_collection_url = volume.collection.value.url
```

**Note on `.id`:** The internal Shopify GID for a metaobject reference lives at `product.metafields.custom.volume.value.system.id` (via the `.system` sub-object), NOT at `.value.id`. This is rarely needed in Liquid templates.

**Files affected:** `snippets/product-breadcrumb.liquid`
**Date discovered:** 2026-05-21

---

## Shopify Custom Elements

### Shopify-provided custom elements use specific slot names — search docs before implementing

**Issue:** `<shopify-account>` requires specific slot names like `<div slot="signed-out-avatar">` to inject custom content. Implementing account links without knowing this results in content not rendering inside the element's intended slots.

**Root cause:** Shopify's first-party web components define their own slot API. These slot names are not derived from HTML standards — they are product-specific and only documented on Shopify's developer site.

**Rule:** Any time you use a `<shopify-*>` element, search the Shopify MCP docs FIRST:

- Query: component name + "slot" (e.g., "shopify-account slot")
- Tool: `mcp__plugin_shopify-plugin_shopify-mcp__search_docs_chunks`
- Never assume the element's internal API from the element name alone.

**Example correct usage:**

```html
<shopify-account>
  <div slot="signed-out-avatar">{{ 'sections.header.account' | t }}</div>
</shopify-account>
```

**Files affected:** `sections/header.liquid` (account icon / login link)
**Date discovered:** 2026-05-21

---

## Locale Files — Arabic Default Store

### Make Arabic the default locale, not English

**Issue:** Started with `en.default.json` and `ar.json`. Every key added to `ar.json` must also exist in `en.default.json` (Shopify validates non-default locales against the default). This means maintaining two full copies of every string for an Arabic-only store — pure overhead.

**Root cause:** Shopify determines the default locale by the filename: the file with `.default.` in its name is the source of truth. Non-default locale files are validated as translations and must be a subset of the default.

**Fix:** Rename the four locale files so Arabic is the default and English is just an optional translation:

```
locales/ar.default.json         ← Arabic storefront strings (source of truth)
locales/ar.default.schema.json  ← Arabic schema labels (source of truth)
locales/en.json                 ← English translation (optional, can be incomplete)
locales/en.schema.json          ← English schema translation (optional)
```

Done once via shell:
```bash
mv locales/ar.json locales/ar.default.json
mv locales/ar.schema.json locales/ar.default.schema.json
mv locales/en.default.json locales/en.json
mv locales/en.default.schema.json locales/en.schema.json
```

After this, add new strings **only** to `ar.default.json` and `ar.default.schema.json`. No English file maintenance required.

**Files affected:** All four locale files in `locales/`
**Date discovered:** 2026-06-20

---

## Entry Template

When adding a new discovery, copy this template:

```markdown
### Short descriptive title

**Issue:** What you tried to do and what went wrong.

**Root cause:** Why it actually fails.

**Bad:** (optional code example of the wrong approach)

**Fix:** The correct pattern.

**Files affected:** Which files were fixed and where.
**Date discovered:** YYYY-MM-DD
```
