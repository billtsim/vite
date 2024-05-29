import React, { useState } from 'react';
import styles from '../CSS/Products.module.css';

const Products = () => {
  const products = [
    {
      id: 1,
      name: "EA SPORTS FC™ 24 Standard Edition",
      category: "BASE GAME",
      oldPrice: 469,
      price: 93.8,
      discount: "-80%",
      imageUrl: "https://via.placeholder.com/200x300"
    },
    {
      id: 2,
      name: "Alan Wake 2",
      category: "BASE GAME",
      oldPrice: 350,
      price: 280,
      discount: "-20%",
      imageUrl: "https://via.placeholder.com/200x300"
    },
    {
      id: 3,
      name: "Red Dead Redemption 2",
      category: "BASE GAME",
      oldPrice: 468,
      price: 187.2,
      discount: "-60%",
      imageUrl: "https://via.placeholder.com/200x300"
    },
    {
      id: 4,
      name: "Grand Theft Auto V: Premium Edition",
      category: "BASE GAME",
      oldPrice: 246,
      price: 123,
      discount: "-50%",
      imageUrl: "https://via.placeholder.com/200x300"
    },
    {
      id: 5,
      name: "Dead Island 2",
      category: "BASE GAME",
      oldPrice: 448.99,
      price: 224.49,
      discount: "-50%",
      imageUrl: "https://via.placeholder.com/200x300"
    },
    {
      id: 6,
      name: "Cyberpunk 2077: Ultimate Edition",
      category: "EDITION",
      oldPrice: 529,
      price: 354.43,
      discount: "-33%",
      imageUrl: "https://via.placeholder.com/200x300"
    },
    // 添加更多产品数据
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, products.length - itemsPerPage));
  };

  return (
    <div className={styles.productsContainer}>
      <div className={styles.header}>
        <h2>Our Products</h2>
        <div className={styles.navigationButtons}>
          <button onClick={handlePrevClick} disabled={currentIndex === 0}>&lt;</button>
          <button onClick={handleNextClick} disabled={currentIndex >= products.length - itemsPerPage}>&gt;</button>
        </div>
      </div>
      <div className={styles.productsGrid}>
        {products.slice(currentIndex, currentIndex + itemsPerPage).map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
            <div className={styles.productInfo}>
              <div className={styles.productCategory}>{product.category}</div>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.priceSection}>
                {product.discount && (
                  <div className={styles.discountBadge}>{product.discount}</div>
                )}
                <div className={styles.productPrice}>{product.price}</div>
                {product.oldPrice && (
                  <div className={styles.originalPrice}>{product.oldPrice}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;