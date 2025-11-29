import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/AuthService'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Gọi API đăng nhập
      const user = await loginUser(username, password);
      
      // 2. Kiểm tra quyền để chuyển hướng (Router)
      if (user.role === "ADMIN" || user.role === "STAFF") {
        alert(`Xin chào quản lý ${user.fullName}!`);
        navigate("/admin"); // Chuyển vào trang Admin
      } else {
        alert(`Chào mừng khách hàng ${user.fullName}!`);
        navigate("/"); // Chuyển về trang chủ mua hàng
      }

    } catch (error) {
      // Hiển thị lỗi nếu sai pass
      setError("!!! Sai tên đăng nhập hoặc mật khẩu !!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2b211e] bg-opacity-95"
         style={{
             backgroundImage: "url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071')",
             backgroundBlendMode: "overlay",
             backgroundSize: "cover"
         }}
    >
      {/* Card Đăng nhập */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-[#c6a87c] transform transition hover:scale-105 duration-300">
        
        {/* Logo / Tiêu đề */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#4a3b36]">OnlyMe Shop</h1>
          <p className="text-gray-500 text-sm mt-2">Đăng nhập để tiếp tục</p>
        </div>

        {/* Thông báo lỗi */}
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Tên đăng nhập</label>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c6a87c] transition"
              placeholder="Nhập username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
            <input 
              type="password" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c6a87c] transition"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition shadow-lg uppercase tracking-wider
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#c6a87c] hover:bg-[#b08d55]"}`}
          >
            {loading ? "Đang xử lý..." : "Đăng Nhập"}
          </button>
        </form>
        
        {/* Link Đăng ký */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Bạn chưa có tài khoản? 
          <Link to="/register" className="text-[#4a3b36] font-bold hover:underline ml-1">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;