// Hàm lấy dữ liệu từ localStorage
function loadCartItems() {
    let cartItems = JSON.parse(localStorage.getItem("courses")) || [];
    let cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = ""; // Xóa nội dung cũ

    if (cartItems.length === 0) {
        // Nếu giỏ hàng trống, hiển thị thông báo
        cartContainer.innerHTML = `<p style="text-align: center; font-size: 24px; color: #666;height: 250px;">Your cart is empty</p>`;
        document.getElementById("subtotal").innerText = "$0.00"; // Đặt tổng tiền về 0
        return; // Kết thúc hàm
    }

    let subtotal = 0;

    cartItems.forEach((item, index) => {
        // Tính thành tiền cho từng sản phẩm
        let itemTotal = parseFloat(item.price.replace('$', '')) * item.quantity;

        // Tạo phần tử HTML cho mỗi mục trong giỏ hàng
        let cartItemHTML = `
            <div class="cart-item" style="display: flex; align-items: center; margin-bottom: 20px;">
                <img src="${item.image}" alt="${item.name}" style="width: 100px; margin-left: 30px;">
                <div class="cart-item-info" style="flex-grow: 1; margin-left: 20px;">
                    <div class="cart-item-title" style="font-size: 18px; font-weight: bold;">${item.name}</div>
                    <div class="cart-item-price" id="item-price-${index}">${item.price}</div>
                </div>
                <div class="quantity" style="display: flex; align-items: center;">
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <span id="quantity-${index}" style="padding: 12px 20px;border: 1px solid rgb(154, 145, 145);">${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>
                <div class="cart-item-total" id="item-total-${index}" style="margin-left: 20px;">$${itemTotal.toFixed(2)}</div>
                <div class="cart-item-remove" onclick="removeItem(${index})" style="cursor: pointer;">&times;</div>
            </div>
        `;

        // Thêm vào giỏ hàng
        cartContainer.innerHTML += cartItemHTML;

        // Tính tổng tiền tạm tính
        subtotal += itemTotal;
    });

    // Hiển thị tổng tiền tạm tính
    document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
}

// Tăng số lượng mục
function increaseQuantity(index) {
    let cartItems = JSON.parse(localStorage.getItem("courses")) || [];
    cartItems[index].quantity++;
    localStorage.setItem("courses", JSON.stringify(cartItems));
    updateCartItem(index); // Cập nhật lại thành tiền của sản phẩm và tổng
}

// Giảm số lượng mục
function decreaseQuantity(index) {
    let cartItems = JSON.parse(localStorage.getItem("courses")) || [];
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        localStorage.setItem("courses", JSON.stringify(cartItems));
        updateCartItem(index); // Cập nhật lại thành tiền của sản phẩm và tổng
    }
}

// Xóa mục khỏi giỏ hàng
function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem("courses")) || [];
    cartItems.splice(index, 1); // Xóa mục
    localStorage.setItem("courses", JSON.stringify(cartItems));
    loadCartItems(); // Cập nhật lại giao diện
}

// Cập nhật lại thành tiền của sản phẩm và tổng tiền tạm tính
function updateCartItem(index) {
    let cartItems = JSON.parse(localStorage.getItem("courses")) || [];
    let item = cartItems[index];
    
    // Tính thành tiền cho sản phẩm hiện tại
    let itemTotal = parseFloat(item.price.replace('$', '')) * item.quantity;

    // Cập nhật số lượng và thành tiền trên giao diện
    document.getElementById(`quantity-${index}`).innerText = item.quantity;
    document.getElementById(`item-total-${index}`).innerText = `$${itemTotal.toFixed(2)}`;
    
    // Cập nhật tổng tiền tạm tính
    let subtotal = 0;
    cartItems.forEach(item => {
        subtotal += parseFloat(item.price.replace('$', '')) * item.quantity;
    });
    document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
}

// Gọi hàm loadCartItems khi trang được tải
window.onload = function() {
    loadCartItems();
};


// Hàm chuyển tới trang checkout
function proceedToCheckout() {
    window.location.href = "CheckOutPage.html"; // Chuyển đến trang checkout
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('courses')) || [];
    cart.splice(index, 1);
    localStorage.setItem('courses', JSON.stringify(cart));
    loadCartItems();
}

// Hàm tăng số lượng
function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('courses')) || [];
    cart[index].quantity += 1;
    cart[index].total = cart[index].quantity * parseFloat(cart[index].price.replace('$', ''));
    localStorage.setItem('courses', JSON.stringify(cart));
    loadCartItems();
}

// Hàm giảm số lượng
function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('courses')) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        cart[index].total = cart[index].quantity * parseFloat(cart[index].price.replace('$', ''));
        localStorage.setItem('courses', JSON.stringify(cart));
        loadCartItems();
    }
}
