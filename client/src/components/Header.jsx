import { useState } from "react";
import { useNavigate } from "react-router";
import {
  IconLayoutDashboard,
  IconUserCircle,
  IconChevronDown,
  IconLogout,
  IconSettings,
} from '@tabler/icons-react';
import {
  Box,
  Button,
  Drawer,
  Stack,
  Group,
  ScrollArea,
  Burger,
  Menu,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './css/Header.module.css';
import { Logo } from './Logo';
import { useUser } from "../hooks/use-user";
import { useAuth } from "../hooks/use-auth";

const ProfileMenu = ({ handleNavigate, handleLogout }) => {
  const { user } = useUser()
  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      withinPortal
    >
      <Menu.Target>
        <Button variant="default" leftSection={<IconUserCircle size={16} />} rightSection={<IconChevronDown size={16} />}>
          {user.firstName}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {user.role === 'admin' ? (
          <Menu.Item leftSection={<IconLayoutDashboard size={16} stroke={1.5} />} onClick={() => handleNavigate('/admin/dashboard')}>
            Go to Admin Dashboard
          </Menu.Item>
        ) : null}
        <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />} onClick={() => handleNavigate('/settings')}>
          Account Settings
        </Menu.Item>
        <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />} onClick={handleLogout}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu >
  )
}

export function Header() {
  let navigate = useNavigate();
  const { logout } = useAuth();
  const { user } = useUser()
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const handleNavigate = (to) => {
    navigate(to)
    closeDrawer()
  }

  const handleLogout = () => {
    logout()
    closeDrawer()
  }

  return (
    <Box style={{ position: 'sticky', top: 0, zIndex: 100, }}>
      <Box>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <Group>
              <Logo style={{ cursor: 'pointer' }} onClick={() => handleNavigate('/')} />
              <Button visibleFrom="sm" variant="default" onClick={() => handleNavigate('/')}>Browse</Button>
            </Group>

            {user && user.email ? (
              <Group visibleFrom="sm">
                <Button variant="default" onClick={() => handleNavigate('/cart')}>Cart ({user.cart?.length})</Button>
                <ProfileMenu handleNavigate={handleNavigate} handleLogout={handleLogout} />
              </Group>
            ) : (
              <Button visibleFrom="sm" variant="default" onClick={() => handleNavigate('/login')}>Log in</Button>
            )}

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title={<Logo style={{ cursor: 'pointer' }} onClick={() => handleNavigate('/')} />}
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h="calc(100vh - 80px" mx="-md">
            {user ? (
              <Stack m='xl'>
                <Button fullWidth variant="default" onClick={() => handleNavigate('/')}>Browse</Button>
                <Button fullWidth variant="default" onClick={() => handleNavigate('/cart')}>Cart ({user.cart?.length})</Button>
                {user.role === 'admin' ? <Button fullWidth variant="default" onClick={() => handleNavigate('/admin/dashboard')}>Go to Admin Dashboard</Button> : null}
                <Button fullWidth variant="default" onClick={() => handleNavigate('/settings')}>Account Settings</Button>
                <Button fullWidth variant="default" onClick={handleLogout}>Logout</Button>
              </Stack>
            ) : (
              <Box m='xl'>
                <Button fullWidth variant="default" onClick={() => handleNavigate('/login')}>Log in</Button>
              </Box>
            )}
          </ScrollArea>
        </Drawer>
      </Box>
    </Box >
  );
}