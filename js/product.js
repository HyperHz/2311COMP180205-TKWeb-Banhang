const products = JSON.parse(localStorage.getItem('GL_products') || '[]');
const curUser = JSON.parse(localStorage.getItem('GL_currentUser') || 'null');
const id = new URLSearchParams(location.search).get('id');
const product = products.find(p => p.id == id);
const productDetail = document.getElementById('productDetail');
const reviewList = document.getElementById('reviewList');
const reviewForm = document.getElementById('reviewForm');

if (!product) {
    productDetail.innerHTML = '<p class="text-center text-muted">Không tìm thấy sản phẩm.</p>';
} else {
    renderDetail();
    renderReviews();
}

function renderDetail(){
    productDetail.innerHTML = `
    <div class="product-wrap">
        <div class="product-left text-center">
            <img src="${product.img}" alt="${product.name}" class="product-img">
        </div>
        <div class="product-right">
            <h2>${product.name}</h2>
            <p class="price">${product.price.toLocaleString()}₫</p>
            <div class="d-flex align-items-center gap-2 my-3">
                <input id="qty" type="number" value="1" min="1" class="form-control" style="width:90px">
                <button class="btn-add" onclick="addToCart(${product.id})"><i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ</button>
                <button class="btn-fav" onclick="toggleFav(${product.id})"><i class="fa-regular fa-heart"></i></button>
            </div>
            <div class="product-desc mt-4">
                <h5>Mô tả sản phẩm</h5>
                <p>${product.description.replace(/\n/g,'<br>')}</p>
            </div>
            <div class="product-care">
                <h5>Cách chăm sóc</h5>
                <p>${product.care}</p>
            </div>
        </div>
    </div>
  `;
}

function addToCart(id){
    if (!curUser) return location.href='login.html';
    const qty = parseInt(document.getElementById('qty').value);
    const key = 'GL_cart_' + curUser.id;
    let cart = JSON.parse(localStorage.getItem(key) || '[]');
    const exist = cart.find(i => i.id == id);
    if (exist) exist.qty += qty;
    else cart.push({ id, qty });
    localStorage.setItem(key, JSON.stringify(cart));
    alert('🛒 Đã thêm vào giỏ hàng!');
}

function toggleFav(id){
    if (!curUser) return location.href='login.html';
    const key = 'GL_favs_' + curUser.id;
    let favs = JSON.parse(localStorage.getItem(key) || '[]');
    if (favs.includes(id)) favs = favs.filter(x=>x!==id);
    else favs.push(id);
    localStorage.setItem(key, JSON.stringify(favs));
    alert('❤️ Đã cập nhật yêu thích');
}

function renderReviews(){
    const key = 'GL_reviews_' + id;
    const reviews = JSON.parse(localStorage.getItem(key) || '[]');
    if (!reviews.length){
        reviewList.innerHTML = '<p class="text-muted">Chưa có đánh giá nào.</p>';
    } else {
        reviewList.innerHTML = reviews.map(r => `
        <div class="border rounded p-3 mb-3 bg-white shadow-sm">
            <strong>${r.name}</strong>
            <p class="mb-1">${r.text}</p>
            ${r.img ? `<img src="${r.img}" class="rounded mt-2" style="max-width:150px">` : ''}
        </div>
        `).join('');
    }

    if (curUser && !curUser.isAdmin){
        reviewForm.classList.remove('d-none');
    }
}

document.getElementById('btnSubmitReview').addEventListener('click', ()=>{
    const name = document.getElementById('reviewName').value.trim();
    const text = document.getElementById('reviewText').value.trim();
    const file = document.getElementById('reviewImg').files[0];

    if (!name || !text) return alert('Vui lòng nhập tên và nhận xét.');

    let imgData = '';
    if (file){
        const reader = new FileReader();
        reader.onload = e=>{
        imgData = e.target.result;
        saveReview(name, text, imgData);
        };
        reader.readAsDataURL(file);
    } else {
        saveReview(name, text, imgData);
    }
});

function saveReview(name, text, img){
    const key = 'GL_reviews_' + id;
    let reviews = JSON.parse(localStorage.getItem(key) || '[]');
    reviews.push({ name, text, img });
    localStorage.setItem(key, JSON.stringify(reviews));
    renderReviews();
    document.getElementById('reviewName').value='';
    document.getElementById('reviewText').value='';
    document.getElementById('reviewImg').value='';
    alert('✅ Đã gửi đánh giá!');
}
