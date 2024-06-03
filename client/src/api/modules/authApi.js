import publicClient from '../client/publicClient'
import privateClient from '../client/privateClient'

const authEnpoints = {
  login: 'auth/login',
  signup: 'auth/signup',
  getMe: 'auth/me'
}

const authApi = {
  login: async ({ username, password }) => {
    try {
      const response = await publicClient.post(authEnpoints.login, { username, password })
      return { response }
    } catch (error) {
      return { error }
    }
  },
  signup: async ({ username, email, password, fullName }) => {
    try {
      const response = await publicClient.post(authEnpoints.signup, { username, email, password, fullName })
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getMe: async () => {
    try {
      const response = await privateClient.get(authEnpoints.getMe)
      return { response }
    } catch (error) {
      return { error }
    }
  }
}

export default authApi