import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [role, setRole] = useState("teacher");
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const submit = (e) => {
    e.preventDefault();
    login(name || "User", role);
    nav(from, { replace: true });
  };

  return (
    <div className="container" style={{maxWidth:520}}>
      <h2 className="section-title">Login</h2>
      <form className="card grid" style={{gridTemplateColumns:"1fr"}} onSubmit={submit}>
        <div>
          <label>Name</label>
          <input className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" />
        </div>
        <div>
          <label>Role</label>
          <select className="input" value={role} onChange={(e)=>setRole(e.target.value)}>
            <option value="admin">Administrator</option>
            <option value="coordinator">Coordinator</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div style={{textAlign:"right"}}>
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      <p style={{color:"#6b7280"}}>Role-based access demo: Admin = full, Coordinator = moderate, Teacher = limited.</p>
    </div>
  );
}
