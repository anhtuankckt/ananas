import HomePage from '~/pages/home/HomePage'
import Login from '~/pages/auth/login/Login'
import SignUpPage from '~/pages/auth/signup/SignUpPage'
import NotificationPage from '~/pages/notification/NotificationPage'
import ProfilePage from '~/pages/profile/ProfilePage'

const routes = [
  {
    path: '/',
    element: HomePage,
    protected: true
  },
  {
    path: '/login',
    element: Login,
    logged: true
  },
  {
    path: '/signup',
    element: SignUpPage,
    logged: true
  },
  {
    path: '/notifications',
    element: NotificationPage,
    protected: true
  },
  {
    path: '/profile/:username',
    element: ProfilePage,
    protected: true
  }
]

export default routes