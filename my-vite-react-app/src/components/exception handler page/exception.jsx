import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from '../../CSS/exceptionHandlerPageCSS/exception.module.css';
import Navigation from '../home page/Navigation';

const ExceptionPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const errorMessage = params.get('errorMessage') || '发生未知错误。';

  return (
    <div className={styles.exceptionPage}>
      <Navigation />
      <div className={styles.exceptionContainer}>
        <h1>发生错误</h1>
        <p>{errorMessage}</p>
        <div className={styles.buttonContainer}>
          <Link to="/" className={styles.button}>返回首页</Link>
          <Link to="/support" className={styles.button}>联系支持</Link>
        </div>
      </div>
    </div>
  );
};

export default ExceptionPage;