// đảm bảo products-data.js đã chạy
const products = JSON.parse(localStorage.getItem('GL_products') || '[]');
const featuredRow = document.getElementById('featuredRow');

// hiển thị 3 sản phẩm nổi bật (lấy 3 đầu trong mảng)
function renderFeatured(){
    const items = products.slice(0,3);
    featuredRow.innerHTML = items.map(p => `
        <div class="col-12 col-sm-6 col-md-4 feature-col">
            <div class="card card-plant h-100">
                <img src="2311COMP180205-TKWeb-Banhang/${p.img}" class="card-img-top" alt="${p.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${p.name}</h5>
                    <p class="price mb-3">${p.price.toLocaleString()}₫</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                        <a class="btn btn-outline-primary" href="product.html?id=${p.id}">Xem chi tiết</a>
                        <button class="btn-fav" onclick="toggleFav(${p.id})" title="Lưu vào yêu thích"><i class="fa-regular fa-heart"></i></button>
                    </div>
                </div>
            </div>
        </div>
  `).join('');
}
renderFeatured();

// toggle favorite: nếu chưa đăng nhập -> qua login, nếu có -> lưu localStorage GL_favs_{userId}
window.toggleFav = function(productId){
  const cur = JSON.parse(localStorage.getItem('GL_currentUser') || 'null');
  if (!cur) {
    // chưa login -> chuyển tới login
    location.href = 'login.html';
    return;
    }
    const key = 'GL_favs_' + cur.id;
    let favs = JSON.parse(localStorage.getItem(key) || '[]');
    if (favs.includes(productId)) {
        favs = favs.filter(x=>x !== productId);
    } else {
        favs.push(productId);
    }
    localStorage.setItem(key, JSON.stringify(favs));
  alert('Đã cập nhật danh sách yêu thích');
};

// SEARCH:
document.getElementById('searchForm').addEventListener('submit', function(e){
    e.preventDefault();
    const q = document.getElementById('searchInput').value.trim();
    if (!q) return;
    location.href = 'products.html?search=' + encodeURIComponent(q);
});
