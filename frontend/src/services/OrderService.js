import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

// 1. Lấy tất cả đơn hàng (Cho Admin xem)
export const getAllOrders = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy danh sách đơn:", error);
        return [];
    }
};

// 2. Cập nhật trạng thái đơn (Duyệt đơn/Hoàn thành)
// status: "PROCESSING" hoặc "COMPLETED"
export const updateOrderStatus = async (orderId, status) => {
    try {
        // Gọi PUT: /api/orders/1/status?status=COMPLETED
        const response = await axios.put(`${API_URL}/${orderId}/status?status=${status}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi cập nhật trạng thái:", error);
        throw error;
    }
};

// 3. Tạo trạng thái thanh toán
export const createOrder = async (orderData) => {
    const response = await axios.post(`${API_URL}`, orderData);
    return response.data;
}