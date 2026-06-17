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
    image: 'images/products/usyg30_3.0-rise-restore_1200x900.jpg',
    badge: 'Popular'
  },
  {
    id: 'USYG300005',
    name: 'Collagen Peptides',
    category: 'beauty',
    price: 30.95,
    description: 'Hydrolyzed collagen peptides to support skin, hair, nails, and joint health.',
    image: 'images/products/usyg300005_collagenpeptides_0923_cartimages_1200x900.jpg'
  },
  {
    id: '13205',
    name: 'Herbal Rainforest',
    category: 'minerals',
    price: 34.95,
    description: 'Liquid mineral supplement with over 77 trace minerals from prehistoric plant sources. 32 fl oz.',
    image: 'images/products/herbalrainforest_liquid-sleeve_0120_image_1200x900.jpg'
  },
  {
    id: 'USYG103211',
    name: 'Beyond Osteo-Fx Powder',
    category: 'bone-health',
    price: 48.95,
    description: 'Bone and joint support formula in powder form. 357g canister.',
    image: 'images/products/usyg103211_beyond_osteo_powder_357g_canister_1024_1200x900.jpg'
  },
  {
    id: '13203',
    name: 'Plant Derived Minerals',
    category: 'minerals',
    price: 23.95,
    description: 'Liquid plant-derived minerals for optimal absorption. 32 fl oz.',
    image: 'images/products/plant-derived-mins_liquid-sleeve_0523_image_1200x900.jpg'
  },
  {
    id: '13203C',
    name: 'Plant Derived Minerals (4 Pack)',
    category: 'minerals',
    price: 92.95,
    description: 'Four 32 fl oz bottles of plant-derived minerals at a discounted bundle price.',
    image: 'images/products/4pack_plant-derived-mins_liquid-sleeve_0523_image_1200x900.jpg',
    badge: 'Bundle'
  },
  {
    id: '13204',
    name: 'Cheri-Mins',
    category: 'minerals',
    price: 26.95,
    description: 'Cherry-flavored liquid mineral supplement with plant-derived minerals. 32 fl oz.',
    image: 'images/products/cheri-mins_liquid-sleeve_0523_image_1200x900.jpg'
  },
  {
    id: '13204C',
    name: 'Cheri-Mins (4 Pack)',
    category: 'minerals',
    price: 103.95,
    description: 'Four 32 fl oz bottles of cherry-flavored liquid minerals. Great value bundle.',
    image: 'images/products/4pack_cheri-mins_liquid-sleeve_0523_image_1200x900.jpg',
    badge: 'Bundle'
  },
  {
    id: 'USYG103230',
    name: 'Strawberry Kiwi-Mins',
    category: 'minerals',
    price: 28.95,
    description: 'Strawberry kiwi flavored liquid mineral supplement. 32 fl oz.',
    image: 'images/products/strawberry-kiwi-mins_liquid-sleeve_0523_image_1200x900.jpg'
  },
  {
    id: 'USYG0024',
    name: 'Strawberry Kiwi-Mins (4 Pack)',
    category: 'minerals',
    price: 100.95,
    description: 'Four 32 fl oz bottles of strawberry kiwi flavored liquid minerals. Great value bundle.',
    image: 'images/products/4pack_strawberry-kiwi-mins_liquid-sleeve_0523_image_1200x900_1.jpg',
    badge: 'Bundle'
  },
  {
    id: '13223',
    name: 'Rebound FX Citrus Punch Powder',
    category: 'energy',
    price: 41.95,
    description: 'Sports energy drink with vitamins, minerals, and electrolytes. 360g canister.',
    image: 'images/products/0725_rebound-fx_canister_1200x900.jpg'
  },
  {
    id: '13231',
    name: 'Rebound FX Citrus Punch Packets',
    category: 'energy',
    price: 55.95,
    description: 'Convenient 30-count box of Rebound FX sports energy drink packets.',
    image: 'images/products/13231_rebound_fx_gusset_30ct_0825_1200x900_1.jpg'
  },
  {
    id: 'USLL005030',
    name: 'i26 Hyperimmune Egg Powder',
    category: 'immune',
    price: 51.95,
    description: 'Hyperimmune egg powder for immune system support. 31 Day Supply Canister.',
    image: 'images/products/usll005030_i26_hyperimmune-egg-0625_1200x900.jpg'
  },
  {
    id: '21211',
    name: 'Ultimate Enzymes',
    category: 'digestion',
    price: 30.95,
    description: 'Full spectrum digestive enzyme blend to support nutrient absorption. 120 capsules.',
    image: 'images/products/ultimate-enzymes_1120_1200x900.jpg'
  },
  {
    id: '21832',
    name: 'Ultimate EFA',
    category: 'essential-fats',
    price: 48.95,
    description: 'Essential fatty acids from borage, flax, and fish oils. 180 soft gels.',
    image: 'images/products/ultimate-efa-plus-90_1020_1200x900_1.jpg'
  },
  {
    id: 'USAD500007',
    name: 'Renu IQ',
    category: 'cognitive',
    price: 68.95,
    description: 'Advanced adaptogenic formula for mental clarity, focus, and cognitive support.',
    image: 'images/products/usad500007_renu-iq_0225_1200x900.jpg'
  },
  {
    id: 'USYG100074',
    name: 'Beyond Tangy Tangerine 2.5',
    category: 'btt',
    price: 69.95,
    description: 'The most advanced multi-vitamin mineral complex. Contains 115 vegetables and fruits.',
    image: 'images/products/btt-2.5.png'
  },
  {
    id: 'USYG100077',
    name: 'BTT 2.0 Tablets',
    category: 'btt',
    price: 54.95,
    description: 'Beyond Tangy Tangerine in convenient tablet form. 120 Tablets.',
    image: 'images/products/btt-tablets.png'
  },
  {
    id: '20691',
    name: 'Ultimate Mineral Caps',
    category: 'minerals',
    price: 46.95,
    description: 'Complete mineral supplement in convenient capsule form. 64 capsules.',
    image: 'images/products/ultimate-mineral-caps_0922_1200x900.jpg'
  },
  {
    id: 'USFL000123',
    name: 'MSM Ultra',
    category: 'joints',
    price: 43.95,
    description: 'Methylsulfonylmethane for joint health, flexibility, and connective tissue support.',
    image: 'images/products/msm-ultra_caplets_label-0420-cartimage_1200x900.jpg'
  },
  {
    id: '21252',
    name: 'Ultimate Gluco-Gel',
    category: 'blood-sugar',
    price: 43.95,
    description: 'Blood sugar support formula with chromium, vanadium, and gymnema sylvestre. 240 capsules.',
    image: 'images/products/ultimate_gluco-gel-240_1119_1200x900_1.jpg'
  },
  {
    id: '20971',
    name: 'Ultimate Selenium',
    category: 'minerals',
    price: 30.95,
    description: 'Essential trace mineral for thyroid health, immune function, and antioxidant protection. 90 capsules.',
    image: 'images/products/ultimate-selenium_0324_1200x900_1.jpg'
  },
  // 90 For Life Starter Paks
  {
    id: 'KT0001',
    name: 'Basic Mighty 90',
    category: 'starter',
    price: 70.95,
    description: 'The foundational supplement system with essential minerals, vitamins, and nutrients.',
    image: 'images/products/basic-mighty-90.png',
    badge: 'Starter Pak'
  },
  {
    id: '10245',
    name: 'Healthy Body Start Pak™ - Original',
    category: 'starter',
    price: 142.95,
    description: 'The complete 90 For Life foundation with Beyond Tangy Tangerine, EFA Plus, and Beyond Osteo-fx.',
    image: 'images/products/healthy-body-pak-original.png',
    badge: 'Starter Pak'
  },
  {
    id: '10282',
    name: 'Healthy Body Start Pak™ 2.0 Liquid',
    category: 'starter',
    price: 146.95,
    description: 'Enhanced formula with Beyond Osteo-FX Liquid for superior absorption.',
    image: 'images/products/healthy-body-pak-2.0.png',
    badge: 'Starter Pak'
  },
  {
    id: '10282Q',
    name: 'Healthy Body Start Pak™ 2.5 (Beyond Osteo-FX Liquid)',
    category: 'starter',
    price: 146.95,
    description: 'Latest formula featuring Beyond Tangy Tangerine 2.5 and Beyond Osteo-FX Liquid.',
    image: 'images/products/healthy-body-pak-2.5.png',
    badge: 'Starter Pak'
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

// 90 For Life Pak Bundle - Multiple Ways to Get the 90 Essential Nutrients
const NINETY_FOR_LIFE_PAKS = [
  {
    id: 'KT0001',
    name: 'Basic Mighty 90',
    price: 70.95,
    description: 'The foundational supplement system with essential minerals, vitamins, and nutrients.',
    image: 'images/products/basic-mighty-90.png'
  },
  {
    id: '10245',
    name: 'Healthy Body Start Pak™ - Original',
    price: 142.95,
    description: 'The complete 90 For Life foundation with Beyond Tangy Tangerine, EFA Plus, and Beyond Osteo-fx.',
    image: 'images/products/healthy-body-pak-original.png'
  },
  {
    id: '10282',
    name: 'Healthy Body Start Pak™ 2.0 Liquid',
    price: 146.95,
    description: 'Enhanced formula with Beyond Osteo-FX Liquid for superior absorption.',
    image: 'images/products/healthy-body-pak-2.0.png'
  },
  {
    id: '10282Q',
    name: 'Healthy Body Start Pak™ 2.5 (Beyond Osteo-FX Liquid)',
    price: 146.95,
    description: 'Latest formula featuring Beyond Tangy Tangerine 2.5 and Beyond Osteo-FX Liquid.',
    image: 'images/products/healthy-body-pak-2.5.png'
  }
];

// Export for use in cart.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCTS, CATEGORIES, NINETY_FOR_LIFE_PAKS, SPONSOR_ID };
}
