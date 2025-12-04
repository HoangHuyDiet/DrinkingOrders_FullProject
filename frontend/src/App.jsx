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
import UserManager from "./pages/admin/UserManager";
import CartPage from "./pages/user/CartPage";
import InventoryManager from "./pages/admin/InventoryManager";
import HistoryPage from "./pages/user/HistoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- NHÁNH 1: GIAO DIỆN KHÁCH HÀNG --- */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} /> 
          {/* Đưa Cart vào đây để nó có Navbar và Footer */}
          <Route path="cart" element={<CartPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>

        {/* Các trang lẻ (Không cần Navbar/Footer) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* --- NHÁNH 2: GIAO DIỆN QUẢN TRỊ --- */}
        <Route path="/admin" element={
          <ProtectedRoute roleRequired="STAFF">
            <AdminLayout/>
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<OrderManager />} />
          <Route path="products" element={<ProductManager />} />
          <Route path="users" element={<UserManager />} />
          <Route path="inventory" element={<InventoryManager />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;