import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUsers, FiPieChart, FiSettings, FiLogOut, FiUserPlus, FiList } from 'react-icons/fi';

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  // Sample data - replace with your actual data source
  const totalUsers = parseInt(localStorage.getItem('totalusers')) || 0;
  const totalVoted = parseInt(localStorage.getItem('totalvoted')) || 0;
  const notVoted = parseInt(localStorage.getItem('notvoted')) || 0;
  const votedPercent = totalUsers ? ((totalVoted / totalUsers) * 100).toFixed(1) : 0;
  const notVotedPercent = totalUsers ? ((notVoted / totalUsers) * 100).toFixed(1) : 0;
  
  // Fixed: Parse candidates properly - assuming it might be stored as JSON array
  const candidatesData = localStorage.getItem('candidates');
  const candidates = candidatesData ? 
    (Array.isArray(JSON.parse(candidatesData)) ? JSON.parse(candidatesData).length : parseInt(candidatesData)) : 0;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-6 hidden md:flex flex-col fixed h-full">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-blue-600 flex items-center">
            <FiPieChart className="mr-2" /> VoteSys
          </h2>
          <p className="text-sm text-gray-500 mt-1">Admin Dashboard</p>
        </div>

        <nav className="space-y-2 flex-1">
          <Link
            to="/addcandidate"
            className="flex items-center p-3 rounded-lg transition-all hover:bg-blue-50 text-gray-700 hover:text-blue-600"
          >
            <FiUserPlus className="mr-3" /> Add Candidate
          </Link>
          <Link
            to="/candidateslist"
            className="flex items-center p-3 rounded-lg transition-all hover:bg-blue-50 text-gray-700 hover:text-blue-600"
          >
            <FiList className="mr-3" /> Candidates List
          </Link>
          
          <Link
            to="/count"
            className="flex items-center p-3 rounded-lg transition-all hover:bg-blue-50 text-gray-700 hover:text-blue-600"
          >
            <FiList className="mr-3" /> Vote Count List
          </Link>
          
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 flex items-center w-full p-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
        >
          <FiLogOut className="mr-3" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:ml-64">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-500">Welcome back, here's today's stats</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FiUsers className="text-blue-600" />
              </div>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <InfoCard 
              title="Candidates" 
              value={candidates}
              icon={<FiUsers className="w-5 h-5" />}
              color="purple"
            />
            <InfoCard 
              title="Registered Users" 
              value={totalUsers} 
              icon={<FiUsers className="w-5 h-5" />}
              color="blue"
            />
            <InfoCard 
              title="Votes Cast" 
              value={totalVoted}
              icon={<FiUsers className="w-5 h-5" />}
              color="green"
            />
          </div>

          {/* Voting Progress Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-6">Voting Progress</h2>
            
            <div className="space-y-8">
              <ProgressItem 
                label="Voted" 
                percentage={votedPercent} 
                color="green"
                value={totalVoted}
              />
              <ProgressItem 
                label="Not Voted" 
                percentage={notVotedPercent} 
                color="red"
                value={notVoted}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Reusable Components
const InfoCard = ({ title, value, icon, color }) => {
  // Map color names to Tailwind classes
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600"
  };

  const iconClass = colorMap[color] || "bg-gray-100 text-gray-600";
  const [bgClass, textClass] = iconClass.split(" ");

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-transform hover:scale-105">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${bgClass}`}>
          {React.cloneElement(icon, { className: `w-5 h-5 ${textClass}` })}
        </div>
      </div>
    </div>
  );
};

const ProgressItem = ({ label, percentage, color, value }) => {
  // Map color names to Tailwind bg classes
  const bgColorMap = {
    green: "bg-green-500",
    red: "bg-red-500",
    blue: "bg-blue-500"
  };

  const bgClass = bgColorMap[color] || "bg-gray-500";

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-sm text-gray-500">{percentage}% ({value})</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3">
        <div
          className={`h-full rounded-full ${bgClass} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Admin;