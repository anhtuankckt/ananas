import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineMail } from 'react-icons/md'
import { MdPassword } from 'react-icons/md'
import ASvg from '~/components/svgs/ASvg'
import authApi from '~/api/modules/authApi'
import { setUser } from '~/redux/features/authSlice'
import { useDispatch } from 'react-redux'

const Login = () => {
  const [isError, setIsError] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { response, error } = await authApi.login(formData)
    if (response) {
      dispatch(setUser(response))
      setFormData({
        username: '',
        password: ''
      })
      navigate('/')
    }

    if (error) setIsError(error.error)
  }


  return (
    <div className='max-w-screen-xl mx-auto flex h-screen'>
      <div className='flex-1 hidden lg:flex items-center justify-center'>
        <ASvg className='lg:w-2/3 fill-white' />
      </div>
      <div className='flex-1 flex flex-col justify-center items-center'>
        <form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
          <ASvg className='w-24 lg:hidden fill-white' />
          <h1 className='text-4xl font-extrabold text-white'>{"Let's"} go.</h1>
          <label className="input input-bordered flex items-center gap-2 rounded">
            <MdOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="User name"
              name='username'
              value={formData.username}
              onChange={handleInputChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 rounded">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name='password'
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>

          <button className='btn btn-primary rounded-full text-white'>Login</button>
          {isError && <p className='text-red-500'>{isError}</p>}
        </form>

        <div className='flex flex-col gap-2 mt-4'>
          <p className='text-lg text-white'>{"Don't"} have an account?</p>
          <Link to='/signup'>
            <button className='btn btn-primary text-white rounded-full w-full btn-outline'>Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login