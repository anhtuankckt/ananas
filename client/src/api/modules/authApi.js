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


}

export default authApi