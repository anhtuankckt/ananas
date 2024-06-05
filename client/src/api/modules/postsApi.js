import privateClient from '../client/privateClient'

const getPostEndPoint = {
  all: 'posts/all',
  following: 'posts/following',
  user: (username) => `posts/users/${username}`,
  likes: (userId) => `posts/likes/${userId}`
}

const postEndPoint = {
  createPost: 'posts/create',
  deletePost: (id) => `posts/${id}`,
  likeUnlikePost: (postId) => `posts/like/${postId}`,
  commentPost: (postId) => `posts/comment/${postId}`
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
  },
  getPostsUser: async (username) => {
    try {
      const response = await privateClient.get(getPostEndPoint.user(username))
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getLikes: async (userId) => {
    try {
      const response = await privateClient.get(getPostEndPoint.likes(userId))
      return { response }
    } catch (error) {
      return { error }
    }
  },
  likeUnlikePost: async (postId) => {
    try {
      const response = await privateClient.post(postEndPoint.likeUnlikePost(postId))
      return { response }
    } catch (error) {
      return { error }
    }
  },
  commentPost: async (postId, comment) => {
    try {
      const response = await privateClient.post(postEndPoint.commentPost(postId), { text: comment })
      return { response }
    } catch (error) {
      return { error }
    }
  }
}

export default postsApi