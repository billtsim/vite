import React, { useState } from 'react';
import axiosInstance from '../../axios/Axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../CSS/loginPageCSS/signUp.module.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axiosInstance.post('/signup', { username, password });
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000); // 2秒后跳转到登录页面
    } catch (err) {
      setError(err.response?.data?.msg || 'Sign Up failed');
    }
  };

  return (
    <div className={styles.signupBody}>
      <div className={styles.pageContainer}>
        <div className={styles.signupForm}>
          <h2 className={styles.title}>Create Account</h2>
          <form onSubmit={handleSignUp}>
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
            <div>
              <label className={styles.label}>Confirm Password:</label>
              <input
                type="password"
                className={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.button}>SIGN UP</button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>Sign Up successful! Redirecting to login...</p>}
        </div>
      </div>
    </div>
  );
}

export default SignUp;