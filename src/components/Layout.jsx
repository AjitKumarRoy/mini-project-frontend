import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
// import Footer from './Footer'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
