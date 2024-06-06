import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/Axios';
import styles from '../../CSS/homePageCSS/HotSales.module.css';

const HotSales = ({ onProductClick }) => {
  const [hotSalesProducts, setHotSalesProducts] = useState([]);

  useEffect(() => {
    const fetchHotSalesProducts = async () => {
      try {
        const response = await axiosInstance.get('/product', { params: { tags: 'hot sale' } });
        setHotSalesProducts(response.data.data); // 假设 API 返回的数据在 `data.data` 中
      } catch (error) {
        console.error('Failed to fetch hot sales products:', error);
      }
    };

    fetchHotSalesProducts();
  }, []);

  return (
    <div className={styles.hotSalesContainer}>
      <h2>Trending</h2>
      <div className={styles.productsGrid}>
        {hotSalesProducts.map(product => (
          <div key={product.id} className={styles.productCard} onClick={() => onProductClick(product)}>
            <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
            <div className={styles.productInfo}>
              <p className={styles.productCategory}>BASE GAME</p>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              <div className={styles.priceSection}>
                {product.discount && <span className={styles.discountBadge}>{product.discount}</span>}
                <span className={styles.productPrice}>HK${product.price}</span>
                {product.originalPrice && <span className={styles.originalPrice}>HK${product.originalPrice}</span>}
              </div>
              {product.isFree && <p className={styles.freeBadge}>Free</p>}
            </div>
          </div>
        ))}
      </div>
      <button className={styles.viewMoreButton}>VIEW MORE</button>
    </div>
  );
};

export default HotSales;