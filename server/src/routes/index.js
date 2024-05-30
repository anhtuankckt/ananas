import express from 'express'
import authRoute from './authRoute.js'
import userRoute from './userRoute.js'
import postRoute from './postRoute.js'
import notificationRoute from './notificationRoute.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.use('/auth', authRoute)

router.use('/users', authenticateToken, userRoute)

router.use('/posts', authenticateToken, postRoute)

router.use('/notifications', authenticateToken, notificationRoute)

export default router