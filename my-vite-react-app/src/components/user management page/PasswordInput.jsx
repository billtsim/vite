import React, { useState } from 'react';
import styles from '../../CSS/userManagementPageCSS/PasswordInput.module.css'; // 创建一个单独的 CSS 文件来处理样式

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.password_input_container}>
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        inputMode='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.password_input}
      />
      <span
        className={styles.password_toggle_icon}
        onClick={togglePasswordVisibility}
      >
        {isPasswordVisible ? '🙈' : '👁️'}
      </span>
    </div>
  );
};

export default PasswordInput;