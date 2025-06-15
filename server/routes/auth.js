import express from 'express'
import { passport } from '../middlewares/passport.js'
import authController from '../controllers/auth.js'

const router = express.Router()

router.post('/', passport.authenticate('local'), authController.login)
router.delete('/', authController.logout);

export default router