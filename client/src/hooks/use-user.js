import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { client } from '../client'

export const useUser = () => {
  const { user, setUser } = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const fetchUser = async () => {
    try {
      setLoading(true)
      const res = await client.get('/users')
      setUser(res.data.data)
      return res.data.data
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (body) => {
    try {
      setLoading(true)
      const res = await client.post('/users', body)
      setUser(res.data.data)
      return res.data.data
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to create new account.'
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async (body) => {
    try {
      setLoading(true)
      const res = await client.put('/users', body)
      setUser(res.data.data)
      return res.data.data
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