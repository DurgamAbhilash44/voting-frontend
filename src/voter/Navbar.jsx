import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            Voting
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              About
            </Link>
            <Link
              to="/login"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-expanded={isMenuOpen}
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              About
            </Link>
            <Link
              to="/login"
              className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition-colors text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar