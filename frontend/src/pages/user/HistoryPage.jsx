import React, { useEffect, useState } from "react";
import { getOrderHistory } from "../../services/OrderService";
import { getCurrentUser } from "../../services/AuthService";
import { Link } from "react-router-dom";

const HistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const user = getCurrentUser();

  useEffect(() => {
    if (user) {
      getOrderHistory(user.id).then(setOrders);
    }
  }, []);

  if (!user) {
    return <div className="pt-32 text-center">Vui lòng <Link to="/login" className="text-blue-600 font-bold">đăng nhập</Link> để xem lịch sử.</div>;
  }

  // Hàm tô màu trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return "text-yellow-600 bg-yellow-100";
      case "PROCESSING": return "text-blue-600 bg-blue-100";
      case "COMPLETED": return "text-green-600 bg-green-100";
      case "CANCELLED": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-10 bg-gray-50 px-4 md:px-20">
      <h2 className="text-3xl font-bold text-[#4a3b36] mb-8 text-center border-b pb-4 border-[#c6a87c]">
        Lịch Sử Đơn Hàng
      </h2>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition">
              
              {/* Header đơn hàng */}
              <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <div>
                  <span className="font-bold text-lg text-[#4a3b36]">Đơn hàng #{order.id}</span>
                  <span className="text-xs text-gray-400 block">{new Date(order.orderDate).toLocaleString()}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* Danh sách món trong đơn */}
              <div className="space-y-3">
                {order.orderDetails?.map((detail) => (
                  <div key={detail.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <img src={detail.product?.image} className="w-10 h-10 rounded object-cover" alt="" />
                      <span className="font-medium text-gray-700">
                        {detail.product?.name} <span className="text-gray-400">x {detail.quantity}</span>
                      </span>
                    </div>
                    <span className="font-bold text-gray-600">
                      {(detail.price * detail.quantity).toLocaleString()} đ
                    </span>
                  </div>
                ))}
              </div>

              {/* Tổng tiền */}
              <div className="mt-4 pt-3 border-t flex justify-between items-center">
                <span className="text-gray-500 text-sm">Địa chỉ: {order.address}</span>
                <span className="text-xl font-bold text-[#c6a87c]">
                  Tổng: {order.totalPrice?.toLocaleString()} VNĐ
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">Bạn chưa có đơn hàng nào.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;