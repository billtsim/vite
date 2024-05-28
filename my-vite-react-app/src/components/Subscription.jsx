import React from 'react';
import styles from '../CSS/Subscription.module.css';

const Subscription = () => {
  return (
    <div className={styles.subscriptionContainer}>
      <div className={styles.subscriptionContent}>
        <div className={styles.icon}><i className="fas fa-envelope"></i></div>
        <h2>訂閱XXX電子郵件</h2>
        <p>搶先獲得XXX.COM最新資訊及獨家禮遇。</p>
        <div className={styles.subscriptionForm}>
          <input type="email" placeholder="請在此填寫您的Email地址" className={styles.emailInput} />
          <button className={styles.subscribeButton}>立即訂閱</button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;