import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentResult = () => {
  const location = useLocation();
  const [message, setMessage] = useState('Processing payment...');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const paymentIntent = query.get('payment_intent');
    const paymentIntentClientSecret = query.get('payment_intent_client_secret');
    const redirectStatus = query.get('redirect_status');

    if (redirectStatus === 'succeeded') {
      setMessage('Payment succeeded!');
    } else if (redirectStatus === 'failed') {
      setMessage('Payment failed. Please try again.');
    } else {
      setMessage('Payment status unknown. Please check your payment details.');
    }
  }, [location]);

  return (
    <div>
      <h1>Payment Result</h1>
      <p>{message}</p>
    </div>
  );
};

export default PaymentResult;