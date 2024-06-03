import React, { useState, useRef } from 'react';
import styles from '../../CSS/homePageCSS/Products.module.css';

const Products = () => {
  const products = [
    {
      id: 1,
      name: "EA SPORTS FC™ 24 Standard Edition",
      category: "BASE GAME",
      oldPrice: 469,
      price: 93.8,
      discount: "-80%",
      imageUrl: "https://cdn2.unrealengine.com/egs-wuthering-waves-carousel-desktop-1248x702-ad7dee8b3a34.png?h=480&quality=medium&resize=1&w=854"
    },
    {
      id: 2,
      name: "Alan Wake 2",
      category: "BASE GAME",
      oldPrice: 350,
      price: 280,
      discount: "-20%",
      imageUrl: "https://cdn2.unrealengine.com/egs-wuthering-waves-carousel-desktop-1248x702-ad7dee8b3a34.png?h=480&quality=medium&resize=1&w=854"
    },
    {
      id: 3,
      name: "Red Dead Redemption 2",
      category: "BASE GAME",
      oldPrice: 468,
      price: 187.2,
      discount: "-60%",
      imageUrl: "https://cdn2.unrealengine.com/egs-wuthering-waves-carousel-desktop-1248x702-ad7dee8b3a34.png?h=480&quality=medium&resize=1&w=854"
    },
    {
      id: 4,
      name: "Grand Theft Auto V: Premium Edition",
      category: "BASE GAME",
      oldPrice: 246,
      price: 123,
      discount: "-50%",
      imageUrl: "https://cdn2.unrealengine.com/egs-wuthering-waves-carousel-desktop-1248x702-ad7dee8b3a34.png?h=480&quality=medium&resize=1&w=854"
    },
    {
      id: 5,
      name: "Dead Island 2",
      category: "BASE GAME",
      oldPrice: 448.99,
      price: 224.49,
      discount: "-50%",
      imageUrl: "https://cdn2.unrealengine.com/egs-wuthering-waves-carousel-desktop-1248x702-ad7dee8b3a34.png?h=480&quality=medium&resize=1&w=854"
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
    {
      id: 7,
      name: "Cyberpunk 2077: Ultimate Edition",
      category: "EDITION",
      oldPrice: 529,
      price: 354.43,
      discount: "-33%",
      imageUrl: "https://via.placeholder.com/200x300"
    },
    {
      id: 8,
      name: "Cyberpunk 2077: Ultimate Edition",
      category: "EDITION",
      oldPrice: 529,
      price: 354.43,
      discount: "-33%",
      imageUrl: "https://via.placeholder.com/200x300"
    },
    {
      id: 9,
      name: "Cyberpunk 2077: Ultimate Edition",
      category: "EDITION",
      oldPrice: 529,
      price: 354.43,
      discount: "-33%",
      imageUrl: "https://via.placeholder.com/200x300"
    },
    {
      id: 10,
      name: "Cyberpunk 2077: Ultimate Edition",
      category: "EDITION",
      oldPrice: 529,
      price: 354.43,
      discount: "-33%",
      imageUrl: "https://via.placeholder.com/200x300"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const productsGridRef = useRef(null);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + itemsPerPage;
      return newIndex >= products.length ? prevIndex : newIndex;
    });
  };

  const handleMouseDown = (e) => {
    const startX = e.pageX;
    const scrollLeft = productsGridRef.current.scrollLeft;

    const handleMouseMove = (e) => {
      const walk = (e.pageX - startX) * 2; // 滚动速度
      productsGridRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={styles.productsContainer}>
      <div className={styles.header}>
        <h2>Our Products</h2>
        <div className={styles.navigationButtons}>
          <button onClick={handlePrevClick} disabled={currentIndex === 0}>&lt;</button>
          <button onClick={handleNextClick} disabled={currentIndex + itemsPerPage >= products.length}>&gt;</button>
        </div>
      </div>
      <div
        className={styles.productsGrid}
        ref={productsGridRef}
        onMouseDown={handleMouseDown}
      >
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