import React from 'react';
import styles from '../../CSS/homePageCSS/Footer.module.css';

const Footer = () => {
  const footerLinks = [
    {
      title: '禮品卡',
      links: ['附近商店', '訂閱電子郵件', '註冊會員']
    },
    {
      title: '獲取幫助',
      links: ['訊息中心', '網上購物', '訂單狀態', '退換貨及退款', '配送服務', '聯絡我們']
    },
    {
      title: '新聞',
      links: ['關於XXX', '工作機會', '投資者', '公司簡報']
    }
  ];

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerContent}>
        {footerLinks.map((section, index) => (
          <div key={index} className={styles.footerSection}>
            <h3>{section.title}</h3>
            <ul>
              {section.links.map((link, idx) => (
                <li key={idx}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2024 XXX, Inc. 版權所有</p>
        <div className={styles.socialMedia}>
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;