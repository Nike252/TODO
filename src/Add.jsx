// src/Add.jsx
import React, { useState } from 'react';
import { FiPlus, FiX, FiHome, FiCalendar, FiClock, FiUser, FiCheckCircle, FiBell, FiBookmark, FiSun, FiMoon } from 'react-icons/fi';

const Add = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('darkMode');
    return storedMode === 'true';
  });
  const [activeTab, setActiveTab] = useState('task'); // 'task', 'event', 'note', 'focus'
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const quickActions = [
    { 
      icon: <FiCheckCircle size={24} />, 
      label: 'Task', 
      type: 'task',
      color: 'bg-[#92ada4]',
      placeholder: 'e.g., Finish project report'
    },
    { 
      icon: <FiCalendar size={24} />, 
      label: 'Event', 
      type: 'event',
      color: 'bg-[#4a7b9d]',
      placeholder: 'e.g., Team meeting at 3 PM'
    },
    { 
      icon: <FiBookmark size={24} />, 
      label: 'Quick Note', 
      type: 'note',
      color: 'bg-[#d87079]',
      placeholder: 'e.g., Idea for the new design'
    },
    { 
      icon: <FiClock size={24} />, 
      label: 'Focus Session', 
      type: 'focus',
      color: 'bg-[#f8c7cc]',
      placeholder: 'e.g., Deep work on proposal'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Logic to handle the submission based on `activeTab`
    console.log(`Added ${activeTab}:`, inputValue);
    
    // Reset and close
    setInputValue('');
    setShowModal(false);
  };

  React.useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-white' : 'bg-[#f8fafc] text-gray-800'}`}>
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#92ada4] to-[#4a7b9d] flex items-center justify-center">
            <span className="font-bold text-white text-xl">U</span>
          </div>
          <h1 className="text-2xl font-bold">Quick Add</h1>
        </div>
        
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/10"
        >
          {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
        </button>
      </header>

      <div className="px-6 pb-24">
        {/* Quick Action Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {quickActions.map((action) => (
            <button
              key={action.type}
              onClick={() => {
                setActiveTab(action.type);
                setShowModal(true);
              }}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all ${
                darkMode ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white hover:bg-gray-100'
              } border ${action.type === activeTab ? 'ring-2 ring-offset-2 ring-[#92ada4]' : ''}`}
            >
              <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center text-white mb-3`}>
                {action.icon}
              </div>
              <span className="font-medium">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Recently Added Preview */}
        <div className={`rounded-3xl p-6 backdrop-blur-sm border transition-all ${
          darkMode 
            ? 'bg-slate-800/50 border-slate-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <h3 className="text-lg font-semibold mb-4">Recently Added</h3>
          <div className="space-y-3">
            <div className={`p-3 rounded-lg flex items-start gap-3 ${
              darkMode ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              <FiCheckCircle className={`mt-1 flex-shrink-0 ${darkMode ? 'text-[#92ada4]' : 'text-green-500'}`} />
              <div>
                <p>Finish dashboard design</p>
                <p className="text-xs opacity-75">Today, 2:30 PM</p>
              </div>
            </div>
            <div className={`p-3 rounded-lg flex items-start gap-3 ${
              darkMode ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              <FiCalendar className={`mt-1 flex-shrink-0 ${darkMode ? 'text-[#4a7b9d]' : 'text-blue-500'}`} />
              <div>
                <p>Meeting with team</p>
                <p className="text-xs opacity-75">Tomorrow, 10:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-md rounded-2xl p-6 transition-all ${
            darkMode ? 'bg-slate-800' : 'bg-white'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {quickActions.find(a => a.type === activeTab)?.label}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={quickActions.find(a => a.type === activeTab)?.placeholder}
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-gray-100 border-gray-200'
                  }`}
                  autoFocus
                />
              </div>

              {/* Additional fields based on type */}
              {activeTab === 'event' && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input
                      type="date"
                      className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                        darkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-gray-100 border-gray-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Time</label>
                    <input
                      type="time"
                      className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                        darkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-gray-100 border-gray-200'
                      }`}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'focus' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <select className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-gray-100 border-gray-200'
                  }`}>
                    <option>25 minutes (Pomodoro)</option>
                    <option>50 minutes (Deep Focus)</option>
                    <option>Custom</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  quickActions.find(a => a.type === activeTab)?.color || 'bg-[#92ada4]'
                } text-white`}
              >
                Add {quickActions.find(a => a.type === activeTab)?.label}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 backdrop-blur-lg border-t p-4 flex justify-around ${
        darkMode 
          ? 'bg-slate-800/80 border-slate-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        {[
          { icon: <FiHome className="text-xl" />, label: 'Home', path: '/dashboard' },
          { icon: <FiCalendar className="text-xl" />, label: 'Calender', path: '/calender' },
          { icon: <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#92ada4] to-[#4a7b9d] flex items-center justify-center -mt-6">
                  <FiPlus className="text-white text-xl" />
                </div>, label: 'Add', path: '/add', active: true },
          { icon: <FiClock className="text-xl" />, label: 'Focus', path: '/focus' },
          { icon: <FiUser className="text-xl" />, label: 'Profile', path: '/profile' }
        ].map((item, index) => (
          <button 
            key={index} 
            className={`flex flex-col items-center justify-center ${
              index === 2 ? 'w-16' : 'w-12'
            } ${item.active ? 'text-[#92ada4]' : ''}`}
            onClick={() => item.path && window.location.pathname !== item.path && (window.location.href = item.path)}
          >
            {item.icon}
            <span className={`text-xs mt-1 ${item.active ? 'text-[#92ada4]' : ''}`}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Add;