import React, { useState, useEffect } from 'react';
import { Calendar, Users, Save, FileText } from 'lucide-react';
import { useAppContext } from '../../context/StudentContext';

const AttendancePage = () => {
  const { students, attendance, saveAttendance } = useAppContext();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [attendanceData, setAttendanceData] = useState({});
  const [showMonthly, setShowMonthly] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const grades = [...new Set(students.map(s => s.grade))].sort();
  const sections = [...new Set(students.map(s => s.section))].sort();

  const filteredStudents = students.filter(s => 
    (!selectedGrade || s.grade === selectedGrade) &&
    (!selectedSection || s.section === selectedSection)
  );

  // Load existing attendance data when filters change
  useEffect(() => {
    const existing = attendance.find(a => 
      a.date === date && 
      a.grade === selectedGrade && 
      a.section === selectedSection
    );
    
    if (existing) {
      const data = {};
      existing.entries.forEach(e => {
        data[e.studentId] = e.status;
      });
      setAttendanceData(data);
    } else {
      setAttendanceData({});
    }
  }, [date, selectedGrade, selectedSection, attendance]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceData({ ...attendanceData, [studentId]: status });
  };

  const handleSave = () => {
    if (!selectedGrade || !selectedSection) {
      alert('Please select grade and section');
      return;
    }

    const entries = filteredStudents.map(s => ({
      studentId: s.id,
      status: attendanceData[s.id] || 'absent'
    }));

    saveAttendance({
      date,
      grade: selectedGrade,
      section: selectedSection,
      entries
    });

    alert('Attendance saved successfully!');
  };

  const markAllPresent = () => {
    const data = {};
    filteredStudents.forEach(s => {
      data[s.id] = 'present';
    });
    setAttendanceData(data);
  };

  const markAllAbsent = () => {
    const data = {};
    filteredStudents.forEach(s => {
      data[s.id] = 'absent';
    });
    setAttendanceData(data);
  };

  const getMonthlyStats = () => {
    const monthAttendance = attendance.filter(a => a.date.startsWith(selectedMonth));
    const stats = {};

    filteredStudents.forEach(student => {
      let present = 0;
      let total = 0;

      monthAttendance.forEach(a => {
        const entry = a.entries.find(e => e.studentId === student.id);
        if (entry) {
          total++;
          if (entry.status === 'present') present++;
        }
      });

      stats[student.id] = {
        present,
        total,
        percentage: total > 0 ? Math.round((present / total) * 100) : 0
      };
    });

    return stats;
  };

  // Monthly Report View
  if (showMonthly) {
    const monthlyStats = getMonthlyStats();
    const overallPresent = Object.values(monthlyStats).reduce((sum, s) => sum + s.present, 0);
    const overallTotal = Object.values(monthlyStats).reduce((sum, s) => sum + s.total, 0);
    const overallPercentage = overallTotal > 0 ? Math.round((overallPresent / overallTotal) * 100) : 0;
    
    return (
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>Monthly Attendance Report</h2>
            <p className="text-muted mb-0">View attendance statistics by month</p>
          </div>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowMonthly(false)}
          >
            Back to Mark Attendance
          </button>
        </div>

        {/* Filters */}
        <div className="sf-card p-4 mb-4">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Month</label>
              <input
                type="month"
                className="form-control"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Grade</label>
              <select 
                className="form-select"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
              >
                <option value="">Select Grade</option>
                {grades.map(g => <option key={g} value={g}>Grade {g}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Section</label>
              <select 
                className="form-select"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="">Select Section</option>
                {sections.map(s => <option key={s} value={s}>Section {s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Overall Statistics */}
        {filteredStudents.length > 0 && (
          <div className="sf-card p-4 mb-4">
            <h6 className="mb-3">Overall Statistics</h6>
            <div className="row g-3">
              <div className="col-md-3">
                <div className="p-3 bg-light rounded">
                  <div className="small text-muted mb-1">Total Students</div>
                  <h4 className="mb-0">{filteredStudents.length}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 bg-success bg-opacity-10 rounded">
                  <div className="small text-muted mb-1">Total Present</div>
                  <h4 className="mb-0 text-success">{overallPresent}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 bg-danger bg-opacity-10 rounded">
                  <div className="small text-muted mb-1">Total Absent</div>
                  <h4 className="mb-0 text-danger">{overallTotal - overallPresent}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 bg-primary bg-opacity-10 rounded">
                  <div className="small text-muted mb-1">Average Attendance</div>
                  <h4 className="mb-0 text-primary">{overallPercentage}%</h4>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students Table */}
        <div className="sf-card sf-table">
          {filteredStudents.length === 0 ? (
            <div className="empty-state">
              <Calendar size={48} />
              <h5 className="mt-3">No students found</h5>
              <p>Select grade and section to view monthly report</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Student Name</th>
                    <th>Present Days</th>
                    <th>Total Days</th>
                    <th>Attendance %</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => {
                    const stats = monthlyStats[student.id] || { present: 0, total: 0, percentage: 0 };
                    return (
                      <tr key={student.id}>
                        <td className="fw-bold">{student.name}</td>
                        <td>{stats.present}</td>
                        <td>{stats.total}</td>
                        <td>
                          <div className="progress" style={{ height: '20px' }}>
                            <div 
                              className={`progress-bar ${
                                stats.percentage >= 90 ? 'bg-success' :
                                stats.percentage >= 75 ? 'bg-primary' :
                                stats.percentage >= 60 ? 'bg-warning' : 'bg-danger'
                              }`}
                              style={{ width: `${stats.percentage}%` }}
                            >
                              {stats.percentage}%
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${
                            stats.percentage >= 90 ? 'bg-success' :
                            stats.percentage >= 75 ? 'bg-primary' :
                            stats.percentage >= 60 ? 'bg-warning' : 'bg-danger'
                          }`}>
                            {stats.percentage >= 90 ? 'Excellent' :
                             stats.percentage >= 75 ? 'Good' :
                             stats.percentage >= 60 ? 'Fair' : 'Poor'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mark Attendance View
  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Mark Attendance</h2>
          <p className="text-muted mb-0">Record daily student attendance</p>
        </div>
        <button 
          className="btn btn-outline-primary d-flex align-items-center gap-2"
          onClick={() => setShowMonthly(true)}
        >
          <FileText size={18} />
          View Monthly Report
        </button>
      </div>

      {/* Filters */}
      <div className="sf-card p-4 mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Grade</label>
            <select 
              className="form-select"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="">Select Grade</option>
              {grades.map(g => <option key={g} value={g}>Grade {g}</option>)}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Section</label>
            <select 
              className="form-select"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="">Select Section</option>
              {sections.map(s => <option key={s} value={s}>Section {s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {selectedGrade && selectedSection && filteredStudents.length > 0 && (
        <div className="mb-3 d-flex gap-2">
          <button 
            className="btn btn-sm btn-success"
            onClick={markAllPresent}
          >
            Mark All Present
          </button>
          <button 
            className="btn btn-sm btn-danger"
            onClick={markAllAbsent}
          >
            Mark All Absent
          </button>
        </div>
      )}

      {/* Students Attendance Table */}
      <div className="sf-card sf-table">
        {!selectedGrade || !selectedSection ? (
          <div className="empty-state">
            <Calendar size={48} />
            <h5 className="mt-3">Select Grade and Section</h5>
            <p>Choose a grade and section to mark attendance</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="empty-state">
            <Users size={48} />
            <h5 className="mt-3">No students found</h5>
            <p>No students in selected grade and section</p>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Grade</th>
                    <th>Section</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td className="fw-bold">{student.name}</td>
                      <td>{student.grade}</td>
                      <td>{student.section}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className={`btn btn-sm ${
                              attendanceData[student.id] === 'present' 
                                ? 'btn-success' 
                                : 'btn-outline-success'
                            }`}
                            onClick={() => handleStatusChange(student.id, 'present')}
                          >
                            Present
                          </button>
                          <button
                            className={`btn btn-sm ${
                              attendanceData[student.id] === 'absent' 
                                ? 'btn-danger' 
                                : 'btn-outline-danger'
                            }`}
                            onClick={() => handleStatusChange(student.id, 'absent')}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 border-top">
              <button 
                className="sf-primary-btn"
                onClick={handleSave}
              >
                <Save size={18} />
                Save Attendance
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;