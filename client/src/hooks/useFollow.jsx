import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import authApi from '~/api/modules/authApi'
import userApi from '~/api/modules/userApi'
import { setUser } from '~/redux/features/authSlice'
import { setSuggestedUsers } from '~/redux/features/userSlice'

const useFollow = () => {
  const [isPending, setIsPending] = useState(false)
  const dispatch = useDispatch()

  const follow = useCallback(async (userId) => {
    setIsPending(true)
    const { response, error } = await userApi.follow(userId)
    setIsPending(false)
    if (response) {
      toast.success(response.message)
      const { response: suggestedResponse } = await userApi.suggested()
      const { response: authResponse } = await authApi.getMe()
      dispatch(setSuggestedUsers(suggestedResponse))
      dispatch(setUser(authResponse))
    }
    if (error) {
      console.error(error)
    }
  }, [dispatch])

  return { follow, isPending }
}

export default useFollow