import { useState, useContext } from 'react'
import { client } from '../client'
import { UserContext } from '../context/UserContext'

export const useCart = () => {
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const cartIds = user?.cart?.map(item => item.productId) || []

  const getCart = async () => {
    try {
      setLoading(true)
      const res = await client.get('/cart')
      return res.data.data
    } catch (err) {
      alert('Failed to retreive cart items.')
    } finally {
      setLoading(false)
    }
  }

  const updateCart = async (productId) => {
    try {
      setLoading(true)
      const res = await client.put('/cart', { productId })
      return res.data.data
    } catch (err) {
      alert('Failed to update cart item.')
    } finally {
      setLoading(false)
    }
  }

  const deleteCart = async (productId) => {
    try {
      setLoading(true)
      const res = await client.delete('/cart', { data: { productId } })
      return res.data.data
    } catch (err) {
      alert('Failed to delete product from cart.')
    } finally {
      setLoading(false)
    }
  }

  return {
    cartIds,
    loading,
    getCart,
    updateCart,
    deleteCart,
  }
}