import React, { useState } from 'react';
import axiosInstance from '../../axios/Axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../CSS/loginPageCSS/signUp.module.css';
import Navigation from '../home page/Navigation';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axiosInstance.post('/signup/send-code', { params : { email: email } });
      setStep(2); // 进入验证码输入步骤
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to send verification code');
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/signup', { username, email, password, code: verificationCode });
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000); // 2秒后跳转到登录页面
    } catch (err) {
      setError(err.response?.data?.msg || 'Sign Up failed');
    }
  };

  return (
    <div className={styles.signupBody}>
      <Navigation /> {/* 使用你们自己的导航组件 */}
      <div className={styles.pageContainer}>
        <div className={styles.signupForm}>
          <h2 className={styles.title}>Create Account</h2>
          {step === 1 ? (
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
                <label className={styles.label}>Email:</label>
                <input
                  type="email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <button type="submit" className={styles.button}>Continue</button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode}>
              <div>
                <label className={styles.label}>Verification Code:</label>
                <input
                  type="text"
                  className={styles.input}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.button}>Verify Code</button>
            </form>
          )}
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>Sign Up successful! Redirecting to login...</p>}
        </div>
      </div>
    </div>
  );
}

export default SignUp;