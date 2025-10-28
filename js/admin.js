
const curUser = JSON.parse(localStorage.getItem('GL_currentUser') || 'null');
if (!curUser || !curUser.isAdmin) {
    alert('❌ Chỉ quản trị viên mới có quyền truy cập trang này!');
    location.href = 'index.html';
}

document.getElementById('logoutBtn').addEventListener('click', ()=>{
    localStorage.removeItem('GL_currentUser');
    location.href = 'index.html';
});

function openPage(page){
    location.href = page;
}
