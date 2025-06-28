import { useState, useEffect } from 'react';
import { Box, Group, Text, Image, ScrollArea, Table, Drawer, Stack, TextInput, NumberInput, Select, Button, Center } from '@mantine/core';
import { useProducts } from '../../hooks/use-products';
import { useNavigate } from 'react-router';
import { IconRefresh } from '@tabler/icons-react'
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { useDisclosure } from '@mantine/hooks';

const stickyThStyle = {
  position: 'sticky',
  top: 0,
  background: 'white',
  zIndex: 2,
};

const ManageProductDrawer = ({ opened, onClose, product, handleUpdateProduct, handleDeleteProduct }) => {
  if (!product) return null

  const [form, setForm] = useState({});

  // Reset form when product changes
  useEffect(() => {
    setForm({
      name: product.name || '',
      label: product.label || '',
      description: product.description || '',
      price: product.price || 0,
      currency: product.currency || 'NZD',
    });
  }, [product]);

  const handleChange = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Drawer position='right' offset={8} radius="md" opened={opened} onClose={onClose} title="Manage Product">
      <Stack gap={5}>
        <Center>
          <Image src={product.imageUrl} w={200} radius='md' />
        </Center>
        <TextInput
          label="Name"
          placeholder='Enter name'
          value={form.name}
          onChange={(e) => handleChange('name')(e.target.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Label"
          placeholder='Enter label'
          value={form.label}
          onChange={(e) => handleChange('label')(e.target.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Description"
          placeholder='Enter description'
          value={form.description}
          onChange={(e) => handleChange('description')(e.target.value)}
          mb="sm"
        />
        <NumberInput
          label="Price"
          value={form.price}
          onChange={handleChange('price')}
          required
          min={0}
          mb="sm"
        />
        <Select
          label="Currency"
          data={['NZD']}
          value={form.currency}
          onChange={handleChange('currency')}
          disabled
          required
          mb="sm"
        />
        <Button onClick={() => handleUpdateProduct({ referenceId: product.referenceId, ...form })}>Update Product</Button>
        <Button variant='default' fullWidth onClick={() => handleDeleteProduct(product)}>Delete Product</Button>
      </Stack>
    </Drawer>
  )
}

export const Products = () => {
  const navigate = useNavigate()
  const { getProducts, updateProduct, deleteProduct, loading } = useProducts();
  const [products, setProducts] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const products = await getProducts();
    setProducts(products);
  }

  const handleAddProduct = () => {
    navigate('/admin/products/add')
  }

  const handleManage = (product) => {
    setSelectedProduct(product)
    open()
  }

  const handleUpdateProduct = async (product) => {
    if (confirm(`You are about to update product: ${product.label}`)) {
      const data = await updateProduct(product)
      if (data) {
        close()
        fetchProducts()
        setTimeout(() => alert(`Successfully updated product: ${product.label}`), 1000)
      }
    }
  }

  const handleDeleteProduct = async (product) => {
    if (confirm(`You are about to delete product: ${product.label}`)) {
      const res = await deleteProduct(product.referenceId)
      if (res) {
        close()
        fetchProducts()
        setTimeout(() => alert(`Successfully deleted product: ${product.label}`), 1000)
      }
    }
  }

  const rows = products.map((product, i) => (
    <Table.Tr key={i}>
      <Table.Td><Text fw={500}>{i + 1}</Text></Table.Td>
      <Table.Td>
        <Image src={product.imageUrl} w={80} radius='sm' />
      </Table.Td>
      <Table.Td>{product.name}</Table.Td>
      <Table.Td>{product.label}</Table.Td>
      <Table.Td>{product.description}</Table.Td>
      <Table.Td>{`${product.price} ${product.currency}`}</Table.Td>
      <Table.Td>
        <Button variant='default' size='xs' onClick={() => handleManage(product)}>Manage</Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box>
      <LoadingOverlay visible={loading} />
      <ManageProductDrawer
        opened={opened}
        onClose={close}
        product={selectedProduct}
        handleUpdateProduct={handleUpdateProduct}
        handleDeleteProduct={handleDeleteProduct}
      />
      <Group mb='xl' justify="space-between">
        <Text fz='h2' fw={700}>Manage Products ({products.length})</Text>
        <Group gap='xs'>
          <Button variant='transparent' onClick={fetchProducts}>
            <IconRefresh />
          </Button>
          <Button onClick={handleAddProduct}>Add Product</Button>
        </Group>
      </Group>
      <ScrollArea h={500}>
        <Table withRowBorders={false}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={stickyThStyle}></Table.Th>
              <Table.Th style={stickyThStyle}>Image</Table.Th>
              <Table.Th style={stickyThStyle}>Name</Table.Th>
              <Table.Th style={stickyThStyle}>Label</Table.Th>
              <Table.Th style={stickyThStyle}>Description</Table.Th>
              <Table.Th style={stickyThStyle}>Price</Table.Th>
              <Table.Th style={stickyThStyle}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Box>
  )
}