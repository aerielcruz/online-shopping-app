import { Navigate, Outlet } from 'react-router';
import { useUser } from '../hooks/use-user';

export const AuthRoutes = () => {
  const { user, loading } = useUser();

  if (loading) return null;

  return user ? <Navigate to="/" replace /> : <Outlet />;
};
