import React, {useEffect, useState} from "react";
import {getAllUsers, createUser, deleteUser} from "../../services/AuthService";

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        password: "",
        email: "",
        role: "STAFF"
    });

    const fetchUsers = () => {
        getAllUsers().then(data => setUsers(data));
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    // Xử lý nhập liệu
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    //Xử lý thêm mới
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(formData);
            alert("Tạo tài khoản thành công!");
            fetchUsers();
            setFormData({fullName: "", username: "", password: "", email: "", role: "STAFF"}) //RESET
        } catch (error) {
            const errorMessage = error.response?.data || "Đăng ký thất bại! Vui lòng thử lại.";
            alert("Lỗi: " + errorMessage);
        }
    };

    //Xử lý xóa
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa người này không ?")) {
            await deleteUser(id);
            fetchUsers();
        }
    };

    //Hàm tạo màu sắc cho Role
    const getRoleBadge = (role) => {
        switch (role) {
            case "ADMIN":
                return "bg-red-100 text-red-800 border-red-200"
            case "STAFF":
                return "bg-blue-100 text-blue-800 border-blue-200"
            default:
                return "bg-green-100 text-green-800 border-green-200"
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* --- CỘT TRÁI: FORM TẠO TÀI KHOẢN --- */}
      <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm h-fit border-t-4 border-[#c6a87c]">
        <h3 className="text-xl font-bold text-[#4a3b36] mb-4">Tạo Tài Khoản Mới</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700">Họ và tên</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} required 
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-[#c6a87c] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required 
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-[#c6a87c] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Tên đăng nhập</label>
            <input name="username" value={formData.username} onChange={handleChange} required 
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-[#c6a87c] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Mật khẩu</label>
            <input name="password" type="password" value={formData.password} onChange={handleChange} required 
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-[#c6a87c] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Vai trò</label>
            <select name="role" value={formData.role} onChange={handleChange}
              className="w-full p-2 border rounded mt-1 bg-white focus:ring-2 focus:ring-[#c6a87c] outline-none">
              <option value="STAFF">Nhân viên (STAFF)</option>
              <option value="ADMIN">Quản lý (ADMIN)</option>
              <option value="USER">Khách hàng (USER)</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-[#4a3b36] text-white py-3 rounded font-bold hover:bg-[#c6a87c] transition">
            TẠO NGƯỜI DÙNG
          </button>
        </form>
      </div>

      {/* --- CỘT PHẢI: DANH SÁCH --- */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
        <h3 className="text-xl font-bold text-[#4a3b36] mb-4">Danh Sách Tài Khoản</h3>
        <div className="overflow-y-auto max-h-[600px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-3 font-bold text-gray-600">Thông tin</th>
                <th className="p-3 font-bold text-gray-600">User/Email</th>
                <th className="p-3 font-bold text-gray-600 text-center">Vai trò</th>
                <th className="p-3 font-bold text-gray-600 text-center">Xóa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="p-3">
                    <p className="font-bold text-[#4a3b36]">{user.fullName}</p>
                    <p className="text-xs text-gray-400">ID: {user.id}</p>
                  </td>
                  <td className="p-3">
                    <p className="text-sm font-semibold">{user.username}</p>
                    <p className="text-xs text-gray-500 italic">{user.email}</p>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold border ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {/* Không cho phép xóa chính mình hoặc các Admin cứng */}
                    {user.username !== "admin_test" && (
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:bg-red-50 px-3 py-1 rounded border border-red-200 text-xs font-bold transition"
                      >
                        XÓA
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
    );
}

export default UserManager;