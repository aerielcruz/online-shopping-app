import { Box } from '@mantine/core';
import classes from './css/Pressable.module.css'

export const Pressable = ({ onClick, children }) => {
  return (
    <Box
      onClick={onClick}
      className={classes.pressable}
      style={{
        display: 'inline-block',
        cursor: 'pointer',
      }}
    >
      {children}
    </Box>
  )
}