import Post from './Post'
import PostSkeleton from '../skeletons/PostSkeleton'
import { useState } from 'react'

import { POSTS } from '~/utils/db/dummy'

const Posts = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefetching, setIsRefetching] = useState(false)

  const posts = POSTS

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className='flex flex-col justify-center'>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}

      {!isLoading && !isRefetching && posts?.length === 0 && (
        <p className='text-center my-4'>No posts in this tab. Switch 👻</p>
      )}

      {!isLoading && !isRefetching && posts && (
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  )
}

export default Posts