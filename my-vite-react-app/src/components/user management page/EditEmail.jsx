import React, { useState } from 'react';
import axiosInstance from '../../axios/Axios';
import styles from '../../CSS/userManagementPageCSS/EditEmail.module.css';

const EditEmail = ({ show, onClose, username, currentEmail}) => {
  const [email, setEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 用于跟踪当前步骤
  const [oldEmail, setOldEmail] = useState(currentEmail);
  

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = async () => {
    if (!validateEmail(email)) {
      setError('请输入有效的电子邮件地址');
      return;
    }

    console.log('old email:', oldEmail);

    console.log('username', username);

    try {
      // 先检查新的电子邮件地址是否已经存在
      const checkResponse = await axiosInstance.get('/check-email', { params: { newEmail: email } });
      console.log('checkResponse:', checkResponse.data.data);

      if (checkResponse.data.data) {
        setError('该电子邮件地址已存在，请使用其他电子邮件地址');
        return;
      }

      console.log('old email:', oldEmail);

      // 如果不存在，则发送验证码到当前的电子邮件地址
      await axiosInstance.post('/signup/send-code',null, { params: { email: oldEmail } });

      // 进入下一步，让用户输入验证码
      setStep(2);
    } catch (error) {
      console.error('Error checking or sending email:', error);
      setError('操作时出错，请稍后再试');
    }
  };

  const handleVerifyCode = async () => {
    try {
      // 验证验证码
      const verifyResponse = await axiosInstance.get('/verify-code', { params: { email: currentEmail, code: verifyCode } });

      if (verifyResponse.data.data) {
        // 发送带有验证链接的电子邮件到新的电子邮件地址
        await axiosInstance.get('/send-verification-link',{ params: { newEmail: email, username: username }});

        // 进入通知步骤
        setStep(3);
      } else {
        setError('验证码无效，请重试');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setError('验证时出错，请稍后再试');
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        {step === 1 && (
          <>
            <h2>新增新的電子郵件地址</h2>
            <p>需要安全驗證才能進行此變更，當此變更儲存至此帳號後，您必須經過 90 天才能再度變更此電子郵件地址。</p>
            <div className={styles.modalField}>
              <label>新的電子郵件地址</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');  // 清除之前的错误信息
                }}
                placeholder="輸入新的電子郵件地址"
              />
              {error && <p className={styles.errorMessage}>{error}</p>}
            </div>
            <div className={styles.modalActions}>
              <button className={styles.saveButton} onClick={handleEmailChange}>编辑</button>
              <button className={styles.cancelButton} onClick={onClose}>取消</button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2>验证电子邮件</h2>
            <p>我们已向您的当前电子邮件地址发送了一个验证码，请输入验证码以完成电子邮件地址的更新。</p>
            <div className={styles.modalField}>
              <label>验证码</label>
              <input
                type="text"
                value={verifyCode}
                onChange={(e) => {
                  setVerifyCode(e.target.value);
                  setError('');  // 清除之前的错误信息
                }}
                placeholder="输入验证码"
              />
              {error && <p className={styles.errorMessage}>{error}</p>}
            </div>
            <div className={styles.modalActions}>
              <button className={styles.saveButton} onClick={handleVerifyCode}>验证</button>
              <button className={styles.cancelButton} onClick={() => {
                setStep(1);
                setVerifyCode('');
              }}>返回</button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h2>电子邮件已发送</h2>
            <p>我们已经向您的新电子邮件地址发送了一封验证邮件，请查收并点击邮件中的链接以完成邮箱更新。</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={onClose}>关闭</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditEmail;