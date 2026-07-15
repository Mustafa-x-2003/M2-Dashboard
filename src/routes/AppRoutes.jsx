import { Routes, Route, Navigate } from "react-router";

import Login from "../features/auth/pages/LoginPage";

import Dashboard from "../features/dashboard/pages/Dashboard";
import Products from "../features/products/pages/Products";
import AddProductPage from "../features/products/pages/AddProductPage";
import ViewProductsPage from "../features/products/pages/ViewProductsPage";
import Editpage from "../features/products/pages/Editpage";

import Orders from "../features/orders/pages/Orders";
import Users from "../features/users/pages/Users";
import Carts from "../features/cart/pages/CartsPage";
import Settings from "../features/settings/pages/Settings";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Products */}
        <Route path="/products" element={<Products />} />

        <Route path="/products/view/:id" element={<ViewProductsPage />} />

        <Route path="/products/add" element={<AddProductPage />} />

        <Route path="/products/edit/:id" element={<Editpage />} />

        {/* Orders */}
        <Route path="/orders" element={<Orders />} />

        {/* Users */}
        <Route path="/users" element={<Users />} />

        {/* Cart */}
        <Route path="/carts" element={<Carts />} />

        {/* Settings */}
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
