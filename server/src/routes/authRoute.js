import express from 'express'
const router = express.Router()
import authController from '../controllers/authController.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'

router.get('/me', authenticateToken, authController.getMe)

router.post('/signup', authController.signup)

router.post('/login', authController.login)

router.get('/logout', authController.logout)

export default router