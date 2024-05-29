import React, { useState } from 'react';
import axiosInstance from '../axios/Axios';
import { useNavigate } from 'react-router-dom';
import styles from '../CSS/login.module.css';




function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
       const response = await axiosInstance.post('/login', { username, password });
       // 假设响应中包含 token
       const token = response.data.data;
       if(token) {
        localStorage.setItem('token', token);
       navigate('/logined');
       window.location.reload(); // 自动刷新页面
       }
       else{
        alert('your username or password is not correct')
       }
       
        // 登录成功后导航到主页
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className={styles.loginBody}>
    <div className={styles.pageContainer}>
      <div className={styles.loginForm}>
        <h2 className={styles.title}>Welcome</h2>
        <div className={styles.logo}>
          <span>A</span>
        </div>
        <form onSubmit={handleLogin}>
          <div>
            <label className={styles.label}>Username:</label>
            <input
              type="text"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={styles.label}>Password:</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>LOGIN</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.signup}>
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Login;