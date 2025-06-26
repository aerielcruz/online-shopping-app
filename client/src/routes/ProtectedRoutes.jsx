import { Navigate, Outlet } from 'react-router';
import { useUser } from '../hooks/use-user';

export const ProtectedRoutes = () => {
  const { user, loading } = useUser();

  if (loading) return null;

  return user ? <Outlet /> : <Navigate to="/" replace />;
};
