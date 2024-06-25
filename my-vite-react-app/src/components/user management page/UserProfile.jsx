import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/Axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../CSS/userManagementPageCSS/UserProfile.module.css';
import Navigation from '../home page/Navigation';
import EditEmail from './EditEmail';
import PasswordInput from './PasswordInput'; // 导入自定义的 PasswordInput 组件

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const [userDataForEmail, setUserDataForEmail] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    } else {
      fetchUserData(username);
    }
  }, [token, username, navigate]);

  const fetchUserData = async (username) => {
    try {
      const response = await axiosInstance.get(`/get-user?username=${username}`);
      const userData = response.data.data[0];
      setUserDataForEmail(userData);
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleEmailUpdate = (newEmail) => {
    setUser((prevUser) => ({
      ...prevUser,
      email: newEmail,
    }));
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    try {
      await axiosInstance.put('/update-password', { username, password, newPassword });
      alert('Password updated successfully');
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: 'white', color: 'black', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Navigation />
      <div className={styles.profileContainer}>
        <div className={styles.profileContent}>
          
          <h2>帳號設定</h2>
          <div className={styles.section}>
            <h3>帳號資訊</h3>
            <div className={styles.fieldGroup}>
              <div className={styles.field}>
                <label>用戶名</label>
                <div className={styles.value}>{user.username}</div>
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <div className={styles.field}>
                <label>電子郵件地址</label>
                <div className={styles.value}>{user.email}</div>
                <button
                  className={styles.editButton}
                  onClick={() => setShowModal(true)}
                >
                  编辑
                </button>
              </div>
            </div>
          </div>
          <div className={`${styles.section} ${styles.passwordSection}`}>
            <h3>修改密碼</h3>
            <p>為了您的安全，我們強烈建議您選擇一個不用於其他線上帳戶的唯一密碼。</p>

            <div className={styles.passwordField}>
              <div className={styles.passwordShow}>
                <label>當前密碼</label>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="輸入當前密碼"
                />
              </div>
            </div>

            <div className={styles.passwordField}>
              <div className={styles.passwordShow}>
                <label>新密碼</label>
                <PasswordInput
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="輸入新密碼"
                />
              </div>
            </div>

            <div className={styles.passwordField}>
              <div className={styles.passwordShow}>
                <label>確認新密碼</label>
                <PasswordInput
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="確認新密碼"
                />
              </div>
            </div>
            <button className={styles.saveButton} onClick={handlePasswordChange}>保存變更</button>
          </div>
        </div>
      </div>

      {showModal && (
        <EditEmail
          show={showModal}
          onClose={() => setShowModal(false)}
          username={username}
          currentEmail={userDataForEmail.email}
          onEmailUpdate={handleEmailUpdate}
        />
      )}
    </div>
  );
};

export default UserProfile;