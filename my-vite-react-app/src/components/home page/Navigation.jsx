import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../CSS/homePageCSS/Navigation.module.css';

const Navigation = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <Link to="/">LOGO</Link>
        </div>
      </div>
      <ul className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
        <li className={styles.navItem}><Link to="/" className={styles.navbarLink}>STORE</Link></li>
        <li className={styles.navItem}><Link to="/all-product" className={styles.navbarLink}>all game</Link></li>
        <li className={styles.navItem}><Link to="/Logined" className={styles.navbarLink}>managements</Link></li>
        <li className={`${styles.navItem} ${styles.authButtonMobile}`}>
          <Link to="/login" onClick={handleAuthClick} className={styles.navbarLink}>
            {token ? 'Logout' : 'Login'}
          </Link>
        </li>
      </ul>
      <div className={styles.rightSection}>
        <button className={styles.iconButton}>🌐</button>
        <button className={styles.iconButton}>👤</button>
        <button style={{paddingRight: '30px'}} onClick={handleAuthClick} className={styles.authButton}>
          {token ? 'Logout' : 'Login'}
        </button>
        <button style={{paddingRight: '30px'}} className={`${styles.menuToggle} ${isMenuOpen ? styles.isActive : ''}`} onClick={toggleMenu}>
          {isMenuOpen ? '✖' : '☰'}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;