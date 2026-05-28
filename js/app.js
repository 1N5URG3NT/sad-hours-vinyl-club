/* ============================================
   SAD HOURS VINYL CLUB
   Main Application Logic
   Dark Tactical / Hardcore / Neo-Trad

   NOTE: Before going live, update:
   - BUSINESS_EMAIL in Netlify env vars
   - Email 'from' address in stripe-webhook.js (after verifying domain in Resend)
   - Any contact details in success.html and emails
   ============================================ */

// ==================== PRODUCT DATA ====================
// EDIT ME: Add, remove, or modify products here. They auto-render everywhere.

const products = [
  {
    id: 1,
    name: "DEATH BEFORE DISHONOR",
    category: "Car & Truck",
    basePrice: 24,
    image: "https://picsum.photos/id/1018/800/800",
    description: "Neo-traditional skull with dagger through the jaw. Our signature piece. Printed on premium 3M cast vinyl that laughs at UV and road grime.",
    specs: "3M 2080 cast vinyl • 5–7 year outdoor durability • Easy install instructions included • Available in 4 finishes",
    sizes: ["Small (6\")", "Medium (12\")", "Large (18\")", "X-Large (24\")"],
    finishes: ["Matte Black", "Gloss Black", "Red", "Reflective Silver"],
    colors: ["Matte Black", "Gloss Black", "Red", "Reflective Silver"]
  },
  {
    id: 2,
    name: "NO QUARTER",
    category: "Car & Truck",
    basePrice: 19,
    image: "https://picsum.photos/id/1033/800/800",
    description: "Bold American flag distressed tactical graphic. Perfect for tailgates, truck beds, and anyone who means it.",
    specs: "Oracal 751 premium • Weatherproof • UV stabilized • 6-year life",
    sizes: ["Small (6\")", "Medium (12\")", "Large (18\")"],
    finishes: ["Matte", "Gloss", "Distressed"],
    colors: ["Full Color", "Black & White", "Red White Blue"]
  },
  {
    id: 3,
    name: "TILL VALHALLA",
    category: "Car & Truck",
    basePrice: 27,
    image: "https://picsum.photos/id/1005/800/800",
    description: "Heavy Norse raven and runes in hardcore neo-trad style. For those who ride hard and never tap out.",
    specs: "Premium cast vinyl • 7+ year rating • Aggressive adhesive • 3M laminate option",
    sizes: ["Medium (12\")", "Large (18\")", "X-Large (24\")"],
    finishes: ["Matte Black", "Gloss", "Reflective"],
    colors: ["Matte Black", "Gloss Black", "Blood Red", "Reflective"]
  },
  {
    id: 4,
    name: "BUILT NOT BOUGHT",
    category: "Car & Truck",
    basePrice: 22,
    image: "https://picsum.photos/id/106/800/800",
    description: "Classic wrench and piston mark. For the guys turning wrenches at 2am in the garage. Mechanic approved.",
    specs: "3M 2080 • Oil & solvent resistant • Easy peel & stick",
    sizes: ["Small (6\")", "Medium (12\")", "Large (18\")"],
    finishes: ["Matte Black", "Gloss", "Camo"],
    colors: ["Matte Black", "Gloss Black", "Camo"]
  },
  {
    id: 5,
    name: "SMITH & CO. WELDING",
    category: "Business & Signage",
    basePrice: 89,
    image: "https://picsum.photos/id/160/800/800",
    description: "Full custom business window lettering kit. 2-color. We design it from your logo or rough sketch.",
    specs: "Professional grade exterior vinyl • Includes transfer tape • Install kit + instructions",
    sizes: ["Standard Shop Kit (24\")", "Large Shop Kit (36\")", "Full Window Set (48\")"],
    finishes: ["Matte", "Gloss"],
    colors: ["Black + Amber", "White + Red", "Custom Colors"]
  },
  {
    id: 6,
    name: "HARD TIMES STRIPES",
    category: "Car & Truck",
    basePrice: 34,
    image: "https://picsum.photos/id/201/800/800",
    description: "Aggressive side stripe kit with barbed wire and star accents. Fits most trucks and muscle cars. Two sides included.",
    specs: "3M cast • 6-year durability • Pre-masked for perfect alignment",
    sizes: ["Full Side Kit", "Hood + Fenders", "Rear Window Only"],
    finishes: ["Matte Black", "Gloss Black", "Red Accent"],
    colors: ["Matte Black", "Gloss Black", "Red Accent"]
  },
  {
    id: 7,
    name: "RIDE OR DIE",
    category: "Helmets & Gear",
    basePrice: 16,
    image: "https://picsum.photos/id/180/800/800",
    description: "Reflective moto helmet and gear pack. 4-piece set. Survives 200mph wind and pressure washing.",
    specs: "High-intensity reflective + standard vinyl • Motorcycle safe • Helmet + tank + fairing",
    sizes: ["4-Piece Set"],
    finishes: ["Reflective", "Matte", "Gloss"],
    colors: ["White Reflective", "Red Reflective", "Black"]
  },
  {
    id: 8,
    name: "SAD HOURS ORIGINAL",
    category: "Sticker Packs",
    basePrice: 14,
    image: "https://picsum.photos/id/251/800/800",
    description: "Our iconic 6-sticker pack. Includes the dagger skull, crossed pistons, \"No Quarter\" flag, and 3 micro tags. Die-cut.",
    specs: "Premium outdoor vinyl • Weatherproof • Perfect for toolboxes, water bottles, trucks",
    sizes: ["One Size (6 stickers)"],
    finishes: ["Mixed Finishes"],
    colors: ["Classic Pack"]
  },
  {
    id: 9,
    name: "24HR TOWING",
    category: "Business & Signage",
    basePrice: 67,
    image: "https://picsum.photos/id/292/800/800",
    description: "Professional tow & recovery lettering package. Includes phone number field. Looks sharp on service trucks.",
    specs: "Oracal 751RA • 7-year rating • Includes install squeegee",
    sizes: ["Door Set (2 doors)", "Full Cab Set", "Trailer + Truck Combo"],
    finishes: ["Matte", "Gloss"],
    colors: ["Black + Yellow", "White + Red", "Custom"]
  },
  {
    id: 10,
    name: "BARBED CROSS",
    category: "Car & Truck",
    basePrice: 21,
    image: "https://picsum.photos/id/133/800/800",
    description: "Heavy barbed wire cross. Deeply personal piece for those who carry their own.",
    specs: "3M 2080 cast • Available in multiple sizes • Extremely durable",
    sizes: ["Small (6\")", "Medium (12\")", "Large (18\")"],
    finishes: ["Matte Black", "Gloss Black", "Distressed"],
    colors: ["Matte Black", "Gloss Black", "Blood Red"]
  },
  {
    id: 11,
    name: "CUSTOM MONOGRAM",
    category: "Custom Shapes",
    basePrice: 38,
    image: "https://picsum.photos/id/312/800/800",
    description: "Your initials or family name in bold neo-traditional lettering. We vectorize your sketch or text for perfect cuts.",
    specs: "True vector cut • Any size up to 36\" • Multiple color options",
    sizes: ["12 inch", "18 inch", "24 inch", "36 inch"],
    finishes: ["Matte", "Gloss", "Reflective"],
    colors: ["Matte Black", "Gloss White", "Red", "Gold"]
  },
  {
    id: 12,
    name: "MECHANIC'S PRAYER",
    category: "Helmets & Gear",
    basePrice: 18,
    image: "https://picsum.photos/id/29/800/800",
    description: "\"Lord, give me the strength to not throw this wrench.\" Classic garage humor in hardcore lettering.",
    specs: "Solvent & oil resistant • Tool box + helmet ready",
    sizes: ["Small (5\")", "Medium (9\")"],
    finishes: ["Matte Black", "Gloss"],
    colors: ["Matte Black", "Red", "White"]
  }
];

// ==================== STATE ====================
let cart = [];
let currentProduct = null;
let currentFilters = {
  category: 'All',
  search: '',
  sort: 'featured'
};

// ==================== UTILITIES ====================
function formatPrice(price) {
  return '$' + price.toFixed(0);
}

function generateOrderNumber() {
  const num = Math.floor(10000 + Math.random() * 90000);
  return 'SH-' + num;
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast flex items-center gap-3 px-5 py-4 rounded-md shadow-2xl max-w-xs ${
    type === 'success' ? 'bg-[#121214] border border-[#2a2a2f] text-white' : 'bg-red-950 border border-red-900 text-red-100'
  }`;

  toast.innerHTML = `
    <div class="flex-1 text-sm font-medium">${message}</div>
    <button class="text-[#9a9aa0] hover:text-white" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 3200);
}

function saveCart() {
  localStorage.setItem('shvc_cart', JSON.stringify(cart));
  updateCartCount();
}

function loadCart() {
  const saved = localStorage.getItem('shvc_cart');
  if (saved) {
    cart = JSON.parse(saved);
  }
  updateCartCount();
}

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (!countEl) return;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  countEl.textContent = totalItems;
  countEl.classList.toggle('hidden', totalItems === 0);
}

// ==================== PRODUCT RENDERING ====================
function getFilteredProducts() {
  let result = [...products];

  // Category filter
  if (currentFilters.category !== 'All') {
    result = result.filter(p => p.category === currentFilters.category);
  }

  // Search
  if (currentFilters.search) {
    const term = currentFilters.search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  }

  // Sort
  switch (currentFilters.sort) {
    case 'price-low':
      result.sort((a, b) => a.basePrice - b.basePrice);
      break;
    case 'price-high':
      result.sort((a, b) => b.basePrice - a.basePrice);
      break;
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      // featured - keep original order
      break;
  }

  return result;
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 text-center">
        <p class="text-[#9a9aa0]">No decals found for that search.</p>
        <button onclick="resetFilters()" class="btn btn-secondary mt-4">Clear Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => `
    <div class="product-card rounded-lg overflow-hidden group cursor-pointer" onclick="openProductModal(${product.id})">
      <div class="image-container aspect-square relative">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
        <div class="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-mono tracking-[1px] bg-black/70 text-white rounded">
          ${product.category.split(' ')[0].toUpperCase()}
        </div>
      </div>
      <div class="p-5">
        <div class="font-semibold text-lg tracking-tight mb-1">${product.name}</div>
        <div class="text-sm text-[#9a9aa0] mb-4 line-clamp-2">${product.description.substring(0, 95)}...</div>
        
        <div class="flex items-center justify-between">
          <div>
            <span class="text-xl font-semibold tracking-tighter">${formatPrice(product.basePrice)}</span>
            <span class="text-xs text-[#9a9aa0]"> from</span>
          </div>
          <button onclick="event.stopImmediatePropagation(); quickAddToCart(${product.id})" 
                  class="btn btn-primary text-xs px-4 py-2">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function resetFilters() {
  currentFilters = { category: 'All', search: '', sort: 'featured' };
  document.getElementById('search-input').value = '';
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  document.querySelector('.filter-pill[data-category="All"]').classList.add('active');
  document.getElementById('sort-select').value = 'featured';
  renderProducts();
}

// ==================== PRODUCT MODAL ====================
function openProductModal(productId) {
  currentProduct = products.find(p => p.id === productId);
  if (!currentProduct) return;

  const modal = document.getElementById('product-modal');
  const content = document.getElementById('product-modal-content');

  content.innerHTML = `
    <div class="grid md:grid-cols-2 gap-8">
      <!-- Image -->
      <div class="bg-[#111] rounded-lg overflow-hidden aspect-square">
        <img src="${currentProduct.image}" alt="${currentProduct.name}" class="w-full h-full object-cover">
      </div>

      <!-- Details -->
      <div class="flex flex-col">
        <div class="flex justify-between items-start mb-2">
          <div>
            <div class="uppercase tracking-[2px] text-xs text-[#9a9aa0] mb-1">${currentProduct.category}</div>
            <h3 class="text-3xl font-bold tracking-tighter">${currentProduct.name}</h3>
          </div>
          <button onclick="closeProductModal()" class="text-3xl text-[#9a9aa0] hover:text-white leading-none mt-1">&times;</button>
        </div>

        <div class="text-3xl font-semibold tracking-[-1.5px] mt-2 mb-6">${formatPrice(currentProduct.basePrice)} <span class="text-base font-normal text-[#9a9aa0]">starting</span></div>

        <p class="text-[#c8c8cc] leading-relaxed">${currentProduct.description}</p>

        <div class="my-6 text-xs text-[#9a9aa0] font-mono tracking-widest border-l-2 border-[#9f1f2b] pl-4">
          ${currentProduct.specs}
        </div>

        <!-- Options -->
        <div class="space-y-6 mt-auto pt-4">
          <!-- Size -->
          <div>
            <div class="text-xs font-semibold tracking-widest text-[#9a9aa0] mb-2">SIZE</div>
            <div class="flex flex-wrap gap-2" id="size-options">
              ${currentProduct.sizes.map((size, i) => `
                <button class="option-btn ${i === 0 ? 'active' : ''}" data-value="${size}" onclick="selectOption(this, 'size')">${size}</button>
              `).join('')}
            </div>
          </div>

          <!-- Finish -->
          <div>
            <div class="text-xs font-semibold tracking-widest text-[#9a9aa0] mb-2">FINISH</div>
            <div class="flex flex-wrap gap-2" id="finish-options">
              ${currentProduct.finishes.map((finish, i) => `
                <button class="option-btn ${i === 0 ? 'active' : ''}" data-value="${finish}" onclick="selectOption(this, 'finish')">${finish}</button>
              `).join('')}
            </div>
          </div>

          <!-- Color -->
          <div>
            <div class="text-xs font-semibold tracking-widest text-[#9a9aa0] mb-2">COLOR / VARIANT</div>
            <div class="flex flex-wrap gap-2" id="color-options">
              ${currentProduct.colors.map((color, i) => `
                <button class="option-btn ${i === 0 ? 'active' : ''}" data-value="${color}" onclick="selectOption(this, 'color')">${color}</button>
              `).join('')}
            </div>
          </div>

          <!-- Quantity -->
          <div>
            <div class="text-xs font-semibold tracking-widest text-[#9a9aa0] mb-2">QUANTITY</div>
            <div class="flex items-center gap-4">
              <div class="flex border border-[#2a2a2f] rounded">
                <button onclick="changeQuantity(-1)" class="px-4 py-2 text-xl hover:bg-[#1f1f23]">-</button>
                <div id="modal-qty" class="px-6 py-2 font-mono border-x border-[#2a2a2f]">1</div>
                <button onclick="changeQuantity(1)" class="px-4 py-2 text-xl hover:bg-[#1f1f23]">+</button>
              </div>
              <div id="line-total" class="text-xl font-semibold tracking-tight">${formatPrice(currentProduct.basePrice)}</div>
            </div>
          </div>
        </div>

        <div class="flex gap-3 mt-8">
          <button onclick="addCurrentProductToCart()" class="btn btn-primary flex-1 text-sm py-3.5">ADD TO CART</button>
          <button onclick="closeProductModal()" class="btn btn-secondary flex-1 text-sm py-3.5">MAYBE LATER</button>
        </div>
      </div>
    </div>
  `;

  // Initialize selections
  window.selectedOptions = {
    size: currentProduct.sizes[0],
    finish: currentProduct.finishes[0],
    color: currentProduct.colors[0],
    quantity: 1
  };

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function selectOption(btn, type) {
  const container = btn.parentElement;
  container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  window.selectedOptions[type] = btn.dataset.value;

  // Update live price preview
  updateModalPrice();
}

function changeQuantity(delta) {
  const qtyEl = document.getElementById('modal-qty');
  let qty = parseInt(qtyEl.textContent) + delta;
  if (qty < 1) qty = 1;
  qtyEl.textContent = qty;
  window.selectedOptions.quantity = qty;
  updateModalPrice();
}

function updateModalPrice() {
  if (!currentProduct || !window.selectedOptions) return;

  const base = currentProduct.basePrice;
  const qty = window.selectedOptions.quantity || 1;

  // Simple tier pricing
  let multiplier = 1;
  if (qty >= 5) multiplier = 0.88;
  else if (qty >= 3) multiplier = 0.93;

  const total = Math.round(base * multiplier * qty);
  const el = document.getElementById('line-total');
  if (el) el.innerHTML = formatPrice(total);
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  modal.classList.remove('flex');
  modal.classList.add('hidden');
  currentProduct = null;
}

function addCurrentProductToCart() {
  if (!currentProduct || !window.selectedOptions) return;

  const opts = window.selectedOptions;
  const base = currentProduct.basePrice;
  const qty = opts.quantity || 1;

  let multiplier = 1;
  if (qty >= 5) multiplier = 0.88;
  else if (qty >= 3) multiplier = 0.93;

  const unitPrice = Math.round(base * multiplier);

  const cartItem = {
    id: Date.now(),
    productId: currentProduct.id,
    name: currentProduct.name,
    size: opts.size,
    finish: opts.finish,
    color: opts.color,
    quantity: qty,
    unitPrice: unitPrice
  };

  cart.push(cartItem);
  saveCart();
  closeProductModal();
  showToast(`Added ${qty}× ${currentProduct.name}`, 'success');
  openCartDrawer();
}

// Quick add (no options)
function quickAddToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cartItem = {
    id: Date.now(),
    productId: product.id,
    name: product.name,
    size: product.sizes[0],
    finish: product.finishes[0],
    color: product.colors[0],
    quantity: 1,
    unitPrice: product.basePrice
  };

  cart.push(cartItem);
  saveCart();
  showToast(`Added ${product.name}`, 'success');
}

// ==================== CART DRAWER ====================
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const content = document.getElementById('cart-content');

  if (cart.length === 0) {
    content.innerHTML = `
      <div class="flex flex-col items-center justify-center h-full text-center px-6">
        <div class="text-6xl mb-6 opacity-30">🛠️</div>
        <div class="font-semibold text-xl mb-2">Your cart is empty</div>
        <p class="text-[#9a9aa0] max-w-xs">Time to put some real vinyl on that rig.</p>
        <button onclick="closeCartDrawer(); document.getElementById('shop').scrollIntoView({behavior:'smooth'})" 
                class="btn btn-primary mt-8">BROWSE DECALS</button>
      </div>
    `;
  } else {
    let subtotal = 0;
    const itemsHTML = cart.map((item, index) => {
      const lineTotal = item.unitPrice * item.quantity;
      subtotal += lineTotal;

      return `
        <div class="flex gap-4 py-5 border-b border-[#2a2a2f]">
          <div class="flex-1">
            <div class="font-semibold tracking-tight">${item.name}</div>
            <div class="text-xs text-[#9a9aa0] mt-1">${item.size} • ${item.finish} • ${item.color}</div>
            <div class="flex items-center gap-4 mt-3">
              <div class="flex items-center border border-[#2a2a2f] text-xs rounded">
                <button onclick="adjustCartItem(${index}, -1)" class="px-3 py-1 hover:bg-[#1f1f23]">-</button>
                <span class="px-3 py-1 font-mono border-x border-[#2a2a2f]">${item.quantity}</span>
                <button onclick="adjustCartItem(${index}, 1)" class="px-3 py-1 hover:bg-[#1f1f23]">+</button>
              </div>
              <button onclick="removeFromCart(${index})" class="text-xs text-[#9a9aa0] hover:text-red-400">REMOVE</button>
            </div>
          </div>
          <div class="text-right font-medium tabular-nums">
            ${formatPrice(lineTotal)}
          </div>
        </div>
      `;
    }).join('');

    content.innerHTML = `
      <div class="flex-1 overflow-auto pr-1">
        ${itemsHTML}
      </div>

      <div class="pt-5 border-t border-[#2a2a2f] mt-auto">
        <div class="flex justify-between text-sm mb-2">
          <span class="text-[#9a9aa0]">SUBTOTAL</span>
          <span class="font-semibold">${formatPrice(subtotal)}</span>
        </div>
        <div class="flex justify-between text-xs text-[#9a9aa0] mb-6">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>

        <button onclick="proceedToCheckout()" class="btn btn-primary w-full py-3.5 text-sm tracking-wider">PROCEED TO CHECKOUT</button>
        <button onclick="closeCartDrawer()" class="btn btn-ghost w-full mt-2 text-xs">CONTINUE BROWSING</button>
      </div>
    `;
  }

  drawer.classList.remove('hidden');
  drawer.classList.add('flex');
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  drawer.classList.remove('flex');
  drawer.classList.add('hidden');
}

function adjustCartItem(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity < 1) cart[index].quantity = 1;
  saveCart();
  openCartDrawer(); // re-render
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  openCartDrawer();
}

// ==================== LOADING OVERLAY (for Stripe redirects) ====================
function showLoadingOverlay(message = 'Connecting to secure checkout...') {
  const existing = document.getElementById('loading-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'loading-overlay';
  overlay.className = 'fixed inset-0 z-[200] bg-black/95 flex items-center justify-center';
  overlay.innerHTML = `
    <div class="text-center px-6">
      <div class="mx-auto mb-6 h-9 w-9 animate-spin rounded-full border-[3px] border-[#9f1f2b] border-t-transparent"></div>
      <div class="text-base md:text-lg font-semibold tracking-[-0.3px]">${message}</div>
      <div class="mt-2 text-xs text-[#9a9aa0] tracking-wider">SECURE CHECKOUT POWERED BY STRIPE</div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function hideLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.remove();
}

// ==================== REAL STRIPE CHECKOUT ====================
// Real Stripe Checkout flow (replaces the old fake checkout)
async function proceedToCheckout() {
  closeCartDrawer();

  // Build a proper pre-checkout modal with order summary
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-[130] bg-black/90 flex items-center justify-center p-4';
  
  // Calculate totals
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.unitPrice * item.quantity;
  });
  const shipping = subtotal > 120 ? 0 : 12;
  const total = subtotal + shipping;

  // Build order summary HTML
  const summaryHTML = cart.map(item => `
    <div class="flex justify-between text-sm py-2 border-b border-[#2a2a2f]">
      <div>
        <div class="font-medium">${item.name}</div>
        <div class="text-[11px] text-[#9a9aa0]">${item.size} • ${item.finish} • ${item.color}</div>
      </div>
      <div class="text-right">
        <div>${item.quantity}× ${formatPrice(item.unitPrice)}</div>
        <div class="text-xs text-[#9a9aa0]">${formatPrice(item.unitPrice * item.quantity)}</div>
      </div>
    </div>
  `).join('');

  modal.innerHTML = `
    <div class="modal bg-[#121214] border border-[#2a2a2f] w-full max-w-lg rounded-2xl overflow-hidden max-h-[94vh] md:max-h-[92vh] overflow-y-auto">
      <div class="px-6 py-5 border-b border-[#1f1f23] flex justify-between items-center">
        <div class="font-semibold tracking-wide">REVIEW YOUR ORDER</div>
        <button id="pre-cancel" class="text-2xl text-[#9a9aa0] hover:text-white leading-none">&times;</button>
      </div>

      <div class="p-5 md:p-6">
        <!-- Order Summary -->
        <div class="mb-5 md:mb-6">
          <div class="text-xs uppercase tracking-[1.5px] text-[#9a9aa0] mb-2 md:mb-3">YOUR DECALS</div>
          <div class="max-h-[180px] md:max-h-[220px] overflow-auto pr-1 space-y-1 text-sm">
            ${summaryHTML}
          </div>
        </div>

        <!-- Totals -->
        <div class="border-t border-[#2a2a2f] pt-4 space-y-1 text-sm mb-6">
          <div class="flex justify-between">
            <span class="text-[#9a9aa0]">Subtotal</span>
            <span>${formatPrice(subtotal)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-[#9a9aa0]">Shipping</span>
            <span>${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
          </div>
          <div class="flex justify-between pt-2 border-t border-[#2a2a2f] font-semibold text-base">
            <span>Total</span>
            <span>${formatPrice(total)}</span>
          </div>
        </div>

        <!-- Contact Info -->
        <div>
          <div class="text-xs uppercase tracking-[1.5px] text-[#9a9aa0] mb-3">YOUR INFORMATION</div>
          <div class="space-y-3">
            <input id="pre-name" type="text" placeholder="FULL NAME" class="input w-full" />
            <input id="pre-email" type="email" placeholder="EMAIL ADDRESS (for receipt & updates)" class="input w-full" />
          </div>
          <div class="text-[10px] text-[#666] mt-2 tracking-wider">We’ll send your order confirmation here.</div>
        </div>
      </div>

      <div class="px-6 py-5 border-t border-[#1f1f23] bg-[#0f0f11]">
        <button id="pre-continue" class="btn btn-primary w-full py-3.5 text-sm">
          CONTINUE TO SECURE PAYMENT →
        </button>

        <div class="flex items-center justify-between mt-4 text-xs">
          <button id="pre-edit-cart" class="text-[#9a9aa0] hover:text-white underline underline-offset-2">
            Edit Cart
          </button>
          <div class="text-[#666] tracking-widest">POWERED BY STRIPE</div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Focus first input
  setTimeout(() => {
    const nameInput = document.getElementById('pre-name');
    if (nameInput) nameInput.focus();
  }, 200);

  // Event listeners
  document.getElementById('pre-cancel').onclick = () => modal.remove();

  // Edit Cart button - close this modal and reopen the cart drawer
  const editCartBtn = document.getElementById('pre-edit-cart');
  if (editCartBtn) {
    editCartBtn.onclick = () => {
      modal.remove();
      setTimeout(() => {
        openCartDrawer();
      }, 180);
    };
  }

  document.getElementById('pre-continue').onclick = async () => {
    const name = document.getElementById('pre-name').value.trim() || 'Customer';
    const email = document.getElementById('pre-email').value.trim();

    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    modal.remove();
    showLoadingOverlay('Connecting to Stripe...');

    try {
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart: cart,
          customerEmail: email,
          customerName: name
        })
      });

      const data = await response.json();

      if (data.url) {
        // Small delay so the loading state is visible
        setTimeout(() => {
          window.location.href = data.url;
        }, 450);
      } else {
        hideLoadingOverlay();
        throw new Error(data.error || 'Failed to start checkout');
      }
    } catch (error) {
      hideLoadingOverlay();
      console.error('[Sad Hours] Checkout error:', error);

      const errorMessage = error?.message || 'Something went wrong starting checkout.';
      showToast(errorMessage, 'error');

      // Show a more helpful alert only if the toast might be missed
      if (errorMessage.length > 60) {
        alert(errorMessage);
      }
    }
  };
}


// Old fake checkout code has been removed.
// Real Stripe Checkout is now handled in proceedToCheckout() above.

// ==================== CUSTOM ORDER MODAL ====================
function openCustomModal() {
  const modal = document.getElementById('custom-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeCustomModal() {
  const modal = document.getElementById('custom-modal');
  modal.classList.remove('flex');
  modal.classList.add('hidden');
}

function submitCustomOrder(e) {
  e.preventDefault();
  const form = e.target;

  const name = form.querySelector('#custom-name').value;
  const email = form.querySelector('#custom-email').value;
  const project = form.querySelector('#custom-project').value;

  closeCustomModal();

  setTimeout(() => {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    modal.innerHTML = `
      <div class="modal bg-[#121214] border border-[#2a2a2f] max-w-md w-full mx-4 rounded-xl p-8 text-center">
        <div class="text-[#9f1f2b] text-5xl mb-4">✓</div>
        <h3 class="text-2xl font-bold tracking-tight mb-3">REQUEST RECEIVED</h3>
        <p class="text-[#c8c8cc]">Thanks, ${name.split(' ')[0]}. Our production lead will review your project and send a proof + quote within 4 hours.</p>
        <div class="text-xs text-[#9a9aa0] mt-6 tracking-widest">WE TAKE THIS SHIT SERIOUSLY</div>
        <button onclick="closeSuccessModal()" class="btn btn-primary mt-8 w-full">GOT IT</button>
      </div>
    `;
  }, 280);
}

function closeSuccessModal() {
  document.getElementById('success-modal').classList.add('hidden');
  document.getElementById('success-modal').classList.remove('flex');
}

// ==================== FILTERS & SEARCH ====================
function setupFilters() {
  // Category pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      currentFilters.category = pill.dataset.category;
      renderProducts();
    });
  });

  // Search
  const search = document.getElementById('search-input');
  search.addEventListener('input', () => {
    currentFilters.search = search.value;
    renderProducts();
  });

  // Sort
  document.getElementById('sort-select').addEventListener('change', (e) => {
    currentFilters.sort = e.target.value;
    renderProducts();
  });
}

// ==================== NAV & MOBILE ====================
function setupMobileNav() {
  const toggle = document.getElementById('mobile-nav-toggle');
  const nav = document.getElementById('mobile-nav');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    nav.classList.toggle('hidden');
  });

  // Close on nav click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      nav.classList.add('hidden');
    });
  });
}

// ==================== FAQ ====================
function setupFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isOpen = answer.classList.contains('open');

      // Close all others
      document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));

      if (!isOpen) {
        answer.classList.add('open');
      }
    });
  });
}

// ==================== INITIALIZATION ====================
function initialize() {
  // Load persisted cart
  loadCart();

  // Render products
  renderProducts();

  // Filters & search
  setupFilters();

  // Mobile nav
  setupMobileNav();

  // FAQ
  setupFAQ();

  // Toast container
  if (!document.getElementById('toast-container')) {
    const tc = document.createElement('div');
    tc.id = 'toast-container';
    tc.className = 'fixed bottom-5 right-5 z-[200] flex flex-col gap-2';
    document.body.appendChild(tc);
  }

  // Keyboard escape handlers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modals = document.querySelectorAll('.modal, #cart-drawer, #checkout-modal, #custom-modal');
      let closed = false;
      modals.forEach(m => {
        if (!m.classList.contains('hidden') && m.classList.contains('flex')) {
          m.classList.remove('flex');
          m.classList.add('hidden');
          closed = true;
        }
      });
      if (!closed) {
        const drawer = document.getElementById('cart-drawer');
        if (drawer && drawer.classList.contains('flex')) {
          drawer.classList.remove('flex');
          drawer.classList.add('hidden');
        }
      }
    }
  });

  // Make sure cart count is accurate on load
  updateCartCount();

  // Demo hint (only once)
  setTimeout(() => {
    const hasVisited = localStorage.getItem('shvc_visited');
    if (!hasVisited) {
      // Uncomment if you want an onboarding toast:
      // showToast('Try adding a few decals and checking out');
      localStorage.setItem('shvc_visited', '1');
    }
  }, 6800);

  console.log('%c[Sad Hours Vinyl Club] Website initialized — tactical mode engaged.', 'color:#444');
}

// Boot everything
document.addEventListener('DOMContentLoaded', initialize);

// ==================== STRIPE CANCEL / ERROR HANDLING ====================
// Detect when user returns from Stripe after cancelling payment
function handlePaymentReturnState() {
  const params = new URLSearchParams(window.location.search);

  if (params.get('payment') === 'cancelled') {
    // Show helpful message
    setTimeout(() => {
      showToast('Payment cancelled. Your cart is still saved — you can try again anytime.', 'error');
    }, 600);

    // Clean the URL so it doesn't show on refresh
    const cleanUrl = window.location.pathname + window.location.hash;
    window.history.replaceState({}, document.title, cleanUrl);
  }
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
  handlePaymentReturnState();
});