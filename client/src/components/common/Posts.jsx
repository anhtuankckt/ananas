import { useEffect, useState } from 'react'
import PostSkeleton from '../skeletons/PostSkeleton'
import Post from './Post'
import postsApi from '~/api/modules/postsApi'

const Posts = ({ feedType, postUpdate, username, userId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState([])

  const updateDeletePost = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post._id !== postId))
  }

  const updateLikePost = (postId, updatedLikes) => {
    setPosts(prevPosts => prevPosts.map(post => post._id === postId ? { ...post, likes: updatedLikes } : post))
  }

  const updateCommentPost = (postId, commentUpdate) => {
    setPosts(prevPosts => prevPosts.map(post => post._id === postId ? { ...post, comments: commentUpdate.comments } : post))
  }

  const handleForYou = async () => {
    const { response } = await postsApi.getAll()
    return response
  }

  const handleFollowing = async () => {
    const { response } = await postsApi.getFollowing()
    return response
  }

  const handleUser = async () => {
    const { response } = await postsApi.getPostsUser(username)
    return response
  }

  const handleLikes = async () => {
    const { response } = await postsApi.getLiked(userId)
    return response
  }

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      let response

      switch (feedType) {
        case 'forYou':
          response = await handleForYou()
          break
        case 'following':
          response = await handleFollowing()
          break
        case 'posts':
          response = await handleUser()
          break
        case 'likes':
          response = await handleLikes()
          break
        default:
          response = await handleForYou()
      }

      if (response) {
        setPosts(response)
      }

      setIsLoading(false)
    }

    fetchPosts()
  }, [feedType, postUpdate, username, userId])

  return (
    <>
      {(isLoading) && (
        <div className='flex flex-col justify-center'>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}

      {!isLoading && posts?.length === 0 && (
        <p className='text-center my-4'>No posts in this tab. Switch 👻</p>
      )}

      {!isLoading && posts && (
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} updateDeletePost={updateDeletePost} updateLikePost={updateLikePost} updateCommentPost={updateCommentPost} />
          ))}
        </div>
      )}
    </>
  )
}

export default Posts