import { Navigate } from 'react-router'
import useRole from '../pages/hooks/role/useRole'



const AdminRoute = ({ children }) => {
  const [role,  isRole] = useRole()
 
 
  if ( isRole)  return  <span className="loading loading-infinity loading-xl "></span>;
  if (role === 'admin') return children
  return <Navigate to='/' />
}

export default AdminRoute