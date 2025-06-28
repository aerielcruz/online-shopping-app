import express from 'express'
import { permission } from '../../middlewares/permission.js'

import products from './products.js'

const router = express.Router()

router.use(permission({ allowedRoles: ['admin'] }));

router.use('/products', products)


export default router