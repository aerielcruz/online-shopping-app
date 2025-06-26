import { Box, SimpleGrid, Text, Image, Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Pressable } from '../components/Pressable';
import { ProductCard } from '../components/ProductCard'
import { useEffect, useState } from 'react';
import { useProducts } from '../hooks/use-products';
import { useCart } from '../hooks/use-cart';
import { useUser } from '../hooks/use-user';

const ProductModal = ({ opened, onClose, product, isAddedToCart, handleAddToCart, handleRemoveFromCart }) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="auto"
      withCloseButton={false}
    >
      {product ? (
        <Box>
          <Image mb='sm' src={product.imageUrl} h={300} w='auto' />
          <Box mb='md'>
            <Text ta='center' size='xl' fw={500}>{product.label}</Text>
            <Text ta='center' size='xl'>{product.price} {product.currency}</Text>
            <Text>{product.description}</Text>
          </Box>
          {isAddedToCart
            ? <Button mb='sm' fullWidth onClick={() => handleRemoveFromCart(product?.referenceId)}>Remove from cart</Button>
            : <Button mb='sm' fullWidth onClick={() => handleAddToCart(product?.referenceId)}>Add to cart</Button>
          }
          <Button fullWidth variant="default" onClick={onClose}>Cancel</Button>
        </Box>
      ) : null}
    </Modal>
  )
}

export const Home = () => {
  const { user, fetchUser } = useUser()
  const { getProducts } = useProducts();
  const { cartIds, updateCart, deleteCart } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const products = await getProducts();
    setProducts(products);
  }

  const handleProduct = async (product) => {
    setSelectedProduct(product)
    open()
  }

  const handleAddToCart = async (productId) => {
    if (!user) {
      alert('Please login first to add items to your cart.');
      return;
    }
    const data = await updateCart(productId);
    if (data) {
      fetchUser()
      close()
    }
  }

  const handleRemoveFromCart = async (productId) => {
    const data = await deleteCart(productId);
    if (data) {
      fetchUser()
      close()
    }
  }

  return (
    <div>
      <ProductModal
        opened={opened}
        onClose={close}
        product={selectedProduct}
        isAddedToCart={cartIds.includes(selectedProduct?.referenceId)}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
      />
      <Box p={100} my='xl' style={{ backgroundColor: '#1A1A1A', borderRadius: '8px' }}>
        <Text ta='center' fw={700} fz={60} c='#fff'>FrameBit</Text>
        <Text ta='center' fw={700} fz={28} c='#fff'>Expression Engineered. Identity Framed.</Text>
        <Text mt='sm' ta='center' fw={700} fz={20} c='#aaa'>Your Digital Avatar Marketplace</Text>
      </Box>
      <h2>Browse</h2>
      <SimpleGrid cols={4} spacing='lg' my='xl'>
        {products.map((product, i) => {
          return (
            <Pressable key={i} onClick={() => handleProduct(product)}>
              <ProductCard
                label={product.label}
                price={`${product.price} ${product.currency}`}
                imageSrc={product.imageUrl}
                isAddedToCart={cartIds.includes(product.referenceId)}
              />
            </Pressable>
          )
        })}
      </SimpleGrid>
    </div>
  )
}
