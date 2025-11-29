import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Import Pages
import HomePage from "./pages/user/HomePage";
import Dashboard from "./pages/admin/Dashboard";
import OrderManager from "./pages/admin/OrderManager";
import ProductManager from "./pages/admin/ProductManager";
import RegisterPage from "./pages/LoginAndRegister/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginAndRegister/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- NHÁNH 1: GIAO DIỆN KHÁCH HÀNG --- */}
        {/* Mọi đường dẫn con bên trong sẽ dùng UserLayout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} /> {/* Trang chủ mặc định */}
          {/* <Route path="menu" element={<MenuPage />} /> */}
        </Route>

        {/* --- NHÁNH 2: GIAO DIỆN QUẢN TRỊ --- */}
        {/* Mọi đường dẫn bắt đầu bằng /admin sẽ dùng AdminLayout */}
        <Route path="/admin" element={
          <ProtectedRoute roleRequired="ADMIN">
            <AdminLayout/>
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />        {/* http://localhost:5173/admin */}
          <Route path="orders" element={<OrderManager />} /> {/* http://localhost:5173/admin/orders */}
          <Route path="products" element={<ProductManager />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;