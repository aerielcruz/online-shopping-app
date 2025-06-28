import { Button } from "@mantine/core"
import { IconArrowNarrowLeft } from '@tabler/icons-react'

export const BackButton = (props) => {
  return (
    <Button variant="transparent" leftSection={<IconArrowNarrowLeft />} {...props} />
  )
}