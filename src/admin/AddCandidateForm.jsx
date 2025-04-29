import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCandidateForm = () => {
  const NODE_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    age: '',
    qualification: '',
    constituency: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${NODE_URL}/api/admin`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Candidate added successfully!');
      setFormData({
        name: '',
        party: '',
        age: '',
        qualification: '',
        constituency: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Candidate</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Candidate Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="party"
          placeholder="Party Name"
          value={formData.party}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Add Candidate
        </button>
      </form>
    </div>
  );
};

export default AddCandidateForm;
