import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { useUser } from '../hooks/use-user';
import { Layout } from '../layouts/Layout';
import { AuthRoutes } from './AuthRoutes';
import { ProtectedRoutes } from './ProtectedRoutes';
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'
import { Cart } from '../pages/Cart';
import { Profile } from '../pages/Profile';

export const RouteManager = () => {
  const { fetchUser, loading } = useUser()
  const location = useLocation();

  useEffect(() => {
    fetchUser()
  }, [location.pathname])

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
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin routes */}

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
