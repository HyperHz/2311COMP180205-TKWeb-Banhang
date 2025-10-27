
// Cập nhật navbar dựa trên GL_currentUser (gọi file trong mọi trang)
(function(){
    // lấy current user nếu có
    const cur = JSON.parse(localStorage.getItem('GL_currentUser') || 'null');

    // cart & fav link
    const navCart = document.getElementById('nav-cart');
    const navFav  = document.getElementById('nav-fav');
    const accMenu = document.getElementById('accMenu');

    if (cur) {
        // nếu đã login -> cart/fav trỏ tới trang tương ứng
        if (navCart) navCart.href = 'cart.html';
        if (navFav) navFav.href = 'wishlist.html';

        // cập nhật accMenu: admin vs user
        if (accMenu) {
        if (cur.isAdmin) {
            accMenu.innerHTML = `
            <li><a class="dropdown-item" href="admin.html">Quản lý cửa hàng</a></li>
            <li><a class="dropdown-item" href="#" id="logoutBtn">Đăng xuất</a></li>
            `;
        } else {
            accMenu.innerHTML = `
            <li><a class="dropdown-item" href="myaccount.html">Tài khoản của tôi</a></li>
            <li><a class="dropdown-item" href="orders.html">Quản lý đơn hàng</a></li>
            <li><a class="dropdown-item" href="#" id="logoutBtn">Đăng xuất</a></li>
            `;
        }
        const logout = document.getElementById('logoutBtn');
        if (logout) logout.addEventListener('click', ()=>{
            localStorage.removeItem('GL_currentUser');
            location.reload();
        });
        }
    } else {
        // chưa login: giữ link mặc định tới login
        if (navCart) navCart.href = 'login.html';
        if (navFav) navFav.href = 'login.html';
        if (accMenu) {
        accMenu.innerHTML = `
            <li><a class="dropdown-item" href="login.html">Đăng nhập</a></li>
            <li><a class="dropdown-item" href="login.html#register">Đăng ký</a></li>
        `;
        }
    }
})();
