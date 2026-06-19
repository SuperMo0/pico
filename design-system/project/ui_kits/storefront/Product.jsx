// Beeko storefront — product detail page (PDP).
(function () {
  const NS = window.BeekoDesignSystem_e717fe;
  const { Button, ColorSwatch, Chip, QtyStepper, PriceTag, Badge } = NS;
  const P = '../../assets/products/';
  const SIZES = ['٠–٣ أشهر', '٣–٦ أشهر', '٦–١٢ شهر', 'سنة–سنتان'];

  function Product({ product, onAdd, onNav }) {
    const ic = (n, s) => React.createElement('i', { 'data-lucide': n, style: { width: 18, height: 18, ...s } });
    const gallery = [product.image, product.hoverImage, product.image].filter(Boolean);
    const [main, setMain] = React.useState(gallery[0]);
    const [color, setColor] = React.useState(product.colors[0]);
    const [size, setSize] = React.useState(SIZES[2]);
    const [qty, setQty] = React.useState(1);
    const [open, setOpen] = React.useState('details');
    React.useEffect(() => { window.lucide && window.lucide.createIcons(); });
    React.useEffect(() => { setMain(product.image); setColor(product.colors[0]); setQty(1); }, [product.id]);

    const wrap = { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--space-5)' };
    const ACC = [
      { id: 'details', h: 'تفاصيل المنتج', b: product.blurb + ' قَصّة مريحة تمنح حرية الحركة، وحياكة متينة تدوم مع الغسل المتكرّر.' },
      { id: 'fabric', h: 'الخامة والعناية', b: 'قطن ١٠٠٪. يُغسل في الغسالة على ٣٠°. لا يُستخدم مبيّض. كي على حرارة منخفضة عند الحاجة.' },
      { id: 'shipping', h: 'الشحن والإرجاع', b: 'شحن مجاني للطلبات فوق ٢٠٠ ر.س. التوصيل خلال ٢–٤ أيام عمل. إرجاع سهل خلال ١٤ يومًا.' },
    ];

    return (
      <div style={{ ...wrap, paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-5)' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onNav('home'); }} style={{ color: 'var(--text-muted)' }}>الرئيسية</a> / {product.name}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 'var(--space-8)', alignItems: 'start' }}>
          {/* Gallery */}
          <div style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {gallery.map((g, i) => (
                <button key={i} onClick={() => setMain(g)} style={{
                  padding: 0, border: `1px solid ${main === g ? 'var(--ink-900)' : 'var(--border-hairline)'}`,
                  borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer', background: 'none', aspectRatio: '4/5',
                }}>
                  <img src={P + g} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--cream-100)', aspectRatio: '4/5' }}>
              <img src={P + main} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Info */}
          <div style={{ position: 'sticky', top: 96 }}>
            {product.badge && <div style={{ marginBottom: 12 }}><Badge tone={product.badgeTone} solid={product.badgeTone === 'sale'}>{product.badge}</Badge></div>}
            <h1 style={{ fontSize: 'var(--fs-h1)', marginBottom: 'var(--space-3)' }}>{product.name}</h1>
            <div style={{ marginBottom: 'var(--space-5)' }}><PriceTag price={product.price} was={product.was} size="lg" /></div>
            <p style={{ color: 'var(--text-body)', fontSize: 'var(--fs-body-lg)', maxWidth: '46ch', marginBottom: 'var(--space-6)' }}>{product.blurb}</p>

            <div style={{ marginBottom: 'var(--space-5)' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', fontWeight: 600, marginBottom: 10 }}>اللون</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {product.colors.map((c) => <ColorSwatch key={c} color={c} size={30} selected={color === c} onClick={() => setColor(c)} />)}
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', fontWeight: 600 }}>المقاس (العمر)</span>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 'var(--fs-xs)', color: 'var(--sage-700)', fontWeight: 600 }}>دليل القياس</a>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SIZES.map((s) => <Chip key={s} selectable selected={size === s} onClick={() => setSize(s)}>{s}</Chip>)}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
              <QtyStepper value={qty} onChange={setQty} />
              <Button size="lg" block onClick={() => onAdd(product, { color, size, qty })} style={{ flex: 1 }}>أضِف إلى السلّة</Button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 'var(--space-6)' }}>
              <Chip icon={ic('leaf', { width: 15, height: 15 })}>قطن ١٠٠٪</Chip>
              <Chip icon={ic('feather', { width: 15, height: 15 })}>لطيف على البشرة</Chip>
              <Chip icon={ic('truck', { width: 15, height: 15 })}>شحن مجاني فوق ٢٠٠ ر.س</Chip>
            </div>

            {/* Accordion */}
            <div style={{ borderTop: '1px solid var(--border-hairline)' }}>
              {ACC.map((a) => (
                <div key={a.id} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
                  <button onClick={() => setOpen(open === a.id ? null : a.id)} style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'none', border: 'none', cursor: 'pointer', padding: '16px 0',
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-h4)', color: 'var(--ink-900)',
                  }}>
                    {a.h}
                    {ic(open === a.id ? 'minus' : 'plus', { width: 18, height: 18 })}
                  </button>
                  {open === a.id && <p style={{ color: 'var(--text-body)', fontSize: 'var(--fs-body)', lineHeight: 1.8, paddingBottom: 16, margin: 0 }}>{a.b}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  window.BEEKO = window.BEEKO || {};
  window.BEEKO.Product = Product;
})();
