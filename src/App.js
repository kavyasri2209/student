import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { StudentProvider } from "./context/StudentContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Grades from "./pages/Grades";
import Calendar from "./pages/Calendar";
import Notices from "./pages/Notices";
import Login from "./pages/Login";

function AppShell() {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" replace />} />

        {/* Role-based pages */}
        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRoles={["admin", "coordinator"]}>
              <Students />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRoles={["admin", "coordinator", "teacher"]}>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/grades"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <Grades />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute allowedRoles={["admin", "coordinator", "teacher"]}>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notices"
          element={
            <ProtectedRoute allowedRoles={["admin", "coordinator"]}>
              <Notices />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StudentProvider>
        <Router>
          <AppShell />
        </Router>
      </StudentProvider>
    </AuthProvider>
  );
}
