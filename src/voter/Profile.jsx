import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ProfileDashboard = () => {
  const NODE_URL = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${NODE_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          cancelToken: source.token,
        });
        setUser(response.data.user);
      } catch (err) {
        if (axios.isCancel(err)) return;
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError(err.response?.data?.message || 'An error occurred.');
        }
      }
    };

    fetchUserProfile();
    return () => source.cancel('Component unmounted');
  }, [navigate]);

  const maskAadhar = (aadhar) => {
    return aadhar ? '********' + aadhar.slice(-4) : 'Not available';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="mr-2 p-2 rounded-md hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-blue-700">Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-50 text-red-700 hover:bg-red-100 rounded-lg px-3 py-1 text-sm font-medium"
        >
          Logout
        </button>
      </div>

      {/* Mobile Sidebar - Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-y-0 left-0 w-64 bg-blue-700 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Dashboard</h2>
            <button onClick={() => setSidebarOpen(false)} className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="space-y-4 flex-grow">
            <Link to='/change-password' className="block text-white hover:bg-blue-800 px-3 py-2 rounded-lg">
              Change Password
            </Link>
            <Link to='/vote' className="block text-white hover:bg-blue-800 px-3 py-2 rounded-lg">
              Give Vote
            </Link>
            
          </nav>
          <button
            onClick={handleLogout}
            className="mt-auto text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-blue-800 to-blue-700 text-white hidden md:block min-h-screen">
          <div className="p-6 flex flex-col h-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-1">Dashboard</h2>
              <p className="text-blue-200 text-sm">Voting Portal</p>
            </div>
            <nav className="space-y-2 flex-grow">
              <Link to='/change-password' className="flex items-center text-blue-100 hover:bg-blue-600 px-4 py-3 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Change Password
              </Link>
              <Link to='/vote' className="flex items-center text-blue-100 hover:bg-blue-600 px-4 py-3 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Give Vote
              </Link>
           
            </nav>
            <button
              onClick={handleLogout}
              className="mt-auto flex items-center justify-center text-white bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg font-medium transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="hidden md:flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border-l-4 border-red-500 text-red-700 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {!user ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
                <p className="text-gray-500">Loading your profile...</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Profile header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6 text-white relative">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="bg-white text-blue-700 rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4 md:mb-0 md:mr-6">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-1">{user?.name || 'User'}</h2>
                      <p className="text-blue-100">{user.role}</p>
                    </div>
                    <div className="md:ml-auto mt-4 md:mt-0">
                      <div className={`inline-flex items-center px-4 py-2 rounded-full ${user.isVoted ? 'bg-green-500' : 'bg-red-500'}`}>
                        {user.isVoted ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Voted</span>
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span>Not Voted</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile content */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Basic Information */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Basic Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Full Name</span>
                          <span className="font-medium text-gray-800">{user.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Age</span>
                          <span className="font-medium text-gray-800">{user.age}</span>
                        </div>
                        <div className="flex items-start justify-between">
                          <span className="text-gray-500">Address</span>
                          <span className="font-medium text-gray-800 text-right">{user.address}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Aadhar Number</span>
                          <span className="font-medium text-gray-800">{maskAadhar(user.aadharCardNumber)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Email</span>
                          <span className="font-medium text-gray-800">{user.email || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Mobile</span>
                          <span className="font-medium text-gray-800">{user.mobile || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Role</span>
                          <span className="font-medium text-blue-700">{user.role}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Voting Status</span>
                          <span className={`font-medium ${user.isVoted ? 'text-green-600' : 'text-red-500'}`}>
                            {user.isVoted ? 'Completed' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-8 flex flex-wrap gap-4">
                    {!user.isVoted && (
                      <Link to="/vote" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                        Cast Your Vote
                      </Link>
                    )}
                    <Link to="/change-password" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      Change Password
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileDashboard;