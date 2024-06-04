import privateClient from '../client/privateClient'

const getPostEndPoint = {
  all: 'posts/all',
  following: 'posts/following'
}

const postEndPoint = {
  createPost: 'posts/create',
  deletePost: (id) => `posts/${id}`,
  commentOnPost: '',
  getLikedPosts: ''
}

const postsApi = {
  getAll: async () => {
    try {
      const response = await privateClient.get(getPostEndPoint.all)
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getFollowing: async () => {
    try {
      const response = await privateClient.get(getPostEndPoint.following)
      return { response }
    } catch (error) {
      return { error }
    }
  },
  deletePost: async (id) => {
    try {
      const response = await privateClient.delete(postEndPoint.deletePost(id))
      return { response }
    } catch (error) {
      return { error }
    }
  },
  createPost: async ({ text, img }) => {
    try {
      const response = await privateClient.post(postEndPoint.createPost, { text, img })
      return { response }
    } catch (error) {
      return { error }
    }
  }
}

export default postsApi