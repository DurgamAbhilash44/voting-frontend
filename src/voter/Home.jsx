import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen text-white">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-32 w-full bg-gradient-to-b from-indigo-600 to-indigo-800 rounded-b-3xl">
        <h1 className="text-5xl font-extrabold mb-6 tracking-wide leading-tight">
          Welcome to the Voting Portal
        </h1>
        <p className="text-2xl mb-8">
          Your voice matters. Securely participate in democratic voting with ease.
        </p>
        <Link 
          to="/vote" 
          className="bg-yellow-400 text-black py-3 px-6 rounded-lg text-xl font-semibold shadow-lg hover:bg-yellow-500 transition duration-300"
        >
          Start Voting
        </Link>
      </section>

      {/* Features Section */}
      <section className="flex flex-wrap justify-center w-full py-16 space-y-8 md:space-y-0 md:space-x-8 md:flex-row">
        {/* Vote Now Card */}
        <div className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden w-80 hover:scale-105 transition-transform duration-300">
          <div className="bg-indigo-700 text-white p-6">
            <h3 className="text-3xl font-semibold mb-4">Vote Now</h3>
            <p className="text-lg">Make your voice heard by casting your vote today.</p>
          </div>
          <div className="p-6">
            <Link
              to="/vote"
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg w-full text-center font-semibold hover:bg-indigo-700 transition duration-200"
            >
              Start Voting
            </Link>
          </div>
        </div>

        {/* About the Portal Card */}
        <div className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden w-80 hover:scale-105 transition-transform duration-300">
          <div className="bg-purple-700 text-white p-6">
            <h3 className="text-3xl font-semibold mb-4">About the Portal</h3>
            <p className="text-lg">Learn more about how our secure system ensures safe and transparent voting.</p>
          </div>
          <div className="p-6">
            <Link
              to="/about"
              className="bg-purple-600 text-white py-2 px-4 rounded-lg w-full text-center font-semibold hover:bg-purple-700 transition duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Sign Up/Login Card */}
        <div className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden w-80 hover:scale-105 transition-transform duration-300">
          <div className="bg-pink-700 text-white p-6">
            <h3 className="text-3xl font-semibold mb-4">Sign Up / Login</h3>
            <p className="text-lg">Get started by creating an account or log in to access your profile.</p>
          </div>
          <div className="p-6">
            <div className="flex justify-between">
              <Link
                to="/signup"
                className="bg-pink-600 text-white py-2 px-4 rounded-lg w-full text-center font-semibold hover:bg-pink-700 transition duration-200"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-pink-600 text-white py-2 px-4 rounded-lg w-full text-center font-semibold hover:bg-pink-700 transition duration-200"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 w-full text-center">
        <p>&copy; 2025 Voting Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
