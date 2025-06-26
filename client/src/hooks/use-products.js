import { useState, } from 'react'
import { client } from '../client'

export const useProducts = () => {
  const [loading, setLoading] = useState(false)

  const getProducts = async (ids) => {
    try {
      setLoading(true)
      const res = await client.get('/products', { params: { ids } })
      return res.data?.data
    } catch (err) {
      alert('Failed to retrieve products.')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    getProducts,
  }
}