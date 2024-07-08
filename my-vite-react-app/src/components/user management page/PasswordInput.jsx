import React, { useState } from 'react';
import styles from '../../CSS/userManagementPageCSS/PasswordInput.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.password_input_container}>
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        inputMode="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.password_input}
      />
      <span
        className={styles.password_toggle_icon}
        onClick={togglePasswordVisibility}
      >
        <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
      </span>
    </div>
  );
};

export default PasswordInput;