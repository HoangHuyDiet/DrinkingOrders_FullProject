import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar đơn giản */}
      <div className="w-64 bg-coffee-900 text-white p-5">
        <h2 className="text-2xl font-bold text-gold-500 mb-10">ADMIN</h2>
        <ul>
          <li className="mb-4 hover:text-gold-500 cursor-pointer">📊 Thống kê</li>
          <li className="mb-4 hover:text-gold-500 cursor-pointer">📦 Đơn hàng</li>
        </ul>
      </div>

      {/* Nội dung chính */}
      <div className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold text-coffee-800">Chào sếp! Hôm nay bán đắt không?</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;