import express from 'express'
import notificationController from '../controllers/notificationController.js'
const router = express.Router()

router.get('/', notificationController.getNotifications)

router.delete('/', notificationController.deleteNotifications)

router.delete('/:id', notificationController.deleteNotification)

export default router