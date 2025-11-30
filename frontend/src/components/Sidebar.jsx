import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/AuthService';

const Sidebar = () => {
  const location = useLocation(); // Để biết đang đứng ở trang nào mà tô màu
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  // Danh sách các mục menu
  const menuItems = [
    { name: "Thống kê", path: "/admin", roles: ["ADMIN"] },
    { name: "Quản lý Đơn hàng", path: "/admin/orders",roles: ["ADMIN", "STAFF"] },
    { name: "Quản lý Menu", path: "/admin/products", roles: ["ADMIN"] },
    { name: "Quản lý Tài Khoản", path: "/admin/users",roles: ["ADMIN"]}
  ];

  const handleLogout = () => {
    if (window.confirm("Bạn muốn đăng xuất?")) {
      logout();
      navigate("/login");
    }
  }

  return (
    <aside className="w-64 bg-[#2b211e] text-white flex flex-col h-full min-h-screen">
      <div className="p-6 text-2xl font-bold text-[#c6a87c] border-b border-white/10 flex flex-col">
        <span>Quản trị</span>
        <span className="text-xs text-grey-400 font-normal mt-1">
          Xin chào, {user?.role === 'ADMIN' ? 'Boss' : 'Nhân viên'} {user?.username}
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          if (user && item.roles.includes(user.role)) {
            return (
              <Link
                key = {item.path}
                to = {item.path}
                className = {`block px-4 py-3 rounded-lg transition-all ${
                  location.pathname === item.path ?
                  "bg-[#c6a87c] text-[#2b211e] font-bold shadow-md"
                  : "hover:bg-white/10 hover:text-[#c6a87c]"
                }`}
                >
                  {item.name}
              </Link>
            );
          }
          return null;
        })}
      </nav>

      {/* Nút đăng xuất */}
      <div className="p-4 border-t border-white/10">
        <button 
            onClick = {handleLogout}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-white/10 rounded font-semibold flex items-center gap-2">
          Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;