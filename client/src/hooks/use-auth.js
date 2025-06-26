import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { client } from '../client'

export const useAuth = () => {
  const { setUser } = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    try {
      setLoading(true)
      const body = {
        email,
        password
      }
      const res = await client.post('/auth', body)
      const user = res.data.data
      setUser(user)
      return user
    } catch (err) {
      alert('Failed to login. Wrong email or password.')
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await client.delete('/auth')
      setUser(null)
    } catch (err) {
      alert('Failed to logout. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    login,
    logout,
  }
}