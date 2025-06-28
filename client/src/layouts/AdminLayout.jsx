import { Box, Button, Grid, Stack } from "@mantine/core"
import { IconLayoutDashboard, IconPackage } from "@tabler/icons-react"
import { Outlet, useLocation, useNavigate } from "react-router"

export const AdminLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Box>
      <Grid my='xl'>
        <Grid.Col span={3}>
          <Stack>
            <Box>
              <Button
                variant='transparent'
                size='lg'
                leftSection={<IconLayoutDashboard size={20} />}
                onClick={() => navigate('/admin/dashboard')}
                style={{ opacity: location.pathname === '/admin/dashboard' ? 1 : 0.5 }}
              >
                Dashboard
              </Button>
            </Box>
            <Box>
              <Button
                variant='transparent'
                size='lg'
                leftSection={<IconPackage size={20} />}
                onClick={() => navigate('/admin/products')}
                style={{ opacity: location.pathname === '/admin/products' ? 1 : 0.5 }}
              >
                Products
              </Button>
            </Box>
          </Stack>
        </Grid.Col>
        <Grid.Col span={9}>
          <Outlet />
        </Grid.Col>
      </Grid>
    </Box>
  )
}