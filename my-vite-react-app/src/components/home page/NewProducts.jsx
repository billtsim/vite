import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../axios/Axios'; // 引入自定义的 axios 实例
import styles from '../../CSS/homePageCSS/NewProducts.module.css';

const NewProducts = ({ onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const productsGridRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/product', { params: { tags: 'new game' } });
        setProducts(response.data.data); // 假设 API 返回的数据在 `data.data` 中
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

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
        <h2>New Products</h2>
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
          <div key={product.id} className={styles.productCard} onClick={() => onProductClick(product)}>
            <img src={product.mainImage} alt={product.name} className={styles.productImage} />
            <div className={styles.productInfo}>
              <div className={styles.productCategory}>{product.category}</div>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.priceSection}>
                {product.price === 0 ? (
                  <div className={styles.freeBadge}>Free</div>
                ) : (
                  <>
                    {product.discount && (
                      <div className={styles.discountBadge}>{(product.discount * 100).toFixed(0)}%</div>
                    )}
                    <div className={styles.productPrice}>HK${product.price}</div>
                    {product.oldPrice && (
                      <div className={styles.originalPrice}>HK${product.oldPrice}</div>
                    )}
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

export default NewProducts;