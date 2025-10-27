
// Kiểm tra quyền admin
const curUser = JSON.parse(localStorage.getItem('GL_currentUser') || 'null');
if (!curUser || !curUser.isAdmin) {
  alert('❌ Chỉ quản trị viên mới có quyền truy cập!');
  location.href = 'index.html';
}

document.getElementById('logoutBtn').addEventListener('click', ()=>{
  localStorage.removeItem('GL_currentUser');
  location.href = 'index.html';
});

let products = JSON.parse(localStorage.getItem('GL_products') || '[]');
const productList = document.getElementById('productList');
const searchInput = document.getElementById('searchInput');
const noResult = document.getElementById('noResult');

// Modal
const modal = new bootstrap.Modal(document.getElementById('productModal'));
let editId = null;

renderProducts(products);

// render danh sách
function renderProducts(list){
  if (!list.length){
    productList.innerHTML = '';
    noResult.classList.remove('d-none');
    return;
  }
  noResult.classList.add('d-none');

  productList.innerHTML = list.map(p=>`
    <div class="col-md-4">
      <div class="product-card">
        <img src="2311COMP180205-TKWeb-Banhang/${p.img}" alt="${p.name}">
        <div class="info">
          <h6>${p.name}</h6>
          <p class="mb-1">${p.price.toLocaleString()}₫</p>
          <p class="text-muted small mb-2">${p.category}</p>
          <div class="action-btns d-flex gap-2">
            <button onclick="editProduct(${p.id})"><i class="fa fa-pen"></i></button>
            <button onclick="deleteProduct(${p.id})"><i class="fa fa-trash"></i></button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// tìm kiếm
document.getElementById('searchBtn').addEventListener('click', doSearch);
searchInput.addEventListener('keypress', e=>{
  if (e.key === 'Enter') doSearch();
});
function doSearch(){
  const keyword = searchInput.value.trim().toLowerCase();
  if (!keyword) return renderProducts(products);
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
  renderProducts(filtered);
}

// Thêm sản phẩm
document.getElementById('btnAdd').addEventListener('click', ()=>{
  editId = null;
  document.getElementById('modalTitle').textContent = "Thêm sản phẩm";
  clearForm();
  modal.show();
});

// Lưu sản phẩm
document.getElementById('saveProductBtn').addEventListener('click', ()=>{
  const name = document.getElementById('productName').value.trim();
  const price = parseFloat(document.getElementById('productPrice').value);
  const img = document.getElementById('productImg').value.trim();
  const category = document.getElementById('productCategory').value;
  const desc = document.getElementById('productDesc').value.trim();

  if (!name || !price || !img || !category){
    alert('Vui lòng nhập đủ thông tin!');
    return;
  }

  if (editId){
    const p = products.find(x => x.id === editId);
    Object.assign(p, {name, price, img, category, desc});
  } else {
    const newP = {
      id: Date.now(),
      name, price, img, category, desc
    };
    products.push(newP);
  }

  localStorage.setItem('GL_products', JSON.stringify(products));
  renderProducts(products);
  modal.hide();
});

// Xóa sản phẩm
window.deleteProduct = function(id){
  if (confirm('Xóa sản phẩm này?')){
    products = products.filter(p => p.id !== id);
    localStorage.setItem('GL_products', JSON.stringify(products));
    renderProducts(products);
  }
};

// Sửa sản phẩm
window.editProduct = function(id){
  const p = products.find(x => x.id === id);
  if (!p) return;
  editId = id;
  document.getElementById('modalTitle').textContent = "Chỉnh sửa sản phẩm";
  document.getElementById('productName').value = p.name;
  document.getElementById('productPrice').value = p.price;
  document.getElementById('productImg').value = p.img;
  document.getElementById('productCategory').value = p.category;
  document.getElementById('productDesc').value = p.desc;
  modal.show();
};

// reset form
function clearForm(){
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productImg').value = '';
  document.getElementById('productCategory').value = '';
  document.getElementById('productDesc').value = '';
}
