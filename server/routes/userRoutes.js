import express from 'express'
import { authenticateUser } from '../routeControllers/userController.js'
const router = express.Router()

router.post('/login', authenticateUser)

export default router
