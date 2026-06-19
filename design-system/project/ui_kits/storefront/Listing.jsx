// Beeko storefront — product listing / category page.
(function () {
  const NS = window.BeekoDesignSystem_e717fe;
  const { ProductCard, Chip, ColorSwatch } = NS;
  const P = '../../assets/products/';

  const AGES = ['٠–٣ أشهر', '٦–١٢ شهر', 'سنة–سنتان'];
  const COLORS = ['blue', 'pink', 'peach', 'mint', 'sage', 'lilac', 'cream', 'grey'];

  function Listing({ products, title, onProduct, onAdd }) {
    const [age, setAge] = React.useState(null);
    const [color, setColor] = React.useState(null);
    React.useEffect(() => { window.lucide && window.lucide.createIcons(); });

    const filtered = products.filter((p) =>
      (!age || p.ageRange === age) && (!color || p.colors.includes(color)));

    const wrap = { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--space-5)' };

    return (
      <div style={{ ...wrap, paddingTop: 'var(--space-7)', paddingBottom: 'var(--space-8)' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
          الرئيسية / {title}
        </div>
        <h1 style={{ fontSize: 'var(--fs-h1)', marginBottom: 'var(--space-2)' }}>{title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-sm)', marginBottom: 'var(--space-6)' }}>{filtered.length} منتج</p>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'var(--space-8)', alignItems: 'start' }}>
          {/* Filters */}
          <aside style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-h4)', marginBottom: 'var(--space-3)' }}>العمر</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {AGES.map((a) => (
                  <Chip key={a} selectable selected={age === a} onClick={() => setAge(age === a ? null : a)}>{a}</Chip>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-h4)', marginBottom: 'var(--space-3)' }}>اللون</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {COLORS.map((c) => (
                  <ColorSwatch key={c} color={c} selected={color === c} onClick={() => setColor(color === c ? null : c)} />
                ))}
              </div>
            </div>
            {(age || color) && (
              <a href="#" onClick={(e) => { e.preventDefault(); setAge(null); setColor(null); }}
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', color: 'var(--sage-700)', fontWeight: 600 }}>
                مسح الفلاتر
              </a>
            )}
          </aside>

          {/* Grid */}
          <div>
            {filtered.length === 0 ? (
              <div style={{ padding: 'var(--space-10)', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--surface-raised)', borderRadius: 'var(--radius-lg)' }}>
                لا توجد منتجات بهذا الفلتر.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--grid-gutter)' }}>
                {filtered.map((p) => (
                  <ProductCard key={p.id}
                    image={P + p.image} hoverImage={P + p.hoverImage}
                    name={p.name} ageRange={p.ageRange} price={p.price} was={p.was}
                    colors={p.colors} badge={p.badge} badgeTone={p.badgeTone}
                    onAdd={() => onAdd(p)} onClick={() => onProduct(p)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  window.BEEKO = window.BEEKO || {};
  window.BEEKO.Listing = Listing;
})();
