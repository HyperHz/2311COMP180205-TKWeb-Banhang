const curUser = JSON.parse(localStorage.getItem('GL_currentUser') || 'null');
if (!curUser || !curUser.isAdmin) {
  	alert('❌ Chỉ quản trị viên mới có quyền truy cập trang này!');
  	location.href = 'index.html';
}

document.getElementById('logoutBtn').addEventListener('click', ()=>{
  	localStorage.removeItem('GL_currentUser');
  	location.href = 'index.html';
});

const table = document.getElementById('orderTable');
const products = JSON.parse(localStorage.getItem('GL_products') || '[]');
let allOrders = [];

function loadAllOrders() {
	allOrders = [];
	for (let key in localStorage) {
		if (key.startsWith('GL_orders_')) {
		const orders = JSON.parse(localStorage.getItem(key) || '[]');
		allOrders.push(...orders);
		}
	}
	renderOrders();
}

function calcTotal(items) {
	return items.reduce((sum, it) => {
		const p = products.find(pr => pr.id === it.id);
		return sum + (p ? p.price * it.qty : 0);
	}, 0);
}

function renderOrders() {
	if (!allOrders.length) {
		table.innerHTML = `<tr><td colspan="7" class="text-center text-muted">Không có đơn hàng nào</td></tr>`;
		return;
	}
	table.innerHTML = allOrders.map(o => {
		const total = calcTotal(o.items);
		return `
		<tr>
			<td>${o.id}</td>
			<td>${o.name}</td>
			<td>${o.date}</td>
			<td>${o.items.length}</td>
			<td>${total.toLocaleString()}₫</td>
			<td>
			<select class="form-select form-select-sm order-status" data-id="${o.id}" data-user="${o.userId}">
				<option ${o.status==='Xác nhận đơn'?'selected':''}>Xác nhận đơn</option>
				<option ${o.status==='Đang giao hàng'?'selected':''}>Đang giao hàng</option>
				<option ${o.status==='Đã nhận hàng'?'selected':''}>Đã nhận hàng</option>
			</select>
			</td>
			<td>
			<button class="btn btn-sm btn-outline-success view-detail" 
					data-id="${o.id}" data-user="${o.userId}">
				<i class="fa fa-eye"></i>
			</button>
			</td>
		</tr>
		`;
	}).join('');
}

table.addEventListener('change', e => {
	if (e.target.classList.contains('order-status')) {
		const orderId = +e.target.dataset.id;
		const userId = e.target.dataset.user;
		const newStatus = e.target.value;
		const key = 'GL_orders_' + userId;
		let orders = JSON.parse(localStorage.getItem(key) || '[]');
		const idx = orders.findIndex(o => o.id === orderId);
		if (idx !== -1) {
			orders[idx].status = newStatus;
			localStorage.setItem(key, JSON.stringify(orders));
			alert(`✅ Đã cập nhật trạng thái đơn #${orderId} thành "${newStatus}".`);
			if (newStatus === 'Đã nhận hàng') updateRevenue(orders[idx]);
		}
	}
});

function updateRevenue(order) {
	const total = calcTotal(order.items);
	let revenue = parseInt(localStorage.getItem('GL_revenue') || '0');
	revenue += total;
	localStorage.setItem('GL_revenue', revenue);
	let all = JSON.parse(localStorage.getItem('GL_orders') || '[]');
	const idx = all.findIndex(x => x.id === order.id && x.userId === order.userId);
	if (idx === -1) all.push(formatForRevenue(order));
	else all[idx] = formatForRevenue(order);
	localStorage.setItem('GL_orders', JSON.stringify(all));
}

function formatForRevenue(order) {
	const items = order.items.map(it => {
		const p = products.find(pr => pr.id === it.id);
		return {
		id: p.id,
		name: p.name,
		category: p.category,
		price: p.price,
		quantity: it.qty
		};
	});
	return {
		id: order.id,
		userId: order.userId,
		name: order.name,
		date: order.date,
		status: order.status,
		products: items,
		total: calcTotal(order.items)
	};
}

table.addEventListener('click', e => {
	if (e.target.closest('.view-detail')) {
		const btn = e.target.closest('.view-detail');
		const orderId = +btn.dataset.id;
		const userId = btn.dataset.user;
		const key = 'GL_orders_' + userId;
		const orders = JSON.parse(localStorage.getItem(key) || '[]');
		const order = orders.find(o => o.id === orderId);
		if (!order) return;
		const detail = order.items.map(i => {
		const p = products.find(x=>x.id===i.id);
		return `${p ? p.name : 'Sản phẩm'} × ${i.qty} `;
		}).join('\n');
		alert(`🧾 Đơn #${order.id}\nKhách: ${order.name}\nSản phẩm:\n${detail}\n\nTổng: ${calcTotal(order.items).toLocaleString()}₫`);
	}
});

loadAllOrders();
