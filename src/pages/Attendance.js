import React, { useState } from "react";
import { useStudents } from "../context/StudentContext";
import "./Attendance.css";

export default function Attendance() {
  const { students, setAttendance, addAttendanceDay } = useStudents();
  const [filter, setFilter] = useState("");

  const shown = students.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()) || s.id.toLowerCase().includes(filter.toLowerCase()));

  const pct = (s) => {
    const { present=0, total=0 } = s.attendance || {};
    return total ? Math.round((present/total)*100) : 0;
  };

  return (
    <div className="container">
      <h2 className="section-title">Attendance</h2>

      <div className="card" style={{display:"flex", gap:12}}>
        <input className="input" placeholder="Search student..." value={filter} onChange={(e)=>setFilter(e.target.value)} />
        <button className="btn" onClick={addAttendanceDay}>Add New Day</button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Present</th><th>Total</th><th>%</th><th>Mark</th></tr>
          </thead>
          <tbody>
            {shown.map(s=>(
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.attendance.present}</td>
                <td>{s.attendance.total}</td>
                <td>{pct(s)}%</td>
                <td style={{display:"flex", gap:8}}>
                  <button className="btn btn-primary" onClick={()=>setAttendance(s.id, +1)}>Present</button>
                  <button className="btn" onClick={()=>setAttendance(s.id, 0)}>—</button>
                </td>
              </tr>
            ))}
            {!shown.length && <tr><td colSpan="6">No records</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
