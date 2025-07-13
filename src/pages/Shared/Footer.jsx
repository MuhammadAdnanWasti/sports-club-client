import React from 'react'
import Logo from './Logo'
import { NavLink } from 'react-router'

const Footer = () => {
  return (
   <footer className="footer footer-horizontal footer-center bg-[#76b38f] text-primary-content p-10">
  <aside>
   <Logo></Logo>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
   <ul className="grid grid-flow-col gap-4">
  <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink  to='/courts'>Courts</NavLink></li>
 </ul>
 <div>
    <p className='font-bold'>Contract Us:</p>
    <p> Phone: +880 1234-111111<br />
              Email: info@sportsclub.com</p>
 </div>
</footer>
  )
}

export default Footer
