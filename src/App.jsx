import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Calender from './Calender';
import Focus from './Focus';
import Add from './Add';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/focus" element={<Focus />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </Router>
  );
}

export default App;