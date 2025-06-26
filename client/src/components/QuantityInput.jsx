import { useState } from 'react';
import { Button, Group, Input } from '@mantine/core';
import { IconMinus, IconPlus, } from '@tabler/icons-react';

export const QuantityInput = ({ value, onChange, min = 1 }) => {
  const handleChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue >= min) {
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  return (
    <Group gap={0}>
      <Button variant="transparent" onClick={handleDecrement} disabled={value <= min} style={{ background: 'transparent' }}>
        <IconMinus size={16} />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        style={{ width: '60px', textAlign: 'center' }}
      />
      <Button variant="transparent" onClick={handleIncrement} style={{ background: 'transparent' }}>
        <IconPlus size={16} />
      </Button>
    </Group>
  )
}