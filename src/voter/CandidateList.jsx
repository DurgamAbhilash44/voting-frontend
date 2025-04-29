import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CandidateList = () => {
  const NODE_URL = import.meta.env.VITE_API_URL;

  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voteSubmitting, setVoteSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      if (!token || role !== 'voter') {
        navigate('/login');
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${NODE_URL}/api/allcandidates`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCandidates(response.data.candidates);
      } catch (err) {
        setError('Failed to fetch candidates.');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [navigate]);

  const handleVote = async (candidateId) => {
    const token = localStorage.getItem('token');
    setVoteSubmitting(true);
    setSelectedCandidate(candidateId);

    try {
      const response = await axios.post(
        `${NODE_URL}/api/vote/${candidateId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(response.data.message);
      setError('');
      
      // Create confetti effect after successful vote
      createConfetti();
      
      // Disable other voting buttons
      const updatedCandidates = candidates.map(candidate => ({
        ...candidate,
        hasVoted: candidate._id === candidateId
      }));
      setCandidates(updatedCandidates);
      
    } catch (err) {
      setMessage('');
      setError(err.response?.data?.message || 'Voting failed');
    } finally {
      setVoteSubmitting(false);
    }
  };

  // Simple confetti effect function
  const createConfetti = () => {
    const confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) return;

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.backgroundColor = getRandomColor();
      confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
      const confettis = document.querySelectorAll('.confetti');
      confettis.forEach(item => item.remove());
    }, 4000);
  };

  const getRandomColor = () => {
    const colors = ['#FF4B91', '#FF7676', '#FFAE6D', '#FFF56D', '#99F2C8', '#44DAFF', '#9F9FFF', '#E26EFF'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Get random background gradient for candidate cards
  const getPartyGradient = (partyName) => {
    const gradients = [
      'from-pink-500 to-red-500',
      'from-orange-400 to-red-500',
      'from-yellow-400 to-orange-500',
      'from-green-400 to-emerald-500',
      'from-teal-400 to-cyan-500',
      'from-blue-400 to-indigo-500',
      'from-indigo-400 to-purple-500',
      'from-purple-400 to-pink-500',
    ];
    
    // Simple hash function for consistent colors
    let hash = 0;
    for (let i = 0; i < partyName.length; i++) {
      hash = partyName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return gradients[Math.abs(hash) % gradients.length];
  };

  // Get party symbol based on party name
  const getPartySymbol = (partyName) => {
    const symbols = ['⚡', '🌟', '🔆', '🌊', '🔥', '🍀', '💎', '🌈', '🌹', '🦁', '🐘', '🐯'];
    
    // Simple hash
    let hash = 0;
    for (let i = 0; i < partyName.length; i++) {
      hash = partyName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return symbols[Math.abs(hash) % symbols.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10 px-4">
      {/* Confetti container */}
      <div id="confetti-container" className="fixed inset-0 pointer-events-none overflow-hidden z-50"></div>
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-6">
            <h2 className="text-3xl font-bold text-white mb-2">Election Ballot</h2>
            <p className="text-purple-100">Cast your vote for your preferred candidate</p>
          </div>
          
          {/* Instructions */}
          <div className="px-8 py-6 bg-gradient-to-b from-white to-gray-50 border-b border-gray-100">
            <div className="flex items-start">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Important Instructions</h3>
                <p className="text-gray-600">Your vote is secret and secure. You may only vote for one candidate.</p>
                <p className="text-gray-600 mt-1">Once your vote is cast, it cannot be changed.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 flex items-center bg-red-50 border-l-4 border-red-500 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-800">{error}</span>
          </div>
        )}
        
        {message && (
          <div className="mb-6 p-4 flex items-center bg-green-50 border-l-4 border-green-500 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-800">{message}</span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></div>
            <p className="text-gray-500">Loading candidates...</p>
          </div>
        ) : candidates.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl font-medium text-gray-600">No candidates available</p>
            <p className="text-gray-500 mt-2">Please check back later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {candidates.map((candidate) => {
              const partyGradient = getPartyGradient(candidate.party);
              const partySymbol = getPartySymbol(candidate.party);
              const hasVoted = candidate.hasVoted;
              
              return (
                <div 
                  key={candidate._id} 
                  className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                    hasVoted ? 'ring-4 ring-green-400 ring-offset-2' : 
                    selectedCandidate === candidate._id ? 'ring-4 ring-blue-400 ring-offset-2' : 
                    'hover:shadow-xl transform hover:-translate-y-1'
                  }`}
                >
                  {/* Party color band */}
                  <div className={`h-3 bg-gradient-to-r ${partyGradient}`}></div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start">
                        <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${partyGradient} flex items-center justify-center text-white text-2xl mr-4 shadow-md`}>
                          {partySymbol}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{candidate.name}</h3>
                          <p className="text-gray-500">{candidate.party}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Candidate details */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center text-gray-600 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Age: {candidate.age} years</span>
                      </div>
                      
                      {candidate.position && (
                        <div className="flex items-center text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>Position: {candidate.position}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Vote button */}
                    <button
                      onClick={() => !hasVoted && !message && handleVote(candidate._id)}
                      disabled={hasVoted || Boolean(message) || voteSubmitting}
                      className={`w-full py-3 rounded-lg font-medium flex items-center justify-center transition-colors ${
                        hasVoted 
                          ? 'bg-green-100 text-green-800 cursor-default' 
                          : message 
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            : `bg-gradient-to-r ${partyGradient} text-white hover:opacity-90`
                      }`}
                    >
                      {voteSubmitting && selectedCandidate === candidate._id ? (
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : hasVoted ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Voted
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                          </svg>
                          Cast Vote
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-8 text-center text-gray-500">
          <p>Your vote matters! It's secure and anonymous.</p>
        </div>
      </div>

      {/* CSS for confetti animation */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        .confetti {
          position: absolute;
          top: -20px;
          width: 10px;
          height: 10px;
          opacity: 0;
          border-radius: 5px;
          animation: confetti-fall 4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CandidateList;