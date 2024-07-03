import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from '../../CSS/paymentModalPageCSS/CheckoutForm.module.css';

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [cardholderName, setCardholderName] = useState(''); // 添加持卡人姓名状态
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:5173/payment-result', // 确保这个 URL 是有效的，并且您的应用程序可以处理这个路由
        receipt_email: email, // 添加电子邮件地址
        payment_method_data: {
          billing_details: {
            name: cardholderName, // 添加持卡人姓名
          },
        },
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs'
  };

  return (
    <div className={styles.checkoutForm}>
    <form id="payment-form" onSubmit={handleSubmit} >
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.emailInput}
      />
      <div styles={{width: '500px'}}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      </div>
      <button disabled={isLoading || !stripe || !elements} id="submit" className={styles.paymentButton}>
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
        </span>
      </button>
      {message && <div id="payment-message" className={styles.message}>{message}</div>}
    </form>
    </div>
  );
};

export default CheckoutForm;