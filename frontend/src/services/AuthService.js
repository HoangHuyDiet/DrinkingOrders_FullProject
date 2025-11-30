import axios  from "axios";

const API_URL = "http://localhost:8080/api/users"

// 1, Đăng nhập
export const loginUser = async (username, password) => {
    try {
        // Gửi username và pass lên backend để kiểm tra
        const response = await axios.post(`${API_URL}/login`, {username, password});
        // Nếu đăng nhập đúng, Backend trả về User
        // Ta lưu user đó vào bộ nhớ trình duyệt (localStorage) để dùng dần
        if (response.data) {
            localStorage.setItem("currentUser", JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        // Ném lỗi ra để trang login hiển thị
        throw error.response?.data || "Lỗi đăng nhập";
    }
}

// 2. Đăng ký
export const registerUser = async (userData) => {
    try {
        // Gửi thông tin đăng ký lên backend
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Lỗi đăng ký";
    }
}

// 3. Đăng xuất
export const logout = () => {
    localStorage.removeItem("currentUser");
}

// 4. Lấy thông tin người đang đăng nhập
export const getCurrentUser = () => {
    const userStr = localStorage.getItem("currentUser");
    if(userStr) return JSON.parse(userStr);
    return null;
}

// 5. Lấy tất cả users
export const getAllUsers = async() => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy danh sách user:", error);
        return [];
    }
}

// 6. Hàm xóa user
export const deleteUser = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Lỗi xóa user:", error);
        return false;
    }
}

// 7. Thêm user
export const createUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Lỗi thêm người dùng";
    }
}