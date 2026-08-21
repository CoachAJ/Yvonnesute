// ============================================================
// 4ABETTERU2 WELLNESS — Microcurrent Store & Cart System
// Shopify Dynamic Cart Permalinks with Affiliate Code: YVONNE7
// Store Domain: thesanashop.com
// ============================================================

(function() {
  'use strict';

  const STORE_DOMAIN = 'thesanashop.com';
  const AFFILIATE_CODE = 'YVONNE7';
  const CART_STORAGE_KEY = 'yvonne4u_microcurrent_cart_v1';

  // Cart & Catalog State
  let cart = [];
  let currentCategory = 'all';
  let searchQuery = '';
  let activeQuickViewProduct = null;

  // DOM Elements
  let cartModal, cartBackdrop, cartItemsContainer, cartEmptyState, cartCountBadges;
  let cartSubtotalElem, productsGrid, categoryFilterElem, searchInput, quickViewModal, quickViewBackdrop;

  // Initialize
  function init() {
    loadCart();
    cacheDOMElements();
    setupEventListeners();
    renderCategories();
    renderProducts();
    updateCartUI();
  }

  function cacheDOMElements() {
    cartModal = document.getElementById('microCartModal');
    cartBackdrop = document.getElementById('microCartBackdrop');
    cartItemsContainer = document.getElementById('microCartItems');
    cartEmptyState = document.getElementById('microCartEmpty');
    cartCountBadges = document.querySelectorAll('.micro-cart-count');
    cartSubtotalElem = document.getElementById('microCartSubtotal');
    productsGrid = document.getElementById('microProductsGrid');
    categoryFilterElem = document.getElementById('microCategoryFilter');
    searchInput = document.getElementById('microSearchInput');
    quickViewModal = document.getElementById('microQuickViewModal');
    quickViewBackdrop = document.getElementById('microQuickViewBackdrop');
  }

  function setupEventListeners() {
    // Cart open toggles
    document.querySelectorAll('.micro-cart-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
      });
    });

    // Cart close buttons
    document.querySelectorAll('.micro-cart-close').forEach(btn => {
      btn.addEventListener('click', closeCart);
    });

    if (cartBackdrop) {
      cartBackdrop.addEventListener('click', closeCart);
    }

    // Checkout button
    const checkoutBtn = document.getElementById('microCheckoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        checkoutWithShopify(cart, STORE_DOMAIN);
      });
    }

    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderProducts();
      });
    }

    // Category button delegation
    if (categoryFilterElem) {
      categoryFilterElem.addEventListener('click', (e) => {
        const btn = e.target.closest('.category-btn');
        if (!btn) return;
        currentCategory = btn.dataset.category;
        renderCategories();
        renderProducts();
      });
    }

    // Product grid click delegation
    if (productsGrid) {
      productsGrid.addEventListener('click', handleProductGridClick);
      productsGrid.addEventListener('change', handleVariantChange);
    }

    // Cart items click delegation
    if (cartItemsContainer) {
      cartItemsContainer.addEventListener('click', handleCartAction);
    }

    // Quick View Modal close
    document.querySelectorAll('.quickview-close').forEach(btn => {
      btn.addEventListener('click', closeQuickView);
    });

    if (quickViewBackdrop) {
      quickViewBackdrop.addEventListener('click', closeQuickView);
    }

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCart();
        closeQuickView();
      }
    });
  }

  // --- Cart Storage ---
  function loadCart() {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      cart = saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.warn('Error loading microcurrent cart from localStorage:', err);
      cart = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.warn('Error saving microcurrent cart to localStorage:', err);
    }
    updateCartUI();
  }

  // --- Cart Operations ---
  function addToCart(productId, variantId, quantity = 1) {
    const product = MICROCURRENT_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const variant = product.variants.find(v => v.id === variantId) || product.variants[0];
    if (!variant) return;

    const existingIndex = cart.findIndex(item => item.variantId === variant.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        variantId: variant.id,
        title: product.title,
        variantTitle: variant.title !== 'Default Title' ? variant.title : '',
        price: variant.price,
        compareAtPrice: variant.compareAtPrice,
        image: variant.image || product.images[0] || 'images/products/placeholder.jpg',
        quantity: quantity
      });
    }

    saveCart();
    showNotification(`Added "${product.title}" to cart!`);
    openCart();
  }

  function updateQuantity(variantId, newQuantity) {
    const index = cart.findIndex(item => item.variantId === variantId);
    if (index === -1) return;

    if (newQuantity <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = newQuantity;
    }
    saveCart();
  }

  function removeFromCart(variantId) {
    cart = cart.filter(item => item.variantId !== variantId);
    saveCart();
  }

  function clearCart() {
    cart = [];
    saveCart();
  }

  function getCartSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  function getCartCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  // --- Shopify Dynamic Cart Permalink Checkout ---
  /**
   * Redirects the user to the Shopify checkout with YVONNE7 pre-applied in a new tab and empties the cart.
   * @param {Array<{variantId: string|number, quantity: number}>} cartItems 
   * @param {string} storeDomain - e.g., "thesanashop.com"
   */
  function checkoutWithShopify(cartItems, storeDomain) {
    if (!cartItems || cartItems.length === 0) {
      showNotification("Your cart is empty! Please add products before checking out.", "error");
      return;
    }

    // Format line items: "variantId:quantity,variantId:quantity"
    const lineItemsString = cartItems
      .map(item => `${item.variantId}:${item.quantity}`)
      .join(",");

    // Construct final Shopify checkout URL with affiliate discount code
    const checkoutUrl = `https://${storeDomain}/cart/${lineItemsString}?discount=${AFFILIATE_CODE}`;

    showNotification("Opening secure checkout in a new tab...", "success");

    // Open Shopify checkout in a new tab
    window.open(checkoutUrl, '_blank');

    // Empty local cart after proceeding to checkout and close drawer/modals
    clearCart();
    closeCart();
    closeQuickView();
  }

  // --- UI Rendering ---
  function renderCategories() {
    if (!categoryFilterElem) return;

    categoryFilterElem.innerHTML = MICROCURRENT_CATEGORIES.map(cat => {
      const isActive = cat.id === currentCategory;
      return `
        <button class="category-btn ${isActive ? 'active' : ''}" data-category="${cat.id}">
          <span class="cat-icon">${cat.icon}</span>
          <span class="cat-name">${cat.name}</span>
        </button>
      `;
    }).join('');
  }

  function renderProducts() {
    if (!productsGrid) return;

    let filtered = MICROCURRENT_PRODUCTS;

    // Filter by Category
    if (currentCategory !== 'all') {
      filtered = filtered.filter(p => p.category === currentCategory);
    }

    // Filter by Search Query
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery) ||
        p.shortDescription.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery)
      );
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="no-products-state">
          <div class="empty-icon">🔍</div>
          <h3>No matching microcurrent products found</h3>
          <p>Try searching for a different keyword or browse all product categories.</p>
          <button class="btn btn-primary reset-filter-btn" id="resetFilterBtn">View All Products</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetFilterBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          currentCategory = 'all';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          renderCategories();
          renderProducts();
        });
      }
      return;
    }

    productsGrid.innerHTML = filtered.map(product => {
      const defaultVariant = product.variants[0];
      const hasMultipleVariants = product.variants.length > 1;
      const initialPrice = defaultVariant ? defaultVariant.price : 0;
      const initialCompare = defaultVariant ? defaultVariant.compareAtPrice : null;

      return `
        <div class="micro-product-card" data-product-id="${product.id}">
          <div class="card-image-wrap">
            <img src="${product.images[0]}" 
                 alt="${product.title}" 
                 class="card-img" 
                 loading="lazy"
                 onerror="this.src='images/products/placeholder.jpg'">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <button class="quickview-trigger-btn" data-action="quickview" title="Quick View & Details">
              👁️ Quick View
            </button>
          </div>

          <div class="card-body">
            <span class="card-category">${getCategoryLabel(product.category)}</span>
            <h3 class="card-title" title="${product.title}">${product.title}</h3>
            <p class="card-desc">${product.shortDescription}</p>

            ${hasMultipleVariants ? `
              <div class="variant-select-wrap">
                <label class="variant-label">Option / Kit:</label>
                <select class="variant-dropdown" data-product-id="${product.id}">
                  ${product.variants.map(v => `
                    <option value="${v.id}" data-price="${v.price}" data-compare="${v.compareAtPrice || ''}" data-image="${v.image || product.images[0]}">
                      ${v.title} — $${v.price.toFixed(2)}
                    </option>
                  `).join('')}
                </select>
              </div>
            ` : `
              <input type="hidden" class="variant-dropdown" data-product-id="${product.id}" value="${defaultVariant.id}">
            `}

            <div class="card-footer">
              <div class="price-wrap">
                <span class="current-price">$${initialPrice.toFixed(2)}</span>
                ${initialCompare ? `<span class="compare-price">$${initialCompare.toFixed(2)}</span>` : ''}
              </div>
              <div class="card-actions">
                <button class="btn-add-cart" data-action="add-to-cart">
                  <span>+</span> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function getCategoryLabel(catId) {
    const found = MICROCURRENT_CATEGORIES.find(c => c.id === catId);
    return found ? found.name : 'Microcurrent & Frequency';
  }

  function handleVariantChange(e) {
    const select = e.target.closest('.variant-dropdown');
    if (!select || select.tagName !== 'SELECT') return;

    const card = select.closest('.micro-product-card');
    if (!card) return;

    const selectedOption = select.options[select.selectedIndex];
    const price = parseFloat(selectedOption.dataset.price);
    const comparePrice = parseFloat(selectedOption.dataset.compare);
    const imgUrl = selectedOption.dataset.image;

    // Update Price Display
    const priceElem = card.querySelector('.current-price');
    if (priceElem) priceElem.textContent = `$${price.toFixed(2)}`;

    const compareElem = card.querySelector('.compare-price');
    if (comparePrice && !isNaN(comparePrice)) {
      if (compareElem) {
        compareElem.textContent = `$${comparePrice.toFixed(2)}`;
        compareElem.style.display = 'inline';
      } else {
        const newCompare = document.createElement('span');
        newCompare.className = 'compare-price';
        newCompare.textContent = `$${comparePrice.toFixed(2)}`;
        priceElem.after(newCompare);
      }
    } else if (compareElem) {
      compareElem.style.display = 'none';
    }

    // Update Image if variant has unique image
    if (imgUrl) {
      const imgElem = card.querySelector('.card-img');
      if (imgElem) imgElem.src = imgUrl;
    }
  }

  function handleProductGridClick(e) {
    const addBtn = e.target.closest('[data-action="add-to-cart"]');
    const quickBtn = e.target.closest('[data-action="quickview"]');
    const card = e.target.closest('.micro-product-card');

    if (!card) return;
    const productId = card.dataset.productId;

    if (addBtn) {
      e.preventDefault();
      const variantSelect = card.querySelector('.variant-dropdown');
      const variantId = variantSelect ? variantSelect.value : null;

      addToCart(productId, variantId, 1);

      // Button ripple / feedback
      addBtn.classList.add('added');
      addBtn.innerHTML = '<span>✓</span> Added!';
      setTimeout(() => {
        addBtn.classList.remove('added');
        addBtn.innerHTML = '<span>+</span> Add to Cart';
      }, 1200);
    } else if (quickBtn) {
      e.preventDefault();
      openQuickView(productId);
    }
  }

  // --- Quick View Modal ---
  function openQuickView(productId) {
    const product = MICROCURRENT_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    activeQuickViewProduct = product;

    const modalBody = document.getElementById('microQuickViewBody');
    if (!modalBody) return;

    const defaultVariant = product.variants[0];
    const hasMultiple = product.variants.length > 1;

    modalBody.innerHTML = `
      <div class="quickview-grid">
        <div class="quickview-gallery">
          <div class="main-image-wrap">
            <img src="${product.images[0]}" alt="${product.title}" id="qvMainImage" class="qv-main-img">
          </div>
          ${product.images.length > 1 ? `
            <div class="thumbnails-wrap">
              ${product.images.slice(0, 5).map((img, idx) => `
                <img src="${img}" class="qv-thumb ${idx === 0 ? 'active' : ''}" data-index="${idx}" alt="thumbnail">
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div class="quickview-details">
          <span class="qv-category">${getCategoryLabel(product.category)}</span>
          <h2 class="qv-title">${product.title}</h2>
          
          <div class="qv-price-box">
            <span class="qv-price" id="qvPrice">$${defaultVariant.price.toFixed(2)}</span>
            <span class="qv-compare" id="qvCompare" style="${defaultVariant.compareAtPrice ? '' : 'display:none;'}">
              $${defaultVariant.compareAtPrice ? defaultVariant.compareAtPrice.toFixed(2) : ''}
            </span>
            <span class="qv-affiliate-badge">🎁 Code <strong>${AFFILIATE_CODE}</strong> Auto-Applied at Checkout</span>
          </div>

          ${hasMultiple ? `
            <div class="qv-variant-group">
              <label class="qv-label">Select Option / Variant:</label>
              <select id="qvVariantSelect" class="qv-select">
                ${product.variants.map(v => `
                  <option value="${v.id}" data-price="${v.price}" data-compare="${v.compareAtPrice || ''}" data-image="${v.image || product.images[0]}">
                    ${v.title} — $${v.price.toFixed(2)}
                  </option>
                `).join('')}
              </select>
            </div>
          ` : `
            <input type="hidden" id="qvVariantSelect" value="${defaultVariant.id}">
          `}

          <div class="qv-quantity-group">
            <label class="qv-label">Quantity:</label>
            <div class="qv-qty-selector">
              <button type="button" class="qty-btn" id="qvQtyMinus">-</button>
              <span id="qvQtyVal" class="qty-val">1</span>
              <button type="button" class="qty-btn" id="qvQtyPlus">+</button>
            </div>
          </div>

          <div class="qv-actions">
            <button class="btn btn-primary qv-add-btn" id="qvAddToCartBtn">
              ⚡ Add to Microcurrent Cart
            </button>
            <button class="btn btn-secondary qv-direct-checkout" id="qvDirectCheckoutBtn">
              Proceed Directly to Shopify Checkout →
            </button>
          </div>

          <div class="qv-description-wrap">
            <h4 class="qv-desc-heading">Product Overview &amp; Clinical Details</h4>
            <div class="qv-full-desc">${product.fullDescriptionHtml || `<p>${product.shortDescription}</p>`}</div>
          </div>
        </div>
      </div>
    `;

    // Hook thumbnail switcher
    modalBody.querySelectorAll('.qv-thumb').forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        modalBody.querySelectorAll('.qv-thumb').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        const mainImg = document.getElementById('qvMainImage');
        if (mainImg) mainImg.src = e.target.src;
      });
    });

    // Hook variant changes in QuickView
    const qvSelect = document.getElementById('qvVariantSelect');
    if (qvSelect && qvSelect.tagName === 'SELECT') {
      qvSelect.addEventListener('change', () => {
        const opt = qvSelect.options[qvSelect.selectedIndex];
        const price = parseFloat(opt.dataset.price);
        const compare = parseFloat(opt.dataset.compare);
        const img = opt.dataset.image;

        const pElem = document.getElementById('qvPrice');
        if (pElem) pElem.textContent = `$${price.toFixed(2)}`;

        const cElem = document.getElementById('qvCompare');
        if (cElem) {
          if (compare && !isNaN(compare)) {
            cElem.textContent = `$${compare.toFixed(2)}`;
            cElem.style.display = 'inline';
          } else {
            cElem.style.display = 'none';
          }
        }

        if (img) {
          const mainImg = document.getElementById('qvMainImage');
          if (mainImg) mainImg.src = img;
        }
      });
    }

    // Hook quantity buttons
    let qvQty = 1;
    const qtyValElem = document.getElementById('qvQtyVal');
    const plusBtn = document.getElementById('qvQtyPlus');
    const minusBtn = document.getElementById('qvQtyMinus');

    if (plusBtn && minusBtn && qtyValElem) {
      plusBtn.addEventListener('click', () => {
        qvQty++;
        qtyValElem.textContent = qvQty;
      });
      minusBtn.addEventListener('click', () => {
        if (qvQty > 1) {
          qvQty--;
          qtyValElem.textContent = qvQty;
        }
      });
    }

    // Hook QuickView Add To Cart
    const qvAddBtn = document.getElementById('qvAddToCartBtn');
    if (qvAddBtn) {
      qvAddBtn.addEventListener('click', () => {
        const vId = qvSelect.value;
        addToCart(product.id, vId, qvQty);
        closeQuickView();
      });
    }

    // Hook QuickView Direct Checkout
    const qvDirectBtn = document.getElementById('qvDirectCheckoutBtn');
    if (qvDirectBtn) {
      qvDirectBtn.addEventListener('click', () => {
        const vId = qvSelect.value;
        checkoutWithShopify([{ variantId: vId, quantity: qvQty }], STORE_DOMAIN);
      });
    }

    // Show modal
    if (quickViewModal) quickViewModal.classList.add('active');
    if (quickViewBackdrop) quickViewBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    if (quickViewModal) quickViewModal.classList.remove('active');
    if (quickViewBackdrop) quickViewBackdrop.classList.remove('active');
    if (!cartModal || !cartModal.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  }

  // --- Cart Drawer UI ---
  function openCart() {
    if (cartModal) cartModal.classList.add('active');
    if (cartBackdrop) cartBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (cartModal) cartModal.classList.remove('active');
    if (cartBackdrop) cartBackdrop.classList.remove('active');
    if (!quickViewModal || !quickViewModal.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  }

  function updateCartUI() {
    const totalCount = getCartCount();
    const subtotal = getCartSubtotal();

    // Update count badges
    cartCountBadges.forEach(badge => {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'inline-flex' : 'none';
    });

    // Update subtotal
    if (cartSubtotalElem) {
      cartSubtotalElem.textContent = `$${subtotal.toFixed(2)}`;
    }

    // Render cart item list
    if (cartItemsContainer) {
      if (cart.length === 0) {
        if (cartEmptyState) cartEmptyState.style.display = 'block';
        cartItemsContainer.innerHTML = '';
      } else {
        if (cartEmptyState) cartEmptyState.style.display = 'none';
        cartItemsContainer.innerHTML = cart.map(item => `
          <div class="micro-cart-item" data-variant-id="${item.variantId}">
            <img src="${item.image}" alt="${item.title}" class="cart-item-thumb" onerror="this.src='images/products/placeholder.jpg'">
            <div class="cart-item-info">
              <h4 class="cart-item-title">${item.title}</h4>
              ${item.variantTitle ? `<span class="cart-item-variant">${item.variantTitle}</span>` : ''}
              <div class="cart-item-price-row">
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                <span class="cart-item-unit-price">($${item.price.toFixed(2)} each)</span>
              </div>
              <div class="cart-item-controls">
                <div class="quantity-picker">
                  <button class="qty-btn" data-action="decrease">-</button>
                  <span class="qty-num">${item.quantity}</span>
                  <button class="qty-btn" data-action="increase">+</button>
                </div>
                <button class="cart-remove-btn" data-action="remove" title="Remove item">🗑️ Remove</button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  }

  function handleCartAction(e) {
    const itemElem = e.target.closest('.micro-cart-item');
    if (!itemElem) return;

    const variantId = itemElem.dataset.variantId;
    const item = cart.find(i => i.variantId === variantId);
    if (!item) return;

    if (e.target.closest('[data-action="decrease"]')) {
      updateQuantity(variantId, item.quantity - 1);
    } else if (e.target.closest('[data-action="increase"]')) {
      updateQuantity(variantId, item.quantity + 1);
    } else if (e.target.closest('[data-action="remove"]')) {
      removeFromCart(variantId);
    }
  }

  // Notification Banner
  function showNotification(message, type = 'success') {
    const existing = document.querySelector('.micro-notification');
    if (existing) existing.remove();

    const notif = document.createElement('div');
    notif.className = `micro-notification ${type}`;
    notif.innerHTML = `
      <span class="notif-icon">${type === 'success' ? '✓' : '⚠️'}</span>
      <span class="notif-text">${message}</span>
    `;

    document.body.appendChild(notif);
    requestAnimationFrame(() => notif.classList.add('show'));

    setTimeout(() => {
      notif.classList.remove('show');
      setTimeout(() => notif.remove(), 300);
    }, 3200);
  }

  // Boot on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Global API exposure
  window.MicrocurrentStore = {
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
    openQuickView,
    closeQuickView,
    checkoutWithShopify,
    getCart: () => cart
  };

})();
