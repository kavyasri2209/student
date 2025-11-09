import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { pathname } = useLocation();

  return (
    <header className="nav">
      <div className="nav-inner container">
        <Link to="/" className="brand">EduTrack</Link>
        <nav className="links">
          <Link className={pathname==="/"?"active":""} to="/">Home</Link>
          <Link className={pathname==="/students"?"active":""} to="/students">Students</Link>
          <Link className={pathname==="/attendance"?"active":""} to="/attendance">Attendance</Link>
          <Link className={pathname==="/grades"?"active":""} to="/grades">Grades</Link>
          <Link className={pathname==="/calendar"?"active":""} to="/calendar">Calendar</Link>
          <Link className={pathname==="/notices"?"active":""} to="/notices">Notices</Link>
        </nav>
        <div className="auth">
          {currentUser ? (
            <>
              <span className="badge">{currentUser.role}</span>
              <button className="btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link className="btn btn-primary" to="/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
