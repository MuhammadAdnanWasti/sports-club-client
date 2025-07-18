import React from 'react'
import { NavLink, Outlet } from 'react-router'
import Logo from '../pages/Shared/Logo'

const DashBoardLayout = () => {
    return (
        <div className="drawer text-white">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-primary w-full">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>

                    <div className="mx-2 flex-1 px-2"><Logo></Logo> </div>
                    <div className="hidden flex-none lg:block">
                        <ul className="menu menu-horizontal">
                            {/* Navbar menu content here */}
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink to='/dashboard/myProfile'>My Profile</NavLink></li>

                            <li><NavLink to='/dashboard/pendingBookings'>Pending Bookings</NavLink></li>
                            <li><NavLink to='/dashboard/manageAnnouncements'>Manage Announcements</NavLink></li>
                            <li><NavLink to='/dashboard/manageCourts'>Manage Courts</NavLink></li>
                            <li><NavLink to='/dashboard/manageCoupons'>Manage Cupons</NavLink></li>
                            <li><NavLink to='/dashboard/manageBookingApprovals'>Manage Bookings</NavLink></li>
                        </ul>
                    </div>
                </div>
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-primary min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/dashboard/myProfile'>My Profile</NavLink></li>

                    <li><NavLink to='/dashboard/pendingBookings'>Pending Bookings</NavLink></li>
                    <li><NavLink to='/dashboard/manageAnnouncements'>Manage Announcements</NavLink></li>
                    <li><NavLink to='/dashboard/manageCourts'>Manage Courts</NavLink></li>
                    <li><NavLink to='/dashboard/manageCoupons'>Manage coupons</NavLink></li>
                     <li><NavLink to='/dashboard/manageBookingApprovals'>Manage Bookings</NavLink></li>
                </ul>
            </div>
        </div>
    )
}

export default DashBoardLayout
