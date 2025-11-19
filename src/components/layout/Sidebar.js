import React from 'react';
import { Users, Calendar, BookOpen, FileText, LayoutDashboard } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/StudentContext';

const Sidebar = () => {
  const { setCurrentPage, sidebarCollapsed } = useAppContext();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, to: '/dashboard' },
    { id: 'students', label: 'Students', icon: <Users size={20} />, to: '/students' },
    { id: 'attendance', label: 'Attendance', icon: <Calendar size={20} />, to: '/attendance' },
    { id: 'grades', label: 'Grades', icon: <BookOpen size={20} />, to: '/grades' },
    { id: 'reports', label: 'Reports', icon: <FileText size={20} />, to: '/reports' },
  ];

  return (
    <div className={`sf-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sf-sidebar-header">
        <h4 className="m-0">
          <Users size={24} className="me-2" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
          StudentFlow
        </h4>
        <p className="text-muted small mb-0 mt-1">Management System</p>
      </div>
      
      <div className="sf-sidebar-nav">
        {navItems.map(item => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) => `sf-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;