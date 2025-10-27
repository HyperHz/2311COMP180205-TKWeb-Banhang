
// Hiển thị danh sách sản phẩm và xác nhận đơn hàng
const curUser = JSON.parse(localStorage.getItem('GL_currentUser') || 'null');
if (!curUser) location.href = 'login.html';

const products = JSON.parse(localStorage.getItem('GL_products') || '[]');
const checkoutKey = 'GL_checkout_' + curUser.id;
const cartKey = 'GL_cart_' + curUser.id;
let selected = JSON.parse(localStorage.getItem(checkoutKey) || '[]');

const listDiv = document.getElementById('checkoutList');
const totalPriceEl = document.getElementById('totalPrice');

// render sản phẩm
function renderCheckout() {
  if (!selected.length) {
    listDiv.innerHTML = '<p class="text-muted">Không có sản phẩm nào để thanh toán.</p>';
    return;
  }
  let total = 0;
  listDiv.innerHTML = selected
    .map((i) => {
      const p = products.find((x) => x.id === i.id);
      total += p.price * i.qty;
      return `
        <div class="item">
            <div class="d-flex align-items-center gap-2">
              <img src="2311COMP180205-TKWeb-Banhang/${p.img}" alt="${p.name}">
              <div>
                  <p class="mb-0 fw-semibold">${p.name}</p>
                  <small>x${i.qty}</small>
              </div>
            </div>
            <p class="text-success fw-bold mb-0">${(p.price * i.qty).toLocaleString()}₫</p>
        </div>
      `;
    })
    .join('');
  totalPriceEl.textContent = total.toLocaleString() + '₫';
}
renderCheckout();

// xử lý đặt hàng
document.getElementById('btnConfirm').addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const note = document.getElementById('note').value.trim();

  if (!name || !phone || !address) {
    alert('Vui lòng nhập đầy đủ thông tin giao hàng!');
    return;
  }

  const order = {
    id: Date.now(),
    userId: curUser.id,
    name,
    phone,
    address,
    note,
    items: selected,
    status: 'Xác nhận đơn',
    date: new Date().toLocaleString(),
  };

  // === 1️⃣ Lưu vào đơn hàng người dùng ===
  const orderKey = 'GL_orders_' + curUser.id;
  let userOrders = JSON.parse(localStorage.getItem(orderKey) || '[]');
  userOrders.push(order);
  localStorage.setItem(orderKey, JSON.stringify(userOrders));

  // === 2️⃣ Lưu vào danh sách đơn hàng admin ===
  let adminOrders = JSON.parse(localStorage.getItem('GL_orders') || '[]');
  adminOrders.push({
    ...order,
    total: selected.reduce((sum, i) => {
      const p = products.find((x) => x.id === i.id);
      return sum + (p ? p.price * i.qty : 0);
    }, 0),
  });
  localStorage.setItem('GL_orders', JSON.stringify(adminOrders));

  // === 3️⃣ Xóa các món đã thanh toán khỏi giỏ hàng ===
  let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
  cart = cart.filter((c) => !selected.find((s) => s.id === c.id));
  localStorage.setItem(cartKey, JSON.stringify(cart));

  // === 4️⃣ Xóa dữ liệu checkout tạm ===
  localStorage.removeItem(checkoutKey);

  alert('✅ Đặt hàng thành công! Đơn hàng đã được lưu vào quản lý đơn hàng.');
  location.href = 'orders.html';
});
