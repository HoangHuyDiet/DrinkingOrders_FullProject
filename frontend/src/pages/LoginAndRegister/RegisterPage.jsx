import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Nhớ import Link
import { registerUser } from '../../services/AuthService';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '', 
    password: '', 
    fullName: '', 
    email: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Đăng ký thành công! Giờ bạn hãy đăng nhập nhé.");
      navigate("/login"); // Chuyển sang trang Login
    } catch (error) {
      alert("!!! Lỗi: " + error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-coffee-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 border border-[#c6a87c]">
        <h2 className="text-2xl font-bold text-center text-[#4a3b36] mb-6">ĐĂNG KÝ TÀI KHOẢN</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            placeholder="Họ và tên" 
            className="w-full p-2 border rounded" 
            onChange={e => setFormData({...formData, fullName: e.target.value})} 
            required 
          />
          <input 
            placeholder="Email" 
            type="email"
            className="w-full p-2 border rounded" 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            required 
          />
          <input 
            placeholder="Tên đăng nhập" 
            className="w-full p-2 border rounded" 
            onChange={e => setFormData({...formData, username: e.target.value})} 
            required 
          />
          <input 
            type="password" 
            placeholder="Mật khẩu" 
            className="w-full p-2 border rounded" 
            onChange={e => setFormData({...formData, password: e.target.value})} 
            required 
          />

          <button className="w-full bg-[#c6a87c] text-white py-2 rounded font-bold hover:bg-[#b08d55]">
            Đăng Ký
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Đã có tài khoản? <Link to="/login" className="text-blue-600 font-bold">Đăng nhập ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;