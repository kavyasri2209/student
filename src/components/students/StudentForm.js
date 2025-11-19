import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { useAppContext } from '../../context/StudentContext';

const StudentForm = ({ student, onClose }) => {
  const { addStudent, updateStudent } = useAppContext();
  const isEdit = !!student;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    grade: '',
    section: '',
    enrollmentDate: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.grade.trim()) {
      newErrors.grade = 'Grade is required';
    }

    if (!formData.section.trim()) {
      newErrors.section = 'Section is required';
    }

    if (!formData.enrollmentDate) {
      newErrors.enrollmentDate = 'Enrollment date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (isEdit) {
        updateStudent(student.id, formData);
      } else {
        addStudent(formData);
      }
      onClose();
    }
  };

  return (
    <div className="sf-card p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">
          {isEdit ? 'Edit Student' : 'Add New Student'}
        </h5>
        <button 
          className="btn btn-sm btn-light"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Personal Information */}
          <div className="col-12">
            <h6 className="text-muted mb-3">Personal Information</h6>
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Full Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Email Address <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@school.com"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Phone Number <span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="555-0100"
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Address <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main Street"
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>

          {/* Academic Information */}
          <div className="col-12 mt-4">
            <h6 className="text-muted mb-3">Academic Details</h6>
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Grade <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.grade ? 'is-invalid' : ''}`}
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="10"
            />
            {errors.grade && <div className="invalid-feedback">{errors.grade}</div>}
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Section <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.section ? 'is-invalid' : ''}`}
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="A"
            />
            {errors.section && <div className="invalid-feedback">{errors.section}</div>}
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Enrollment Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className={`form-control ${errors.enrollmentDate ? 'is-invalid' : ''}`}
              name="enrollmentDate"
              value={formData.enrollmentDate}
              onChange={handleChange}
            />
            {errors.enrollmentDate && <div className="invalid-feedback">{errors.enrollmentDate}</div>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 d-flex gap-2">
          <button type="submit" className="sf-primary-btn">
            <Save size={18} />
            {isEdit ? 'Update Student' : 'Add Student'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;