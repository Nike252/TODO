// src/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { FiPlus, FiSun, FiMoon, FiCheckCircle, FiHome, FiCalendar, FiClock, FiUser, FiBell, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(() => {
  const storedMode = localStorage.getItem('darkMode');
  return storedMode === 'true'; 
});
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAddTask, setShowAddTask] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Meeting with design team in 30 minutes', time: '10 min ago', read: false },
    { id: 2, text: 'Your task "Review project proposal" is due today', time: '1 hour ago', read: true },
    { id: 3, text: 'Alex Johnson commented on your task', time: '3 hours ago', read: false },
  ]);

  const navigate = useNavigate();

  // Initialize tasks
  useEffect(() => {
    setTasks([
      { id: 1, title: 'Design dashboard UI', completed: true, category: 'Work', priority: 'high' },
      { id: 2, title: 'Buy groceries', completed: false, category: 'Personal', priority: 'medium' },
      { id: 3, title: 'Call client for project update', completed: false, category: 'Work', priority: 'high' },
      { id: 4, title: 'Finish quarterly report', completed: false, category: 'Work', priority: 'medium' },
      { id: 5, title: 'Book flight for conference', completed: true, category: 'Travel', priority: 'low' },
      { id: 6, title: 'Morning meditation session', completed: false, category: 'Wellness', priority: 'medium' },
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    
    const task = {
      id: tasks.length + 1,
      title: newTask,
      completed: false,
      category: 'Personal',
      priority: 'medium'
    };
    
    setTasks([task, ...tasks]);
    
    // Add a notification for the new task
    const newNotification = {
      id: notifications.length + 1,
      text: `Added new task: "${newTask}"`,
      time: 'Just now',
      read: false
    };
    
    setNotifications([newNotification, ...notifications]);
    setNewTask('');
    setShowAddTask(false);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const filteredTasks = activeCategory === 'All' 
    ? tasks 
    : tasks.filter(task => task.category === activeCategory);

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const categories = ['All', 'Work', 'Personal', 'Wellness', 'Shopping', 'Travel'];
  
  const unreadNotifications = notifications.filter(notif => !notif.read).length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-white' : 'bg-[#f8fafc] text-gray-800'}`}>
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#92ada4] to-[#4a7b9d] flex items-center justify-center">
            <span className="font-bold text-white text-xl">U</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">ZenTasks</h1>
            <p className="text-sm opacity-75">Welcome back, User!</p>
          </div>
        </div>
        
        <div className="flex gap-4 items-center">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 relative"
            >
              <FiBell className="text-xl" />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  {unreadNotifications}
                </span>
              )}
            </button>
            
            {/* Notifications dropdown */}
            {showNotifications && (
              <div className={`absolute right-0 top-12 w-80 rounded-xl shadow-lg z-50 transition-all ${
                darkMode 
                  ? 'bg-slate-800 border border-slate-700' 
                  : 'bg-white border border-gray-200'
              }`}>
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="font-bold">Notifications</h3>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
                  >
                    <FiX />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map(notif => (
                      <div 
                        key={notif.id} 
                        className={`p-4 border-b cursor-pointer transition-all ${
                          darkMode 
                            ? 'border-slate-700 hover:bg-slate-700' 
                            : 'border-gray-100 hover:bg-gray-50'
                        } ${!notif.read ? (darkMode ? 'bg-slate-750' : 'bg-blue-50') : ''}`}
                        onClick={() => markNotificationAsRead(notif.id)}
                      >
                        <div className="flex justify-between">
                          <div className="font-medium">{notif.text}</div>
                          {!notif.read && (
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          )}
                        </div>
                        <div className="text-xs opacity-75 mt-1">{notif.time}</div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-3 text-center text-sm text-blue-500 font-medium">
                  Mark all as read
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/10"
          >
            {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
          </button>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="px-6 mb-8">
        <div className={`rounded-3xl p-6 backdrop-blur-sm border transition-all ${
          darkMode 
            ? 'bg-slate-800/50 border-slate-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Today's Progress</h2>
            <span className="text-sm font-medium">{completedTasks}/{totalTasks} tasks</span>
          </div>
          
          <div className="h-3 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-gradient-to-r from-[#92ada4] to-[#4a7b9d] rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#92ada4]"></div>
              <span>Completed: {completedTasks}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-slate-600"></div>
              <span>Remaining: {totalTasks - completedTasks}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Task Management */}
      <div className="px-6 pb-24">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Tasks</h2>
          <button 
            className="flex items-center gap-2 bg-gradient-to-r from-[#92ada4] to-[#4a7b9d] text-white px-4 py-2 rounded-full"
            onClick={() => setShowAddTask(true)}
          >
            <FiPlus /> Add Task
          </button>
        </div>
        
        {/* Task Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button 
              key={cat}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-gradient-to-r from-[#92ada4] to-[#4a7b9d] text-white' 
                  : darkMode 
                    ? 'bg-slate-800 text-gray-300' 
                    : 'bg-white text-gray-600'
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <div 
              key={task.id}
              className={`p-4 rounded-2xl backdrop-blur-sm border transition-all ${
                darkMode 
                  ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600' 
                  : 'bg-white/80 border-gray-200 hover:border-gray-300'
              } ${
                task.completed ? 'opacity-70' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <button 
                  className={`mt-0.5 p-1.5 rounded-full ${
                    task.completed 
                      ? 'text-[#92ada4] bg-[#92ada4]/20' 
                      : 'text-gray-400 border'
                  }`}
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  <FiCheckCircle className="text-xl" />
                </button>
                <div className="flex-1">
                  <div className={`font-medium ${
                    task.completed ? 'line-through' : ''
                  }`}>
                    {task.title}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.category === 'Work' ? 'bg-blue-100/50 text-blue-700 dark:bg-blue-900/50' :
                      task.category === 'Personal' ? 'bg-purple-100/50 text-purple-700 dark:bg-purple-900/50' :
                      task.category === 'Wellness' ? 'bg-green-100/50 text-green-700 dark:bg-green-900/50' :
                      task.category === 'Shopping' ? 'bg-yellow-100/50 text-yellow-700 dark:bg-yellow-900/50' :
                      'bg-pink-100/50 text-pink-700 dark:bg-pink-900/50'
                    }`}>
                      {task.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'high' ? 'bg-red-100/50 text-red-700 dark:bg-red-900/50' :
                      task.priority === 'medium' ? 'bg-orange-100/50 text-orange-700 dark:bg-orange-900/50' :
                      'bg-gray-100/50 text-gray-700 dark:bg-gray-700'
                    }`}>
                      {task.priority} priority
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredTasks.length === 0 && (
            <div className="text-center py-10 opacity-70">
              <div className="mb-4 text-5xl">☁️</div>
              <h3 className="text-lg font-medium">No tasks found</h3>
              <p className="text-sm mt-1">Add a new task or try a different category</p>
            </div>
          )}
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
            
            <form onSubmit={handleAddTask}>
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
                  onChange={(e) => setNewTask(e.target.value)}
                  autoFocus
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-gray-100 border-gray-200'
                  }`}>
                    <option>Work</option>
                    <option>Personal</option>
                    <option>Wellness</option>
                    <option>Shopping</option>
                    <option>Travel</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-gray-100 border-gray-200'
                  }`}>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
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
          { icon: <FiHome className="text-xl" />, label: 'Home' },
          { icon: <FiCalendar className="text-xl" />, label: 'Calendar' },
          { icon: <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#92ada4] to-[#4a7b9d] flex items-center justify-center -mt-6">
                  <FiPlus className="text-white text-xl" />
                </div>, label: 'Add' },
          { icon: <FiClock className="text-xl" />, label: 'Focus' },
          { icon: <FiUser className="text-xl" />, label: 'Profile' }
        ].map((item, index) => (
          <button 
            key={index} 
            className={`flex flex-col items-center justify-center ${
              index === 2 ? 'w-16' : 'w-12'
            }`}
            onClick={() => {
              if (item.label === 'Profile') navigate('/profile');
            }}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Dashboard;