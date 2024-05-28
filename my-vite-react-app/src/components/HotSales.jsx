import React from 'react';
import styles from '../CSS/HotSales.module.css';

const HotSales = ({ onProductClick }) => {
  const hotSalesProducts = [
    {
      id: 1,
      name: "Nike Air Max 97",
      description: "男子運動鞋",
      price: 1199,
      imageUrl: "https://via.placeholder.com/300x300"
    },
    {
      id: 2,
      name: "Nike Air Force 1 '07",
      description: "女子運動鞋",
      price: 799,
      imageUrl: "https://via.placeholder.com/300x300"
    },
    {
      id: 3,
      name: "Nike Sportswear Club",
      description: "男子長褲",
      price: 319,
      originalPrice: 399,
      imageUrl: "https://via.placeholder.com/300x300"
    },
    {
      id: 4,
      name: "Nike Air Max 270",
      description: "男子運動鞋",
      price: 999,
      imageUrl: "https://via.placeholder.com/300x300"
    },
    {
      id: 5,
      name: "Nike Air Zoom Pegasus",
      description: "女子運動鞋",
      price: 899,
      imageUrl: "https://via.placeholder.com/300x300"
    },
    // 添加更多产品数据
  ];

  return (
    <div className={styles.hotSalesContainer}>
      <h2>熱賣產品</h2>
      <div className={styles.productsGrid}>
        {hotSalesProducts.map(product => (
          <div key={product.id} className={styles.productCard} onClick={() => onProductClick(product)}>
            <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className={styles.productPrice}>HK${product.price} {product.originalPrice && <span className={styles.originalPrice}>HK${product.originalPrice}</span>}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotSales;