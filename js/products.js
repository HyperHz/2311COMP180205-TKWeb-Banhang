const products = JSON.parse(localStorage.getItem('GL_products') || '[]');
const url = new URLSearchParams(location.search);
const cat = url.get('cat');
const search = url.get('search');
const productList = document.getElementById('productList');
const catTitle = document.getElementById('catTitle');

function renderList(list){
    if (!list.length){
        productList.innerHTML = '<p class="text-center text-muted">Không tìm thấy sản phẩm nào.</p>';
        return;
    }

    productList.innerHTML = list.map(p => `
        <div class="col-12 col-sm-6 col-md-4 mb-4">
            <div class="card card-plant h-100">
                <img src="${p.img}" alt="${p.name}">
                <div class="card-body d-flex flex-column">
                    <h5>${p.name}</h5>
                    <p class="price mb-3">${p.price.toLocaleString()}₫</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                        <a class="btn btn-outline-primary" href="product.html?id=${p.id}">Xem chi tiết</a>
                        <button class="btn-fav" onclick="toggleFav(${p.id})"><i class="fa-regular fa-heart"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

let list = [];
if (cat){
    list = products.filter(p => p.category === cat);
    if (cat === 'chau-cay-canh') catTitle.textContent = 'Chậu cây cảnh';
    else if (cat === 'cay-de-ban') catTitle.textContent = 'Cây để bàn';
    else if (cat === 'cay-thuy-sinh') catTitle.textContent = 'Cây thủy sinh';
} else if (search){
    const q = search.toLowerCase();
    list = products.filter(p => p.name.toLowerCase().includes(q));
    catTitle.textContent = 'Kết quả tìm kiếm: "' + search + '"';
} else {
    list = products;
    catTitle.textContent = 'Tất cả sản phẩm';
}

renderList(list);

window.toggleFav = function(productId){
    const cur = JSON.parse(localStorage.getItem('GL_currentUser') || 'null');
    if (!cur) return location.href='login.html';
    const key = 'GL_favs_' + cur.id;
    let favs = JSON.parse(localStorage.getItem(key) || '[]');
    if (favs.includes(productId)) favs = favs.filter(x=>x!==productId);
    else favs.push(productId);
    localStorage.setItem(key, JSON.stringify(favs));
    alert('Đã cập nhật danh sách yêu thích');
};

document.getElementById('searchForm').addEventListener('submit', e=>{
    e.preventDefault();
    const q = document.getElementById('searchInput').value.trim();
    if (!q) return;
    location.href='products.html?search='+encodeURIComponent(q);
});
