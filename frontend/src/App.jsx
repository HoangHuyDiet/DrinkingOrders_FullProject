import React, { useEffect, useState } from "react";
import { getMenu } from "./services/ProductService"; // Nhớ giữ file service hôm qua nhé

// Component: Thẻ sản phẩm (Product Card)
const ProductCard = ({ product }) => (
  <div className="group">
    <div className="relative overflow-hidden rounded-lg mb-4">
      <img
        src={product.image || "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop"}
        alt={product.name}
        className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
      />
      {/* Nút thêm vào giỏ hiện ra khi hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button className="bg-white text-coffee-900 px-6 py-2 font-bold hover:bg-gold-500 hover:text-white transition">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
    <div className="text-center">
      <h3 className="text-xl font-serif font-bold text-coffee-900 mb-1">{product.name}</h3>
      <p className="text-gold-500 font-bold text-lg">{product.price.toLocaleString('vi-VN')} VNĐ</p>
    </div>
  </div>
);

function App() {
  const [products, setProducts] = useState([]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Nếu cuộn quá 50px thì bật chế độ "Scrolled"
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Gọi API thật hoặc dùng data giả để test giao diện trước
    getMenu().then(setProducts).catch(() => {}); 
  }, []);

  return (
    <div className="font-sans text-coffee-800 antialiased">
      
      {/* 1. NAVBAR */}
      {/* --- NAVBAR (Đổi màu khi cuộn) --- */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 border-b px-8 flex justify-between items-center
        ${isScrolled 
          ? "bg-white/95 backdrop-blur-md text-coffee-900 py-3 shadow-md border-gray-200"  // KHI CUỘN: Nền trắng, Chữ nâu, Gọn lại
          : "bg-transparent text-white py-6 border-white/10" // KHI Ở ĐỈNH: Nền trong suốt, Chữ trắng, Thoáng hơn
        }`}
      >
        
        {/* 1. LOGO */}
        <div className="text-2xl font-serif font-bold tracking-widest cursor-pointer hover:text-gold-500 transition">
          OnlyMe
        </div>

        {/* 2. MENU LINKS */}
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide absolute left-1/2 transform -translate-x-1/2">
          {['HOME', 'MENU', 'ABOUT', 'CONTACT'].map((item) => (
            <a key={item} href="#" className="hover:text-gold-500 transition relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* 3. RIGHT SECTION */}
        <div className="flex items-center gap-5">
          <button className="hover:text-gold-500 transition p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>

          <button className="hover:text-gold-500 transition p-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 5.408c.63 2.708-.263 5.474-2.756 5.474H7.243c-2.493 0-3.386-2.766-2.756-5.474l1.263-5.408c.293-1.255 1.376-1.993 2.568-1.993h8.142c1.192 0 2.275.738 2.568 1.993Z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          {/* Vách ngăn đổi màu theo scroll */}
          <div className={`h-4 w-px mx-1 ${isScrolled ? "bg-coffee-900/20" : "bg-white/20"}`}></div>

          <button className="text-sm font-bold tracking-wider hover:text-gold-500 transition flex items-center gap-2">
            Đăng nhập
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION (Ảnh nền to) */}
      {/* 2. HERO SECTION (Căn trái + Chữ trắng) */}
      <section className="relative h-screen flex items-center justify-start px-8 md:px-24 text-left">
        
        {/* Ảnh nền tối màu */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop" 
            className="w-full h-full object-cover filter brightness-50"
            alt="Coffee Background"
          />
        </div>
        
        {/* Nội dung đè lên (Đã chỉnh sửa) */}
        <div className="relative z-10 max-w-2xl">
          {/* Chữ Welcome chuyển sang màu trắng */}
          <p className="text-white font-bold tracking-[0.3em] mb-4 animate-fade-in-up text-sm md:text-base">
            WELCOME TO ONLYME
          </p>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Enjoy Your Time At <br/>
            <span className="text-gold-500">OnlyMe Shop</span>
            </h1> 
          
          
          
          <p className="text-gray-200 mb-8 text-lg leading-relaxed max-w-lg">
            Mỗi ngày làm cốc ở đây đời phải nói là tươi phơi phới luôn nhé!
          </p>
          
        </div>
      </section>

      {/* 3. MENU SECTION */}
      <section className="py-20 bg-coffee-50 px-4 md:px-10">
        <div className="text-center mb-16">
          <p className="text-gold-500 font-bold tracking-widest mb-2">KHÁM PHÁ</p>
          <h2 className="text-4xl font-serif font-bold text-coffee-900">Menu OnlyMe</h2>
        </div>

        {/* Grid sản phẩm */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.length > 0 ? (
            products.map(p => <ProductCard key={p.id} product={p} />)
          ) : (
            <p className="text-center col-span-full">Đang tải menu...</p>
          )}
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-coffee-900 text-white py-10 text-center border-t border-white/10">
        <p className="font-serif text-2xl mb-4">OnlyMe</p>
        <p className="text-gray-400 text-sm">© 2023 OnlyMe. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default App;