import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/Axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../CSS/loginPageCSS/login.module.css';
import Navigation from '../home page/Navigation';

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/logined', { replace: true });
    }
  }, [token, navigate]);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/login', {
        usernameOrEmail,
        password
      });
      const token = response.data.data;
      if (token) {
        localStorage.setItem('token', token);
        await showAlert('Login success');
        navigate('/');
        window.location.reload(); // 自动刷新页面
      } else {
        alert('Your username or password is not correct');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  const showAlert = (message) => {
    return new Promise((resolve) => {
      alert(message);
      resolve();
    });
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password');
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', width: 'auto', display: 'flex', flexDirection: 'column' }}>
  <Navigation />
    <div className={styles.loginBody}>
      <div className={styles.pageContainer}>
        <div className={styles.loginForm}>
          <h2 className={styles.title}>Welcome</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label className={styles.label}>Username or Email:</label>
              <input
                type="text"
                className={styles.input}
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
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
            Don't have an account? <a href="#" onClick={handleSignUpClick}>Sign Up</a>
          </p>
          <p className={styles.forgotPassword}>
            <a href="#" onClick={handleForgotPasswordClick}>Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;