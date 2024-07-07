import React, { useCallback } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import axiosInstance from '../../axios/Axios';
import styles from '../../CSS/paymentModalPageCSS/PaymentModal.module.css';

const stripePromise = loadStripe("pk_test_51PXxoGRtNnaFIl7oxl1gIxpmNzIljtxbVaBwCSbXN5LFJRGOwYmsrx0YSo3tNIksyL9Jve4xvvn9fDrmfO39THtu00CfSV1LYp");

const PaymentModal = ({ isOpen, onClose, products, amount, cart }) => {

  // Callback function to fetch the client secret
  const fetchClientSecret = useCallback(() => {
    return axiosInstance.post(`/api/payment/create-checkout-session/${cart}`, {
      amount,
      products
    })
    .then((res) => {
      console.log("Client Secret:", res.data.clientSecret); // Debugging statement
      return res.data.clientSecret;
    })
    .catch((error) => {
      console.error("Failed to fetch client secret:", error);
      throw error;
    });
  }, [amount, products]);

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
          <div className={styles.logo} style={{flex: 1}}>
            <h2>bill shopping</h2> {/* Title */}
            <h2>Checkout</h2> {/* Title */}
            <div>Checkout Amount: ${amount}</div>
          </div>
          <div className={styles.productList}>
            {products.map((product, index) => (
              <div key={index} className={styles.productDetails}>
                <div className={styles.productName}>{product.name}</div> {/* Product Name */}
                <img src={product.image} alt={product.name} className={styles.productImage} /> {/* Product Image */}
              </div>
            ))}
          </div>
           {/* Display Checkout Amount */}
        </div>
        <div className={styles.rightPane}>
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout className={styles.EmbeddedCheckout} />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;