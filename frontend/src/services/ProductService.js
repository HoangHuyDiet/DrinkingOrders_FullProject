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

// 4. Sửa món
export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error("Lỗi sửa món:", error);
        throw error;
    }
};

// 5. Tìm kiếm món
export const searchProducts = async (keyword) => {
    try {
        const response = await axios.get(`${API_URL}/search?name=${keyword}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi tìm kiếm:", error);
        return [];
    }
}