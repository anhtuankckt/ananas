import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import authApi from '~/api/modules/authApi'
import userApi from '~/api/modules/userApi'
import { setUser } from '~/redux/features/authSlice'

const useFollow = () => {
  const dispatch = useDispatch()
  const [isPending, setIsPending] = useState(false)
  const [isChangeFollow, setIsChangeFollow] = useState(false)
  const follow = async (userId) => {
    setIsPending(true)
    const { response, error } = await userApi.follow(userId)
    setIsPending(false)
    if (response) {
      toast.success(response.message)
      const { response: authResponse } = await authApi.getMe()
      dispatch(setUser(authResponse))
      setIsChangeFollow(prev => !prev)
    }
    if (error) {
      console.error(error)
    }
  }

  return { follow, isPending, isChangeFollow }
}

export default useFollow