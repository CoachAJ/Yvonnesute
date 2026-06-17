// ============================================================
// 4ABETTERU2 WELLNESS — Shopping Cart System
// Cart functionality with localStorage and ygy1.com checkout
// ============================================================

(function() {
  'use strict';

  // Configuration
  const SPONSOR_ID = '102742703'; // Placeholder until Yvonne's is received
  const CART_STORAGE_KEY = 'yvonne4u_cart_v1';
  
  // Cart state
  let cart = [];
  let currentFilter = 'all';

  // DOM Elements (will be set on init)
  let cartModal, cartBackdrop, cartItems, cartEmpty, cartCount;
  let cartSubtotal, productsGrid, categoryFilter;

  // Initialize cart system
  function init() {
    // Load cart from storage
    loadCart();
    
    // Cache DOM elements
    cacheElements();
    
    // Setup event listeners
    setupEventListeners();
    
    // Render products
    renderProducts();
    
    // Render category filter
    renderCategoryFilter();
    
    // Update cart UI
    updateCartUI();
  }

  function cacheElements() {
    cartModal = document.getElementById('cartModal');
    cartBackdrop = document.getElementById('cartBackdrop');
    cartItems = document.getElementById('cartItems');
    cartEmpty = document.getElementById('cartEmpty');
    cartCount = document.getElementById('cartCount');
    cartSubtotal = document.getElementById('cartSubtotal');
    productsGrid = document.getElementById('productsGrid');
    categoryFilter = document.getElementById('categoryFilter');
  }

  function setupEventListeners() {
    // Cart toggle button
    const cartToggle = document.getElementById('cartToggle');
    if (cartToggle) {
      cartToggle.addEventListener('click', openCart);
    }

    // Close cart buttons
    const closeCartBtn = document.getElementById('closeCart');
    if (closeCartBtn) {
      closeCartBtn.addEventListener('click', closeCart);
    }

    // Continue shopping buttons
    const continueBtn = document.getElementById('continueShopping');
    if (continueBtn) {
      continueBtn.addEventListener('click', closeCart);
    }
    const continueBtn2 = document.getElementById('continueShopping2');
    if (continueBtn2) {
      continueBtn2.addEventListener('click', closeCart);
    }

    // Backdrop click
    if (cartBackdrop) {
      cartBackdrop.addEventListener('click', closeCart);
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', proceedToCheckout);
    }

    // Escape key to close cart
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeCart();
    });

    // Product grid click delegation for add to cart
    if (productsGrid) {
      productsGrid.addEventListener('click', handleProductGridClick);
    }

    // Category filter click delegation
    if (categoryFilter) {
      categoryFilter.addEventListener('click', handleCategoryClick);
    }

    // Cart items click delegation
    if (cartItems) {
      cartItems.addEventListener('click', handleCartItemClick);
    }
  }

  // Cart Functions
  function loadCart() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      cart = stored ? JSON.parse(stored) : [];
    } catch (e) {
      cart = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage');
    }
  }

  function addToCart(productId, quantity = 1) {
    // Find product
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) {
      showNotification('Product not found', 'error');
      return;
    }

    // Check if already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }

    saveCart();
    updateCartUI();
    showNotification(`${product.name} added to cart!`, 'success');

    // Pulse animation on cart count
    if (cartCount) {
      cartCount.classList.add('pulse');
      setTimeout(() => cartCount.classList.remove('pulse'), 400);
    }
  }

  function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    item.quantity = newQuantity;
    saveCart();
    updateCartUI();
  }

  function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
      cart.splice(index, 1);
      saveCart();
      updateCartUI();
      showNotification('Item removed from cart', 'success');
    }
  }

  function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
  }

  function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  function getCartItemCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  // UI Functions
  function updateCartUI() {
    // Update cart count badge
    if (cartCount) {
      const count = getCartItemCount();
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'flex' : 'none';
    }

    // Update cart items list
    if (cartItems && cartEmpty) {
      if (cart.length === 0) {
        cartItems.style.display = 'none';
        cartEmpty.style.display = 'block';
      } else {
        cartItems.style.display = 'flex';
        cartEmpty.style.display = 'none';
        renderCartItems();
      }
    }

    // Update subtotal
    if (cartSubtotal) {
      cartSubtotal.textContent = `$${getCartTotal().toFixed(2)}`;
    }
  }

  function renderCartItems() {
    if (!cartItems) return;

    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image || 'images/products/placeholder.jpg'}" 
             alt="${item.name}" 
             class="cart-item-image"
             onerror="this.src='images/products/placeholder.jpg'">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
        </div>
        <div class="cart-item-actions">
          <div class="quantity-control">
            <button class="quantity-btn minus" data-action="decrease">−</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn plus" data-action="increase">+</button>
          </div>
          <button class="cart-item-remove" data-action="remove" title="Remove item">×</button>
        </div>
      </div>
    `).join('');
  }

  function renderProducts() {
    if (!productsGrid) return;

    const filtered = currentFilter === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === currentFilter);

    if (filtered.length === 0) {
      productsGrid.innerHTML = '<p style="text-align:center;color:var(--muted);grid-column:1/-1;">No products in this category.</p>';
      return;
    }

    productsGrid.innerHTML = filtered.map(product => `
      <div class="product-card" data-id="${product.id}">
        <div class="product-image-wrap">
          <img src="${product.image}" 
               alt="${product.name}" 
               class="product-image"
               onerror="this.src='images/products/placeholder.jpg'">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        </div>
        <div class="product-content">
          <div class="product-category">${getCategoryName(product.category)}</div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-footer">
            <span class="product-price">$${product.price.toFixed(2)}</span>
            <button class="add-to-cart-btn" data-action="add">
              <span>+</span> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderCategoryFilter() {
    if (!categoryFilter) return;

    categoryFilter.innerHTML = CATEGORIES.map(cat => `
      <button class="category-btn ${cat.id === currentFilter ? 'active' : ''}" 
              data-category="${cat.id}">
        <span>${cat.icon}</span> ${cat.name}
      </button>
    `).join('');
  }

  function getCategoryName(categoryId) {
    const cat = CATEGORIES.find(c => c.id === categoryId);
    return cat ? cat.name : categoryId;
  }

  // Event Handlers
  function openCart(e) {
    if (e) e.preventDefault();
    if (cartModal) cartModal.classList.add('active');
    if (cartBackdrop) cartBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (cartModal) cartModal.classList.remove('active');
    if (cartBackdrop) cartBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function handleProductGridClick(e) {
    const btn = e.target.closest('[data-action="add"]');
    if (!btn) return;

    const card = btn.closest('.product-card');
    if (!card) return;

    const productId = card.dataset.id;
    addToCart(productId, 1);

    // Button feedback
    btn.classList.add('added');
    btn.innerHTML = '<span>✓</span> Added!';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = '<span>+</span> Add to Cart';
    }, 1500);
  }

  function handleCategoryClick(e) {
    const btn = e.target.closest('.category-btn');
    if (!btn) return;

    currentFilter = btn.dataset.category;
    renderCategoryFilter();
    renderProducts();
  }

  function handleCartItemClick(e) {
    const item = e.target.closest('.cart-item');
    if (!item) return;

    const productId = item.dataset.id;

    if (e.target.closest('[data-action="decrease"]')) {
      const currentQty = parseInt(item.querySelector('.quantity-value').textContent);
      updateQuantity(productId, currentQty - 1);
    } else if (e.target.closest('[data-action="increase"]')) {
      const currentQty = parseInt(item.querySelector('.quantity-value').textContent);
      updateQuantity(productId, currentQty + 1);
    } else if (e.target.closest('[data-action="remove"]')) {
      removeFromCart(productId);
    }
  }

  // Checkout
  function proceedToCheckout() {
    if (cart.length === 0) {
      showNotification('Your cart is empty!', 'error');
      return;
    }

    // Build checkout URL for ygy1.com
    let checkoutUrl = `https://ygy1.com/customer-checkout/v1.3/?sponsorid=${SPONSOR_ID}`;
    
    // Add items
    cart.forEach((item, index) => {
      checkoutUrl += `&item-${index + 1}=${encodeURIComponent(item.id)}%7C${item.quantity}`;
    });

    // Add destroy parameter and redirect
    checkoutUrl += '&destroy=1';

    // Open checkout in new tab
    window.open(checkoutUrl, '_blank');

    // Clear local cart after successful redirect
    clearCart();
    closeCart();
    
    showNotification('Redirecting to secure checkout...', 'success');
  }

  // Notification system
  function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <span>${type === 'success' ? '✓' : '!'}</span>
      ${message}
    `;

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.classList.add('show');
    });

    // Remove after delay
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // 90 For Life Paks Section - Multiple Ways to Get the 90 Essential Nutrients
  function renderNinetyForLife() {
    const container = document.getElementById('ninetyPaksGrid');
    if (!container) return;

    container.innerHTML = NINETY_FOR_LIFE_PAKS.map(pak => `
      <div class="ninety-pak-card" data-id="${pak.id}">
        <div class="ninety-pak-image">
          <img src="${pak.image}" alt="${pak.name}" onerror="this.src='images/products/placeholder.jpg'">
        </div>
        <div class="ninety-pak-content">
          <div class="ninety-pak-header">
            <h4 class="ninety-pak-name">${pak.name}</h4>
            <span class="ninety-pak-price">$${pak.price.toFixed(2)}</span>
          </div>
          <p class="ninety-pak-desc">${pak.description}</p>
          <div class="ninety-pak-actions">
            <button class="ninety-pak-btn buy add-pak-btn" data-id="${pak.id}">
              Buy Now
            </button>
            <a href="https://dailywithdoc.com" target="_blank" rel="noopener noreferrer" class="ninety-pak-btn learn">
              Learn More
            </a>
          </div>
        </div>
      </div>
    `).join('');

    // Add event listeners for Buy Now buttons
    container.querySelectorAll('.add-pak-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        addToCart(this.dataset.id, 1);
        
        // Button feedback
        this.textContent = '✓ Added!';
        this.style.background = 'var(--sage)';
        setTimeout(() => {
          this.textContent = 'Buy Now';
          this.style.background = '';
        }, 1500);
      });
    });
  }

  // Initialize when DOM is ready
  function initAll() {
    init();
    renderNinetyForLife();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Expose for global access
  window.CartSystem = {
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    openCart,
    closeCart,
    renderNinetyForLife
  };

})();
