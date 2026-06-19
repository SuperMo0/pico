// Beeko storefront — footer (ink band, cream logo).
(function () {
  const NS = window.BeekoDesignSystem_e717fe;
  const { Logo, Button, Input } = NS;

  const COLS = [
    { h: 'تسوّقي', links: ['حديثو الولادة', 'البلوزات', 'البناطيل', 'الأطقم', 'تخفيضات'] },
    { h: 'المساعدة', links: ['دليل القياسات', 'الشحن والتوصيل', 'الإرجاع والاستبدال', 'العناية بالقطن', 'تواصلي معنا'] },
    { h: 'عن بيكو', links: ['قصتنا', 'جودة القطن', 'الاستدامة', 'فروعنا'] },
  ];

  function Footer() {
    return (
      <footer style={{ background: 'var(--ink-900)', color: 'var(--cream-200)', marginTop: 'var(--space-12)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-10) var(--space-5) var(--space-7)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 'var(--space-7)' }}>
            <div>
              <Logo size={28} tone="cream" tagline />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', lineHeight: 1.8, color: 'var(--cream-200)', marginTop: 'var(--space-4)', maxWidth: '34ch' }}>
                ملابس منزلية قطنية للأطفال، بألوان هادئة وخامات لطيفة على البشرة. صُنعت لتدوم ناعمة.
              </p>
            </div>
            {COLS.map((c) => (
              <div key={c.h}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-h4)', color: 'var(--cream-50)', marginBottom: 'var(--space-4)' }}>{c.h}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {c.links.map((l) => (
                    <li key={l}><a href="#" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-sm)', color: 'var(--cream-200)' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-5)', borderTop: '1px solid rgba(252,250,246,0.14)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-xs)', color: 'var(--cream-200)' }}>© ٢٠٢٦ بيكو — جميع الحقوق محفوظة.</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-xs)', color: 'var(--cream-200)' }}>قطن ١٠٠٪ · شحن داخل المملكة · دفع آمن</span>
          </div>
        </div>
      </footer>
    );
  }

  window.BEEKO = window.BEEKO || {};
  window.BEEKO.Footer = Footer;
})();
