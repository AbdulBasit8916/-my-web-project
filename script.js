let cart = JSON.parse(localStorage.getItem("foodMenCart")) || [];

// OPEN / CLOSE CART
function toggleCart(forceState = null) {
    const overlay = document.querySelector(".drawer-overlay");
    const drawer = document.querySelector(".cart-drawer");

    if (!overlay || !drawer) return;

    const open = forceState !== null
        ? forceState
        : !drawer.classList.contains("active");

    overlay.classList.toggle("active", open);
    drawer.classList.toggle("active", open);
}

// ADD TO CART
function addToCart(name, price, img) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: Number(price),
            img: img,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();

    // Cart open hoga
    toggleCart(true);
}

// PLUS
function increaseQuantity(index) {
    cart[index].quantity++;
    saveCart();
    updateCartUI();
}

// MINUS
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    saveCart();
    updateCartUI();
}

// REMOVE
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

// SAVE
function saveCart() {
    localStorage.setItem("foodMenCart", JSON.stringify(cart));
}

// UPDATE CART
function updateCartUI() {
    const container = document.querySelector(".cart-items");
    const badge = document.querySelector(".cart-count");

    if (!container) return;

    let totalItems = 0;
    let subtotal = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        subtotal += item.price * item.quantity;
    });

    // Cart number
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? "block" : "none";
    }

    container.innerHTML = "";

    // EMPTY CART
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="bi bi-cart-x"></i>
                <h6>Your cart is empty</h6>
                <p>Add some delicious food!</p>
            </div>
        `;

        updateTotal(0);
        return;
    }

    // CART ITEMS
    cart.forEach((item, index) => {

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <img 
                src="${item.img}" 
                class="cart-item-img"
                alt="${item.name}"
            >

            <div class="cart-item-info">
                <h6>${item.name}</h6>

                <small>
                    Rs. ${item.price}
                </small>

                <div class="quantity-controls">

                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>
            </div>

            <div class="cart-item-right">

                <strong>
                    Rs. ${item.price * item.quantity}
                </strong>

                <button 
                    class="remove-cart-btn"
                    onclick="removeFromCart(${index})"
                >
                    <i class="bi bi-trash"></i>
                </button>

            </div>
        `;

        container.appendChild(div);
    });

    updateTotal(subtotal);
}

// TOTAL
function updateTotal(subtotal) {

    let summary = document.querySelector(".cart-summary");

    if (!summary) {

        const drawer = document.querySelector(".cart-drawer");

        summary = document.createElement("div");

        summary.className = "cart-summary";

        drawer.appendChild(summary);
    }

    const delivery = subtotal > 0 ? 100 : 0;

    summary.innerHTML = `
        <div class="cart-total-row">
            <span>Subtotal</span>
            <strong>Rs. ${subtotal}</strong>
        </div>

        <div class="cart-total-row">
            <span>Delivery</span>
            <strong>Rs. ${delivery}</strong>
        </div>

        <div class="cart-total-row grand-total">
            <span>Total</span>
            <strong>
                Rs. ${subtotal + delivery}
            </strong>
        </div>
    `;
}

// CHECKOUT
function checkoutCart() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully! 🎉");
}

// PAGE LOAD
document.addEventListener("DOMContentLoaded", function () {
    updateCartUI();
});
