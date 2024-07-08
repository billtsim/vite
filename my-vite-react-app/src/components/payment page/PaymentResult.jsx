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
              setMessage('支付成功！请检查您的订单列表和游戏库。');
            } else if (status === 'failed') {
              setMessage('支付失败。请再试一次。');
            } else if (status === 'open') {
              setMessage('支付仍在处理中。请等待或检查您的支付详情。');
            } else {
              setMessage('支付状态未知。请检查您的支付详情。');
            }
          })
          .catch((error) => {
            console.error("Failed to check payment status:", error);
            setMessage('检查支付状态时出错。');
          });
      };

      // Check payment status immediately and then every 5 seconds
      checkPaymentStatus();
      
    } else {
      setMessage('URL中未找到会话ID。');
    }
  }, [location, userId]);

  return (
    <div className={styles.paymentResultContainer}>
      <div className={styles.navigationBar}>
        <Navigation />
      </div>
      <div className={styles.paymentResultContent}>
        <h1>支付结果</h1>
        <p className={styles.paymentMessage}>{message}</p>
        {paymentStatus && <p className={styles.paymentStatus}>状态: {paymentStatus}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default PaymentResult;