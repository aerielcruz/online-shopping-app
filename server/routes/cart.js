import express from 'express'
import cartController from '../controllers/cart.js'

const router = express.Router()

router.get('/', cartController.getCart)
router.put('/', cartController.updateCart)
router.delete('/', cartController.deleteCart)

export default router