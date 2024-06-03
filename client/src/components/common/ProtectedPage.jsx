import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedPage = ({ children }) => {
  const { authUser } = useSelector(state => state.auth)

  return authUser ? children : <Navigate to='/signup' />
}

export default ProtectedPage