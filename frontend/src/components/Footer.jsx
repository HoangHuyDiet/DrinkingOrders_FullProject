import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#2b211e] text-white py-10 text-center border-t border-white/10">
      <h3 className="font-serif text-2xl mb-4 text-[#c6a87c]">OnlyMe Shop</h3>
      <div className="flex justify-center gap-6 text-sm text-gray-400 mb-6">
        <a href="#" className="hover:text-white">Về chúng tôi</a>
        <a href="#" className="hover:text-white">Chính sách bảo mật</a>
        <a href="#" className="hover:text-white">Liên hệ</a>
      </div>
      <p className="text-gray-500 text-xs">© 2023 OnlyMe. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;