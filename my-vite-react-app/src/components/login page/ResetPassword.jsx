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
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    axiosInstance
      .get(`/reset-password?token=${token}`)
      .then((response) => {
        setUsername(response.data.data.username);
      })
      .catch((error) => {
        setError('无效或过期的令牌');
      });
  }, [location.search]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('密码不一致');
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    try {
      const response = await axiosInstance.put('/reset-password', {
        token,
        newPassword,
      });
      setMessage('密码重置成功');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.msg || '重置密码失败');
      setMessage(null);
    }
  };

  return (
  <div style={{ backgroundColor: 'black', color: 'white', width: 'auto', display: 'flex', flexDirection: 'column' }}>
  <Navigation />
    <div className={styles.resetPasswordBody}>
      <div className={styles.pageContainer}>
        <div className={styles.resetPasswordForm}>
          <h2 className={styles.title}>密码重置</h2>
          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.success}>{message}</p>}
          <div className={styles.userInfo}>
            <p>帐户名称: {username}</p>
          </div>
          <form onSubmit={handleResetPassword}>
            <div>
              <label className={styles.label}>新密码</label>
              <input
                type="password"
                className={styles.input}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className={styles.label}>确认新密码</label>
              <input
                type="password"
                className={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.button}>重置密码</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ResetPassword;