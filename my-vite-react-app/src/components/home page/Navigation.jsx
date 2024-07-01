import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/Axios';
import styles from '../../CSS/homePageCSS/Navigation.module.css';
import { UserContext } from '../../context/UserContext'; // 导入 UserContext

const Navigation = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useContext(UserContext); // 使用 UserContext

  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    const username = localStorage.getItem('username');
    if (username) {
      fetchUserData(username);
    }
  }, []);

  const fetchUserData = async (username) => {
    try {
      const response = await axiosInstance.get(`/get-user?username=${username}`);
      setUser(response.data.data[0]); // 假设返回的数据包含用户信息
      console.log('User data:', response.data.data[0]);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleAuthClick = () => {
    if (token) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      setUser(null);
      setToken(null);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
        <li className={styles.navItem}><Link to="/all-product" className={styles.navbarLink}>ALL GAMES</Link></li>
        <li className={styles.navItem}><Link to="/logined" className={styles.navbarLink}>MANAGEMENTS</Link></li>
        {user ? (
          <li className={`${styles.navItem} ${styles.authButtonMobile}`}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', color: 'white' }} className={styles.userSection}>
              <button style={{ padding: "0" }} onClick={toggleDropdown} className={styles.dropdownButton}>
                {user.username} <span className={styles.arrowDown}>▼</span>
              </button>
              <div className={`${styles.dropdownContent} ${isDropdownOpen ? styles.showDropdown : ''}`}>
                <Link to="/user-profile" className={styles.dropdownItem}>查看我的個人檔案</Link>
                <Link to="/cart" className={styles.dropdownItem}>購物車</Link>
                <Link to="/orders" className={styles.dropdownItem}>我的訂單</Link>
                <div onClick={handleAuthClick} className={styles.dropdownItem}>登出</div>
              </div>
            </div>
          </li>
        ) : (
          <li className={`${styles.navItem} ${styles.authButtonMobile}`}>
            <Link to="/login" onClick={handleAuthClick} className={styles.navbarLink}>Login</Link>
          </li>
        )}
      </ul>
      <div className={styles.rightSection}>
        <button className={styles.iconButton}>🌐</button>
        <button className={styles.iconButton}>👤</button>
        {user ? (
          <div id={styles.userSection} className={styles.userSection}>
            <button onClick={toggleDropdown} className={styles.dropdownButton}>
              {user.username} <span className={styles.arrowDown}>▼</span>
            </button>
            <div className={`${styles.dropdownContent} ${isDropdownOpen ? styles.showDropdown : ''}`}>
              <Link to="/user-profile" className={styles.dropdownItem}>查看我的個人檔案</Link>
              <Link to="/cart" className={styles.dropdownItem}>購物車</Link>
              <Link to="/orders" className={styles.dropdownItem}>我的訂單</Link>
              <div onClick={handleAuthClick} className={styles.dropdownItem}>登出</div>
            </div>
          </div>
        ) : (
          <button style={{ paddingRight: '30px' }} onClick={handleAuthClick} className={styles.authButton}>
            Login
          </button>
        )}                       
        <button
          style={{ paddingRight: '30px' }}
          className={`${styles.menuToggle} ${isMenuOpen ? styles.isActive : ''}`}
          onClick={toggleMenu}
        >
          {isMenuOpen ? '✖' : '☰'}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;