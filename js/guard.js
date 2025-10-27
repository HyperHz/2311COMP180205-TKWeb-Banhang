// Kiểm tra đăng nhập và quyền truy cập

document.addEventListener("DOMContentLoaded", () => {
  const curUser = JSON.parse(localStorage.getItem("GL_currentUser") || "null");
  const page = location.pathname.split("/").pop();

  // Danh sách trang chỉ cho người dùng đã đăng nhập
  const userPages = [
    "cart.html",
    "wishlist.html",
    "checkout.html",
    "orders.html",
    "myaccount.html"
  ];

  // Danh sách trang chỉ cho admin
  const adminPages = [
    "admin.html",
    "admin-customers.html",
    "admin-products.html",
    "admin-revenue.html"
  ];

  // Nếu chưa login mà vào trang user
  if (!curUser && userPages.includes(page)) {
    localStorage.setItem("GL_redirectAfterLogin", location.href);
    alert("⚠️ Vui lòng đăng nhập để tiếp tục!");
    location.href = "login.html";
    return;
  }

});
