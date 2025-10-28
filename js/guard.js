document.addEventListener("DOMContentLoaded", () => {
    const curUser = JSON.parse(localStorage.getItem("GL_currentUser") || "null");
    const page = location.pathname.split("/").pop();

    const userPages = [
        "cart.html",
        "wishlist.html",
        "checkout.html",
        "orders.html",
        "myaccount.html"
    ];

    const adminPages = [
        "admin.html",
        "admin-customers.html",
        "admin-products.html",
        "admin-revenue.html"
    ];

    if (!curUser && userPages.includes(page)) {
        localStorage.setItem("GL_redirectAfterLogin", location.href);
        alert("⚠️ Vui lòng đăng nhập để tiếp tục!");
        location.href = "login.html";
        return;
    }
});
