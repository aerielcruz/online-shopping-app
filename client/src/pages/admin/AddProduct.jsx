import { useState } from 'react';
import { TextInput, NumberInput, Stack, Button, Box, Textarea, Group, Text, Center, Select } from '@mantine/core';
import { useProducts } from '../../hooks/use-products';
import { BackButton } from '../../components/BackButton';
import { useNavigate } from 'react-router';
import { LoadingOverlay } from '../../components/LoadingOverlay';

export const AddProduct = () => {
  const navigate = useNavigate()
  const { createProduct, loading } = useProducts();
  const [form, setForm] = useState({
    name: '',
    label: '',
    description: '',
    price: 0,
    currency: 'NZD',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    if (confirm(`You are about to add new product: ${form.label}`)) {
      const data = await createProduct(form);
      if (data) {
        handleBack()
        setTimeout(() => alert(`Successfully added new  product: ${form.label}`), 1000)
        return
      }
      setSubmitting(false)
    }
  };

  const handleBack = () => {
    navigate('/admin/products')
  }

  return (
    <Center>
      <LoadingOverlay loading={loading} />
      <Box>
        <BackButton onClick={handleBack}>Manage Products</BackButton>
        <Text fz='h2' mb="lg" fw={700}>Add Product</Text>
        <Box maw={400}>
          <form onSubmit={handleSubmit}>
            <Stack gap={5}>
              <Text>The avatar image will be automagically generated based on the given name</Text>
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
              <Group position="right" mt="md">
                <Button type="submit" disabled={submitting}>
                  Add Product
                </Button>
              </Group>
            </Stack>
          </form>
        </Box>
      </Box>
    </Center>
  );
}