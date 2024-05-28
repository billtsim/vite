import React, { useState, useEffect } from 'react';
import styles from '../CSS/EditEmployees.module.css';

const EditEmployees = ({ show, onClose, employee, onSave }) => {
  const [formData, setFormData] = useState(employee);

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!show) {
    return null;
  }

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={formData.username || ''} onChange={handleChange} />
          </label>
          <label>
            Fullname:
            <input type="text" name="fullName" value={formData.fullName || ''} onChange={handleChange} />
          </label>
          <label>
            Gender: {formData.gender === 1 ? '男' : '女'}
          </label>
          <label>
            Entrydate:
            <input type="date" name="entryDate" value={formData.entryDate || ''} onChange={handleChange} />
          </label>
          <label>
            Job:
            <select name="job" value={formData.job || ''} onChange={handleChange}>
              <option value="1">Manager</option>
              <option value="2">Developer</option>
              <option value="3">Designer</option>
              <option value="4">QA</option>
              <option value="5">HR</option>
            </select>
          </label>
          <label>
            Department:
            <select name="department" value={formData.department || ''} onChange={handleChange}>
              <option value="1">HR department</option>
              <option value="2">admin department</option>
              <option value="3">promotion department</option>
            </select>
          </label>
          <label>
            CreateTime: {formData.createTime}
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployees;