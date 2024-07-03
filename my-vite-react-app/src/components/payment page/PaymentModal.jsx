import React, { useCallback } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import axiosInstance from '../../axios/Axios';
import styles from '../../CSS/paymentModalPageCSS/PaymentModal.module.css';

const stripePromise = loadStripe("pk_test_51PXxoGRtNnaFIl7oxl1gIxpmNzIljtxbVaBwCSbXN5LFJRGOwYmsrx0YSo3tNIksyL9Jve4xvvn9fDrmfO39THtu00CfSV1LYp");

const PaymentModal = ({ isOpen, onClose, product, amount }) => {
  // Callback function to fetch the client secret
  const fetchClientSecret = useCallback(() => {
    return axiosInstance.post("/api/payment/create-checkout-session", {
      amount,
      product
    })
    .then((res) => {
      console.log("Client Secret:", res.data.clientSecret); // Debugging statement
      return res.data.clientSecret;
    })
    .catch((error) => {
      console.error("Failed to fetch client secret:", error);
      throw error;
    });
  }, [amount, product]);

  // Options for EmbeddedCheckoutProvider
  const options = {
    fetchClientSecret,
  };

  // If modal is not open, return null
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <div className={styles.leftPane}>
          <h2>bill shopping</h2> {/* 标题 */}
          <h2>结账</h2> {/* 标题 */}
          <img src={product.image} alt={product.name} className={styles.productImage} /> {/* 产品图片 */}
          <div className={styles.productDetails}>
            <div className={styles.productName}>{product.name}</div> {/* 产品名称 */}
            <div>结账金额: ${amount}</div> {/* 显示结账金额 */}
          </div>
        </div>
        <div className={styles.rightPane}>
          <EmbeddedCheckoutProvider  stripe={stripePromise} options={options}>
            <EmbeddedCheckout className={styles.EmbeddedCheckout} />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;