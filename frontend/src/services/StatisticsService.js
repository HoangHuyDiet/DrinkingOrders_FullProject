import axios from "axios";

const API_URL = "http://localhost:8080/api/stats";

export const getRevenueStats = async () => {
    try {
        const response = await axios.get(`${API_URL}/revenue`);
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy thống kê:", error);
        return [];
    }
};

export const countUsers = async () => {
    try {
        const res = await axios.get(`${API_URL}/count-users`);
        return res.data;
    } catch (error) {
        console.error("Lỗi đếm user:", error);
        return 0;
    }
}