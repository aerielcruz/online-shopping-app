
import { LoadingOverlay as MantineLoadingOverlay } from '@mantine/core';

export const LoadingOverlay = ({ visible }) => {
  return (
    <MantineLoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
  )
}