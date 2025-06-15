import express from 'express'
import usersController from '../controllers/users.js'

const router = express.Router()

router.get('/', usersController.getUser)
router.post('/', usersController.createUser)
router.put('/', usersController.updateUser)

export default router