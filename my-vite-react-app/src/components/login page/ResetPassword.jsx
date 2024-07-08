import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/Axios';
import { useLocation } from 'react-router-dom';
import styles from '../../CSS/loginPageCSS/resetPassword.module.css';
import Navigation from '../home page/Navigation';

function ResetPassword() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    
    if (token) {
      axiosInstance
        .get(`/reset-password?token=${token}`)
        .then((response) => {
          setUsername(response.data.data.username);
          setIsTokenValid(true);
        })
        .catch((error) => {
          setError('your request is invalid or expired.');
          setIsTokenValid(false);
        });
    } else {
      setError('Missing token.');
      setIsTokenValid(false);
    }
  }, [location.search]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    try {
      const response = await axiosInstance.put('/reset-password', {
        token,
        newPassword,
      });
      setMessage('Password reset successful.');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to reset password.');
      setMessage(null);
    }
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <Navigation />
      <div className={styles.resetPasswordBody}>
        <div className={styles.pageContainer}>
          <div className={styles.resetPasswordForm}>
            <h2 className={styles.title}>Reset Password</h2>
            {error && <p className={styles.error}>{error}</p>}
            {message && <p className={styles.success}>{message}</p>}
            {isTokenValid && (
              <>
                <div className={styles.userInfo}>
                  <p>Account Name: {username}</p>
                </div>
                <form onSubmit={handleResetPassword}>
                  <div>
                    <label className={styles.label}>New Password</label>
                    <input
                      type="password"
                      className={styles.input}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className={styles.label}>Confirm New Password</label>
                    <input
                      type="password"
                      className={styles.input}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className={styles.button}>Reset Password</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;