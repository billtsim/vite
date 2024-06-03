import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../CSS/managementPageCSS/Dashboard.module.css'; // 引入 CSS Module 文件
import Employees from './Employees';
import { retry } from '@reduxjs/toolkit/query';
import Games from './Games';

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // 使用 useNavigate 钩子

  const renderContent = () => {
    switch (selectedComponent) {
      case 'employees':
        return <Employees />;
      case 'activities':
        return <div>Activities Component</div>;
      case 'projects':
        return <div>Projects Component</div>;
      case 'gameManagement':
        return <Games />;
      // 其他组件根据需要添加
      default:
        return <div>Home Component</div>;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // 清除 token  
    navigate('/'); // 重定向到主頁
    window.location.reload();
  };

  return (
    <div className={styles.dashboard}>
      <nav className={`${styles.sidebar} ${sidebarOpen ? styles.active : ''}`}>
        <div className={styles.logo}>
          <h2>Bitrix 24</h2>
        </div>
        <ul className={styles.navList}>
          <li className={styles.navItem}><Link to="/" onClick={() => setSelectedComponent('home')}>主頁</Link></li>
          <li className={styles.navItem}><Link to="#" onClick={() => setSelectedComponent('activities')}>事項動態</Link></li>
          <li className={styles.navItem}><Link to="#" onClick={() => setSelectedComponent('projects')}>任務和專案</Link></li>
          <li className={styles.navItem}><Link to="#" onClick={() => setSelectedComponent('knowledge')}>知識庫</Link></li>
          <li className={styles.navItem}><Link to="#" onClick={() => setSelectedComponent('drive')}>Bitrix24.Drive</Link></li>
          <li className={styles.navItem}><Link to="#" onClick={() => setSelectedComponent('chat')}>聊天和通話</Link></li>
          <li className={styles.navItem}><Link to="#" onClick={() => setSelectedComponent('work-management')}>工作管理</Link></li>
          <li className={styles.navItem}><Link to="#" onClick={() => setSelectedComponent('crm')}>CRM</Link></li>
          <li className={styles.navItem}><Link to="#" onClick={() => setSelectedComponent('website')}>網站</Link></li>
          <li className={styles.navItem}><Link to="#" onClick={() => setSelectedComponent('gameManagement')}>Game</Link></li>
          <li className={styles.navItem}><Link to="#" onClick={() => setSelectedComponent('calendar')}>行事曆</Link></li>
          <li className={styles.navItem}><Link to="#" onClick={() => setSelectedComponent('reports')}>時間和報告</Link></li>
          <li className={styles.navItem}><Link to="#" onClick={() => setSelectedComponent('employees')}>員工</Link></li>
        </ul>
      </nav>
      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.hamburger} onClick={toggleSidebar}>
            &#9776;
          </div>
          <div className={styles.search}>
            <input type="text" placeholder="搜尋人員、文件和更多" />
          </div>
          <div className={styles.userInfo} onClick={toggleDropdown}>
            <img src="/path/to/user-avatar.jpg" alt="User Avatar" className={styles.avatar} />
            <span>Elliotboy</span>
            <div className={`${styles.dropdownMenu} ${dropdownOpen ? styles.active : ''}`}>
              <Link to="#" onClick={() => setSelectedComponent('profile')}>個人資料</Link>
              <Link to="#" onClick={() => setSelectedComponent('settings')}>設置</Link>
              <button onClick={handleLogout} className={styles.logoutButton}>登出</button>
            </div>
          </div>
        </header>
        <main className={styles.content}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;