import '@mantine/core/styles.css';
import { createTheme, MantineProvider, Container, rem } from '@mantine/core';
import { UserProvider } from './context/UserContext'
import { RouteManager } from './routes/RouteManager';

const CONTAINER_SIZES = {
  xxs: 300,
  xs: 400,
  sm: 500,
  md: 600,
  lg: 700,
  xl: 800,
  xxl: 900,
};

const theme = createTheme({
  primaryColor: 'black',
  colors: {
    black: ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000',]
  },
  components: {
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size': fluid
            ? '100%'
            : size !== undefined && size in CONTAINER_SIZES
              ? rem(CONTAINER_SIZES[size])
              : rem(size),
        },
      }),
    }),
  },
});

function App() {
  return (
    <UserProvider>
      <MantineProvider theme={theme}>
        <RouteManager />
      </MantineProvider>
    </UserProvider>
  )
}

export default App
