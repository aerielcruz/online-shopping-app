import { Navigate, Outlet } from 'react-router';
import { useUser } from '../hooks/use-user';

export const ProtectedRoutes = () => {
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to="/" replace />;
};
