import React from "react";
import { FiUser, FiEdit, FiList, FiSearch } from "react-icons/fi";
import StudentSection from "../components/StudentSection";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>EduTrack</h1>
          <p>Manage students, track attendance, record grades, view calendar, and post notices — all in one place.</p>
        </div>
      </section>

      <section className="container grid grid-4">
        <div className="card center">
          <FiUser className="icon" />
          <h3>Student Management</h3>
          <p>Add, edit, and organize student records.</p>
        </div>
        <div className="card center">
          <FiList className="icon" />
          <h3>Attendance</h3>
          <p>Mark daily attendance and track %.</p>
        </div>
        <div className="card center">
          <FiEdit className="icon" />
          <h3>Grades</h3>
          <p>Subject-wise grading and performance.</p>
        </div>
        <div className="card center">
          <FiSearch className="icon" />
          <h3>Search & Filter</h3>
          <p>Find students fast with filters.</p>
        </div>
      </section>

      {/* Student quick dashboard */}
      <StudentSection />
    </div>
  );
}
