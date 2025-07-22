// src/Calendar.jsx
import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiPlus, FiHome, FiCalendar, FiClock, FiUser, FiCheckCircle, FiMoon, FiSun } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Calender = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('darkMode');
    return storedMode === 'true';
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events] = useState([
    { id: 1, title: 'Team Meeting', date: new Date(2023, 7, 15, 10, 0), duration: 60, color: 'bg-blue-500' },
    { id: 2, title: 'Lunch with Sarah', date: new Date(2023, 7, 17, 13, 0), duration: 90, color: 'bg-green-500' },
    { id: 3, title: 'Project Deadline', date: new Date(2023, 7, 20, 15, 0), duration: 120, color: 'bg-red-500' },
    { id: 4, title: 'Yoga Session', date: new Date(2023, 7, 22, 8, 0), duration: 60, color: 'bg-purple-500' },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Previous month days
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }
    
    // Next month days
    const totalCells = 42; // 6 rows x 7 days
    const remainingDays = totalCells - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    
    return days;
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Get events for selected date
  const getEventsForDate = (date) => {
    return events.filter(event => {
      return event.date.getDate() === date.getDate() &&
             event.date.getMonth() === date.getMonth() &&
             event.date.getFullYear() === date.getFullYear();
    });
  };

  // Render calendar
  const calendarDays = generateCalendar();
  const selectedEvents = getEventsForDate(selectedDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-white' : 'bg-[#f8fafc] text-gray-800'}`}>
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#92ada4] to-[#4a7b9d] flex items-center justify-center">
            <span className="font-bold text-white text-xl">U</span>
          </div>
          <h1 className="text-2xl font-bold">ZenCalendar</h1>
        </div>
        
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/10"
        >
          {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
        </button>
      </header>

      <div className="px-6 pb-24">
        {/* Calendar Controls */}
        <div className={`rounded-3xl p-6 mb-6 backdrop-blur-sm border transition-all ${
          darkMode 
            ? 'bg-slate-800/50 border-slate-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {monthName} {year}
            </h2>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={goToPreviousMonth}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm border"
              >
                <FiChevronLeft />
              </button>
              
              <button 
                onClick={goToToday}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#92ada4] to-[#4a7b9d] text-white text-sm"
              >
                Today
              </button>
              
              <button 
                onClick={goToNextMonth}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm border"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
          
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div 
                key={day}
                className={`text-center p-2 font-medium ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const isToday = day.date.toDateString() === new Date().toDateString();
              const isSelected = day.date.toDateString() === selectedDate.toDateString();
              const dayEvents = getEventsForDate(day.date);
              
              return (
                <div 
                  key={index}
                  onClick={() => setSelectedDate(day.date)}
                  className={`min-h-24 rounded-lg p-2 cursor-pointer transition-all ${
                    day.isCurrentMonth 
                      ? darkMode 
                        ? isSelected 
                          ? 'bg-[#4a7b9d] text-white' 
                          : isToday
                            ? 'bg-[#92ada4]/30' 
                            : 'bg-slate-800/30 hover:bg-slate-800/50'
                        : isSelected 
                          ? 'bg-[#4a7b9d] text-white' 
                          : isToday
                            ? 'bg-[#92ada4]/20' 
                            : 'bg-white hover:bg-gray-100'
                      : darkMode 
                        ? 'text-gray-600' 
                        : 'text-gray-400'
                  }`}
                >
                  <div className="text-right">
                    <span className={`inline-block w-7 h-7 rounded-full flex items-center justify-center ${
                      isToday && !isSelected && !darkMode ? 'text-white bg-[#92ada4]' : ''
                    }`}>
                      {day.date.getDate()}
                    </span>
                  </div>
                  
                  {/* Event Indicators */}
                  <div className="mt-1 space-y-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <div 
                        key={event.id}
                        className={`text-xs truncate px-1 py-0.5 rounded ${
                          darkMode 
                            ? isSelected ? 'bg-white/20' : 'bg-slate-700' 
                            : isSelected ? 'bg-white/30' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block w-2 h-2 rounded-full ${event.color} mr-1`}></span>
                        {formatTime(event.date)}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className={`text-xs ${
                        darkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Selected Date & Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Selected Date Card */}
          <div className={`rounded-3xl p-6 backdrop-blur-sm border transition-all ${
            darkMode 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <h3 className="text-xl font-bold mb-4">
              {formatDate(selectedDate)}
            </h3>
            
            <div className="space-y-3">
              {selectedEvents.length === 0 ? (
                <div className="text-center py-6 opacity-70">
                  <div className="mb-4 text-5xl">📅</div>
                  <p>No events scheduled</p>
                  <button className="mt-4 px-4 py-2 bg-gradient-to-r from-[#92ada4] to-[#4a7b9d] text-white rounded-full">
                    Add Event
                  </button>
                </div>
              ) : (
                selectedEvents.map(event => (
                  <div 
                    key={event.id}
                    className={`p-4 rounded-xl ${
                      darkMode ? 'bg-slate-700' : 'bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{event.title}</h4>
                        <p className="text-sm opacity-75">
                          {formatTime(event.date)} • {event.duration} min
                        </p>
                      </div>
                      <div className={`w-4 h-4 rounded-full ${event.color}`}></div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                        Edit
                      </button>
                      <button className="text-xs px-3 py-1 rounded-full bg-red-500/20 backdrop-blur-sm text-red-500">
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Add Event Form */}
          <div className={`rounded-3xl p-6 backdrop-blur-sm border transition-all ${
            darkMode 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <h3 className="text-xl font-bold mb-4">Add New Event</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Event Title</label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-gray-100 border-gray-200'
                  }`}
                  placeholder="Meeting, Appointment, etc."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
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
              
              <div>
                <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                <select className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-gray-100 border-gray-200'
                }`}>
                  <option>15</option>
                  <option>30</option>
                  <option>45</option>
                  <option>60</option>
                  <option>90</option>
                  <option>120</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <div className="flex gap-2">
                  {[
                    { name: 'Blue', value: 'bg-blue-500' },
                    { name: 'Green', value: 'bg-green-500' },
                    { name: 'Red', value: 'bg-red-500' },
                    { name: 'Purple', value: 'bg-purple-500' },
                    { name: 'Yellow', value: 'bg-yellow-500' },
                  ].map(color => (
                    <button
                      key={color.name}
                      className={`w-8 h-8 rounded-full ${color.value} border-2 border-white`}
                    ></button>
                  ))}
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#92ada4] to-[#4a7b9d] text-white font-medium rounded-lg transition-colors"
              >
                Add Event
              </button>
            </form>
          </div>
          
          {/* Upcoming Events */}
          <div className={`rounded-3xl p-6 backdrop-blur-sm border transition-all ${
            darkMode 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
            
            <div className="space-y-4">
              {events
                .filter(event => event.date > new Date())
                .sort((a, b) => a.date - b.date)
                .slice(0, 4)
                .map(event => (
                  <div 
                    key={event.id}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${event.color}`}>
                      <span className="font-bold">{event.date.getDate()}</span>
                      <span className="text-xs">{event.date.toLocaleString('en-US', { month: 'short' })}</span>
                    </div>
                    <div>
                      <h4 className="font-bold">{event.title}</h4>
                      <p className="text-sm opacity-75">
                        {formatTime(event.date)} • {event.duration} min
                      </p>
                    </div>
                  </div>
                ))}
              
              {events.filter(event => event.date > new Date()).length === 0 && (
                <div className="text-center py-6 opacity-70">
                  <div className="mb-4 text-5xl">🎉</div>
                  <p>No upcoming events</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 backdrop-blur-lg border-t p-4 flex justify-around ${
        darkMode 
          ? 'bg-slate-800/80 border-slate-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        {[
          { icon: <FiHome className="text-xl" />, label: 'Home', path: '/dashboard' },
          { icon: <FiCalendar className="text-xl text-[#92ada4]" />, label: 'calender', path: '/calender', active: true },
          { icon: <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#92ada4] to-[#4a7b9d] flex items-center justify-center -mt-6">
                  <FiPlus className="text-white text-xl" />
                </div>, label: 'Add', path: '/add' },
          { icon: <FiClock className="text-xl" />, label: 'Focus', path: '/focus' },
          { icon: <FiUser className="text-xl" />, label: 'Profile', path: '/profile' }
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

export default Calender;