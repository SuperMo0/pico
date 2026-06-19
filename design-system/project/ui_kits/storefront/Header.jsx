// Beeko storefront — sticky header. Uses Logo + IconButton from the bundle.
(function () {
  const NS = window.BeekoDesignSystem_e717fe;
  const { Logo, IconButton } = NS;

  const NAV = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'newborn', label: 'حديثو الولادة' },
    { id: 'tops', label: 'البلوزات' },
    { id: 'bottoms', label: 'البناطيل' },
    { id: 'sets', label: 'الأطقم' },
    { id: 'sale', label: 'تخفيضات' },
  ];

  function Header({ onNav, onCart, cartCount = 0, active = 'home' }) {
    const ic = (n) => React.createElement('i', { 'data-lucide': n, style: { width: 20, height: 20 } });
    React.useEffect(() => { window.lucide && window.lucide.createIcons(); });
    return (
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(252,250,246,0.94)', backdropFilter: 'saturate(120%) blur(6px)',
        borderBottom: '1px solid var(--border-hairline)',
      }}>
        {/* announcement */}
        <div style={{
          background: 'var(--ink-900)', color: 'var(--cream-50)', textAlign: 'center',
          fontFamily: 'var(--font-body)', fontSize: 'var(--fs-xs)', padding: '7px 16px', fontWeight: 500,
        }}>
          شحن مجاني للطلبات فوق ٢٠٠ ر.س · إرجاع سهل خلال ١٤ يومًا
        </div>

        <div style={{
          maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--space-5)',
          height: 72, display: 'flex', alignItems: 'center', gap: 'var(--space-6)',
        }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onNav('home'); }} style={{ display: 'inline-flex' }}>
            <Logo size={26} />
          </a>

          <nav style={{ display: 'flex', gap: 'var(--space-5)', flex: 1 }}>
            {NAV.map((n) => (
              <a key={n.id} href="#" onClick={(e) => { e.preventDefault(); onNav(n.id); }}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)',
                  fontWeight: active === n.id ? 700 : 500,
                  color: active === n.id ? 'var(--ink-900)' : 'var(--ink-700)',
                  paddingBottom: 2, borderBottom: active === n.id ? '2px solid var(--ink-900)' : '2px solid transparent',
                }}>{n.label}</a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton icon={ic('search')} label="بحث" />
            <IconButton icon={ic('heart')} label="المفضّلة" />
            <IconButton icon={ic('user')} label="حسابي" />
            <IconButton icon={ic('shopping-bag')} label="السلّة" badge={cartCount || null} onClick={onCart} />
          </div>
        </div>
      </header>
    );
  }

  window.BEEKO = window.BEEKO || {};
  window.BEEKO.Header = Header;
})();
