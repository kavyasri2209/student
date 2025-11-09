import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const StudentContext = createContext();
const KEY = "edutrack_students";
const NOTICES_KEY = "edutrack_notices";
const CAL_KEY = "edutrack_calendar";

const seedStudents = [
  { id: "S1001", name: "Aarav Singh", email: "aarav@example.com", grade: "10", section: "A", enrolled: "2024-06-10",
    attendance: { present: 160, total: 180 }, grades: { Math: 88, Science: 92, English: 81 } },
  { id: "S1002", name: "Diya Patel", email: "diya@example.com", grade: "9", section: "B", enrolled: "2024-06-12",
    attendance: { present: 150, total: 180 }, grades: { Math: 78, Science: 85, English: 90 } },
];

const seedNotices = [
  { id: "N1", title: "PTM on Friday", body: "Parent-Teacher Meeting at 3 PM.", date: "2025-11-12" },
  { id: "N2", title: "Unit Test Schedule", body: "Math on 18th, Science on 20th.", date: "2025-11-15" },
];

const seedCalendar = [
  { id: "C1", date: "2025-11-18", title: "Unit Test - Mathematics" },
  { id: "C2", date: "2025-11-20", title: "Unit Test - Science" },
  { id: "C3", date: "2025-12-05", title: "Sports Day" },
];

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    const rawN = localStorage.getItem(NOTICES_KEY);
    const rawC = localStorage.getItem(CAL_KEY);
    setStudents(raw ? JSON.parse(raw) : seedStudents);
    setNotices(rawN ? JSON.parse(rawN) : seedNotices);
    setCalendar(rawC ? JSON.parse(rawC) : seedCalendar);
  }, []);

  useEffect(() => localStorage.setItem(KEY, JSON.stringify(students)), [students]);
  useEffect(() => localStorage.setItem(NOTICES_KEY, JSON.stringify(notices)), [notices]);
  useEffect(() => localStorage.setItem(CAL_KEY, JSON.stringify(calendar)), [calendar]);

  // CRUD Students
  const addStudent = (s) => setStudents((prev) => [...prev, s]);
  const updateStudent = (id, next) =>
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...next } : s)));
  const removeStudent = (id) => setStudents((prev) => prev.filter((s) => s.id !== id));

  // Attendance helpers
  const setAttendance = (id, presentDelta) =>
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, attendance: { present: Math.max(0, s.attendance.present + presentDelta), total: s.attendance.total } }
          : s
      )
    );

  const addAttendanceDay = () =>
    setStudents((prev) => prev.map((s) => ({ ...s, attendance: { ...s.attendance, total: s.attendance.total + 1 } })));

  // Grades helpers
  const setGrade = (id, subject, score) =>
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, grades: { ...s.grades, [subject]: Number(score) } } : s
      )
    );

  const avgGrade = (g) => {
    const vals = Object.values(g || {});
    if (!vals.length) return 0;
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  };

  const value = useMemo(
    () => ({
      students, notices, calendar,
      addStudent, updateStudent, removeStudent,
      setAttendance, addAttendanceDay,
      setGrade, avgGrade,
      setNotices, setCalendar,
    }),
    [students, notices, calendar]
  );

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export const useStudents = () => useContext(StudentContext);
