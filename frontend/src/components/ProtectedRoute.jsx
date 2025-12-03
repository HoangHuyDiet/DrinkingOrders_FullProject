import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../services/AuthService';

const ProtectedRoute = ({ children, roleRequired }) => {
  const user = getCurrentUser();

  // 1. Chưa đăng nhập -> Đá về Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Logic kiểm tra quyền
  const hasPermission = () => {
    // Không yêu cầu quyền -> Cho qua
    if (!roleRequired) return true;

    const userRole = user.role?.toUpperCase(); 
    const requiredRole = roleRequired.toUpperCase();

    // Yêu cầu STAFF -> Cả ADMIN và STAFF đều được
    if (requiredRole === "STAFF") {
        return userRole === "ADMIN" || userRole === "STAFF";
    }

    // Yêu cầu ADMIN -> Chỉ ADMIN được
    if (requiredRole === "ADMIN") {
        return userRole === "ADMIN";
    }

    return false;
  };

  if (!hasPermission()) {
    alert("Bạn không có quyền truy cập trang này!");
    return <Navigate to="/" replace />;
  }

  // 3. Hợp lệ -> Cho vào
  return children;
};

export default ProtectedRoute;