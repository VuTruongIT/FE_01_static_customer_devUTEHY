// Hàm hiển thị khóa học từ localStorage vào trang checkout
function loadCheckoutItems() {
    let cart = JSON.parse(localStorage.getItem('courses')) || [];
    let checkoutContainer = document.getElementById("order-summary");
    checkoutContainer.innerHTML = ""; // Xóa nội dung cũ

    if (cart.length === 0) {
        checkoutContainer.innerHTML = `<p style="text-align: center; font-size: 24px; color: #666;">Your cart is empty</p>`;
        document.getElementById("total-amount").innerText = `Tổng cộng: $0.00`;
        return;
    }

    let totalAmount = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.quantity * parseFloat(item.price.replace('$', ''));
        totalAmount += itemTotal;

        let itemHTML = `
            <div class="item">
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name}</span>
                <span class="price">$${itemTotal.toFixed(2)}</span>
            </div>
        `;

        checkoutContainer.innerHTML += itemHTML;
    });

    document.getElementById("total-amount").innerText = `Tổng cộng: $${totalAmount.toFixed(2)}`;
}

// Hàm kiểm tra thông tin nhập liệu
function validateForm() {
    const email = document.getElementById("email").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;
    const nameOnCard = document.getElementById("name-on-card").value;

    // Regex để kiểm tra định dạng thẻ tín dụng, ngày hết hạn và CVV
    const cardNumberRegex = /^[0-9]{13,16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY
    const cvvRegex = /^[0-9]{3,4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Vui lòng nhập địa chỉ email hợp lệ.");
        return false;
    }

    if (!cardNumberRegex.test(cardNumber)) {
        alert("Số thẻ tín dụng không hợp lệ. Vui lòng nhập từ 13 đến 16 số.");
        return false;
    }

    if (!expiryDateRegex.test(expiryDate)) {
        alert("Ngày hết hạn không hợp lệ. Vui lòng nhập đúng định dạng MM/YY.");
        return false;
    }

    if (!cvvRegex.test(cvv)) {
        alert("CVV không hợp lệ. Vui lòng nhập từ 3 đến 4 số.");
        return false;
    }

    if (nameOnCard.trim() === "") {
        alert("Vui lòng nhập tên trên thẻ.");
        return false;
    }

    return true;
}

// Hàm xử lý thanh toán
function handlePayment(event) {
    event.preventDefault(); // Ngăn không cho form reload trang

    // Kiểm tra định dạng form
    if (!validateForm()) {
        return;
    }

    // Xóa dữ liệu giỏ hàng sau khi thanh toán thành công
    localStorage.removeItem('courses');

    // Điều hướng về trang CoursePages.html
    window.location.href = "CoursePages.html";
}

// Gọi hàm loadCheckoutItems khi trang được tải
window.onload = function() {
    loadCheckoutItems();

    // Thêm sự kiện submit vào form
    document.getElementById("checkout-form").addEventListener("submit", handlePayment);
};