import axios from "axios"

const API_URL = "http://localhost:8080/api/products"

export const getMenu = async() => {
    try {
        const response = await axios.get(API_URL);
        return response.data
    }
    catch (error) {
        console.error("Lỗi gọi API: ", error);
        return [];
    }
}