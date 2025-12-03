import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

//API Nhập kho:
export const importStock = async (id, amount) => {
    try {
        const response = await axios.put(`${API_URL}/${id}/stock?amount=${amount}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi nhập kho:", error);
        throw error;
    }
};