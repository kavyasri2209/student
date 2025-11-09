import React, { useState } from "react";
import { useStudents } from "../context/StudentContext";
import "./Grades.css";

export default function Grades() {
  const { students, setGrade, avgGrade } = useStudents();
  const [subject, setSubject] = useState("Math");
  const [score, setScore] = useState("");
  const [targetId, setTargetId] = useState("");

  const selected = students.find(s => s.id === targetId);

  const submit = (e) => {
    e.preventDefault();
    if (!targetId || !subject || score === "") return;
    setGrade(targetId, subject, Number(score));
    setScore("");
  };

  return (
    <div className="container">
      <h2 className="section-title">Grades</h2>

      <form className="card grid" style={{gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))"}} onSubmit={submit}>
        <div>
          <label>Student</label>
          <select className="input" value={targetId} onChange={(e)=>setTargetId(e.target.value)}>
            <option value="">Select…</option>
            {students.map(s=><option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}
          </select>
        </div>
        <div>
          <label>Subject</label>
          <input className="input" value={subject} onChange={(e)=>setSubject(e.target.value)} />
        </div>
        <div>
          <label>Score</label>
          <input className="input" type="number" value={score} onChange={(e)=>setScore(e.target.value)} />
        </div>
        <div style={{alignSelf:"end"}}><button className="btn btn-primary">Save Grade</button></div>
      </form>

      <div className="card">
        <table className="table">
          <thead><tr><th>ID</th><th>Name</th><th>Subjects</th><th>Average</th></tr></thead>
          <tbody>
            {students.map(s=>(
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{Object.entries(s.grades || {}).map(([k,v])=>`${k}:${v}`).join(", ") || "—"}</td>
                <td>{avgGrade(s.grades)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="card">
          <h3>{selected.name} — Grades</h3>
          <pre>{JSON.stringify(selected.grades, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
