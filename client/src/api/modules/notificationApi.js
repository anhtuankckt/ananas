import privateClient from '../client/privateClient'

const notificationEndpoint = {
  getNotification: 'notifications',
  deleteNotifications: 'notifications'
}

const notificationApi = {
  notifications: async () => {
    try {
      const response = await privateClient.get(notificationEndpoint.getNotification)
      return { response }
    } catch (error) {
      return { error }
    }
  },
  deleteNotifications: async () => {
    try {
      const response = await privateClient.delete(notificationEndpoint.deleteNotifications)
      return { response }
    } catch (error) {
      return { error }
    }
  }
}

export default notificationApi