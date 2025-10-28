if (!localStorage.getItem('GL_products')) {
    const products = [
        {
            id: 101,
            name: "Cây Trầu Bà",
            price: 689000,
            img: "img/trau-ba.webp",
            category: "chau-cay-canh",
            description:
                "+ Tên sản phẩm : Cây Trầu Bà Cột\n\n+ Kích thước : 28x40x150cm\n\n+ Giá sản phẩm : 689.000VNĐ đã bao gồm cây + chậu tròn chất liệu sứ size 28cm\n\n+ Công dụng : Cây trầu bà cột ... (xem chi tiết trong mô tả)",
            care:
                "Lượng nước: tưới 500 ml mỗi lần. 2 ngày tưới 1 lần... Nên để cây ra ngoài trời hóng gió (tránh nắng trên 26°C) 2 lần/ tuần",
            stock: 10
        },
        {
            id: 102,
            name: "Cây Lưỡi Hổ Viền Vàng",
            price: 389000,
            img: "img/luoi-ho.webp",
            category: "chau-cay-canh",
            description:
                "+ Tên sản phẩm : Cây Lưỡi hổ viền vàng\n\n+ Kích thước : 28x40x120cm\n\n+ Giá sản phẩm : 389.000VNĐ ...",
            care:
                "Lượng nước: tưới 500 ml mỗi lần. 2 ngày tưới 1 lần... Nên mang cây ra ngoài trời phơi nắng nhẹ 2-3 lần/ tuần.",
            stock: 15
        },
        {
            id: 103,
            name: "Cây Kim Tiền",
            price: 389000,
            img: "img/kim-tien.webp",
            category: "chau-cay-canh",
            description:
                "+ Tên sản phẩm : Cây Kim tiền\n\n+ Kích thước : 26x30x110cm\n\n+ Giá sản phẩm : 389.000VNĐ ...",
            care:
                "Lượng nước: tưới 500 ml mỗi lần. 3 ngày tưới 1 lần... Tránh nước mưa trực tiếp vào chậu.",
            stock: 12
        },
        {
            id: 201,
            name: "Cây Hồng Phát Lộc",
            price: 220000,
            img: "img/hong-phat-loc.jpg",
            category: "cay-de-ban",
            description:
                "Tên thông thường: Hồng phát lộc để bàn\nHọ: Araceae\nChiều cao: 20-30cm\nCông dụng: Trang trí nội thất, ý nghĩa phát tài.",
            care: "Tưới vừa phải, đặt nơi sáng gián tiếp.",
            stock: 25
        },
        {
            id: 202,
            name: "Cây Vạn Xuân",
            price: 350000,
            img: "img/van-xuan.jpg",
            category: "cay-de-ban",
            description:
                "Tên thường gọi: Cây vạn xuân để bàn\nKích thước: 40-45cm\nCông dụng: Trang trí văn phòng, quà tặng.",
            care: "Ánh sáng trung bình, tưới đều.",
            stock: 18
        },
        {
            id: 203,
            name: "Cây Hồng Môn Đỏ",
            price: 250000,
            img: "img/hong-mon-do.webp",
            category: "cay-de-ban",
            description:
                "Tên gọi khác: Cây tiểu hồng môn\nChiều cao: 30-40cm\nCông dụng: Trang trí bàn làm việc, quà tặng.",
            care: "Giữ ẩm vừa đủ, tránh nắng gắt.",
            stock: 20
        },
        {
            id: 301,
            name: "Cây Hoa Thủy Nữ",
            price: 35000,
            img: "img/thuy-nu.jpg",
            category: "cay-thuy-sinh",
            description:
                "Tên thường gọi: Hoa Thủy Nữ\nHọ: Menyanthaceae\nCông dụng: Trồng bể cá, chậu thủy tinh, tiểu cảnh.",
            care: "Sống tốt trong nước, ánh sáng vừa phải.",
            stock: 100
        },
        {
            id: 302,
            name: "Cây Thủy Trúc",
            price: 40000,
            img: "img/thuy-truc.jpg",
            category: "cay-thuy-sinh",
            description:
                "Tên thường gọi: Thủy Trúc\nHọ: Cyperaceae\nCông dụng: Thanh lọc nước, trang trí hồ, bể cá.",
            care: "Thích nước sâu, phát triển nhanh.",
            stock: 80
        },
        {
            id: 303,
            name: "Cây Bèo Hoa Dâu",
            price: 65000,
            img: "img/beo-hoa-dau.jpg",
            category: "cay-thuy-sinh",
            description:
                "Tên thường gọi: Bèo Hoa Dâu\nHọ: Azollaceae\nCông dụng: Phủ mặt nước, trang trí chậu cá, phân xanh.",
            care: "Phủ mặt nước, dễ sinh trưởng.",
            stock: 60
        }
    ];

    localStorage.setItem('GL_products', JSON.stringify(products));
}

if (!localStorage.getItem('GL_users')) {
    const users = [
        { id: 1, name: "Admin", phone: "12345678", email: "admin@gl", address: "", password: "tiemcayxanh", isAdmin: true }
    ];
    localStorage.setItem('GL_users', JSON.stringify(users));
}
