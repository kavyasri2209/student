import React, { useState } from "react";
import { useStudents } from "../context/StudentContext";
import "./Notices.css";

export default function Notices() {
  const { notices, setNotices } = useStudents();
  const [form, setForm] = useState({ title:"", body:"", date:new Date().toISOString().slice(0,10) });

  const add = (e) => {
    e.preventDefault();
    if (!form.title) return;
    setNotices(prev => [{ id: crypto.randomUUID(), ...form }, ...prev]);
    setForm({ title:"", body:"", date:new Date().toISOString().slice(0,10) });
  };

  const remove = (id) => setNotices(prev => prev.filter(n => n.id !== id));

  return (
    <div className="container">
      <h2 className="section-title">Notice Board</h2>

      <form className="card grid" style={{gridTemplateColumns:"1fr 2fr 1fr auto"}} onSubmit={add}>
        <div><label>Title</label><input className="input" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} /></div>
        <div><label>Message</label><input className="input" value={form.body} onChange={(e)=>setForm({...form, body:e.target.value})} /></div>
        <div><label>Date</label><input type="date" className="input" value={form.date} onChange={(e)=>setForm({...form, date:e.target.value})} /></div>
        <div style={{alignSelf:"end"}}><button className="btn btn-primary">Post</button></div>
      </form>

      <div className="grid" style={{gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))"}}>
        {notices.map(n=>(
          <div className="card" key={n.id}>
            <div className="badge" style={{marginBottom:8}}>{n.date}</div>
            <h3 style={{margin:"6px 0"}}>{n.title}</h3>
            <p style={{color:"#555"}}>{n.body || "—"}</p>
            <div style={{textAlign:"right"}}><button className="btn btn-danger" onClick={()=>remove(n.id)}>Delete</button></div>
          </div>
        ))}
        {!notices.length && <div className="card">No notices posted.</div>}
      </div>
    </div>
  );
}
