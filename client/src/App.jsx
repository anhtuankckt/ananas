import { Route, Routes } from 'react-router-dom'
import routes from './routes/routes'
import CheckLogged from './components/common/CheckLogged'
import ProtectedPage from './components/common/ProtectedPage'
import Sidebar from './components/common/Sidebar'
import RightPanel from './components/common/RightPanel'
import { Toaster } from 'react-hot-toast'
// import LoadingSpinner from './components/common/LoadingSpinner'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import authApi from './api/modules/authApi'
import { setUser } from './redux/features/authSlice'

const App = () => {
  const { authUser } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [isFetchData, setIsFetchData] = useState(true)
  // let isLoading = false

  // if (isLoading) {
  //   return (
  //     <div className='h-screen flex justify-center items-center'>
  //       <LoadingSpinner size='lg' />
  //     </div>
  //   )
  // }

  useEffect(() => {
    const fetchAuthUser = async () => {
      const { response, error } = await authApi.getMe()
      setIsFetchData(false)
      if (response) dispatch(setUser(response))
      if (error) dispatch(setUser(null))
    }
    if (isFetchData) {
      fetchAuthUser()
    }
  }, [dispatch, isFetchData, authUser])

  return (
    <div className='flex max-w-6xl mx-auto'>
      {authUser && <Sidebar />}

      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.checkLogged ? <CheckLogged>{route.element}</CheckLogged> : <ProtectedPage>{route.element}</ProtectedPage>} />
        ))}
      </Routes>

      {authUser && <RightPanel />}

      <Toaster />
    </div>
  )
}

export default App
