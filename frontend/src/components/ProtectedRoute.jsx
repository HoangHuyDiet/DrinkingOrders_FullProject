import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/AuthService";

const ProtectedRoute = ({children, roleRequired}) => {
    const user = getCurrentUser(); // Lấy user từ localStorage

    // 1. Chưa đăng nhập -> Đá về Login
    if (!user) {
        return <Navigate to='/login' replace />;
    }

    // 2. Đăng nhập rồi nhưng sai quyền 
    if (roleRequired === "ADMIN" && user.role !== "ADMIN" && user.role !== "STAFF") {
        alert("Bạn không có quyền truy cập trang này!");
        return <Navigate to="/" replace/>;
    }

    // 3. Hợp lệ -> Cho vào
    return children;
};

export default ProtectedRoute;