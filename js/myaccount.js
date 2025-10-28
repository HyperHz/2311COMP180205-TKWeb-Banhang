const curUser = JSON.parse(localStorage.getItem('GL_currentUser') || 'null');
if (!curUser) {
    alert('Bạn cần đăng nhập để xem thông tin tài khoản!');
    location.href = 'login.html';
}

const allUsers = JSON.parse(localStorage.getItem('GL_users') || '[]');
const user = allUsers.find(u => u.id === curUser.id);
if (!user) {
    alert('Không tìm thấy tài khoản!');
    location.href = 'index.html';
}

const form = document.getElementById('accountForm');
document.getElementById('fullname').value = user.fullname || '';
document.getElementById('phone').value = user.phone || '';
document.getElementById('email').value = user.email || '';
document.getElementById('address').value = user.address || '';

form.addEventListener('submit', e => {
    e.preventDefault();

    user.fullname = document.getElementById('fullname').value.trim();
    user.email = document.getElementById('email').value.trim();
    user.address = document.getElementById('address').value.trim();

    const idx = allUsers.findIndex(u => u.id === user.id);
    if (idx !== -1) allUsers[idx] = user;

    localStorage.setItem('GL_users', JSON.stringify(allUsers));
    localStorage.setItem('GL_currentUser', JSON.stringify(user));

    alert('Cập nhật thông tin thành công');
});
