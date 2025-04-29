import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              VoteSys
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="hover:bg-white hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:bg-white hover:text-purple-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <Link
              to="/login"
              className="hover:bg-white hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hover:bg-white hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
