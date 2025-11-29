import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation(); // Để biết đang đứng ở trang nào mà tô màu

  // Danh sách các mục menu
  const menuItems = [
    { name: "Thống kê", path: "/admin" },
    { name: "Quản lý Đơn hàng", path: "/admin/orders" },
    { name: "Quản lý Menu", path: "/admin/products" },
    { name: "Quản lý Tài Khoản", path: "/admin/users"}
  ];

  return (
    <aside className="w-64 bg-[#2b211e] text-white flex flex-col h-full min-h-screen">
      {/* Logo Admin */}
      <div className="p-6 text-2xl font-bold text-[#c6a87c] border-b border-white/10 flex items-center gap-2">
        ADMIN
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-3 rounded-lg transition-all ${
              location.pathname === item.path
                ? "bg-[#c6a87c] text-[#2b211e] font-bold shadow-md" // Tô màu nếu đang chọn
                : "hover:bg-white/10 hover:text-[#c6a87c]"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Nút đăng xuất */}
      <div className="p-4 border-t border-white/10">
        <button className="w-full text-left px-4 py-2 text-red-400 hover:bg-white/10 rounded font-semibold flex items-center gap-2">
          Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;