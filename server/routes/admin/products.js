import express from 'express'
import productsController from '../../controllers/admin/products.js'

const router = express.Router()

router.post('/', productsController.createProduct)
router.put('/', productsController.updateProduct)
router.delete('/', productsController.deleteProduct)

export default router