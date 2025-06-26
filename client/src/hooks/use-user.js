import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { client } from '../client'

export const useUser = () => {
  const { user, setUser } = useContext(UserContext)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    try {
      setLoading(true)
      const res = await client.get('/users')
      setUser(res.data.data)
    } catch (err) {
      alert('Failed to retrieve user information.')
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (data) => {
    try {
      setLoading(true)
      const res = await client.post('/users', data)
      setUser(res.data.data)
    } catch (err) {
      alert('Failed to create new account.')
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async (data) => {
    try {
      setLoading(true)
      const res = await client.put('/users', data)
      setUser(res.data.data)
    } catch (err) {
      alert('Failed to update user.')
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    fetchUser,
    createUser,
    updateUser
  }
}