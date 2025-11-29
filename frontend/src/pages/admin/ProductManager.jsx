import React, { useEffect, useState } from "react";
import { getMenu, addProduct, deleteProduct, updateProduct } from "../../services/ProductService";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null); // State để biết đang Sửa hay Thêm (null = Thêm)
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category_id: 1
  });

  const fetchProducts = () => {
    getMenu().then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Hàm xử lý nút SỬA trên bảng
  const handleEditClick = (product) => {
    setEditingId(product.id); // Đánh dấu là đang sửa món này
    // Đổ dữ liệu cũ lên form
    setFormData({
        name: product.name,
        price: product.price,
        image: product.image || "",
        description: product.description || "",
        category_id: product.category?.id || 1 // Lấy ID danh mục cũ
    });
  };

  // Hàm xử lý nút HỦY (Quay về thêm mới)
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", price: "", image: "", description: "", category_id: 1 });
  };

  // Xử lý Submit (Tự động phân biệt Thêm hoặc Sửa)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // --- TRƯỜNG HỢP SỬA ---
        await updateProduct(editingId, formData);
        alert("Cập nhật thành công!");
      } else {
        // --- TRƯỜNG HỢP THÊM ---
        await addProduct(formData);
        alert("Thêm món thành công!");
      }
      
      fetchProducts(); // Load lại bảng
      handleCancelEdit(); // Reset form
    } catch (error) {
      alert("Có lỗi xảy ra!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa món này không?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* FORM (Dùng chung cho cả Thêm và Sửa) */}
      <div className={`lg:col-span-1 p-6 rounded-xl shadow-sm h-fit border-t-4 ${editingId ? "bg-yellow-50 border-yellow-500" : "bg-white border-[#c6a87c]"}`}>
        <h3 className="text-xl font-bold text-[#4a3b36] mb-4">
            {editingId ? "Chỉnh Sửa Món" : "Thêm Món Mới"}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700">Tên món</label>
            <input name="name" value={formData.name} onChange={handleChange} required 
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-[#c6a87c] outline-none" />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700">Giá bán</label>
            <input name="price" type="number" value={formData.price} onChange={handleChange} required 
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-[#c6a87c] outline-none" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Link ảnh</label>
            <input name="image" value={formData.image} onChange={handleChange} 
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-[#c6a87c] outline-none" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Mô tả</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="2"
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-[#c6a87c] outline-none"></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Danh mục</label>
            <select name="category_id" value={formData.category_id} onChange={handleChange}
              className="w-full p-2 border rounded mt-1 bg-white focus:ring-2 focus:ring-[#c6a87c] outline-none">
              <option value="1">Cà phê</option>
              <option value="2">Trà sữa</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button type="submit" 
                className={`flex-1 py-3 rounded font-bold text-white transition shadow-md ${editingId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-[#4a3b36] hover:bg-[#c6a87c]"}`}>
                {editingId ? "CẬP NHẬT" : "LƯU MỚI"}
            </button>
            
            {/* Nút Hủy chỉ hiện khi đang Sửa */}
            {editingId && (
                <button type="button" onClick={handleCancelEdit}
                    className="px-4 py-3 rounded font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 transition">
                    Hủy
                </button>
            )}
          </div>
        </form>
      </div>

      {/* DANH SÁCH */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
        <h3 className="text-xl font-bold text-[#4a3b36] mb-4">📋 Danh Sách Thực Đơn</h3>
        <div className="overflow-y-auto max-h-[600px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-3">Hình</th>
                <th className="p-3">Tên & Mô tả</th>
                <th className="p-3">Giá</th>
                <th className="p-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => (
                <tr key={p.id} className={`hover:bg-gray-50 transition ${editingId === p.id ? "bg-yellow-50" : ""}`}>
                  <td className="p-3"><img src={p.image} alt="" className="w-12 h-12 object-cover rounded" /></td>
                  <td className="p-3">
                    <p className="font-bold text-[#4a3b36]">{p.name}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{p.description}</p>
                  </td>
                  <td className="p-3 text-[#c6a87c] font-bold">{p.price?.toLocaleString()} đ</td>
                  <td className="p-3 flex justify-center gap-2">
                    {/* Nút Sửa */}
                    <button onClick={() => handleEditClick(p)} 
                        className="text-blue-500 hover:bg-blue-50 px-3 py-1 rounded border border-blue-200 text-sm">
                        Sửa
                    </button>
                    {/* Nút Xóa */}
                    <button onClick={() => handleDelete(p.id)} 
                        className="text-red-500 hover:bg-red-50 px-3 py-1 rounded border border-red-200 text-sm">
                        Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductManager;