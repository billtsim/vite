import React, { useState, useEffect } from 'react';
import styles from '../CSS/Products.module.css';

const Products = ({ onProductClick }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 模拟从服务器获取产品数据
    const fetchProducts = () => {
      const productsData = [
        {
          id: 1,
          name: "Nike Air Force 1 '07",
          description: "男子運動鞋",
          price: 503,
          originalPrice: 799,
          imageUrl: "https://via.placeholder.com/150"
        },
        {
          id: 2,
          name: "Nike Pegasus Trail 5",
          description: "男子越野跑步鞋",
          price: 839,
          originalPrice: 1049,
          imageUrl: "https://via.placeholder.com/150"
        },
        // 添加更多产品数据
      ];
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.productsContainer}>
      <h1>年中優惠 必買精選</h1>
      <div className={styles.productsGrid}>
        {products.map(product => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className={styles.productPrice}>HK${product.price} <span className={styles.originalPrice}>HK${product.originalPrice}</span></p>
            <button className={styles.button} onClick={() => onProductClick(product)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;