import { useState } from "react"
import { Text, Box, Stack, Paper, Container, TextInput, PasswordInput, Button } from "@mantine/core"
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/use-auth"
import { LoadingOverlay } from "../components/LoadingOverlay"

export const Login = () => {
  let navigate = useNavigate()
  const { login, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    const user = await login(email, password)
    if (user) {
      navigate('/')
    }
  }

  return (
    <Container size="xs">
      <LoadingOverlay visible={loading} />
      <Box my='xl'>
        <form onSubmit={handleLogin}>
          <Stack gap='sm'>
            <Text ta='center' size='lg' fw={500}>Login</Text>
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
            <Button type='submit' onClick={handleLogin}>Login</Button>
            <Button variant='light' onClick={() => navigate('/signup')}>Don't have an account? Create now</Button>
          </Stack>
        </form>
      </Box>
    </Container>
  )
}