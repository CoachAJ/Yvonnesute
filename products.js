// ============================================================
// 4ABETTERU2 WELLNESS — Product Catalog
// Youngevity Products with Ygy1 checkout integration
// Sponsor ID: 102742703 (placeholder until Yvonne's is received)
// ============================================================

const SPONSOR_ID = '102742703';

const PRODUCTS = [
  {
    id: 'USYG30',
    name: '3.0 Rise and Restore',
    category: 'energy',
    price: 99.95,
    description: 'Support your body\'s natural energy production and recovery with this powerful dual-formula system.',
    image: 'images/products/rise-restore.jpg',
    badge: 'Popular'
  },
  {
    id: 'USYG300005',
    name: 'Collagen Peptides',
    category: 'beauty',
    price: 30.95,
    description: 'Hydrolyzed collagen peptides to support skin, hair, nails, and joint health.',
    image: 'images/products/collagen.jpg'
  },
  {
    id: '13205',
    name: 'Herbal Rainforest',
    category: 'minerals',
    price: 34.95,
    description: 'Liquid mineral supplement with over 77 trace minerals from prehistoric plant sources. 32 fl oz.',
    image: 'images/products/herbal-rainforest.jpg'
  },
  {
    id: '13203',
    name: 'Plant Derived Minerals',
    category: 'minerals',
    price: 23.95,
    description: 'Liquid plant-derived minerals for optimal absorption. 32 fl oz.',
    image: 'images/products/plant-minerals.jpg'
  },
  {
    id: '13203C',
    name: 'Plant Derived Minerals (4 Pack)',
    category: 'minerals',
    price: 92.95,
    description: 'Four 32 fl oz bottles of plant-derived minerals at a discounted bundle price.',
    image: 'images/products/plant-minerals-4pack.jpg',
    badge: 'Bundle'
  },
  {
    id: '13204',
    name: 'Cheri-Mins',
    category: 'minerals',
    price: 26.95,
    description: 'Cherry-flavored liquid mineral supplement with plant-derived minerals. 32 fl oz.',
    image: 'images/products/cheri-mins.jpg'
  },
  {
    id: 'USYG103230',
    name: 'Strawberry Kiwi-Mins',
    category: 'minerals',
    price: 28.95,
    description: 'Strawberry kiwi flavored liquid mineral supplement. 32 fl oz.',
    image: 'images/products/strawberry-kiwi-mins.jpg'
  },
  {
    id: '13223',
    name: 'Rebound FX Citrus Punch Powder',
    category: 'energy',
    price: 41.95,
    description: 'Sports energy drink with vitamins, minerals, and electrolytes. 360g canister.',
    image: 'images/products/rebound-canister.jpg'
  },
  {
    id: '13231',
    name: 'Rebound FX Citrus Punch Packets',
    category: 'energy',
    price: 55.95,
    description: 'Convenient 30-count box of Rebound FX sports energy drink packets.',
    image: 'images/products/rebound-packets.jpg'
  },
  {
    id: 'USLL005030',
    name: 'i26 Hyperimmune Egg Powder',
    category: 'immune',
    price: 51.95,
    description: 'Hyperimmune egg powder for immune system support. 31 Day Supply Canister.',
    image: 'images/products/i26.jpg'
  },
  {
    id: '21211',
    name: 'Ultimate Enzymes',
    category: 'digestion',
    price: 30.95,
    description: 'Full spectrum digestive enzyme blend to support nutrient absorption. 120 capsules.',
    image: 'images/products/ultimate-enzymes.jpg'
  },
  {
    id: '21832',
    name: 'Ultimate EFA',
    category: 'essential-fats',
    price: 48.95,
    description: 'Essential fatty acids from borage, flax, and fish oils. 180 soft gels.',
    image: 'images/products/ultimate-efa.jpg'
  },
  {
    id: 'USAD500007',
    name: 'Renu IQ',
    category: 'cognitive',
    price: 68.95,
    description: 'Advanced adaptogenic formula for mental clarity, focus, and cognitive support.',
    image: 'images/products/renu-iq.jpg'
  },
  {
    id: 'USYG100074',
    name: 'Beyond Tangy Tangerine 2.5',
    category: 'btt',
    price: 69.95,
    description: 'The most advanced multi-vitamin mineral complex. Contains 115 vegetables and fruits.',
    image: 'images/products/btt-2.5.jpg'
  },
  {
    id: 'USYG100077',
    name: 'BTT 2.0 Tablets',
    category: 'btt',
    price: 54.95,
    description: 'Beyond Tangy Tangerine in convenient tablet form. 120 Tablets.',
    image: 'images/products/btt-tablets.jpg'
  },
  {
    id: '20691',
    name: 'Ultimate Mineral Caps',
    category: 'minerals',
    price: 46.95,
    description: 'Complete mineral supplement in convenient capsule form. 64 capsules.',
    image: 'images/products/mineral-caps.jpg'
  },
  {
    id: 'USFL000123',
    name: 'MSM Ultra',
    category: 'joints',
    price: 43.95,
    description: 'Methylsulfonylmethane for joint health, flexibility, and connective tissue support.',
    image: 'images/products/msm.jpg'
  },
  {
    id: '21252',
    name: 'Ultimate Gluco-Gel',
    category: 'blood-sugar',
    price: 43.95,
    description: 'Blood sugar support formula with chromium, vanadium, and gymnema sylvestre. 240 capsules.',
    image: 'images/products/gluco-gel.jpg'
  },
  {
    id: '20971',
    name: 'Ultimate Selenium',
    category: 'minerals',
    price: 30.95,
    description: 'Essential trace mineral for thyroid health, immune function, and antioxidant protection. 90 capsules.',
    image: 'images/products/selenium.jpg'
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
