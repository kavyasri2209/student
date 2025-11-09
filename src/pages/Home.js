import React from "react";
import { FiUser, FiEdit, FiList, FiSearch } from "react-icons/fi";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">StudentFlow</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Students</li>
          <li>Attendance</li>
          <li>Grades</li>
          <li>Reports</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>StudentFlow – Smart Student Management</h1>
        <p>
          A simple and powerful platform for schools and teachers to manage
          student records, attendance, and grades efficiently.
        </p>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <FiUser className="icon" />
          <h3>Student Management</h3>
          <p>Add, edit, and remove student records with ease.</p>
        </div>

        <div className="feature-card">
          <FiList className="icon" />
          <h3>Attendance Tracking</h3>
          <p>Mark daily attendance and view monthly reports.</p>
        </div>

        <div className="feature-card">
          <FiEdit className="icon" />
          <h3>Grade Management</h3>
          <p>Track subject-wise performance and generate grade sheets.</p>
        </div>

        <div className="feature-card">
          <FiSearch className="icon" />
          <h3>Search & Filter</h3>
          <p>Quickly find students by grade or performance.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 StudentFlow | Built by React Rangers 💻</p>
      </footer>
    </div>
  );
};

export default Home;
