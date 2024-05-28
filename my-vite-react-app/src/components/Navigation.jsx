import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS/Navigation.module.css';

const handleLogout = () => {
  localStorage.removeItem('token'); // 清除 token
  window.location.reload();
};

let token = localStorage.getItem('token');

const Navigation = () => (
  <nav className={styles.navbar}>
    <div className={styles.logo}>
      <Link to="/">LOGO</Link>
    </div>
    <ul className={styles.navbarList}>
      <li className={styles.navbarItem}>
        <Link to="/" className={styles.navbarLink}>主頁</Link>
      </li>
      <li className={styles.navbarItem}>
        <Link to="/summer" className={styles.navbarLink}>夏日必備</Link>
      </li>
      <li className={styles.navbarItem}>
        <Link to="/special" className={styles.navbarLink}>特別版產品</Link>
      </li>
      <li className={styles.navbarItem}>
        <Link to="/men" className={styles.navbarLink}>男子</Link>
      </li>
      <li className={styles.navbarItem}>
        <Link to="/women" className={styles.navbarLink}>女子</Link>
      </li>
      <li className={styles.navbarItem}>
        <Link to="/kids" className={styles.navbarLink}>兒童</Link>
      </li>
      <li className={styles.navbarItem}>
        <Link to="/logined" className={styles.navbarLink}>會員專頁</Link>
      </li>
    </ul>
    <div className={styles.searchAndAuth}>
      <input type="text" placeholder="搜索 年中優惠" className={styles.searchInput} />
      {!token ? (
        <Link to="/login" className={styles.authLink}>Login</Link>
      ) : (
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      )}
    </div>
  </nav>
);

export default Navigation;