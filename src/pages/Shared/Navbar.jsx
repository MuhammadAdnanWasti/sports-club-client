import React from 'react'
import Logo from './Logo'
import { Link, NavLink, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'

const Navbar = () => {
  const {user,signOutUser}=useAuth()
  const navigate=useNavigate()
  const handleSignOut=() => { 
     signOutUser()
.then(()=>{
  setTimeout(() => {  navigate('/')}, 100)

}).catch(error=>{
  // console.log(error)
})
  }
  return (
    <div className='bg-primary fixed top-0 z-5000 transition-all duration-300 w-[100vw]'>
      <div className="navbar  shadow-sm text-white max-w-[1200px] mx-auto ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-primary rounded-box z-1 mt-3 w-52 p-2 shadow">
     <li><NavLink to='/' className={({ isActive }) =>
          isActive
            ? "text-black font-bold underline" // Active styles
            : "text-gray-900 "
        }>Home</NavLink></li>
        <li><NavLink to='/courts' className={({ isActive }) =>
          isActive
            ? "text-black font-bold underline" // Active styles
            : "text-gray-900 "
        }>Courts</NavLink></li>
        <li><NavLink to='/helpSupport' className={({ isActive }) =>
          isActive
            ? "text-black font-bold underline" // Active styles
            : "text-gray-900 "
        }>Help & Support</NavLink></li>
        
      </ul>
    </div>
  <div>
    <Logo></Logo>
  </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
       <li><NavLink to='/' className={({ isActive }) =>
          isActive
            ? "text-black font-bold underline" // Active styles
            : "text-gray-900 "
        }>Home</NavLink></li>
        <li><NavLink to='/courts' className={({ isActive }) =>
          isActive
            ? "text-black font-bold underline" // Active styles
            : "text-gray-900 "
        }>Courts</NavLink></li>
        <li><NavLink to='/helpSupport' className={({ isActive }) =>
          isActive
            ? "text-black font-bold underline" // Active styles
            : "text-gray-900 "
        }>Help & Support</NavLink></li>
    </ul>
  </div>
  <div className="navbar-end mr-12">
     {user ? 
   <>
  <div className="dropdown dropdown-end ">
           <div className='flex gap-2'>
             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user.photoURL} />
              </div>
            </div>
            
           </div>
            <ul tabIndex={0} className=" mt-3 z-[1] p-2 menu menu-sm shadow dropdown-content bg-base-100 text-black rounded-box ">
           <li><button className='btn bg-amber-300' onClick={handleSignOut}>Log Out</button></li>
            <li><NavLink className='btn bg-amber-300' to='/dashboard'>DashBoard</NavLink></li>
             <li>Email:{user.email}</li>
             
            </ul>
          </div>
    
   </>:<>
   <Link className="btn bg-amber-300" to='/auth/login'>Login</Link>
   <Link className="btn bg-amber-300" to='/auth/register'>Register</Link>
  </>}
  </div>
</div>
    </div>
  )
}

export default Navbar
