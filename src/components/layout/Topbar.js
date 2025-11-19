import React, { useState } from 'react';
import { Menu, LogOut, User } from 'lucide-react';
import { useAppContext } from '../../context/StudentContext';

const Topbar = () => {
  const { currentUser, logout, sidebarCollapsed, setSidebarCollapsed } = useAppContext();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
  };

  return (
    <div className="sf-topbar">
      <div className="d-flex align-items-center gap-3">
        <button 
          className="action-btn"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title="Toggle Sidebar"
        >
          <Menu size={24} />
        </button>
        <div>
          <h5 className="m-0">Welcome back, {currentUser?.role}</h5>
          <small className="text-muted">Manage your school efficiently</small>
        </div>
      </div>
      
      <div style={{ position: 'relative' }}>
        <button 
          className="btn btn-light d-flex align-items-center gap-2"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <User size={18} />
          <span>{currentUser?.email}</span>
        </button>
        
        {showDropdown && (
          <div style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            marginTop: '0.5rem',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            minWidth: '200px',
            zIndex: 1000
          }}>
            <div className="p-3 border-bottom">
              <div className="small text-muted">Signed in as</div>
              <div className="fw-bold">{currentUser?.email}</div>
              <div className="small text-muted">{currentUser?.role}</div>
            </div>
            
            <button
              className="btn btn-light w-100 text-start d-flex align-items-center gap-2 rounded-0"
              onClick={handleLogout}
              style={{ borderRadius: '0 0 0.5rem 0.5rem' }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;