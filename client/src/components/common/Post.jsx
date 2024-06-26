import { FaRegComment } from "react-icons/fa"
import { BiRepost } from "react-icons/bi"
import { FaRegHeart } from "react-icons/fa"
import { FaRegBookmark } from "react-icons/fa6"
import { FaTrash } from "react-icons/fa"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import { formatPostDate } from '~/utils/date'
import { useSelector } from 'react-redux'
import postsApi from '~/api/modules/postsApi'
import LoadingSpinner from './LoadingSpinner'

const Post = ({ post, updateDeletePost, updateLikePost, updateCommentPost }) => {
  const { authUser } = useSelector(state => state.auth)
  const [comment, setComment] = useState('')
  const [isLiking, setIsLiking] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCommenting, setIsCommenting] = useState(false)
  const postOwner = post.user
  const formattedDate = formatPostDate(post.createdAt)
  const isLiked = post.likes.includes(authUser._id)

  const isMyPost = authUser._id === post.user._id

  const deletePost = async (postId) => {
    setIsDeleting(true)
    const { response, error } = await postsApi.deletePost(postId)
    setIsDeleting(false)
    if (response) {
      updateDeletePost(postId)
      toast.success('Post deleted successfully')
    }
    if (error) {
      console.error(error)
      toast.success(error)
    }
  }

  const handleLikeUnlikePost = async (postId) => {
    setIsLiking(true)
    const { response, error } = await postsApi.likeUnlikePost(postId)
    setIsLiking(false)
    if (response) {
      updateLikePost(postId, response)
    }

    if (error) {
      console.error(error)
    }
  }

  const handleCommentPost = async (e, postId) => {
    e.preventDefault()
    setIsCommenting(true)
    const { response, error } = await postsApi.commentPost(postId, comment)
    setIsCommenting(false)

    if (response) {
      setComment('')
      document.getElementById('comments_modal' + postId).close()
      updateCommentPost(postId, response)
      toast.success('Comment posted successfully')
    }

    if (error) {
      console.error(error)
      document.getElementById('comments_modal' + postId).close()
      toast.error('Something went wrong')
    }

  }

  return (
    <>
      <div className='flex gap-2 items-start p-4 border-b border-gray-700'>
        <div className='avatar'>
          <Link to={`/profile/${postOwner.username}`} className='w-8 rounded-full overflow-hidden'>
            <img src={postOwner.profileImg || '/avatar-placeholder.png'} alt="" /></Link>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-2 items-center'>
            <Link to={`/profile/${postOwner.username}`} className='font-bold'>
              {postOwner.fullName}
            </Link>
            <span className='text-gray-700 flex gap-1 text-sm'>
              <Link to={`/profile/${postOwner.username}`}>@{postOwner.username}</Link>
              <span>.</span>
              <span>{formattedDate}</span>
            </span>

            {isMyPost && (
              <span className='flex justify-end flex-1'>
                {!isDeleting && (
                  <FaTrash className='cursor-pointer hover:text-red-500' onClick={() => deletePost(post._id)} />
                )}

                {isDeleting && <LoadingSpinner size='sm' />}
              </span>
            )}
          </div>

          <div className='flex flex-col gap-3 overflow-hidden'>
            <span>{post.text}</span>
            {post.img && (
              <img
                src={post.img}
                className='h-80 object-contain rounded-lg border border-gray-700'
                alt=''
              />
            )}
          </div>

          <div className='flex justify-between mt-3'>
            <div className='flex gap-4 items-center w-2/3 justify-between'>
              <div className='flex gap-1 items-center cursor-pointer group' onClick={() => document.getElementById('comments_modal' + post._id).showModal()}>
                <FaRegComment className='w-4 h-4 text-slate-500 group-hover:text-sky-400' />
                <span className='text-sm text-slate-500 group-hover:text-sky-400'>
                  {post.comments.length}
                </span>
              </div>

              {/* Using Model Component from DaisyUI */}
              <dialog id={`comments_modal${post._id}`} className='modal border-none outline-none'>
                <div className='modal-box rounded border border-gray-600'>
                  <h3 className='font-bold text-lg mb-4'>COMMENTS</h3>
                  <div className='flex flex-col gap-3 max-h-60 overflow-auto'>
                    {post.comments.length === 0 && (
                      <p className='text-sm text-slate-500'>
                        No comments yet 🤔 Be the first one 😉
                      </p>
                    )}
                    {post.comments.map((comment) => (
                      <div key={comment._id} className='flex gap-2 items-start'>
                        <div className='avatar'>
                          <div className='w-8 rounded-full'>
                            <img
                              src={comment.user.profileImg || "/avatar-placeholder.png"}
                            />
                          </div>
                        </div>
                        <div className='flex flex-col'>
                          <div className='flex items-center gap-1'>
                            <span className='font-bold'>{comment.user.fullName}</span>
                            <span className='text-gray-700 text-sm'>
                              @{comment.user.username}
                            </span>
                          </div>
                          <div className='text-sm'>{comment.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form
                    className='flex gap-2 items-center mt-4 border-t border-gray-600 pt-2'
                  >
                    <textarea
                      className='textarea w-full rounded text-md resize-none border focus:outline border-gray-800'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className='btn btn-primary rounded-full btn-sm text-white px-4' onClick={(e) => handleCommentPost(e, post._id)}>
                      {isCommenting ? <LoadingSpinner size='md' />
                        : 'Post'}
                    </button>
                  </form>
                </div>
                <form method='dialog' className='modal-backdrop'>
                  <button className='outline-none'>close</button>
                </form>
              </dialog>

              <div className='flex gap-1 items-center group cursor-pointer'>
                <BiRepost className='w-6 h-6  text-slate-500 group-hover:text-green-500' />
                <span className='text-sm text-slate-500 group-hover:text-green-500'>0</span>
              </div>

              <div className='flex gap-1 items-center group cursor-pointer' onClick={() => handleLikeUnlikePost(post._id)}>
                {isLiking && <LoadingSpinner size='sm' />}
                {!isLiked && !isLiking && (
                  <FaRegHeart className='w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500' />
                )}
                {isLiked && !isLiking && (
                  <FaRegHeart className='w-4 h-4 cursor-pointer text-pink-500 ' />
                )}

                <span
                  className={`text-sm  group-hover:text-pink-500 ${isLiked ? "text-pink-500" : "text-slate-500"
                    }`}
                >
                  {post.likes.length}
                </span>
              </div>

              <div className='flex w-1/3 justify-end gap-2 items-center'>
                <FaRegBookmark className='w-4 h-4 text-slate-500 cursor-pointer' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post