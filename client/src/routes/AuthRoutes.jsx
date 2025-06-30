import { Navigate, Outlet } from 'react-router';
import { useUser } from '../hooks/use-user';

export const AuthRoutes = () => {
  const { user } = useUser();
  return user && user.email ? <Navigate to="/" replace /> : <Outlet />;
};
