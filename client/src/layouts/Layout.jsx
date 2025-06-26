import { Header } from "../components/Header";
import { Outlet } from 'react-router';
import { Container } from '@mantine/core';
import { Footer } from "../components/Footer";

export const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}