import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Footer from "./pages/Footer";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentsList from "./components/students/StudentsList";
import AttendancePage from "./components/attendence/AttendancePage";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import StudentProfile from "./components/students/StudentProfile";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected area with sidebar/topbar */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<StudentsList />} />
          <Route path="/students/:id" element={<StudentProfile />} />
          <Route path="/attendance" element={<AttendancePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
