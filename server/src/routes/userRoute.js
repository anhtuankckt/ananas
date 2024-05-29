import express from 'express'
import userController from '../controllers/userController.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.get('/profile/:username', authenticateToken, userController.getUserProfile)

router.get('/suggested', authenticateToken, userController.getSuggestUsers)

router.post('/follow/:id', authenticateToken, userController.followUnfollowUser)

router.post('/update', authenticateToken, userController.updateUserProfile)

export default router