import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../axios/Axios';
import Navigation from '../home page/Navigation';
import styles from '../../CSS/paymentModalPageCSS/PaymentResult.module.css';
import Footer from '../home page/Footer';

const PaymentResult = () => {
  const location = useLocation();
  const [message, setMessage] = useState('Processing payment...');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('id'));

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get('session_id');
    
    if (sessionId) {
      const checkPaymentStatus = () => {
        axiosInstance.post(`/api/payment/status`, { sessionId, userId })
          .then((res) => {
            const status = res.data.status;
            setPaymentStatus(status);

            if (status === 'complete') {
              setMessage('Payment succeeded!');
            } else if (status === 'failed') {
              setMessage('Payment failed. Please try again.');
            } else {
              setMessage('Payment status unknown. Please check your payment details.');
            }
          })
          .catch((error) => {
            console.error("Failed to check payment status:", error);
            setMessage('Error checking payment status.');
          });
      };

      // Check payment status immediately and then every 5 seconds
      checkPaymentStatus();
      
    } else {
      setMessage('No session ID found in URL.');
    }
  }, [location]);

  return (
    <div className={styles.paymentResultContainer}>
      <div className={styles.navigationBar}>
        <Navigation />
      </div>
      <div className={styles.paymentResultContent}>
        <h1>Payment Result</h1>
        <p className={styles.paymentMessage}>{message}</p>
        {paymentStatus && <p className={styles.paymentStatus}>Status: {paymentStatus}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default PaymentResult;