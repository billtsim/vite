import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS/Navigation.module.css'

const handleLogout = () => {
  localStorage.removeItem('token'); // 清除 token
  window.location.reload();
  navigate('/login'); // 重定向到登录页
};


let token = localStorage.getItem('token');

const Navigation = () => (
  <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
      <li className={styles.navbarItem}>
          <Link to="/" className={styles.navbarLink}>Home Page</Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/about" className={styles.navbarLink}>About us</Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/course" className={styles.navbarLink}>Course</Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/location" className={styles.navbarLink}>Location</Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/contact" className={styles.navbarLink}>Contact us</Link>
        </li>
        {!token ? (
          <li className={styles.navbarItem}>
            <Link to="/login" className={styles.navbarLink}>Login</Link>
          </li>
        ) : (
          <li className={styles.navbarItem}>
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
);

export default Navigation;