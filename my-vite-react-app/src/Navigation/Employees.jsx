import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios/Axios';
import styles from '../CSS/Employees.module.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get('/emps')
      .then(response => {
        console.log(response.data)
        setEmployees(response.data.data.rows); // 假设服务器返回的员工数据是一个数组
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  // 職位表
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
            <th>gender</th>
            <th>Entrydate</th>
            <th>job</th>
            <th>CreateTime</th>
            <th>UpdateTime</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;