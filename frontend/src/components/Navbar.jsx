import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        ? "bg-[#2b211e]/95 backdrop-blur-md py-3 shadow-lg border-[#c6a87c]/20" // KHI CUỘN: Nền Nâu Đậm (Hơi mờ)
        : "bg-transparent py-6 border-white/10" // KHI Ở ĐỈNH: Trong suốt hoàn toàn
    }`}>
      
      {/* LOGO */}
      <Link to="/" className="text-2xl font-serif font-bold tracking-widest text-[#c6a87c] hover:text-white transition">
        OnlyMe
      </Link>

      {/* MENU GIỮA */}
      <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide absolute left-1/2 transform -translate-x-1/2 text-white">
        {['TRANG CHỦ', 'THỰC ĐƠN', 'GIỚI THIỆU', 'LIÊN HỆ'].map((item) => (
          <Link key={item} to="/" className="hover:text-[#c6a87c] transition relative group">
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c6a87c] transition-all group-hover:w-full"></span>
          </Link>
        ))}
      </div>

      {/* ICON BÊN PHẢI */}
      <div className="flex items-center gap-5 text-white">
        <button className="hover:text-[#c6a87c] transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>

        <button className="hover:text-[#c6a87c] transition relative">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 5.408c.63 2.708-.263 5.474-2.756 5.474H7.243c-2.493 0-3.386-2.766-2.756-5.474l1.263-5.408c.293-1.255 1.376-1.993 2.568-1.993h8.142c1.192 0 2.275.738 2.568 1.993Z" />
          </svg>
          <span className="absolute -top-2 -right-2 bg-[#c6a87c] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
            0
          </span>
        </button>
        
        {/* Vách ngăn */}
        <div className="h-4 w-px bg-white/20 mx-1"></div>

        <Link to="/login">
          <button className="text-sm font-bold tracking-wider hover:text-[#c6a87c] transition">
            LOGIN
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;