import HomePage from '~/pages/home/HomePage'
import Login from '~/pages/auth/login/Login'
import SignUpPage from '~/pages/auth/signup/SignUpPage'
import Notification from '~/pages/notification/Notification'
import ProfilePage from '~/pages/profile/ProfilePage'

const routes = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <Login />,
    checkLogged: 'Logged'
  },
  {
    path: '/signup',
    element: <SignUpPage />,
    checkLogged: 'Logged'
  },
  {
    path: '/notifications',
    element: <Notification />
  },
  {
    path: '/profile/:username',
    element: <ProfilePage />
  }
]

export default routes