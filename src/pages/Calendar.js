import React, { useState } from "react";
import { useStudents } from "../context/StudentContext";
import "./Calendar.css";

export default function Calendar() {
  const { calendar, setCalendar } = useStudents();
  const [form, setForm] = useState({ date:"", title:"" });

  const add = (e) => {
    e.preventDefault();
    if (!form.date || !form.title) return;
    setCalendar(prev => [...prev, { id: crypto.randomUUID(), ...form }]);
    setForm({ date:"", title:"" });
  };

  const remove = (id) => setCalendar(prev => prev.filter(e => e.id !== id));

  return (
    <div className="container">
      <h2 className="section-title">Academic Calendar</h2>

      <form className="card grid" style={{gridTemplateColumns:"1fr 2fr auto"}} onSubmit={add}>
        <div><label>Date</label><input type="date" className="input" value={form.date} onChange={(e)=>setForm({...form, date:e.target.value})} /></div>
        <div><label>Event</label><input className="input" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} /></div>
        <div style={{alignSelf:"end"}}><button className="btn btn-primary">Add</button></div>
      </form>

      <div className="card">
        <table className="table">
          <thead><tr><th>Date</th><th>Event</th><th></th></tr></thead>
          <tbody>
            {calendar.sort((a,b)=>a.date.localeCompare(b.date)).map(e=>(
              <tr key={e.id}>
                <td>{e.date}</td>
                <td>{e.title}</td>
                <td style={{textAlign:"right"}}><button className="btn btn-danger" onClick={()=>remove(e.id)}>Delete</button></td>
              </tr>
            ))}
            {!calendar.length && <tr><td colSpan="3">No events</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
