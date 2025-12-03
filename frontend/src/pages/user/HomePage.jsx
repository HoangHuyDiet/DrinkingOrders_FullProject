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
      <section id = "home" className="relative h-[80vh] flex items-center justify-start px-8 md:px-24 text-left">
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
          <a href="#menu" className="bg-[#c6a87c] text-[#2b211e] px-8 py-3 font-bold hover:bg-white transition rounded-sm uppercase tracking-widest text-sm">
            Đặt món ngay
          </a>
        </div>
      </section>

      {/* 2. MENU SECTION (Danh sách món từ Backend) */}
      <section id = "menu" className="py-20 bg-[#fdf8f6] px-4 md:px-10">
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

      {/* ABOUT SECTION (Thêm mới cho có chỗ để cuộn tới) */}
      <section id="about" className="py-24 bg-white px-8 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* CỘT TRÁI: ẢNH */}
          <div className="relative">
            {/* Ảnh chính to */}
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" 
              alt="Coffee Making" 
              className="w-full h-[500px] object-cover rounded-sm shadow-xl"
            />
            {/* Ảnh phụ nhỏ đè lên (Tạo điểm nhấn nghệ thuật) */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 border-8 border-white shadow-lg hidden md:block">
               <img 
                 src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop" 
                 className="w-full h-full object-cover"
                 alt="Coffee Cup"
               />
            </div>
          </div>

          {/* CỘT PHẢI: NỘI DUNG */}
          <div className="text-left pl-0 lg:pl-10">
            <p className="text-[#c6a87c] font-bold tracking-[0.2em] text-sm mb-4 uppercase">
              VỀ CHÚNG TÔI
            </p>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2b211e] mb-6 leading-tight">
              Một Tách Cà Phê <br/>
              Là Một Câu Chuyện
            </h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed font-sans text-lg">
              Được thành lập từ năm 2023, <span className="font-bold text-[#4a3b36]">OnlyMe Shop</span> không chỉ bán cà phê, chúng tôi bán sự trải nghiệm. 
              Từng hạt cà phê được tuyển chọn kỹ lưỡng từ vùng đất đỏ Bazan, rang xay theo công thức bí truyền để giữ trọn hương vị nguyên bản.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed font-sans">
              Không gian quán được thiết kế theo phong cách Vintage, nơi bạn có thể tìm thấy sự bình yên giữa lòng thành phố ồn ào. 
              Hãy đến và để chúng tôi kể cho bạn nghe câu chuyện về những hạt cà phê hạnh phúc.
            </p>

            {/* Danh sách điểm nổi bật */}
            <div className="grid grid-cols-2 gap-4 mt-8">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#fdf8f6] flex items-center justify-center text-[#c6a87c]">✓</div>
                  <span className="font-bold text-[#4a3b36]">100% Tự Nhiên</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#fdf8f6] flex items-center justify-center text-[#c6a87c]">✓</div>
                  <span className="font-bold text-[#4a3b36]">Pha Chế Thủ Công</span>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT SECTION (Thêm mới) */}
      <section id="contact" className="py-10 bg-gray-100 text-center">
         <h2 className="text-2xl font-bold text-[#4a3b36]">Liên hệ</h2>
         <p>📍 123 Đường ABC, Quận XYZ, TP.HCM</p>
         <p>📞 0988.888.888</p>
      </section>
    </div>
  );
};

export default HomePage;