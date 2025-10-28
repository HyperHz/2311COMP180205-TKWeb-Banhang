const curUser = JSON.parse(localStorage.getItem('GL_currentUser') || 'null');
if (!curUser) location.href = 'login.html';

const products = JSON.parse(localStorage.getItem('GL_products') || '[]');
const ordersKey = 'GL_orders_' + curUser.id;
let orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');

const orderList = document.getElementById('orderList');
const orderDetail = document.getElementById('orderDetail');
const detailContent = document.getElementById('detailContent');
const btnBack = document.getElementById('btnBack');

renderOrders();

function renderOrders(){
    if (!orders.length){
        orderList.innerHTML = '<p class="text-muted text-center">Bạn chưa có đơn hàng nào.</p>';
        return;
    }

    orderList.innerHTML = orders.map(o=>`
        <div class="order-card" onclick="showDetail(${o.id})">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0">Mã đơn: ${o.id}</h6>
                <span class="status ${statusClass(o.status)}">${o.status}</span>
            </div>
            <p class="mb-0"><small>Ngày đặt: ${o.date}</small></p>
            <p class="mb-0"><small><b>${o.items.length}</b> sản phẩm | Tổng: ${calcTotal(o).toLocaleString()}₫</small></p>
        </div>
    `).join('');
}

function statusClass(s){
    if (s.includes('Xác')) return 'xacnhan';
    if (s.includes('Đang')) return 'danggiao';
    if (s.includes('Đã')) return 'danhan';
    return '';
}

function calcTotal(order){
    let total = 0;
    order.items.forEach(i=>{
        const p = products.find(x=>x.id===i.id);
        if (p) total += p.price * i.qty;
    });
    return total;
}

window.showDetail = function(id){
    const o = orders.find(x=>x.id===id);
    if (!o) return;
    orderList.classList.add('d-none');
    orderDetail.classList.remove('d-none');

    const total = calcTotal(o);
    const itemsHTML = o.items.map(i=>{
        const p = products.find(x=>x.id===i.id);
        return `
        <div class="item">
            <div class="d-flex align-items-center gap-2">
                <img src="${p.img}" alt="${p.name}">
                <div>
                    <p class="mb-0 fw-semibold">${p.name}</p>
                    <small>x${i.qty}</small>
                </div>
            </div>
            <p class="text-success fw-bold mb-0">${(p.price*i.qty).toLocaleString()}₫</p>
        </div>
        `;
    }).join('');

    detailContent.innerHTML = `
        <p><strong>Trạng thái:</strong> <span class="status ${statusClass(o.status)}">${o.status}</span></p>
        <p><strong>Tên người nhận:</strong> ${o.name}</p>
        <p><strong>Số điện thoại:</strong> ${o.phone}</p>
        <p><strong>Địa chỉ:</strong> ${o.address}</p>
        <p><strong>Ghi chú:</strong> ${o.note || '(Không có)'}</p>
        <hr>
        <div>${itemsHTML}</div>
        <p class="fw-bold mt-2">Tổng tiền: ${total.toLocaleString()}₫</p>
        ${o.status === 'Đã nhận hàng' ? `
        <button class="btn btn-outline-success mt-3" onclick="openReview(${o.id})">Đánh giá sản phẩm</button>
        ` : ''}
    `;
};

btnBack.addEventListener('click', ()=>{
    orderList.classList.remove('d-none');
    orderDetail.classList.add('d-none');
});

window.openReview = function(orderId){
    const order = orders.find(x=>x.id===orderId);
    if (!order) return;
    alert('✨ Khi đánh giá, bạn sẽ được chuyển đến từng trang sản phẩm để gửi đánh giá!');
    order.items.forEach(i=>{
        const p = products.find(x=>x.id===i.id);
        if (p) window.open(`product.html?id=${p.id}`, '_blank');
    });
};