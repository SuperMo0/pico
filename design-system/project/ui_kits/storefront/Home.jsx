// Beeko storefront — home page.
(function () {
  const NS = window.BeekoDesignSystem_e717fe;
  const { Button, Chip, ProductCard } = NS;
  const P = '../../assets/products/';

  const REASSURE = [
    { i: 'leaf', t: 'قطن ١٠٠٪' },
    { i: 'feather', t: 'لطيف على البشرة' },
    { i: 'truck', t: 'شحن مجاني فوق ٢٠٠ ر.س' },
    { i: 'refresh-ccw', t: 'إرجاع سهل ١٤ يومًا' },
  ];

  function Home({ products, categories, onProduct, onAdd, onNav }) {
    const ic = (n, s) => React.createElement('i', { 'data-lucide': n, style: { width: 18, height: 18, ...s } });
    React.useEffect(() => { window.lucide && window.lucide.createIcons(); });
    const wrap = { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--space-5)' };

    return (
      <div>
        {/* Hero */}
        <section style={{ ...wrap, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', alignItems: 'center', padding: 'var(--space-10) var(--space-5)' }}>
          <div>
            <div className="beeko-eyebrow" style={{ marginBottom: 'var(--space-4)' }}>مجموعة المنزل</div>
            <h1 style={{ fontSize: 'var(--fs-display)', lineHeight: 1.15, marginBottom: 'var(--space-4)' }}>
              قطن ناعم… ليوم كامل من اللعب والراحة
            </h1>
            <p style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--text-body)', maxWidth: '46ch', marginBottom: 'var(--space-6)' }}>
              ملابس منزلية مريحة بألوان هادئة، مصنوعة من قطن لطيف على بشرة طفلك.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <Button size="lg" onClick={() => onNav('tops')}>تسوّقي المجموعة</Button>
              <Button size="lg" variant="outline" onClick={() => onNav('newborn')}>حديثو الولادة</Button>
            </div>
          </div>
          <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: 'var(--cream-100)', aspectRatio: '4 / 5' }}>
            <img src={P + 'model-blue-set.jpeg'} alt="طفل يرتدي طقم بيكو القطني" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </section>

        {/* Reassurance strip */}
        <section style={{ background: 'var(--surface-sunken)', borderBlock: '1px solid var(--border-hairline)' }}>
          <div style={{ ...wrap, display: 'flex', justifyContent: 'space-between', gap: 'var(--space-5)', padding: 'var(--space-5)', flexWrap: 'wrap' }}>
            {REASSURE.map((r) => (
              <div key={r.t} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--ink-800)', fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', fontWeight: 600 }}>
                <span style={{ color: 'var(--sage-600)', display: 'inline-flex' }}>{ic(r.i, { width: 20, height: 20 })}</span>
                {r.t}
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section style={{ ...wrap, padding: 'var(--space-10) var(--space-5) 0' }}>
          <h2 style={{ fontSize: 'var(--fs-h2)', marginBottom: 'var(--space-6)' }}>تسوّقي حسب الفئة</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--grid-gutter)' }}>
            {categories.map((c) => (
              <a key={c.id} href="#" onClick={(e) => { e.preventDefault(); onNav(c.id); }}
                style={{ display: 'block' }}>
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '3 / 4', background: 'var(--cream-100)', position: 'relative' }}>
                  <img src={P + c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', insetInline: 12, bottom: 12, background: 'rgba(252,250,246,0.94)', borderRadius: 'var(--radius-md)', padding: '10px 14px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-h4)', color: 'var(--ink-900)', textAlign: 'center' }}>{c.name}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Bestsellers */}
        <section style={{ ...wrap, padding: 'var(--space-10) var(--space-5) 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-6)' }}>
            <h2 style={{ fontSize: 'var(--fs-h2)', margin: 0 }}>الأكثر مبيعًا</h2>
            <a href="#" onClick={(e) => { e.preventDefault(); onNav('tops'); }} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', fontWeight: 600 }}>عرض الكل ←</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--grid-gutter)' }}>
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id}
                image={P + p.image} hoverImage={P + p.hoverImage}
                name={p.name} ageRange={p.ageRange} price={p.price} was={p.was}
                colors={p.colors} badge={p.badge} badgeTone={p.badgeTone}
                onAdd={() => onAdd(p)} onWishlist={() => {}}
                onClick={() => onProduct(p)}
                style={{ cursor: 'pointer' }} />
            ))}
          </div>
        </section>

        {/* Editorial band */}
        <section style={{ ...wrap, padding: 'var(--space-10) var(--space-5) 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: 'var(--sage-100)' }}>
            <div style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="beeko-eyebrow" style={{ marginBottom: 12 }}>لماذا القطن؟</div>
              <h2 style={{ fontSize: 'var(--fs-h1)', marginBottom: 'var(--space-4)' }}>خامة تتنفّس، تبقى ناعمة</h2>
              <p style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--ink-800)', maxWidth: '40ch', marginBottom: 'var(--space-5)' }}>
                نختار قطنًا طبيعيًا لطيفًا على البشرة الحسّاسة، ويحتفظ بنعومته بعد كل غسلة.
              </p>
              <div><Button variant="accent" onClick={() => onNav('tops')}>اعرفي أكثر</Button></div>
            </div>
            <div style={{ aspectRatio: '1 / 1', background: 'var(--cream-100)' }}>
              <img src={P + 'top-peach-hanger.jpeg'} alt="بلوزة قطنية معلّقة" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </section>
      </div>
    );
  }

  window.BEEKO = window.BEEKO || {};
  window.BEEKO.Home = Home;
})();
