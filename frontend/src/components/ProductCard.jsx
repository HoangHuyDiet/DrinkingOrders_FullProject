import React from 'react';

const ProductCard = ({ product }) => (
  <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
    <div className="relative h-48 overflow-hidden">
      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
      />
      {/* Nút thêm nhanh */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button className="bg-white text-[#4a3b36] px-4 py-2 font-bold hover:bg-[#c6a87c] hover:text-white transition rounded shadow">
          + Thêm vào giỏ
        </button>
      </div>
    </div>
    
    <div className="p-4 text-center">
      <h3 className="text-lg font-serif font-bold text-[#4a3b36] mb-1 truncate">{product.name}</h3>
      <p className="text-[#c6a87c] font-bold">
        {product.price?.toLocaleString('vi-VN')} VNĐ
      </p>
    </div>
  </div>
);

export default ProductCard;