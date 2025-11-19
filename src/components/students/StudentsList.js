import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Users } from 'lucide-react';
import { useAppContext } from '../../context/StudentContext';
import StudentForm from './StudentForm';
import StudentProfile from './StudentProfile';
import { useNavigate } from 'react-router-dom';

const StudentsList = () => {
  const { students, deleteStudent } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  // Get unique grades and sections
  const grades = [...new Set(students.map(s => s.grade))].sort();
  const sections = [...new Set(students.map(s => s.section))].sort();

  // Filter students
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = !filterGrade || s.grade === filterGrade;
    const matchesSection = !filterSection || s.section === filterSection;
    return matchesSearch && matchesGrade && matchesSection;
  });

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      deleteStudent(studentToDelete.id);
      setShowDeleteModal(false);
      setStudentToDelete(null);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  // If viewing student profile via local state, show that component
  if (selectedStudent) {
    return <StudentProfile student={selectedStudent} onBack={() => setSelectedStudent(null)} />;
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Students Management</h2>
          <p className="text-muted mb-0">View and manage student records</p>
        </div>
        <button 
          className="sf-primary-btn" 
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={20} />
          Add Student
        </button>
      </div>

      {/* Student Form */}
      {showForm && (
        <StudentForm 
          student={editingStudent}
          onClose={handleFormClose}
        />
      )}

      {/* Filters */}
      <div className="sf-card p-4 mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <Search size={20} />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select 
              className="form-select"
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
            >
              <option value="">All Grades</option>
              {grades.map(g => (
                <option key={g} value={g}>Grade {g}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select 
              className="form-select"
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
            >
              <option value="">All Sections</option>
              {sections.map(s => (
                <option key={s} value={s}>Section {s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="sf-card sf-table">
        {filteredStudents.length === 0 ? (
          <div className="empty-state">
            <Users size={48} />
            <h5 className="mt-3">No students found</h5>
            <p className="mb-0">
              {students.length === 0 
                ? "Add your first student to get started" 
                : "Try adjusting your search or filters"}
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Grade</th>
                  <th>Section</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Enrollment Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.id}>
                    <td className="fw-bold">{student.name}</td>
                    <td>{student.grade}</td>
                    <td>{student.section}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>{student.enrollmentDate}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <button 
                          className="action-btn"
                          onClick={() => navigate(`/students/${student.id}`)}
                          title="View Profile"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          className="action-btn"
                          onClick={() => handleEdit(student)}
                          title="Edit Student"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          className="action-btn danger"
                          onClick={() => handleDeleteClick(student)}
                          title="Delete Student"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="sf-modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="sf-modal" onClick={(e) => e.stopPropagation()}>
            <div className="p-4">
              <h5 className="mb-3">Confirm Delete</h5>
              <p>Are you sure you want to delete <strong>{studentToDelete?.name}</strong>?</p>
              <p className="text-danger small mb-3">
                This will also remove all attendance and grade records for this student. This action cannot be undone.
              </p>
              <div className="d-flex gap-2 justify-content-end">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  <Trash2 size={16} className="me-1" />
                  Delete Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsList;