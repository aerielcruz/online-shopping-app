import { useState } from 'react';
import { Box, Stack, Container, TextInput } from '@mantine/core';
import { Button } from '@mantine/core';
import { useUser } from '../hooks/use-user';
import { LoadingOverlay } from '../components/LoadingOverlay';

export const Settings = () => {
  const { user, fetchUser, updateUser, loading } = useUser()
  const [firstName, setFirstName] = useState(user.firstName || '')
  const [middleName, setMiddleName] = useState(user.middleName || '')
  const [lastName, setLastName] = useState(user.lastName || '')
  const [email, setEmail] = useState(user.email || '')

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (confirm(`You are about update your account details. Confirm?`)) {
      const data = {
        firstName,
        middleName,
        lastName,
        email,
      }
      const user = await updateUser(data)
      if (user) {
        fetchUser()
        setTimeout(() => alert(`Successfully updated account details!`), 1000)
      }
    }
  }

  return (
    <Container size="xs">
      <LoadingOverlay visible={loading} />
      <h2>Account Settings</h2>
      <Box my='xl'>
        <form onSubmit={handleUpdate}>
          <Stack gap='sm'>
            <TextInput
              label="First name"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(event) => setFirstName(event.currentTarget.value)}
            />
            <TextInput
              label="Middle name (Optional)"
              placeholder="Enter your middle name"
              value={middleName}
              onChange={(event) => setMiddleName(event.currentTarget.value)}
            />
            <TextInput
              label="Last name"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(event) => setLastName(event.currentTarget.value)}
            />
            <TextInput
              label="Email address"
              placeholder="Enter your email address"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <Button type='submit'>Update details</Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
