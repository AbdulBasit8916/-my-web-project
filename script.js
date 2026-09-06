document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // VARIABLES
    // =========================

    let cart = [];

    const cartButton = document.getElementById("cartButton");
    const cartDrawer = document.getElementById("cartDrawer");
    const drawerOverlay = document.getElementById("drawerOverlay");
    const closeCart = document.getElementById("closeCart");

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.querySelector(".cart-count");

    const searchInput = document.getElementById("searchInput");
    const foodCards = document.querySelectorAll(".food-card");
    const noFood = document.getElementById("noFood");


    // =========================
    // CART OPEN / CLOSE
    // =========================

    cartButton.addEventListener("click", function () {
        cartDrawer.classList.add("open");
        drawerOverlay.classList.add("show");
    });

    closeCart.addEventListener("click", function () {
        cartDrawer.classList.remove("open");
        drawerOverlay.classList.remove("show");
    });

    drawerOverlay.addEventListener("click", function () {
        cartDrawer.classList.remove("open");
        drawerOverlay.classList.remove("show");
    });


    // =========================
    // ADD TO CART
    // =========================

    const addButtons = document.querySelectorAll(".add-btn");

    addButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name = button.dataset.name;
            const price = Number(button.dataset.price);
            const img = button.dataset.img;

            const existingItem = cart.find(function (item) {
                return item.name === name;
            });

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    img: img,
                    quantity: 1
                });
            }

            updateCart();

            // Open cart automatically
            cartDrawer.classList.add("open");
            drawerOverlay.classList.add("show");
        });

    });


    // =========================
    // UPDATE CART
    // =========================

    function updateCart() {

        cartItems.innerHTML = "";

        let total = 0;
        let totalQuantity = 0;

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="text-center p-4">
                    <i class="bi bi-cart-x"
                       style="font-size: 2rem; color: #ff5722;"></i>
                    <p class="mt-2">Your cart is empty.</p>
                </div>
            `;

        } else {

            cart.forEach(function (item, index) {

                total += item.price * item.quantity;
                totalQuantity += item.quantity;

                const cartItem = document.createElement("div");

                cartItem.className = "cart-item";

                cartItem.innerHTML = `
                    <div class="d-flex align-items-center gap-2 mb-3">

                        <img src="${item.img}"
                             alt="${item.name}"
                             style="
                                width:60px;
                                height:60px;
                                object-fit:cover;
                                border-radius:10px;
                             ">

                        <div style="flex:1;">
                            <strong>${item.name}</strong>

                            <div style="color:#ff5722;">
                                Rs. ${item.price}
                            </div>

                            <div class="d-flex align-items-center gap-2 mt-1">

                                <button
                                    class="btn btn-sm btn-outline-light decrease-btn"
                                    data-index="${index}">
                                    -
                                </button>

                                <span>${item.quantity}</span>

                                <button
                                    class="btn btn-sm btn-outline-light increase-btn"
                                    data-index="${index}">
                                    +
                                </button>

                            </div>
                        </div>

                        <button
                            class="btn btn-sm btn-danger remove-btn"
                            data-index="${index}">
                            <i class="bi bi-trash"></i>
                        </button>

                    </div>
                `;

                cartItems.appendChild(cartItem);
            });
        }

        cartTotal.textContent = `Rs. ${total}`;
        cartCount.textContent = totalQuantity;


        // =========================
        // INCREASE QUANTITY
        // =========================

        document.querySelectorAll(".increase-btn").forEach(function (button) {

            button.addEventListener("click", function () {

                const index = Number(button.dataset.index);

                cart[index].quantity++;

                updateCart();
            });

        });


        // =========================
        // DECREASE QUANTITY
        // =========================

        document.querySelectorAll(".decrease-btn").forEach(function (button) {

            button.addEventListener("click", function () {

                const index = Number(button.dataset.index);

                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }

                updateCart();
            });

        });


        // =========================
        // REMOVE ITEM
        // =========================

        document.querySelectorAll(".remove-btn").forEach(function (button) {

            button.addEventListener("click", function () {

                const index = Number(button.dataset.index);

                cart.splice(index, 1);

                updateCart();
            });

        });

    }


    // =========================
    // CATEGORY FILTER
    // =========================

    const categoryButtons = document.querySelectorAll(
        ".category-card, .filter-btn"
    );

    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const category = button.dataset.category;

            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            document
                .querySelectorAll(`[data-category="${category}"]`)
                .forEach(function (btn) {
                    btn.classList.add("active");
                });

            filterFood(category);
        });

    });


    function filterFood(category) {

        let found = false;

        foodCards.forEach(function (card) {

            const cardCategory = card.dataset.category;

            if (category === "All" || cardCategory === category) {

                card.style.display = "";

                found = true;

            } else {

                card.style.display = "none";
            }

        });

        noFood.style.display = found ? "none" : "block";
    }


    // =========================
    // SEARCH FOOD
    // =========================

    searchInput.addEventListener("input", function () {

        const searchText = searchInput.value
            .toLowerCase()
            .trim();

        let found = false;

        foodCards.forEach(function (card) {

            const name = card.dataset.name.toLowerCase();
            const category = card.dataset.category.toLowerCase();

            if (
                name.includes(searchText) ||
                category.includes(searchText)
            ) {

                card.style.display = "";

                found = true;

            } else {

                card.style.display = "none";
            }

        });

        noFood.style.display = found ? "none" : "block";
    });


    // =========================
    // LOGIN
    // =========================

    const loginForm = document.getElementById("loginForm");
    const loginError = document.getElementById("login-error");

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        loginError.textContent = "";

        if (password.length < 8) {

            loginError.textContent =
                "Password must be at least 8 characters.";

            return;
        }

        if (!email.includes("@")) {

            loginError.textContent =
                "Please enter a valid email address.";

            return;
        }

        loginError.style.color = "#2e7d32";
        loginError.textContent = "Login successful!";

        setTimeout(function () {

            const modalElement =
                document.getElementById("loginModal");

            const modal =
                bootstrap.Modal.getInstance(modalElement);

            if (modal) {
                modal.hide();
            }

            loginForm.reset();
            loginError.textContent = "";

        }, 1200);

    });


    // =========================
    // ADD VENDOR
    // =========================

    const vendorForm = document.getElementById("vendorForm");
    const vendorGrid = document.getElementById("vendorGrid");
    const vendorError = document.getElementById("vendor-error");

    vendorForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const vendorName =
            document.getElementById("vendorName").value.trim();

        const vendorType =
            document.getElementById("vendorType").value;

        const vendorPhone =
            document.getElementById("vendorPhone").value.trim();

        vendorError.textContent = "";

        if (vendorName.length < 3) {

            vendorError.textContent =
                "Vendor name must be at least 3 characters.";

            return;
        }

        if (vendorPhone.length < 10) {

            vendorError.textContent =
                "Please enter a valid phone number.";

            return;
        }


        // Create new vendor card

        const newVendor = document.createElement("div");

        newVendor.className = "vendor-card";

        newVendor.innerHTML = `

            <div class="vendor-image">

                <img
                    src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=700&q=85"
                    alt="${vendorName}"
                >

            </div>

            <div class="vendor-content">

                <span class="vendor-tag">
                    ${vendorType}
                </span>

                <h4>${vendorName}</h4>

                <p>
                    New Food Vendor
                </p>

                <button
                    type="button"
                    class="outline-btn vendor-view-btn">

                    View Menu

                </button>

            </div>
        `;

        vendorGrid.appendChild(newVendor);


        // Close modal

        const modalElement =
            document.getElementById("vendorModal");

        const modal =
            bootstrap.Modal.getInstance(modalElement);

        if (modal) {
            modal.hide();
        }


        vendorForm.reset();

        alert(`${vendorName} has been added successfully!`);

        attachVendorButtons();
    });


    // =========================
    // VENDOR VIEW MENU
    // =========================

    function attachVendorButtons() {

        document
            .querySelectorAll(".vendor-view-btn")
            .forEach(function (button) {

                button.onclick = function () {

                    const card =
                        button.closest(".vendor-card");

                    const name =
                        card.querySelector("h4").textContent;

                    const type =
                        card.querySelector(".vendor-tag").textContent;


                    document.getElementById("vendorInfoTitle")
                        .textContent = name;

                    document.getElementById("vendorInfoName")
                        .textContent = name;

                    document.getElementById("vendorInfoType")
                        .textContent =
                        `${type} vendor — Menu coming soon!`;


                    const modalElement =
                        document.getElementById("vendorInfoModal");

                    const modal =
                        new bootstrap.Modal(modalElement);

                    modal.show();
                };

            });
    }

    attachVendorButtons();


    // =========================
    // CHECKOUT
    // =========================

    const checkoutBtn =
        document.getElementById("checkoutBtn");

    checkoutBtn.addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;
        }

        let total = 0;

        cart.forEach(function (item) {
            total += item.price * item.quantity;
        });

        alert(
            `Order placed successfully! 🎉\n\nTotal: Rs. ${total}`
        );

        cart = [];

        updateCart();

        cartDrawer.classList.remove("open");
        drawerOverlay.classList.remove("show");
    });


    // =========================
    // NAVIGATION ACTIVE STATE
    // =========================

    const navLinks =
        document.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.forEach(function (nav) {
                nav.classList.remove("active");
            });

            link.classList.add("active");
        });

    });


    // =========================
    // INITIAL CART
    // =========================

    updateCart();

});
