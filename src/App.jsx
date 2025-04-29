import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './voter/Home';
import Signup from './voter/Signup';
import Login from './voter/Login';
import About from './voter/About';
import Navbar from './voter/Navbar';
import Profile from './voter/Profile';
import ChangePassword from './voter/ChangePassword';
import Admin from './admin/Admin';
import AddCandidateForm from './admin/AddCandidateForm';
import AllCandidates from './admin/AllCandidates';
import CandidateList from './voter/CandidateList';
import VoteResults from './admin/VoteResults';
import UpdateCandidateForm from './admin/UpdateCandidateForm';
import ProtectedRoutes from './ProtectedRoutes';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status from localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set to true if token exists
  }, []);

  return (
    <BrowserRouter>
      {/* Conditionally render Navbar */}
      {!isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/addcandidate" element={<AddCandidateForm />} />
          <Route path="/candidateslist" element={<AllCandidates />} />
          <Route path="/vote" element={<CandidateList />} />
          <Route path="/count" element={<VoteResults />} />
          <Route path="/update" element={<UpdateCandidateForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
