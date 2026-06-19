Primary and secondary buttons for Beeko — warm-ink primary, sage accent, plus outline & ghost. Use for any action; primary for the main CTA («أضِف إلى السلّة»).

```jsx
<Button variant="primary" size="lg">أضِف إلى السلّة</Button>
<Button variant="outline">تابع التسوّق</Button>
<Button variant="accent" iconStart={<i data-lucide="leaf" />}>قطن عضوي</Button>
```

Variants: `primary` (ink fill), `accent` (sage), `outline` (hairline), `ghost` (text-only). Sizes `sm | md | lg`. `block` for full width. Hover darkens; press scales to 0.98. RTL-native — `iconStart` sits on the right.
