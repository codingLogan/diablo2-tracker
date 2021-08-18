import express from 'express'
import {
  authenticateUser,
  registerUser,
} from '../routeControllers/userController.js'
const router = express.Router()

router.post('/login', authenticateUser)
router.post('/', registerUser)

export default router
