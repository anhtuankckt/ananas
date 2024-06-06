import privateClient from '../client/privateClient'

const userEndpoint = {
  suggested: 'users/suggested',
  follow: (userId) => `users/follow/${userId}`,
  userProfile: (username) => `users/profile/${username}`,
  updateUser: 'users/update'
}

const userApi = {
  suggested: async () => {
    try {
      const response = await privateClient.get(userEndpoint.suggested)
      return { response }
    } catch (error) {
      return { error }
    }
  },
  follow: async (userId) => {
    try {
      const response = await privateClient.post(userEndpoint.follow(userId))
      return { response }
    } catch (error) {
      return { error }
    }
  },
  userProfile: async (username) => {
    try {
      const response = await privateClient.get(userEndpoint.userProfile(username))
      return { response }
    } catch (error) {
      return { error }
    }
  },
  updateUser: async (formData) => {
    try {
      const response = await privateClient.post(userEndpoint.updateUser, formData)
      return { response }
    } catch (error) {
      return { error }
    }
  }
}

export default userApi