import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { useAppContext } from '../context/StudentContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Teacher');
  const { login, setCurrentPage } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email && password) {
      login(email, password, role);
      setCurrentPage('dashboard');
      navigate('/dashboard');
    } else {
      alert('Please enter email and password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="text-center mb-4">
          <Users size={40} color="#2563EB" className="mb-2" />
          <h2 style={{ color: '#2563EB' }}>StudentFlow</h2>
          <p className="text-muted">Student Management System</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@school.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select 
              className="form-select" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
              <option value="Coordinator">Coordinator</option>
            </select>
          </div>
          
          <button type="submit" className="sf-primary-btn w-100 justify-content-center">
            Login to Dashboard
          </button>
        </form>
        
        <div className="text-center mt-3">
          <small className="text-muted">
            Demo: Use any email/password to login
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;