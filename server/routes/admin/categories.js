import express from 'express'
import categoriesController from '../../controllers/admin/categories.js'

const router = express.Router()

router.post('/', categoriesController.createCategory)
router.put('/', categoriesController.updateCategory)
router.delete('/', categoriesController.deleteCategory)

export default router