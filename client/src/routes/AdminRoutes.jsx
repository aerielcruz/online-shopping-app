import { Navigate, Outlet } from 'react-router';
import { useUser } from '../hooks/use-user';
import { AdminLayout } from '../layouts/AdminLayout';

export const AdminRoutes = () => {
  const { user } = useUser();
  return user && user.role === 'admin'
    ? <AdminLayout><Outlet /></AdminLayout>
    : <Navigate to="/" replace />;
};
