import HomePage from '~/pages/home/HomePage'
import Login from '~/pages/auth/login/Login'
import SignUpPage from '~/pages/auth/signup/SignUpPage'
import NotificationPage from '~/pages/notification/NotificationPage'
import ProfilePage from '~/pages/profile/ProfilePage'

const routes = [
  {
    path: '/',
    element: HomePage
  },
  {
    path: '/login',
    element: Login,
    checkLogged: 'Logged'
  },
  {
    path: '/signup',
    element: SignUpPage,
    checkLogged: 'Logged'
  },
  {
    path: '/notifications',
    element: NotificationPage
  },
  {
    path: '/profile/:username',
    element: ProfilePage
  }
]

export default routes