import { Text, Image, Box, Stack } from '@mantine/core';
import { IconShoppingCartCopy } from '@tabler/icons-react';

export const ProductCard = ({ label, price, imageSrc, isAddedToCart }) => {
  return (
    <Stack gap={5}>
      <Box style={{ position: 'relative' }}>
        {isAddedToCart ? (
          <IconShoppingCartCopy
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}
            size={70}
            strokeWidth={1.5}
            color='#fff'
          />
        ) : null}
        <Image
          radius="md"
          h={200}
          w="auto"
          src={imageSrc}
          fallbackSrc="https://placehold.co/600x400?text=Image"
          style={{ filter: isAddedToCart ? 'brightness(0.15)' : 'none' }}
        />
      </Box>
      <Text fz={20} fw={500}>{label}</Text>
      <Text fz={16} fw={500}>{price}</Text>
    </Stack>
  )
}