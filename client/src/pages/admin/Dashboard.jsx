import { Box, Text, Button, Group, } from "@mantine/core";
import { IconLayoutDashboard, IconPackage, IconPlus } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router";

export const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box>
      <Text mb='xl' fz='h2' fw={700}>Admin Dashboard</Text>
      <Group spacing="md" mb="xl">
        <Button
          leftIcon={<IconLayoutDashboard />}
          onClick={() => navigate('/admin/dashboard')}
          variant={location.pathname === '/admin/dashboard' ? 'filled' : 'outline'}
        >
          Dashboard
        </Button>
        <Button
          leftIcon={<IconPackage />}
          onClick={() => navigate('/admin/products')}
          variant={location.pathname === '/admin/products' ? 'filled' : 'outline'}
        >
          Products
        </Button>
        <Button
          leftIcon={<IconPlus />}
          onClick={() => navigate('/admin/products/add')}
          variant={location.pathname === '/admin/products/add' ? 'filled' : 'outline'}
        >
          Add Product
        </Button>
      </Group>
    </Box>
  );
};