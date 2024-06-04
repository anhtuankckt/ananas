import { useEffect, useState } from 'react'
import PostSkeleton from '../skeletons/PostSkeleton'
import Post from './Post'
import postsApi from '~/api/modules/postsApi'

const Posts = ({ feedType, postUpdate }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState([])

  const handleForYou = async () => {
    const { response } = await postsApi.getAll()
    return response
  }

  const handleFollowing = async () => {
    const { response } = await postsApi.getFollowing()
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
        default:
          response = await handleForYou()
      }

      if (response) {
        setPosts(response)
      }

      setIsLoading(false)
    }

    fetchPosts()
  }, [feedType, postUpdate])

  const handlePostDelete = (postId) => {
    setPosts(posts.filter(post => post._id !== postId))
  }

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
            <Post key={post._id} post={post} onPostDeleted={handlePostDelete} />
          ))}
        </div>
      )}
    </>
  )
}

export default Posts