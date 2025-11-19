import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

// Sample data generator
const generateSampleData = () => {
  const students = [
    { id: '1', name: 'John Smith', email: 'john.smith@school.com', phone: '555-0101', address: '123 Main St', grade: '10', section: 'A', enrollmentDate: '2024-01-15' },
    { id: '2', name: 'Emma Johnson', email: 'emma.j@school.com', phone: '555-0102', address: '456 Oak Ave', grade: '10', section: 'A', enrollmentDate: '2024-01-15' },
    { id: '3', name: 'Michael Brown', email: 'michael.b@school.com', phone: '555-0103', address: '789 Pine Rd', grade: '10', section: 'B', enrollmentDate: '2024-01-20' },
    { id: '4', name: 'Sophia Davis', email: 'sophia.d@school.com', phone: '555-0104', address: '321 Elm St', grade: '11', section: 'A', enrollmentDate: '2024-01-15' },
    { id: '5', name: 'James Wilson', email: 'james.w@school.com', phone: '555-0105', address: '654 Maple Dr', grade: '11', section: 'B', enrollmentDate: '2024-01-18' },
  ];

  const today = new Date().toISOString().split('T')[0];
  const attendance = [
    {
      id: 'att1',
      date: today,
      grade: '10',
      section: 'A',
      entries: [
        { studentId: '1', status: 'present' },
        { studentId: '2', status: 'present' },
      ]
    }
  ];

  const grades = [
    { id: 'g1', studentId: '1', subject: 'Mathematics', grade: '10', section: 'A', marks: 85, term: 'Midterm' },
    { id: 'g2', studentId: '1', subject: 'Science', grade: '10', section: 'A', marks: 92, term: 'Midterm' },
    { id: 'g3', studentId: '2', subject: 'Mathematics', grade: '10', section: 'A', marks: 78, term: 'Midterm' },
    { id: 'g4', studentId: '2', subject: 'Science', grade: '10', section: 'A', marks: 88, term: 'Midterm' },
  ];

  return { students, attendance, grades };
};

export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Initialize data from localStorage or sample data
  useEffect(() => {
    const storedStudents = localStorage.getItem('sf_students');
    const storedAttendance = localStorage.getItem('sf_attendance');
    const storedGrades = localStorage.getItem('sf_grades');
    const storedUser = localStorage.getItem('sf_user');

    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
      setAttendance(JSON.parse(storedAttendance || '[]'));
      setGrades(JSON.parse(storedGrades || '[]'));
    } else {
      const sampleData = generateSampleData();
      setStudents(sampleData.students);
      setAttendance(sampleData.attendance);
      setGrades(sampleData.grades);
    }

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Persist students to localStorage
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('sf_students', JSON.stringify(students));
    }
  }, [students]);

  // Persist attendance to localStorage
  useEffect(() => {
    localStorage.setItem('sf_attendance', JSON.stringify(attendance));
  }, [attendance]);

  // Persist grades to localStorage
  useEffect(() => {
    localStorage.setItem('sf_grades', JSON.stringify(grades));
  }, [grades]);

  // Student operations
  const addStudent = (student) => {
    const newStudent = { ...student, id: Date.now().toString() };
    setStudents([...students, newStudent]);
  };

  const updateStudent = (id, updatedStudent) => {
    setStudents(students.map(s => s.id === id ? { ...updatedStudent, id } : s));
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
    setAttendance(attendance.map(a => ({
      ...a,
      entries: a.entries.filter(e => e.studentId !== id)
    })));
    setGrades(grades.filter(g => g.studentId !== id));
  };

  // Attendance operations
  const saveAttendance = (record) => {
    const existing = attendance.find(a => 
      a.date === record.date && 
      a.grade === record.grade && 
      a.section === record.section
    );
    
    if (existing) {
      setAttendance(attendance.map(a => 
        a.id === existing.id ? record : a
      ));
    } else {
      setAttendance([...attendance, { ...record, id: Date.now().toString() }]);
    }
  };

  // Grades operations
  const saveGrades = (gradeRecords) => {
    const updatedGrades = [...grades];
    gradeRecords.forEach(newGrade => {
      const existingIndex = updatedGrades.findIndex(
        g => g.studentId === newGrade.studentId && 
             g.subject === newGrade.subject && 
             g.term === newGrade.term
      );
      
      if (existingIndex >= 0) {
        updatedGrades[existingIndex] = newGrade;
      } else {
        updatedGrades.push({ ...newGrade, id: Date.now().toString() + Math.random() });
      }
    });
    setGrades(updatedGrades);
  };

  // Auth operations
  const login = (email, password, role) => {
    const user = { email, role };
    setCurrentUser(user);
    localStorage.setItem('sf_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('sf_user');
    setCurrentPage('login');
  };

  return (
    <AppContext.Provider value={{
      students, attendance, grades, currentUser, currentPage,
      setCurrentPage, addStudent, updateStudent, deleteStudent,
      saveAttendance, saveGrades, login, logout,
      sidebarCollapsed, setSidebarCollapsed
    }}>
      {children}
    </AppContext.Provider>
  );
};