import express from 'express'

import admin from './admin/index.js'
import auth from './auth.js'
import users from './users.js'
import cart from './cart.js'
import products from './products.js'
import categories from './categories.js'

const router = express.Router()

router.use('/admin', admin)
router.use('/auth', auth)
router.use('/users', users)
router.use('/cart', cart)
router.use('/products', products)
router.use('/categories', categories)

export default router