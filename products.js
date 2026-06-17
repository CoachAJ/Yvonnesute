// ============================================================
// 4ABETTERU2 WELLNESS — Product Catalog
// Youngevity Products with Ygy1 checkout integration
// Sponsor ID: 102742703 (placeholder until Yvonne's is received)
// ============================================================

const SPONSOR_ID = '102742703';

const PRODUCTS = [
  {
    id: 'USYG30',
    name: 'Healthy Body Start Pak 2.0',
    category: 'starter',
    price: 185.00,
    description: 'The foundation of the 90 For Life program. Includes Beyond Tangy Tangerine 2.0, EFA Plus, and Beyond Osteo-fx.',
    image: 'images/products/healthy-body-pak.jpg',
    badge: 'Best Seller'
  },
  {
    id: 'USYG300005',
    name: 'Beyond Tangy Tangerine 2.5',
    category: 'btt',
    price: 75.00,
    description: 'The most advanced multi-vitamin mineral complex. Contains 115 vegetables and fruits for maximum nutrition.',
    image: 'images/products/btt-2.5.jpg',
    options: [
      { id: 'USYG300005', name: 'BTT 2.5 - 32oz Canister', price: 75.00 },
      { id: 'USYG300005T', name: 'BTT 2.5 - Tablets', price: 65.00 },
      { id: 'USYG300005P', name: 'BTT 2.5 - Powder', price: 75.00 }
    ]
  },
  {
    id: 'USYG100077',
    name: '3.0 Rise and Restore',
    category: 'energy',
    price: 55.00,
    description: 'Support your body\'s natural energy production and recovery with this powerful dual-formula system.',
    image: 'images/products/rise-restore.jpg'
  },
  {
    id: '13205',
    name: 'Beyond Osteo-fx Liquid',
    category: 'bone-health',
    price: 62.00,
    description: 'Liquid bone and joint support formula with glucosamine, calcium, and magnesium.',
    image: 'images/products/osteo-fx-liquid.jpg',
    options: [
      { id: '13205', name: 'Osteo-fx Liquid 32oz', price: 62.00 },
      { id: '13205P', name: 'Osteo-fx Powder', price: 62.00 }
    ]
  },
  {
    id: '13203',
    name: 'Ultimate EFA',
    category: 'essential-fats',
    price: 32.00,
    description: 'Essential fatty acids from borage, flax, and fish oils. 180 soft gels.',
    image: 'images/products/ultimate-efa.jpg',
    options: [
      { id: '13203', name: 'Ultimate EFA - Bottle', price: 32.00 },
      { id: '13203C', name: 'Ultimate EFA - Canister', price: 48.00 }
    ]
  },
  {
    id: 'USYG103230',
    name: 'Collagen Peptides',
    category: 'beauty',
    price: 45.00,
    description: 'Hydrolyzed collagen peptides to support skin, hair, nails, and joint health.',
    image: 'images/products/collagen.jpg'
  },
  {
    id: '13204',
    name: 'Plant Derived Minerals / Herbal Rainforest',
    category: 'minerals',
    price: 28.00,
    description: 'Liquid mineral supplement with over 77 trace minerals from prehistoric plant sources. 32 fl oz.',
    image: 'images/products/herbal-rainforest.jpg'
  },
  {
    id: '21211',
    name: 'Rebound FX Citrus Punch Powder',
    category: 'energy',
    price: 52.00,
    description: 'Sports energy drink with vitamins, minerals, and electrolytes. 360g canister.',
    image: 'images/products/rebound.jpg',
    options: [
      { id: '21211', name: 'Rebound Canister (360g)', price: 52.00 },
      { id: '21212', name: 'Rebound Packets (30ct box)', price: 35.00 }
    ]
  },
  {
    id: 'USLL005030',
    name: 'i26 Hyperimmune Egg',
    category: 'immune',
    price: 58.00,
    description: 'Hyperimmune egg powder for immune system support. 31 Day Supply Canister.',
    image: 'images/products/i26.jpg'
  },
  {
    id: '21252',
    name: 'Ultimate Enzymes',
    category: 'digestion',
    price: 28.00,
    description: 'Full spectrum digestive enzyme blend. 120 capsules.',
    image: 'images/products/digestive-enzymes.jpg'
  },
  {
    id: 'USYG100074',
    name: 'Renu IQ',
    category: 'cognitive',
    price: 55.00,
    description: 'Advanced nootropic formula for mental clarity, focus, and cognitive support.',
    image: 'images/products/renu-iq.jpg'
  },
  {
    id: '13223',
    name: 'Ultimate Mineral Caps',
    category: 'minerals',
    price: 42.00,
    description: 'Complete mineral supplement in convenient capsule form. 64 capsules.',
    image: 'images/products/mineral-caps.jpg'
  },
  {
    id: '13231',
    name: 'YGY Mixer/Shaker',
    category: 'accessories',
    price: 12.00,
    description: 'Convenient shaker bottle for mixing your favorite Youngevity products.',
    image: 'images/products/ygy-mixer.jpg'
  },
  {
    id: '21832',
    name: 'MSM Ultra',
    category: 'joints',
    price: 24.00,
    description: 'Methylsulfonylmethane for joint health, flexibility, and connective tissue support.',
    image: 'images/products/msm.jpg'
  },
  {
    id: 'USAD500007',
    name: 'Ultimate Gluco-Gel',
    category: 'blood-sugar',
    price: 38.00,
    description: 'Blood sugar support formula with chromium, vanadium, and gymnema sylvestre. 240 capsules.',
    image: 'images/products/gluco-gel.jpg'
  },
  {
    id: '20691',
    name: 'Ultimate Selenium',
    category: 'minerals',
    price: 18.00,
    description: 'Essential trace mineral for thyroid health, immune function, and antioxidant protection. 90 capsules.',
    image: 'images/products/selenium.jpg'
  },
  {
    id: 'USFL000123',
    name: 'Liquid Flavored Minerals',
    category: 'minerals',
    price: 28.00,
    description: 'Great tasting liquid mineral supplement in fruit flavors. 32 fl oz.',
    image: 'images/products/flavored-minerals.jpg'
  },
  {
    id: '20971',
    name: 'Cheri-Mins / Strawberry Kiwi-Mins',
    category: 'minerals',
    price: 28.00,
    description: 'Flavored liquid mineral supplements with plant-derived minerals. 32 fl oz.',
    image: 'images/products/cheri-mins.jpg'
  }
];

// Product categories for filtering
const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: '🛍️' },
  { id: 'starter', name: 'Starter Paks', icon: '📦' },
  { id: 'btt', name: 'BTT 2.5', icon: '🍊' },
  { id: 'minerals', name: 'Minerals', icon: '💎' },
  { id: 'bone-health', name: 'Bone Health', icon: '🦴' },
  { id: 'energy', name: 'Energy', icon: '⚡' },
  { id: 'immune', name: 'Immune', icon: '🛡️' },
  { id: 'beauty', name: 'Beauty', icon: '✨' },
  { id: 'cognitive', name: 'Brain Health', icon: '🧠' },
  { id: 'digestion', name: 'Digestion', icon: '🌿' }
];

// 90 For Life Pak Bundle
const NINETY_FOR_LIFE_PAKS = [
  {
    id: 'USYG30',
    name: 'Healthy Body Start Pak 2.0',
    price: 185.00,
    description: 'Complete 90 For Life foundation pak with BTT 2.0, EFA Plus, and Osteo-fx.',
    savings: 'Save $23',
    image: 'images/products/healthy-body-pak.jpg'
  },
  {
    id: 'USYG100103',
    name: 'Anti-Aging Healthy Body Pak 2.0',
    price: 220.00,
    description: 'Healthy Body Start Pak plus Cell Shield for advanced antioxidant protection.',
    savings: 'Save $28',
    image: 'images/products/anti-aging-pak.jpg'
  },
  {
    id: 'USYG100104',
    name: 'Healthy Body Bone & Joint Pak 2.0',
    price: 210.00,
    description: 'Enhanced pak with extra bone and joint support for active lifestyles.',
    savings: 'Save $26',
    image: 'images/products/bone-joint-pak.jpg'
  },
  {
    id: 'USYG100107',
    name: 'Healthy Body Blood Sugar Pak 2.0',
    price: 195.00,
    description: 'Specialized pak for blood sugar support with Glu-Co Gel included.',
    savings: 'Save $24',
    image: 'images/products/blood-sugar-pak.jpg'
  }
];

// Export for use in cart.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCTS, CATEGORIES, NINETY_FOR_LIFE_PAKS, SPONSOR_ID };
}
