import React from 'react'
import Navbar from '../pages/Shared/Navbar'
import { Outlet } from 'react-router'
import Footer from '../pages/Shared/Footer'

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navbar></Navbar>
            </header>

            <main className="flex-grow max-w-[1200px] mx-auto w-full">
                <Outlet></Outlet>
            </main>

            <footer>
                <Footer></Footer>
            </footer>
        </div>
    )
}

export default MainLayout
