import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()

  return (
    <nav className="bg-red-500 text-white">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="font-bold text-lg">
          My App
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden focus:outline-none"
        >
          {/* Hamburger Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" /* ... */>
            <path /* ... */ />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-2">
          <Link to="/" className="block py-2">Dashboard</Link>
          <Link to="/create-spreadsheet" className="block py-2">Create</Link>
          <button onClick={logout} className="block py-2">Logout</button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
