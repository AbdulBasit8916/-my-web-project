// ==========================================
// ADD VENDOR
// ==========================================

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

    const vendorAddress =
        document.getElementById("vendorAddress").value.trim();

    const vendorBio =
        document.getElementById("vendorBio").value.trim();


    vendorError.textContent = "";


    // Validation
    if (vendorName.length < 3) {

        vendorError.textContent =
            "Vendor name must be at least 3 characters.";

        return;
    }


    if (vendorType === "") {

        vendorError.textContent =
            "Please select a food type.";

        return;
    }


    if (vendorPhone.length < 10) {

        vendorError.textContent =
            "Please enter a valid phone number.";

        return;
    }


    if (vendorAddress.length < 5) {

        vendorError.textContent =
            "Please enter a valid address.";

        return;
    }


    if (vendorBio.length < 10) {

        vendorError.textContent =
            "Vendor bio must be at least 10 characters.";

        return;
    }


    // ==========================================
    // CREATE VENDOR CARD
    // ==========================================

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
                class="outline-btn vendor-view-btn">

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
        bootstrap.Modal.getInstance(vendorModalElement);

    if (vendorModal) {
        vendorModal.hide();
    }


    // Reset form
    vendorForm.reset();


    // Attach View Menu button
    attachVendorButtons();

});
