import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/Axios'
import styles from '../../CSS/homePageCSS/UpcomingDiscount.module.css';

const UpcomingDiscount = () => {
  const [imageUrl, setImageUrl] = useState('');
  
  useEffect(() => {
    const fetchDiscountData = async () => {
      try {
        const response = await axiosInstance.get('/product', {
          params: {
            tags: 'up coming discount'
          }
        });

        // 提取第一个产品的图片URL
        const products = response.data.data;
        if (products.length > 0) {
          setImageUrl(products[0].imageUrl);
        }
      } catch (error) {
        console.error('Error fetching discount data:', error);
      }
    };

    fetchDiscountData();
  }, []);

  // 获取当前日期和月份
  const currentDate = new Date();
  const date = currentDate.getDate().toString().padStart(2, '0');
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[currentDate.getMonth()];

  return (
    <div className={styles.upcomingDiscountContainer}>
      <h2>優惠預告</h2>
      <div className={styles.discountContent}>
        <div className={styles.dateSection}>
          <p>即將開始</p>
          <p className={styles.date}>{date}</p>
          <p className={styles.month}>{month}</p>
        </div>
        <div className={styles.imageSection}>
          <img src={imageUrl} alt="Upcoming Discount" />
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