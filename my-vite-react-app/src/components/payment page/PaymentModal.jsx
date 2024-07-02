import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axiosInstance from '../../axios/Axios';
import CheckoutForm from './CheckoutForm'; // 导入 CheckoutForm 组件
import styles from '../../CSS/paymentModalPageCSS/PaymentModal.module.css';

const stripePromise = loadStripe('pk_test_51PXxoGRtNnaFIl7oxl1gIxpmNzIljtxbVaBwCSbXN5LFJRGOwYmsrx0YSo3tNIksyL9Jve4xvvn9fDrmfO39THtu00CfSV1LYp'); // 替换为您的 Stripe 公钥

const PaymentModal = ({ amount, isOpen, onClose }) => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const createPaymentIntent = async () => {
      const { data } = await axiosInstance.post('/payment/create-payment-intent', { amount });
      setClientSecret(data.clientSecret);
    };

    if (isOpen) {
      createPaymentIntent();
    }
  }, [isOpen, amount]);

  if (!isOpen) {
    return null;
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;