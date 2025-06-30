import { Navigate, Outlet } from 'react-router';
import { useUser } from '../hooks/use-user';

export const ProtectedRoutes = () => {
  const { user } = useUser();
  return user && user.email ? <Outlet /> : <Navigate to="/" replace />;
};
