import React, { useEffect, useState } from "react";
import { getMenu } from "../../services/ProductService"; // Import Service lấy API
import ProductCard from "../../components/ProductCard"; // Import Component vừa tạo

const HomePage = () => {
  const [products, setProducts] = useState([]);

  // Gọi Backend lấy dữ liệu thật
  useEffect(() => {
    getMenu().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div>
      {/* 1. HERO SECTION (Ảnh nền to) */}
      <section className="relative h-[80vh] flex items-center justify-start px-8 md:px-24 text-left">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop" 
            className="w-full h-full object-cover filter brightness-50"
            alt="Hero Background"
          />
        </div>
        <div className="relative z-10 max-w-2xl">
          <p className="text-white font-bold tracking-[0.3em] mb-4 text-sm md:text-base animate-pulse">
            CHÀO MỪNG ĐẾN VỚI ONLYME
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Thưởng thức hương vị <br/>
            <span className="text-[#c6a87c]">Đậm Đà Khó Quên</span>
          </h1>
          <button className="bg-[#c6a87c] text-[#2b211e] px-8 py-3 font-bold hover:bg-white transition rounded-sm uppercase tracking-widest text-sm">
            Đặt món ngay
          </button>
        </div>
      </section>

      {/* 2. MENU SECTION (Danh sách món từ Backend) */}
      <section className="py-20 bg-[#fdf8f6] px-4 md:px-10">
        <div className="text-center mb-12">
          <p className="text-[#c6a87c] font-bold tracking-widest mb-2">THỰC ĐƠN</p>
          <h2 className="text-4xl font-serif font-bold text-[#4a3b36]">Món Ngon Mỗi Ngày</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.length > 0 ? (
            products.map(p => <ProductCard key={p.id} product={p} />)
          ) : (
            <p className="text-center col-span-full text-gray-500">Đang tải menu từ server...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;