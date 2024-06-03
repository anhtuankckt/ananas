import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const CheckLogged = ({ children }) => {
  const { authUser } = useSelector(state => state.auth)

  if (authUser) {
    return <Navigate to='/' />
  }

  return children
}

export default CheckLogged