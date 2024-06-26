import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const LoggedPage = (OriginComponent) => {
  const ExtendsComponent = () => {
    const { authUser } = useSelector(state => state.auth)
    return authUser ? <Navigate to='/' /> : <OriginComponent />
  }

  return ExtendsComponent
}

export default LoggedPage