import React, { useState } from 'react';
import styles from '../CSS/TagSelector.module.css';

const TagSelector = ({ label, options, selectedOptions, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOptionClick = (option) => {
    if (!selectedOptions.includes(option)) {
      onChange([...selectedOptions, option]);
    }
  };

  const handleRemoveOption = (option) => {
    onChange(selectedOptions.filter((item) => item !== option));
  };

  return (
    <div className={styles.tagSelector}>
      <label>{label}</label>
      <div className={styles.selectedOptions}>
        {selectedOptions.map((option, index) => (
          <div key={index} className={styles.selectedOption}>
            {option}
            <span className={styles.removeOption} onClick={() => handleRemoveOption(option)}>
              &times;
            </span>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="按回车键创建标签"
          className={styles.tagName}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && inputValue.trim() && !selectedOptions.includes(inputValue.trim())) {
              onChange([...selectedOptions, inputValue.trim()]);
              setInputValue('');
            }
          }}
        />
      </div>
      <div className={styles.options}>
        {options.map((option, index) => (
          <div
            key={index}
            className={`${styles.option} ${selectedOptions.includes(option) ? styles.selected : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;