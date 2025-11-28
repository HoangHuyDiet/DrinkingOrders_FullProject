import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/OrderService"; // Import Service

const OrderManager = () => {
  const [orders, setOrders] = useState([]);

  // Hàm load dữ liệu
  const fetchOrders = () => {
    getAllOrders().then(data => setOrders(data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Hàm xử lý duyệt đơn
  const handleUpdate = async (id, status) => {
    if(window.confirm(`Bạn muốn chuyển trạng thái đơn #${id} sang ${status}?`)) {
        await updateOrderStatus(id, status);
        fetchOrders(); // Load lại bảng ngay lập tức
    }
  };

  // Màu sắc trạng thái
  const getStatusBadge = (status) => {
    const colors = {
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'PROCESSING': 'bg-blue-100 text-blue-800',
      'COMPLETED': 'bg-green-100 text-green-800',
      'CANCELLED': 'bg-red-100 text-red-800'
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors[status] || 'bg-gray-100'}`}>{status}</span>;
  };
  console.log("Dữ liệu orders hiện tại:", orders);
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#4a3b36] mb-6 border-l-4 border-[#c6a87c] pl-4">📦 Quản lý Đơn hàng</h2>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-[#4a3b36] text-white">
            <tr>
              <th className="p-4">Mã</th>
              <th className="p-4">Khách hàng</th>
              <th className="p-4">Tổng tiền</th>
              <th className="p-4">Trạng thái</th>
              <th className="p-4">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                {/* ... (Giữ nguyên nội dung bên trong các thẻ td) ... */}
              </tr>
            ))
                ) : (
            <tr>
              <td colSpan="5" className="p-8 text-center text-gray-500">
                {orders === null ? "Đang tải..." : "Chưa có đơn hàng nào hoặc lỗi kết nối."}
              </td>
            </tr>
          )}
          </tbody>
        </table>
        {orders.length === 0 && <p className="p-8 text-center text-gray-500">Chưa có đơn hàng nào.</p>}
      </div>
    </div>
  );
};

export default OrderManager;