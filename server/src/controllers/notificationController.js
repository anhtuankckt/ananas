import Notification from '../models/notificationModel.js'

const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id

    const notifications = await Notification.find({ to: userId })
      .populate({
        path: 'from',
        select: 'username profileImg'
      })

    await Notification.updateMany({ to: userId }, { read: true })

    res.status(200).json(notifications)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id

    await Notification.deleteMany({ to: userId })

    res.status(200).json({ message: 'Notifications deleted successfully' })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export default {
  getNotifications,
  deleteNotifications
}