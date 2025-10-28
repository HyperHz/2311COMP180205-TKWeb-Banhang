const curUser = JSON.parse(localStorage.getItem('GL_currentUser') || 'null');
if (!curUser) {
    alert('Bạn cần đăng nhập để xem danh sách yêu thích!');
    location.href = 'login.html';
}

const products = JSON.parse(localStorage.getItem('GL_products') || '[]');
const wishlistKey = 'GL_favs_' + curUser.id;
let wishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]');

const container = document.getElementById('wishlistContainer');
const emptyMsg = document.getElementById('emptyMsg');

renderWishlist();

function renderWishlist() {
    if (!wishlist.length) {
        container.innerHTML = '';
        emptyMsg.classList.remove('d-none');
        return;
    }
    emptyMsg.classList.add('d-none');

    container.innerHTML = wishlist.map(id => {
        const p = products.find(x => x.id === id);
        if (!p) return '';
        return `
        <div class="col-md-4">
            <div class="wish-card">
                <img src="${p.img}" alt="${p.name}" onclick="openDetail(${p.id})">
                <div class="wish-info">
                    <h6>${p.name}</h6>
                    <p class="text-success fw-bold mb-2">${p.price.toLocaleString()}₫</p>
                    <button class="remove-btn" onclick="removeItem(${p.id})"><i class="fa fa-trash"></i> Xóa</button>
                </div>
            </div>
        </div>
    `;
  }).join('');
}

window.removeItem = function(id){
    wishlist = wishlist.filter(x => x !== id);
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    renderWishlist();
};

window.openDetail = function(id){
    location.href = `product.html?id=${id}`;
};
