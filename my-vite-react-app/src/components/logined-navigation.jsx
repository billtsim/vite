import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS/LoginedNavigation.module.css'; // 引入 CSS Module 文件


const LoginedNavigation = () => (
  <div className={styles.loginedNav}>
  <Link to="/logined/emp">Emp</Link>
  <Link to="/logined/dept">Dept</Link>
</div>
   
)

export default LoginedNavigation