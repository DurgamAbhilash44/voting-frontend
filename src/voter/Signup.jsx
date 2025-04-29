import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {

  const NODE_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    email: '',
    mobile: '',
    aadharCardNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (formData.aadharCardNumber.length !== 12 || isNaN(formData.aadharCardNumber)) {
      alert("Aadhar must be 12 digits");
      return;
    }

    try {
      const response = await axios.post(`${NODE_URL}/api/register`, {
        ...formData,
        age: Number(formData.age)
      });

      if (response.status === 200) {
        alert('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 via-indigo-500 to-blue-600 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl">
        <div className="text-center space-y-4">
          <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 flex items-center justify-center animate-bounce">
            <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
            Voter Registration
          </h2>
          <p className="text-indigo-700 font-medium">Join the democratic process - Your voice matters!</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="form-group">
                <label className="text-indigo-800 font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-blue-50 border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-indigo-800 font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-blue-50 border-2 border-blue-200 focus:border-blue-500"
                  placeholder="Age"
                  min="18"
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-indigo-800 font-medium">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-blue-50 border-2 border-blue-200 focus:border-blue-500 h-32"
                  placeholder="Enter your complete address"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="form-group">
                <label className="text-indigo-800 font-medium">Aadhar Number</label>
                <div className="relative">
                  <input
                    type="text"
                    name="aadharCardNumber"
                    value={formData.aadharCardNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-blue-50 border-2 border-blue-200 focus:border-blue-500 pr-12"
                    placeholder="XXXX XXXX XXXX"
                    maxLength="12"
                    required
                  />
                  <span className="absolute right-4 top-3 text-blue-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label className="text-indigo-800 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-blue-50 border-2 border-blue-200 focus:border-blue-500"
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label className="text-indigo-800 font-medium">Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-blue-50 border-2 border-blue-200 focus:border-blue-500"
                  placeholder="+91 9876543210"
                />
              </div>

              <div className="form-group">
                <label className="text-indigo-800 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-blue-50 border-2 border-blue-200 focus:border-blue-500"
                  placeholder="••••••••"
                  minLength="6"
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-indigo-800 font-medium">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-blue-50 border-2 border-blue-200 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white font-bold rounded-lg transform transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            Register Now
          </button>

          <p className="text-center text-indigo-700">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:text-indigo-800 font-semibold underline">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
