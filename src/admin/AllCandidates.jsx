import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllCandidates = () => {
  const NODE_URL = import.meta.env.VITE_API_URL;

  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Fetch all candidates
  useEffect(() => {
    if (role !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${NODE_URL}/api/allcandidates`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCandidates(response.data.candidates);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load candidates.');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [navigate, role, token]);

  // Handle Update
  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await axios.delete(`${NODE_URL}/api/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCandidates(candidates.filter(candidate => candidate._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete candidate.');
      }
    }
  };

  // Filter candidates based on search term
  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.party.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get random pastel color for party badges
  const getPartyColor = (partyName) => {
    const colors = [
      'bg-pink-500',
      'bg-purple-500',
      'bg-indigo-500',
      'bg-blue-500',
      'bg-teal-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-orange-500',
      'bg-red-500'
    ];
    
    // Simple hash function to get consistent colors
    let hash = 0;
    for (let i = 0; i < partyName.length; i++) {
      hash = partyName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Candidate Management</h1>
              <p className="text-purple-100">Manage election candidates</p>
            </div>
        
          </div>
          
          {/* Stats & Search */}
          <div className="px-8 py-6 flex flex-col md:flex-row justify-between items-center border-b border-gray-100">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <div className="text-center">
                <p className="text-sm text-gray-500 uppercase">Total Candidates</p>
                <p className="text-2xl font-bold text-gray-800">{candidates.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 uppercase">Parties</p>
                <p className="text-2xl font-bold text-gray-800">
                  {new Set(candidates.map(c => c.party)).size}
                </p>
              </div>
            </div>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-800">{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></div>
            <p className="text-gray-500">Loading candidates...</p>
          </div>
        ) : candidates.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl font-medium text-gray-600">No candidates found</p>
            <p className="text-gray-500 mt-2">Add some candidates to get started</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Card grid for larger screens */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              {filteredCandidates.map((candidate) => (
                <div key={candidate._id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold mr-4">
                          {candidate.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{candidate.name}</h3>
                          <div className="flex items-center mt-1">
                            <span className={`${getPartyColor(candidate.party)} text-white text-xs px-3 py-1 rounded-full`}>
                              {candidate.party}
                            </span>
                            <span className="ml-3 text-gray-500 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              {candidate.age} years
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdate(candidate._id)}
                          className="rounded-full h-8 w-8 flex items-center justify-center bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(candidate._id)}
                          className="rounded-full h-8 w-8 flex items-center justify-center bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Table for mobile view */}
            <div className="md:hidden overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Party</th>
                    <th className="p-3 text-left">Age</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCandidates.map((candidate) => (
                    <tr key={candidate._id} className="hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-800">{candidate.name}</td>
                      <td className="p-3">
                        <span className={`${getPartyColor(candidate.party)} text-white text-xs px-2 py-1 rounded-full`}>
                          {candidate.party}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">{candidate.age}</td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUpdate(candidate._id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(candidate._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty search results */}
            {searchTerm && filteredCandidates.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-gray-500">No candidates match your search</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCandidates;