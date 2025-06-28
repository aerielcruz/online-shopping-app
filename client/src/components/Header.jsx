import { useState } from "react";
import { useNavigate } from "react-router";
import {
  IconLayoutDashboard,
  IconUserCircle,
  IconBook,
  IconChartPie3,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from '@tabler/icons-react';
import {
  useMantineTheme,
  Anchor,
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  Avatar,
  Burger,
  Container,
  Menu,
  Tabs,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './css/Header.module.css';
import { Logo } from './Logo';
import { useUser } from "../hooks/use-user";
import { useAuth } from "../hooks/use-auth";
import { Pressable } from "./Pressable";

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

const ProfileMenu = ({ userMenuOpened, setUserMenuOpened }) => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { logout, loading } = useAuth();
  const { user } = useUser()

  const handleAdminDashboard = () => {
    setUserMenuOpened(false);
    navigate('/admin/dashboard');
  };

  const handleSettings = () => {
    setUserMenuOpened(false);
    navigate('/settings');
  };

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <Button variant="default" leftSection={<IconUserCircle size={16} />} rightSection={<IconChevronDown size={16} />}>
          {user.firstName}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<IconLayoutDashboard size={16} stroke={1.5} />} onClick={handleAdminDashboard}>
          Go to Admin Dashboard
        </Menu.Item>
        <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />} onClick={handleSettings}>
          Account Settings
        </Menu.Item>
        <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />} onClick={logout}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu >
  )
}

export function Header() {
  let navigate = useNavigate();
  const { user } = useUser()
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box style={{ position: 'sticky', top: 0, zIndex: 100, }}>
      <Box>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <Logo style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />

            {user ? (
              <Group visibleFrom="sm">
                <Button variant="default" onClick={() => navigate('/cart')}>Cart ({user.cart?.length})</Button>
                <ProfileMenu userMenuOpened={userMenuOpened} setUserMenuOpened={setUserMenuOpened} />
              </Group>
            ) : (
              <Button variant="default" onClick={() => navigate('/login')}>Log in</Button>
            )}

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h="calc(100vh - 80px" mx="-md">
            <Divider my="sm" />

            <a href="#" className={classes.link}>
              Home
            </a>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Features
                </Box>
                <IconChevronDown size={16} color={theme.colors.blue[6]} />
              </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>

            <Divider />

            <Group justify="center" grow pb="xl" px="md">
              <Button variant="default">Log in</Button>
              <Button>Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    </Box>
  );
}