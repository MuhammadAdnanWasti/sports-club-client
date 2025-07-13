import React from 'react'
import Navbar from '../pages/Shared/Navbar'
import { Outlet } from 'react-router'

const Auth = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default Auth
