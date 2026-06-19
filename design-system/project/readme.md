# Beeko — Design System (بيكو)

> بيكو لملابس الأطفال القطنية — *Beeko, for kids' cotton homewear.*

Beeko is an Arabic, RTL-first online store selling **soft cotton homewear and
basics for babies and young children** — tees, long-sleeves, leggings,
joggers, vests and two-piece sets in a calm range of pastel colorways.

The brand promise is **cotton you can trust**: soft, breathable, quality
basics. The design language is deliberately **quiet and plain** so that the
products — not the chrome — carry the page. Warm cream space, warm-ink text,
one restrained sage accent, and the products' own pastel colors do the rest.

---

## Sources given

- **15 product / inspiration photos** (`uploads/…`, curated copies in
  `assets/products/`): pastel cotton tees, long-sleeves, leggings, joggers and
  sets, shot on hangers, flat-lays and on-model in calm, naturally-lit nursery
  settings. These establish the *product category and mood*. The garments in
  the reference shots carry a third-party supplier mark; treat them purely as
  placeholder product imagery — Beeko's own brand mark is the wordmark defined
  in this system.
- **Brief:** Arabic brand & store, fully RTL. "Simple and plain… confidence of
  cotton and quality… focus on showing the products with not too many visuals
  and colors."
- No logo, codebase, Figma or font files were provided — see **Caveats**.

---

## CONTENT FUNDAMENTALS

How Beeko writes. All customer copy is **Arabic (MSA, warm and plain)**.

- **Voice:** calm, caring, confident. Like a thoughtful parent, not a hype
  marketer. Short sentences. No exclamation pile-ups, no ALL-CAPS shouting.
- **Person:** address the customer directly and warmly — **«لطفلك» / «لصغيرك»**
  ("for your little one"). Speak about the product plainly in the third person.
- **Tone:** reassuring and tactile. Lead with **comfort, softness, breathable
  cotton, gentle on skin, easy care**. Quality is *shown* (fabric, fit,
  details), stated once, never over-promised.
- **Casing & punctuation:** Arabic has no case. Keep Latin/numerals minimal.
  Prices in Arabic-Latin numerals + currency «ر.س». Avoid decorative
  punctuation; a single «.» or «،» is enough.
- **Numbers & sizes:** sizes by age — «0–3 أشهر»، «6 أشهر»، «سنة»، «سنتان».
  Use «٪» for percentages where natural, otherwise keep plain.
- **Emoji:** **none.** The brand never uses emoji in product or UI copy.
- **Examples (use these patterns):**
  - Hero: **«قطن ناعم… ليوم كامل من اللعب والراحة»**
  - Sub: **«ملابس منزلية مريحة بألوان هادئة، مصنوعة من قطن لطيف على بشرة طفلك.»**
  - Product blurb: **«تيشيرت قطني بأكمام طويلة، نعومة عالية وخامة تتنفّس.»**
  - CTA: **«أضِف إلى السلّة» / «تسوّق المجموعة» / «اعرف القياس»**
  - Reassurance chips: **«قطن ١٠٠٪»، «لطيف على البشرة»، «سهل العناية»**
  - Empty cart: **«سلّتك فارغة الآن.»**

---

## VISUAL FOUNDATIONS

The look in one line: **a sunlit, cotton-soft nursery — warm, airy, minimal.**

- **Color.** A warm **cream/ivory canvas** (`--cream-50`) with **warm-ink**
  text and primary buttons (`--ink-900`, a soft brown-black, never pure #000).
  A single **muted sage** accent (`--sage-600`) appears sparingly — links,
  secondary actions, "organic" cues. The eight **product pastels** (blue, pink,
  peach, mint, sage, lilac, cream, grey) are the only saturated color and live
  almost entirely *inside* product imagery and color-swatch chips. Never wash a
  whole section in pastel.
- **Type.** **Tajawal** for display/headings (clean geometric, confident);
  **IBM Plex Sans Arabic** for body/UI (humanist, legible). Headings are bold
  but not huge; body runs at a generous `1.75` line-height — Arabic needs air.
  Arabic text is **never letter-spaced**; only tiny Latin eyebrow labels are.
- **Spacing & layout.** 8px rhythm, **very generous whitespace**. Centered
  `1240px` max container. Product grids breathe (24–32px gutters). Sections are
  separated by space, not by lines or boxes.
- **Backgrounds.** Mostly flat cream or white. **No gradients. No textures, no
  patterns, no blur.** Photography carries all the warmth — large, calm,
  naturally-lit product/lifestyle shots, often on cream or pale-wood settings.
  Imagery is **warm, soft, slightly low-contrast, airy** (never cool, never
  high-contrast or grainy). Full-bleed imagery is reserved for the hero and
  occasional editorial band.
- **Cards.** White fill, **1px warm hairline border** (`--sand-200`),
  `--radius-lg` (18px) corners, **little or no shadow** at rest. Product cards
  are borderless — just the image on cream with text beneath. Shadows, when
  used (menus, dialogs, hover-lift), are **warm-tinted, soft and diffuse**
  (`--shadow-sm/md`), never hard.
- **Corner radii.** Gentle: inputs/buttons `--radius-sm`→`md`, cards
  `--radius-lg`, pills/chips full. Nothing sharp, nothing bubbly.
- **Borders.** Hairline, warm sand. Used for structure (cards, inputs,
  dividers) far more than shadow.
- **Hover.** Subtle. Buttons darken slightly (ink→ink-800); product images
  lift gently (`translateY(-2px)` + soft shadow) and may cross-fade to a second
  shot; links shift to sage. **Press:** a small scale-down (`0.98`) or darken,
  never a bounce.
- **Animation.** Calm and short — `140–400ms`, ease `cubic-bezier(0.4,0,0.2,1)`.
  Fades and gentle slides only. No springs, no infinite loops, no parallax.
- **Transparency / blur.** Avoid. A sticky header may use a near-opaque
  cream background; no glassmorphism.
- **Fixed elements.** Slim sticky header (logo center/right, nav, search,
  cart). That's it.

---

## ICONOGRAPHY

- **System:** **Lucide** (https://lucide.dev) — thin, rounded-cap line icons at
  ~1.75px stroke. Their soft, friendly, low-weight line matches Beeko's calm,
  cotton-soft tone. Loaded from CDN (`lucide@latest`); see `assets/icons/`
  notes. **This is a substitution** (no brand icon set was provided) — flagged
  to the user.
- **Usage:** sparse and functional — search, cart, account, heart/wishlist,
  chevrons, filter, close, plus/minus, truck (shipping), leaf (cotton/care).
  Icons are `--ink-700` on cream, sized 18–22px, never multi-color.
- **Emoji:** never used.
- **Unicode glyphs:** avoided as icons. Currency «ر.س» is text, not an icon.
- **No hand-drawn SVG illustration.** Warmth comes from photography, not
  decorative drawings.

---

## INDEX — what's in this system

| Path | What |
|---|---|
| `styles.css` | Global entry point — `@import`s every token + base file. Link this. |
| `tokens/colors.css` | Warm neutrals, ink, sage accent, product pastels, semantic aliases. |
| `tokens/typography.css` | Families, weights, type scale, line-heights. |
| `tokens/fonts.css` | Google Fonts `@import` (Tajawal + IBM Plex Sans Arabic). |
| `tokens/spacing.css` | 8px spacing scale + layout sizes. |
| `tokens/radius.css` | Radii, borders, soft shadows, motion. |
| `tokens/base.css` | RTL document defaults, headings, links. |
| `guidelines/*.card.html` | Foundation specimen cards (Type, Colors, Spacing, Brand). |
| `components/core/` | Button, IconButton, Input, Badge, Card, Chip, ColorSwatch, Rating, QtyStepper. |
| `components/commerce/` | ProductCard, PriceTag, Logo. |
| `ui_kits/storefront/` | Interactive storefront recreation (home → listing → product → cart). |
| `assets/products/` | Curated product/lifestyle photography. |
| `SKILL.md` | Agent-Skills manifest for portable use. |

**Namespace:** components mount under `window.Beeko` — run `check_design_system`
for the exact namespace and export list.

---

## Caveats / open questions

1. **No logo** was provided — Beeko's mark is currently a **typographic Arabic
   wordmark** (`Logo` component). Send a real logo to replace it.
2. **Fonts** load from **Google Fonts CDN** (Tajawal + IBM Plex Sans Arabic) —
   not bundled binaries. If these aren't the intended brand fonts, or you want
   self-hosted files, send them.
3. **Icons** are **Lucide via CDN** — a substitution, no brand set was given.
4. **Brand name romanization** assumed "Beeko" for بيكو — confirm.
