import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/Axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../CSS/loginPageCSS/forgotPassword.module.css';
import Navigation from '../home page/Navigation';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/reset-password/forgot', {
        email
      });
      if (response.data.data) {
        setMessage(`A verification link has been sent to ${email}`);
        setEmailSent(true);
        setError(null); // Clear any previous error
      } else {
        setError(response.data.msg);
        setMessage(null); // Clear any previous message
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to send reset password email');
      setMessage(null); // Clear any previous message
    }
  };

  const handleResend = async () => {
    setMessage(`A verification link has been resent to ${email}`);
    setCountdown(60); // Set the countdown to 60 seconds
    try {
      const response = await axiosInstance.post('/reset-password/forgot', {
        email
      });
      if (!response.data.data) {
        setError(response.data.msg);
        setMessage(null); // Clear any previous message
      } else {
        setError(null); // Clear any previous error
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to resend reset password email');
      setMessage(null); // Clear any previous message
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div>
    <Navigation />
    <div className={styles.forgotPasswordBody}>
      <div className={styles.pageContainer}>
        <div className={styles.forgotPasswordForm}>
          {emailSent ? (
            <>
              <h2 className={styles.title}>A verification link has been sent to {email}</h2>
              <p className={styles.message}>You can close this page and click the link to continue account recovery.</p>
              <p className={styles.message}>The verification code may take up to 5 minutes to be sent.</p>
              <button 
                className={styles.button} 
                onClick={handleResend} 
                disabled={countdown > 0}
              >
                Resend Verification Link
              </button>
              {countdown > 0 && <span className={styles.countdown}>Please wait {countdown} seconds</span>}
            </>
          ) : (
            <>
              <h2 className={styles.title}>Forgot my Steam account name or password</h2>
              <form onSubmit={handleForgotPassword}>
                <div>
                  <label className={styles.label}>Enter your email address or phone number</label>
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
                    <span>I'm not a robot</span>
                    <input type="checkbox" required />
                  </div>
                  <div className={styles.recaptcha}>
                    <img src="https://www.gstatic.com/recaptcha/api2/r20191120120906/recaptcha__en.js" alt="reCAPTCHA" />
                  </div>
                </div>
                <button type="submit" className={styles.button}>Continue</button>
              </form>
            </>
          )}
          {message && <p className={styles.success}>{message}</p>}
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </div>
    </div>
  );
}

export default ForgotPassword;