import React from 'react'
import useRole from '../pages/hooks/role/useRole';
import { Navigate } from 'react-router';
const MemberRoute = ({ children }) => {
  const [role,  isRole] = useRole()
 
 
  if ( isRole)  return  <span className="loading loading-infinity loading-xl "></span>;
  if (role === 'member') return children
  return <Navigate to='/' />
}


export default MemberRoute
