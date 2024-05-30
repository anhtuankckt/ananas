import express from 'express'
import userController from '../controllers/userController.js'
const router = express.Router()

router.get('/profile/:username', userController.getUserProfile)

router.get('/suggested', userController.getSuggestUsers)

router.post('/follow/:id', userController.followUnfollowUser)

router.post('/update', userController.updateUserProfile)

export default router