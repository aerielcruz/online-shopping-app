import { useState, } from 'react'
import { client } from '../client'

export const useCategories = () => {
  const [loading, setLoading] = useState(false)

  const getCategories = async () => {
    try {
      setLoading(true)
      const res = await client.post('/categories', body)
      return res.data?.data
    } catch (err) {
      alert('Failed to retrieve categories.')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    getCategories,
  }
}