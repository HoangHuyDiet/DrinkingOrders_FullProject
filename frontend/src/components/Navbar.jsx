import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getCurrentUser, logout } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  //Lấy user hiện tại
  const user = getCurrentUser();

  const handleLogout = () => {
    logout(); // Xóa localStorage
    navigate("/login");
    window.location.reload();
  }
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b px-8 flex justify-between items-center ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-md py-3 shadow-lg border-gray-200 text-[#4a3b36]" 
        : "bg-transparent py-6 border-white/10 text-white"
    }`}>
      
      <Link to = "/" className={`text-2xl font-serif font-bold tracking-widest transition ${isScrolled ? "text-[#c6a87c]" : "text-white"} hover:opacity-80`}>
        OnlyMe
      </Link>

      {/* MENU GIỮA */}
      <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide absolute left-1/2 transform -translate-x-1/2">
        {[
          {name: "Trang chủ", link: "#home"},
          {name: "Thực đơn", link: "#menu"},
          {name: "Giới thiệu", link: "#about"},
          {name: "Liên hệ", link: "#contact"}
        ].map((item) => (
          <a
            key = {item.name}
            href={item.link}
            className='{`relative group py-2 transition ${isScrolled ? "hover:text-[#c6a87c]" : "hover:text-[#c6a87c]"}`}'
          >
            {item.name}
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#c6a87c] transition-all group-hover:w-full'></span>
          </a>
        ))}
      </div>

      {/* ICON BÊN PHẢI */}
      <div className="flex items-center gap-5">
        {/* GIỎ HÀNG */}
        <Link to="/cart">
            <button className="hover:text-[#c6a87c] transition relative p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 5.408c.63 2.708-.263 5.474-2.756 5.474H7.243c-2.493 0-3.386-2.766-2.756-5.474l1.263-5.408c.293-1.255 1.376-1.993 2.568-1.993h8.142c1.192 0 2.275.738 2.568 1.993Z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-[#c6a87c] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                {totalItems}
            </span>
            </button>
        </Link>

        <Link to="/history" className="hover:text-[#c6a87c]">Lịch sử đơn</Link>
        
        {/* VÁCH NGĂN: Đổi màu theo nền */}
        <div className={`h-4 w-px mx-1 ${isScrolled ? "bg-gray-300" : "bg-white/20"}`}></div>

        {user ? (
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-full bg-[#c6a87c] text-white flex items-center justify-center font-bold text-sm shadow-sm' title={user.fullName}>
              {user.fullName.charAt(0).toUpperCase()}
            </div>

            <button
              onClick={handleLogout}
              className='text-xs font-bold text-red-500 hover:text-red-700 transition border border-red-200 px-2 py-1 rounded hover:bg-red-50'
            >
              Thoát
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="text-sm font-bold tracking-wider hover:text-[#c6a87c] transition">
              LOGIN
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;