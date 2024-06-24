import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/Axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../CSS/userManagementPageCSS/UserProfile.module.css';
import Navigation from '../home page/Navigation';
import EditEmail from './EditEmail';

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
        <div className={styles.sidebar}>
          <ul>
            <li>帳號設定</li>
            <li>電子郵件偏好</li>
            <li>付款方式管理</li>
            <li>交易</li>
            <li>EPIC 美動</li>
            <li>訂閱</li>
            <li>密碼和安全</li>
            <li>遊戲內容警</li>
            <li>家長控制</li>
            <li>使用者授權協議 (EULA) 紀錄</li>
            <li>應用程式與帳號</li>
            <li>創作者計劃</li>
            <li>市場賣家</li>
            <li>兌換碼</li>
          </ul>
        </div>
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
          <div className={styles.section}>
            <h3>修改密碼</h3>
            <div className={styles.field}>
              <label>當前密碼</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={styles.field}>
              <label>新密碼</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className={styles.field}>
              <label>確認新密碼</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button className={styles.saveButton} onClick={handlePasswordChange}>修改密碼</button>
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