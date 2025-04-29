import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCandidateForm = () => {
  const { candidateId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    // Add other candidate fields as needed
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || localStorage.getItem('role') !== 'admin') {
          navigate('/login');
          return;
        }

        const response = await axios.get(`/api/candidates/${candidateId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setFormData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch candidate');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [candidateId, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `/api/candidates/${candidateId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSuccess('Candidate updated successfully');
      // Optional: Redirect after success
      // navigate('/candidates');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating candidate');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Candidate</h2>
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Party</label>
              <input
                type="text"
                name="party"
                value={formData.party}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            {/* Add other form fields as needed */}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update Candidate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCandidateForm;