---
name: beeko-design
description: Use this skill to generate well-branded interfaces and assets for Beeko (بيكو), an Arabic, RTL online store for kids' cotton homewear — either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI-kit components for prototyping.
user-invocable: true
---

# Beeko (بيكو) — design skill

Beeko sells soft cotton homewear and basics for babies and young children.
Arabic, RTL, deliberately quiet: warm cream canvas, warm-ink text, one sage
accent, pastel products as the only saturated color. "Simple and plain — let
the products do the talking."

## Start here
1. Read `readme.md` — full brand context, **CONTENT FUNDAMENTALS** (voice &
   tone, with examples), **VISUAL FOUNDATIONS** (color, type, spacing,
   imagery, motion, cards), and **ICONOGRAPHY**.
2. Link `styles.css` for all tokens + fonts (Tajawal + IBM Plex Sans Arabic).
3. Explore `tokens/`, the specimen cards in `guidelines/`, the components in
   `components/`, and the `ui_kits/storefront/` recreation.

## Working
- **Visual artifacts** (slides, mocks, throwaway prototypes): copy the assets
  you need out of `assets/` and write static HTML that links `styles.css`. For
  React components, load `_ds_bundle.js` and read `window.<Namespace>` (run
  `check_design_system` for the exact namespace) — do not re-implement
  primitives.
- **Production code**: lift the token values and component patterns; follow the
  rules in `readme.md`.

## Non-negotiables
- Everything is **RTL / Arabic**. Never letter-space Arabic.
- **No emoji**, no gradients, no textures, no glassmorphism.
- Warm ink, never pure black. Pastels stay inside product imagery/swatches.
- Calm motion only (fades, gentle slides; 140–400ms).

If invoked with no other guidance, ask what to build, ask a few questions, then
act as an expert Beeko designer who outputs HTML artifacts or production code.
