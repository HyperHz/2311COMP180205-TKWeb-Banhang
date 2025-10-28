const curUser = JSON.parse(localStorage.getItem('GL_currentUser') || 'null');
if (!curUser || !curUser.isAdmin) {
    alert('❌ Chỉ quản trị viên mới có quyền truy cập trang này!');
    location.href = 'index.html';
}

document.getElementById('logoutBtn').addEventListener('click', ()=>{
    localStorage.removeItem('GL_currentUser');
    location.href = 'index.html';
});

let allUsers = JSON.parse(localStorage.getItem('GL_users') || '[]');
allUsers = allUsers.filter(u => !u.isAdmin);

const customerList = document.getElementById('customerList');
const searchInput = document.getElementById('searchInput');
const noResult = document.getElementById('noResult');

renderCustomers(allUsers);

function renderCustomers(list){
    if (!list.length){
        customerList.innerHTML = '';
        noResult.classList.remove('d-none');
        return;
    }
    noResult.classList.add('d-none');
    customerList.innerHTML = list.map(u=>`
        <div class="col-md-4">
        <div class="customer-card">
            <div class="customer-info">
                <p><strong>👤 ${u.fullname}</strong></p>
                <p>📞 ${u.phone}</p>
                <p>📧 ${u.email}</p>
                <p>🏠 ${u.address}</p>
            </div>
        </div>
        </div>
    `).join('');
}

document.getElementById('searchBtn').addEventListener('click', doSearch);
searchInput.addEventListener('keypress', e=>{
  if (e.key === 'Enter') doSearch();
});

function doSearch(){
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) return renderCustomers(allUsers);

    const filtered = allUsers.filter(u =>
        u.fullname.toLowerCase().includes(keyword) ||
        u.phone.toLowerCase().includes(keyword)
    );
    renderCustomers(filtered);
}
