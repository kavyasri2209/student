import React from "react";
import { useStudents } from "../context/StudentContext";
import { FiPieChart, FiCalendar, FiBookOpen, FiBell } from "react-icons/fi";
import "./StudentSection.css";

export default function StudentSection() {
  const { students, avgGrade, notices, calendar } = useStudents();

  const overallAttendance = (() => {
    if (!students.length) return 0;
    const sumPresent = students.reduce((a, s) => a + (s.attendance?.present || 0), 0);
    const sumTotal = students.reduce((a, s) => a + (s.attendance?.total || 0), 0);
    return sumTotal ? Math.round((sumPresent / sumTotal) * 100) : 0;
  })();

  const overallAvgGrade = (() => {
    if (!students.length) return 0;
    const avgs = students.map((s) => avgGrade(s.grades));
    const sum = avgs.reduce((a, b) => a + b, 0);
    return Math.round(sum / avgs.length);
  })();

  const nextEvent = calendar.slice().sort((a, b) => a.date.localeCompare(b.date))[0];

  return (
    <section className="student-section">
      <div className="container">
        <h2 className="section-title">Student Dashboard</h2>
        <div className="grid grid-4">
          <div className="card stat">
            <FiPieChart />
            <div>
              <h3>{overallAttendance}%</h3>
              <p>Overall Attendance</p>
            </div>
          </div>
          <div className="card stat">
            <FiBookOpen />
            <div>
              <h3>{overallAvgGrade}</h3>
              <p>Average Grade</p>
            </div>
          </div>
          <div className="card stat">
            <FiCalendar />
            <div>
              <h3>{nextEvent ? nextEvent.date : "—"}</h3>
              <p>{nextEvent ? nextEvent.title : "No upcoming events"}</p>
            </div>
          </div>
          <div className="card stat">
            <FiBell />
            <div>
              <h3>{notices.length}</h3>
              <p>Active Notices</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
