import React, { useState } from 'react';
import axiosInstance from '../../axios/Axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../CSS/loginPageCSS/forgotPassword.module.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/forgot-password', {
        email
      });
      if (response.data.data) {
        setMessage(`已向 ${email} 发送帐户验证链接`);
        setEmailSent(true);
      } else {
        setError(response.data.msg);
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to send reset password email');
    }
  };

  if (emailSent) {
    return (
      <div className={styles.forgotPasswordBody}>
        <div className={styles.pageContainer}>
          <div className={styles.forgotPasswordForm}>
            <h2 className={styles.title}>已向 {email} 发送帐户验证链接</h2>
            <p className={styles.message}>您可以关闭此页面并点击此链接继续进行帐户恢复。</p>
            <p className={styles.message}>帐户验证码可能需要长达 5 分钟的时间发送。</p>
            <button className={styles.button} onClick={() => setEmailSent(false)}>重新发送帐户验证码</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.forgotPasswordBody}>
      <div className={styles.pageContainer}>
        <div className={styles.forgotPasswordForm}>
          <h2 className={styles.title}>忘记了我的 Steam 帐户登录名称或密码</h2>
          <form onSubmit={handleForgotPassword}>
            <div>
              <label className={styles.label}>输入您的电子邮件地址或手机号码</label>
              <input
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.captcha}>
              <div className={styles.captchaText}>
                <span>我不是自动程序</span>
                <input type="checkbox" required />
              </div>
              <div className={styles.recaptcha}>
                <img src="https://www.gstatic.com/recaptcha/api2/r20191120120906/recaptcha__en.js" alt="reCAPTCHA" />
              </div>
            </div>
            <button type="submit" className={styles.button}>搜索</button>
          </form>
          {message && <p className={styles.success}>{message}</p>}
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;