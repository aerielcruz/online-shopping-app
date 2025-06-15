import express from 'express'
import { permission } from '../../middlewares/permission.js'

import products from './products.js'
import categories from './categories.js'

const router = express.Router()

router.use(permission({ allowedRoles: ['admin'] }));

router.use('/products', products)
router.use('/categories', categories)


export default router