import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/AuthService';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '', 
    password: '',
    confirmPassword: '', 
    fullName: '', 
    email: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      const { confirmPassword, ...dataToSend } = formData;

      await registerUser(dataToSend);
      alert("Đăng ký thành công! Giờ bạn hãy đăng nhập nhé.");
      navigate("/login");
    } catch (error) {
      // 2. SỬA LỖI [object Object] TẠI ĐÂY
      // Lấy tin nhắn lỗi từ Backend hoặc hiển thị lỗi mặc định
      const msg = error.response?.data || "Đăng ký thất bại (Lỗi mạng hoặc Server)";
      setError("Lỗi: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-coffee-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 border border-[#c6a87c]">
        <h2 className="text-2xl font-bold text-center text-[#4a3b36] mb-6">ĐĂNG KÝ TÀI KHOẢN</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            name="fullName"
            placeholder="Họ và tên" 
            className="w-full p-2 border rounded focus:outline-none focus:border-[#c6a87c]" 
            onChange={handleChange} 
            required 
          />
          <input 
            name="email"
            placeholder="Email" 
            type="email"
            className="w-full p-2 border rounded focus:outline-none focus:border-[#c6a87c]" 
            onChange={handleChange} 
            required 
          />
          <input 
            name="username"
            placeholder="Tên đăng nhập" 
            className="w-full p-2 border rounded focus:outline-none focus:border-[#c6a87c]" 
            onChange={handleChange} 
            required 
          />
          <input 
            name="password"
            type="password" 
            placeholder="Mật khẩu" 
            className="w-full p-2 border rounded focus:outline-none focus:border-[#c6a87c]" 
            onChange={handleChange} 
            required 
          />
          <input 
            name="confirmPassword"
            type="password"
            placeholder='Nhập lại mật khẩu'
            className='w-full p-2 border rounded focus:outline-none focus:border-[#c6a87c]'
            onChange={handleChange}
            required
          />

          <button 
            disabled={loading}
            className={`w-full text-white py-2 rounded font-bold transition ${loading ? 'bg-gray-400' : 'bg-[#c6a87c] hover:bg-[#b08d55]'}`}
          >
            {loading ? "Đang xử lý..." : "Đăng Ký"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Đã có tài khoản? <Link to="/login" className="text-blue-600 font-bold hover:underline">Đăng nhập ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;