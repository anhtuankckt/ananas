import privateClient from '../client/privateClient'

const userEndpoint = {
  suggestedUsers: 'users/suggested'
}

const userApi = {
  suggestedUsers: async () => {
    try {
      const response = await privateClient.get(userEndpoint.suggestedUsers)
      return { response }
    } catch (error) {
      return { error }
    }
  }
}

export default userApi