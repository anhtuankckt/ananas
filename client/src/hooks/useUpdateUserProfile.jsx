import { useState } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import userApi from '~/api/modules/userApi'
import { setUser } from '~/redux/features/authSlice'

const useUpdateUserProfile = () => {
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isChangeUpdate, setIsChangeUpdate] = useState(false)
  const dispatch = useDispatch()

  const updateProfile = async (formData) => {
    setIsUpdatingProfile(true)
    toast.success('Please wait a few seconds..')
    const { response, error } = await userApi.updateUser(formData)
    setIsUpdatingProfile(false)
    if (response) {
      toast.success('Profile updated successfully')
      dispatch(setUser(response))
      setIsChangeUpdate(prevState => !prevState)
    }

    if (error) {
      console.error(error)
      toast.error(error.error || 'Some thing went wrong')
    }
  }

  return { updateProfile, isUpdatingProfile, isChangeUpdate }
}

export default useUpdateUserProfile