import { Navigate, Outlet } from 'react-router';
import { useUser } from '../hooks/use-user';

export const AdminRoutes = () => {
  const { user } = useUser();
  return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/" replace />;
};
