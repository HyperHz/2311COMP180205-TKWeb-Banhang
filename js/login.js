// Xử lý đăng nhập & đăng ký bằng localStorage
const btnLogin = document.getElementById('btnLogin');
const btnRegister = document.getElementById('btnRegister');

// Lấy danh sách người dùng từ localStorage
let users = JSON.parse(localStorage.getItem('GL_users') || '[]');


// XỬ LÝ ĐĂNG NHẬP
btnLogin.addEventListener('click', () => {
  const userInput = document.getElementById('loginUser').value.trim();
  const passInput = document.getElementById('loginPass').value.trim();

  if (!userInput || !passInput) {
    alert('Vui lòng nhập đủ thông tin đăng nhập!');
    return;
  }

  // Kiểm tra nếu là admin
  if (
    (userInput === '12345678' || userInput === 'admin@gmail.com') &&
    passInput === 'tiemcayxanh'
  ) {
    const admin = { id: 0, name: 'Admin', isAdmin: true };
    localStorage.setItem('GL_currentUser', JSON.stringify(admin));
    alert('🛠 Đăng nhập với tư cách quản trị viên!');

    // Nếu có trang bị khóa trước đó thì quay lại
    const redirect = localStorage.getItem('GL_redirectAfterLogin');
    if (redirect) {
      localStorage.removeItem('GL_redirectAfterLogin');
      location.href = redirect;
    } else {
      location.href = 'admin.html';
    }
    return;
  }

  // Kiểm tra user
  const found = users.find(
    (u) =>
      (u.phone === userInput || u.email === userInput) &&
      u.password === passInput
  );

  if (!found) {
    alert('Sai thông tin đăng nhập hoặc tài khoản không tồn tại!');
    return;
  }

  // Lưu tài khoản đang đăng nhập
  localStorage.setItem('GL_currentUser', JSON.stringify(found));
  alert('Đăng nhập thành công 🌿');

  // Kiểm tra xem có lưu trang cần quay lại không
  const redirect = localStorage.getItem('GL_redirectAfterLogin');

  if (redirect) {
    localStorage.removeItem('GL_redirectAfterLogin');
    location.href = redirect; // quay lại đúng trang ban đầu
  } else {
    location.href = 'index.html'; // nếu không, về trang chủ
  }
});

// XỬ LÝ ĐĂNG KÝ
btnRegister.addEventListener('click', () => {
  const name = document.getElementById('regName').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const address = document.getElementById('regAddress').value.trim();
  const pass = document.getElementById('regPass').value.trim();

  if (!name || !phone || !email || !address || !pass) {
    alert('Vui lòng nhập đầy đủ thông tin!');
    return;
  }

  if (users.some((u) => u.phone === phone || u.email === email)) {
    alert('Số điện thoại hoặc email đã được đăng ký!');
    return;
  }

  const newUser = {
    id: Date.now(),
    name,
    phone,
    email,
    address,
    password: pass,
    isAdmin: false,
  };

  users.push(newUser);
  localStorage.setItem('GL_users', JSON.stringify(users));

  alert('🎉 Đăng ký thành công! Bạn có thể đăng nhập ngay.');
  document
    .querySelector('#authTabs .nav-link[data-bs-toggle="tab"]')
    .click(); // chuyển sang tab login
});
