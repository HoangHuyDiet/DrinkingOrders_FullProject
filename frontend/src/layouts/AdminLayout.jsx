import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from '../components/Sidebar'; 

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* 1. Sidebar bên trái */}
      <Sidebar />
      
      {/* 2. Nội dung chính bên phải */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm min-h-full">
          
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;