import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VoteResults = () => {
  const NODE_URL = import.meta.env.VITE_API_URL;

  const [voteData, setVoteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVoteCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || localStorage.getItem('role') !== 'admin') {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${NODE_URL}/api/vote/count`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setVoteData(response.data.countRecord);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch vote results');
      } finally {
        setLoading(false);
      }
    };

    fetchVoteCount();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  // Calculate total votes for percentage calculations
  const totalVotes = voteData.reduce((sum, party) => sum + party.count, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Election Results</h2>
          
          <div className="space-y-4">
            {voteData.map((party, index) => {
              const percentage = totalVotes > 0 
                ? ((party.count / totalVotes) * 100).toFixed(1)
                : 0;

              return (
                <div key={party.party} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">
                      {index + 1}. {party.party}
                    </span>
                    <span className="text-sm text-gray-600">
                      {party.count} votes ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Total Votes:</span>
              <span className="text-gray-600">{totalVotes}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            // Convert data to CSV
            const csvContent = [
              ['Party', 'Votes'],
              ...voteData.map(p => [p.party, p.count])
            ].map(e => e.join(',')).join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'election-results.csv';
            a.click();
          }}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Download Results (CSV)
        </button>
      </div>
    </div>
  );
};

export default VoteResults;