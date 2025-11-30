import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/OrderService";

const OrderManager = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    getAllOrders().then(data => {
        console.log("Dữ liệu orders:", data); // Debug
        // Nếu API trả về null/undefined thì gán mảng rỗng để đỡ lỗi
        setOrders(Array.isArray(data) ? data : []);
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdate = async (id, status) => {
    if(window.confirm(`Chuyển đơn #${id} sang ${status}?`)) {
        await updateOrderStatus(id, status);
        fetchOrders();
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'PROCESSING': 'bg-blue-100 text-blue-800',
      'COMPLETED': 'bg-green-100 text-green-800',
      'CANCELLED': 'bg-red-100 text-red-800'
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors[status] || 'bg-gray-100'}`}>{status}</span>;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#4a3b36] mb-6 border-l-4 border-[#c6a87c] pl-4">Quản lý Đơn hàng</h2>
      
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
            {/* Kiểm tra có dữ liệu hay không */}
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-bold text-gray-700">#{order.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-[#4a3b36]">{order.user?.fullName || "Khách vãng lai"}</div>
                    <div className="text-xs text-gray-500">{order.phone}</div>
                    <div className="text-xs text-gray-400 italic">{order.address}</div>
                  </td>
                  <td className="p-4 font-bold text-[#c6a87c]">
                    {order.totalPrice?.toLocaleString()} đ
                  </td>
                  <td className="p-4">{getStatusBadge(order.status)}</td>
                  <td className="p-4 flex gap-2">
                    {order.status === "PENDING" && (
                      <button 
                        onClick={() => handleUpdate(order.id, "PROCESSING")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                      >
                        Duyệt đơn
                      </button>
                    )}
                    {order.status === "PROCESSING" && (
                      <button 
                        onClick={() => handleUpdate(order.id, "COMPLETED")}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition"
                      >
                        Hoàn thành
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              /* Thông báo khi không có đơn hàng */
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-500 italic">
                  Hiện tại chưa có đơn hàng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManager;