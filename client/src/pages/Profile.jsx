import { Text, Box } from '@mantine/core';
import { Pressable } from '../components/Pressable';
import { ProductCard } from '../components/ProductCard'
import { useAuth } from '../hooks/use-auth';
import { Button } from '@mantine/core';
import { useUser } from '../hooks/use-user';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LoadingOverlay } from '@mantine/core';

export const Profile = () => {
  let navigate = useNavigate();
  const { logout, loading } = useAuth();
  const { user } = useUser()

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/');
  //   }
  // }, [user]);

  return (
    <Box>
      <LoadingOverlay visible={loading} />
      <h2>Profile</h2>
      <Button onClick={logout}>Logout</Button>
    </Box>
  );
}
