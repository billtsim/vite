import React from 'react';
import styles from '../CSS/UpcomingDiscount.module.css';

const UpcomingDiscount = () => {
  return (
    <div className={styles.upcomingDiscountContainer}>
      <h2>優惠預告</h2>
      <div className={styles.discountContent}>
        <div className={styles.dateSection}>
          <p>即將開始</p>
          <p className={styles.date}>01</p>
          <p className={styles.month}>Jun</p>
        </div>
        <div className={styles.imageSection}>
          <img src="https://via.placeholder.com/600x300" alt="Upcoming Discount" />
        </div>
        <div className={styles.textSection}>
          <h3>快閃優惠</h3>
          <p>搶先收到優惠訊息</p>
          <button className={styles.subscribeButton}>立即訂閱</button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingDiscount;