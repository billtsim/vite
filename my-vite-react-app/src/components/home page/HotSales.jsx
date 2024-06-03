import React from 'react';
import styles from '../../CSS/homePageCSS/HotSales.module.css';

const HotSales = ({ onProductClick }) => {
  const hotSalesProducts = [
    {
      id: 1,
      name: '絕區零',
      description: '男子運動鞋',
      price: 1199,
      imageUrl: 'https://via.placeholder.com/300x300'
    },
    {
      id: 2,
      name: 'fun game',
      description: '女子運動鞋',
      price: 799,
      imageUrl: 'https://via.placeholder.com/300x300'
    },
    {
      id: 3,
      name: 'Nike Sportswear Club',
      description: '男子長褲',
      price: 319,
      originalPrice: 399,
      imageUrl: 'https://via.placeholder.com/300x300'
    },
    {
      id: 4,
      name: 'Nike Air Max 270',
      description: '男子運動鞋',
      price: 999,
      imageUrl: 'https://via.placeholder.com/300x300'
    },
    {
      id: 5,
      name: 'Nike Air Zoom Pegasus',
      description: '女子運動鞋',
      price: 899,
      imageUrl: 'https://via.placeholder.com/300x300'
    }
  ];

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