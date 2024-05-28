import React from 'react';
import styles from '../CSS/ProductDetail.module.css';

const ProductDetail = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{product.name}</h2>
        <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
        <p>{product.description}</p>
        <p className={styles.productPrice}>${product.price}</p>
        <button className={styles.button} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProductDetail;