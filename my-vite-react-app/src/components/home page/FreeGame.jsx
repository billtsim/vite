import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/Axios'; // 确保你有 axiosInstance 配置文件
import styles from '../../CSS/homePageCSS/FreeGame.module.css';

const FreeGames = ({ onProductClick }) => {
  const [freeGames, setFreeGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4; // 每组显示4个项目

  useEffect(() => {
    axiosInstance.get('/product', { params: { tags: 'free game' } })
      .then(response => {
        setFreeGames(response.data.data); // 假设 API 返回的数据在 `data.data` 中
      })
      .catch(err => {
        console.error('Error fetching free games:', err);
      });
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(freeGames.length / itemsPerPage) - 1));
  };

  const startIndex = currentPage * itemsPerPage;
  const selectedGames = freeGames.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.freeGamesContainer}>
      <div className={styles.header}>
        <h2>Free Games</h2>
        <div className={styles.navigationButtons}>
          <button onClick={handlePreviousPage} disabled={currentPage === 0}>&lt;</button>
          <button onClick={handleNextPage} disabled={currentPage === Math.ceil(freeGames.length / itemsPerPage) - 1}>&gt;</button>
        </div>
      </div>
      <div className={styles.productsGrid}>
        {selectedGames.map(product => (
          <div key={product.id} className={styles.productCard} onClick={() => onProductClick(product)}>
            <img src={product.mainImage} alt={product.name} className={styles.productImage} />
            <div className={styles.productInfo}>
              <p className={styles.productCategory}>BASE GAME</p>
              <h3 className={styles.productName}>{product.name}</h3>
              <div className={styles.priceSection}>
                {product.price === 0 ? (
                  <span className={styles.freeBadge}>Free</span>
                ) : (
                  <>
                    {product.discount && <span className={styles.discountBadge}>{(product.discount * 100).toFixed(0)}%</span>}
                    <span className={styles.productPrice}>HK${product.price}</span>
                    {product.originalPrice && <span className={styles.originalPrice}>HK${product.originalPrice}</span>}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeGames;