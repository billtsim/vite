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
          name: "Product 1",
          description: "This is the description for product 1.",
          price: 100,
          imageUrl: "https://via.placeholder.com/150"
        },
        {
          id: 2,
          name: "Product 2",
          description: "This is the description for product 2.",
          price: 200,
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
      <h1>Products</h1>
      <div className={styles.productsGrid}>
        {products.map(product => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className={styles.productPrice}>${product.price}</p>
            <button className={styles.button} onClick={() => onProductClick(product)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;