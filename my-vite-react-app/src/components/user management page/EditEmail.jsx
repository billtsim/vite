import React, { useState } from 'react';
import axiosInstance from '../../axios/Axios';
import styles from '../../CSS/userManagementPageCSS/EditEmail.module.css';

const EditEmail = ({ show, onClose, username, currentEmail }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = async () => {
    try {
      await axiosInstance.put('/update-email', { username, email });
      alert('Email updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>新增新的電子郵件地址</h2>
        <p>需要安全驗證才能進行此變更，當此變更儲存至此帳號後，您必須經過 90 天才能再度變更此電子郵件地址。</p>
        <div className={styles.modalField}>
          <label>新的電子郵件地址</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="輸入新的電子郵件地址"
          />
        </div>
        <div className={styles.modalActions}>
          <button className={styles.saveButton} onClick={handleEmailChange}>编辑</button>
          <button className={styles.cancelButton} onClick={onClose}>取消</button>
        </div>
      </div>
    </div>
  );
};

export default EditEmail;