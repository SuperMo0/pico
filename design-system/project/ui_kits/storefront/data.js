// Beeko storefront — demo product catalogue. Arabic, RTL.
// Images live in /assets/products (path is relative to index.html).
window.BEEKO = window.BEEKO || {};
window.BEEKO.PRODUCTS = [
  {
    id: 'tee-ss', name: 'تيشيرت قطني بأكمام قصيرة', cat: 'tops',
    ageRange: '٠–٣ أشهر', price: '٨٩', was: null, badge: 'جديد', badgeTone: 'neutral',
    colors: ['blue', 'peach', 'mint', 'pink', 'grey'],
    image: 'tee-blue.jpeg', hoverImage: 'tee-peach.jpeg',
    blurb: 'تيشيرت يومي بقَصّة مريحة وخامة قطنية تتنفّس — لطيف على بشرة طفلك طوال اليوم.',
  },
  {
    id: 'top-ls-peach', name: 'بلوزة قطنية بأكمام طويلة', cat: 'tops',
    ageRange: '٦–١٢ شهر', price: '٦٩', was: '٨٩', badge: 'خصم', badgeTone: 'sale',
    colors: ['peach', 'cream', 'grey', 'blue'],
    image: 'top-peach-longsleeve.jpeg', hoverImage: 'top-peach-ribbed.jpeg',
    blurb: 'بلوزة دافئة بأكمام طويلة وخامة مضلّعة ناعمة، مثالية لأمسيات المنزل الهادئة.',
  },
  {
    id: 'pants-blue', name: 'بنطلون قطني مريح', cat: 'bottoms',
    ageRange: 'سنة–سنتان', price: '٧٩', was: null, badge: null,
    colors: ['blue', 'sage', 'lilac', 'cream'],
    image: 'pants-blue.jpeg', hoverImage: 'pants-blue-alt.jpeg',
    blurb: 'بنطلون بخصر مطّاطي لطيف وحاشية مريحة عند الكاحل — حرية حركة طوال اليوم.',
  },
  {
    id: 'top-beige', name: 'بلوزة قطنية بياقة دائرية', cat: 'tops',
    ageRange: '٦–١٢ شهر', price: '٧٥', was: null, badge: null,
    colors: ['cream', 'peach', 'grey'],
    image: 'top-beige-longsleeve.jpeg', hoverImage: 'top-grey-longsleeve.jpeg',
    blurb: 'لون بيج هادئ يناسب كل القطع — خامة قطنية ناعمة بقَصّة كلاسيكية.',
  },
  {
    id: 'set-blue', name: 'طقم منزلي قطني — قطعتان', cat: 'sets',
    ageRange: '٦–٩ أشهر', price: '١٤٩', was: '١٧٩', badge: 'الأكثر مبيعًا', badgeTone: 'sage',
    colors: ['blue', 'pink', 'mint', 'peach'],
    image: 'set-blue-flatlay.jpeg', hoverImage: 'model-blue-set.jpeg',
    blurb: 'طقم من قطعتين بأزرار أمامية سهلة — بلوزة وبنطلون من القطن الناعم بلون موحّد.',
  },
  {
    id: 'top-grey', name: 'بلوزة قطنية مضلّعة', cat: 'tops',
    ageRange: 'سنة–سنتان', price: '٧٩', was: null, badge: null,
    colors: ['grey', 'cream', 'sage'],
    image: 'top-grey-longsleeve.jpeg', hoverImage: 'top-beige-longsleeve.jpeg',
    blurb: 'خامة مضلّعة مرنة تحتفظ بشكلها، بلون رمادي محايد يسهل تنسيقه.',
  },
  {
    id: 'tee-peach', name: 'تيشيرت قطني مشمشي', cat: 'tops',
    ageRange: '٠–٣ أشهر', price: '٨٩', was: null, badge: null,
    colors: ['peach', 'blue', 'mint', 'lilac'],
    image: 'tee-peach.jpeg', hoverImage: 'tee-blue.jpeg',
    blurb: 'لون مشمشي دافئ يضيف لمسة لطيفة على إطلالة طفلك اليومية.',
  },
  {
    id: 'pants-sage', name: 'بنطلون قطني بحاشية مطّاطية', cat: 'bottoms',
    ageRange: '٦–١٢ شهر', price: '٧٢', was: '٨٩', badge: 'خصم', badgeTone: 'sale',
    colors: ['sage', 'blue', 'grey', 'lilac'],
    image: 'pants-blue-alt.jpeg', hoverImage: 'pants-blue.jpeg',
    blurb: 'حاشية مطّاطية تبقى ثابتة دون أن تضغط — راحة تدوم مع كل خطوة.',
  },
];

window.BEEKO.CATEGORIES = [
  { id: 'newborn', name: 'حديثو الولادة', image: 'model-pink-set.jpeg' },
  { id: 'tops', name: 'البلوزات', image: 'top-peach-longsleeve.jpeg' },
  { id: 'bottoms', name: 'البناطيل', image: 'pants-blue.jpeg' },
  { id: 'sets', name: 'الأطقم', image: 'set-blue-flatlay.jpeg' },
];
