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

  const createProduct = async (body) => {
    try {
      setLoading(true)
      const res = await client.post('/admin/products', body)
      return res.data?.data
    } catch (err) {
      alert('Failed to create product.')
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async (body) => {
    try {
      setLoading(true)
      const res = await client.put('/admin/products', body)
      return res.data?.data
    } catch (err) {
      alert('Failed to update product.')
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (referenceId) => {
    try {
      setLoading(true)
      return await client.delete('/admin/products', { data: { referenceId } })
    } catch (err) {
      alert('Failed to delete product.')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
  }
}