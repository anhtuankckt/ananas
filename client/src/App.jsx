import { Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/auth/signup/SignUpPage'
import Login from './pages/auth/login/Login'
import HomePage from './pages/home/HomePage'

const App = () => {

  return (
    <div className='flex max-w-6xl mx-auto'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
