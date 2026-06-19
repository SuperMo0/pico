// Beeko storefront — app shell & navigation state.
(function () {
  const { Header, Footer, Home, Listing, Product, CartDrawer } = window.BEEKO;
  const PRODUCTS = window.BEEKO.PRODUCTS;
  const CATEGORIES = window.BEEKO.CATEGORIES;

  const COLOR_LABELS = {
    blue: 'أزرق', pink: 'وردي', peach: 'مشمشي', mint: 'نعناعي',
    sage: 'زيتي', lilac: 'بنفسجي', cream: 'بيج', grey: 'رمادي',
  };
  const CAT_TITLES = {
    home: 'الرئيسية', newborn: 'حديثو الولادة', tops: 'البلوزات',
    bottoms: 'البناطيل', sets: 'الأطقم', sale: 'تخفيضات',
  };

  function catProducts(cat) {
    if (cat === 'sale') return PRODUCTS.filter((p) => p.was);
    if (cat === 'newborn') return PRODUCTS.filter((p) => p.ageRange.indexOf('أشهر') > -1);
    if (['tops', 'bottoms', 'sets'].includes(cat)) return PRODUCTS.filter((p) => p.cat === cat);
    return PRODUCTS;
  }

  function App() {
    const [view, setView] = React.useState({ name: 'home' });
    const [cartOpen, setCartOpen] = React.useState(false);
    const [items, setItems] = React.useState([]);

    const nav = (id) => {
      window.scrollTo({ top: 0 });
      if (id === 'home') setView({ name: 'home' });
      else setView({ name: 'listing', cat: id });
    };
    const openProduct = (p) => { window.scrollTo({ top: 0 }); setView({ name: 'product', product: p }); };

    const add = (p, opts) => {
      const o = opts || { color: p.colors[0], size: p.ageRange, qty: 1 };
      const key = p.id + '|' + o.color + '|' + o.size;
      setItems((prev) => {
        const ex = prev.find((it) => it.key === key);
        if (ex) return prev.map((it) => it.key === key ? { ...it, qty: it.qty + o.qty } : it);
        return [...prev, { key, id: p.id, name: p.name, price: p.price, image: p.image,
          size: o.size, color: o.color, colorLabel: COLOR_LABELS[o.color] || o.color, qty: o.qty }];
      });
      setCartOpen(true);
    };
    const setQty = (key, q) => setItems((prev) => prev.map((it) => it.key === key ? { ...it, qty: q } : it));
    const remove = (key) => setItems((prev) => prev.filter((it) => it.key !== key));
    const count = items.reduce((s, it) => s + it.qty, 0);

    const active = view.name === 'home' ? 'home' : view.name === 'listing' ? view.cat : '';

    return (
      <React.Fragment>
        <Header onNav={nav} onCart={() => setCartOpen(true)} cartCount={count} active={active} />
        {view.name === 'home' && <Home products={PRODUCTS} categories={CATEGORIES} onProduct={openProduct} onAdd={add} onNav={nav} />}
        {view.name === 'listing' && <Listing products={catProducts(view.cat)} title={CAT_TITLES[view.cat] || 'المنتجات'} onProduct={openProduct} onAdd={add} />}
        {view.name === 'product' && <Product product={view.product} onAdd={add} onNav={nav} />}
        <Footer />
        <CartDrawer open={cartOpen} items={items} onClose={() => setCartOpen(false)} onQty={setQty} onRemove={remove} />
      </React.Fragment>
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  setTimeout(() => window.lucide && window.lucide.createIcons(), 80);
})();
