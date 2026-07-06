import { Routes, Route, Navigate } from "react-router";

import Login from "../features/auth/pages/LoginPage";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Products from "../features/products/pages/Products";
import AddProduct from "../features/products/pages/AddProduct";
import Orders from "../features/orders/pages/Orders";
import Users from "../features/users/pages/Users";
import ViewProductsPage from "../features/products/pages/ViewProductsPage";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products/view/:id" element={<ViewProductsPage />} />
      </Route>
    </Routes>
  );
}
