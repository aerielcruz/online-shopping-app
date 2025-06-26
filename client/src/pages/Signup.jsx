import { useState } from "react"
import { Text, Box, Container, Stack, TextInput, PasswordInput, Button } from "@mantine/core"
import { useNavigate } from "react-router"
import { useUser } from "../hooks/use-user"
import { LoadingOverlay } from "../components/LoadingOverlay"

export const Signup = () => {
  let navigate = useNavigate()
  const { createUser, loading } = useUser()
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    const data = {
      firstName,
      middleName,
      lastName,
      email,
      password,
    }
    const user = await createUser(data)
    if (user) {
      navigate('/')
    }
  }

  return (
    <Container size="xs">
      <LoadingOverlay visible={loading} />
      <Box my='xl'>
        <form onSubmit={handleSignup}>
          <Stack gap='sm'>
            <Text ta='center' size='lg' fw={500}>Create new account</Text>
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
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
            <PasswordInput
              label="Confirm password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.currentTarget.value)}
            />
            <Button type='submit' onClick={handleSignup}>Create new account</Button>
            <Button variant='light' onClick={() => navigate('/login')}>Already have an account? Login</Button>
          </Stack>
        </form>
      </Box>
    </Container>
  )
}