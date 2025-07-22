// src/Profile.jsx
import React, { useState, useEffect } from 'react';
import { FiUser, FiSettings, FiLogOut, FiEdit, FiCheck, FiX, FiLock, FiMail, FiCalendar, FiHome, FiPlus, FiClock, FiMoon, FiSun } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('darkMode');
    return storedMode === 'true';
  });
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    joinDate: 'Joined March 2023',
    bio: 'Product designer & productivity enthusiast. Building tools to help people focus on what matters.',
    password: '••••••••'
  });
  const [tempData, setTempData] = useState({ ...userData });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  const saveChanges = () => {
    setUserData({ ...tempData });
    setEditMode(false);
  };

  const cancelEdit = () => {
    setTempData({ ...userData });
    setEditMode(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-white' : 'bg-[#f8fafc] text-gray-800'}`}>
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#92ada4] to-[#4a7b9d] flex items-center justify-center">
            <span className="font-bold text-white text-xl">AJ</span>
          </div>
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
        
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/10"
        >
          {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
        </button>
      </header>

      <div className="px-6 pb-24">
        {/* Profile Card */}
        <div className={`rounded-3xl p-6 mb-8 backdrop-blur-sm border transition-all ${
          darkMode 
            ? 'bg-slate-800/50 border-slate-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#92ada4] to-[#4a7b9d] flex items-center justify-center">
                <span className="font-bold text-white text-3xl">AJ</span>
              </div>
              <div>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={tempData.name}
                    onChange={handleInputChange}
                    className={`text-2xl font-bold mb-1 px-3 py-1 rounded-lg outline-none ${
                      darkMode 
                        ? 'bg-slate-700 border-slate-600' 
                        : 'bg-gray-100 border-gray-200'
                    }`}
                  />
                ) : (
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                )}
                <p className="text-sm opacity-75">{userData.joinDate}</p>
              </div>
            </div>
            
            {editMode ? (
              <div className="flex gap-2">
                <button 
                  onClick={saveChanges}
                  className="p-2 rounded-full bg-green-500/20 text-green-500"
                >
                  <FiCheck />
                </button>
                <button 
                  onClick={cancelEdit}
                  className="p-2 rounded-full bg-red-500/20 text-red-500"
                >
                  <FiX />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setEditMode(true)}
                className="p-2 rounded-full bg-blue-500/20 text-blue-500"
              >
                <FiEdit />
              </button>
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            {editMode ? (
              <textarea
                name="bio"
                value={tempData.bio}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg outline-none min-h-[100px] ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600' 
                    : 'bg-gray-100 border-gray-200'
                }`}
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">{userData.bio}</p>
            )}
          </div>
          
          <div className="flex gap-4">
            <span className={`px-3 py-1 rounded-full text-sm ${
              darkMode ? 'bg-slate-700 text-blue-400' : 'bg-blue-100 text-blue-700'
            }`}>
              Designer
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              darkMode ? 'bg-slate-700 text-green-400' : 'bg-green-100 text-green-700'
            }`}>
              Productivity
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              darkMode ? 'bg-slate-700 text-purple-400' : 'bg-purple-100 text-purple-700'
            }`}>
              Minimalist
            </span>
          </div>
        </div>

        {/* Account Settings */}
        <div className={`rounded-3xl p-6 mb-8 backdrop-blur-sm border transition-all ${
          darkMode 
            ? 'bg-slate-800/50 border-slate-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiSettings /> Account Settings
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${
                darkMode ? 'bg-slate-700 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <FiMail />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Email</h4>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={tempData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-1 rounded-lg outline-none ${
                      darkMode 
                        ? 'bg-slate-700 border-slate-600' 
                        : 'bg-gray-100 border-gray-200'
                    }`}
                  />
                ) : (
                  <p className="text-sm opacity-75">{userData.email}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${
                darkMode ? 'bg-slate-700 text-red-400' : 'bg-red-100 text-red-600'
              }`}>
                <FiLock />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Password</h4>
                {editMode ? (
                  <input
                    type="password"
                    name="password"
                    value={tempData.password}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                    className={`w-full px-3 py-1 rounded-lg outline-none ${
                      darkMode 
                        ? 'bg-slate-700 border-slate-600' 
                        : 'bg-gray-100 border-gray-200'
                    }`}
                  />
                ) : (
                  <p className="text-sm opacity-75">{userData.password}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${
                darkMode ? 'bg-slate-700 text-purple-400' : 'bg-purple-100 text-purple-600'
              }`}>
                <FiCalendar />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Member Since</h4>
                <p className="text-sm opacity-75">{userData.joinDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`rounded-3xl p-6 mb-8 backdrop-blur-sm border transition-all ${
          darkMode 
            ? 'bg-slate-800/50 border-slate-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <h3 className="text-lg font-semibold mb-4">Your Stats</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl text-center ${
              darkMode ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              <div className="text-3xl font-bold text-[#92ada4]">142</div>
              <div className="text-sm opacity-75">Tasks Completed</div>
            </div>
            
            <div className={`p-4 rounded-xl text-center ${
              darkMode ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              <div className="text-3xl font-bold text-[#4a7b9d]">87%</div>
              <div className="text-sm opacity-75">Completion Rate</div>
            </div>
            
            <div className={`p-4 rounded-xl text-center ${
              darkMode ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              <div className="text-3xl font-bold text-[#d87079]">24</div>
              <div className="text-sm opacity-75">Current Streak</div>
            </div>
            
            <div className={`p-4 rounded-xl text-center ${
              darkMode ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              <div className="text-3xl font-bold text-[#f8c7cc]">1,240</div>
              <div className="text-sm opacity-75">Focus Minutes</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button className={`w-full py-3 px-4 rounded-lg flex items-center gap-3 ${
            darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-100'
          } transition-colors border`}>
            <FiSettings className="text-lg" />
            <span>App Settings</span>
          </button>
          
          <button className={`w-full py-3 px-4 rounded-lg flex items-center gap-3 ${
            darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-100'
          } transition-colors border`}>
            <FiUser className="text-lg" />
            <span>Help & Support</span>
          </button>
          
          <button className={`w-full py-3 px-4 rounded-lg flex items-center gap-3 text-red-500 ${
            darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-100'
          } transition-colors border`}>
            <FiLogOut className="text-lg" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 backdrop-blur-lg border-t p-4 flex justify-around ${
        darkMode 
          ? 'bg-slate-800/80 border-slate-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        {[
          { icon: <FiHome className="text-xl" />, label: 'Home', path: '/dashboard', active: false },
          { icon: <FiCalendar className="text-xl" />, label: 'Calendar', path: '/calendar', active: false },
          { icon: <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#92ada4] to-[#4a7b9d] flex items-center justify-center -mt-6">
                  <FiPlus className="text-white text-xl" />
                </div>, label: 'Add', path: '/add', active: false },
          { icon: <FiClock className="text-xl" />, label: 'Focus', path: '/focus', active: false },
          { icon: <FiUser className="text-xl text-[#92ada4]" />, label: 'Profile', path: '/profile', active: true }
        ].map((item, index) => (
          <button 
            key={index} 
            className={`flex flex-col items-center justify-center ${
              index === 2 ? 'w-16' : 'w-12'
            } ${item.active ? 'text-[#92ada4]' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className={`text-xs mt-1 ${item.active ? 'text-[#92ada4]' : ''}`}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Profile;