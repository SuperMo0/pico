The workhorse listing tile — borderless image on cream, hover-lift with quick-add, colorway dots, name, age range and price.

```jsx
<ProductCard
  image="assets/products/tee-blue.jpeg"
  hoverImage="assets/products/tee-peach.jpeg"
  name="تيشيرت قطني بأكمام قصيرة"
  ageRange="٠–٣ أشهر"
  price="٨٩" was="١١٩"
  colors={['blue','peach','mint','grey']}
  badge="خصم" badgeTone="sale"
/>
```

Pass `onAdd` / `onWishlist`. Quick-add button slides up on hover; heart sits top-start.
