import React, { useEffect, useState } from 'react';
import { countUsers, getRevenueStats } from '../../services/StatisticsService'; // Import Service lấy thống kê
import { getAllOrders } from '../../services/OrderService';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [newOrdersCount, setNewOrdersCount] = useState(0); // Đếm đơn mới (Pending)
  const [processingCount, setProcessingCount] = useState(0); // Đếm đơn đang làm

  useEffect(() => {
    // Gọi API lấy số liệu
    getRevenueStats().then(data => {
      setStats(data);
      // Tính tổng doanh thu toàn bộ
      const total = data.reduce((sum, item) => sum + item.total, 0);
      setTotalRevenue(total);
    });

    //Đếm số lượng khách hàng
    countUsers().then(num => setUserCount(num));

    // 2. Lấy đơn hàng và tự đếm (Code mới)
    getAllOrders().then(orders => {
      if (orders) {
        // Đếm số đơn có status là "PENDING"
        const pending = orders.filter(o => o.status === 'PENDING').length;
        setNewOrdersCount(pending);

        // Đếm số đơn có status là "PROCESSING"
        const processing = orders.filter(o => o.status === 'PROCESSING').length;
        setProcessingCount(processing);
      }
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#4a3b36] mb-6 border-l-4 border-[#c6a87c] pl-4">
        📊 Tổng Quan Kinh Doanh
      </h2>

      {/* 1. CÁC THẺ THỐNG KÊ (SUMMARY CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Card 1: Tổng doanh thu */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Tổng Doanh Thu</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {totalRevenue.toLocaleString('vi-VN')} VNĐ
          </p>
        </div>

        {/* Card 2: Đơn hàng (Giả lập) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Đơn hàng mới</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{newOrdersCount}</p>
        </div>

        {/* Card 3: Khách hàng (Giả lập) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Khách hàng</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{userCount}</p>
        </div>
      </div>

      {/* 2. BẢNG CHI TIẾT DOANH THU THEO NGÀY */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Chi tiết theo ngày</h3>
        
        {stats.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase">
                <th className="py-3">Ngày</th>
                <th className="py-3 text-right">Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((item, index) => (
                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 font-medium text-gray-700">{item.date}</td>
                  <td className="py-3 text-right font-bold text-[#c6a87c]">
                    {item.total.toLocaleString('vi-VN')} VNĐ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 italic text-center py-10">Chưa có dữ liệu thống kê...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;