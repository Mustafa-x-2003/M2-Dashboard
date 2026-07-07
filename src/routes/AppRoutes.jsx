import { Routes, Route,Navigate
 } from "react-router";

import Login from "../features/auth/pages/LoginPage";
// import Dashboard from "../features/dashboard/pages/Dashboard";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Products from "../features/products/pages/Products";
import Orders from "../features/orders/pages/Orders";
import Users from "../features/users/pages/Users";
import AddProduct from "../features/products/pages/AddProduct";
import Carts from "../features/cart/pages/CartsPage";
import Settings from "../features/settings/pages/Settings";

import Editpage from "../features/products/pages/Editpage";
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
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path='/products/edit/:id' element={ <Editpage/>}/>
        <Route path="/carts" element={<Carts />} />
        <Route path="/settings" element={<Settings />} />

      </Route>
    </Routes>
  );
}
