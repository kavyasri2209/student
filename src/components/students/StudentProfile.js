import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, GraduationCap, Calendar as CalendarIcon, BookOpen } from 'lucide-react';
import { useAppContext } from '../../context/StudentContext';
import { useParams, useNavigate } from 'react-router-dom';

const StudentProfile = ({ student: propStudent, onBack }) => {
  const { attendance, grades, students } = useAppContext();
  const params = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(propStudent || null);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    if (!propStudent && params?.id) {
      const found = students.find(s => s.id === params.id);
      setStudent(found || null);
    }
  }, [propStudent, params, students]);

  if (!student) {
    return (
      <div className="p-4">
        <div className="sf-card p-4">
          <h5>Student not found</h5>
          <p className="text-muted">The requested student does not exist.</p>
          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={() => navigate('/students')}>Back to Students</button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate student's attendance statistics
  const studentAttendance = attendance.flatMap(a => 
    a.entries
      .filter(e => e.studentId === student.id)
      .map(e => ({ ...e, date: a.date }))
  );
  
  const presentCount = studentAttendance.filter(a => a.status === 'present').length;
  const totalCount = studentAttendance.length || 1;
  const attendancePercentage = Math.round((presentCount / totalCount) * 100);

  // Get student's grades
  const studentGrades = grades.filter(g => g.studentId === student.id);
  const averageMarks = studentGrades.length > 0
    ? Math.round(studentGrades.reduce((sum, g) => sum + g.marks, 0) / studentGrades.length)
    : 0;

  const getPerformanceBadge = (marks) => {
    if (marks >= 90) return { class: 'bg-success', text: 'Excellent' };
    if (marks >= 75) return { class: 'bg-primary', text: 'Good' };
    if (marks >= 60) return { class: 'bg-warning', text: 'Average' };
    return { class: 'bg-danger', text: 'Needs Improvement' };
  };

  return (
    <div className="p-4">
      {/* Back Button */}
      <button 
        className="btn btn-link mb-3 p-0 d-flex align-items-center gap-2" 
        onClick={() => {
          if (onBack) onBack(); else navigate('/students');
        }}
      >
        <ArrowLeft size={18} />
        Back to Students List
      </button>
      
      {/* Student Header Card */}
      <div className="sf-card p-4 mb-4">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                   style={{ width: '60px', height: '60px', fontSize: '24px' }}>
                {student.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="mb-1">{student.name}</h3>
                <p className="text-muted mb-0">
                  Grade {student.grade} - Section {student.section}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <div className="badge bg-primary p-2 fs-6">
              ID: {student.id}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <User size={16} className="me-1" />
            Personal Info
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'academic' ? 'active' : ''}`}
            onClick={() => setActiveTab('academic')}
          >
            <GraduationCap size={16} className="me-1" />
            Academic Details
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'attendance' ? 'active' : ''}`}
            onClick={() => setActiveTab('attendance')}
          >
            <CalendarIcon size={16} className="me-1" />
            Attendance
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'grades' ? 'active' : ''}`}
            onClick={() => setActiveTab('grades')}
          >
            <BookOpen size={16} className="me-1" />
            Grades
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      {activeTab === 'personal' && (
        <div className="sf-card p-4">
          <h5 className="mb-4">Personal Information</h5>
          <div className="row g-4">
            <div className="col-md-6">
              <label className="text-muted small d-block mb-1">Full Name</label>
              <p className="mb-0 fw-bold">{student.name}</p>
            </div>
            <div className="col-md-6">
              <label className="text-muted small d-block mb-1">Email Address</label>
              <p className="mb-0">{student.email}</p>
            </div>
            <div className="col-md-6">
              <label className="text-muted small d-block mb-1">Phone Number</label>
              <p className="mb-0">{student.phone}</p>
            </div>
            <div className="col-md-6">
              <label className="text-muted small d-block mb-1">Address</label>
              <p className="mb-0">{student.address}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'academic' && (
        <div className="sf-card p-4">
          <h5 className="mb-4">Academic Information</h5>
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <label className="text-muted small d-block mb-1">Grade</label>
              <p className="mb-0 fw-bold">{student.grade}</p>
            </div>
            <div className="col-md-4">
              <label className="text-muted small d-block mb-1">Section</label>
              <p className="mb-0 fw-bold">{student.section}</p>
            </div>
            <div className="col-md-4">
              <label className="text-muted small d-block mb-1">Enrollment Date</label>
              <p className="mb-0">{student.enrollmentDate}</p>
            </div>
          </div>
          
          <div className="border-top pt-4 mt-4">
            <h6 className="mb-3">Overall Performance</h6>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="p-3 bg-light rounded">
                  <div className="small text-muted mb-1">Average Marks</div>
                  <h3 className="mb-0">{averageMarks}%</h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-light rounded">
                  <div className="small text-muted mb-1">Attendance Rate</div>
                  <h3 className="mb-0">{attendancePercentage}%</h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-light rounded">
                  <div className="small text-muted mb-1">Subjects Graded</div>
                  <h3 className="mb-0">{studentGrades.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="sf-card p-4">
          <h5 className="mb-4">Attendance Records</h5>
          
          {/* Attendance Summary */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="p-3 bg-success bg-opacity-10 rounded">
                <div className="small text-muted mb-1">Present Days</div>
                <h3 className="mb-0 text-success">{presentCount}</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-danger bg-opacity-10 rounded">
                <div className="small text-muted mb-1">Absent Days</div>
                <h3 className="mb-0 text-danger">{totalCount - presentCount}</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-primary bg-opacity-10 rounded">
                <div className="small text-muted mb-1">Attendance Rate</div>
                <h3 className="mb-0 text-primary">{attendancePercentage}%</h3>
              </div>
            </div>
          </div>

          {/* Recent Attendance */}
          {studentAttendance.length > 0 ? (
            <>
              <h6 className="mb-3">Recent Attendance History</h6>
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead className="table-light">
                    <tr>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentAttendance.slice(-15).reverse().map((a, idx) => (
                      <tr key={idx}>
                        <td>{a.date}</td>
                        <td>
                          <span className={`badge ${
                            a.status === 'present' ? 'bg-success' : 'bg-danger'
                          }`}>
                            {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="text-center text-muted py-4">
              <CalendarIcon size={48} opacity={0.3} />
              <p className="mt-2 mb-0">No attendance records found</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'grades' && (
        <div className="sf-card p-4">
          <h5 className="mb-4">Grade Report</h5>
          
          {studentGrades.length > 0 ? (
            <>
              {/* Average Performance */}
              <div className="mb-4 p-3 bg-light rounded">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="small text-muted mb-1">Overall Average</div>
                    <h3 className="mb-0">{averageMarks}%</h3>
                  </div>
                  <div className="col-md-6">
                    <span className={`badge ${getPerformanceBadge(averageMarks).class} p-2`}>
                      {getPerformanceBadge(averageMarks).text}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grades Table */}
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Subject</th>
                      <th>Marks</th>
                      <th>Term</th>
                      <th>Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentGrades.map((g) => {
                      const badge = getPerformanceBadge(g.marks);
                      return (
                        <tr key={g.id}>
                          <td className="fw-bold">{g.subject}</td>
                          <td>{g.marks}%</td>
                          <td>{g.term}</td>
                          <td>
                            <span className={`badge ${badge.class}`}>
                              {badge.text}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="text-center text-muted py-4">
              <BookOpen size={48} opacity={0.3} />
              <p className="mt-2 mb-0">No grades recorded yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentProfile;