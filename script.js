// ===============================
// Cart
// ===============================

let cart = [];

// Toggle Cart Drawer
function toggleCart() {
  const overlay = document.querySelector('.drawer-overlay');
  const drawer = document.querySelector('.cart-drawer');

  if (overlay && drawer) {
    overlay.classList.toggle('active');
    drawer.classList.toggle('active');
  }
}

// Add Item to Cart
function addToCart(name, price, img) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      img,
      quantity: 1
    });
  }

  updateCartUI();
  toggleCart();
}

// Remove Item
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// Update Cart
function updateCartUI() {
  const cartContainer = document.querySelector('.cart-items');
  const cartBadge = document.querySelector('.cart-count');

  if (!cartContainer) return;

  const totalCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (cartBadge) {
    cartBadge.textContent = totalCount;
  }

  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML =
      '<p class="text-center text-muted my-4">Your cart is empty.</p>';
    return;
  }

  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');

    itemElement.className =
      'd-flex align-items-center justify-content-between mb-3 pb-2 border-bottom';

    itemElement.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <img
          src="${item.img}"
          alt="${item.name}"
          style="width:50px;height:50px;object-fit:cover;border-radius:8px;"
        >

        <div>
          <h6 class="mb-0" style="font-size:0.9rem;">
            ${item.name}
          </h6>

          <small class="text-muted">
            Rs. ${item.price} x ${item.quantity}
          </small>
        </div>
      </div>

      <button
        type="button"
        class="btn btn-sm btn-outline-danger"
        onclick="removeFromCart(${index})"
      >
        <i class="bi bi-trash"></i>
      </button>
    `;

    cartContainer.appendChild(itemElement);
  });
}


// ===============================
// Page Ready
// ===============================

document.addEventListener('DOMContentLoaded', () => {

  // ===============================
  // Sidebar Navigation
  // ===============================

  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(item => item.classList.remove('active'));
      this.classList.add('active');
    });
  });


  // ===============================
  // Category Buttons
  // ===============================

  const categoryButtons =
    document.querySelectorAll('.category-card');

  categoryButtons.forEach(button => {
    button.addEventListener('click', function () {

      categoryButtons.forEach(btn =>
        btn.classList.remove('active')
      );

      this.classList.add('active');

      const category =
        this.textContent.trim().toLowerCase();

      filterFood(category);
    });
  });


  // ===============================
  // Menu Filter Buttons
  // ===============================

  const filterButtons =
    document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {

      filterButtons.forEach(btn =>
        btn.classList.remove('active')
      );

      this.classList.add('active');

      const category =
        this.textContent.trim().toLowerCase();

      filterFood(category);
    });
  });


  // ===============================
  // Food Filtering
  // ===============================

  function filterFood(category) {
    const foodCards =
      document.querySelectorAll('.food-card');

    foodCards.forEach(card => {

      const badge = card.querySelector('.badge');

      if (!badge) return;

      const foodCategory =
        badge.textContent.trim().toLowerCase();

      if (
        category === 'all' ||
        foodCategory === category
      ) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }


  // ===============================
  // Search
  // ===============================

  const searchInput =
    document.querySelector('.top-search input');

  if (searchInput) {
    searchInput.addEventListener('input', function () {

      const search =
        this.value.trim().toLowerCase();

      const foodCards =
        document.querySelectorAll('.food-card');

      foodCards.forEach(card => {

        const name =
          card.querySelector('h5')?.textContent
            .trim()
            .toLowerCase() || '';

        const category =
          card.querySelector('.badge')?.textContent
            .trim()
            .toLowerCase() || '';

        if (
          name.includes(search) ||
          category.includes(search)
        ) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }


  // ===============================
  // Add Vendor
  // ===============================

  const vendorButton =
    document.querySelector('.vendor-btn');

  if (vendorButton) {

    vendorButton.addEventListener('click', () => {

      const vendorName =
        prompt('Enter vendor name:');

      if (!vendorName || !vendorName.trim()) {
        return;
      }

      const vendorsSection =
        document.querySelector('#vendors');

      if (!vendorsSection) return;

      const vendorCard =
        document.createElement('div');

      vendorCard.className =
        'vendor-card mt-3';

      const safeName =
        vendorName.trim();

      vendorCard.innerHTML = `
        <div class="d-flex align-items-center gap-3">
          <div
            class="avatar"
            style="width:55px;height:55px;"
          >
            ${safeName.charAt(0).toUpperCase()}
          </div>

          <div>
            <h5 class="mb-1">${safeName}</h5>
            <span class="text-muted">
              Local Food Vendor
            </span>
          </div>
        </div>
      `;

      vendorsSection.appendChild(vendorCard);
    });
  }


  // ===============================
  // Checkout
  // ===============================

  const checkoutButton =
    document.querySelector('.cart-drawer .primary-btn');

  if (checkoutButton) {

    checkoutButton.addEventListener('click', () => {

      if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
      }

      const total =
        cart.reduce(
          (sum, item) =>
            sum + (Number(item.price) * item.quantity),
          0
        );

      alert(
        `Order placed successfully!\nTotal: Rs. ${total}`
      );

      cart = [];
      updateCartUI();

      const overlay =
        document.querySelector('.drawer-overlay');

      const drawer =
        document.querySelector('.cart-drawer');

      if (overlay) overlay.classList.remove('active');
      if (drawer) drawer.classList.remove('active');
    });
  }


  // ===============================
  // Login Validation
  // ===============================

  const loginForm =
    document.getElementById('loginForm');

  const errorElement =
    document.getElementById('login-error');

  if (loginForm) {

    loginForm.addEventListener('submit', function (e) {

      e.preventDefault();

      const email =
        document.getElementById('email')?.value.trim() || '';

      const password =
        document.getElementById('password')?.value || '';

      const phoneInput =
        document.getElementById('phone');

      const phone =
        phoneInput
          ? phoneInput.value.replace(/\D/g, '')
          : '';

      clearError();


      // Email must contain @
      if (!email.includes('@')) {
        showError(
          'Login failed: Email must contain "@".'
        );
        return;
      }


      // Email must contain .
      if (!email.includes('.')) {
        showError(
          'Login failed: Email must contain ".".'
        );
        return;
      }


      // Password minimum 8 characters
      if (password.length < 8) {
        showError(
          'Login failed: Password must be at least 8 characters.'
        );
        return;
      }


      // Phone minimum 8 digits
      if (phoneInput && phone.length < 8) {
        showError(
          'Login failed: Phone number must contain at least 8 digits.'
        );
        return;
      }


      // Login success
      alert('Login Successful!');

      const modalElement =
        document.getElementById('loginModal');

      if (modalElement && window.bootstrap) {

        const modalInstance =
          bootstrap.Modal.getInstance(modalElement) ||
          new bootstrap.Modal(modalElement);

        modalInstance.hide();
      }

      loginForm.reset();
    });
  }


  function showError(message) {

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    } else {
      alert(message);
    }
  }


  function clearError() {

    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  }


  // Initial Cart UI
  updateCartUI();

});
