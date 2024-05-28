import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios/Axios';
import styles from '../CSS/Employees.module.css';
import EditEmployees from './EditEmployees';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const employeesPerPage = 5;

  useEffect(() => {
    axiosInstance.get('/emps')
      .then(response => {
        console.log(response.data);
        setEmployees(response.data.data.rows); // 假设服务器返回的员工数据是一个数组
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // 职位表
  const jobMapping = {
    1: 'Manager',
    2: 'Developer',
    3: 'Designer',
    4: 'QA',
    5: 'HR'
  };

  const departmentMapping = {
    1: 'HR department',
    2: 'admin department',
    3: 'promotion department',
  };

  // 格式化日期时间字符串
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleDelete = (id) => {
    // 删除员工的逻辑
    if(window.confirm('确定要删除这名员工吗？')) {
      axiosInstance.delete(`/emps/${id}`)
        .then(response => {
          setEmployees(employees.filter(employee => employee.id !== id));
        })
        .catch(err => {
          setError(err);
        });
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSave = (updatedEmployee) => {
    axiosInstance.put(`/emps/${updatedEmployee.id}`, updatedEmployee)
      .then(response => {
        setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
        setShowModal(false);
      })
      .catch(err => {
        setError(err);
      });
  };

  // 分页逻辑
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(employees.length / employeesPerPage); i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={styles.pageButton}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.employeesContainer}>
      <h1>Employees</h1>
      <table className={styles.employeesTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Fullname</th>
            <th>Gender</th>
            <th>Entrydate</th>
            <th>Job</th>
            <th>CreateTime</th>
            <th>UpdateTime</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.username}</td>
              <td>{employee.fullName}</td>
              <td>{employee.gender === 1 ? '男' : '女'}</td>
              <td>{employee.entryDate}</td>
              <td>{jobMapping[employee.job]}</td>
              <td>{formatDate(employee.createTime)}</td>
              <td>{formatDate(employee.updateTime)}</td>
              <td>{departmentMapping[employee.department]}</td>
              <td className={styles.actions}>
                <button onClick={() => handleEdit(employee)} className="edit">Edit</button>
                <button onClick={() => handleDelete(employee.id)} className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        {renderPageNumbers()}
      </div>
      <EditEmployees
        show={showModal}
        onClose={() => setShowModal(false)}
        employee={selectedEmployee}
        onSave={handleSave}
      />
    </div>
  );
};

export default Employees;