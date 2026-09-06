// ==========================================
// FOOD MEN - COMPLETE WORKING JAVASCRIPT
// ==========================================

let cart = [];

// ==========================================
// CART DRAWER
// ==========================================

function toggleCart() {
    const drawer = document.querySelector(".cart-drawer");
    const overlay = document.querySelector(".drawer-overlay");

    if (!drawer || !overlay) return;

    drawer.classList.toggle("active");
    overlay.classList.toggle("active");
}

// ==========================================
// ADD TO CART
// ==========================================

function addToCart(name, price, img) {

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: name,
            price: Number(price),
            img: img,
            quantity: 1
        });
    }

    updateCartUI();

    const drawer = document.querySelector(".cart-drawer");
    const overlay = document.querySelector(".drawer-overlay");

    if (drawer) drawer.classList.add("active");
    if (overlay) overlay.classList.add("active");
}

// ==========================================
// REMOVE FROM CART
// ==========================================

function removeFromCart(index) {

    if (index < 0 || index >= cart.length) return;

    cart.splice(index, 1);
    updateCartUI();
}

// ==========================================
// UPDATE CART
// ==========================================

function updateCartUI() {

    const container = document.querySelector(".cart-items");
    const count = document.querySelector(".cart-count");

    if (!container) return;

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    if (count) {
        count.textContent = totalItems;
    }

    if (cart.length === 0) {

        container.innerHTML = `
            <p class="text-center text-muted my-4">
                Your cart is empty.
            </p>
        `;

        return;
    }

    container.innerHTML = "";

    cart.forEach((item, index) => {

        const row = document.createElement("div");

        row.className =
            "cart-item d-flex align-items-center justify-content-between";

        row.innerHTML = `
            <div class="d-flex align-items-center gap-3">

                <img
                    src="${item.img}"
                    alt="${item.name}"
                    class="cart-item-img"
                >

                <div>
                    <h6 class="mb-1">
                        ${item.name}
                    </h6>

                    <small class="text-muted">
                        Rs. ${item.price} × ${item.quantity}
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

        container.appendChild(row);
    });
}

// ==========================================
// FILTER FOOD
// ==========================================

function filterFood(category) {

    const cards = document.querySelectorAll(".food-card");

    category = category.toLowerCase().trim();

    cards.forEach(card => {

        const badge = card.querySelector(".badge");

        if (!badge) return;

        const cardCategory =
            badge.textContent.toLowerCase().trim();

        if (
            category === "all" ||
            cardCategory === category
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

// ==========================================
// PAGE READY
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ======================================
    // NAVIGATION BUTTONS / LINKS
    // ======================================

    const navLinks =
        document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            navLinks.forEach(item =>
                item.classList.remove("active")
            );

            this.classList.add("active");
        });
    });


    // ======================================
    // CATEGORY BUTTONS
    // ======================================

    const categoryButtons =
        document.querySelectorAll(".category-card");

    categoryButtons.forEach(button => {

        button.addEventListener("click", function () {

            categoryButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            this.classList.add("active");

            filterFood(this.textContent);
        });
    });


    // ======================================
    // FILTER BUTTONS
    // ======================================

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            this.classList.add("active");

            filterFood(this.textContent);
        });
    });


    // ======================================
    // SEARCH
    // ======================================

    const searchInput =
        document.querySelector(".top-search input");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const search =
                this.value.toLowerCase().trim();

            const cards =
                document.querySelectorAll(".food-card");

            cards.forEach(card => {

                const name =
                    card.querySelector("h5")
                    ?.textContent
                    .toLowerCase() || "";

                const category =
                    card.querySelector(".badge")
                    ?.textContent
                    .toLowerCase() || "";

                if (
                    name.includes(search) ||
                    category.includes(search)
                ) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }


    // ======================================
    // ADD VENDOR
    // ======================================

    const vendorButton =
        document.querySelector(".vendor-btn");

    if (vendorButton) {

        vendorButton.addEventListener("click", function () {

            const name =
                prompt("Enter Vendor Name:");

            if (!name || !name.trim()) return;

            const vendors =
                document.querySelector("#vendors");

            if (!vendors) return;

            const card =
                document.createElement("div");

            card.className =
                "vendor-card mt-3";

            card.innerHTML = `
                <div class="d-flex align-items-center gap-3">

                    <div
                        class="avatar"
                        style="width:55px;height:55px;"
                    >
                        ${name.trim().charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h5 class="mb-1">
                            ${name.trim()}
                        </h5>

                        <span class="text-muted">
                            Local Food Vendor
                        </span>
                    </div>

                </div>
            `;

            vendors.appendChild(card);
        });
    }


    // ======================================
    // CHECKOUT
    // ======================================

    const checkoutButton =
        document.querySelector(".cart-drawer .primary-btn");

    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            function () {

                if (cart.length === 0) {

                    alert("Your cart is empty.");

                    return;
                }

                const total =
                    cart.reduce(
                        (sum, item) =>
                            sum +
                            item.price * item.quantity,
                        0
                    );

                alert(
                    "Order placed successfully!\n\n" +
                    "Total: Rs. " + total
                );

                cart = [];

                updateCartUI();

                const drawer =
                    document.querySelector(".cart-drawer");

                const overlay =
                    document.querySelector(".drawer-overlay");

                if (drawer)
                    drawer.classList.remove("active");

                if (overlay)
                    overlay.classList.remove("active");
            }
        );
    }


    // ======================================
    // LOGIN
    // ======================================

    const loginForm =
        document.getElementById("loginForm");

    const error =
        document.getElementById("login-error");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const email =
                    document
                    .getElementById("email")
                    .value
                    .trim();

                const password =
                    document
                    .getElementById("password")
                    .value;


                // Clear error
                if (error) {
                    error.style.display = "none";
                    error.textContent = "";
                }


                // ==================================
                // EMAIL VALIDATION
                // ==================================

                if (!email.includes("@")) {

                    showLoginError(
                        'Login failed: Email must contain "@".'
                    );

                    return;
                }


                if (!email.includes(".")) {

                    showLoginError(
                        'Login failed: Email must contain ".".'
                    );

                    return;
                }


                // ==================================
                // PASSWORD VALIDATION
                // ==================================

                if (password.length < 8) {

                    showLoginError(
                        "Login failed: Password must be at least 8 characters."
                    );

                    return;
                }


                // ==================================
                // SUCCESS
                // ==================================

                alert("Login Successful!");

                loginForm.reset();

                const modal =
                    document.getElementById("loginModal");

                if (modal && window.bootstrap) {

                    const instance =
                        bootstrap.Modal.getInstance(modal);

                    if (instance) {
                        instance.hide();
                    }
                }
            }
        );
    }


    // ======================================
    // LOGIN ERROR
    // ======================================

    function showLoginError(message) {

        if (error) {

            error.textContent = message;
            error.style.display = "block";

        } else {

            alert(message);
        }
    }


    // ======================================
    // INITIAL CART
    // ======================================

    updateCartUI();

});
