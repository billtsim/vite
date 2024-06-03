import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../CSS/Navigation.module.css';

const Navigation = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (token) {
      // Perform logout operation
      localStorage.removeItem('token');
      setToken(null);
      navigate('/');
      window.location.reload();
    } else {
      // Navigate to login page
      navigate('/login');
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">LOGO</Link>
      </div>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}><Link to="/" className={styles.navbarLink}>Discover</Link></li>
        <li className={styles.navbarItem}><Link to="/browse" className={styles.navbarLink}>Browse</Link></li>
        <li className={styles.navbarItem}><Link to="/news" className={styles.navbarLink}>News</Link></li>
        <li className={styles.navbarItem}><Link to="/logined" className={styles.navbarLink}>admin</Link></li>

      </ul>
      <div className={styles.searchAndAuth}>
        <input type="text" className={styles.searchInput} placeholder="Search store" />
        <button onClick={handleAuthClick} className={styles.authButton}>
          {token ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;