import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

// 1. Lấy Menu (Đã có)
export const getMenu = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Lỗi gọi API:", error);
        return [];
    }
};

// --- PHẦN MỚI THÊM CHO ADMIN ---

// 2. Thêm món mới
export const addProduct = async (productData) => {
    try {
        const response = await axios.post(API_URL, productData);
        return response.data;
    } catch (error) {
        console.error("Lỗi thêm món:", error);
        throw error;
    }
};

// 3. Xóa món
export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Lỗi xóa món:", error);
        return false;
    }
};