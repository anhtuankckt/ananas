import { Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/auth/signup/SignUpPage'
import Login from './pages/auth/login/Login'
import HomePage from './pages/home/HomePage'

import Sidebar from './components/common/Sidebar'
import RightPanel from './components/common/RightPanel'

import LoadingSpinner from './components/common/LoadingSpinner'

const App = () => {
  let isLoading = false

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <LoadingSpinner size='lg' />
      </div>
    )
  }

  return (
    <div className='flex max-w-6xl mx-auto'>
      <Sidebar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<Login />} />
      </Routes>

      <RightPanel />
    </div>
  )
}

export default App
