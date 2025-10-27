// js/cart.js
// Quản lý giỏ hàng: hiển thị, chọn, tính tổng, thanh toán

const curUser = JSON.parse(localStorage.getItem('GL_currentUser') || 'null');
if (!curUser) location.href = 'login.html';

const products = JSON.parse(localStorage.getItem('GL_products') || '[]');
const key = 'GL_cart_' + curUser.id;
let cart = JSON.parse(localStorage.getItem(key) || '[]');

const cartList = document.getElementById('cartList');
const countSelected = document.getElementById('countSelected');
const totalPrice = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');

// render giỏ hàng
function renderCart(){
    if (!cart.length){
        cartList.innerHTML = '<p class="text-muted text-center">Giỏ hàng trống.</p>';
        document.getElementById('cartSummary').classList.add('d-none');
        return;
    }

    cartList.innerHTML = cart.map(item=>{
        const p = products.find(x=>x.id===item.id);
        if (!p) return '';
        return `
        <div class="cart-item">
            <div class="cart-left">
            <input type="checkbox" class="form-check-input me-2" onchange="calcTotal()">
            <img src="2311COMP180205-TKWeb-Banhang/${p.img}" alt="${p.name}">
            <div>
                <p class="cart-name mb-1">${p.name}</p>
                <p class="cart-price mb-0">${p.price.toLocaleString()}₫</p>
            </div>
            </div>
            <div>
            <input type="number" min="1" value="${item.qty}" class="form-control qty-input" onchange="updateQty(${p.id}, this.value)">
            </div>
        </div>
        `;
    }).join('');
}
renderCart();

// cập nhật số lượng
window.updateQty = function(id, val){
    val = parseInt(val);
    if (val < 1) val = 1;
    const i = cart.find(x=>x.id===id);
    if (i) i.qty = val;
    localStorage.setItem(key, JSON.stringify(cart));
    calcTotal();
};

// tính tổng
function calcTotal(){
    const boxes = cartList.querySelectorAll('input[type="checkbox"]');
    let total = 0, count = 0;
    boxes.forEach((box, idx)=>{
        if (box.checked){
        const item = cart[idx];
        const p = products.find(x=>x.id===item.id);
        total += p.price * item.qty;
        count++;
        }
    });
    countSelected.textContent = count;
    totalPrice.textContent = total.toLocaleString() + '₫';
}

// xử lý thanh toán
checkoutBtn.addEventListener('click', ()=>{
    const boxes = cartList.querySelectorAll('input[type="checkbox"]');
    const selected = [];
    boxes.forEach((box, idx)=>{
        if (box.checked) selected.push(cart[idx]);
    });
    if (!selected.length){
        alert('Vui lòng chọn sản phẩm để thanh toán!');
        return;
    }

    // lưu danh sách chọn tạm vào localStorage để checkout
    localStorage.setItem('GL_checkout_' + curUser.id, JSON.stringify(selected));
    location.href = 'checkout.html';
});
