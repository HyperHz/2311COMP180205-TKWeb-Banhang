const products = JSON.parse(localStorage.getItem('GL_products') || '[]');

let allOrders = [];
for (let key in localStorage) {
    if (key.startsWith('GL_orders_')) {
        const orders = JSON.parse(localStorage.getItem(key) || '[]');
        allOrders.push(...orders);
    }
}

const doneOrders = allOrders.filter(o => o.status === 'Đã nhận hàng');

function calcTotal(items) {
    return items.reduce((sum, it) => {
        const p = products.find(pr => pr.id === it.id);
        return sum + (p ? p.price * it.qty : 0);
    }, 0);
}

const totalRevenue = doneOrders.reduce((sum, o) => sum + calcTotal(o.items), 0);
document.getElementById('totalRevenue').textContent = totalRevenue.toLocaleString() + '₫';

const revenueByCat = {
    'Chậu cây cảnh': 0,
    'Cây để bàn': 0,
    'Cây thủy sinh': 0
};

const soldProducts = {};

doneOrders.forEach(order => {
    order.items.forEach(it => {
        const p = products.find(x => x.id === it.id);
        if (!p) return;

        const cat =
        p.category === 'chau-cay-canh' ? 'Chậu cây cảnh' :
        p.category === 'cay-de-ban' ? 'Cây để bàn' :
        p.category === 'cay-thuy-sinh' ? 'Cây thủy sinh' : 'Khác';

        const subtotal = p.price * it.qty;

        if (revenueByCat[cat] !== undefined) revenueByCat[cat] += subtotal;

        if (!soldProducts[p.id]) {
            soldProducts[p.id] = {
                name: p.name,
                category: cat,
                price: p.price,
                qty: it.qty
            };
        } else {
            soldProducts[p.id].qty += it.qty;
        }
    });
});

const tbody = document.getElementById('productTable');
if (!Object.keys(soldProducts).length) {
  tbody.innerHTML = `<tr><td colspan="6" class="text-muted">Chưa có sản phẩm nào được bán.</td></tr>`;
} else {
  let i = 1;
  tbody.innerHTML = Object.values(soldProducts).map(p => `
    <tr>
      <td>${i++}</td>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>${p.price.toLocaleString()}₫</td>
      <td>${p.qty}</td>
      <td>${(p.price * p.qty).toLocaleString()}₫</td>
    </tr>
  `).join('');
}

const ctx = document.getElementById('revenueChart');
new Chart(ctx, {
    type: 'pie',
    data: {
        labels: Object.keys(revenueByCat),
        datasets: [{
        data: Object.values(revenueByCat),
        backgroundColor: ['#6bbf59', '#bfa25f', '#69c7c1']
        }]
    },
    options: {
        responsive: true,
        plugins: {
        legend: { position: 'bottom' },
        title: { display: true, text: 'Tỷ lệ doanh thu theo loại cây' }
        }
    }
});
