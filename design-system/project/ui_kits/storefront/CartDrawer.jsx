// Beeko storefront — slide-in cart drawer.
(function () {
  const NS = window.BeekoDesignSystem_e717fe;
  const { Button, QtyStepper, PriceTag } = NS;
  const P = '../../assets/products/';
  const num = (s) => Number(String(s).replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
  const ar = (n) => String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[+d]);

  function CartDrawer({ open, items, onClose, onQty, onRemove }) {
    const ic = (n, s) => React.createElement('i', { 'data-lucide': n, style: { width: 20, height: 20, ...s } });
    React.useEffect(() => { window.lucide && window.lucide.createIcons(); });
    const subtotal = items.reduce((s, it) => s + num(it.price) * it.qty, 0);
    const FREE = 200;
    const remain = Math.max(0, FREE - subtotal);
    const pct = Math.min(100, (subtotal / FREE) * 100);

    return (
      <React.Fragment>
        {/* scrim */}
        <div onClick={onClose} style={{
          position: 'fixed', inset: 0, background: 'rgba(43,39,33,0.32)', zIndex: 90,
          opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity var(--dur-base) var(--ease-soft)',
        }} />
        {/* panel — slides from inline-start (left in RTL) */}
        <aside style={{
          position: 'fixed', top: 0, bottom: 0, insetInlineStart: 0, width: 420, maxWidth: '92vw', zIndex: 100,
          background: 'var(--surface-page)', display: 'flex', flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform var(--dur-base) var(--ease-soft)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-5)', borderBottom: '1px solid var(--border-hairline)' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-h3)' }}>سلّتك ({ar(items.length)})</span>
            <button onClick={onClose} aria-label="إغلاق" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-700)', display: 'inline-flex' }}>{ic('x')}</button>
          </div>

          {items.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)', padding: 'var(--space-6)', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--ink-300)' }}>{ic('shopping-bag', { width: 40, height: 40 })}</span>
              <p style={{ margin: 0 }}>سلّتك فارغة الآن.</p>
              <Button variant="outline" onClick={onClose}>تابعي التسوّق</Button>
            </div>
          ) : (
            <React.Fragment>
              {/* free shipping progress */}
              <div style={{ padding: 'var(--space-4) var(--space-5)', background: 'var(--surface-sunken)', borderBottom: '1px solid var(--border-hairline)' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-xs)', color: 'var(--ink-700)', marginBottom: 8 }}>
                  {remain > 0 ? <span>أضِف <b>{ar(remain)} ر.س</b> للحصول على شحن مجاني</span> : <span>رائع — حصلتِ على الشحن المجاني.</span>}
                </div>
                <div style={{ height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--sand-200)', overflow: 'hidden' }}>
                  <div style={{ width: pct + '%', height: '100%', background: 'var(--sage-600)', transition: 'width var(--dur-base) var(--ease-soft)' }} />
                </div>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                {items.map((it) => (
                  <div key={it.key} style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <div style={{ width: 78, height: 96, borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--cream-100)', flex: 'none' }}>
                      <img src={P + it.image} alt={it.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--fs-sm)', color: 'var(--ink-900)' }}>{it.name}</span>
                        <button onClick={() => onRemove(it.key)} aria-label="حذف" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-500)', display: 'inline-flex', height: 'fit-content' }}>{ic('trash-2', { width: 16, height: 16 })}</button>
                      </div>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: 2 }}>{it.size} · {it.colorLabel}</span>
                      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <QtyStepper size="sm" value={it.qty} onChange={(q) => onQty(it.key, q)} />
                        <PriceTag price={ar(num(it.price) * it.qty)} size="sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding: 'var(--space-5)', borderTop: '1px solid var(--border-hairline)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-h4)' }}>المجموع الفرعي</span>
                  <PriceTag price={ar(subtotal)} size="md" />
                </div>
                <Button block size="lg">إتمام الشراء</Button>
                <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', margin: '12px 0 0' }}>الضريبة والشحن تُحتسب عند الدفع.</p>
              </div>
            </React.Fragment>
          )}
        </aside>
      </React.Fragment>
    );
  }

  window.BEEKO = window.BEEKO || {};
  window.BEEKO.CartDrawer = CartDrawer;
})();
