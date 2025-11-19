import React from 'react';
import { Users, Calendar, BookOpen, Plus, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/StudentContext';

const Dashboard = () => {
  const { students, attendance, grades, setCurrentPage } = useAppContext();
  
  // Calculate today's attendance
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.find(a => a.date === today);
  const presentToday = todayAttendance?.entries.filter(e => e.status === 'present').length || 0;
  const totalToday = todayAttendance?.entries.length || students.length || 1;
  const attendancePercentage = Math.round((presentToday / totalToday) * 100);

  // Calculate pending grades
  const expectedGrades = students.length * 5; // Assuming 5 subjects
  const pendingGrades = expectedGrades - grades.length;

  // Calculate average performance
  const averageMarks = grades.length > 0
    ? Math.round(grades.reduce((sum, g) => sum + g.marks, 0) / grades.length)
    : 0;

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2>Dashboard</h2>
        <p className="text-muted">Overview of your school management system</p>
      </div>
      
      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="sf-stat-card primary">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h6 className="text-muted mb-2">Total Students</h6>
                <h2 className="mb-0">{students.length}</h2>
                <small className="text-muted">Enrolled students</small>
              </div>
              <Users size={40} color="#2563EB" opacity={0.3} />
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="sf-stat-card success">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h6 className="text-muted mb-2">Attendance Today</h6>
                <h2 className="mb-0">{attendancePercentage}%</h2>
                <small className="text-muted">{presentToday} of {totalToday} present</small>
              </div>
              <Calendar size={40} color="#10B981" opacity={0.3} />
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="sf-stat-card warning">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h6 className="text-muted mb-2">Pending Grades</h6>
                <h2 className="mb-0">{pendingGrades > 0 ? pendingGrades : 0}</h2>
                <small className="text-muted">Grade entries needed</small>
              </div>
              <BookOpen size={40} color="#F59E0B" opacity={0.3} />
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="sf-stat-card primary">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h6 className="text-muted mb-2">Average Performance</h6>
                <h2 className="mb-0">{averageMarks}%</h2>
                <small className="text-muted">Overall class average</small>
              </div>
              <TrendingUp size={40} color="#2563EB" opacity={0.3} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row g-4">
        <div className="col-md-8">
          <div className="sf-card p-4">
            <h5 className="mb-3">Quick Actions</h5>
            <div className="d-flex flex-wrap gap-3">
              <button 
                className="sf-primary-btn"
                onClick={() => setCurrentPage('students')}
              >
                <Plus size={20} />
                Add New Student
              </button>
              <button 
                className="btn btn-outline-primary d-flex align-items-center gap-2"
                onClick={() => setCurrentPage('attendance')}
              >
                <Calendar size={20} />
                Mark Attendance
              </button>
              <button 
                className="btn btn-outline-primary d-flex align-items-center gap-2"
                onClick={() => setCurrentPage('grades')}
              >
                <BookOpen size={20} />
                Enter Grades
              </button>
              <button 
                className="btn btn-outline-secondary d-flex align-items-center gap-2"
                onClick={() => setCurrentPage('reports')}
              >
                <BookOpen size={20} />
                View Reports
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="sf-card p-4">
            <h5 className="mb-3">Recent Activity</h5>
            <div className="d-flex flex-column gap-3">
              <div>
                <div className="small text-muted">Latest Updates</div>
                <div className="mt-2">
                  <div className="mb-2">
                    <span className="badge bg-success me-2">New</span>
                    <small>{students.length} students enrolled</small>
                  </div>
                  <div className="mb-2">
                    <span className="badge bg-primary me-2">Today</span>
                    <small>Attendance marked for {todayAttendance?.entries.length || 0} students</small>
                  </div>
                  <div>
                    <span className="badge bg-warning me-2">Pending</span>
                    <small>{pendingGrades > 0 ? pendingGrades : 0} grade entries remaining</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;