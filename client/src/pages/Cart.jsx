import { useEffect, useState } from 'react';
import { Box, SimpleGrid, Divider, Group, Text, Center, Image, Modal, Button, LoadingOverlay, Stack } from '@mantine/core';
import { useUser } from '../hooks/use-user';
import { useCart } from '../hooks/use-cart';

const CartItem = ({ product, fetchCart }) => {
  const { deleteCart, loading } = useCart();

  const handleDelete = async () => {
    const data = await deleteCart(product?.referenceId);
    if (data) {
      fetchCart()
    }
  }

  return (
    <Box>
      <SimpleGrid cols={4} gap='md' mb='md'>
        <Center>
          <Image src={product.imageUrl} h={100} w='auto' />
        </Center>
        <Center>
          <Text fw={500}>{product.label}</Text>
        </Center>
        <Center>
          <Text fw={500}>{product.price} {product.currency}</Text>
        </Center>
        <Center>
          <Button variant='default' onClick={handleDelete} disabled={loading}>{loading ? 'Deleting...' : 'Delete'}</Button>
        </Center>
      </SimpleGrid>
    </Box>
  )
}

export const Cart = () => {
  const { user, loading: userLoading } = useUser();
  const { getCart } = useCart();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const cart = await getCart();
    setCart(cart);
  }

  const handleCheckout = () => {
    alert('Checkout functionality is not implemented for this project.');
  }

  const total = cart.length ? cart.reduce((sum, product) => sum + product.price, 0) : 0;

  if (userLoading) return null;

  return (
    <div>
      <h2>Cart</h2>
      <SimpleGrid cols={4} gap='md' mb='md'>
        <Text ta='center' fw={500}>Avatar</Text>
        <Text ta='center' fw={500}>Name</Text>
        <Text ta='center' fw={500}>Price</Text>
        <Text ta='center' fw={500}>Actions</Text>
      </SimpleGrid>
      <Stack gap='md'>
        {cart.length ? cart.map((product, i) => {
          return <CartItem key={i} product={product} fetchCart={fetchCart} />
        }) : null}
      </Stack>
      <Divider my='md' />
      <Box m='xl'>
        <Group justify="flex-end">
          <Text fz='xl' fw={500}>{total} NZD</Text>
          <Button onClick={handleCheckout}>Checkout</Button>
        </Group>
      </Box>
    </div>
  );
}
