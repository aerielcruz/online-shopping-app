import express from 'express'
import categoriesController from '../controllers/categories.js'

const router = express.Router()

router.get('/', categoriesController.getCategories)

export default router