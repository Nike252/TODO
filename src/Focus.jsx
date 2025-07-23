// src/Focus.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FiPlay, FiPause, FiSkipForward, FiSettings, FiHome, FiCalendar, FiClock, FiUser, FiSun, FiPlus, FiX, FiMoon } from 'react-icons/fi';

const Focus = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('darkMode');
    return storedMode === 'true';
  });
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('pomodoro'); // pomodoro, short-break, long-break
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [completedSessions, setCompletedSessions] = useState(0);
  const [focusGoal, setFocusGoal] = useState('Complete project proposal');
  const [showSettings, setShowSettings] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState('');
  const timerRef = useRef(null);

  // Timer modes configuration
  const modes = {
    pomodoro: { label: 'Focus', duration: 25 * 60, color: 'bg-[#92ada4]' },
    'short-break': { label: 'Short Break', duration: 5 * 60, color: 'bg-[#4a7b9d]' },
    'long-break': { label: 'Long Break', duration: 15 * 60, color: 'bg-[#d87079]' }
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Start or pause timer
  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  // Reset timer for current mode
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(modes[mode].duration);
  };

  // Handle timer completion
  const handleTimerComplete = () => {
    if (mode === 'pomodoro') {
      setCompletedSessions(prev => prev + 1);
      
      // After 4 pomodoros, suggest long break
      if (completedSessions > 0 && completedSessions % 3 === 0) {
        setMode('long-break');
      } else {
        setMode('short-break');
      }
    } else {
      setMode('pomodoro');
    }
    resetTimer();
  };

  // Change timer mode
  const changeMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(modes[newMode].duration);
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
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
          <h1 className="text-2xl font-bold">ZenFocus</h1>
        </div>
        
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/10"
        >
          {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
        </button>
      </header>

      <div className="px-6 pb-24">
        {/* Mode Selector */}
        <div className={`rounded-3xl p-1 mb-6 backdrop-blur-sm border transition-all ${
          darkMode 
            ? 'bg-slate-800/50 border-slate-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <div className="grid grid-cols-3 gap-1">
            {Object.entries(modes).map(([key, { label, color }]) => (
              <button
                key={key}
                onClick={() => changeMode(key)}      
                className={`py-3 rounded-lg transition-all ${
                  mode === key 
                    ? `${color} text-white` 
                    : darkMode 
                      ? 'hover:bg-slate-700' 
                      : 'hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Timer Display */}
        <div className={`rounded-full w-64 h-64 mx-auto mb-8 flex items-center justify-center ${
          darkMode ? 'bg-slate-800/50' : 'bg-white/80'
        } border-8 ${modes[mode].color}/20 relative`}>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{formatTime(timeLeft)}</div>
            <div className="text-sm opacity-75">
              {modes[mode].label} • Session {completedSessions + 1}
            </div>
          </div>

          {/* Progress ring - would need SVG for actual implementation */}
          <div className="absolute inset-0 rounded-full border-8 border-transparent" 
            style={{
              background: `conic-gradient(${modes[mode].color} ${(1 - timeLeft/modes[mode].duration) * 100}%, transparent 0)`
            }}>
          </div>
        </div>

        {/* Timer Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={toggleTimer}
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isRunning 
                ? 'bg-red-500/20 text-red-500' 
                : 'bg-green-500/20 text-green-500'
            }`}
          >
            {isRunning ? <FiPause size={24} /> : <FiPlay size={24} />}
          </button>
          
          <button
            onClick={resetTimer}
            className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-500/20 text-gray-500"
          >
            <FiSkipForward size={24} />
          </button>
        </div>

        {/* Focus Goal */}
        <div className={`rounded-3xl p-6 mb-6 backdrop-blur-sm border transition-all ${
          darkMode 
            ? 'bg-slate-800/50 border-slate-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Current Focus</h3>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              <FiSettings />
            </button>
          </div>
          
          {showSettings ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={focusGoal}
                onChange={(e) => setFocusGoal(e.target.value)}
                className={`flex-1 px-4 py-2 rounded-lg outline-none ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-gray-100 border-gray-200'
                }`}
                placeholder="What are you focusing on?"
              />
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-gradient-to-r from-[#92ada4] to-[#4a7b9d] text-white rounded-lg"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="text-xl font-medium">{focusGoal}</p>
          )}
        </div>

        {/* Productivity Stats */}
        <div className={`rounded-3xl p-6 backdrop-blur-sm border transition-all ${
          darkMode 
            ? 'bg-slate-800/50 border-slate-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <h3 className="font-medium mb-4">Today's Focus</h3>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{completedSessions}</div>
              <div className="text-sm opacity-75">Sessions</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{completedSessions * 25}</div>
              <div className="text-sm opacity-75">Minutes</div>
            </div>
            <div>
              <div className="text-2xl font-bold">3/5</div>
              <div className="text-sm opacity-75">Goal</div>
            </div>
          </div>
        </div>

        {/* Focus Tips */}
        <div className={`rounded-3xl p-6 mt-6 backdrop-blur-sm border transition-all ${
          darkMode 
            ? 'bg-slate-800/50 border-slate-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <h3 className="font-medium mb-3">Focus Tips</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                darkMode ? 'bg-slate-700' : 'bg-gray-100'
              }`}>1</span>
              Silence notifications and close unnecessary tabs
            </li>
            <li className="flex items-start gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                darkMode ? 'bg-slate-700' : 'bg-gray-100'
              }`}>2</span>
              Keep water nearby to stay hydrated
            </li>
            <li className="flex items-start gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                darkMode ? 'bg-slate-700' : 'bg-gray-100'
              }`}>3</span>
              Stretch during your short breaks
            </li>
            <li className="flex items-start gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                darkMode ? 'bg-slate-700' : 'bg-gray-100'
              }`}>4</span>
              Use noise-cancelling headphones if available
            </li>
          </ul>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-md rounded-2xl p-6 transition-all ${
            darkMode ? 'bg-slate-800' : 'bg-white'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Task</h3>
              <button
                onClick={() => setShowAddTask(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                <FiX />
              </button>
            </div>
            <form onSubmit={e => { e.preventDefault(); setShowAddTask(false); setNewTask(''); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Task Name</label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    darkMode
                      ? 'bg-slate-700 border-slate-600 text-white'
                      : 'bg-gray-100 border-gray-200'
                  }`}
                  placeholder="What needs to be done?"
                  value={newTask}
                  onChange={e => setNewTask(e.target.value)}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#92ada4] to-[#4a7b9d] text-white font-medium rounded-lg transition-colors"
              >
                Add Task
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
                </div>, label: 'Add', path: '/add', isAdd: true },
          { icon: <FiClock className="text-xl" />, label: 'Focus', path: '/focus' },
          { icon: <FiUser className="text-xl" />, label: 'Profile', path: '/profile' }
        ].map((item, index) => (
          <button 
            key={index} 
            className={`flex flex-col items-center justify-center ${
              index === 2 ? 'w-16' : 'w-12'
            } ${(item.path === '/focus') ? 'text-[#92ada4]' : ''}`}
            onClick={() => {
              if (item.isAdd) {
                window.location.href = '/add';
              } else if (item.path && window.location.pathname !== item.path) {
                window.location.href = item.path;
              }
            }}
          >
            {item.icon}
            <span className={`text-xs mt-1 ${(item.path === '/focus') ? 'text-[#92ada4]' : ''}`}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Focus;