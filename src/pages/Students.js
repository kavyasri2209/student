import React, { useMemo, useState } from "react";
import { useStudents } from "../context/StudentContext";
import { useAuth } from "../context/AuthContext";
import "./Students.css";

export default function Students() {
  const { students, addStudent, updateStudent, removeStudent } = useStudents();
  const { currentUser } = useAuth();
  const canDelete = currentUser?.role === "admin";
  const canCreate = ["admin", "coordinator"].includes(currentUser?.role);

  const [form, setForm] = useState({ id:"", name:"", email:"", grade:"", section:"", enrolled:"" });
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return students.filter(
      (s) => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.grade.includes(q)
    );
  }, [students, query]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.id || !form.name) return;
    addStudent({ ...form, attendance: { present: 0, total: 0 }, grades: {} });
    setForm({ id:"", name:"", email:"", grade:"", section:"", enrolled:"" });
  };

  return (
    <div className="container">
      <h2 className="section-title">Students</h2>

      <div className="card">
        <input className="input" placeholder="Search by name, ID or grade..." value={query} onChange={(e)=>setQuery(e.target.value)} />
      </div>

      {canCreate && (
        <form className="card grid" style={{gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))"}} onSubmit={onSubmit}>
          <div><label>ID</label><input className="input" value={form.id} onChange={(e)=>setForm({...form,id:e.target.value})} /></div>
          <div><label>Name</label><input className="input" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} /></div>
          <div><label>Email</label><input className="input" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} /></div>
          <div><label>Grade</label><input className="input" value={form.grade} onChange={(e)=>setForm({...form,grade:e.target.value})} /></div>
          <div><label>Section</label><input className="input" value={form.section} onChange={(e)=>setForm({...form,section:e.target.value})} /></div>
          <div><label>Enrollment Date</label><input type="date" className="input" value={form.enrolled} onChange={(e)=>setForm({...form,enrolled:e.target.value})} /></div>
          <div style={{alignSelf:"end"}}><button className="btn btn-primary" type="submit">Add Student</button></div>
        </form>
      )}

      <div className="card">
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Grade</th><th>Section</th><th>Email</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((s)=>(
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.grade}</td>
                <td>{s.section}</td>
                <td>{s.email}</td>
                <td style={{display:"flex", gap:8}}>
                  <button className="btn" onClick={()=>updateStudent(s.id, { name: prompt("New name:", s.name) || s.name })}>Edit</button>
                  {canDelete && <button className="btn btn-danger" onClick={()=>removeStudent(s.id)}>Delete</button>}
                </td>
              </tr>
            ))}
            {!filtered.length && <tr><td colSpan="6">No students found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
