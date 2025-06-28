import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import { useUser } from '../hooks/use-user';
import { Layout } from '../layouts/Layout';
import { AdminLayout } from "../layouts/AdminLayout";
import { AuthRoutes } from './AuthRoutes';
import { ProtectedRoutes } from './ProtectedRoutes';
import { AdminRoutes } from './AdminRoutes';
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'
import { Cart } from '../pages/Cart';
import { Settings } from '../pages/Settings';
import Admin from '../pages/admin'

export const RouteManager = () => {
  const { fetchUser, loading } = useUser()

  useEffect(() => {
    fetchUser()
  }, [])

  if (loading) return null;

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />

        {/* Only show login/signup if NOT logged in */}
        <Route element={<AuthRoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="cart" element={<Cart />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Admin routes */}
        <Route path='admin' element={<AdminRoutes />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Admin.Dashboard />} />
          <Route path="products" element={<Admin.Products />} />
          <Route path="products/add" element={<Admin.AddProduct />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
