import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedPage = (OriginComponent) => {
  function ExtendsComponent() {
    const { authUser } = useSelector(state => state.auth)
    return authUser ? <OriginComponent /> : <Navigate to='/signup' />
  }

  return ExtendsComponent
}

export default ProtectedPage