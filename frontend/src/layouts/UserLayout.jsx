import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const UserLayout = () => {
  return (
    <div className="font-sans text-coffee-800 antialiased">
      <Navbar />  {/* Luôn hiện ở trên */}
      
      <div className="min-h-screen pt-20"> {/* pt-20 để tránh bị Navbar che mất nội dung đầu */}
        <Outlet /> {/* Đây là nơi nội dung các trang con (Home, Menu) sẽ hiện ra */}
      </div>

      <Footer />  {/* Luôn hiện ở dưới */}
    </div>
  );
};

export default UserLayout;