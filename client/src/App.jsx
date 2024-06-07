import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import routes from './routes/routes'
import ProtectedPage from './components/common/ProtectedPage'
import LoggedPage from './components/common/LoggedPage'
import Sidebar from './components/common/Sidebar'
import RightPanel from './components/common/RightPanel'
import authApi from './api/modules/authApi'
import { setUser } from './redux/features/authSlice'

const App = () => {
  const { authUser } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      const { response, error } = await authApi.getMe()
      if (response) dispatch(setUser(response))
      if (error) dispatch(setUser(null))
    }

    fetchUser()
  }, [dispatch])

  return (
    <div className='flex max-w-6xl mx-auto'>
      {authUser && <Sidebar />}

      <Routes>
        {routes.map((route, index) => {
          const Element = route.element
          const WrappedComponent = route.logged ? LoggedPage(Element) : route.protected ? ProtectedPage(Element) : Element

          return (<Route index={route.index} key={index} path={route.path} element={<WrappedComponent />} />)
        })}
      </Routes>

      {authUser && <RightPanel />}

      <Toaster />
    </div>
  )
}

export default App
