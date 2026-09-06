document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // CART
    // ==========================================

    let cart = [];

    const cartButton = document.getElementById("cartButton");
    const cartDrawer = document.getElementById("cartDrawer");
    const drawerOverlay = document.getElementById("drawerOverlay");
    const closeCart = document.getElementById("closeCart");

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.querySelector(".cart-count");

    const checkoutBtn = document.getElementById("checkoutBtn");


    // ==========================================
    // OPEN CART
    // ==========================================

    cartButton.addEventListener("click", function () {

        cartDrawer.classList.add("open");
        drawerOverlay.classList.add("show");

    });


    // ==========================================
    // CLOSE CART
    // ==========================================

    closeCart.addEventListener("click", function () {

        cartDrawer.classList.remove("open");
        drawerOverlay.classList.remove("show");

    });


    drawerOverlay.addEventListener("click", function () {

        cartDrawer.classList.remove("open");
        drawerOverlay.classList.remove("show");

    });


    // ==========================================
    // ADD FOOD TO CART
    // ==========================================

    const addButtons = document.querySelectorAll(".add-btn");

    addButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name = button.getAttribute("data-name");
            const price = Number(button.getAttribute("data-price"));
            const img = button.getAttribute("data-img");

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

            cartDrawer.classList.add("open");
            drawerOverlay.classList.add("show");

        });

    });


    // ==========================================
    // UPDATE CART
    // ==========================================

    function updateCart() {

        cartItems.innerHTML = "";

        let total = 0;
        let quantity = 0;


        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div style="
                    text-align:center;
                    padding:30px 10px;
                    color:#999;
                ">

                    <i class="bi bi-cart-x"
                       style="
                       font-size:42px;
                       color:#ff5722;
                       ">
                    </i>

                    <p style="margin-top:10px;">
                        Your cart is empty.
                    </p>

                </div>
            `;

        }


        cart.forEach(function (item, index) {

            total += item.price * item.quantity;
            quantity += item.quantity;


            const cartItem = document.createElement("div");

            cartItem.style.marginBottom = "20px";


            cartItem.innerHTML = `

                <div style="
                    display:flex;
                    align-items:center;
                    gap:12px;
                ">

                    <img
                        src="${item.img}"
                        alt="${item.name}"
                        style="
                            width:60px;
                            height:60px;
                            object-fit:cover;
                            border-radius:10px;
                        "
                    >


                    <div style="flex:1;">

                        <strong>
                            ${item.name}
                        </strong>

                        <div style="
                            color:#ff5722;
                            margin-top:3px;
                        ">
                            Rs. ${item.price}
                        </div>


                        <div style="
                            display:flex;
                            align-items:center;
                            gap:8px;
                            margin-top:7px;
                        ">

                            <button
                                type="button"
                                class="decrease-btn"
                                data-index="${index}"
                                style="
                                    width:28px;
                                    height:28px;
                                    border:1px solid #444;
                                    background:#222;
                                    color:white;
                                    border-radius:6px;
                                    cursor:pointer;
                                "
                            >
                                -
                            </button>


                            <span>
                                ${item.quantity}
                            </span>


                            <button
                                type="button"
                                class="increase-btn"
                                data-index="${index}"
                                style="
                                    width:28px;
                                    height:28px;
                                    border:1px solid #444;
                                    background:#222;
                                    color:white;
                                    border-radius:6px;
                                    cursor:pointer;
                                "
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="remove-btn"
                        data-index="${index}"
                        style="
                            border:none;
                            background:transparent;
                            color:#ff5722;
                            font-size:18px;
                            cursor:pointer;
                        "
                    >

                        <i class="bi bi-trash"></i>

                    </button>

                </div>
            `;


            cartItems.appendChild(cartItem);

        });


        cartTotal.textContent = `Rs. ${total}`;
        cartCount.textContent = quantity;


        // ==========================================
        // INCREASE
        // ==========================================

        document.querySelectorAll(".increase-btn").forEach(function (button) {

            button.addEventListener("click", function () {

                const index = Number(button.dataset.index);

                cart[index].quantity++;

                updateCart();

            });

        });


        // ==========================================
        // DECREASE
        // ==========================================

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


        // ==========================================
        // REMOVE
        // ==========================================

        document.querySelectorAll(".remove-btn").forEach(function (button) {

            button.addEventListener("click", function () {

                const index = Number(button.dataset.index);

                cart.splice(index, 1);

                updateCart();

            });

        });

    }


    // ==========================================
    // FOOD CATEGORY FILTER
    // ==========================================

    const categoryButtons =
        document.querySelectorAll(".category-card");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const foodCards =
        document.querySelectorAll(".food-card");

    const noFood =
        document.getElementById("noFood");


    function setActiveCategory(category) {

        // Category buttons
        categoryButtons.forEach(function (button) {

            button.classList.remove("active");

            if (
                button.getAttribute("data-category") === category
            ) {
                button.classList.add("active");
            }

        });


        // Menu filter buttons
        filterButtons.forEach(function (button) {

            button.classList.remove("active");

            if (
                button.getAttribute("data-category") === category
            ) {
                button.classList.add("active");
            }

        });


        // Show food
        let found = false;


        foodCards.forEach(function (card) {

            const cardCategory =
                card.getAttribute("data-category");


            if (
                category === "All" ||
                cardCategory === category
            ) {

                card.style.display = "";

                found = true;

            } else {

                card.style.display = "none";

            }

        });


        if (found) {

            noFood.style.display = "none";

        } else {

            noFood.style.display = "block";

        }


        // ==========================================
        // IMPORTANT:
        // REMOVE IMAGE ZOOM AFTER FILTERING
        // ==========================================

        document.querySelectorAll(".food-img").forEach(function (img) {

            img.style.transform = "scale(1)";

        });

    }


    // ==========================================
    // CATEGORY CLICK
    // ==========================================

    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const category =
                button.getAttribute("data-category");

            setActiveCategory(category);

        });

    });


    // ==========================================
    // MENU FILTER CLICK
    // ==========================================

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const category =
                button.getAttribute("data-category");

            setActiveCategory(category);

        });

    });


    // ==========================================
    // SEARCH
    // ==========================================

    const searchInput =
        document.getElementById("searchInput");


    searchInput.addEventListener("input", function () {

        const search =
            searchInput.value
                .toLowerCase()
                .trim();


        let found = false;


        foodCards.forEach(function (card) {

            const name =
                card.getAttribute("data-name")
                    .toLowerCase();

            const category =
                card.getAttribute("data-category")
                    .toLowerCase();


            if (
                name.includes(search) ||
                category.includes(search)
            ) {

                card.style.display = "";

                found = true;

            } else {

                card.style.display = "none";

            }

        });


        if (found) {

            noFood.style.display = "none";

        } else {

            noFood.style.display = "block";

        }


        // Stop zoom
        document.querySelectorAll(".food-img").forEach(function (img) {

            img.style.transform = "scale(1)";

        });

    });


    // ==========================================
    // LOGIN
    // ==========================================

    const loginForm =
        document.getElementById("loginForm");

    const loginError =
        document.getElementById("login-error");


    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("email")
                .value
                .trim();

        const password =
            document.getElementById("password")
                .value;


        loginError.textContent = "";
        loginError.style.color = "";


        if (!email.includes("@")) {

            loginError.textContent =
                "Please enter a valid email address.";

            return;

        }


        if (password.length < 8) {

            loginError.textContent =
                "Password must be at least 8 characters.";

            return;

        }


        loginError.style.color = "#4caf50";

        loginError.textContent =
            "Login successful!";


        setTimeout(function () {

            const modalElement =
                document.getElementById("loginModal");

            const modal =
                bootstrap.Modal.getInstance(
                    modalElement
                );


            if (modal) {
                modal.hide();
            }


            loginForm.reset();

            loginError.textContent = "";

        }, 1200);

    });


    // ==========================================
    // ADD VENDOR
    // ==========================================

    const vendorForm =
        document.getElementById("vendorForm");

    const vendorGrid =
        document.getElementById("vendorGrid");

    const vendorError =
        document.getElementById("vendor-error");


    vendorForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const vendorName =
            document.getElementById("vendorName")
                .value
                .trim();


        const vendorType =
            document.getElementById("vendorType")
                .value;


        const vendorPhone =
            document.getElementById("vendorPhone")
                .value
                .trim();


        const vendorAddress =
            document.getElementById("vendorAddress")
                .value
                .trim();


        const vendorBio =
            document.getElementById("vendorBio")
                .value
                .trim();


        vendorError.textContent = "";


        // Vendor Name
        if (vendorName.length < 3) {

            vendorError.textContent =
                "Vendor name must be at least 3 characters.";

            return;

        }


        // Food Type
        if (vendorType === "") {

            vendorError.textContent =
                "Please select a food type.";

            return;

        }


        // Phone
        if (vendorPhone.length < 10) {

            vendorError.textContent =
                "Please enter a valid phone number.";

            return;

        }


        // Address
        if (vendorAddress.length < 5) {

            vendorError.textContent =
                "Please enter a valid address.";

            return;

        }


        // Bio
        if (vendorBio.length < 10) {

            vendorError.textContent =
                "Vendor bio must be at least 10 characters.";

            return;

        }


        // ==========================================
        // CREATE VENDOR
        // ==========================================

        const newVendor =
            document.createElement("div");

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


                <h4>
                    ${vendorName}
                </h4>


                <p>
                    <i class="bi bi-geo-alt"></i>
                    ${vendorAddress}
                </p>


                <p>
                    ${vendorBio}
                </p>


                <p>
                    <i class="bi bi-telephone"></i>
                    ${vendorPhone}
                </p>


                <button
                    type="button"
                    class="outline-btn vendor-view-btn"
                >
                    View Menu
                </button>

            </div>
        `;


        vendorGrid.appendChild(newVendor);


        // ==========================================
        // CLOSE MODAL
        // ==========================================

        const vendorModalElement =
            document.getElementById("vendorModal");


        const vendorModal =
            bootstrap.Modal.getInstance(
                vendorModalElement
            );


        if (vendorModal) {
            vendorModal.hide();
        }


        vendorForm.reset();

        attachVendorButtons();

    });


    // ==========================================
    // VENDOR VIEW MENU
    // ==========================================

    function attachVendorButtons() {

        document
            .querySelectorAll(".vendor-view-btn")
            .forEach(function (button) {

                button.onclick = function () {

                    const card =
                        button.closest(".vendor-card");


                    const name =
                        card.querySelector("h4")
                            .textContent
                            .trim();


                    const type =
                        card.querySelector(".vendor-tag")
                            .textContent
                            .trim();


                    document.getElementById(
                        "vendorInfoTitle"
                    ).textContent = name;


                    document.getElementById(
                        "vendorInfoName"
                    ).textContent = name;


                    document.getElementById(
                        "vendorInfoType"
                    ).textContent =
                        `${type} vendor — Menu coming soon!`;


                    const infoModal =
                        new bootstrap.Modal(
                            document.getElementById(
                                "vendorInfoModal"
                            )
                        );


                    infoModal.show();

                };

            });

    }


    attachVendorButtons();


    // ==========================================
    // CHECKOUT
    // ==========================================

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
            "Order placed successfully!\n\n" +
            "Total: Rs. " + total
        );


        cart = [];

        updateCart();


        cartDrawer.classList.remove("open");
        drawerOverlay.classList.remove("show");

    });


    // ==========================================
    // NAVIGATION
    // ==========================================

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


    // ==========================================
    // INITIALIZE
    // ==========================================

    updateCart();

});
