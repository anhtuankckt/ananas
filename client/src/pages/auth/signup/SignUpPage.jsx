import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineMail } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { MdPassword } from 'react-icons/md'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import ASvg from '~/components/svgs/ASvg'


const SignUpPage = () => {
  const [isError, setIsError] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    fullName: '',
    password: ''
  })

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='max-w-screen-xl mx-auto flex h-screen px-10'>
      <div className='flex-1 hidden lg:flex items-center justify-center'>
        <ASvg className='lg:w-2/3 fill-white' />
      </div>
      <div className='flex-1 flex flex-col justify-center items-center'>
        <form className='lg:w-2/3 mx-auto md:mx-20 flex flex-col gap-4' onSubmit={handleSubmit}>
          <ASvg className='w-24 lg:hidden fill-white' />
          <h1 className='text-4xl font-extrabold text-white'>Join today.</h1>
          <label className="input input-bordered flex items-center gap-2 rounded">
            <MdOutlineMail />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <div className='flex gap-4 flex-wrap'>
            <label className="input input-bordered flex items-center gap-2 rounded flex-1">
              <FaUser />
              <input
                type="text"
                className="grow"
                placeholder="User name"
                name='username'
                value={formData.username}
                onChange={handleInputChange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 rounded flex-1">
              <MdDriveFileRenameOutline />
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                name='fullName'
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <label className="input input-bordered flex items-center gap-2 rounded">
            <MdPassword />
            <input
              type="password"
              className='grow'
              placeholder='Password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          <button className="btn btn-primary rounded-full text-white">Sign Up</button>
          {isError && <p className='text-red-500'>Something went wrong</p>}
        </form>
        <div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
          <p className='text-white text-lg'>Already have an account?</p>
          <Link to='/login'>
            <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign in</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage